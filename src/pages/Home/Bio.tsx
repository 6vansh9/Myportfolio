import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  IoDocumentOutline,
  IoMailOutline,
  IoLogoGithub,
} from "react-icons/io5";
import { FaXTwitter, FaTerminal } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";

export default function Bio() {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-9">
      <div className="w-full">
        <p className="text-left font-mono text-sm text-zinc-400 sm:text-base">
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

        <Button variant="outline" size="default">
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
            href="mailto:gautamvhavle@example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
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
