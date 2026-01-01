"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const Tooltip = ({
  children,
  text,
  position = "top",
  className = "",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024); // Tailwind's 'lg' breakpoint
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const positions: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-4",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-4",
    left: "right-full top-1/2 -translate-y-1/2 mr-4",
    right: "left-full top-1/2 -translate-y-1/2 ml-4",
  };

  const arrowPositions: Record<string, string> = {
    top: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-zinc-800",
    bottom:
      "absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-zinc-800",
    left: "absolute left-full top-1/2 -translate-y-1/2 -ml-px border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-zinc-800",
    right:
      "absolute right-full top-1/2 -translate-y-1/2 -mr-px border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-zinc-800",
  };

  if (!isDesktop) {
    // Disable tooltip on mobile/tablet
    return <>{children}</>;
  }

  return (
    <div
      className={`relative inline-flex whitespace-nowrap ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <div
        className={`absolute ${positions[position]} pointer-events-none z-50 rounded-lg bg-zinc-800 px-3 py-1.5 font-mono text-xs font-medium whitespace-nowrap text-white transition-all duration-100 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        }}
      >
        {text}
        <div className={arrowPositions[position]} />
      </div>
    </div>
  );
};

export default Tooltip;
