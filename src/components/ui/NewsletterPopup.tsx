"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { newsletterPopup } from "@/content/site";
import { useNewsletterPopupTrigger } from "@/hooks/useNewsletterPopupTrigger";
import { isListmonkConfigured } from "@/lib/listmonk";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

export function NewsletterPopup() {
  const { open, dismiss, handleSuccess } = useNewsletterPopupTrigger();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismiss]);

  if (!isListmonkConfigured() || !open) {
    return null;
  }

  return (
    <div
      className="newsletter-popup-overlay"
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(2, 6, 23, 0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        className="newsletter-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="newsletter-popup__banner">
          <Image
            src={newsletterPopup.image.src}
            alt={newsletterPopup.image.alt}
            fill
            sizes="(max-width: 540px) 100vw, 540px"
            priority
            className="newsletter-popup__banner-image"
          />
          <div className="newsletter-popup__banner-gradient" aria-hidden="true" />

          <button
            ref={closeRef}
            type="button"
            onClick={dismiss}
            aria-label="Close newsletter signup"
            className="newsletter-popup__close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="newsletter-popup__body">
          <div className="newsletter-popup__intro">
            <span className="newsletter-popup__eyebrow">{newsletterPopup.eyebrow}</span>
            <h2 id="newsletter-popup-title" className="newsletter-popup__title">
              {newsletterPopup.title}
            </h2>
            <p className="newsletter-popup__description">{newsletterPopup.description}</p>
          </div>

          <NewsletterSignup
            inputId="newsletter-popup-email"
            showLabel={false}
            onSuccess={handleSuccess}
          />

          <div className="newsletter-popup__dismiss-wrap">
            <button type="button" onClick={dismiss} className="newsletter-popup__dismiss">
              {newsletterPopup.dismissLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
