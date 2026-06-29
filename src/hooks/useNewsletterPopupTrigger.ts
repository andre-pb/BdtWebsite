"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isListmonkConfigured } from "@/lib/listmonk";

const SUBSCRIBED_KEY = "bdt-newsletter-subscribed";
const DISMISSED_AT_KEY = "bdt-newsletter-popup-dismissed-at";
const SHOWN_SESSION_KEY = "bdt-newsletter-popup-shown-session";

const MIN_DWELL_MS = 8_000;
const TIME_FALLBACK_MS = 30_000;
const SCROLL_DEPTH = 0.4;
const DISMISS_COOLDOWN_DAYS = 7;

const EXCLUDED_PATHS = new Set([
  "/emailverifysuccess",
  "/emailverifyfailed",
  "/privacy-policy",
  "/busy-dad-training-terms-and-conditions-2",
]);

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/$/, "");
  return trimmed || "/";
}

function isSubscribed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SUBSCRIBED_KEY) === "1";
}

function isDismissedRecently(): boolean {
  if (typeof window === "undefined") return false;

  const dismissedAt = localStorage.getItem(DISMISSED_AT_KEY);
  if (!dismissedAt) return false;

  const elapsedMs = Date.now() - new Date(dismissedAt).getTime();
  return elapsedMs < DISMISS_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
}

function wasShownThisSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SHOWN_SESSION_KEY) === "1";
}

function isPathExcluded(pathname: string): boolean {
  return EXCLUDED_PATHS.has(normalizePath(pathname));
}

export function markNewsletterSubscribed(): void {
  localStorage.setItem(SUBSCRIBED_KEY, "1");
}

export function markNewsletterPopupDismissed(): void {
  localStorage.setItem(DISMISSED_AT_KEY, new Date().toISOString());
}

export function useNewsletterPopupTrigger() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isEligible =
    isListmonkConfigured() &&
    !isSubscribed() &&
    !isDismissedRecently() &&
    !wasShownThisSession() &&
    !isPathExcluded(pathname);

  const dismiss = useCallback(() => {
    markNewsletterPopupDismissed();
    setOpen(false);
  }, []);

  const handleSuccess = useCallback(() => {
    markNewsletterSubscribed();
    window.setTimeout(() => setOpen(false), 2000);
  }, []);

  useEffect(() => {
    if (!isEligible || open) return;

    let armed = false;
    let triggered = false;
    let cleanupListeners = () => {};

    const trigger = () => {
      if (triggered || !armed) return;
      triggered = true;
      sessionStorage.setItem(SHOWN_SESSION_KEY, "1");
      setOpen(true);
      cleanup();
    };

    const armTriggers = () => {
      armed = true;

      const onScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return;
        const depth = window.scrollY / scrollHeight;
        if (depth >= SCROLL_DEPTH) trigger();
      };

      const onMouseLeave = (event: MouseEvent) => {
        if (event.clientY <= 0) trigger();
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);
      onScroll();

      const timeFallbackTimer = window.setTimeout(trigger, TIME_FALLBACK_MS - MIN_DWELL_MS);

      cleanupListeners = () => {
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("mouseleave", onMouseLeave);
        window.clearTimeout(timeFallbackTimer);
      };
    };

    const cleanup = () => {
      cleanupListeners();
    };

    const minDwellTimer = window.setTimeout(armTriggers, MIN_DWELL_MS);

    return () => {
      window.clearTimeout(minDwellTimer);
      cleanupListeners();
    };
  }, [isEligible, open]);

  return { open, dismiss, handleSuccess };
}
