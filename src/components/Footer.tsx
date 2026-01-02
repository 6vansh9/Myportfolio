import { Separator } from "@/components/ui/separator";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/gautamvhavle",
    icon: FiGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/gautamvhavle",
    icon: FiLinkedin,
  },
  {
    name: "Email",
    href: "mailto:gautamvhavle@gmail.com",
    icon: FiMail,
  },
];

export default function Footer() {
  return (
    <footer className="mb-3 flex w-full flex-col items-center justify-center">
      <Separator className="mb-5 w-full max-w-3xl bg-zinc-700/40" />
      <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        <span className="text-xs text-zinc-400 select-none">
          © {new Date().getFullYear()} Made with ❤️ by{" "}
          <a
            href="https://github.com/gautamvhavle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-semibold underline transition-colors"
          >
            Gautam Vhavle
          </a>
          .
        </span>
        <div className="flex gap-4">
          {socials.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="focus-visible:ring-primary rounded-full p-2 transition-colors hover:bg-zinc-800/60 focus-visible:ring-2 focus-visible:outline-none"
            >
              <Icon className="hover:text-primary size-5 text-zinc-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
