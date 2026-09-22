// Reads secrets (Stripe/Printful/Trello keys) for the shop's live functions.
//
// The proper place for these is the Static Web App's "Application settings"
// in the Azure Portal (Configuration blade) — process.env picks those up
// automatically with zero code changes. We don't currently have portal
// access to set those, so the GitHub Actions workflow instead writes them
// into generated-settings.json at build time, from the repo's existing
// GitHub secrets, and that file ships inside this Functions app (it is
// never served over HTTP — Azure only exposes the routes registered in
// src/functions, not the underlying files).
//
// process.env always wins if a value is present there, so once someone
// configures real Application Settings in the Portal, this file becomes a
// harmless no-op fallback and can be deleted.
const fs = require("node:fs");
const path = require("node:path");

let generated = {};
try {
  const raw = fs.readFileSync(path.join(__dirname, "generated-settings.json"), "utf8");
  generated = JSON.parse(raw);
} catch {
  // No generated file (e.g. local dev with a local.settings.json) — fine.
}

function getSetting(name) {
  return process.env[name] || generated[name] || "";
}

module.exports = { getSetting };
