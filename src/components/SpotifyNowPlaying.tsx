import { useLastFmNowPlaying, type LastFmTrack } from "@/hooks/useLastFmNowPlaying";
import metadata from "@/content/metadata.json";

const lastFmSettings = (metadata.settings as Record<string, unknown>)?.lastFmNowPlaying as
  | { enabled: boolean; username: string; apiKey: string }
  | undefined;

// Apple Music-style pink/red accent
const ACCENT = "#fc3c44";

// Shown when the API returns nothing (empty scrobble history)
const FALLBACK_TRACK: LastFmTrack = {
  title: "Blinding Lights",
  artist: "The Weeknd",
  album: "After Hours",
  image_url: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  url: "https://www.last.fm/user/vanshaggarwal69",
  is_playing: false,
};

export default function SpotifyNowPlaying() {
  // Hook must always be called — no early returns before this line
  const { track, loading } = useLastFmNowPlaying();

  // Disabled in config → hide
  if (lastFmSettings?.enabled === false) return null;

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

  // Fall back to placeholder if API returned nothing
  const displayTrack = track ?? FALLBACK_TRACK;
  const label = displayTrack.is_playing ? "Now Playing" : "Last Played";
  const profileUrl = `https://www.last.fm/user/${lastFmSettings?.username ?? "vanshaggarwal69"}`;

  return (
    <a
      href={displayTrack.url || profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-3 backdrop-blur-xl transition-all duration-300 hover:border-zinc-700/35 hover:bg-zinc-900/35 sm:p-4"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Album Art */}
        <div className="relative shrink-0">
          {displayTrack.image_url ? (
            <img
              className="h-12 w-12 rounded-lg object-cover ring-1 ring-white/5 sm:h-14 sm:w-14"
              src={displayTrack.image_url}
              alt={displayTrack.title}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 ring-1 ring-white/5 sm:h-14 sm:w-14">
              <MusicIcon size={24} color={ACCENT} />
            </div>
          )}

          {/* Animated equalizer bars when currently playing */}
          {displayTrack.is_playing && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20">
              <div className="flex h-4 items-end gap-0.5">
                {[0, 0.1, 0.2].map((delay) => (
                  <span
                    key={delay}
                    className="animate-equalizer w-1 rounded-full"
                    style={{ animationDelay: `${delay}s`, backgroundColor: ACCENT }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          {/* Label row */}
          <div className="flex h-3.5 items-center gap-1.5">
            <MusicIcon size={12} color={ACCENT} />
            <span
              className="text-[9px] font-semibold tracking-wider uppercase md:text-[10px]"
              style={{ color: ACCENT }}
            >
              {label}
            </span>
          </div>

          {/* Track name */}
          <p className="truncate text-xs leading-[1.1] font-semibold text-zinc-100 group-hover:underline sm:text-sm">
            {displayTrack.title}
          </p>

          {/* Artist · Album */}
          <p className="truncate text-[10px] leading-tight text-zinc-400 sm:text-xs">
            {displayTrack.artist}
            {displayTrack.album ? ` · ${displayTrack.album}` : ""}
          </p>
        </div>

        {/* Last.fm icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-md transition-all duration-200 group-hover:scale-105 group-hover:text-zinc-100 sm:h-9 sm:w-9">
          <LastFmIcon size={18} />
        </div>
      </div>
    </a>
  );
}

/* ── Inline SVG icons ─────────────────────────────────────── */

function MusicIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
    </svg>
  );
}

function LastFmIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.584 17.21l-.88-2.392s-1.43 1.596-3.573 1.596c-1.896 0-3.244-1.648-3.244-4.284 0-3.376 1.7-4.59 3.38-4.59 2.42 0 3.19 1.567 3.85 3.59l.877 2.74c.877 2.67 2.53 4.81 7.298 4.81 3.41 0 5.72-1.047 5.72-3.81 0-2.228-1.272-3.38-3.63-3.928l-1.757-.385c-1.21-.275-1.567-.77-1.567-1.595 0-.935.742-1.485 1.954-1.485 1.322 0 2.035.495 2.145 1.68l2.75-.33c-.22-2.475-1.926-3.49-4.73-3.49-2.476 0-4.84.935-4.84 3.93 0 1.87.907 3.05 3.19 3.6l1.87.44c1.375.33 1.87.88 1.87 1.76 0 1.047-.99 1.486-2.86 1.486-2.77 0-3.926-1.457-4.59-3.46l-.9-2.75C12.18 7.47 10.48 5.53 6.94 5.53 3.046 5.53.83 7.98.83 12.24c0 4.1 2.09 6.38 5.94 6.38 3.08 0 3.814-1.41 3.814-1.41z" />
    </svg>
  );
}
