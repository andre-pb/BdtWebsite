"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { storeRatings } from "@/content/site";
import { colors } from "@/constants/colors";

const HUB_URL = process.env.NEXT_PUBLIC_BURPEE_HUB_URL;

// The REST API shares an origin with the SignalR hub, so derive the URL from
// the hub instead of adding another env var (which would also need setting in
// all three GitHub workflow files) — same approach as CommunityStats.
const STORE_RATINGS_URL = HUB_URL
  ? new URL("/api/v1/StoreRatings", HUB_URL).toString()
  : undefined;

type StoreKey = "apple" | "google";

type Rating = {
  rating: number;
  ratingCount: number;
};

/**
 * Only accept a live value that could actually be a star rating. A malformed
 * response should leave the build-time numbers on screen, not blank them.
 */
function isUsable(value: unknown): value is Rating {
  if (typeof value !== "object" || value === null) return false;

  const { rating, ratingCount } = value as Partial<Rating>;

  return (
    typeof rating === "number" &&
    Number.isFinite(rating) &&
    rating > 0 &&
    rating <= 5 &&
    typeof ratingCount === "number" &&
    Number.isFinite(ratingCount) &&
    ratingCount > 0
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill={colors.accentLight} aria-hidden="true">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function StorePill({
  label,
  storeUrl,
  rating,
}: {
  label: string;
  storeUrl: string;
  rating: number;
}) {
  return (
    <a
      href={storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: rated ${rating.toFixed(1)} out of 5`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "9999px",
        textDecoration: "none",
        color: "white",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}
    >
      <StarIcon />
      <span
        style={{
          fontWeight: 700,
          fontSize: "0.95rem",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {rating.toFixed(1)}
      </span>
      <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem" }}>
        {label}
      </span>
    </a>
  );
}

/**
 * Live App Store / Google Play ratings.
 *
 * Renders the build-time numbers immediately (so there is never an empty gap
 * or a layout shift) and quietly replaces them with the live API values once
 * they arrive. If the API is unreachable the static numbers simply stay.
 */
export function StoreRatings({ style }: { style?: CSSProperties }) {
  const [live, setLive] = useState<Partial<Record<StoreKey, Rating>>>({});

  useEffect(() => {
    if (!STORE_RATINGS_URL) return;

    const controller = new AbortController();

    fetch(STORE_RATINGS_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((json) => {
        const data = json?.data;
        const next: Partial<Record<StoreKey, Rating>> = {};

        if (isUsable(data?.apple)) next.apple = data.apple;
        if (isUsable(data?.google)) next.google = data.google;

        if (Object.keys(next).length > 0) setLive(next);
      })
      // Fail silently — the static fallback numbers stay on screen.
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const stores: { key: StoreKey; label: string; storeUrl: string }[] = [
    { key: "apple", label: storeRatings.apple.label, storeUrl: storeRatings.apple.storeUrl },
    { key: "google", label: storeRatings.google.label, storeUrl: storeRatings.google.storeUrl },
  ];

  return (
    <div
      aria-label="App store ratings"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        ...style,
      }}
    >
      {stores.map(({ key, label, storeUrl }) => {
        const fallback = storeRatings[key];
        const current = live[key] ?? fallback;

        return (
          <StorePill
            key={key}
            label={label}
            storeUrl={storeUrl}
            rating={current.rating}
          />
        );
      })}
    </div>
  );
}
