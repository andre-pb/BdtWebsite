// Shared client for the public promotion endpoint
// (GET /api/v1/Promotions/Public on the BDT API).
//
// Returns the challenge/promotion currently open for joining — the same
// Promotions row staff manage in BusyDadManagement — so the site's banners
// switch themselves on and off without a redeploy. Marketing copy and dates
// only; the API never returns user data or enrollment counts.
//
// Several components on one page use this, so the fetch is shared: whoever
// asks first triggers it, everyone else gets the same promise.

const HUB_URL = process.env.NEXT_PUBLIC_BURPEE_HUB_URL;

// The REST API shares an origin with the SignalR hub. Same derivation as
// community-activity.ts and StoreRatings.
const PROMOTION_URL = HUB_URL
  ? new URL("/api/v1/Promotions/Public", HUB_URL).toString()
  : undefined;

export type ActivePromotion = {
  name: string;
  description: string | null;
  /** Join window (UTC instants). */
  dateFrom: Date;
  dateTo: Date;
  weeksTotal: number;
  fullWeekMinutes: number;
  /**
   * Last calendar day people can join. The API pads DateTo so that day has
   * ended everywhere on Earth (the following day, 12:00 UTC); undo that for
   * display. Rows that weren't shaped that way fall back to DateTo's date.
   */
  lastJoinDay: Date;
};

function parseUtc(value: unknown): Date | null {
  if (typeof value !== "string" || !value) return null;
  const date = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(value) ? value : `${value}Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function lastJoinDayFrom(dateTo: Date): Date {
  const day = new Date(dateTo);
  if (day.getUTCHours() === 12 && day.getUTCMinutes() === 0) {
    day.setUTCDate(day.getUTCDate() - 1);
  }
  return day;
}

let inflight: Promise<ActivePromotion | null> | null = null;

/**
 * Resolves to null when nothing is live, the endpoint is unreachable, or the
 * payload is not usable; callers render nothing in that case.
 */
export function getActivePromotion(): Promise<ActivePromotion | null> {
  if (!PROMOTION_URL) return Promise.resolve(null);

  inflight ??= fetch(PROMOTION_URL)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
    .then((json): ActivePromotion | null => {
      const data = json?.data;
      if (!data || typeof data.name !== "string" || !data.name) return null;

      const dateFrom = parseUtc(data.dateFrom);
      const dateTo = parseUtc(data.dateTo);
      if (!dateFrom || !dateTo) return null;

      // Belt and braces: the API already filters to the live window, but a
      // cached response can straddle the closing moment.
      const now = new Date();
      if (now < dateFrom || now > dateTo) return null;

      return {
        name: data.name,
        description: typeof data.userDescription === "string" ? data.userDescription : null,
        dateFrom,
        dateTo,
        weeksTotal: Number.isFinite(data.weeksTotal) && data.weeksTotal > 0 ? data.weeksTotal : 4,
        fullWeekMinutes:
          Number.isFinite(data.fullWeekMinutes) && data.fullWeekMinutes > 0 ? data.fullWeekMinutes : 80,
        lastJoinDay: lastJoinDayFrom(dateTo),
      };
    })
    .catch(() => null);

  return inflight;
}

/** "30 September" style, for "Join by …" copy. */
export function formatJoinBy(promotion: ActivePromotion): string {
  return promotion.lastJoinDay.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
