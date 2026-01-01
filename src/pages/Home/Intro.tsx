import { AnimatedTextSlider } from "@/components/animated-text-slider";
import { FaCode } from "react-icons/fa6";
import {
  MdOutlineLocationOn,
  MdMailOutline,
  MdAccessTime,
} from "react-icons/md";
import { FiGlobe } from "react-icons/fi";
import { IoMdMale } from "react-icons/io";

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
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center gap-2 sm:gap-4">
            <div>
              <p className="text-left font-sans text-3xl font-semibold sm:text-4xl">
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
            <div className="hidden h-6 cursor-pointer items-center gap-2.5 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3 py-0.5 transition-colors hover:bg-gray-700 sm:flex">
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
            <InfoItem icon={<FaCode className="text-zinc-400" />}>
              Full-Stack Developer
            </InfoItem>

            <InfoItem icon={<MdOutlineLocationOn className="text-zinc-400" />}>
              Bengaluru, Karnataka, India
            </InfoItem>

            <InfoItem
              href="mailto:gautamvhavle@gmail.com"
              icon={<MdMailOutline className="text-zinc-400" />}
            >
              gautamvhavle@gmail.com
            </InfoItem>
          </div>

          {/* Right Column */}
          <div className="hidden flex-col gap-2 md:flex">
            <InfoItem icon={<MdAccessTime className="text-zinc-400" />}>
              <span className="flex items-center gap-2">
                08:46 PM
                <span className="text-xs text-zinc-600">// same time</span>
              </span>
            </InfoItem>

            <InfoItem
              href="https://grigtechnologies.com"
              icon={<FiGlobe className="text-zinc-400" />}
            >
              grigtechnologies.com
            </InfoItem>

            <InfoItem icon={<IoMdMale className="text-zinc-400" />}>
              he/him
            </InfoItem>
          </div>
        </div>
      </div>
    </div>
  );
}
