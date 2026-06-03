 "use client";

import { useEffect, useMemo, useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { colors } from "@/constants/colors";

const MONTHLY_PRICE = 9.99;
const YEARLY_PRICE = 99.99;

type Market = "us" | "uk" | "row";

const marketConfig: Record<
  Market,
  {
    currencySymbol: "$" | "£";
    monthlyPrice: number;
    yearlyPrice: number;
    rowDisclaimer?: string;
  }
> = {
  us: {
    currencySymbol: "$",
    monthlyPrice: MONTHLY_PRICE,
    yearlyPrice: YEARLY_PRICE,
  },
  uk: {
    currencySymbol: "£",
    monthlyPrice: MONTHLY_PRICE,
    yearlyPrice: YEARLY_PRICE,
  },
  row: {
    currencySymbol: "$",
    monthlyPrice: MONTHLY_PRICE,
    yearlyPrice: YEARLY_PRICE,
    rowDisclaimer:
      "Final app store pricing may vary by your location, currency conversion rates, and local taxes.",
  },
};

function getRegionFromLocale(locale: string): string | null {
  try {
    if (typeof Intl !== "undefined" && "Locale" in Intl) {
      const region = new Intl.Locale(locale).region;
      if (region) return region.toUpperCase();
    }
  } catch {
    // Fallback handled by regex below.
  }

  const match = locale.match(/[-_](\w{2})\b/);
  return match ? match[1].toUpperCase() : null;
}

function detectMarket(): Market {
  if (typeof navigator === "undefined") return "row";

  const localeCandidates = [
    navigator.language,
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
  ].filter(Boolean);

  for (const locale of localeCandidates) {
    const region = getRegionFromLocale(locale);
    if (region === "US") return "us";
    if (region === "GB" || region === "UK") return "uk";
  }

  return "row";
}

function formatCurrency(symbol: "$" | "£", amount: number): string {
  return `${symbol}${amount.toFixed(2)}`;
}

const sharedFeatures = [
  "Weekly planner goals, targets, and consistency tracking",
  "Advanced data tracking with detailed performance analytics",
  "Built-in + custom timers for intervals and AMRAPs",
  "Community leaderboard access and private forums",
  "Clear level progression and benchmark-based advancement",
] as const;

function PlanCard({
  label,
  price,
  subtext,
  valueNote,
  highlighted = false,
}: {
  label: string;
  price: string;
  subtext: string;
  valueNote: string;
  highlighted?: boolean;
}) {
  return (
    <article
      style={{
        position: "relative",
        borderRadius: "24px",
        border: highlighted ? `1px solid ${colors.brandBlue}` : `1px solid ${colors.borderLight}`,
        background: colors.bgPure,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          borderBottom: highlighted ? `1px solid ${colors.brandBlue}` : `1px solid ${colors.borderLight}`,
          background: highlighted ? colors.brandBlue : colors.bgOff,
          padding: "22px",
        }}
      >
        {highlighted ? (
          <span
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              padding: "5px 10px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Best Value
          </span>
        ) : null}

        <p
          style={{
            color: highlighted ? "rgba(255,255,255,0.82)" : colors.brandBlue,
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            color: highlighted ? "white" : colors.textMain,
            fontSize: "clamp(2rem, 4vw, 2.5rem)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "8px",
          }}
        >
          {price}
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: 0,
              marginLeft: "6px",
              color: highlighted ? "rgba(255,255,255,0.85)" : colors.textMuted,
            }}
          >
            /month
          </span>
        </p>
        <p
          style={{
            color: highlighted ? "rgba(255,255,255,0.85)" : colors.textMuted,
            fontSize: "0.95rem",
          }}
        >
          {subtext}
        </p>
      </div>

      <div style={{ padding: "22px" }}>
        <ul style={{ listStyle: "none", display: "grid", gap: "11px", marginBottom: "18px" }}>
          {sharedFeatures.map((feature) => (
            <li
              key={`${label}-${feature}`}
              style={{
                display: "grid",
                gridTemplateColumns: "18px 1fr",
                gap: "10px",
                alignItems: "start",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "9999px",
                  background: colors.bgBlueLight,
                  color: colors.brandBlue,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.72rem",
                  marginTop: "3px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                ✓
              </span>
              <p style={{ color: colors.textMain, fontSize: "0.95rem", lineHeight: 1.5 }}>{feature}</p>
            </li>
          ))}
        </ul>

        <p
          style={{
            color: highlighted ? colors.brandBlue : colors.textMuted,
            fontSize: "0.86rem",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          {valueNote}
        </p>

        <a
          href="#download"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "13px 20px",
            fontSize: "0.97rem",
            fontWeight: 600,
            borderRadius: "12px",
            background: highlighted ? colors.brandBlue : colors.bgPure,
            color: highlighted ? "white" : colors.brandBlue,
            border: highlighted ? `1px solid ${colors.brandBlue}` : `1px solid ${colors.brandBlue}`,
            textDecoration: "none",
          }}
        >
          Start 7-Day Free Trial
        </a>
      </div>
    </article>
  );
}

export function PricingSection() {
  const [market, setMarket] = useState<Market>("row");

  useEffect(() => {
    setMarket(detectMarket());
  }, []);

  const config = marketConfig[market];

  const { monthlyLabel, yearlyLabel, yearlySavings, yearlyDiscount } = useMemo(() => {
    const monthly = config.monthlyPrice;
    const yearly = config.yearlyPrice;
    const savings = monthly * 12 - yearly;
    const discount = (savings / (monthly * 12)) * 100;

    return {
      monthlyLabel: formatCurrency(config.currencySymbol, monthly),
      yearlyLabel: formatCurrency(config.currencySymbol, yearly),
      yearlySavings: savings,
      yearlyDiscount: discount,
    };
  }, [config.currencySymbol, config.monthlyPrice, config.yearlyPrice]);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{ padding: "120px 0", background: colors.bgPure }}
    >
      <PageContainer>
        <div
          style={{
            margin: "0 auto",
            maxWidth: "980px",
            padding: "clamp(10px, 2vw, 20px)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: colors.brandBlue,
                marginBottom: "1rem",
              }}
            >
              Pricing
            </span>
            <h2
              id="pricing-heading"
              style={{
                fontSize: "clamp(2rem, 3vw, 2.85rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: colors.textMain,
                marginBottom: "0.8rem",
              }}
            >
              Choose your plan.
            </h2>
            <p
              style={{
                color: colors.textMuted,
                fontSize: "1.07rem",
                maxWidth: "58ch",
                margin: "0 auto",
              }}
            >
              Two clean options, same full app access. Start with a 7-day free trial, then stay
              flexible monthly or lock in annual savings.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
              marginBottom: "16px",
            }}
          >
            <PlanCard
              label="Monthly Plan"
              price={monthlyLabel}
              subtext="Billed monthly. Cancel anytime."
              valueNote="Great if you want maximum flexibility."
            />
            <PlanCard
              label="Yearly"
              price={yearlyLabel}
              subtext={`Billed annually at ${yearlyLabel} total.`}
              valueNote={`Save ${formatCurrency(config.currencySymbol, yearlySavings)} per year (${Math.round(
                yearlyDiscount,
              )}% off).`}
              highlighted
            />
          </div>

          <p
            style={{
              textAlign: "center",
              color: colors.textLight,
              fontSize: "0.9rem",
              marginBottom: 0,
            }}
          >
            7-day free trial on all plans. No hidden fees.
          </p>
          {config.rowDisclaimer ? (
            <p
              style={{
                textAlign: "center",
                color: colors.textLight,
                fontSize: "0.82rem",
                marginTop: "8px",
                marginBottom: 0,
              }}
            >
              {config.rowDisclaimer}
            </p>
          ) : null}
        </div>
      </PageContainer>
    </section>
  );
}
