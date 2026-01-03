import { Tooltip } from "@/components/tooltip";

const techStack = [
	{ name: "Python", url: "https://www.python.org/", icon: "python.svg" },
	{ name: "TypeScript", url: "https://www.typescriptlang.org/", icon: "typescript.svg" },
	{ name: "JavaScript", url: "https://www.javascript.com/", icon: "javascript.svg" },
	{ name: "C++", url: "https://isocpp.org/", icon: "cpp.svg" },
	{ name: "Bash", url: "https://www.gnu.org/software/bash/", icon: "bash.svg" },
	{ name: "ReactJS", url: "https://react.dev/", icon: "react.svg" },
	{ name: "Vite", url: "https://vitejs.dev/", icon: "vite.svg" },
	{ name: "Sass", url: "https://sass-lang.com/", icon: "sass.svg" },
	{ name: "Tailwind CSS", url: "https://tailwindcss.com/", icon: "tailwind.svg" },
	{ name: "ShadCN", url: "https://ui.shadcn.com/", icon: "shadcn.svg" },
	{ name: "Postman", url: "https://www.postman.com/", icon: "postman.svg" },
	{ name: "PostgreSQL", url: "https://www.postgresql.org/", icon: "postgres.svg" },
	{ name: "MSSQL", url: "https://www.microsoft.com/en-us/sql-server/", icon: "mssql.svg" },
	{ name: "MongoDB", url: "https://www.mongodb.com/", icon: "mongodb.svg" },
	{ name: "Flask", url: "https://flask.palletsprojects.com/", icon: "flask.svg" },
	{ name: "FastAPI", url: "https://fastapi.tiangolo.com/", icon: "fastapi.svg" },
	{ name: "Git", url: "https://git-scm.com/", icon: "git.svg" },
	{ name: "GitHub", url: "https://github.com/", icon: "github.svg" },
	{ name: "Docker", url: "https://www.docker.com/", icon: "docker.svg" },
	{ name: "Kubernetes", url: "https://kubernetes.io/", icon: "kubernetes.svg" },
	{ name: "Helm", url: "https://helm.sh/", icon: "helm.svg" },
	{ name: "n8n", url: "https://n8n.io/", icon: "n8n.svg" },
	{ name: "LangChain", url: "https://langchain.com/", icon: "langchain.svg" },
	{ name: "Copilot", url: "https://docs.github.com/en/copilot", icon: "copilot.svg" },
	{ name: "Docling", url: "https://www.docling.ai/", icon: "docling.svg" },
	{ name: "LangFuse", url: "https://www.langfuse.com/", icon: "langfuse.svg" },
	{ name: "Ollama", url: "https://www.ollama.com/", icon: "ollama.svg" },
	{ name: "LlamaIndex", url: "https://www.llamaindex.ai/", icon: "llamaindex.svg" },
	{ name: "OpenRouter", url: "https://openrouter.ai/", icon: "openrouter.svg" },
	{ name: "Raspberry Pi", url: "https://www.raspberrypi.com/", icon: "raspberrypi.svg" },
	{ name: "Espressif", url: "https://www.espressif.com/", icon: "espressif.svg" },
	{ name: "VS Code", url: "https://code.visualstudio.com/", icon: "vscode.svg" },
	{ name: "Cursor", url: "https://www.cursor.so/", icon: "cursor.svg" },
	{ name: "Canva", url: "https://www.canva.com/", icon: "canva.svg" },
	{ name: "Figma", url: "https://www.figma.com/", icon: "figma.svg" },
];

export default function TechStack() {
	return (
		<div className="flex w-full min-w-0 flex-col items-start justify-start gap-5 overflow-visible">
			<p className="text-xs text-zinc-600 uppercase tracking-widest hover:text-white transition-colors">
				TECH STACK
			</p>
			<div className="flex w-full min-w-0 flex-wrap gap-3 sm:gap-4 justify-start">
				{techStack.map(({ name, url, icon }) => (
					<Tooltip key={name} text={name}>
						<a href={url} target="_blank" rel="noopener noreferrer">
							<img
								src={`/assets/tech-stack/${icon}`}
								alt={name}
								className="h-8 w-8 sm:h-10 sm:w-10 transition-transform duration-200 ease-in-out hover:scale-110"
							/>
						</a>
					</Tooltip>
				))}
			</div>
		</div>
	);
}
