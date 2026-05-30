"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { burpeeStat } from "@/content/site";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const formatter = new Intl.NumberFormat("en-GB");

// Anonymous, receive-only SignalR hub on the app API. It sends the current
// total on connect and again whenever a workout is logged.
const HUB_URL = process.env.NEXT_PUBLIC_BURPEE_HUB_URL;
const TOTAL_UPDATED_EVENT = "BurpeeTotalUpdated";

export function BurpeeStatSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // Shared between the GSAP animation and the SignalR listener.
  const targetRef = useRef<number>(burpeeStat.value); // latest known total
  const displayedRef = useRef<number>(0); // value currently on screen
  const enteredRef = useRef<boolean>(false); // has the scroll-in run yet
  const reducedMotionRef = useRef<boolean>(false);

  const renderValue = (value: number) => {
    if (numberRef.current) {
      numberRef.current.textContent = formatter.format(Math.floor(value));
    }
  };

  // Tween the displayed number from its current value to `value`.
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

  useGSAP(
    () => {
      const number = numberRef.current;
      if (!number) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        number.textContent = "0";

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            enteredRef.current = true;
            // Animate to the latest total received so far (live or fallback).
            animateTo(targetRef.current, 2.4);
          },
        });

        return () => trigger.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        reducedMotionRef.current = true;
        enteredRef.current = true;
        displayedRef.current = targetRef.current;
        renderValue(targetRef.current);
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Live updates from the burpee hub.
  useEffect(() => {
    if (!HUB_URL) return;

    const connection = new HubConnectionBuilder()
      // Anonymous hub: no cookies/auth, so don't send credentials. A
      // credentialed CORS request would require Access-Control-Allow-Credentials
      // on the API, which the shared policy intentionally doesn't set.
      .withUrl(HUB_URL, { withCredentials: false })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    connection.on(TOTAL_UPDATED_EVENT, (total: number) => {
      if (typeof total !== "number" || !Number.isFinite(total)) return;
      // The hub is authoritative — always take its value, even if it's lower
      // than the static fallback (the real DB total is below the marketing
      // placeholder until enough reps accumulate).
      targetRef.current = total;

      if (reducedMotionRef.current) {
        displayedRef.current = total;
        renderValue(total);
      } else if (enteredRef.current) {
        animateTo(total, 1.2);
      }
      // If the section hasn't scrolled into view yet, the scroll-in
      // animation will pick up the latest targetRef value.
    });

    // Fail silently — the static fallback number stays on screen.
    connection.start().catch(() => {});

    return () => {
      connection.stop().catch(() => {});
    };
    // animateTo/renderValue only read refs, so they're stable — no deps needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      id="burpee-stat"
      aria-labelledby="burpee-stat-heading"
      style={{
        padding: "120px 0",
        background: colors.heroDark,
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,85,255,0.18), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <PageContainer style={{ position: "relative" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: colors.accentLight,
            marginBottom: "1.5rem",
          }}
        >
          {burpeeStat.eyebrow}
        </span>
        <h2
          id="burpee-stat-heading"
          style={{
            fontSize: "clamp(3.25rem, 10vw, 6.5rem)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "white",
            margin: 0,
            fontVariantNumeric: "tabular-nums",
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            gap: "0.05em",
          }}
        >
          <span
            ref={numberRef}
            aria-label={`${formatter.format(burpeeStat.value)}${burpeeStat.valueSuffix}`}
          >
            {formatter.format(burpeeStat.value)}
          </span>
          <span style={{ color: colors.brandBlue }} aria-hidden="true">
            {burpeeStat.valueSuffix}
          </span>
        </h2>
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "clamp(1.125rem, 2.2vw, 1.375rem)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.92)",
            letterSpacing: "-0.005em",
          }}
        >
          {burpeeStat.label}
        </p>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "480px",
            marginInline: "auto",
          }}
        >
          {burpeeStat.caption}
        </p>
      </PageContainer>
    </section>
  );
}
