"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { testimonials } from "@/content/site";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

gsap.registerPlugin(useGSAP);

type TestimonialQuote = (typeof testimonials.quotes)[number];

const CARD_WIDTH = 360;
const CARD_GAP = 24;
const MARQUEE_SPEED = 36;

function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: TestimonialQuote;
  className?: string;
}) {
  return (
    <figure
      className={className}
      style={{
        background: colors.bgPure,
        borderRadius: "24px",
        border: `1px solid ${colors.borderLight}`,
        padding: "32px",
        margin: 0,
        width: CARD_WIDTH,
        minWidth: CARD_WIDTH,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "0 10px 40px -20px rgba(0,0,0,0.06)",
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill={colors.brandBlue}
        style={{ opacity: 0.85 }}
      >
        <path d="M9.5 6C5.91 6 3 8.91 3 12.5V18h6v-5.5H6.5c0-1.66 1.34-3 3-3V6zm11 0c-3.59 0-6.5 2.91-6.5 6.5V18h6v-5.5h-2.5c0-1.66 1.34-3 3-3V6z" />
      </svg>
      <blockquote
        style={{
          margin: 0,
          color: colors.textMain,
          fontSize: "1rem",
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {testimonial.quote}
      </blockquote>
      <figcaption style={{ marginTop: "auto" }}>
        <div
          style={{
            fontWeight: 700,
            color: colors.textMain,
            fontSize: "1rem",
          }}
        >
          {testimonial.name}
        </div>
        <div
          style={{
            color: colors.textMuted,
            fontSize: "0.9rem",
            marginTop: "2px",
          }}
        >
          {testimonial.role}
        </div>
      </figcaption>
    </figure>
  );
}

function TestimonialSet({
  quotes,
  setRef,
  ariaHidden,
  suffix,
}: {
  quotes: readonly TestimonialQuote[];
  setRef?: RefObject<HTMLDivElement | null>;
  ariaHidden?: boolean;
  suffix: string;
}) {
  return (
    <div
      ref={setRef}
      aria-hidden={ariaHidden}
      style={{
        display: "flex",
        gap: CARD_GAP,
        flexShrink: 0,
      }}
    >
      {quotes.map((testimonial) => (
        <TestimonialCard
          key={`${testimonial.name}-${suffix}`}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const set = setRef.current;
      if (!track || !set) return;

      const setupMarquee = () => {
        tweenRef.current?.kill();
        gsap.set(track, { x: 0 });

        const distance = set.offsetWidth + CARD_GAP;
        // fromTo ensures clean repeat behaviour — GSAP resets to the exact
        // `from` values on each loop, eliminating the 1-frame flash that
        // `to()` with repeat: -1 can produce.
        tweenRef.current = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: -distance,
            duration: distance / MARQUEE_SPEED,
            ease: "none",
            repeat: -1,
          },
        );
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        setupMarquee();
        window.addEventListener("resize", setupMarquee);

        return () => {
          window.removeEventListener("resize", setupMarquee);
          tweenRef.current?.kill();
          tweenRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  const pauseMarquee = () => tweenRef.current?.pause();
  const resumeMarquee = () => tweenRef.current?.resume();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      style={{ padding: "120px 0", background: colors.bgOff }}
    >
      <PageContainer>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
            {testimonials.eyebrow}
          </span>
          <h2
            id="testimonials-heading"
            style={{
              fontSize: "clamp(2rem, 3vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: colors.textMain,
              marginBottom: "1rem",
            }}
          >
            {testimonials.title}
          </h2>
          <p
            style={{
              color: colors.textMuted,
              fontSize: "1.125rem",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            {testimonials.description}
          </p>
        </div>
      </PageContainer>

      <div
        ref={containerRef}
        className="testimonials-marquee"
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0 auto 0 0",
            width: "min(120px, 12vw)",
            background: `linear-gradient(to right, ${colors.bgOff}, transparent)`,
            zIndex: 1,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0 0 0 auto",
            width: "min(120px, 12vw)",
            background: `linear-gradient(to left, ${colors.bgOff}, transparent)`,
            zIndex: 1,
          }}
        />

        <div
          ref={trackRef}
          className="testimonials-marquee-track"
          style={{
            display: "flex",
            width: "max-content",
            gap: CARD_GAP,
            willChange: "transform",
          }}
        >
          {/* 4 duplicate sets ensure there is always buffered content on
              screen when GSAP resets the tween from -distance back to 0,
              eliminating the white gap. */}
          <TestimonialSet
            quotes={testimonials.quotes}
            setRef={setRef}
            suffix="a"
          />
          <TestimonialSet
            quotes={testimonials.quotes}
            ariaHidden
            suffix="b"
          />
          <TestimonialSet
            quotes={testimonials.quotes}
            ariaHidden
            suffix="c"
          />
          <TestimonialSet
            quotes={testimonials.quotes}
            ariaHidden
            suffix="d"
          />
        </div>
      </div>
    </section>
  );
}
