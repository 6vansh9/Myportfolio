import useCanvasCursor from "@/hooks/useCanvasCursor";

export default function CanvasCursor() {
  useCanvasCursor();

  return <canvas className="pointer-events-none fixed inset-0 z-[-1]" id="canvas" />;
}