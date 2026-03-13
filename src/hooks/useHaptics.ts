import { useEffect, useRef } from "react";
import { WebHaptics } from "web-haptics";
import type { Vibration } from "web-haptics";

// Resting heartbeat: 72 BPM → ~833ms per beat
const HEARTBEAT_INTERVAL = 833;
const SCROLL_IDLE_TIMEOUT = 150;

// "Lub-dub" pattern mimicking a real heartbeat
const HEARTBEAT_PATTERN: Vibration[] = [
  { duration: 100, intensity: 0.6 }, // lub
  { delay: 100, duration: 80, intensity: 0.4 }, // dub
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function useHaptics() {
  const hapticsRef = useRef<WebHaptics | null>(null);
  const heartbeatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const isScrollingRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    if (!WebHaptics.isSupported) return;

    const haptics = new WebHaptics();
    hapticsRef.current = haptics;

    // --- Heartbeat ---
    function startHeartbeat() {
      stopHeartbeat();
      heartbeatTimerRef.current = setInterval(() => {
        if (visibleRef.current && !isScrollingRef.current) {
          haptics.trigger({ pattern: HEARTBEAT_PATTERN });
        }
      }, HEARTBEAT_INTERVAL);
    }

    function stopHeartbeat() {
      if (heartbeatTimerRef.current !== null) {
        clearInterval(heartbeatTimerRef.current);
        heartbeatTimerRef.current = null;
      }
    }

    // --- Scroll buzz ---
    function onScroll() {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = now - lastScrollTimeRef.current;

      if (dt > 0 && lastScrollTimeRef.current > 0) {
        const velocity = Math.abs(currentY - lastScrollYRef.current) / dt; // px/ms
        // Map velocity to intensity: slow scroll (~0.5 px/ms) → 0.2, fast (~5 px/ms) → 1.0
        const intensity = clamp(velocity / 5, 0.2, 1.0);

        haptics.trigger(
          { pattern: [{ duration: 30, intensity }] },
        );
      }

      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = now;

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        stopHeartbeat();
      }

      // Reset idle timer
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        lastScrollTimeRef.current = 0;
        startHeartbeat();
      }, SCROLL_IDLE_TIMEOUT);
    }

    // --- Visibility ---
    function onVisibilityChange() {
      visibleRef.current = document.visibilityState === "visible";
      if (visibleRef.current) {
        startHeartbeat();
      } else {
        stopHeartbeat();
        haptics.cancel();
      }
    }

    // Bootstrap
    startHeartbeat();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopHeartbeat();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      haptics.destroy();
      hapticsRef.current = null;
    };
  }, []);
}
