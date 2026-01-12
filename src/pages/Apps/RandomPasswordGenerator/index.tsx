import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaRedo } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import {
  IoCheckmarkCircleOutline,
  IoChevronDown,
  IoSettingsOutline,
  IoWarningOutline,
} from "react-icons/io5";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Styled MUI Slider to match zinc aesthetic
const StyledSlider = styled(Slider)({
  color: "#a1a1aa", // zinc-400
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    background: "linear-gradient(to right, #52525b, #a1a1aa)", // zinc-600 to zinc-400
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "rgba(39, 39, 42, 0.5)", // zinc-800/50
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#f4f4f5", // zinc-100
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    transition: "box-shadow 0.15s ease-in-out",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0 0 0 8px rgba(161, 161, 170, 0.16)",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#27272a", // zinc-800
    color: "#e4e4e7", // zinc-200
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "12px",
    fontFamily: "monospace",
  },
});

// Default character sets
const DEFAULT_CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}<>?",
};

// Ambiguous characters to exclude
const AMBIGUOUS_CHARS = "0OIl1|";

// Sequential patterns to detect
const SEQUENTIAL_PATTERNS = [
  "abc", "bcd", "cde", "def", "efg", "fgh", "ghi", "hij", "ijk", "jkl",
  "klm", "lmn", "mno", "nop", "opq", "pqr", "qrs", "rst", "stu", "tuv",
  "uvw", "vwx", "wxy", "xyz", "012", "123", "234", "345", "456", "567",
  "678", "789", "890",
];

type CharsetKey = keyof typeof DEFAULT_CHARSETS;

