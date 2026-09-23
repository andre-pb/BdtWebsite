const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const Stripe = require("stripe");
const { resolveCart, getCountry, toMinorUnits } = require("../src/lib/catalog");
const catalog = require("../src/lib/shop-catalog.json");

// Exercise the registered Azure handlers with fake payment/fulfilment
// services. No test can create a Stripe session, Printful order or Trello card.
function load(relative, overrides = {}) {
  const filename = path.resolve(__dirname, "../src", relative);
  const exports = {};
  const nativeRequire = createRequire(filename);
  const sandbox = {
    module: { exports }, exports, URL, URLSearchParams, AbortSignal,
    fetch: async () => { throw new Error("Unexpected network call in test"); },
    ...overrides.globals,
    require: (id) => Object.hasOwn(overrides.modules || {}, id) ? overrides.modules[id] : nativeRequire(id),
  };
  vm.runInNewContext(fs.readFileSync(filename, "utf8"), sandbox, { filename });
  return sandbox.module.exports;
}

const context = { error() {}, log() {}, warn() {} };
const level = { id: "lvl-1A-ORIGINAL-COTTON-SHIRT-Medium(M)", size: "Medium (M)", quantity: 1 };
const payload = (cart = [level], country = "GB") => ({ cart, country });

function checkoutHarness(quote = { status: 200, ratePence: 850 }) {
  let handler;
  const sessions = [];
  const quotes = [];
  load("functions/checkout.js", { modules: {
    "@azure/functions": { app: { http: (_, config) => { handler = config.handler; } } },
    stripe: class { constructor() { this.checkout = { sessions: { create: async (config) => {
      sessions.push(config); return { url: "https://checkout.stripe.com/test-session" };
    } } }; } },
    "../lib/settings": { getSetting: () => "test-only" },
    "../lib/shipping": { computeRate: async (...args) => { quotes.push(args); return quote; } },
  } });
  return { sessions, quotes, call: (body, form = false) => handler({
    method: "POST",
    headers: new Headers({ origin: "https://untrusted.example", "content-type": form ? "application/x-www-form-urlencoded" : "application/json" }),
    json: async () => body,
    text: async () => new URLSearchParams({ payload: JSON.stringify(body) }).toString(),
  }, context) };
}

test("legacy JSON checkout keeps its response, ignoring forged prices, SKU, currency, shipping and name", async () => {
  const harness = checkoutHarness();
  const response = await harness.call({ ...payload([{ ...level, price: 0.01, unitAmount: 1,
    supplierSku: "expensive-alternative", name: "different product", currency: "jpy", holdForReview: true }]),
    currency: "jpy", region: "global", shippingCostPence: 0 });
  assert.equal(response.status, 200);
  assert.equal(response.jsonBody.url, "https://checkout.stripe.com/test-session");
  const session = harness.sessions[0];
  assert.equal(session.line_items[0].price_data.unit_amount, 2499);
  assert.equal(session.line_items[0].price_data.currency, "gbp");
  assert.equal(session.line_items[0].price_data.product_data.name, "Level Progress Gear (Level 1A)");
  assert.equal(session.shipping_options[0].shipping_rate_data.fixed_amount.amount, 395);
  assert.equal(session.metadata.printful_passport, "UK-1A-COTTON-M:1");
  assert.equal(session.metadata.hold_for_review, "false");
  assert.equal(session.success_url, "https://busydadtraining.com/shop?success=true");
  assert.equal(harness.quotes.length, 0);
});

test("form checkout retains its Stripe redirect and server-derived international prices", async () => {
  const harness = checkoutHarness();
  const response = await harness.call({ ...payload([{ ...level, supplierSku: "forged" }], "US"), region: "uk", shippingCostPence: 1 }, true);
  assert.equal(response.status, 303);
  assert.equal(response.headers.Location, "https://checkout.stripe.com/test-session");
  const session = harness.sessions[0];
  assert.equal(session.line_items[0].price_data.unit_amount, 2999);
  assert.equal(session.shipping_options[0].shipping_rate_data.fixed_amount.amount, 1020);
  assert.equal(session.shipping_options[0].shipping_rate_data.fixed_amount.currency, "usd");
  assert.equal(harness.quotes[0][2][0].supplierSku, catalog.printful["1A_COTTON_ORIGINAL"].M);
});

