// Shared client for the public community-activity endpoint
// (GET /api/v1/CommunityActivity on the BDT API).
//
// The level split is percentages only; the API never returns user counts.
// Several components on one page use this data, so the fetch is shared:
// whoever asks first triggers it, everyone else gets the same promise.

const HUB_URL = process.env.NEXT_PUBLIC_BURPEE_HUB_URL;

// The REST API shares an origin with the SignalR hub. Same derivation as
// CommunityStats and StoreRatings.
const ACTIVITY_URL = HUB_URL
  ? new URL("/api/v1/CommunityActivity", HUB_URL).toString()
  : undefined;

export type LevelShare = {
  label: string;
  percent: number;
};

export type CommunityActivity = {
  burpeesLast7Days: number;
  burpeesLast24Hours: number;
  workoutsLast7Days: number;
  minutesLast7Days: number;
  levelSplit: LevelShare[];
};

function isCount(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isLevelShare(value: unknown): value is LevelShare {
  if (typeof value !== "object" || value === null) return false;

  const { label, percent } = value as Partial<LevelShare>;

  return (
    typeof label === "string" &&
    label.length > 0 &&
    typeof percent === "number" &&
    Number.isFinite(percent) &&
    percent >= 0 &&
    percent <= 100
  );
}

let inflight: Promise<CommunityActivity | null> | null = null;

/**
 * Resolves to null when the endpoint is unreachable or the payload is not
 * usable; callers hide their section in that case.
 */
export function getCommunityActivity(): Promise<CommunityActivity | null> {
  if (!ACTIVITY_URL) return Promise.resolve(null);

  inflight ??= fetch(ACTIVITY_URL)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
    .then((json): CommunityActivity | null => {
      const data = json?.data;

      if (
        !data ||
        !isCount(data.burpeesLast7Days) ||
        !isCount(data.burpeesLast24Hours) ||
        !isCount(data.workoutsLast7Days) ||
        !isCount(data.minutesLast7Days) ||
        !Array.isArray(data.levelSplit)
      ) {
        return null;
      }

      return {
        burpeesLast7Days: data.burpeesLast7Days,
        burpeesLast24Hours: data.burpeesLast24Hours,
        workoutsLast7Days: data.workoutsLast7Days,
        minutesLast7Days: data.minutesLast7Days,
        levelSplit: data.levelSplit.filter(isLevelShare),
      };
    })
    .catch(() => null);

  return inflight;
}
