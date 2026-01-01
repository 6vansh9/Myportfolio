import { AnimatedTextSlider } from "@/components/animated-text-slider";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/tooltip";
import { Separator } from "@/components/ui/separator";
import { IoDocumentOutline, IoMailOutline, IoLogoGithub } from "react-icons/io5";
import { FaXTwitter, FaTerminal } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";

interface InfoItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}

const InfoItem = ({ icon, children, href }: InfoItemProps) => (
  <div className="flex items-center gap-2">
    <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-700/50 bg-zinc-800/50">
      {icon}
    </span>
    {href ? (
      <a
        href={href}
        target="_blank"
        className="text-sm text-zinc-300 transition-colors hover:text-white hover:underline"
      >
        {children}
      </a>
    ) : (
      <span className="font-mono text-sm text-zinc-300">{children}</span>
    )}
  </div>
);

export default function Intro() {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-9">
      {/* Top Section */}
      <div className="flex w-full flex-row items-center gap-5">
        <img
          src="/assets/avatar.jpg"
          alt="Photo by Drew Beamer"
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full items-center gap-2 sm:gap-4">
            <div>
              <p className="font-sans text-3xl sm:text-4xl font-semibold text-left">
                Gautam Vhavle
              </p>
              <div className="w-full text-left">
                <AnimatedTextSlider
                  texts={[
                    "Full-Stack Developer",
                    "GenAI Developer",
                    "IoT Developer",
                    "Context Engineering",
                  ]}
                />
              </div>
            </div>
            <div className="hidden sm:flex h-6 cursor-pointer items-center gap-2.5 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3 py-0.5 transition-colors hover:bg-gray-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_1px_rgba(34,197,94,0.5)]"></span>
              </span>
              <p className="text-[10px] text-zinc-400">Available for work</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-2">
            <InfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              }
            >
              Full-Stack Developer
            </InfoItem>

            <InfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            >
              Bengaluru, Karnataka, India
            </InfoItem>

            <InfoItem
              href="mailto:gautamvhavle@gmail.com"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            >
              gautamvhavle@gmail.com
            </InfoItem>
          </div>

          {/* Right Column */}
          <div className="hidden md:flex flex-col gap-2">
            <InfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            >
              <span className="flex items-center gap-2">
                08:46 PM
                <span className="text-xs text-zinc-600">// same time</span>
              </span>
            </InfoItem>

            <InfoItem
              href="https://grigtechnologies.com"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              }
            >
              grigtechnologies.com
            </InfoItem>

            <InfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
            >
              he/him
            </InfoItem>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="w-full">
        <p className="font-mono text-zinc-400 text-sm sm:text-base text-left">
          I'm a software engineer and patent holder passionate about creating
          human-centered, future-ready products. Currently, I'm engineering
          GenAI solutions at{" "}
          <a
            href="https://siemens.com"
            target="_blank"
            className="text-zinc-300 transition-colors hover:text-white hover:underline"
          >
            Siemens
          </a>{" "}
          while exploring how emerging technologies can transform industries and
          improve everyday life.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap w-full items-center justify-start gap-2 min-h-[40px]">
        <a
          href="https://drive.google.com/file/d/11226IywvimrBUydAPa9DVyvfE1thKh2b/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="default">
            <IoDocumentOutline />
            <p className="font-mono text-[13px] font-extralight">Resume</p>
          </Button>
        </a>

        <Button variant="outline" size="default">
          <LuSend />
          <p className="font-mono text-[13px] font-extralight">Contact</p>
        </Button>

        <Separator orientation="vertical" className="hidden sm:block" />

        <Tooltip text="Github">
          <a href="https://github.com/gautamvhavle" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <IoLogoGithub />
            </Button>
          </a>
        </Tooltip>

        <Tooltip text="X">
          <a href="https://x.com/gautamvvvv" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <FaXTwitter />
            </Button>
          </a>
        </Tooltip>

        <Tooltip text="Mail">
          <a href="mailto:gautamvhavle@example.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <IoMailOutline />
            </Button>
          </a>
        </Tooltip>

        <Separator orientation="vertical" className="hidden sm:block" />

        <Tooltip text="Terminal">
          <Button variant="outline" size="icon">
            <FaTerminal />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
