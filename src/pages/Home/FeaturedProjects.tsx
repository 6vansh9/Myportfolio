import { useState } from "react";
import { FiGithub, FiGlobe } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import StaggerChildren from "@/components/StaggerChildren";
import metadata from "@/content/metadata.json";

type Project = {
  title: string;
  description: string;
  image: string;
  website?: string;
  github?: string;
  tech: { name: string; icon: string }[];
};

const INITIAL_DISPLAY_COUNT = 4;

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="tilt-card group font-inter flex flex-col rounded-xl border border-zinc-800/50 bg-zinc-900/25 backdrop-blur-lg transition-all duration-200 ease-out hover:border-zinc-700/40 hover:bg-zinc-900/30">
      <div className="relative h-40 w-full overflow-hidden rounded-t-xl bg-zinc-900/25 backdrop-blur-lg sm:h-52">
        <img
          alt={project.title}
          className="h-full w-full object-cover"
          src={project.image}
        />
      </div>
      <div className="flex flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5">
        <div className="mb-3 flex items-start justify-between sm:mb-3.5">
          <h3 className="text-base font-medium text-zinc-200 transition-colors sm:text-lg">
            {project.title}
          </h3>
          <div className="flex gap-3">
            {project.github && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors ease-out hover:text-zinc-300"
                href={project.github}
                title="View on GitHub"
              >
                <FiGithub size={20} />
              </a>
            )}
            {project.website && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors ease-out hover:text-zinc-300"
                href={project.website}
                title="Visit Website"
              >
                <FiGlobe size={20} />
              </a>
            )}
          </div>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-3">
          {project.tech.map((tech) => (
            <div
              key={tech.name}
              className="relative inline-flex"
              title={tech.name}
            >
              <img
                alt={tech.name}
                className="h-6 w-6 cursor-pointer object-contain transition-transform duration-150 ease-out hover:scale-110"
                src={tech.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const { featuredProjects } = metadata.home;
  const [isExpanded, setIsExpanded] = useState(false);

  const initialProjects = featuredProjects.slice(0, INITIAL_DISPLAY_COUNT);
  const extraProjects = featuredProjects.slice(INITIAL_DISPLAY_COUNT);

  return (
    <section className="w-full">
      <h2 className="mb-4 text-xs tracking-widest text-zinc-600 uppercase transition-colors hover:text-white">
        Featured Projects
      </h2>

      {/* Initial projects - animated on first scroll into view */}
      <StaggerChildren
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        stagger={0.08}
        duration={0.5}
        distance={35}
      >
        {initialProjects.map((project: Project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </StaggerChildren>

      {/* Extra projects - fade in/out on toggle */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
              opacity: { duration: 0.2 },
              height: { duration: 0.3, delay: 0 },
            }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {extraProjects.map((project: Project, i: number) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show More / Show Less Button */}
      {featuredProjects.length > INITIAL_DISPLAY_COUNT && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800/40 bg-zinc-900/30 py-3 text-sm text-zinc-400 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50 hover:text-zinc-300"
        >
          <span>
            {isExpanded
              ? "Show less"
              : `Show all ${featuredProjects.length} projects`}
          </span>
          <FaChevronDown
            className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      )}
    </section>
  );
}
