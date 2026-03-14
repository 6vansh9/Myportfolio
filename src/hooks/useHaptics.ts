import { useWebHaptics } from "web-haptics/react";

/**
 * Provides haptic feedback via the web-haptics library.
 * Use ?haptics-debug URL param to force debug audio on any device.
 * Auto-enables debug mode on non-touch devices (desktop).
 */
export function useHaptics() {
  const debugMode = (() => {
    if (typeof window === "undefined") return false;
    const forceDebug = new URLSearchParams(window.location.search).has("haptics-debug");
    const isNonTouch = !("ontouchstart" in window);
    return forceDebug || isNonTouch;
  })();

  return useWebHaptics({ debug: debugMode });
}