test("unknown products, countries, sizes and invalid quantities never reach Stripe", async () => {
  const cases = [payload([{ ...level, id: "invented" }]), payload([{ ...level, size: "XXXL" }]),
    payload([], "GB"), payload([level], "XX"), payload([{ ...level, quantity: -1 }]),
    payload([{ ...level, quantity: 0.5 }]), payload([{ ...level, quantity: 51 }]),
    payload([{ ...level, id: "lvl-1A-ORIGINAL-PERF-VEST-M" }], "US")];
  for (const body of cases) {
    const harness = checkoutHarness();
    assert.equal((await harness.call(body)).status, 400);
    assert.equal(harness.sessions.length, 0);
  }
});

test("shipping failure blocks payment instead of silently charging £8.50", async () => {
  const harness = checkoutHarness({ status: 503, error: "Shipping unavailable" });
  assert.equal((await harness.call(payload([level], "US"))).status, 503);
  const formResponse = await harness.call(payload([level], "US"), true);
  assert.equal(formResponse.status, 303);
  assert.match(formResponse.headers.Location, /^https:\/\/busydadtraining.com\/shop\?checkoutError=/);
  assert.equal(harness.sessions.length, 0);
});

test("all existing Printful catalogue products and sizes resolve to their original SKUs", () => {
  for (const [key, sizes] of Object.entries(catalog.printful)) {
    for (const [size, sku] of Object.entries(sizes)) {
      const [levelCode, fabric, logo] = key.split("_");
      const item = key === "ARMY" ? { id: "bda-PRACTITIONER", badgeRank: "PRACTITIONER" }
        : key === "DOWN" ? { id: "casual-M" }
        : { id: `lvl-${levelCode}-${logo}-${fabric}-SHIRT-${size}` };
      const result = resolveCart([{ ...item, size, quantity: 1 }], "US").cart[0];
      assert.equal(result.supplierSku, sku);
      assert.equal(result.unitAmount, ["ARMY", "DOWN"].includes(key) ? 3499 : 2999);
    }
  }
});

test("UK products retain prices and fulfilment details", () => {
  const cases = [
    [{ id: "bda-test", badgeRank: "PRACTITIONER", customText: "Andre" }, 2999, "BA220-MIL-GREEN-M"],
    [{ id: "casual-M" }, 2999, "SX001-ORGANIC-BLACK-M"],
    [{ id: "beanie-STD-ORIGINAL-BLACK" }, 1400, "BC-STD-ORIGINAL-BLACK"],
    [{ id: "beanie-PREM-BDT-GRAPHITE" }, 1800, "BC-PREM-BDT-GRAPHITE"],
    [{ id: "level-gear-G-backup-M" }, 2499, "GD005-GOLD-M"],
  ];
  for (const [input, price, sku] of cases) {
    const item = resolveCart([{ ...input, size: "M", quantity: 1 }], "GB").cart[0];
    assert.equal(item.unitAmount, price);
    assert.equal(item.supplierSku, sku);
  }
});

test("free graduation gear requires a video and always carries the server review flag", async () => {
  const item = { id: "level-gear-G-free-review-M", size: "M", quantity: 1,
    submissionVideoUrl: "https://example.com/graduation", holdForReview: false, name: "Approved" };
  const harness = checkoutHarness();
  await harness.call(payload([item]));
  assert.equal(harness.sessions[0].line_items[0].price_data.unit_amount, 0);
  assert.equal(harness.sessions[0].metadata.hold_for_review, "true");
  assert.match(harness.sessions[0].line_items[0].price_data.product_data.name, /Pending Review/);
  assert.throws(() => resolveCart([{ ...item, submissionVideoUrl: "javascript:alert(1)" }], "GB"));
  assert.throws(() => resolveCart([{ ...item, quantity: 2 }], "GB"));
});

test("currency units distinguish HUF charges from zero-decimal JPY", () => {
  assert.equal(toMinorUnits(2499, getCountry("HU")), 1124600);
  assert.equal(toMinorUnits(2499, getCountry("JP")), 4873);
  assert.equal(toMinorUnits(2499, getCountry("DE")), 2899);
  assert.equal(toMinorUnits(850, getCountry("CA"), false), 1403);
});

