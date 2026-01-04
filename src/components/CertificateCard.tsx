import { useState } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

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

export default function CertificateCard({ certificate }: { certificate: Certificate }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={certificate.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 rounded-lg border border-zinc-800/40 bg-zinc-900/30 p-4 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50"
    >
      {/* Issuer Logo */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-700/30 bg-black">
        {imgError ? (
          <span className="text-lg font-semibold text-zinc-500">
            {certificate.issuer.charAt(0)}
          </span>
        ) : (
          <img
            src={certificate.issuerLogo}
            alt={`${certificate.issuer} logo`}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Header */}
        <div className="flex flex-col gap-0.5">
          <h3 className="truncate text-sm font-medium text-zinc-100 transition-colors group-hover:text-white sm:text-base">
            {certificate.name}
          </h3>
          <p className="text-xs text-zinc-400 sm:text-sm">{certificate.issuer}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <MdOutlineCalendarToday className="h-3.5 w-3.5" />
            {certificate.issuedDate}
          </span>
          <span className="hidden text-zinc-700 sm:inline">•</span>
          <span className="hidden items-center gap-1 sm:flex">
            <FaHashtag className="h-3.5 w-3.5" />
            ID: {certificate.credentialId}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {certificate.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-zinc-700/40 bg-zinc-800/30 px-2 py-0.5 text-[10px] text-zinc-400 transition-colors group-hover:border-zinc-600/50 group-hover:text-zinc-300 sm:text-xs"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 4 && (
            <span className="rounded-md border border-zinc-700/40 bg-zinc-800/30 px-2 py-0.5 text-[10px] text-zinc-500 sm:text-xs">
              +{certificate.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* External Link Icon */}
      <div className="flex shrink-0 items-start pt-1">
        <FaExternalLinkAlt className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-zinc-300" />
      </div>
    </a>
  );
}