// The shop page is served from busydadtraining.com (GitHub Pages) and calls
// this API on a different origin (the Azure Static Web App domain), so every
// response needs these headers or the browser blocks it.
const ALLOWED_ORIGINS = new Set([
  "https://busydadtraining.com",
  "https://www.busydadtraining.com",
]);

function corsHeaders(request) {
  const origin = request.headers.get("origin");
  const allowOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://busydadtraining.com";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, stripe-signature",
    Vary: "Origin",
  };
}

function jsonResponse(request, status, body) {
  return {
    status,
    jsonBody: body,
    headers: { ...corsHeaders(request), "Content-Type": "application/json" },
  };
}

function optionsResponse(request) {
  return { status: 204, headers: corsHeaders(request) };
}

module.exports = { corsHeaders, jsonResponse, optionsResponse };