export default function RandomPasswordGenerator() {
  // Basic options
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  // Advanced options
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [customCharsets, setCustomCharsets] = useState({ ...DEFAULT_CHARSETS });
  const [minCounts, setMinCounts] = useState({
    uppercase: 0,
    lowercase: 0,
    numbers: 0,
    symbols: 0,
  });
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [mustStartWithLetter, setMustStartWithLetter] = useState(false);
  const [noSequential, setNoSequential] = useState(false);
  const [noRepeated, setNoRepeated] = useState(false);
  const [groupingEnabled, setGroupingEnabled] = useState(false);
  const [groupSize, setGroupSize] = useState(4);
  const [groupDelimiter, setGroupDelimiter] = useState("-");

  // UI state
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");
  const [copyDialogOpen, setCopyDialogOpen] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Build effective charset with all options applied
  const effectiveCharset = useMemo(() => {
    let charset = Object.entries(options)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => customCharsets[key as CharsetKey])
      .join("");

    if (excludeAmbiguous) {
      charset = charset
        .split("")
        .filter((c) => !AMBIGUOUS_CHARS.includes(c))
        .join("");
    }

    return charset;
  }, [options, customCharsets, excludeAmbiguous]);

  // Calculate total minimum required characters
  const totalMinRequired = useMemo(() => {
    return Object.entries(minCounts)
      .filter(([key]) => options[key as CharsetKey])
      .reduce((sum, [_, count]) => sum + count, 0);
  }, [minCounts, options]);

  // Validate settings
  useEffect(() => {
    if (totalMinRequired > length) {
      setValidationError(
        `Minimum requirements (${totalMinRequired}) exceed password length (${length})`
      );
    } else if (noRepeated && effectiveCharset.length < length) {
      setValidationError(
        `Not enough unique characters (${effectiveCharset.length}) for length ${length} with no repeats`
      );
    } else if (!effectiveCharset) {
      setValidationError("Select at least one character type");
    } else {
      setValidationError(null);
    }
  }, [totalMinRequired, length, noRepeated, effectiveCharset]);

  // Calculate password strength
  const strength = useMemo(() => {
    const variety = Object.values(options).filter(Boolean).length;
    const hasAdvanced =
      excludeAmbiguous || noSequential || noRepeated || mustStartWithLetter;
    const bonusPoints = hasAdvanced ? 1 : 0;

    if (length >= 20 && variety >= 4) return "Very strong";
    if (length >= 16 && variety + bonusPoints >= 3) return "Strong";
    if (length >= 12 && variety >= 2) return "Good";
    if (length >= 8) return "Weak";
    return "Very weak";
  }, [length, options, excludeAmbiguous, noSequential, noRepeated, mustStartWithLetter]);

  const strengthColor = {
    "Very weak": "text-red-400 bg-red-900/30",
    Weak: "text-yellow-400 bg-yellow-900/30",
    Good: "text-amber-400 bg-amber-900/30",
    Strong: "text-green-400 bg-green-900/30",
    "Very strong": "text-emerald-400 bg-emerald-900/30",
  }[strength];

  const strengthProgress = {
    "Very weak": 20,
    Weak: 40,
    Good: 60,
    Strong: 80,
    "Very strong": 100,
  }[strength];

  // Check for sequential characters
  const hasSequential = useCallback((str: string): boolean => {
    const lower = str.toLowerCase();
    return SEQUENTIAL_PATTERNS.some((pattern) => lower.includes(pattern));
  }, []);

  // Check for repeated characters
  const hasRepeated = useCallback((str: string): boolean => {
    for (let i = 1; i < str.length; i++) {
      if (str[i] === str[i - 1]) return true;
    }
    return false;
  }, []);

  // Generate password with all rules applied
  const generatePassword = useCallback((): string => {
    if (!effectiveCharset || validationError) return "";

    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts) {
      attempts++;
      let result: string[] = [];

      // First, satisfy minimum requirements
      for (const [key, count] of Object.entries(minCounts)) {
        if (!options[key as CharsetKey] || count === 0) continue;

        let chars = customCharsets[key as CharsetKey];
        if (excludeAmbiguous) {
          chars = chars
            .split("")
            .filter((c) => !AMBIGUOUS_CHARS.includes(c))
            .join("");
        }

        for (let i = 0; i < count; i++) {
          const char = chars.charAt(Math.floor(Math.random() * chars.length));
          result.push(char);
        }
      }

      // Fill remaining length with random characters
      const remaining = length - result.length;
      for (let i = 0; i < remaining; i++) {
        if (noRepeated) {
          const availableChars = effectiveCharset
            .split("")
            .filter((c) => !result.includes(c));
          if (availableChars.length === 0) break;
          result.push(
            availableChars[Math.floor(Math.random() * availableChars.length)]
          );
        } else {
          result.push(
            effectiveCharset.charAt(
              Math.floor(Math.random() * effectiveCharset.length)
            )
          );
        }
      }

      // Shuffle the result
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }

      // Handle "must start with letter" rule
      if (mustStartWithLetter) {
        const letters = result.filter((c) =>
          (customCharsets.uppercase + customCharsets.lowercase).includes(c)
        );
        if (letters.length > 0) {
          const letterIndex = result.findIndex((c) => letters.includes(c));
          if (letterIndex > 0) {
            [result[0], result[letterIndex]] = [result[letterIndex], result[0]];
          }
        }
      }

      const password = result.join("");

      // Validate against rules
      if (noSequential && hasSequential(password)) continue;
      if (noRepeated && hasRepeated(password)) continue;

      return password;
    }

    return ""; // Failed to generate valid password
  }, [
    effectiveCharset,
    validationError,
    length,
    minCounts,
    options,
    customCharsets,
    excludeAmbiguous,
    noRepeated,
    mustStartWithLetter,
    noSequential,
    hasSequential,
    hasRepeated,
  ]);

  // Format password with grouping
  const formatPassword = useCallback(
    (pwd: string): string => {
      if (!groupingEnabled || !pwd) return pwd;

      const chunks: string[] = [];
      for (let i = 0; i < pwd.length; i += groupSize) {
        chunks.push(pwd.slice(i, i + groupSize));
      }
      return chunks.join(groupDelimiter);
    },
    [groupingEnabled, groupSize, groupDelimiter]
  );

  // Scramble animation effect
  const runScrambleAnimation = useCallback(
    (finalPassword: string) => {
      if (scrambleRef.current) clearInterval(scrambleRef.current);

      setIsScrambling(true);
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let iterations = 0;
      const maxIterations = 20;
      const displayLength = groupingEnabled
        ? formatPassword(finalPassword).length
        : finalPassword.length;

      scrambleRef.current = setInterval(() => {
        const scrambled = Array.from({ length: displayLength }, (_, i) => {
          const formatted = formatPassword(finalPassword);
          // Keep delimiters in place during scramble
          if (groupingEnabled && formatted[i] === groupDelimiter) {
            return groupDelimiter;
          }
          // Progressively reveal characters
          if (iterations > (i / displayLength) * maxIterations) {
            return formatted[i];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");

        setDisplayPassword(scrambled);
        iterations++;

        if (iterations > maxIterations) {
          if (scrambleRef.current) clearInterval(scrambleRef.current);
          setDisplayPassword(formatPassword(finalPassword));
          setIsScrambling(false);
        }
      }, 50);
    },
    [formatPassword, groupDelimiter, groupingEnabled]
  );

  // Generate and animate
  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    setCopyDialogOpen(false);
    runScrambleAnimation(newPassword);
  }, [generatePassword, runScrambleAnimation]);

  // Initial generation and re-generation on option changes
  useEffect(() => {
    if (!validationError) {
      handleGenerate();
    }
    return () => {
      if (scrambleRef.current) clearInterval(scrambleRef.current);
    };
  }, [length, options, customCharsets, excludeAmbiguous, mustStartWithLetter, noSequential, noRepeated, minCounts, groupingEnabled, groupSize, groupDelimiter]);

  // Copy to clipboard and show dialog
  const copyToClipboard = async (includeFormatting = false) => {
    const textToCopy = includeFormatting ? formatPassword(password) : password;
    await navigator.clipboard.writeText(textToCopy);
    setCopyDialogOpen(true);
  };

  // Handle length input change
  const handleLengthInputChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setLength(Math.min(50, Math.max(0, num)));
    } else if (value === "") {
      setLength(0);
    }
  };

  // Toggle component for advanced options
  const Toggle = ({
    checked,
    onChange,
    label,
    description,
  }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
    description?: string;
  }) => (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`h-5 w-9 rounded-full transition-all duration-300 ${
            checked ? "bg-emerald-500/80" : "bg-zinc-700"
          }`}
        >
          <div
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300 ${
              checked ? "left-[18px]" : "left-0.5"
            }`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">
          {label}
        </span>
        {description && (
          <span className="text-xs text-zinc-500">{description}</span>
        )}
      </div>
    </label>
  );

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-6 rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-6 backdrop-blur-lg transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
            Random Password Generator
          </h1>
          <p className="text-sm text-zinc-400">
            Generate secure, customizable passwords instantly.
          </p>
        </div>

        {/* Password Display */}
        <div className="relative">
          <div
            className={`flex items-center gap-2 rounded-lg border bg-zinc-900/50 p-3 transition-all duration-300 ${
              isScrambling
                ? "border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                : "border-zinc-800/40"
            }`}
          >
            <input
              value={displayPassword || formatPassword(password)}
              readOnly
              className={`flex-1 bg-transparent font-mono text-sm outline-none transition-colors duration-300 ${
                isScrambling ? "text-emerald-400" : "text-zinc-200"
              }`}
            />
            <button
              onClick={handleGenerate}
              disabled={!!validationError}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                isScrambling
                  ? "bg-emerald-500/20 text-emerald-400 animate-spin"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <FaRedo className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => copyToClipboard(groupingEnabled)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800/50 text-zinc-400 transition-all hover:bg-zinc-700/50 hover:text-zinc-200"
            >
              <FaCopy className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Scramble glow effect */}
          <AnimatePresence>
            {isScrambling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Validation Error */}
        <AnimatePresence>
          {validationError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-900/20 px-3 py-2 text-xs text-red-400"
            >
              <IoWarningOutline className="h-4 w-4 shrink-0" />
              {validationError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Strength */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">Password strength</span>
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-medium ${strengthColor}`}
            >
              {strength}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-800/50 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                strength === "Very weak"
                  ? "bg-red-500"
                  : strength === "Weak"
                  ? "bg-yellow-500"
                  : strength === "Good"
                  ? "bg-amber-500"
                  : strength === "Strong"
                  ? "bg-green-500"
                  : "bg-emerald-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${strengthProgress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Length Slider */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-zinc-400">Password length</label>
            <input
              type="number"
              min={0}
              max={50}
              value={length}
              onChange={(e) => handleLengthInputChange(e.target.value)}
              className="w-16 text-sm font-mono text-zinc-200 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700/50 text-center outline-none focus:border-zinc-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <StyledSlider
            value={length}
            min={0}
            max={50}
            onChange={(_, value) => setLength(value as number)}
            aria-label="Password length"
          />
          <div className="flex justify-between text-xs text-zinc-600">
            <span>0</span>
            <span>50</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="flex flex-col gap-3">
          <span className="text-sm text-zinc-400">Characters used</span>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(options) as CharsetKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setOptions({ ...options, [key]: !options[key] })}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-300 ${
                  options[key]
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                    : "border-zinc-800/40 bg-zinc-900/30 text-zinc-500 hover:border-zinc-700/50 hover:text-zinc-300"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    options[key] ? "bg-emerald-400" : "bg-zinc-600"
                  }`}
                />
                <span className="capitalize">{key}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Options Collapsible */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-900/30 px-4 py-3 text-sm text-zinc-400 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50 hover:text-zinc-200">
              <div className="flex items-center gap-2">
                <IoSettingsOutline className="h-4 w-4" />
                <span>Advanced Options</span>
              </div>
              <motion.div
                animate={{ rotate: advancedOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <IoChevronDown className="h-4 w-4" />
              </motion.div>
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex flex-col gap-6 rounded-lg border border-zinc-800/40 bg-zinc-900/20 p-4"
            >
              {/* Custom Character Sets */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-zinc-300">
                  Custom Character Sets
                </span>
                <p className="text-xs text-zinc-500">
                  Edit the characters used for each type. Remove unwanted characters or add custom ones.
                </p>
                <div className="flex flex-col gap-2">
                  {(Object.keys(customCharsets) as CharsetKey[]).map((key) => (
                    <div key={key} className="flex flex-col gap-1">
                      <label className="text-xs text-zinc-500 capitalize">
                        {key}
                      </label>
                      <input
                        type="text"
                        value={customCharsets[key]}
                        onChange={(e) =>
                          setCustomCharsets({
                            ...customCharsets,
                            [key]: e.target.value,
                          })
                        }
                        disabled={!options[key]}
                        className="w-full rounded-md border border-zinc-800/40 bg-zinc-900/50 px-3 py-2 font-mono text-xs text-zinc-300 outline-none transition-all focus:border-zinc-700/50 disabled:opacity-40 disabled:cursor-not-allowed"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => setCustomCharsets({ ...DEFAULT_CHARSETS })}
                    className="mt-1 self-start text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    Reset to defaults
                  </button>
                </div>
              </div>

              <div className="h-px bg-zinc-800/50" />

              {/* Minimum Requirements */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-zinc-300">
                  Minimum Requirements
                </span>
                <p className="text-xs text-zinc-500">
                  Guarantee a minimum number of characters from each type.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(minCounts) as CharsetKey[]).map((key) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between rounded-md border border-zinc-800/40 bg-zinc-900/50 px-3 py-2 ${
                        !options[key] ? "opacity-40" : ""
                      }`}
                    >
                      <span className="text-xs text-zinc-400 capitalize">
                        {key}
                      </span>
                      <input
                        type="number"
                        min={0}
                        max={length}
                        value={minCounts[key]}
                        onChange={(e) =>
                          setMinCounts({
                            ...minCounts,
                            [key]: Math.max(0, Number(e.target.value)),
                          })
                        }
                        disabled={!options[key]}
                        className="w-12 rounded border border-zinc-700/50 bg-zinc-800/50 px-2 py-1 text-center font-mono text-xs text-zinc-300 outline-none disabled:cursor-not-allowed"
                      />
                    </div>
                  ))}
                </div>
                {totalMinRequired > 0 && (
                  <span className="text-xs text-zinc-500">
                    Total minimum: {totalMinRequired} / {length} characters
                  </span>
                )}
              </div>

              <div className="h-px bg-zinc-800/50" />

              {/* Security Rules */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-zinc-300">
                  Security Rules
                </span>
                <div className="flex flex-col gap-4">
                  <Toggle
                    checked={excludeAmbiguous}
                    onChange={setExcludeAmbiguous}
                    label="Exclude ambiguous characters"
                    description="Removes 0, O, I, l, 1, | that look similar"
                  />
                  <Toggle
                    checked={mustStartWithLetter}
                    onChange={setMustStartWithLetter}
                    label="Must start with a letter"
                    description="Some systems require this"
                  />
                  <Toggle
                    checked={noSequential}
                    onChange={setNoSequential}
                    label="No sequential characters"
                    description="Prevents patterns like abc, 123"
                  />
                  <Toggle
                    checked={noRepeated}
                    onChange={setNoRepeated}
                    label="No repeated characters"
                    description="Prevents aa, 11, $$ patterns"
                  />
                </div>
              </div>

              <div className="h-px bg-zinc-800/50" />

              {/* Readability Formatting */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-zinc-300">
                  Readability Formatting
                </span>
                <Toggle
                  checked={groupingEnabled}
                  onChange={setGroupingEnabled}
                  label="Group characters"
                  description="Makes long passwords easier to read"
                />
                {groupingEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 mt-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">Every</span>
                      <input
                        type="number"
                        min={2}
                        max={10}
                        value={groupSize}
                        onChange={(e) =>
                          setGroupSize(Math.max(2, Number(e.target.value)))
                        }
                        className="w-12 rounded border border-zinc-700/50 bg-zinc-800/50 px-2 py-1 text-center font-mono text-xs text-zinc-300 outline-none"
                      />
                      <span className="text-xs text-zinc-500">chars</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">with</span>
                      <select
                        value={groupDelimiter}
                        onChange={(e) => setGroupDelimiter(e.target.value)}
                        className="rounded border border-zinc-700/50 bg-zinc-800/50 px-2 py-1 text-xs text-zinc-300 outline-none"
                      >
                        <option value="-">Hyphen (-)</option>
                        <option value=" ">Space</option>
                        <option value=".">Dot (.)</option>
                        <option value="_">Underscore (_)</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>

        {/* Copy Success Dialog */}
        <Dialog open={copyDialogOpen} onOpenChange={setCopyDialogOpen}>
          <DialogContent className="border-none bg-transparent shadow-none p-0">
            <div className="font-inter relative p-4 sm:p-6 rounded-xl bg-zinc-900/25 backdrop-blur-lg border border-zinc-800/50 shadow-[0_4px_32px_0_rgba(24,24,27,0.25)] overflow-hidden transition-all duration-300 group">
              {/* Animated modern reflection */}
              <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10">
                <div
                  className="absolute left-0 top-0 w-2/3 h-1/3 rounded-t-full bg-gradient-to-br from-emerald-500/40 via-emerald-500/10 to-transparent blur-lg animate-card-reflection"
                  style={{
                    filter: "blur(6px)",
                    opacity: 0.18,
                  }}
                />
              </div>
              <div className="relative flex flex-col gap-4 z-20">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-lg text-zinc-100">
                    <IoCheckmarkCircleOutline className="h-5 w-5 text-emerald-400" />
                    Password copied to clipboard
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 text-sm text-zinc-400">
                  <p>
                    To paste the password somewhere else, press{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-xs">
                      CTRL
                    </kbd>{" "}
                    +{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-xs">
                      V
                    </kbd>{" "}
                    on your PC or{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-xs">
                      ⌘
                    </kbd>{" "}
                    +{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-xs">
                      V
                    </kbd>{" "}
                    on your Mac.
                  </p>
                  <p>
                    For Android or iOS devices including tablets, press and hold
                    then select <span className="text-zinc-300">Paste</span>.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setCopyDialogOpen(false)}
                    className="border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50"
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