test("shipping uses validated fulfilment IDs and fails closed on provider errors", async () => {
  let requestBody;
  const shipping = (response, token = "test-only") => load("lib/shipping.js", {
    modules: { "./settings": { getSetting: () => token } },
    globals: { fetch: async (_, init) => { requestBody = JSON.parse(init.body); return response; } },
  });
  const cart = resolveCart([level], "US").cart;
  const good = shipping({ ok: true, json: async () => ({ result: [{ rate: "9.75" }] }) });
  assert.equal((await good.computeRate("US", undefined, cart, context)).ratePence, 975);
  assert.equal(requestBody.items[0].external_variant_id, catalog.printful["1A_COTTON_ORIGINAL"].M);
  for (const response of [ { ok: false, text: async () => "Unavailable" },
    { ok: true, json: async () => ({ result: [] }) },
    { ok: true, json: async () => ({ result: [{ rate: "NaN" }] }) } ]) {
    assert.equal((await shipping(response).computeRate("US", undefined, cart, context)).status, 503);
  }
  assert.equal((await shipping(null, "").computeRate("US", undefined, cart, context)).status, 503);
});

const webhookTestSecret = "test-only-webhook-signing-secret";
const realStripe = new Stripe("test-only-api-key");
function webhookHarness(secret = webhookTestSecret) {
  let handler;
  let retrievals = 0;
  const requests = [];
  load("functions/webhook.js", { modules: {
    "@azure/functions": { app: { http: (_, config) => { handler = config.handler; } } },
    stripe: class { constructor() {
      this.webhooks = realStripe.webhooks;
      this.checkout = { sessions: { retrieve: async () => { retrievals++; throw new Error("Offline test"); } } };
    } },
    "../lib/settings": { getSetting: (key) => key === "STRIPE_WEBHOOK_SECRET" ? secret : "test-only" },
  }, globals: { fetch: async (url) => { requests.push(url); return { ok: true, json: async () => ({ result: { id: 1 } }) }; } } });
  return { requests, get retrievals() { return retrievals; }, call: (body, signature) => handler({
    headers: new Headers(signature ? { "stripe-signature": signature } : {}), text: async () => body,
  }, context) };
}
const signedEvent = (paymentStatus = "paid", metadata = {}, type = "checkout.session.completed") => JSON.stringify({
  id: "evt_unit_test", type, data: { object: { id: "cs_unit_test", payment_status: paymentStatus,
    metadata, customer_details: { name: "Test Buyer", address: { country: "US" } } } },
});
const sign = (body, secret = webhookTestSecret) => realStripe.webhooks.generateTestHeaderString({ payload: body, secret });

test("unsigned, forged and modified webhook bodies cannot trigger any side effects", async () => {
  const body = signedEvent();
  for (const signature of [undefined, "invalid", sign(body, "wrong-test-secret"), sign(body + " ")]) {
    const harness = webhookHarness();
    assert.equal((await harness.call(body, signature)).status, 400);
    assert.equal(harness.retrievals, 0);
    assert.equal(harness.requests.length, 0);
  }
  assert.equal((await webhookHarness("").call(body, sign(body))).status, 503);
});

test("valid signed payment retains fulfilment and Trello behaviour", async () => {
  const body = signedEvent("paid", { printful_passport: "6a8d5ee9d4d0c7:1" });
  const harness = webhookHarness();
  assert.equal((await harness.call(body, sign(body))).status, 200);
  assert.equal(harness.requests.length, 3);
  assert.equal(harness.requests[0], "https://api.printful.com/orders");
  assert.match(harness.requests[1], /^https:\/\/api.trello.com\/1\/cards/);
  assert.match(harness.requests[2], /^https:\/\/ntfy\.sh\//);
});

test("unpaid notifications do not fulfil; paid review orders stay out of Printful", async () => {
  const unpaid = signedEvent("unpaid");
  const harness = webhookHarness();
  assert.equal((await harness.call(unpaid, sign(unpaid))).status, 200);
  assert.equal(harness.retrievals, 0);
  assert.equal(harness.requests.length, 0);
  const review = signedEvent("paid", { hold_for_review: "true", printful_passport: "6a8d5ee9d4d0c7:1" });
  assert.equal((await harness.call(review, sign(review))).status, 200);
  assert.equal(harness.requests.length, 2);
  assert.match(harness.requests[0], /^https:\/\/api.trello.com\/1\/cards/);
  assert.match(harness.requests[1], /^https:\/\/ntfy\.sh\//);
});

test("verified delayed payments can complete fulfilment", async () => {
  const body = signedEvent("paid", {}, "checkout.session.async_payment_succeeded");
  const harness = webhookHarness();
  assert.equal((await harness.call(body, sign(body))).status, 200);
  assert.equal(harness.requests.length, 2);
});
