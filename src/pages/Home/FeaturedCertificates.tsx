import { useState, useRef } from "react";
import certificates from "@/content/featured-certificates-metadata.json";
import CertificateCard from "@/components/CertificateCard";
import StaggerChildren from "@/components/StaggerChildren";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { LuBrainCircuit } from "react-icons/lu";
import { FaArrowRightLong, FaChevronDown } from "react-icons/fa6";

type Certificate = {
  id: number;
  name: string;
  issuer: string;
  issuerLogo: string;
  credentialId: string;
  issuedDate: string;
  skills: string[];
  credentialUrl: string;
};

const typedCertificates = certificates as Certificate[];

const INITIAL_DISPLAY_COUNT = 5;

export default function FeaturedCertificates() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (isExpanded && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full" ref={containerRef}>
      {/* Section Header */}
      <h2 className="mb-4 text-xs uppercase tracking-widest text-zinc-600 transition-colors hover:text-white">
        Featured Certifications
      </h2>

      {/* Main Card Container */}
      <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/25 p-4 backdrop-blur-lg sm:p-6">
        {/* Certificates List */}
        <StaggerChildren
          className="flex flex-col gap-3"
          stagger={0.06}
          duration={0.4}
          distance={25}
        >
          {(isExpanded ? typedCertificates : typedCertificates.slice(0, INITIAL_DISPLAY_COUNT)).map((certificate) => (
            <div key={certificate.id}>
              <CertificateCard certificate={certificate} />
            </div>
          ))}
        </StaggerChildren>

        {/* Expand/Collapse Button */}
        {typedCertificates.length > INITIAL_DISPLAY_COUNT && (
          <button
            onClick={handleToggle}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800/40 bg-zinc-900/30 py-3 text-sm text-zinc-400 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50 hover:text-zinc-300"
          >
            <span>
              {isExpanded
                ? "Show less"
                : `Show all ${typedCertificates.length} certifications`}
            </span>
            <FaChevronDown
              className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        )}

        {/* Stats Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/40 pt-4">
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <AiOutlineSafetyCertificate className="h-4 w-4" />
              <span>{typedCertificates.length} Certifications</span>
            </span>
            <span className="flex items-center gap-1.5">
              <LuBrainCircuit className="h-4 w-4" />
              <span>
                {new Set(typedCertificates.flatMap((c) => c.skills)).size}+
                Skills
              </span>
            </span>
          </div>

          <a
            href="https://www.linkedin.com/in/gautamvhavle/details/certifications"
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <span>View more on LinkedIn</span>
            <FaArrowRightLong className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}