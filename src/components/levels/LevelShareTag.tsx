"use client";

import { useEffect, useState } from "react";
import { colors } from "@/constants/colors";
import { getCommunityActivity, type LevelShare } from "@/lib/community-activity";

/**
 * Small inline chip next to a level heading: "31% of active app users".
 * Percentages only; the API never exposes user counts. Renders nothing
 * until real data arrives, so a failed fetch leaves the heading unchanged.
 *
 * levelKey is the sublevel id from content/levels.ts ("1a" ... "4b") or
 * "graduation"; the API labels come from the app's StaticLevelsV2 names
 * ("Level1A" ... "Graduation").
 */
export function LevelShareTag({
  levelKey,
  showDefinition = false,
}: {
  levelKey: string;
  /** Also print what "active" means. Used once, on the Graduation block. */
  showDefinition?: boolean;
}) {
  const [split, setSplit] = useState<LevelShare[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCommunityActivity().then((activity) => {
      if (cancelled || !activity) return;
      if (activity.levelSplit.length === 0) return;

      setSplit(activity.levelSplit);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!split) return null;

  const apiLabel =
    levelKey === "graduation" ? "Graduation" : `Level${levelKey.toUpperCase()}`;
  const share = split.find((entry) => entry.label === apiLabel);

  if (!share) return null;

  return (
    <>
      <span
        aria-label={`${share.percent}% of active app users are at this level`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 12px",
          borderRadius: "9999px",
          background: colors.bgBlueLight,
          color: colors.brandBlue,
          fontSize: "0.8rem",
          fontWeight: 700,
          whiteSpace: "nowrap",
          lineHeight: 1.4,
        }}
      >
        {share.percent}% of active app users
      </span>
      {showDefinition ? (
        <p
          style={{
            flexBasis: "100%",
            margin: "4px 0 0",
            fontSize: "0.75rem",
            color: colors.textLight,
          }}
        >
          Active app users: 10+ logged workouts and training within the last 30 days.
        </p>
      ) : null}
    </>
  );
}
