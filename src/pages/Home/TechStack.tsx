import { Tooltip } from "@/components/tooltip";
import metadata from "@/content/metadata.json";

export default function TechStack() {
	const { techStack } = metadata.home;

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
