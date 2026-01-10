import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/tooltip";
import { Separator } from "@/components/ui/separator";
import { FiLinkedin } from "react-icons/fi";
import {
  IoDocumentOutline,
  IoMailOutline,
  IoLogoGithub,
  IoLinkOutline,
} from "react-icons/io5";
import {
  FaXTwitter,
  FaDev,
  FaYoutube,
  FaInstagram,
  FaSpotify,
} from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import metadata from "@/content/metadata.json";

// Icon map with fallback for unknown social types
const iconMap: Record<string, React.ReactNode> = {
  Github: <IoLogoGithub />,
  LinkedIn: <FiLinkedin />,
  X: <FaXTwitter />,
  Mail: <IoMailOutline />,
  Instagram: <FaInstagram />,
  YouTube: <FaYoutube />,
  Dev: <FaDev />,
  Spotify: <FaSpotify />,
};

// Default icon for unknown social platforms
const DefaultIcon = <IoLinkOutline />;

// Type definitions
interface Social {
  enabled?: boolean;
  name: string;
  url?: string;
  icon?: string;
}

interface BioData {
  description?: string;
  company?: {
    name?: string;
    url?: string;
  };
  descriptionEnd?: string;
  resumeUrl?: string;
  contactSectionId?: string;
  socials?: Social[];
}

export default function Bio() {
  const bio: BioData = metadata.home?.bio || {};

  // Filter enabled socials that have URLs
  const enabledSocials = (bio.socials || []).filter(
    (social) => social.enabled !== false && social.url
  );

  // Check if resume is available
  const hasResume = !!bio.resumeUrl;

  // Check if contact section exists
  const hasContactSection = !!bio.contactSectionId;

  return (
    <div className="flex w-full flex-col items-start justify-center gap-9">
      {/* Description - Only render if description exists */}
      {bio.description && (
        <div className="w-full">
          <p className="text-left font-mono text-sm text-zinc-400 sm:text-base">
            {bio.description}{" "}
            {bio.company?.url && bio.company?.name ? (
              <a
                href={bio.company.url}
                target="_blank"
                className="text-zinc-300 transition-colors hover:text-white hover:underline"
              >
                {bio.company.name}
              </a>
            ) : bio.company?.name ? (
              <span className="text-zinc-300">{bio.company.name}</span>
            ) : null}
            {bio.descriptionEnd}
          </p>
        </div>
      )}

      {/* Buttons - Only render if there's something to show */}
      {(hasResume || hasContactSection || enabledSocials.length > 0) && (
        <div className="flex min-h-[40px] w-full flex-wrap items-center justify-start gap-2">
          {/* Resume Button */}
          {hasResume && (
            <a
              href={bio.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="default">
                <IoDocumentOutline />
                <p className="font-mono text-[13px] font-extralight">Resume</p>
              </Button>
            </a>
          )}

          {/* Contact Button */}
          {hasContactSection && (
            <Button
              variant="outline"
              size="default"
              onClick={() => {
                const el = document.getElementById(bio.contactSectionId!);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <LuSend />
              <p className="font-mono text-[13px] font-extralight">Contact</p>
            </Button>
          )}

          {/* Separator - Only show if we have both action buttons and socials */}
          {(hasResume || hasContactSection) && enabledSocials.length > 0 && (
            <Separator orientation="vertical" className="hidden sm:block" />
          )}

          {/* Social Icons */}
          {enabledSocials.map((social) => (
            <Tooltip key={social.name} text={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  {iconMap[social.name] || DefaultIcon}
                </Button>
              </a>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}
