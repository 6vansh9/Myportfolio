import { Link, useLocation } from "react-router-dom";
import { IoChevronForward, IoApps } from "react-icons/io5";

interface BreadcrumbProps {
  appName?: string;
}

export default function AppBreadcrumb({ appName }: BreadcrumbProps) {
  const location = useLocation();
  const isAppPage = location.pathname !== "/apps" && location.pathname.startsWith("/apps/");

  return (
    <nav className="flex items-center gap-1 text-sm">
      {/* Apps Link */}
      <Link
        to="/apps"
        className={`flex items-center gap-1.5 transition-colors ${
          isAppPage
            ? "text-zinc-500 hover:text-zinc-300"
            : "text-zinc-300"
        }`}
      >
        <IoApps className="h-4 w-4" />
        <span>Apps</span>
      </Link>

      {/* Separator & App Name */}
      {isAppPage && appName && (
        <>
          <IoChevronForward className="h-3.5 w-3.5 text-zinc-600" />
          <span className="text-zinc-300">{appName}</span>
        </>
      )}
    </nav>
  );
}