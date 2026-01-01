import { useState } from "react";

const experiences = [
	{
		company: "Siemens",
		companyUrl: "https://www.siemens.com/",
		logo: "/assets/company-logos/siemens.jpeg",
		title: "Graduate Engineer Trainee",
		range: "April 2025 - Present",
		location: "Bangalore, India",
		bullets: [
			"Developing a Threat and Risk Assessment AI Assistant aimed at automating cyber risk analysis and mitigation workflows for industrial applications.",
			"Designing and implementing AI-powered orchestration workflows using LangChain, LangGraph, and Vision models, enabling dynamic decision-making and intelligent task automation.",
			"Developing a full-stack web application with React frontend and FastAPI backend, integrating complex AI pipelines with intuitive UI for seamless user experience.",
			"Building a dashboard to deliver risk categorization, scoring, and mitigation suggestions based on threat analysis, improving usability and supporting scalable assessments.",
		],
	},
	{
		company: "Brand Context",
		companyUrl: "https://brandcontext.ai/",
		logo: "/assets/company-logos/brandcontext.jpeg",
		title: "IoT Developer Intern",
		range: "December 2024 - March 2025",
		location: "Remote",
		bullets: [
			"Developed a prototype of an AI-driven modular bot for real-time manufacturing updates, enabling video streaming, barcode scanning, UI interaction, and operational monitoring.",
			"Assisted in CAD modelling and component selection, collaborating with the team to optimize the bot's design and functionality.",
			"Developed an AI-powered camera using Raspberry Pi for dashboard panel monitoring, and enhanced the hardware to create a smart helmet for factory workers.",
		],
	},
	{
		company: "GRIG Technologies",
		companyUrl: "https://grigtechnologies.in",
		logo: "/assets/company-logos/grig.jpeg",
		title: "Full Stack IoT Developer",
		range: "August 2023 - January 2025",
		location: "Pune, India",
		bullets: [
			"Building a modern full-stack business management solution for mid-tier stores, managing all aspects of design, development, and implementation.",
			"Maintaining CI/CD Pipelines and GitHub for Organizations, managing deployments, workflows and team, and other DevOps related tasks.",
			"Leading R&D for a lightweight, hands-free Linux based kiosk using Raspberry Pi Zero 2W, engineered to provide a cost-effective and flexible display solution.",
			"Developing frontend of an alert dashboard to automate workflows, enabling the seamless sending of automated and promotional emails.",
		],
	},
	{
		company: "Golain",
		companyUrl: "https://golain.io/",
		logo: "/assets/company-logos/golain.jpeg",
		title: "IoT Developer Intern",
		range: "June 2024 – August 2024",
		location: "Remote",
		bullets: [
			"Migrated Platform IO SDKs to Arduino IDE, improving development efficiency and cross-platform compatibility.",
			"Developed Espressif microcontroller SDKs for integration with Golain Cloud.",
			"Enhanced data serialization and efficiency using Protocol Buffers and Arduino JSON.",
			"Developed client projects, including a Smart Bedside Table and WLED-based LED automation system.",
			"Trained a TensorFlow Lite model for Vision AI v2 for facial recognition, enabling AI-powered door lock automation.",
		],
	},
	{
		company: "E4A Solutions",
		companyUrl: "https://e4asolution.com/",
		logo: "/assets/company-logos/e4a.jpeg",
		title: "Embedded Developer Intern",
		range: "April 2023 – July 2023",
		location: "Mumbai, India",
		bullets: [
			"Developed a hospital software solution using NRF52 DK and Raspberry Pi, with mesh network topology via Thread Protocol and seamless MQTT communication.",
			"Integrated GPIO inputs for real-time alert triggers. Optimized battery management by leveraging NRF chip capabilities.",
			"Created a basic web-based GUI for responsive alert management and control. Implemented NoSQL-backed data logging and analysis.",
		],
	},
];

export default function Experience() {
	const [active, setActive] = useState(0);
	const activeExp = experiences[active];

	return (
		<section>
			<p className="mb-4 text-xs uppercase tracking-widest text-zinc-600 transition-colors hover:text-white">
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
				<div
					id={`panel-${active}`}
					role="tabpanel"
					aria-labelledby={`tab-${active}`}
					className="flex-1 transition-opacity duration-300"
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
									<span className="select-none text-zinc-600">•</span>
									<span>{bullet}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
