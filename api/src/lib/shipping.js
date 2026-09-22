// Shared server-side shipping quote for checkout and the public rate endpoint.
const { getSetting } = require("./settings");

async function computeRate(country, state, cart, context) {
  if (!country || !cart || !Array.isArray(cart) || cart.length === 0) {
    return { status: 400, error: "Invalid payload or empty cart." };
  }

  const printfulToken = getSetting("PRINTFUL_ACCESS_TOKEN");
  const printfulStoreId = getSetting("PRINTFUL_STORE_ID");

  if (!printfulToken) {
    return { status: 503, error: "Shipping is temporarily unavailable. Please try again later." };
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
    throw new Error("Invalid fulfilment variant.");
  });

  try {
    const printfulResponse = await fetch("https://api.printful.com/shipping/rates", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
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
      return { status: 503, error: "Shipping is temporarily unavailable. Please try again later." };
    }

    const data = await printfulResponse.json();
    const rates = data.result;

    if (rates && rates.length > 0) {
      const standardRate = parseFloat(rates[0].rate);
      if (!Number.isFinite(standardRate) || standardRate < 0) {
        return { status: 503, error: "Shipping is temporarily unavailable. Please try again later." };
      }
      const ratePence = Math.round(standardRate * 100);
      return { status: 200, ratePence, rateFormatted: `£${standardRate.toFixed(2)}` };
    }

    return { status: 503, error: "Shipping is temporarily unavailable. Please try again later." };
  } catch (err) {
    context.error("❌ Printful Live Rate Fetch Exception:", err);
    return { status: 503, error: "Shipping is temporarily unavailable. Please try again later." };
  }
}

module.exports = { computeRate };
