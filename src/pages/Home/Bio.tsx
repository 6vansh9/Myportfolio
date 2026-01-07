import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/tooltip";
import { Separator } from "@/components/ui/separator";
import { FiLinkedin } from "react-icons/fi";
import {
  IoDocumentOutline,
  IoMailOutline,
  IoLogoGithub,
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

export default function Bio() {
  const { bio } = metadata.home;

  return (
    <div className="flex w-full flex-col items-start justify-center gap-9">
      <div className="w-full">
        <p className="text-left font-mono text-sm text-zinc-400 sm:text-base">
          {bio.description}{" "}
          <a
            href={bio.company.url}
            target="_blank"
            className="text-zinc-300 transition-colors hover:text-white hover:underline"
          >
            {bio.company.name}
          </a>
          {bio.descriptionEnd}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex min-h-[40px] w-full flex-wrap items-center justify-start gap-2">
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

        <Button
          variant="outline"
          size="default"
          onClick={() => {
            const el = document.getElementById(bio.contactSectionId);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <LuSend />
          <p className="font-mono text-[13px] font-extralight">Contact</p>
        </Button>

        <Separator orientation="vertical" className="hidden sm:block" />

        {bio.socials.map((social) => (
          <Tooltip key={social.name} text={social.name}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                {iconMap[social.name]}
              </Button>
            </a>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
