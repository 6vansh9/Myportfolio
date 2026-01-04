import { FiGithub, FiGlobe } from "react-icons/fi";

type Project = {
  title: string;
  description: string;
  image: string;
  website?: string;
  github?: string;
  tech: { name: string; icon: string }[];
};

const featuredProjects: Project[] = [
  {
    title: "Old Portfolio",
    description:
      "A personal website to showcase my projects, skills, and experience.",
    image: "/assets/projects/old-portfolio.png",
    website: "https://gautamvhavle.vercel.app/",
    tech: [
      { name: "Vite", icon: "/assets/tech-stack/vite.svg" },
      { name: "React", icon: "/assets/tech-stack/react.svg" },
      { name: "SASS", icon: "/assets/tech-stack/sass.svg" },
      { name: "TypeScript", icon: "/assets/tech-stack/typescript.svg" },
      { name: "Figma", icon: "/assets/tech-stack/figma.svg" },
    ],
  },
  {
    title: "Parkive",
    description:
      "A smart parking solution with real time data visualisation using IoT technology.",
    image: "/assets/projects/parkive.png",
    website: "https://gautamvhavle.wixsite.com/website",
    github: "https://github.com/GautamVhavle/parkive",
    tech: [
      { name: "React", icon: "/assets/tech-stack/react.svg" },
      { name: "SASS", icon: "/assets/tech-stack/sass.svg" },
      { name: "JavaScript", icon: "/assets/tech-stack/javascript.svg" },
      { name: "Espressif", icon: "/assets/tech-stack/espressif.svg" },
      { name: "Figma", icon: "/assets/tech-stack/figma.svg" },

    ],
  },
  {
    title: "Ventory.in",
    description:
      "An easy-to-use inventory management software for MSMEs.",
    image: "/assets/projects/ventory.png",
    website: "https://ventory.in",
    tech: [
      { name: "Vite", icon: "/assets/tech-stack/vite.svg" },
      { name: "React", icon: "/assets/tech-stack/react.svg" },
      { name: "SASS", icon: "/assets/tech-stack/sass.svg" },
      { name: "JavaScript", icon: "/assets/tech-stack/javascript.svg" },
      { name: "Figma", icon: "/assets/tech-stack/figma.svg" },
    ],
  },
  {
    title: "GrigTechnologies.com",
    description:
      "A simple and modern homepage for a technology company.",
    image: "/assets/projects/grig.png",
    website: "https://grigtechnologies.com",
    tech: [
      { name: "Vite", icon: "/assets/tech-stack/vite.svg" },
      { name: "React", icon: "/assets/tech-stack/react.svg" },
      { name: "SASS", icon: "/assets/tech-stack/sass.svg" },
      { name: "JavaScript", icon: "/assets/tech-stack/javascript.svg" },
      { name: "Figma", icon: "/assets/tech-stack/figma.svg" },
    ],
  },
];

export default function FeaturedProjects() {
  return (
    <section className="w-full">
      <p className="mb-4 text-xs tracking-widest text-zinc-600 uppercase transition-colors hover:text-white">
        Featured Projects
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <div
            key={project.title}
            className="group font-inter flex flex-col rounded-xl border border-zinc-800/50 bg-zinc-900/25 backdrop-blur-lg transition-all duration-200 ease-out hover:border-zinc-700/40 hover:bg-zinc-900/30"
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
      </div>
    </section>
  );
}
