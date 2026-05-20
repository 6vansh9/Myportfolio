import { FiGithub, FiGlobe } from "react-icons/fi";
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

export default function FeaturedProjects() {
  const { featuredProjects } = metadata.home;

  return (
    <section className="w-full">
      <p className="mb-4 text-xs tracking-widest text-zinc-600 uppercase transition-colors hover:text-white">
        Featured Projects
      </p>
      <StaggerChildren
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        stagger={0.08}
        duration={0.5}
        distance={35}
      >
        {featuredProjects.map((project: Project) => (
          <div
            key={project.title}
            className="tilt-card group font-inter flex flex-col rounded-xl border border-zinc-800/50 bg-zinc-900/25 backdrop-blur-lg transition-all duration-200 ease-out hover:border-zinc-700/40 hover:bg-zinc-900/30"
          >
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
        ))}
      </StaggerChildren>
    </section>
  );
}
