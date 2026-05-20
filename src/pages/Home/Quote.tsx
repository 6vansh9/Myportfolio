import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaQuoteRight } from "react-icons/fa";
import metadata from "@/content/metadata.json";

export default function Quote() {
    const { quotes } = metadata.home;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 30000); // 30 seconds
        return () => clearInterval(interval);
    }, [quotes.length]);

    const quote = quotes[index];

    return (
        <div className="font-inter relative overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/25 p-4 shadow-[0_4px_32px_0_rgba(24,24,27,0.25)] backdrop-blur-lg transition-all duration-300 group sm:p-6">
            {/* Animated modern reflection — hidden on mobile for GPU savings */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-full sm:block">
                <div
                    className="absolute left-0 top-0 h-1/3 w-2/3 animate-card-reflection rounded-t-full bg-gradient-to-br from-white/60 via-white/10 to-transparent blur-lg"
                    style={{
                        filter: "blur(6px)",
                        opacity: 0.18,
                    }}
                />
            </div>
            <div className="relative z-20 flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-1">
                    <div className="flex items-start gap-4">
                        <FaQuoteRight size={40} color="#A3A3A3" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <p className="mb-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
                                    {quote.text}
                                </p>

                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-zinc-500 sm:text-sm">
                                        - {quote.author}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}