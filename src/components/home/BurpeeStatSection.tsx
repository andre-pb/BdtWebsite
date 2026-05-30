"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { burpeeStat } from "@/content/site";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const formatter = new Intl.NumberFormat("en-GB");

export function BurpeeStatSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const number = numberRef.current;
      if (!number) return;

      const target = burpeeStat.value;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { value: 0 };
        number.textContent = "0";

        const tween = gsap.to(counter, {
          value: target,
          duration: 2.4,
          ease: "power2.out",
          onUpdate: () => {
            number.textContent = formatter.format(Math.floor(counter.value));
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        number.textContent = formatter.format(target);
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

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
