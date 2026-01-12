import { useState } from "react";

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

export default function AppCardCompact({ app }: { app: App }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-300 hover:bg-zinc-800/40 sm:gap-3 sm:p-4"
    >
      {/* App Icon */}
      <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-zinc-700/40 bg-zinc-800/50 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl sm:h-16 sm:w-16 md:h-20 md:w-20">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800">
            <span className="text-xl font-bold text-zinc-500 sm:text-2xl">
              {app.name.charAt(0)}
            </span>
          </div>
        ) : (
          <img
            src={app.image}
            alt={app.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* App Name */}
      <span className="w-full text-center text-[10px] leading-tight text-zinc-400 transition-colors group-hover:text-zinc-200 sm:text-xs">
        <span className="line-clamp-2">{app.name}</span>
      </span>
    </a>
  );
}