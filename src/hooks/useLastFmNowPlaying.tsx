import { useState, useEffect } from 'react';
import metadata from '@/content/metadata.json';

export interface LastFmTrack {
  title: string;
  artist: string;
  album: string;
  image_url: string;
  url: string;
  is_playing: boolean;
}

const settings = (metadata.settings as Record<string, unknown>)?.lastFmNowPlaying as
  | { enabled: boolean; username: string; apiKey: string }
  | undefined;

const fetchLastPlayed = async (): Promise<LastFmTrack | null> => {
  if (!settings?.username || !settings?.apiKey) {
    console.log('[LastFm] Missing settings:', settings);
    return null;
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${settings.username}&api_key=${settings.apiKey}&format=json&limit=1`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('[LastFm] HTTP error:', res.status);
      return null;
    }

    const data = await res.json();
    const tracks = data?.recenttracks?.track;

    if (!tracks) {
      console.warn('[LastFm] No tracks in response');
      return null;
    }

    // Last.fm returns an object (not array) when there is exactly one track
    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    if (!track) return null;

    const isPlaying = track['@attr']?.nowplaying === 'true';

    const images: { '#text': string; size: string }[] = track.image || [];
    const rawImageUrl =
      images.find((i) => i.size === 'extralarge')?.['#text'] ||
      images.find((i) => i.size === 'large')?.['#text'] ||
      '';

    // Filter out Last.fm's blank placeholder hash
    const image_url =
      rawImageUrl && !rawImageUrl.includes('2a96cbd8b46e442fc41c2b86b821562f')
        ? rawImageUrl
        : '';

    const result: LastFmTrack = {
      title: track.name || 'Unknown Track',
      artist: track.artist?.['#text'] || 'Unknown Artist',
      album: track.album?.['#text'] || '',
      image_url,
      url: track.url || `https://www.last.fm/user/${settings.username}`,
      is_playing: isPlaying,
    };

    console.log('[LastFm] Track:', result.title, '-', result.artist);
    return result;
  } catch (err) {
    console.error('[LastFm] Fetch error:', err);
    return null;
  }
};

export const useLastFmNowPlaying = (refreshInterval = 60000) => {
  const [track, setTrack] = useState<LastFmTrack | null>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

    const run = async () => {
      const result = await fetchLastPlayed();
      if (!cancelled && result) {
        setTrack(result);
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (intervalId) clearInterval(intervalId);
      } else {
        cancelled = false;
        run();
        intervalId = setInterval(run, refreshInterval);
      }
    };

    run();
    intervalId = setInterval(run, refreshInterval);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [refreshInterval]);

  return { track };
};
