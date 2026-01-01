import { useSpotifyNowPlaying } from "@/hooks/useSpotifyNowPlaying";

// Fallback track when nothing is playing and no recently played
const FALLBACK_TRACK = {
  is_playing: false,
  title: "Doomsday",
  artiste: "MF DOOM",
  image_url: "https://i.scdn.co/image/ab67616d0000b2736ce90ec627a0198a8efd127f",
  url: "https://open.spotify.com/track/7EQvdUJqZ2i7SWvSB2VqGA",
};

export default function SpotifyNowPlaying() {
  const { track, loading } = useSpotifyNowPlaying();

  const displayTrack = track || FALLBACK_TRACK;

  if (loading) {
    return (
      <div className="group relative w-full overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-3 backdrop-blur-xl sm:p-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-12 w-12 animate-pulse rounded-lg bg-zinc-800 sm:h-14 sm:w-14" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
            <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-24 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={displayTrack.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-3 backdrop-blur-xl transition-all duration-300 hover:border-zinc-700/35 hover:bg-zinc-900/35 sm:p-4"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Album Art */}
        <div className="relative shrink-0">
          <img
            className="h-12 w-12 rounded-lg object-cover ring-1 ring-white/5 sm:h-14 sm:w-14"
            src={displayTrack.image_url}
            alt={displayTrack.title}
          />
          {displayTrack.is_playing && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20">
              <div className="flex h-4 items-end gap-0.5">
                <span
                  className="animate-equalizer w-1 rounded-full bg-[#1DB954]"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="animate-equalizer w-1 rounded-full bg-[#1DB954]"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="animate-equalizer w-1 rounded-full bg-[#1DB954]"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex h-3.5 items-center gap-1.5 md:mb-1.5">
            <svg
              className="h-3 w-3 shrink-0 text-[#1DB954]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="text-[9px] font-medium tracking-wider text-[#1DB954] uppercase md:text-[10px] md:font-semibold">
              {displayTrack.is_playing
                ? "Now Playing"
                : track
                  ? "Last Played"
                  : "Favorite"}
            </span>
          </div>
          <p className="truncate text-xs leading-[1.1] font-semibold text-zinc-100 group-hover:underline sm:text-sm">
            {displayTrack.title}
          </p>
          <p className="truncate text-[10px] leading-tight text-zinc-400 sm:text-xs">
            {displayTrack.artiste}
          </p>
        </div>

        {/* Spotify Link Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-md transition-all duration-200 group-hover:scale-105 group-hover:text-zinc-100 sm:h-9 sm:w-9">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </div>
    </a>
  );
}
