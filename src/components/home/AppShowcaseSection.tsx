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
  if (icon === "clock") {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
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

function MobileShowcaseBlock({ step }: { step: ShowcaseStep }) {
  const textOrder = step.mockupFirst ? 2 : 1;
  const mockupOrder = step.mockupFirst ? 1 : 2;

  return (
    <section
      id={step.sectionId}
      aria-labelledby={step.headingId}
      style={{ padding: "120px 0", backgroundColor: step.background }}
    >
      <PageContainer
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div style={{ order: textOrder }}>
          <ShowcaseCopy step={step} headingId={step.headingId} />
        </div>
        <div style={{ order: mockupOrder }}>
          <AppFrame screenshot={step.screenshot} />
        </div>
      </PageContainer>
    </section>
  );
}

export function AppShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const screenshotLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

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
              setActiveStepIndex(stepIndex);
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
        {appShowcaseSteps.map((step) => (
          <MobileShowcaseBlock key={step.id} step={step} />
        ))}
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
                opacity: index === 0 ? 1 : 0,
              }))}
            />
          </div>

          <div style={{ position: "relative" }}>
            <div className="sr-only" aria-live="polite">
              {appShowcaseSteps[activeStepIndex].title}
            </div>

            {appShowcaseSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(element) => {
                  textPanelRefs.current[index] = element;
                }}
                style={{
                  position: index === 0 ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: index === 0 ? 1 : 0,
                  transform: index === 0 ? "translateY(0)" : "translateY(12px)",
                }}
                aria-hidden={activeStepIndex !== index}
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
