"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { communityPage } from "@/content/community";
import { burpeeStat } from "@/content/site";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

const formatter = new Intl.NumberFormat("en-GB");

const HUB_URL = process.env.NEXT_PUBLIC_BURPEE_HUB_URL;
const TOTAL_UPDATED_EVENT = "BurpeeTotalUpdated";

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

  const renderValue = (value: number) => {
    if (numberRef.current) {
      numberRef.current.textContent = formatter.format(Math.floor(value));
    }
  };

  const animateTo = (value: number, duration: number) => {
    const counter = { value: displayedRef.current };
    gsap.to(counter, {
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
  const [burpee, ...staticStats] = stats;

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
          <LiveBurpeeStatCell label={burpee.label} />
          {staticStats.map((stat) => (
            <StaticStatCell key={stat.label} stat={stat} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
