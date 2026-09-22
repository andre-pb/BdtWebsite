const { app } = require("@azure/functions");
const Stripe = require("stripe");
const { getSetting } = require("../lib/settings");

// Called by Stripe itself (server-to-server), not the browser, so this one
// doesn't need CORS headers — but it does need the RAW request body, because
// Stripe's signature check hashes the exact bytes it sent. Parsing it as
// JSON first (even accidentally) breaks verification.
app.http("webhook", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "webhook",
  handler: async (request, context) => {
    const webhookSecret = getSetting("STRIPE_WEBHOOK_SECRET");
    const stripeKey = getSetting("STRIPE_SECRET_KEY");
    if (!webhookSecret || !stripeKey) {
      context.error("Payment webhook is not configured.");
      return { status: 503, jsonBody: { error: "Payment webhook is not configured." } };
    }
    const signature = request.headers.get("stripe-signature");
    if (!signature) return { status: 400, jsonBody: { error: "Missing Stripe signature." } };
    const stripe = new Stripe(stripeKey);
    let rawBody = "";

    try {
      rawBody = await request.text();
    } catch (err) {
      context.error(`❌ Webhook Stream Error: ${err.message}`);
      return { status: 400, jsonBody: { error: `Buffer Read Exception: ${err.message}` } };
    }


    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      context.error(`❌ Webhook Signature Authentication Denied: ${err.message}`);
      return { status: 400, jsonBody: { error: `Signature Verification Failed: ${err.message}` } };
    }

    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const sessionSnapshot = event.data.object;
      if (!["paid", "no_payment_required"].includes(sessionSnapshot.payment_status)) {
        return { status: 200, jsonBody: { received: true } };
      }
      let session = sessionSnapshot;

      if (sessionSnapshot.id) {
        try {
          context.log(`📡 Fetching complete master payload from Stripe for Session: ${sessionSnapshot.id}`);
          session = await stripe.checkout.sessions.retrieve(sessionSnapshot.id);
        } catch (retrieveError) {
          context.error("⚠️ Could not fetch fresh cloud session, falling back to webhook snapshot:", retrieveError);
        }
      }

      const customerEmail = session.customer_details?.email || "Unknown Client";
      const customerName = session.shipping_details?.name || session.customer_details?.name || "Anonymous Purchaser";
      const orderMetadata = session.metadata || {};
      const orderNumber = orderMetadata.order_number || `BDT-${session.id.slice(-6).toUpperCase()}`;
      const completionTimestamp = new Date().toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/London",
      });
      let itemManifest = "";
      let chunkIdx = 0;
      while (orderMetadata[`manifest_chunk_${chunkIdx}`]) {
        itemManifest += orderMetadata[`manifest_chunk_${chunkIdx}`];
        chunkIdx++;
      }

      if (!itemManifest) {
        itemManifest = orderMetadata.compiled_manifest || "No manifest data passed.";
      }

      let hasArmyShirt = false;
      let hasCustomization = false;
      let needsVideoReview = orderMetadata.hold_for_review === "true";

      if (itemManifest.toLowerCase().includes("pending review") || itemManifest.includes("🔗")) {
        needsVideoReview = true;
      }

      const metadataString = JSON.stringify(orderMetadata).toLowerCase();
      const manifestLower = itemManifest.toLowerCase();

      if (manifestLower.includes("army") || metadataString.includes("ba220") || metadataString.includes("bda-")) {
        hasArmyShirt = true;
      }

      if (manifestLower.includes("custom stamp:") || (orderMetadata.cart_stamps_summary && orderMetadata.cart_stamps_summary !== "None")) {
        hasCustomization = true;
      }

      if (manifestLower.includes("pending review") || manifestLower.includes("graduation video link") || manifestLower.includes("🔗")) {
        needsVideoReview = true;
      }

      const activeAddressObject = session.shipping_details?.address || session.customer_details?.address;
      let formattedAddress = "No Shipping Address Provided";
      let countryRegionTag = "GB";

      if (activeAddressObject) {
        countryRegionTag = activeAddressObject.country?.toUpperCase() || "GB";

        const addressSegments = [
          activeAddressObject.line1,
          activeAddressObject.line2,
          activeAddressObject.city,
          activeAddressObject.state,
          activeAddressObject.postal_code,
          countryRegionTag,
        ].filter((segment) => segment !== null && segment !== undefined && String(segment).trim() !== "");

        formattedAddress = addressSegments.join(", ");
      }

      const isInternational = countryRegionTag !== "GB";

      // ✈️ AUTOMATED PRINTFUL ROUTING TRIGGER
      if (isInternational && !needsVideoReview) {
        const printfulToken = getSetting("PRINTFUL_ACCESS_TOKEN");
        const printfulStoreId = getSetting("PRINTFUL_STORE_ID");
        const passportString = orderMetadata.printful_passport || "";

        if (printfulToken && passportString && activeAddressObject) {
          try {
            context.log(`✈️ International Target Confirmed (${countryRegionTag}). Compiling Printful Draft Order...`);

            const printfulItemsPayload = passportString.split("|").map((entry) => {
              const [itemSku, itemQty] = entry.split(":");
              const cleanSku = (itemSku || "").replace(/^#/, "").trim();
              const quantity = parseInt(itemQty || "1", 10);

              if (/^\d+$/.test(cleanSku)) {
                return { sync_variant_id: parseInt(cleanSku, 10), quantity };
              }
              if (/^[a-f0-9]{10,}$/i.test(cleanSku)) {
                return { external_variant_id: cleanSku, quantity };
              }
              return { external_variant_id: cleanSku, quantity };
            });

            const printfulOrderBody = {
              external_id: orderNumber,
              store_id: printfulStoreId ? parseInt(printfulStoreId, 10) : undefined,
              recipient: {
                name: customerName,
                address1: activeAddressObject.line1 || "",
                address2: activeAddressObject.line2 || "",
                city: activeAddressObject.city || "",
                state_code: activeAddressObject.state || "",
                country_code: countryRegionTag,
                zip: activeAddressObject.postal_code || "",
              },
              items: printfulItemsPayload,
              confirm: false, // Draft mode safeguard
            };

            const printfulResponse = await fetch("https://api.printful.com/orders", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${printfulToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(printfulOrderBody),
            });

            if (printfulResponse.ok) {
              const printfulData = await printfulResponse.json();
              context.log(`✅ Printful Draft Order Created Successfully! ID: ${printfulData.result?.id}`);
            } else {
              const errText = await printfulResponse.text();
              context.error("❌ Printful API rejected the draft creation request:", errText);
            }
          } catch (printfulError) {
            context.error("❌ Printful background communication tunnel exception:", printfulError);
          }
        } else {
          context.warn("⚠️ Printful bypass rule invoked: Missing access token parameters or passport metadata.");
        }
      }

      let finalDescription = "";

      if (needsVideoReview) {
        finalDescription += `# 🎥 [ACTION REQUIRED: REVIEW GRADUATION VIDEO]\n`;
        finalDescription += `> **Max:** An unverified free milestone item is in this order. Check the manifest below for the video access link.\n\n`;
      }

      if (isInternational && !needsVideoReview) {
        if (hasArmyShirt || hasCustomization) {
          finalDescription += `## ⚠️ INTERNATIONAL ORDER - ACTION REQUIRED IN PRINTFUL\n`;
          finalDescription += `> **Action Required:** Open the draft order in Printful to attach the custom design print file before confirming/syncing.\n\n`;
        } else {
          finalDescription += `## ✈️ INTERNATIONAL ORDER - PRINTFUL AUTOMATED (RECORD ONLY)\n`;
          finalDescription += `> **No Action Required:** Standard items sent directly to Printful as an automated draft order. Do not print locally.\n\n`;
        }
      } else if (!isInternational) {
        finalDescription += `## 🏠 DOMESTIC ORDER - WEZZL IN-HOUSE FULFILLMENT\n\n`;
      }

      const amountPaid = session.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00";
      const currencySymbol = session.currency?.toLowerCase() === "gbp" ? "£" : "$";

      finalDescription += `### 👤 Customer Profile\n`;
      finalDescription += `**Order ID:** ${orderNumber}\n`;
      finalDescription += `**Completed At:** ${completionTimestamp}\n`;
      finalDescription += `**Name:** ${customerName}\n`;
      finalDescription += `**Email:** ${customerEmail}\n`;
      finalDescription += `**Total Paid:** ${currencySymbol}${amountPaid}\n\n`;
      finalDescription += `### 🚚 Distribution Info\n`;
      finalDescription += `**Address:** ${formattedAddress}\n\n`;
      finalDescription += itemManifest;

      const trelloApiKey = getSetting("TRELLO_API_KEY").trim();
      const trelloToken = getSetting("TRELLO_TOKEN").trim();
      const targetListId = getSetting("TRELLO_LIST_NEW_ORDERS").trim();
      const yellowLabelId = getSetting("TRELLO_LABEL_YELLOW").trim();
      const orangeLabelId = getSetting("TRELLO_LABEL_ORANGE").trim();
      const purpleLabelId = getSetting("TRELLO_LABEL_PURPLE").trim();
      const greenLabelId = getSetting("TRELLO_LABEL_GREEN").trim();
      const checkPrintfulLabelId = getSetting("TRELLO_LABEL_CHECK_PRINTFUL").trim();

      if (trelloApiKey && trelloToken && targetListId) {
        const prefix = isInternational ? `[INT-${countryRegionTag}]` : `[GB]`;
        const cardTitle = `${prefix} ${orderNumber} - ${customerName}`;

        const trelloUrl = new URL("https://api.trello.com/1/cards");
        trelloUrl.searchParams.append("key", trelloApiKey);
        trelloUrl.searchParams.append("token", trelloToken);
        trelloUrl.searchParams.append("idList", targetListId);
        trelloUrl.searchParams.append("name", cardTitle);
        trelloUrl.searchParams.append("desc", finalDescription);

        const labelsToAttach = [];

        if ((hasCustomization || hasArmyShirt) && yellowLabelId) {
          labelsToAttach.push(yellowLabelId);
        }
        if (hasArmyShirt && !isInternational && orangeLabelId) {
          labelsToAttach.push(orangeLabelId);
        }
        if (needsVideoReview && purpleLabelId) {
          labelsToAttach.push(purpleLabelId);
        }
        if (isInternational && checkPrintfulLabelId) {
          labelsToAttach.push(checkPrintfulLabelId);
        }

        context.log("🏷️ --- TRELLO LABEL DIAGNOSTIC LOG ---");
        context.log(`- Destination: ${countryRegionTag} (isInternational: ${isInternational})`);
        context.log(`- Army Shirt Detected: ${hasArmyShirt}`);
        context.log(`- Customization Detected: ${hasCustomization}`);
        context.log(`- TRELLO_LABEL_CHECK_PRINTFUL read value: "${checkPrintfulLabelId}"`);
        context.log(`- Labels to attach:`, labelsToAttach);

        if (labelsToAttach.length > 0) {
          trelloUrl.searchParams.append("idLabels", labelsToAttach.join(","));
        }

        try {
          const trelloResponse = await fetch(trelloUrl.toString(), { method: "POST" });
          if (trelloResponse.ok) {
            context.log(`✅ Success! Created Trello Card for ${customerName} with labels:`, labelsToAttach);
          } else {
            const errTxt = await trelloResponse.text();
            context.error("❌ Trello target rejected webhook request payload:", errTxt);
          }
        } catch (trelloErr) {
          context.error("❌ Trello asynchronous execution pipeline failure:", trelloErr);
        }
      }
    }

    return { status: 200, jsonBody: { received: true } };
  },
});
