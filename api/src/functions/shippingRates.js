const { app } = require("@azure/functions");
const { getSetting } = require("../lib/settings");
const { jsonResponse, optionsResponse } = require("../lib/cors");

// Same cross-origin restriction as checkout.js applies here (Azure's
// managed Functions only allow fetch()/XHR from their own linked
// frontend) — but unlike checkout, this endpoint has to hand a number
// back to the page rather than just send the browser onward, so a form
// submission won't work here. JSONP sidesteps the restriction instead: a
// <script src="..."> tag is never subject to CORS (it's how ad and
// analytics scripts have always loaded cross-origin), so when the request
// carries a `callback` param we reply with a small JavaScript snippet that
// calls that function with the result, instead of a JSON body. A request
// with no `callback` param still gets a plain JSON response, unchanged.
async function computeRate(country, state, cart, context) {
  if (!country || !cart || !Array.isArray(cart) || cart.length === 0) {
    return { status: 400, error: "Invalid payload or empty cart." };
  }

  const printfulToken = getSetting("PRINTFUL_ACCESS_TOKEN");
  const printfulStoreId = getSetting("PRINTFUL_STORE_ID");

  if (!printfulToken) {
    return { status: 200, ratePence: 850, rateFormatted: "£8.50" };
  }

  let stateCode = state;
  if (!stateCode) {
    if (country === "US") stateCode = "NY";
    else if (country === "CA") stateCode = "ON";
    else if (country === "AU") stateCode = "NSW";
  }

  const printfulItems = cart.map((item) => {
    const cleanSku = (item.supplierSku || "").replace(/^#/, "").trim();
    if (/^\d+$/.test(cleanSku)) {
      return { sync_variant_id: parseInt(cleanSku, 10), quantity: item.quantity };
    }
    if (/^[a-f0-9]{10,}$/i.test(cleanSku)) {
      return { external_variant_id: cleanSku, quantity: item.quantity };
    }
    return { variant_id: 4011, quantity: item.quantity };
  });

  try {
    const printfulResponse = await fetch("https://api.printful.com/shipping/rates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${printfulToken}`,
        "Content-Type": "application/json",
        ...(printfulStoreId ? { "X-Printful-Store-Id": printfulStoreId } : {}),
      },
      body: JSON.stringify({
        store_id: printfulStoreId ? parseInt(printfulStoreId, 10) : undefined,
        recipient: {
          country_code: country,
          ...(stateCode ? { state_code: stateCode } : {}),
        },
        items: printfulItems,
        currency: "GBP",
      }),
    });

    if (!printfulResponse.ok) {
      const errText = await printfulResponse.text();
      context.error("❌ Printful Rate API Error Details:", errText);
      return { status: 200, ratePence: 850, rateFormatted: "£8.50" };
    }

    const data = await printfulResponse.json();
    const rates = data.result;

    if (rates && rates.length > 0) {
      const standardRate = parseFloat(rates[0].rate);
      const ratePence = Math.round(standardRate * 100);
      return { status: 200, ratePence, rateFormatted: `£${standardRate.toFixed(2)}` };
    }

    return { status: 200, ratePence: 850, rateFormatted: "£8.50" };
  } catch (err) {
    context.error("❌ Printful Live Rate Fetch Exception:", err);
    return { status: 200, ratePence: 850, rateFormatted: "£8.50" };
  }
}

function jsonpScriptResponse(callbackName, body) {
  // Only allow a plain identifier as the callback name — it gets dropped
  // straight into the response as executable code, so anything else is
  // replaced with a safe default rather than passed through.
  const safeName = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(callbackName || "") ? callbackName : "callback";
  return {
    status: 200,
    headers: { "Content-Type": "application/javascript; charset=utf-8" },
    body: `${safeName}(${JSON.stringify(body)});`,
  };
}

app.http("shippingRates", {
  methods: ["GET", "POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "shipping-rates",
  handler: async (request, context) => {
    if (request.method === "OPTIONS") return optionsResponse(request);

    let country, state, cart, callback;

    if (request.method === "GET") {
      // The <script src="..."> JSONP call — everything travels as query
      // params since a GET request has no body.
      country = request.query.get("country");
      state = request.query.get("state") || undefined;
      callback = request.query.get("callback");
      try {
        cart = JSON.parse(request.query.get("cart") || "[]");
      } catch {
        cart = [];
      }
    } else {
      // Plain JSON POST — kept for same-origin testing and any other
      // caller that isn't blocked by the cross-origin restriction.
      try {
        const body = await request.json();
        country = body.country;
        state = body.state;
        cart = body.cart;
      } catch {
        return jsonResponse(request, 400, { error: "Invalid JSON body." });
      }
    }

    const result = await computeRate(country, state, cart, context);

    if (callback) {
      return jsonpScriptResponse(callback, result);
    }

    return jsonResponse(request, result.status || 200, result);
  },
});
