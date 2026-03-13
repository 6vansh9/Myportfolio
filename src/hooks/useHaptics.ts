import { useEffect, useRef, useCallback, useMemo } from "react";
import { useWebHaptics } from "web-haptics/react";

// Resting heartbeat: 72 BPM → ~833ms per beat
const HEARTBEAT_INTERVAL = 833;
const SCROLL_IDLE_TIMEOUT = 150;

// "Lub-dub" heartbeat pattern
const HEARTBEAT_PATTERN = {
  pattern: [
    { duration: 100, intensity: 0.6 }, // lub
    { delay: 100, duration: 80, intensity: 0.4 }, // dub
  ],
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function useHaptics() {
  // ?haptics-debug in URL → audio clicks on desktop for testing
  const debugMode = useMemo(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("haptics-debug"),
    [],
  );

  const { trigger, isSupported } = useWebHaptics({ debug: debugMode });

  const heartbeatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const isScrollingRef = useRef(false);
  const activatedRef = useRef(false);

  const triggerRef = useRef(trigger);
  triggerRef.current = trigger;

  const startHeartbeat = useCallback(() => {
    if (heartbeatTimerRef.current !== null) {
      clearInterval(heartbeatTimerRef.current);
    }
    heartbeatTimerRef.current = setInterval(() => {
      if (!isScrollingRef.current && document.visibilityState === "visible") {
        triggerRef.current(HEARTBEAT_PATTERN);
      }
    }, HEARTBEAT_INTERVAL);
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatTimerRef.current !== null) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // On mobile (isSupported=true): real vibration, no debug needed
    // On desktop with ?haptics-debug: audio click fallback
    // On desktop without flag: skip entirely
    if (!isSupported && !debugMode) return;

    function onScroll() {
      if (!activatedRef.current) return;

      const now = performance.now();
      const currentY = window.scrollY;
      const dt = now - lastScrollTimeRef.current;

      if (dt > 0 && lastScrollTimeRef.current > 0) {
        const velocity = Math.abs(currentY - lastScrollYRef.current) / dt;
        const intensity = clamp(velocity / 5, 0.2, 1.0);
        triggerRef.current({ pattern: [{ duration: 30, intensity }] });
      }

      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = now;

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        stopHeartbeat();
      }

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        lastScrollTimeRef.current = 0;
        startHeartbeat();
      }, SCROLL_IDLE_TIMEOUT);
    }

    function onVisibilityChange() {
      if (!activatedRef.current) return;
      if (document.visibilityState === "visible") {
        startHeartbeat();
      } else {
        stopHeartbeat();
      }
    }

    // navigator.vibrate requires a prior user gesture
    function onFirstInteraction() {
      if (activatedRef.current) return;
      activatedRef.current = true;
      removeListeners();
      startHeartbeat();
    }

    const events = ["touchstart", "click", "pointerdown"] as const;
    function removeListeners() {
      for (const e of events) window.removeEventListener(e, onFirstInteraction);
    }
    for (const e of events) {
      window.addEventListener(e, onFirstInteraction, { once: true, passive: true });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopHeartbeat();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      removeListeners();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isSupported, debugMode, startHeartbeat, stopHeartbeat]);
}
