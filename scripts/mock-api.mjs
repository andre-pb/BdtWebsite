/**
 * Dev-only mock of the BDT API's public endpoints, so the website's live
 * sections (ratings, activity stats, level split, latest videos) can be
 * previewed before the real API is deployed.
 *
 * Usage:
 *   1. node scripts/mock-api.mjs        (leave running)
 *   2. .env.development.local points NEXT_PUBLIC_BURPEE_HUB_URL at
 *      http://localhost:5050, so `npm run dev` calls this server.
 *
 * Delete .env.development.local (or comment the line out) to point dev back
 * at the real API. Production builds are unaffected: the GitHub workflows
 * set their env vars explicitly.
 */
import http from "node:http";

const PORT = 5050;

const wrap = (data) => ({ data, isSuccess: true, errorMessage: null });

// Sums to exactly 100, like the real endpoint guarantees.
const levelSplit = [
  { label: "Level1A", percent: 18 },
  { label: "Level1B", percent: 14 },
  { label: "Level1C", percent: 12 },
  { label: "Level1D", percent: 10 },
  { label: "Level2A", percent: 13 },
  { label: "Level2B", percent: 9 },
  { label: "Level3A", percent: 8 },
  { label: "Level3B", percent: 6 },
  { label: "Level4A", percent: 5 },
  { label: "Level4B", percent: 3 },
  { label: "Graduation", percent: 2 },
];

// Real videos from the channel, so thumbnails and links work.
const videos = [
  { videoId: "ftJ7kR04HvU", title: "My Burpee Physique Transformation" },
  { videoId: "Cmr-3w4tosU", title: "The Purity Of Burpee Training" },
  { videoId: "mG65I8wh2GI", title: "Busy Dad Training 101: 300 6-count military burpees, 20 mins 33 seconds" },
  { videoId: "QvEutJbKQVo", title: "Busy Dad Resistance Training: 120 Navy Seal burpees, STRICT form" },
  { videoId: "ZDJhKLN_l9c", title: "Burpees and Self-Respect - Busy Dad Podcast S2E3" },
  { videoId: "2xda25TLfzM", title: "Busy Dad Podcast, Episode 13: Eric's Burpee-Fueled Comeback" },
].map((v, i) => ({
  ...v,
  thumbnailUrl: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
  publishedAt: new Date(Date.now() - (i + 2) * 5 * 86400000).toISOString(),
}));

const routes = {
  "/api/v1/communityactivity": wrap({
    burpeesLast7Days: 41230,
    burpeesLast24Hours: 6120,
    workoutsLast7Days: 1480,
    minutesLast7Days: 29600,
    levelSplit,
    updatedUtc: new Date().toISOString(),
  }),
  "/api/v1/storeratings": wrap({
    apple: { rating: 4.61, ratingCount: 66, source: "live" },
    google: { rating: 4.11, ratingCount: 78, source: "live" },
    combined: { rating: 4.34, ratingCount: 144, source: "live" },
    appVersion: "3.0.3",
    appUpdatedUtc: "2026-08-13T20:02:28Z",
    updatedUtc: new Date().toISOString(),
  }),
  "/api/v1/countrystats": wrap({ totalCountries: 23, countries: [] }),
  "/api/v1/publicvideos/recent": wrap({ items: videos, nextPageToken: null }),
};

http
  .createServer((req, res) => {
    const path = new URL(req.url, `http://localhost:${PORT}`).pathname.toLowerCase().replace(/\/$/, "");
    const body = routes[path];

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    if (!body) {
      res.writeHead(404);
      res.end(JSON.stringify({ isSuccess: false, errorMessage: `No mock for ${path}` }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(body));
    console.log(`200 ${path}`);
  })
  .listen(PORT, () => console.log(`Mock BDT API on http://localhost:${PORT}`));
