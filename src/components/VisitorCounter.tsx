import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiEye } from "react-icons/fi";

function getOrdinal(n: number): string {
  if (typeof n !== "number" || !Number.isFinite(n) || n < 1) return "1st";
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n.toLocaleString() + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function VisitorCounter() {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    if (import.meta.env.DEV) return;

    const hasVisited = sessionStorage.getItem("visited");
    const method = hasVisited ? "GET" : "POST";

    fetch("/api/visit-count", { method })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.count === "number") {
          setVisitCount(data.count);
          if (!hasVisited) sessionStorage.setItem("visited", "1");
        }
        // If count is missing or not a number, stay hidden (visitCount stays null)
      })
      .catch(() => {
        // Network error — stay hidden silently
      });
  }, []);

  return (
    <AnimatePresence>
      {visitCount !== null && visitCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-900/20 px-5 py-3 backdrop-blur-lg select-none"
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-0 top-0 h-1/2 w-1/2 animate-card-reflection rounded-t-full bg-gradient-to-br from-white/40 via-white/5 to-transparent blur-lg"
              style={{ opacity: 0.12 }}
            />
          </div>

          <FiEye className="relative z-10 size-4 text-zinc-500" />

          <p className="relative z-10 text-sm text-zinc-400">
            You are the{" "}
            <span className="font-semibold text-zinc-200">
              {getOrdinal(visitCount)}
            </span>{" "}
            visitor
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
