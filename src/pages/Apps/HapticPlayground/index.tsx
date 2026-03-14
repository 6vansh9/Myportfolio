import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy } from "react-icons/fa";
import { FiPlus, FiTrash2, FiDownload, FiUpload } from "react-icons/fi";
import {
  IoCheckmarkCircleOutline,
  IoChevronDown,
  IoCodeSlash,
  IoPhonePortraitOutline,
  IoVolumeHigh,
  IoPlay,
  IoStop,
  IoRefresh,
  IoCopy,
} from "react-icons/io5";
import { BsLightning } from "react-icons/bs";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useHaptics } from "@/hooks/useHaptics";
import type { Vibration } from "web-haptics";
import { defaultPatterns } from "web-haptics";

// ---------------------------------------------------------------------------
// Styled MUI Slider
// ---------------------------------------------------------------------------
const StyledSlider = styled(Slider)({
  color: "#a1a1aa",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    background: "linear-gradient(to right, #52525b, #a1a1aa)",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "rgba(39, 39, 42, 0.5)",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#f4f4f5",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    transition: "box-shadow 0.15s ease-in-out",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0 0 0 8px rgba(161, 161, 170, 0.16)",
    },
    "&::before": { display: "none" },
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#27272a",
    color: "#e4e4e7",
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "12px",
    fontFamily: "monospace",
  },
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
// Custom presets not in the web-haptics library
const CUSTOM_PRESETS: Record<string, { pattern: Vibration[] }> = {
  heartbeat: {
    pattern: [
      { duration: 60, intensity: 0.8 },
      { delay: 100, duration: 80, intensity: 1 },
      { delay: 300, duration: 60, intensity: 0.8 },
      { delay: 100, duration: 80, intensity: 1 },
    ],
  },
};

const PRESET_CATEGORIES = {
  Notification: ["success", "warning", "error"],
  Impact: ["light", "medium", "heavy", "soft", "rigid"],
  Selection: ["selection"],
  Custom: ["nudge", "buzz", "heartbeat"],
} as const;

const PRESET_COLORS: Record<string, { active: string; ring: string }> = {
  success: { active: "bg-green-900/30 border-green-600/50 text-green-400", ring: "ring-green-500/20" },
  warning: { active: "bg-yellow-900/30 border-yellow-600/50 text-yellow-400", ring: "ring-yellow-500/20" },
  error: { active: "bg-red-900/30 border-red-600/50 text-red-400", ring: "ring-red-500/20" },
  light: { active: "bg-sky-900/30 border-sky-600/50 text-sky-400", ring: "ring-sky-500/20" },
  medium: { active: "bg-blue-900/30 border-blue-600/50 text-blue-400", ring: "ring-blue-500/20" },
  heavy: { active: "bg-indigo-900/30 border-indigo-600/50 text-indigo-300", ring: "ring-indigo-500/20" },
  soft: { active: "bg-purple-900/30 border-purple-600/50 text-purple-400", ring: "ring-purple-500/20" },
  rigid: { active: "bg-violet-900/30 border-violet-600/50 text-violet-300", ring: "ring-violet-500/20" },
  selection: { active: "bg-cyan-900/30 border-cyan-600/50 text-cyan-400", ring: "ring-cyan-500/20" },
  nudge: { active: "bg-amber-900/30 border-amber-600/50 text-amber-400", ring: "ring-amber-500/20" },
  buzz: { active: "bg-orange-900/30 border-orange-600/50 text-orange-400", ring: "ring-orange-500/20" },
  heartbeat: { active: "bg-rose-900/30 border-rose-600/50 text-rose-400", ring: "ring-rose-500/20" },
};

const PRESET_DESCRIPTIONS: Record<string, string> = {
  success: "Confirming actions",
  warning: "Cautionary alerts",
  error: "Error notifications",
  light: "Subtle tap",
  medium: "Standard press",
  heavy: "Strong impact",
  soft: "Gentle touch",
  rigid: "Sharp snap",
  selection: "List scrolling",
  nudge: "Attention grab",
  buzz: "Long vibration",
  heartbeat: "Human heartbeat",
};

