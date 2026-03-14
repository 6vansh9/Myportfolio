import { useEffect, useRef, useCallback, useMemo } from "react";
import { useWebHaptics } from "web-haptics/react";

const HEARTBEAT_INTERVAL = 833; // 72 BPM
const SCROLL_IDLE_TIMEOUT = 150;

const HEARTBEAT_PATTERN = {
  pattern: [
    { duration: 100, intensity: 0.6 },
    { delay: 100, duration: 80, intensity: 0.4 },
  ],
};

/**
 * Build a long repeating heartbeat pattern for iOS.
 * iOS only allows haptics from user gestures, so we build one giant pattern
 * that the library chains via requestAnimationFrame from a single touchstart.
 * Each beat: lub (100ms) → gap (100ms) → dub (80ms) → gap (553ms) = 833ms total.
 */
function buildExtendedHeartbeat(beats: number) {
  const pattern = [];
  for (let i = 0; i < beats; i++) {
    pattern.push({
      delay: i === 0 ? 0 : 553,
      duration: 100,
      intensity: 0.6,
    });
    pattern.push({ delay: 100, duration: 80, intensity: 0.4 });
  }
  return { pattern };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Continuous haptic feedback: heartbeat when idle, buzz on scroll.
 *
 * - Android: navigator.vibrate() via setInterval — works from timers after activation.
 * - Desktop: auto-enables debug mode (AudioContext clicks) on non-touch devices.
 * - iOS workaround: builds a ~60s heartbeat as one giant pattern, triggered from
 *   touchstart (user gesture). The library chains it via requestAnimationFrame,
 *   keeping the haptic alive. Re-triggered on each new touch. Scroll feedback
 *   fires on touchend (also a user gesture).
 * - Use ?haptics-debug URL param to force debug audio on any device.
 */
export default function useHaptics() {
  // iOS: has touch but no vibrate API
  const isIOS = useMemo(() => {
    if (typeof window === "undefined") return false;
    return !navigator.vibrate && "ontouchstart" in window;
  }, []);

  const debugMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    const forceDebug = new URLSearchParams(window.location.search).has("haptics-debug");
    const isNonTouch = !("ontouchstart" in window);
    return forceDebug || isNonTouch;
  }, []);

  const { trigger, cancel } = useWebHaptics({ debug: debugMode });

  const heartbeatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const isScrollingRef = useRef(false);
  const activatedRef = useRef(false);
  const lastVelocityRef = useRef(0);

  const triggerRef = useRef(trigger);
  triggerRef.current = trigger;
  const cancelRef = useRef(cancel);
  cancelRef.current = cancel;

  // Standard heartbeat via setInterval (Android/Desktop only)
  const startHeartbeat = useCallback(() => {
    if (isIOS) return;
    if (heartbeatTimerRef.current !== null) clearInterval(heartbeatTimerRef.current);
    heartbeatTimerRef.current = setInterval(() => {
      if (!isScrollingRef.current && document.visibilityState === "visible") {
        triggerRef.current(HEARTBEAT_PATTERN);
      }
    }, HEARTBEAT_INTERVAL);
  }, [isIOS]);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatTimerRef.current !== null) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    function onScroll() {
      if (!activatedRef.current) return;

      const now = performance.now();
      const currentY = window.scrollY;
      const dt = now - lastScrollTimeRef.current;

      if (dt > 0 && lastScrollTimeRef.current > 0) {
        const velocity = Math.abs(currentY - lastScrollYRef.current) / dt;
        lastVelocityRef.current = velocity;

        // Android/Desktop: per-frame scroll buzz
        if (!isIOS) {
          const intensity = clamp(velocity / 5, 0.2, 1.0);
          triggerRef.current({ pattern: [{ duration: 30, intensity }] });
        }
      }

      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = now;

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        if (isIOS) {
          cancelRef.current(); // stop iOS heartbeat pattern during scroll
        } else {
          stopHeartbeat();
        }
      }

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        lastScrollTimeRef.current = 0;
        lastVelocityRef.current = 0;
        // Android/Desktop: restart heartbeat via setInterval
        if (!isIOS) startHeartbeat();
        // iOS: heartbeat restarts on next touchstart
      }, SCROLL_IDLE_TIMEOUT);
    }

    function onVisibilityChange() {
      if (!activatedRef.current) return;
      if (document.visibilityState === "visible") {
        if (!isIOS) startHeartbeat();
      } else {
        if (isIOS) cancelRef.current();
        else stopHeartbeat();
      }
    }

    // --- iOS: touchstart triggers long heartbeat pattern (user gesture context) ---
    function onTouchStart() {
      if (!activatedRef.current) activatedRef.current = true;

      if (!isScrollingRef.current && document.visibilityState === "visible") {
        // Fire a 72-beat (~60s) heartbeat as one pattern — library chains via rAF
        triggerRef.current(buildExtendedHeartbeat(72));
      }
    }

    // iOS: scroll-end feedback on touchend (user gesture context)
    function onTouchEnd() {
      if (isScrollingRef.current && lastVelocityRef.current > 0) {
        const intensity = clamp(lastVelocityRef.current / 5, 0.2, 1.0);
        triggerRef.current({ pattern: [{ duration: 40, intensity }] });
      }
    }

    // --- Standard (Android/Desktop): click/touchstart activation ---
    function onFirstInteraction() {
      if (activatedRef.current) return;
      activatedRef.current = true;
      triggerRef.current("medium");
      removeActivationListeners();
      startHeartbeat();
    }

    const activationEvents = ["touchstart", "click"] as const;
    function removeActivationListeners() {
      for (const e of activationEvents) window.removeEventListener(e, onFirstInteraction);
    }

    // Register platform-specific listeners
    if (isIOS) {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
    } else {
      for (const e of activationEvents) {
        window.addEventListener(e, onFirstInteraction, { once: true, passive: true });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopHeartbeat();
      cancelRef.current();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (isIOS) {
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchend", onTouchEnd);
      } else {
        removeActivationListeners();
      }
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isIOS, startHeartbeat, stopHeartbeat]);
}
