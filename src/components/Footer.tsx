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
        <footer className="w-full mb-3 flex flex-col items-center justify-center">
            <Separator className="mb-5 w-full max-w-3xl bg-zinc-700/40" />
            <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl px-4 gap-3">
                <span className="text-xs text-zinc-400 select-none">
                    © {new Date().getFullYear()} Made with ❤️ by Gautam Vhavle.
                </span>
                <div className="flex gap-4">
                    {socials.map(({ name, href, icon: Icon }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={name}
                            className="rounded-full p-2 transition-colors hover:bg-zinc-800/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        >
                            <Icon className="size-5 text-zinc-400 hover:text-primary transition-colors" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
