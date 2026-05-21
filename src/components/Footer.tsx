import { Separator } from "@/components/ui/separator";
import ShinyText from "@/components/ShinyText";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaDev,
  FaSpotify,
} from "react-icons/fa6";
import { IoLinkOutline } from "react-icons/io5";
import { useHaptics } from "@/hooks/useHaptics";
import metadata from "@/content/metadata.json";

// Icon map for footer socials
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  x: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  dev: FaDev,
  spotify: FaSpotify,
};

// Default icon for unknown types
const DefaultIcon = IoLinkOutline;

// Type definitions
interface FooterSocial {
  enabled?: boolean;
  name: string;
  url?: string;
  icon?: string;
}

interface FooterData {
  text?: string;
  author?: {
    name?: string;
    url?: string;
  };
  socials?: FooterSocial[];
}

export default function Footer() {
  const footer: FooterData = metadata.footer || {};
  const { trigger } = useHaptics();

  // Filter enabled socials
  const enabledSocials = (footer.socials || []).filter(
    (social) => social.enabled !== false && social.url,
  );

  return (
    <footer className="mb-3 flex w-full flex-col items-center justify-center">
      <Separator className="mb-5 w-full max-w-3xl bg-zinc-700/40" />
      <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        <span className="text-xs text-zinc-400 select-none">
          © {new Date().getFullYear()} Made with{" "}
              <button
                type="button"
                onClick={() => trigger("heavy")}
                className="cursor-pointer transition-transform hover:scale-125 active:scale-95"
                aria-label="Haptic heart"
              >
                ❤️
              </button>{" "}
              by{" "}
          {footer.author?.url ? (
            <a
              href={footer.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-semibold underline transition-colors"
            >
              <ShinyText
                className="text-primary font-semibold"
                text={footer.author?.name || "Developer"}
                speed={3.2}
              />
            </a>
          ) : (
            <span className="text-primary font-semibold">
              {footer.author?.name || "Developer"}
            </span>
          )}
          .
        </span>

        <div className="flex items-center gap-4">
          {enabledSocials.length > 0 && (
          <div className="flex gap-4">
            {enabledSocials.map((social) => {
              const Icon =
                iconMap[social.icon?.toLowerCase() || ""] || DefaultIcon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="social-pop focus-visible:ring-primary rounded-full p-2 transition-colors hover:bg-zinc-800/60 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <Icon className="hover:text-primary size-5 text-zinc-400 transition-colors" />
                </a>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </footer>
  );
}
