import { useState } from "react";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";

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

export default function AppCardDetailed({ app }: { app: App }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={app.url}
      className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-900/30 backdrop-blur-lg transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/50"
    >
      {/* External Link - Top Right */}
      <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-zinc-400 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:text-zinc-200">
        <HiOutlineExternalLink className="h-4 w-4" />
      </div>

      {/* Top Section: Image + Title/Description */}
      <div className="flex gap-4 p-4">
        {/* App Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-700/40 bg-zinc-800/50 sm:h-24 sm:w-24">
          {imgError ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800">
              <span className="text-2xl font-bold text-zinc-500">
                {app.name.charAt(0)}
              </span>
            </div>
          ) : (
            <img
              src={app.image}
              alt={app.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Title & Description */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          <h3 className="truncate text-base font-semibold text-zinc-100 transition-colors group-hover:text-white sm:text-lg">
            {app.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {app.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Metadata */}
      <div className="flex flex-col gap-3 border-t border-zinc-800/40 px-4 py-3">
        {/* Tags */}
        {app.tags && app.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {app.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-zinc-700/40 bg-zinc-800/30 px-2 py-0.5 text-[10px] text-zinc-400 transition-colors group-hover:border-zinc-600/50 group-hover:text-zinc-300 sm:text-xs"
              >
                {tag}
              </span>
            ))}
            {app.tags.length > 5 && (
              <span className="rounded-md border border-zinc-700/40 bg-zinc-800/30 px-2 py-0.5 text-[10px] text-zinc-500 sm:text-xs">
                +{app.tags.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Footer: Date & Open Link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <BsCalendarDate className="h-3 w-3" />
            <span>{app.createdDate}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors group-hover:text-zinc-300">
            <IoOpenOutline className="h-3.5 w-3.5" />
            <span>Open App</span>
          </div>
        </div>
      </div>
    </Link>
  );
}