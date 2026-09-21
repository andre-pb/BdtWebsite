const { app } = require("@azure/functions");
const Stripe = require("stripe");
const { getSetting } = require("../lib/settings");
const { jsonResponse, optionsResponse } = require("../lib/cors");

// The shop's frontend (busydadtraining.com, on GitHub Pages) is a different
// origin from this backend (an Azure Static Web App), and Azure's managed
// Functions only allow fetch()/XHR calls from their own linked frontend, no
// exceptions configurable without Azure Portal access. A plain HTML <form>
// POST is not subject to that restriction (it's a top-level navigation, not
// a script-read cross-origin call) — so the shop submits a real form here
// instead of fetching, and this handler replies with an HTTP redirect
// straight to Stripe rather than a JSON body. isFormSubmission below is how
// we tell the two calling styles apart and reply the right way to each.
async function readCheckoutPayload(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const raw = await request.text();
    const params = new URLSearchParams(raw);
    const payload = params.get("payload");
    return { body: payload ? JSON.parse(payload) : {}, isFormSubmission: true };
  }
  return { body: await request.json(), isFormSubmission: false };
}

app.http("checkout", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "checkout",
  handler: async (request, context) => {
    if (request.method === "OPTIONS") return optionsResponse(request);

    let isFormSubmission = false;
    try {
      const parsed = await readCheckoutPayload(request);
      const body = parsed.body;
      isFormSubmission = parsed.isFormSubmission;
      const {
        cart,
        country = "GB",
        currency = "gbp",
        region = "uk",
        shippingCostPence = 395,
      } = body;

      const origin = request.headers.get("origin") || "https://busydadtraining.com";
      const respondError = (status, message) => {
        context.error(`❌ Stripe Checkout Handshake Error (${status}):`, message);
        if (isFormSubmission) {
          return {
            status: 303,
            headers: { Location: `${origin}/shop?checkoutError=${encodeURIComponent(message)}` },
          };
        }
        return jsonResponse(request, status, { error: message });
      };

      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        return respondError(400, "Shopping bag data is empty.");
      }

      const isUk = country === "GB" || region === "uk";
      const targetCurrency = (currency || "gbp").toLowerCase();
      let trelloCardDescription = `### 👕 Garment Production Manifest\n`;

      const lineItems = cart.map((item) => {
        const descriptionParts = [`Size: ${item.size}`];
        if (item.logoStyle) descriptionParts.push(`Logo: ${item.logoStyle}`);
        if (item.garmentCut) descriptionParts.push(`Cut: ${item.garmentCut}`);

        if (item.fabricSpec) {
          let fabricLabel = item.fabricSpec;
          if (item.fabricSpec === "PERF") {
            fabricLabel = isUk ? "Performance Poly" : "50/50 Blend";
          } else if (item.fabricSpec === "COTTON") {
            fabricLabel = "Cotton";
          }
          descriptionParts.push(`Fabric: ${fabricLabel}`);
        }

        if (item.badgeRank) descriptionParts.push(`Rank: ${item.badgeRank}`);
        if (item.customText && item.customText !== "None Stamped") {
          descriptionParts.push(`Custom Stamp: "${item.customText}"`);
        }

        trelloCardDescription += `--- \n`;
        trelloCardDescription += `**Product:** ${item.name}\n`;
        trelloCardDescription += `**Garment Code (SKU):** \`${item.supplierSku || "N/A"}\`\n`;
        trelloCardDescription += `**Quantity:** ${item.quantity}\n`;
        trelloCardDescription += `**Variations:** ${descriptionParts.join(" | ")}\n`;

        if (item.submissionVideoUrl) {
          trelloCardDescription += `🔗 **Graduation Video Link:** ${item.submissionVideoUrl}\n`;
        }
        trelloCardDescription += `\n`;

        const itemCurrency = (item.currency || targetCurrency).toLowerCase();
        const itemUnitAmount = item.unitAmount || Math.round(item.price * 100);

        return {
          price_data: {
            currency: itemCurrency,
            product_data: {
              name: item.name,
              description: `SKU: ${item.supplierSku || "N/A"} | ${descriptionParts.join(" | ")}`,
              images: item.viewSrc && item.viewSrc.startsWith("http") ? [item.viewSrc] : [],
            },
            unit_amount: itemUnitAmount,
          },
          quantity: item.quantity,
        };
      });

      const compactedIds = [];
      const compactedSkus = [];
      const compactedStamps = [];
      const printfulPassportArray = [];

      cart.forEach((item, idx) => {
        compactedIds.push(`[${idx}]:${item.id}`);
        compactedSkus.push(`[${idx}]:${item.supplierSku || "N/A"}`);
        printfulPassportArray.push(`${item.supplierSku || "NOSKU"}:${item.quantity}`);
        if (item.customText && item.customText !== "None Stamped") {
          compactedStamps.push(`[${idx}]:${item.customText}`);
        }
      });

      const manifestChunks = {};
      const chunkSize = 400;
      let chunkIndex = 0;
      for (let i = 0; i < trelloCardDescription.length; i += chunkSize) {
        manifestChunks[`manifest_chunk_${chunkIndex}`] = trelloCardDescription.substring(i, i + chunkSize);
        chunkIndex++;
      }

      const shippingTitle = region === "global" ? "Standard Delivery" : "Royal Mail Standard (UK)";
      const uniqueSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const orderNumber = `BDT-${uniqueSuffix}`;

      const sessionConfiguration = {
        client_reference_id: orderNumber,
        allow_promotion_codes: true,
        payment_intent_data: {
          description: `Order ${orderNumber}`,
        },
        line_items: lineItems,
        mode: "payment",
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: [country],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: shippingCostPence,
                currency: targetCurrency,
              },
              display_name: shippingTitle,
            },
          },
        ],
        metadata: {
          order_number: orderNumber,
          total_items_count: String(cart.reduce((sum, i) => sum + i.quantity, 0)),
          cart_item_ids_summary: compactedIds.join(" | ").substring(0, 450),
          cart_skus_summary: compactedSkus.join(" | ").substring(0, 450),
          cart_stamps_summary: compactedStamps.length > 0 ? compactedStamps.join(" | ").substring(0, 450) : "None",
          printful_passport: printfulPassportArray.join("|").substring(0, 450),
          ...manifestChunks,
        },
        success_url: `${origin}/shop?success=true`,
        cancel_url: `${origin}/shop?canceled=true`,
      };

      const stripe = new Stripe(getSetting("STRIPE_SECRET_KEY"));
      const session = await stripe.checkout.sessions.create(sessionConfiguration);

      if (isFormSubmission) {
        // Browser is mid-navigation from its own <form> submit — send it
        // straight to Stripe's hosted checkout page. No fetch/JSON involved,
        // so no CORS check ever applies to this leg of the flow.
        return { status: 303, headers: { Location: session.url } };
      }
      return jsonResponse(request, 200, { url: session.url });
    } catch (err) {
      context.error("❌ Stripe Checkout Handshake Error:", err);
      if (isFormSubmission) {
        const origin = request.headers.get("origin") || "https://busydadtraining.com";
        return {
          status: 303,
          headers: { Location: `${origin}/shop?checkoutError=${encodeURIComponent(err.message || "Internal processing anomaly.")}` },
        };
      }
      return jsonResponse(request, 500, { error: err.message || "Internal processing anomaly." });
    }
  },
});