const PKG_MANAGERS = [
  { name: "npm", cmd: "npm install web-haptics" },
  { name: "yarn", cmd: "yarn add web-haptics" },
  { name: "pnpm", cmd: "pnpm add web-haptics" },
  { name: "bun", cmd: "bun add web-haptics" },
] as const;

const TIMELINE_HEIGHT = 120;
const GRID_STEP_MS = 50;
const MIN_PLAY_VISUAL_MS = 800;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

// ---------------------------------------------------------------------------
// Copyable code block sub-component
// ---------------------------------------------------------------------------
function CodeBlock({
  code,
  label,
  className = "",
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      className={`overflow-hidden rounded-lg border border-zinc-800/40 bg-zinc-950/50 ${className}`}
    >
      {label && (
        <div className="flex items-center justify-between border-b border-zinc-800/40 px-4 py-2">
          <span className="text-xs text-zinc-500">{label}</span>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-500 transition-all hover:bg-zinc-800/50 hover:text-zinc-300"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="c"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 text-green-400"
                >
                  <IoCheckmarkCircleOutline className="h-3.5 w-3.5" />
                  Copied
                </motion.span>
              ) : (
                <motion.span
                  key="d"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1"
                >
                  <FaCopy className="h-3 w-3" />
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Install command with package-manager tabs
// ---------------------------------------------------------------------------
function InstallTabs() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const cmd = PKG_MANAGERS[active].cmd;

  const copy = async () => {
    await navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800/40 bg-zinc-950/50">
      {/* Tabs */}
      <div className="flex items-center border-b border-zinc-800/40">
        {PKG_MANAGERS.map((pm, i) => (
          <button
            key={pm.name}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-xs font-medium transition-all ${
              active === i
                ? "border-b-2 border-zinc-400 text-zinc-200"
                : "text-zinc-500 hover:text-zinc-400"
            }`}
          >
            {pm.name}
          </button>
        ))}
      </div>
      {/* Command */}
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <code className="font-mono text-sm text-zinc-300">{cmd}</code>
        <button
          onClick={copy}
          className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-500 transition-all hover:bg-zinc-800/50 hover:text-zinc-300"
        >
          {copied ? (
            <IoCheckmarkCircleOutline className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <IoCopy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animated play button with progress ring
// ---------------------------------------------------------------------------
function PlayButton({
  isPlaying,
  progress,
  onPlay,
  onStop,
}: {
  isPlaying: boolean;
  progress: number;
  onPlay: () => void;
  onStop: () => void;
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <button
      onClick={isPlaying ? onStop : onPlay}
      className="group relative flex items-center justify-center outline-none"
      aria-label={isPlaying ? "Stop pattern" : "Play pattern"}
    >
      {/* Progress ring */}
      <svg width={72} height={72} className="absolute -rotate-90">
        <circle
          cx={36}
          cy={36}
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth={3}
        />
        <circle
          cx={36}
          cy={36}
          r={radius}
          fill="none"
          stroke={isPlaying ? "#a1a1aa" : "transparent"}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-[stroke] duration-200"
        />
      </svg>
      {/* Center */}
      <div
        className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          isPlaying
            ? "border-zinc-500/50 bg-zinc-800/80 text-zinc-200 shadow-[0_0_20px_rgba(161,161,170,0.15)]"
            : "border-zinc-700/50 bg-zinc-800/50 text-zinc-400 group-hover:border-zinc-600/60 group-hover:bg-zinc-700/50 group-hover:text-zinc-200 group-hover:shadow-[0_0_15px_rgba(161,161,170,0.1)]"
        }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="stop"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <IoStop className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <IoPlay className="ml-0.5 h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Pulse glow */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ boxShadow: "0 0 0 0 rgba(161,161,170,0.3)" }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(161,161,170,0.3)",
              "0 0 0 12px rgba(161,161,170,0)",
            ],
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function HapticPlayground() {
  const { trigger, cancel } = useHaptics();

  // -- State ---------------------------------------------------------------
  const [segments, setSegments] = useState<Vibration[]>([
    { duration: 30, intensity: 0.5 },
    { delay: 60, duration: 40, intensity: 1 },
  ]);
  const [globalIntensity, setGlobalIntensity] = useState(0.7);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [playheadProgress, setPlayheadProgress] = useState(0);
  const [activePreset, setActivePreset] = useState<string | null>("success");
  const [codeOpen, setCodeOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [presetPulse, setPresetPulse] = useState<string | null>(null);

  const playingRef = useRef(false);
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  // -- Derived -------------------------------------------------------------
  const totalDuration = useMemo(
    () => segments.reduce((sum, seg) => sum + (seg.delay ?? 0) + seg.duration, 0),
    [segments],
  );

  const timelineMaxMs = useMemo(() => {
    const padded = totalDuration + 100;
    return Math.max(400, Math.ceil(padded / 200) * 200);
  }, [totalDuration]);

  // -- Presets -------------------------------------------------------------
  const loadPreset = useCallback(
    (name: string) => {
      const custom = CUSTOM_PRESETS[name];
      const preset = custom ?? defaultPatterns[name as keyof typeof defaultPatterns];
      if (!preset) return;
      const segs = preset.pattern.map((v) => ({ ...v }));
      setSegments(segs);
      setActivePreset(name);
      setActiveSegment(null);
      setPresetPulse(name);
      setTimeout(() => setPresetPulse(null), 600);
      // For custom presets, trigger with the pattern directly
      trigger(custom ? segs : name, { intensity: globalIntensity });
    },
    [trigger, globalIntensity],
  );

  // -- Playback with animated progress ring + playhead ---------------------
  const animatePlayback = useCallback(
    (durationMs: number, onDone: () => void) => {
      const visualMs = Math.max(durationMs, MIN_PLAY_VISUAL_MS);
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const ringP = Math.min(elapsed / visualMs, 1);
        const headP = Math.min(elapsed / Math.max(durationMs, 1), 1);
        setPlayProgress(ringP);
        setPlayheadProgress(headP);
        if (ringP < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
          onDone();
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [],
  );

  const playPattern = useCallback(() => {
    if (segments.length === 0) return;
    setIsPlaying(true);
    playingRef.current = true;
    setPlayProgress(0);

    const run = () => {
      trigger(segments, { intensity: globalIntensity });
      animatePlayback(totalDuration, () => {
        if (loopEnabled && playingRef.current) {
          loopRef.current = setTimeout(() => {
            if (playingRef.current) {
              setPlayProgress(0);
              setPlayheadProgress(0);
              run();
            }
          }, 150);
        } else {
          setIsPlaying(false);
          playingRef.current = false;
          setTimeout(() => { setPlayProgress(0); setPlayheadProgress(0); }, 300);
        }
      });
    };
    run();
  }, [segments, globalIntensity, loopEnabled, trigger, totalDuration, animatePlayback]);

  const stopPattern = useCallback(() => {
    playingRef.current = false;
    setIsPlaying(false);
    cancel();
    if (loopRef.current) { clearTimeout(loopRef.current); loopRef.current = null; }
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    setTimeout(() => { setPlayProgress(0); setPlayheadProgress(0); }, 200);
  }, [cancel]);

  useEffect(() => {
    return () => {
      playingRef.current = false;
      cancel();
      if (loopRef.current) clearTimeout(loopRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cancel]);

  // -- Segment CRUD --------------------------------------------------------
  const addSegment = useCallback(() => {
    setSegments((prev) => [...prev, { delay: 30, duration: 25, intensity: 0.7 }]);
    setActivePreset(null);
  }, []);

  const removeSegment = useCallback(
    (index: number) => {
      if (segments.length <= 1) return;
      setSegments((prev) => prev.filter((_, i) => i !== index));
      setActivePreset(null);
      if (activeSegment === index) setActiveSegment(null);
    },
    [segments.length, activeSegment],
  );

  const duplicateSegment = useCallback((index: number) => {
    setSegments((prev) => {
      const dup = { ...prev[index], delay: prev[index].delay ?? 30 };
      const next = [...prev];
      next.splice(index + 1, 0, dup);
      return next;
    });
    setActivePreset(null);
  }, []);

  const updateSegment = useCallback(
    (index: number, field: keyof Vibration, value: number) => {
      setSegments((prev) =>
        prev.map((seg, i) => (i === index ? { ...seg, [field]: value } : seg)),
      );
      setActivePreset(null);
    },
    [],
  );

  const resetToDefault = useCallback(() => {
    setSegments([
      { duration: 30, intensity: 0.5 },
      { delay: 60, duration: 40, intensity: 1 },
    ]);
    setActivePreset("success");
    setActiveSegment(null);
  }, []);

  // -- Import / Export -----------------------------------------------------
  const exportPattern = useCallback(() => {
    const data = JSON.stringify({ segments, globalIntensity }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `haptic-pattern-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [segments, globalIntensity]);

  const importPattern = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (Array.isArray(data?.segments)) {
            const valid = data.segments.every(
              (s: unknown) =>
                typeof s === "object" &&
                s !== null &&
                "duration" in s &&
                typeof (s as Vibration).duration === "number",
            );
            if (valid) {
              setSegments(data.segments);
              if (typeof data.globalIntensity === "number")
                setGlobalIntensity(clamp(data.globalIntensity, 0, 1));
              setActivePreset(null);
              setActiveSegment(null);
            }
          }
        } catch {
          // ignore invalid files
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, []);

  // -- Generated code ------------------------------------------------------
  const generatedCode = useMemo(() => {
    const segStr = segments
      .map((seg) => {
        const parts: string[] = [];
        if (seg.delay) parts.push(`delay: ${seg.delay}`);
        parts.push(`duration: ${seg.duration}`);
        if (seg.intensity !== undefined) parts.push(`intensity: ${seg.intensity}`);
        return `  { ${parts.join(", ")} }`;
      })
      .join(",\n");

    const optParts: string[] = [];
    if (globalIntensity !== 0.5) optParts.push(`intensity: ${globalIntensity}`);
    const optStr = optParts.length > 0 ? `, { ${optParts.join(", ")} }` : "";
    return `haptics.trigger([\n${segStr}\n]${optStr});`;
  }, [segments, globalIntensity]);

  const quickStartCode = `import { useWebHaptics } from "web-haptics/react";

function LikeButton() {
  const { trigger } = useWebHaptics();

  return (
    <button onClick={() => trigger("success")}>
      \u2764\uFE0F Like
    </button>
  );
}`;

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div className="mx-auto flex w-full flex-col gap-6">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <div className="flex flex-col gap-6 rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-6 backdrop-blur-lg sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-700/50 to-zinc-800/80 text-zinc-200 shadow-inner">
                <BsLightning className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
                  Haptic Playground
                </h1>
                <p className="mt-0.5 text-sm text-zinc-500">
                  Powered by{" "}
                  <span className="font-mono text-zinc-400">web-haptics</span>
                </p>
              </div>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-zinc-400">
              Design, preview, and export custom haptic vibration patterns for
              the web. Choose presets or craft your own with a visual timeline
              editor — then copy the code and ship it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-zinc-700/40 bg-zinc-800/30 px-3 py-1 text-xs text-zinc-400">
              <IoPhonePortraitOutline className="h-3.5 w-3.5" />
              Mobile optimized
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-zinc-700/40 bg-zinc-800/30 px-3 py-1 text-xs text-zinc-400">
              <IoVolumeHigh className="h-3.5 w-3.5" />
              Desktop audio fallback
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-800/40" />

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-zinc-300">Installation</h2>
          <InstallTabs />
        </div>

        <div className="h-px bg-zinc-800/40" />

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-zinc-300">Quick Start</h2>
          <p className="text-xs leading-relaxed text-zinc-500">
            Add haptic feedback to any interaction in one line. Here's a React
            button with a "success" haptic on click:
          </p>
          <CodeBlock code={quickStartCode} label="React" />
        </div>
      </div>

      {/* ================================================================ */}
      {/* PRESETS                                                          */}
      {/* ================================================================ */}
      <div className="flex flex-col gap-5 rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-6 backdrop-blur-lg sm:p-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-zinc-200">Try Presets</h2>
          <p className="text-xs text-zinc-500">
            Tap a preset to feel the haptic or hear the audio fallback on desktop.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {Object.entries(PRESET_CATEGORIES).map(([category, presets]) => (
            <div key={category} className="flex flex-col gap-2.5">
              <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-600">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {presets.map((name) => {
                  const colors = PRESET_COLORS[name];
                  const isActive = activePreset === name;
                  const isPulsing = presetPulse === name;
                  return (
                    <motion.button
                      key={name}
                      onClick={() => loadPreset(name)}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left transition-all duration-200 ${
                        isActive
                          ? `${colors.active} ring-1 ${colors.ring}`
                          : "border-zinc-700/40 bg-zinc-800/30 text-zinc-400 hover:border-zinc-600/50 hover:bg-zinc-800/50 hover:text-zinc-300"
                      }`}
                    >
                      <span className="text-xs font-semibold capitalize">{name}</span>
                      <span className="text-[10px] opacity-60">
                        {PRESET_DESCRIPTIONS[name]}
                      </span>
                      <AnimatePresence>
                        {isPulsing && (
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-white/5"
                            initial={{ opacity: 0.6 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* PATTERN EDITOR                                                   */}
      {/* ================================================================ */}
      <div className="flex flex-col gap-5 rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-6 backdrop-blur-lg sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-zinc-200">
              Pattern Editor
            </h2>
            <p className="text-xs text-zinc-500">
              Click segments in the timeline to select, then edit below.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={importPattern}
              className="h-7 gap-1 border-zinc-700/40 bg-zinc-800/30 text-xs text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            >
              <FiUpload className="h-3 w-3" />
              <span className="hidden sm:inline">Import</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportPattern}
              className="h-7 gap-1 border-zinc-700/40 bg-zinc-800/30 text-xs text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            >
              <FiDownload className="h-3 w-3" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefault}
              className="h-7 gap-1 border-zinc-700/40 bg-zinc-800/30 text-xs text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            >
              <IoRefresh className="h-3 w-3" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>

        {/* Timeline SVG */}
        <div className="relative overflow-x-auto rounded-lg border border-zinc-800/40 bg-zinc-950/50 p-4">
          <svg
            viewBox={`0 0 800 ${TIMELINE_HEIGHT}`}
            className="w-full"
            style={{ minWidth: 400 }}
            role="img"
            aria-label="Haptic pattern timeline"
          >
            {Array.from(
              { length: Math.floor(timelineMaxMs / GRID_STEP_MS) + 1 },
              (_, i) => {
                const x = (i * GRID_STEP_MS * 800) / timelineMaxMs;
                const isMajor = i % 4 === 0;
                return (
                  <g key={i}>
                    <line
                      x1={x} y1={0} x2={x} y2={TIMELINE_HEIGHT}
                      stroke={isMajor ? "#3f3f46" : "#27272a"}
                      strokeWidth={isMajor ? 1 : 0.5}
                    />
                    {isMajor && (
                      <text
                        x={x} y={TIMELINE_HEIGHT - 4}
                        fill="#52525b" fontSize="9" textAnchor="middle" fontFamily="monospace"
                      >
                        {i * GRID_STEP_MS}ms
                      </text>
                    )}
                  </g>
                );
              },
            )}

            {[0.25, 0.5, 0.75, 1].map((level) => {
              const y = TIMELINE_HEIGHT - 16 - level * (TIMELINE_HEIGHT - 24);
              return (
                <g key={level}>
                  <line
                    x1={0} y1={y} x2={800} y2={y}
                    stroke="#27272a" strokeWidth={0.5} strokeDasharray="4 4"
                  />
                  <text
                    x={798} y={y - 2}
                    fill="#3f3f46" fontSize="7" textAnchor="end" fontFamily="monospace"
                  >
                    {Math.round(level * 100)}%
                  </text>
                </g>
              );
            })}

            {segments.map((seg, idx) => {
              const startTime = (() => {
                let t = 0;
                for (let i = 0; i < idx; i++)
                  t += (segments[i].delay ?? 0) + segments[i].duration;
                t += seg.delay ?? 0;
                return t;
              })();
              const startX = (startTime * 800) / timelineMaxMs;
              const width = (seg.duration * 800) / timelineMaxMs;
              const intensity = seg.intensity ?? globalIntensity;
              const barHeight = Math.max(intensity * (TIMELINE_HEIGHT - 24), 4);
              const y = TIMELINE_HEIGHT - 16 - barHeight;
              const isActive = activeSegment === idx;

              return (
                <g
                  key={idx}
                  onClick={() => setActiveSegment(isActive ? null : idx)}
                  style={{ cursor: "pointer" }}
                >
                  {idx > 0 && (seg.delay ?? 0) > 0 && (
                    <rect
                      x={startX - ((seg.delay ?? 0) * 800) / timelineMaxMs}
                      y={TIMELINE_HEIGHT - 17} width={((seg.delay ?? 0) * 800) / timelineMaxMs}
                      height={2} rx={1} fill="#3f3f46" opacity={0.7}
                    />
                  )}
                  <rect
                    x={startX} y={y}
                    width={Math.max(width, 6)} height={barHeight}
                    rx={3}
                    fill={isActive ? "#d4d4d8" : "#71717a"}
                    opacity={isActive ? 0.85 : 0.55}
                    stroke={isActive ? "#e4e4e7" : "transparent"}
                    strokeWidth={1.5}
                  />
                  {width > 25 && (
                    <text
                      x={startX + Math.max(width, 6) / 2}
                      y={y + barHeight / 2 + 3}
                      fill={isActive ? "#fafafa" : "#a1a1aa"}
                      fontSize="8" textAnchor="middle" fontFamily="monospace"
                    >
                      {seg.duration}ms
                    </text>
                  )}
                </g>
              );
            })}

            {/* Animated playhead */}
            {(isPlaying || playheadProgress > 0) && (
              <line
                x1={(playheadProgress * totalDuration * 800) / timelineMaxMs}
                y1={0}
                x2={(playheadProgress * totalDuration * 800) / timelineMaxMs}
                y2={TIMELINE_HEIGHT - 16}
                stroke="#f4f4f5" strokeWidth={1.5}
                opacity={isPlaying ? 0.8 : 0.3}
              />
            )}

            {totalDuration > 0 && totalDuration <= timelineMaxMs && !isPlaying && playheadProgress === 0 && (
              <line
                x1={(totalDuration * 800) / timelineMaxMs} y1={0}
                x2={(totalDuration * 800) / timelineMaxMs} y2={TIMELINE_HEIGHT - 16}
                stroke="#52525b" strokeWidth={1} strokeDasharray="3 3" opacity={0.5}
              />
            )}
          </svg>

          <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-600">
            <span>{segments.length} segment{segments.length !== 1 && "s"}</span>
            <span>Total: {totalDuration}ms</span>
          </div>
        </div>

        {/* Segment List */}
        <div className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {segments.map((seg, idx) => (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={`group flex flex-col gap-3 rounded-lg border p-3 transition-colors duration-150 sm:flex-row sm:items-center sm:gap-4 ${
                  activeSegment === idx
                    ? "border-zinc-600/50 bg-zinc-800/40"
                    : "border-zinc-800/40 bg-zinc-900/20 hover:border-zinc-700/40 hover:bg-zinc-900/30"
                }`}
                onClick={() => setActiveSegment(idx)}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-zinc-800/80 text-[10px] font-bold text-zinc-500">
                  {idx + 1}
                </div>

                <div className="flex flex-1 flex-wrap items-center gap-3 sm:gap-4">
                  {idx > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Label className="text-[10px] uppercase tracking-wider text-zinc-600">Gap</Label>
                      <input
                        type="number" min={0} max={500}
                        value={seg.delay ?? 0}
                        onChange={(e) => updateSegment(idx, "delay", clamp(Number(e.target.value), 0, 500))}
                        className="w-16 rounded-md border border-zinc-700/50 bg-zinc-800/50 px-2 py-1 text-center font-mono text-xs text-zinc-300 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-600/50"
                      />
                      <span className="text-[10px] text-zinc-600">ms</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Label className="text-[10px] uppercase tracking-wider text-zinc-600">Duration</Label>
                    <input
                      type="number" min={1} max={1000}
                      value={seg.duration}
                      onChange={(e) => updateSegment(idx, "duration", clamp(Number(e.target.value), 1, 1000))}
                      className="w-16 rounded-md border border-zinc-700/50 bg-zinc-800/50 px-2 py-1 text-center font-mono text-xs text-zinc-300 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-600/50"
                    />
                    <span className="text-[10px] text-zinc-600">ms</span>
                  </div>

                  <div className="flex min-w-[140px] flex-1 items-center gap-2">
                    <Label className="text-[10px] uppercase tracking-wider text-zinc-600">Intensity</Label>
                    <div className="flex-1">
                      <StyledSlider
                        size="small"
                        value={seg.intensity ?? globalIntensity}
                        min={0} max={1} step={0.05}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
                        onChange={(_, val) => updateSegment(idx, "intensity", val as number)}
                      />
                    </div>
                    <span className="w-8 text-right font-mono text-[10px] text-zinc-500">
                      {Math.round((seg.intensity ?? globalIntensity) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); duplicateSegment(idx); }}
                    className="rounded-md p-1.5 text-zinc-600 transition-all hover:bg-zinc-800/50 hover:text-zinc-400"
                    title="Duplicate segment"
                  >
                    <IoCopy className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeSegment(idx); }}
                    disabled={segments.length <= 1}
                    className="rounded-md p-1.5 text-zinc-600 transition-all hover:bg-red-900/30 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-600"
                    title="Delete segment"
                  >
                    <FiTrash2 className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            onClick={addSegment}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-800/60 py-2.5 text-xs text-zinc-600 transition-all hover:border-zinc-700/60 hover:bg-zinc-900/20 hover:text-zinc-400"
          >
            <FiPlus className="h-3 w-3" />
            Add Segment
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* PLAYBACK & CODE OUTPUT                                           */}
      {/* ================================================================ */}
      <div className="flex flex-col gap-6 rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-6 backdrop-blur-lg sm:p-8">
        <div className="flex flex-col items-center gap-5">
          <PlayButton
            isPlaying={isPlaying}
            progress={playProgress}
            onPlay={playPattern}
            onStop={stopPattern}
          />

          <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-zinc-400">Global Intensity</Label>
                <span className="font-mono text-xs text-zinc-500">
                  {Math.round(globalIntensity * 100)}%
                </span>
              </div>
              <StyledSlider
                value={globalIntensity} min={0} max={1} step={0.05}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
                onChange={(_, val) => setGlobalIntensity(val as number)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch id="loop-toggle" checked={loopEnabled} onCheckedChange={setLoopEnabled} />
                <Label htmlFor="loop-toggle" className="text-xs text-zinc-400">Loop playback</Label>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                {activePreset && (
                  <span className="rounded-md bg-zinc-800/50 px-2 py-0.5 capitalize text-zinc-400">
                    {activePreset}
                  </span>
                )}
                <span>{totalDuration}ms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-800/40" />

        <Collapsible open={codeOpen} onOpenChange={setCodeOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-900/20 px-4 py-3 transition-all hover:border-zinc-700/40 hover:bg-zinc-800/30">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
              <IoCodeSlash className="h-4 w-4 text-zinc-500" />
              Generated Code
            </div>
            <motion.div animate={{ rotate: codeOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <IoChevronDown className="h-4 w-4 text-zinc-500" />
            </motion.div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2">
              <CodeBlock code={generatedCode} label="JavaScript" />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex items-start gap-2.5 rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-3 text-xs leading-relaxed text-zinc-500">
          <IoPhonePortraitOutline className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
          <p>
            Haptic feedback uses{" "}
            <span className="font-mono text-zinc-400">navigator.vibrate()</span>{" "}
            with PWM intensity modulation via{" "}
            <span className="font-mono text-zinc-400">web-haptics</span>.
            On desktop, an audio fallback simulates vibration. For the best
            experience, open this page on an Android device.
          </p>
        </div>
      </div>
    </div>
  );
}