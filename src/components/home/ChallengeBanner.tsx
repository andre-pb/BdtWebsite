"use client";

// Live challenge / promotion callout, driven by the BDT API (see
// lib/promotion.ts). Renders NOTHING unless a promotion is currently open
// for joining, so outside a campaign the page is exactly as it was.
//
// Two placements share the data:
//   - "hero"    — a glowing pill just above the store buttons (below the
//                 "Best for:" line): every visitor sees it, and the buttons
//                 to join are the very next thing.
//   - "pricing" — an aside above the plan cards, where the "should I pay?"
//                 hesitation happens: "…or try it free through the challenge".
//
// Joining happens in the app (it needs an account + RevenueCat), so both
// point at the download section.

import { useEffect, useState } from "react";
import { colors } from "@/constants/colors";
import { AppStoreBadge, GooglePlayBadge } from "@/components/ui/AppStoreBadges";
import { formatJoinBy, getActivePromotion, type ActivePromotion } from "@/lib/promotion";

type Variant = "hero" | "pricing";

function usePromotion(): ActivePromotion | null {
  const [promotion, setPromotion] = useState<ActivePromotion | null>(null);

  useEffect(() => {
    let cancelled = false;
    getActivePromotion().then((result) => {
      if (!cancelled) setPromotion(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return promotion;
}

const STYLES = `
@keyframes challenge-banner-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes challenge-banner-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.55); }
  70%      { box-shadow: 0 0 0 7px rgba(96, 165, 250, 0); }
}
.challenge-hero-pill {
  animation: challenge-banner-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.challenge-hero-dot {
  animation: challenge-banner-pulse 2s ease-out infinite;
}
.challenge-pricing-aside {
  animation: challenge-banner-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
@media (max-width: 640px) {
  .challenge-hero-pill { font-size: 0.82rem !important; padding: 9px 14px !important; }
}
@media (prefers-reduced-motion: reduce) {
  .challenge-hero-pill, .challenge-pricing-aside { animation: none; }
  .challenge-hero-dot { animation: none; }
}
`;

// Not a link on purpose: it sits directly above the App Store / Google Play
// buttons, which are the intended next click.
function HeroPill({ promotion }: { promotion: ActivePromotion }) {
  return (
    <div
      role="status"
      className="challenge-hero-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        maxWidth: "100%",
        // "Best for" line ends with 32px below it and the store badges carry
        // 40px above them; 8px on top makes the pill sit evenly between them.
        margin: "0.5rem auto 0",
        padding: "10px 18px 10px 14px",
        borderRadius: "9999px",
        border: "1px solid rgba(96, 165, 250, 0.45)",
        background: "rgba(0, 85, 255, 0.18)",
        backdropFilter: "blur(8px)",
        color: "white",
        fontSize: "0.92rem",
        fontWeight: 600,
        lineHeight: 1.3,
        textAlign: "left",
      }}
    >
      <span
        className="challenge-hero-dot"
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: "9px",
          height: "9px",
          borderRadius: "9999px",
          background: colors.accentLight,
        }}
      />
      <span>
        <strong style={{ fontWeight: 800 }}>{promotion.name} is on.</strong>
        {" "}Train free for up to {promotion.weeksTotal} weeks, no card needed.
      </span>
    </div>
  );
}

function PricingAside({ promotion }: { promotion: ActivePromotion }) {
  const description =
    promotion.description ??
    `Join free in the app, no card needed. Hit ${promotion.fullWeekMinutes} minutes of training a week and each completed week unlocks the next, up to ${promotion.weeksTotal} weeks free.`;

  return (
    <aside
      className="challenge-pricing-aside"
      aria-label={`${promotion.name}: train free`}
      style={{
        borderRadius: "20px",
        border: `1px solid ${colors.borderBlue}`,
        background: colors.bgBlueLight,
        padding: "20px 22px",
        marginBottom: "24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
      }}
    >
      <div style={{ minWidth: "220px", flex: "1 1 280px" }}>
        <p
          style={{
            color: colors.brandBlue,
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          🏆 {promotion.name} · Join by {formatJoinBy(promotion)}
        </p>
        <p style={{ color: colors.textMain, fontSize: "0.95rem", lineHeight: 1.5 }}>
          {description}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
        <AppStoreBadge />
        <GooglePlayBadge />
      </div>
    </aside>
  );
}

export function ChallengeBanner({ variant }: { variant: Variant }) {
  const promotion = usePromotion();
  if (!promotion) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      {variant === "hero" ? <HeroPill promotion={promotion} /> : <PricingAside promotion={promotion} />}
    </>
  );
}
