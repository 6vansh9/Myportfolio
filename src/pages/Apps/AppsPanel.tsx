import { useState, useMemo } from "react";
import AppCardDetailed from "@/components/AppCardDetailed";
import AppCardCompact from "@/components/AppCardCompact";
import appsData from "@/content/apps-metadata.json";
import { IoGrid, IoList } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

type App = {
  id: number;
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
  createdDate: string;
  tags: string[];
};

type ViewMode = "detailed" | "compact";

const typedApps = appsData as App[];

export default function AppsPanel() {
  const [viewMode, setViewMode] = useState<ViewMode>("detailed");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return typedApps;

    const query = searchQuery.toLowerCase();
    return typedApps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.tags?.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [searchQuery]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
            My Apps
          </h1>
          <p className="text-sm text-zinc-400">
            A collection of tools and applications I've built.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex flex-1 items-center sm:max-w-xs">
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 py-2.5 pr-4 pl-12 text-sm text-zinc-200 placeholder-zinc-500 backdrop-blur-lg transition-all duration-300 outline-none focus:border-zinc-700/50 focus:bg-zinc-900/50"
            />
            <span className="pointer-events-none absolute top-1/2 left-4 flex -translate-y-1/2 items-center">
              <FaSearch className="h-5 w-5 text-zinc-500" />
            </span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-zinc-800/40 bg-zinc-900/30 p-1 backdrop-blur-lg">
            <button
              onClick={() => setViewMode("detailed")}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                viewMode === "detailed"
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <IoList className="h-4 w-4" />
              <span className="hidden sm:inline">Detailed</span>
            </button>
            <button
              onClick={() => setViewMode("compact")}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                viewMode === "compact"
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <IoGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Compact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      {filteredApps.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-800/60 bg-zinc-900/10 py-16 text-center">
          <FaSearch className="h-8 w-8 text-zinc-700" />
          <p className="text-sm text-zinc-500">
            No apps found matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-zinc-400 underline transition-colors hover:text-zinc-300"
          >
            Clear search
          </button>
        </div>
      ) : viewMode === "detailed" ? (
        <div className="flex flex-col gap-4">
          {filteredApps.map((app) => (
            <AppCardDetailed key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/25 p-6 backdrop-blur-lg">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {filteredApps.map((app) => (
              <AppCardCompact key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-zinc-600">
        <span>{typedApps.length} apps available</span>
      </div>
    </div>
  );
}
