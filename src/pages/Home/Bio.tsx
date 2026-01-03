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

export default function Bio() {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-9">
      <div className="w-full">
        <p className="text-left font-mono text-sm text-zinc-400 sm:text-base">
          Software engineer. Patent holder. Builder at heart. I craft intelligent
          systems that bridge the gap between cutting-edge tech and real-world
          impact. Currently engineering GenAI solutions at{" "}
          <a
            href="https://siemens.com"
            target="_blank"
            className="text-zinc-300 transition-colors hover:text-white hover:underline"
          >
            Siemens
          </a>
          , where I turn complex AI concepts into production-ready products.
          I build things that ship, scale, and actually matter.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex min-h-[40px] w-full flex-wrap items-center justify-start gap-2">
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

        <Button
          variant="outline"
          size="default"
          onClick={() => {
            const el = document.getElementById("contact-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <LuSend />
          <p className="font-mono text-[13px] font-extralight">Contact</p>
        </Button>

        <Separator orientation="vertical" className="hidden sm:block" />

        <Tooltip text="Github">
          <a
            href="https://github.com/gautamvhavle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <IoLogoGithub />
            </Button>
          </a>
        </Tooltip>

        <Tooltip text="LinkedIn">
          <a
            href="https://www.linkedin.com/in/gautamvhavle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <FiLinkedin />
            </Button>
          </a>
        </Tooltip>

        <Tooltip text="X">
          <a
            href="https://x.com/gautamvvvv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <FaXTwitter />
            </Button>
          </a>
        </Tooltip>

        <Tooltip text="Mail">
          <a
            href="mailto:gautamvhavle@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <IoMailOutline />
            </Button>
          </a>
        </Tooltip>

        <Tooltip text="Instagram">
          <a
            href="https://instagram.com/gautam_vhavle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <FaInstagram />
            </Button>
          </a>
        </Tooltip>

        <Tooltip text="YouTube">
          <a
            href="https://youtube.com/@gautamvhavle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <FaYoutube />
            </Button>
          </a>
        </Tooltip>

        <Tooltip text="Dev">
          <a
            href="https://dev.to/gautamvhavle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <FaDev />
            </Button>
          </a>
        </Tooltip>

        <Tooltip text="Spotify">
          <a
            href="https://open.spotify.com/user/31pd44dwu42evyskhwyb3fh7t2yy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <FaSpotify />
            </Button>
          </a>
        </Tooltip>
      </div>
    </div>
  );
}
