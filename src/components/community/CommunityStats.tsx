"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { communityPage } from "@/content/community";
import { burpeeStat, countryStat } from "@/content/site";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

const formatter = new Intl.NumberFormat("en-GB");

const HUB_URL = process.env.NEXT_PUBLIC_BURPEE_HUB_URL;
const TOTAL_UPDATED_EVENT = "BurpeeTotalUpdated";

// The REST API lives on the same origin as the SignalR hub, so derive the
// country-stats URL from the hub URL rather than adding another env var
// (which would also need setting in all three GitHub workflow files).
const COUNTRY_STATS_URL = HUB_URL
  ? new URL("/api/v1/CountryStats", HUB_URL).toString()
  : undefined;

type StaticStat = {
  value: string;
  suffix?: string;
  label: string;
};

function LiveBurpeeStatCell({ label }: { label: string }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef<number>(burpeeStat.value);
  const displayedRef = useRef<number>(burpeeStat.value);
  const reducedMotionRef = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null); // in-flight count-up

  const renderValue = (value: number) => {
    if (numberRef.current) {
      numberRef.current.textContent = formatter.format(Math.floor(value));
    }
  };

  // IMPORTANT: always kill the previous tween before starting a new one.
  // The mount-time tween targets the static burpeeStat.value fallback; the
  // SignalR tween targets the live total. If both run concurrently, whichever
  // finishes LAST wins, letting the fallback tween overwrite the live value
  // so the cell gets stuck on 3,600,000. Do not remove the kill().
  const animateTo = (value: number, duration: number) => {
    tweenRef.current?.kill();
    const counter = { value: displayedRef.current };
    tweenRef.current = gsap.to(counter, {
      value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        displayedRef.current = counter.value;
        renderValue(counter.value);
      },
    });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = prefersReducedMotion;

    if (prefersReducedMotion) {
      renderValue(targetRef.current);
    } else {
      animateTo(targetRef.current, 1.2);
    }

    if (!HUB_URL) return;

    const connection = new HubConnectionBuilder()
      .withUrl(HUB_URL, { withCredentials: false })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    connection.on(TOTAL_UPDATED_EVENT, (total: number) => {
      if (typeof total !== "number" || !Number.isFinite(total)) return;
      targetRef.current = total;

      if (reducedMotionRef.current) {
        displayedRef.current = total;
        renderValue(total);
      } else {
        animateTo(total, 1.2);
      }
    });

    connection.start().catch(() => {});

    return () => {
      connection.stop().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        padding: "2rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 800,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
          color: "white",
          lineHeight: 1,
          marginBottom: "0.75rem",
        }}
        aria-label={`${formatter.format(burpeeStat.value)}${burpeeStat.valueSuffix}`}
      >
        <span ref={numberRef}>{formatter.format(burpeeStat.value)}</span>
        <span style={{ color: colors.accentLight }}>{burpeeStat.valueSuffix}</span>
      </div>
      <p
        style={{
          margin: 0,
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.95rem",
          lineHeight: 1.5,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function LiveCountryStatCell({ label }: { label: string }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const displayedRef = useRef<number>(countryStat.value);
  const tweenRef = useRef<gsap.core.Tween | null>(null); // in-flight count-up

  const renderValue = (value: number) => {
    if (numberRef.current) {
      numberRef.current.textContent = formatter.format(Math.floor(value));
    }
  };

  // Same rule as the burpee cells: kill any in-flight tween so the number
  // always ENDS at the latest API value, never at the static fallback.
  const animateTo = (value: number, duration: number) => {
    tweenRef.current?.kill();
    const counter = { value: displayedRef.current };
    tweenRef.current = gsap.to(counter, {
      value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        displayedRef.current = counter.value;
        renderValue(counter.value);
      },
    });
  };

  useEffect(() => {
    if (!COUNTRY_STATS_URL) return;

    const controller = new AbortController();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fetch the real country count once on mount. The static countryStat
    // fallback is only ever shown if this request fails; when it succeeds,
    // the cell must always display the API value.
    fetch(COUNTRY_STATS_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((json) => {
        const total = json?.data?.totalCountries;
        if (typeof total !== "number" || !Number.isFinite(total) || total <= 0) return;

        if (prefersReducedMotion) {
          displayedRef.current = total;
          renderValue(total);
        } else {
          animateTo(total, 1.2);
        }
      })
      // Fail silently; the static fallback number stays on screen.
      .catch(() => {});

    return () => controller.abort();
    // animateTo/renderValue only read refs, so they're stable; no deps needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        padding: "2rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 800,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
          color: "white",
          lineHeight: 1,
          marginBottom: "0.75rem",
        }}
        aria-label={`${formatter.format(countryStat.value)}${countryStat.valueSuffix}`}
      >
        <span ref={numberRef}>{formatter.format(countryStat.value)}</span>
        <span style={{ color: colors.accentLight }}>{countryStat.valueSuffix}</span>
      </div>
      <p
        style={{
          margin: 0,
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.95rem",
          lineHeight: 1.5,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function StaticStatCell({ stat }: { stat: StaticStat }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        padding: "2rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 800,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
          color: "white",
          lineHeight: 1,
          marginBottom: "0.75rem",
        }}
      >
        {stat.value}
        {stat.suffix ? <span style={{ color: colors.accentLight }}>{stat.suffix}</span> : null}
      </div>
      <p
        style={{
          margin: 0,
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.95rem",
          lineHeight: 1.5,
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export function CommunityStats() {
  const { stats } = communityPage;

  return (
    <section aria-label="Community at a glance" style={{ padding: "0 0 80px" }}>
      <PageContainer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "1rem",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {stats.map((stat) =>
            "kind" in stat && stat.kind === "burpee" ? (
              <LiveBurpeeStatCell key={stat.label} label={stat.label} />
            ) : "kind" in stat && stat.kind === "countries" ? (
              <LiveCountryStatCell key={stat.label} label={stat.label} />
            ) : (
              <StaticStatCell key={stat.label} stat={stat as StaticStat} />
            ),
          )}
        </div>
      </PageContainer>
    </section>
  );
}
