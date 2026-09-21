const { app } = require("@azure/functions");
const { getSetting } = require("../lib/settings");
const { jsonResponse, optionsResponse } = require("../lib/cors");

app.http("shippingRates", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "shipping-rates",
  handler: async (request, context) => {
    if (request.method === "OPTIONS") return optionsResponse(request);

    try {
      const { country, state, cart } = await request.json();

      if (!country || !cart || !Array.isArray(cart) || cart.length === 0) {
        return jsonResponse(request, 400, { error: "Invalid payload or empty cart." });
      }

      const printfulToken = getSetting("PRINTFUL_ACCESS_TOKEN");
      const printfulStoreId = getSetting("PRINTFUL_STORE_ID");

      if (!printfulToken) {
        return jsonResponse(request, 200, { ratePence: 850, rateFormatted: "£8.50" });
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
        return jsonResponse(request, 200, { ratePence: 850, rateFormatted: "£8.50" });
      }

      const data = await printfulResponse.json();
      const rates = data.result;

      if (rates && rates.length > 0) {
        const standardRate = parseFloat(rates[0].rate);
        const ratePence = Math.round(standardRate * 100);
        return jsonResponse(request, 200, { ratePence, rateFormatted: `£${standardRate.toFixed(2)}` });
      }

      return jsonResponse(request, 200, { ratePence: 850, rateFormatted: "£8.50" });
    } catch (err) {
      context.error("❌ Printful Live Rate Fetch Exception:", err);
      return jsonResponse(request, 200, { ratePence: 850, rateFormatted: "£8.50" });
    }
  },
});
