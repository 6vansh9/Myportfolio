import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ScrambledText from "@/components//ui/shadcn-io/scrambled-text";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import metadata from "@/content/metadata.json";

// Type definitions
interface NavLink {
  name: string;
  path: string;
  enabled?: boolean;
}

interface HeaderData {
  logo?: {
    prefix?: string;
    text?: string;
    href?: string;
  };
  navLinks?: NavLink[];
}

export default function Header() {
  const headerData: HeaderData = metadata.header || {};
  
  // Get enabled nav links from metadata, with defaults
  const defaultNavLinks = [
    { name: "Home", path: "/", enabled: true },
    { name: "About", path: "/about", enabled: true },
    { name: "Blogs", path: "/blogs", enabled: true },
    { name: "Apps", path: "/apps", enabled: true },
  ];
  
  // Filter only enabled nav links
  const navLinks = (headerData.navLinks || defaultNavLinks).filter(
    (link) => link.enabled !== false
  );
  
  // Check if blogs is disabled in settings and remove from nav
  const isBlogsEnabled = metadata.settings?.blogs?.enabled !== false;
  const filteredNavLinks = navLinks.filter(
    (link) => link.path !== "/blogs" || isBlogsEnabled
  );
  
  // Logo settings
  const logoPrefix = headerData.logo?.prefix ?? "~/";
  const logoText = headerData.logo?.text ?? "portfolio";
  const logoHref = headerData.logo?.href ?? "/";

  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Update border style based on scroll position
          setScrolled(currentScrollY > 0);

          // Show header when scrolling up or at top, hide when scrolling down
          if (currentScrollY < 10) {
            // Always show at top
            setVisible(true);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up - show header
            setVisible(true);
          } else if (currentScrollY > lastScrollY.current + 5) {
            // Scrolling down (with threshold) - hide header
            setVisible(false);
            setMenuOpen(false); // Close mobile menu when hiding
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 h-[60px] w-screen bg-black/60 backdrop-blur-md border-b transition-all duration-300 ease-in-out ${
          scrolled ? "border-zinc-700" : "border-transparent"
        } ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        style={{ left: 0, right: 0 }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <MaxWidthContainer height="100%">
            <div className="flex h-full w-full items-center justify-between">
              {/* Logo */}
              <div className="flex items-center cursor-pointer select-none">
                <Link to={logoHref} className="flex items-center gap-1 group">
                  <span className="text-lg text-gray-500 group-hover:text-white transition-colors">{logoPrefix}</span>
                  <ScrambledText
                    className="font-mono text-base group-hover:text-white transition-colors"
                    duration={0.8}
                    speed={1.5}
                    scrambleChars="abcdefghijklmnopqrstuvwxyz0123456789"
                  >
                    {logoText}
                  </ScrambledText>
                </Link>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden sm:flex gap-6" aria-label="Main navigation">
                {filteredNavLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative cursor-pointer font-mono text-base transition-colors ease-in-out before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-gray-400 before:transition-[width] before:duration-300 before:ease-in-out hover:text-white hover:before:w-full ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Hamburger */}
              <button
                className="sm:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-zinc-700"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </MaxWidthContainer>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <nav
        className={`sm:hidden fixed top-[60px] z-40 w-screen bg-black/95 backdrop-blur-lg border-b border-zinc-800 transition-all duration-300 ease-in-out ${
          menuOpen && visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ left: 0, right: 0 }}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen || !visible}
      >
        <div className="flex w-full items-center justify-center">
          <MaxWidthContainer>
            <div className="flex flex-col py-4 gap-1">
              {filteredNavLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={isActive ? "page" : undefined}
                    className={`block py-3 px-3 rounded-lg font-mono text-base transition-colors ${
                      isActive
                        ? "bg-zinc-800 text-white"
                        : "text-gray-400 hover:bg-zinc-800/50 hover:text-white"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </MaxWidthContainer>
        </div>
      </nav>
    </>
  );
}
