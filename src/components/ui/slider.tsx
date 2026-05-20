import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  size?: "default" | "small";
  disabled?: boolean;
  valueLabelDisplay?: "auto" | "on" | "off";
  valueLabelFormat?: (value: number) => string;
  onValueChange?: (value: number) => void;
  "aria-label"?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value,
      min = 0,
      max = 100,
      step = 1,
      size = "default",
      disabled = false,
      valueLabelDisplay = "off",
      valueLabelFormat,
      onValueChange,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const percentage = ((value - min) / (max - min)) * 100;

    const showLabel =
      valueLabelDisplay === "on" ||
      (valueLabelDisplay === "auto" && (isDragging || isHovered));

    const updateValue = React.useCallback(
      (clientX: number) => {
        if (!trackRef.current || disabled) return;
        const rect = trackRef.current.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + ratio * (max - min);
        const stepped = Math.round(rawValue / step) * step;
        const clamped = Math.max(min, Math.min(max, stepped));
        // Round to avoid floating point issues
        const precision = step < 1 ? String(step).split(".")[1]?.length || 0 : 0;
        const rounded = Number(clamped.toFixed(precision));
        onValueChange?.(rounded);
      },
      [min, max, step, disabled, onValueChange],
    );

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        setIsDragging(true);
        updateValue(e.clientX);
      },
      [disabled, updateValue],
    );

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent) => {
        if (!isDragging) return;
        updateValue(e.clientX);
      },
      [isDragging, updateValue],
    );

    const handlePointerUp = React.useCallback(() => {
      setIsDragging(false);
    }, []);

    const isSmall = size === "small";

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        style={{ height: isSmall ? "20px" : "28px" }}
        {...props}
      >
        <div
          ref={trackRef}
          className={cn(
            "relative w-full cursor-pointer rounded-full",
            isSmall ? "h-1.5" : "h-2",
            disabled && "cursor-not-allowed opacity-50",
          )}
          style={{ backgroundColor: "rgba(39, 39, 42, 0.5)" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="slider"
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          tabIndex={disabled ? -1 : 0}
        >
          {/* Track fill */}
          <div
            className={cn("absolute left-0 top-0 rounded-full", isSmall ? "h-1.5" : "h-2")}
            style={{
              width: `${percentage}%`,
              background: "linear-gradient(to right, #52525b, #a1a1aa)",
            }}
          />

          {/* Thumb */}
          <div
            className={cn(
              "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-100 transition-shadow duration-150",
              isSmall ? "h-3.5 w-3.5" : "h-[18px] w-[18px]",
              isDragging || isHovered
                ? "shadow-[0_0_0_8px_rgba(161,161,170,0.16)]"
                : "shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
            )}
            style={{ left: `${percentage}%` }}
          />

          {/* Value label */}
          {showLabel && (
            <div
              className="absolute -top-9 -translate-x-1/2 rounded-md bg-zinc-800 px-2 py-1 font-mono text-xs text-zinc-200"
              style={{ left: `${percentage}%` }}
            >
              {valueLabelFormat ? valueLabelFormat(value) : value}
            </div>
          )}
        </div>
      </div>
    );
  },
);
Slider.displayName = "Slider";

export { Slider };
