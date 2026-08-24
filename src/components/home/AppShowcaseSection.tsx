"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { appShowcaseSteps } from "@/content/site";
import { colors } from "@/constants/colors";
import { AppFrame } from "@/components/ui/AppFrame";
import { PageContainer } from "@/components/ui/PageContainer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ShowcaseStep = (typeof appShowcaseSteps)[number];

function ShowcaseIcon({ icon }: { icon: ShowcaseStep["icon"] }) {
  if (icon === "calendar") {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }

  if (icon === "map") {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    );
  }

  if (icon === "chart") {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    );
  }

  if (icon === "clock") {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }

  if (icon === "users") {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function ShowcaseCopy({
  step,
  headingId,
}: {
  step: ShowcaseStep;
  headingId?: string;
}) {
  return (
    <>
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
        {step.eyebrow}
      </span>
      <h2
        id={headingId}
        style={{
          fontSize: "clamp(2rem, 3vw, 3rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: colors.textMain,
          marginBottom: "1rem",
        }}
      >
        {step.title}
      </h2>
      <p style={{ color: colors.textMuted, fontSize: "1.125rem", marginBottom: "1.5rem" }}>
        {step.description}
      </p>
      <div
        style={{
          marginTop: "32px",
          width: "64px",
          height: "64px",
          background: colors.bgBlueLight,
          color: colors.brandBlue,
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden="true"
      >
        <ShowcaseIcon icon={step.icon} />
      </div>
    </>
  );
}

/**
 * Phone layout: one swipeable, snap-scrolling carousel instead of five
 * stacked blocks, so the tour is a flick-through rather than a long scroll.
 */
function MobileShowcaseCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });

    setActive((prev) => (prev === closest ? prev : closest));
  };

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;

    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <section id="program" aria-label="Inside the app" style={{ padding: "100px 0", backgroundColor: "#FFFFFF" }}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="showcase-carousel"
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "0 calc(max(24px, (100vw - min(88vw, 360px)) / 2)) 8px",
        }}
      >
        {appShowcaseSteps.map((step, index) => (
          <div
            key={step.id}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            style={{
              flex: "0 0 auto",
              width: "min(88vw, 360px)",
              scrollSnapAlign: "center",
            }}
          >
            <AppFrame screenshot={step.screenshot} />
            <div style={{ padding: "1.75rem 0.25rem 0" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: colors.brandBlue,
                  marginBottom: "0.5rem",
                }}
              >
                {step.eyebrow}
              </span>
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: colors.textMain,
                  margin: "0 0 0.5rem",
                }}
              >
                {step.title}
              </h3>
              <p style={{ color: colors.textMuted, fontSize: "1rem", lineHeight: 1.55, margin: 0 }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        aria-label="App screens"
        style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "1.75rem" }}
      >
        {appShowcaseSteps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Show: ${step.title}`}
            aria-current={active === index}
            style={{
              width: active === index ? "24px" : "8px",
              height: "8px",
              borderRadius: "9999px",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: active === index ? colors.brandBlue : "rgba(15, 23, 42, 0.2)",
              transition: "width 0.25s ease, background 0.25s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export function AppShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const screenshotLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const activeStepIndexRef = useRef(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        screenshotLayerRefs.current.forEach((layer, index) => {
          if (layer) {
            gsap.set(layer, { opacity: index === 0 ? 1 : 0 });
          }
        });

        textPanelRefs.current.forEach((panel, index) => {
          if (panel) {
            gsap.set(panel, { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 12 });
            panel.setAttribute("aria-hidden", index === 0 ? "false" : "true");
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${(appShowcaseSteps.length - 1) * 100}%`,
            pin: true,
            scrub: 0.5,
            snap: {
              snapTo: 1 / (appShowcaseSteps.length - 1),
              duration: { min: 0.15, max: 0.35 },
              ease: "power1.inOut",
            },
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const stepIndex = Math.round(self.progress * (appShowcaseSteps.length - 1));
              if (stepIndex === activeStepIndexRef.current) return;

              activeStepIndexRef.current = stepIndex;

              if (liveRegionRef.current) {
                liveRegionRef.current.textContent = appShowcaseSteps[stepIndex].title;
              }

              textPanelRefs.current.forEach((panel, index) => {
                panel?.setAttribute("aria-hidden", index === stepIndex ? "false" : "true");
              });
            },
          },
        });

        appShowcaseSteps.slice(1).forEach((step, index) => {
          const prevIndex = index;
          const nextIndex = index + 1;

          tl.to(screenshotLayerRefs.current[prevIndex], { opacity: 0, duration: 0.4 })
            .to(screenshotLayerRefs.current[nextIndex], { opacity: 1, duration: 0.4 }, "<")
            .to(textPanelRefs.current[prevIndex], { opacity: 0, y: -12, duration: 0.4 }, "<")
            .to(textPanelRefs.current[nextIndex], { opacity: 1, y: 0, duration: 0.4 }, "<")
            .to(
              sectionRef.current,
              { backgroundColor: step.background, duration: 0.4 },
              "<",
            );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <>
      <div className="showcase-mobile">
        <MobileShowcaseCarousel />
      </div>

      <section
        ref={sectionRef}
        id="program"
        aria-labelledby="program-heading"
        className="showcase-desktop"
        style={{
          padding: "120px 0",
          backgroundColor: appShowcaseSteps[0].background,
        }}
      >
        <PageContainer
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(320px, 1fr) minmax(300px, 1.2fr)",
            gap: "80px",
            alignItems: "center",
          }}
        >
          <div>
            <AppFrame
              screenshotLayers={appShowcaseSteps.map((step, index) => ({
                screenshot: step.screenshot,
                layerRef: (element: HTMLDivElement | null) => {
                  screenshotLayerRefs.current[index] = element;
                },
                layerIndex: index,
              }))}
            />
          </div>

          <div style={{ position: "relative" }}>
            <div ref={liveRegionRef} className="sr-only" aria-live="polite">
              {appShowcaseSteps[0].title}
            </div>

            {appShowcaseSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(element) => {
                  textPanelRefs.current[index] = element;
                }}
                className={`showcase-text-panel${index === 0 ? " showcase-text-panel--first" : ""}`}
                aria-hidden={index !== 0}
              >
                <ShowcaseCopy
                  step={step}
                  headingId={index === 0 ? step.headingId : undefined}
                />
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
