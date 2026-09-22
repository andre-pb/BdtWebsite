// Prices, fulfilment SKUs and review flags are resolved here, never from
// amounts or descriptions supplied by the browser. The JSON is public and
// shared with the storefront, and lives here so Azure packages it with the API.
const catalog = require("./shop-catalog.json");

function invalid(message) {
  const error = new Error(message);
  error.status = 400;
  throw error;
}

function getCountry(code) {
  const country = catalog.countries.find((entry) => entry.code === code);
  if (!country) invalid("Please select a supported delivery country.");
  return country;
}

function toMinorUnits(gbpPence, country, useProductPrice = true) {
  const fixed = useProductPrice && catalog.regionalPrices[country.currency]?.[gbpPence];
  const major = fixed !== undefined && fixed !== false ? fixed / 100 : gbpPence * country.rate / 100;
  // HUF is rounded for display, but Stripe charges it in two-decimal units.
  if (country.currency === "JPY") return Math.round(major);
  if (country.currency === "HUF") return Math.round(major) * 100;
  return Math.round(major * 100);
}

function sizeCode(value) {
  if (typeof value !== "string") invalid("Please select a valid size.");
  const code = value.match(/\((S|M|L|XL|2XL)\)$/)?.[1] || value;
  if (!["S", "M", "L", "XL", "2XL"].includes(code)) invalid("Please select a valid size.");
  return code;
}

function option(value, allowed) {
  if (!allowed.includes(value)) invalid("This product option is unavailable.");
  return value;
}

function printfulSku(key, size) {
  const sku = Object.hasOwn(catalog.printful, key) && catalog.printful[key][size];
  if (!sku) invalid("This garment is unavailable in your delivery region.");
  return sku;
}

function resolveItem(input, country) {
  if (!input || typeof input.id !== "string" || input.id.length > 250 ||
      !Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 50) {
    invalid("Invalid product or quantity.");
  }
  const uk = country.code === "GB";
  const item = { id: input.id, quantity: input.quantity };
  let basePence;
  if (input.id.startsWith("beanie-")) {
    if (!uk) invalid("Beanies are only available for UK delivery.");
    const match = /^beanie-(STD|PREM)-(ORIGINAL|BDT)-(BLACK|WHITE|GRAPHITE)$/.exec(input.id);
    if (!match) invalid("Invalid beanie selection.");
    const [, tier, logo, color] = match;
    if ((tier === "STD" && color === "GRAPHITE") || (tier === "PREM" && color === "WHITE")) {
      invalid("This beanie colour is unavailable.");
    }
    Object.assign(item, {
      name: tier === "PREM" ? "Loose-knit Thinsulate beanie" : "Original Tight Knit Beanie",
      size: `One Size (${color})`, colorVariant: color, logoStyle: logo,
      supplierSku: `BC-${tier}-${logo}-${color}`,
    });
    basePence = catalog.prices[`beanie${tier}`];
  } else {
    const size = sizeCode(input.size);
    item.size = size;
    if (input.id.startsWith("lvl-")) {
      const match = /^lvl-(1[ABCD]|2[AB]|3[AB]|4[AB]|G)-(ORIGINAL|BDT)-(COTTON|PERF)-(SHIRT|VEST)-/.exec(input.id);
      if (!match) invalid("Invalid level garment.");
      const [, level, logo, fabric, cut] = match;
      if (cut === "VEST" && (!uk || fabric !== "PERF" || ["3A", "3B", "4A", "4B"].includes(level))) {
        invalid("This vest is unavailable.");
      }
      Object.assign(item, {
        name: `Level Progress Gear (Level ${level})`, logoStyle: logo, fabricSpec: fabric, garmentCut: cut,
        supplierSku: uk ? `UK-${level}-${fabric}-${size}` : printfulSku(`${level}_${fabric}_${logo}`, size),
      });
      basePence = catalog.prices.level;
    } else if (input.id.startsWith("bda-")) {
      const badge = option(input.badgeRank, ["PRACTITIONER", "1A_PRACTITIONER", "1B_PRACTITIONER", "1C_PRACTITIONER", "1D_PRACTITIONER", "2A_PRACTITIONER", "2B_PRACTITIONER", "3A_PRACTITIONER", "3B_PRACTITIONER", "4A_PRACTITIONER", "4B_PRACTITIONER", "GRADUATED_PRACTITIONER"]);
      const text = input.customText ?? "None Stamped";
      if (typeof text !== "string" || text.length > 100 || /[\r\n]/.test(text)) invalid("Invalid custom stamp.");
      Object.assign(item, { name: "The Busy Dad Army Shirt", badgeRank: badge, customText: text,
        supplierSku: uk ? `BA220-MIL-GREEN-${size}` : printfulSku("ARMY", size) });
      basePence = catalog.prices.army;
    } else if (input.id.startsWith("casual-")) {
      Object.assign(item, { name: "DOWN Casual Premium Tee",
        supplierSku: uk ? `SX001-ORGANIC-BLACK-${size}` : printfulSku("DOWN", size) });
      basePence = catalog.prices.casual;
    } else if (input.id.startsWith("level-gear-G-free-review-")) {
      let video;
      try { video = new URL(input.submissionVideoUrl); } catch { invalid("A graduation video link is required."); }
      if (!["https:", "http:"].includes(video.protocol) || video.href.length > 1000 || item.quantity !== 1) {
        invalid("Invalid graduation review request.");
      }
      // Free graduation gear always needs manual approval, even if the
      // browser removes its hold flag or changes the item description.
      Object.assign(item, { name: "Graduation Progress Gear (Pending Review)", holdForReview: true,
        submissionVideoUrl: video.href,
        supplierSku: uk ? `BA220-GOLD-${size}` : printfulSku("G_COTTON_ORIGINAL", size) });
      basePence = 0;
    } else if (input.id.startsWith("level-gear-G-backup-")) {
      Object.assign(item, { name: "Graduated Progress Gear",
        supplierSku: uk ? `GD005-GOLD-${size}` : printfulSku("G_COTTON_ORIGINAL", size) });
      basePence = catalog.prices.level;
    } else {
      invalid("Unknown product. Please rebuild your shopping bag.");
    }
  }
  return { ...item, unitAmount: toMinorUnits(basePence, country), currency: country.currency.toLowerCase() };
}

function resolveCart(cart, countryCode) {
  const country = getCountry(countryCode);
  if (!Array.isArray(cart) || cart.length === 0 || cart.length > 20) invalid("Invalid shopping bag.");
  const items = cart.map((item) => resolveItem(item, country));
  if (items.reduce((total, item) => total + item.quantity, 0) > 50 ||
      items.filter((item) => item.holdForReview).length > 1) invalid("Too many items in the shopping bag.");
  return { country, cart: items };
}

module.exports = { getCountry, resolveCart, toMinorUnits };
