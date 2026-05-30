import { AnimatedTextSlider } from "@/components/animated-text-slider";
import ShinyText from "@/components/ShinyText";
import { useHaptics } from "@/hooks/useHaptics";
import { motion } from "motion/react";

import { FaCode } from "react-icons/fa6";
import {
  MdOutlineLocationOn,
  MdMailOutline,
  MdAccessTime,
} from "react-icons/md";
import { FiGlobe } from "react-icons/fi";
import { IoMdMale } from "react-icons/io";
import { useEffect, useState } from "react";
import metadata from "@/content/metadata.json";

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
  const [now, setNow] = useState(new Date());
  const { intro } = metadata.home;
  const { trigger } = useHaptics();

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 50);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="flex w-full flex-col items-start justify-center gap-9">
      {/* Top Section */}
      <div className="flex w-full flex-row items-center gap-5">
        <motion.img
          src={intro.avatar}
          alt={`Photo of ${intro.name}`}
          className="h-20 w-20 rounded-lg object-cover grayscale filter"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
        />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center gap-2 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
            >
              <h1 className="text-left font-sans text-3xl font-semibold sm:text-4xl">
                {intro.name}
              </h1>
              <div className="w-full text-left">
                <AnimatedTextSlider texts={intro.roles} />
              </div>
            </motion.div>
            {intro.availability?.enabled !== false &&
              intro.availability?.status && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.5 }}
                  onClick={() => trigger([{ duration: 1000 }], { intensity: 1 })}
                  className="hidden h-6 cursor-pointer items-center gap-2.5 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3 py-0.5 transition-colors hover:bg-gray-700 sm:flex">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_1px_rgba(34,197,94,0.5)]"></span>
                  </span>

                  <ShinyText
                    className="text-[10px] text-zinc-400"
                    text={intro.availability.text || "Available"}
                    speed={3.2}
                  />
                </motion.div>
              )}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }}
      >
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-2">
            <InfoItem icon={<FaCode className="text-zinc-400" />}>
              {intro.contact.role}
            </InfoItem>

            <InfoItem icon={<MdOutlineLocationOn className="text-zinc-400" />}>
              {intro.contact.location}
            </InfoItem>

            <InfoItem
              href={`mailto:${intro.contact.email}`}
              icon={<MdMailOutline className="text-zinc-400" />}
            >
              {intro.contact.email}
            </InfoItem>
          </div>

          {/* Right Column */}
          <div className="hidden flex-col gap-2 md:flex">
            <InfoItem icon={<MdAccessTime className="text-zinc-400" />}>
              <span className="flex items-center gap-2">
                {formattedTime}
                <span className="text-xs text-zinc-600">
                  {intro.contact.timezone}
                </span>
              </span>
            </InfoItem>

            <InfoItem
              href={intro.contact.websiteUrl}
              icon={<FiGlobe className="text-zinc-400" />}
            >
              {intro.contact.website}
            </InfoItem>

            <InfoItem icon={<IoMdMale className="text-zinc-400" />}>
              {intro.contact.pronouns}
            </InfoItem>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
