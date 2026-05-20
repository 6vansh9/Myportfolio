import { useState } from "react";
import useCanvasCursor from "@/hooks/useCanvasCursor";

// Skip cursor trail on touch-only devices (no mouse)
const isTouchOnly = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches;

export default function CanvasCursor() {
  const [enabled] = useState(!isTouchOnly);
  useCanvasCursor(enabled);

  if (!enabled) return null;
  return <canvas className="pointer-events-none fixed inset-0 z-[-1]" id="canvas" />;
}