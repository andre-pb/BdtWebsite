const { app } = require("@azure/functions");
const { computeRate } = require("../lib/shipping");
const { resolveCart } = require("../lib/catalog");
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

    let result;
    try {
      const resolved = resolveCart(cart, country);
      result = country === "GB"
        ? { status: 200, ratePence: 395, rateFormatted: "£3.95" }
        : await computeRate(country, state, resolved.cart, context);
    } catch (error) {
      result = { status: error.status || 400, error: "Invalid shipping request." };
    }

    if (callback) {
      return jsonpScriptResponse(callback, result);
    }

    return jsonResponse(request, result.status || 200, result);
  },
});
