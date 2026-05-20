import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import metadata from "@/content/metadata.json";

export default function Experience() {
  const { experiences } = metadata.home;
  const [active, setActive] = useState(0);
  const activeExp = experiences[active];

  return (
    <section>
      <p className="mb-4 text-xs tracking-widest text-zinc-600 uppercase transition-colors hover:text-white">
        Experience
      </p>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* Tabs */}
        <div
          className="flex w-full gap-1 overflow-x-auto rounded-xl border border-zinc-800/40 bg-zinc-900/25 p-2 shadow-inner backdrop-blur-lg md:w-56 md:flex-col md:overflow-x-visible"
          role="tablist"
          aria-label="Job tabs"
        >
          {experiences.map((exp, idx) => (
            <button
              key={exp.company}
              id={`tab-${idx}`}
              role="tab"
              aria-selected={active === idx}
              aria-controls={`panel-${idx}`}
              tabIndex={active === idx ? 0 : -1}
              onClick={() => setActive(idx)}
              className={`flex-shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200 md:w-full ${
                active === idx
                  ? "border border-zinc-700/60 bg-zinc-800/40 text-zinc-100 shadow"
                  : "border border-transparent bg-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100"
              }`}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              id={`panel-${active}`}
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
          <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/25 px-4 py-4 backdrop-blur-lg sm:px-6 sm:py-5">
            {/* Header */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-700/10 sm:h-12 sm:w-12">
                <img
                  src={activeExp.logo}
                  alt={`${activeExp.company} logo`}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
                  <h3 className="text-sm font-medium text-zinc-200 sm:text-base">
                    {activeExp.title}
                  </h3>
                  <span className="text-xs text-zinc-400 sm:text-sm">
                    @{" "}
                    <a
                      href={activeExp.companyUrl}
                      className="underline decoration-dotted underline-offset-2 transition-colors hover:text-white"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {activeExp.company}
                    </a>
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500 sm:text-sm">
                  <span className="flex items-center gap-1 font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-zinc-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {activeExp.location}
                  </span>
                  <span className="text-zinc-700">•</span>
                  <span>{activeExp.range}</span>
                </div>
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-1.5">
              {activeExp.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs leading-relaxed text-zinc-400"
                >
                  <span className="text-zinc-600 select-none">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
