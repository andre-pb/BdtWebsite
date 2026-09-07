// Lazy GSAP + SignalR loading.
//
// GSAP (+ScrollTrigger) and @microsoft/signalr are ~170 KB of JavaScript and,
// on a throttled phone, seconds of main-thread time. Nothing in the first
// viewport needs them, yet importing them statically put them on the
// homepage's critical path and delayed the hero's paint (mobile LCP 7.7s,
// with 90% of it "render delay" from main-thread contention).
//
// These helpers import the libraries on demand, and only once the section
// that uses them is near the viewport, so the first screen paints with the
// minimum JS and the animations still arrive before anyone scrolls to them.

import { useEffect, type RefObject } from "react";

type GsapModule = (typeof import("gsap"))["default"];
type ScrollTriggerModule = (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];

export type Motion = { gsap: GsapModule; ScrollTrigger: ScrollTriggerModule };
export type Tween = ReturnType<GsapModule["to"]>;

let motionPromise: Promise<Motion> | null = null;

/** Loads GSAP + ScrollTrigger once (shared by every caller) and registers the plugin. */
export function loadMotion(): Promise<Motion> {
  motionPromise ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );
  return motionPromise;
}

/** Loads the SignalR client on demand. */
export function loadSignalR() {
  return import("@microsoft/signalr");
}

/**
 * Resolves once `element` is within `rootMargin` of the viewport (immediately
 * when it already is, or when IntersectionObserver is unavailable). Never
 * resolves after `signal` aborts.
 */
export function whenNear(
  element: Element | null,
  rootMargin = "400px",
  signal?: AbortSignal,
): Promise<void> {
  if (!element || typeof IntersectionObserver === "undefined") return Promise.resolve();

  return new Promise((resolve) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          if (!signal?.aborted) resolve();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    signal?.addEventListener("abort", () => observer.disconnect(), { once: true });
  });
}

/**
 * Drop-in replacement for @gsap/react's useGSAP that loads GSAP lazily, once
 * the scoped element is near the viewport. `callback` runs inside a
 * gsap.context() scoped to the element and may return a cleanup; the context
 * is reverted on unmount, exactly like useGSAP.
 */
export function useLazyMotion(
  callback: (motion: Motion) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  options?: { rootMargin?: string },
) {
  useEffect(() => {
    const controller = new AbortController();
    let context: ReturnType<GsapModule["context"]> | null = null;
    let cleanup: void | (() => void);

    void (async () => {
      await whenNear(scope.current, options?.rootMargin, controller.signal);
      if (controller.signal.aborted) return;
      const motion = await loadMotion();
      if (controller.signal.aborted) return;
      context = motion.gsap.context(() => {
        cleanup = callback(motion);
      }, scope.current ?? undefined);
    })();

    return () => {
      controller.abort();
      if (typeof cleanup === "function") cleanup();
      context?.revert();
    };
    // Mirrors useGSAP's default: run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
