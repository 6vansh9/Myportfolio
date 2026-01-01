import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import ScrambledText from "@/components//ui/shadcn-io/scrambled-text";

export default function Header() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Apps", path: "/apps" },
  ];
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`bg-opacity-50 fixed top-0 z-50 flex h-[60px] w-full items-center justify-center bg-black/60 backdrop-blur-md transition-colors duration-300
        border-b ${scrolled ? "border-zinc-700" : "border-transparent"}`}
      style={{ borderBottomWidth: "1px" }}
    >
      <MaxWidthContainer>
        <div className="flex h-full w-full items-center justify-between">
          <div className="flex h-full items-center justify-center">
            <div className="text-lg text-gray-500">~/</div>
            <ScrambledText
              className="font-mono text-base"
              duration={0.8}
              speed={1.5}
              scrambleChars="abcdefghijklmnopqrstuvwxyz0123456789"
            >
              gautam_vhavle
            </ScrambledText>
          </div>
          <nav className="flex gap-6" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative cursor-pointer font-mono text-base transition-colors ease-in-out before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-gray-400 before:transition-[width] before:duration-700 before:ease-in-out hover:text-white hover:before:w-full ${
                    isActive ? "text-white before:w-full" : "text-gray-500"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </MaxWidthContainer>

    </header>
  );
}
