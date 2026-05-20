import { useState, useEffect, useRef } from "react";
import metadata from "@/content/metadata.json";

interface SplashScreenProps {
  progress: number;
  onExitComplete?: () => void;
}

const DEFAULT_MESSAGES = [
  "Initializing systems...",
  "Loading modules...",
  "Almost ready...",
];

export default function SplashScreen({ progress, onExitComplete }: SplashScreenProps) {
  const splashSettings = metadata.settings?.splashScreen;

  if (splashSettings?.enabled === false) {
    onExitComplete?.();
    return null;
  }

  const gif = splashSettings?.gif || "/assets/nyan-cat.gif";
  const backgroundColor = splashSettings?.backgroundColor || "#000000";
  const alt = splashSettings?.alt || "Loading...";
  const messages: string[] = splashSettings?.messages ?? DEFAULT_MESSAGES;

  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const hasTriggeredExit = useRef(false);

  // Smoothly animate displayed progress toward actual progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedProgress((prev) => {
        if (prev >= progress) return prev;
        const diff = progress - prev;
        const step = Math.max(1, Math.ceil(diff * 0.15));
        return Math.min(prev + step, progress);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [progress]);

  // Cycle through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [messages.length]);

  // Trigger exit animation when displayed progress hits 100
  useEffect(() => {
    if (displayedProgress >= 100 && !hasTriggeredExit.current) {
      hasTriggeredExit.current = true;
      setTimeout(() => setExiting(true), 500);
    }
  }, [displayedProgress]);

  // After exit animation completes, notify parent
  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(() => onExitComplete?.(), 700);
      return () => clearTimeout(timer);
    }
  }, [exiting, onExitComplete]);

  const pct = Math.min(displayedProgress, 100);
  const pctStr = String(pct).padStart(3, " ");

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col transition-all duration-700 ease-in-out ${
        exiting ? "scale-105 opacity-0 blur-md" : "scale-100 opacity-100 blur-0"
      }`}
      style={{ backgroundColor }}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ─── Main content — centered vertically ─── */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 sm:px-8">
        {/* Nyan cat — constrained by width on mobile, height on desktop */}
        <img
          src={gif}
          alt={alt}
          className="mb-8 w-[85vw] max-w-[520px] object-contain drop-shadow-[0_0_60px_rgba(99,102,241,0.12)] sm:mb-10 sm:w-[60vw] md:w-auto md:max-h-[32vh] md:max-w-[600px]"
        />

        {/* Message text */}
        <div className="mb-6 h-5 sm:mb-8">
          <p
            key={messageIndex}
            className="splash-msg-in whitespace-nowrap text-center font-mono text-xs tracking-wider text-zinc-500 sm:text-sm"
          >
            {messages[messageIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-[70vw] max-w-xs sm:max-w-sm">
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-zinc-800/60 sm:h-[3px]">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-200 ease-out"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
                boxShadow: "0 0 14px 2px rgba(168,85,247,0.35)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── Bottom bar — status + meter + star ─── */}
      <div className="relative flex items-end justify-between px-5 pb-5 sm:px-8 sm:pb-8">
        {/* Left side — status indicator (visible on sm+) */}
        <div className="hidden items-center gap-2 sm:flex">
          <div
            className="h-[6px] w-[6px] shrink-0 rounded-full bg-emerald-500"
            style={{ boxShadow: "0 0 6px 1px rgba(16,185,129,0.5)" }}
          />
          <span className="font-mono text-[10px] leading-none uppercase tracking-[0.25em] text-zinc-600">
            {pct < 100 ? "sys.loading" : "sys.ready"}
          </span>
        </div>

        {/* Right side — digital meter + star */}
        <div className="ml-auto flex items-end gap-3">
          {/* Meter container */}
          <div className="flex flex-col items-end">
            {/* Status label (mobile only) */}
            <span className="mb-1 font-mono text-[9px] leading-none uppercase tracking-[0.2em] text-zinc-600 sm:hidden">
              {pct < 100 ? "loading" : "ready"}
            </span>

            {/* Percentage readout */}
            <div className="flex items-baseline">
              <span
                className="font-mono text-3xl font-bold leading-none tracking-tighter text-white tabular-nums sm:text-4xl"
                style={{
                  textShadow:
                    "0 0 24px rgba(168,85,247,0.5), 0 0 48px rgba(99,102,241,0.2)",
                }}
              >
                {pctStr}
              </span>
              <span className="ml-0.5 font-mono text-base font-medium leading-none text-zinc-500 sm:text-lg">
                %
              </span>
            </div>
          </div>

          {/* Star gif — vertically aligned to bottom of meter text */}
          <img
            src="/assets/star.gif"
            alt="star"
            className="mb-[-2px] h-9 w-9 sm:h-11 sm:w-11"
            style={{
              filter:
                pct >= 100
                  ? "drop-shadow(0 0 10px rgba(250,204,21,0.6))"
                  : "none",
              transition: "filter 0.4s ease",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes splashMsgIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .splash-msg-in {
          animation: splashMsgIn 0.3s ease-out both;
        }
      `}</style>
    </div>
  );
}
