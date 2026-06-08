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
    console.log('[LastFm] Missing username or apiKey in settings:', settings);
    return null;
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${settings.username}&api_key=${settings.apiKey}&format=json&limit=1`;
  console.log('[LastFm] Fetching:', url);

  try {
    const res = await fetch(url);
    console.log('[LastFm] Response status:', res.status);

    if (!res.ok) {
      console.error('[LastFm] HTTP error:', res.status);
      return null;
    }

    const data = await res.json();
    console.log('[LastFm] Raw response:', JSON.stringify(data, null, 2));

    const tracks = data?.recenttracks?.track;
    console.log('[LastFm] tracks value:', tracks, '| type:', typeof tracks, '| isArray:', Array.isArray(tracks));

    if (!tracks) {
      console.warn('[LastFm] No tracks field in response');
      return null;
    }

    // When there is exactly one track, Last.fm returns an object instead of an array
    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    console.log('[LastFm] Resolved track:', track);

    const isPlaying = track['@attr']?.nowplaying === 'true';

    const images: { '#text': string; size: string }[] = track.image || [];
    const imageUrl =
      images.find((i) => i.size === 'extralarge')?.['#text'] ||
      images.find((i) => i.size === 'large')?.['#text'] ||
      '';

    // Last.fm sometimes returns a blank image URL string
    const cleanImageUrl = imageUrl && !imageUrl.includes('2a96cbd8b46e442fc41c2b86b821562f')
      ? imageUrl
      : '';

    const result: LastFmTrack = {
      title: track.name || 'Unknown Track',
      artist: track.artist?.['#text'] || 'Unknown Artist',
      album: track.album?.['#text'] || '',
      image_url: cleanImageUrl,
      url: track.url || `https://www.last.fm/user/${settings.username}`,
      is_playing: isPlaying,
    };

    console.log('[LastFm] Parsed track:', result);
    return result;
  } catch (err) {
    console.error('[LastFm] Fetch error:', err);
    return null;
  }
};

export const useLastFmNowPlaying = (refreshInterval = 60000) => {
  const [track, setTrack] = useState<LastFmTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const run = async () => {
      const result = await fetchLastPlayed();
      setTrack(result);
      setLoading(false);
    };

    const start = () => {
      run();
      intervalId = setInterval(run, refreshInterval);
    };

    const stop = () => {
      if (intervalId) clearInterval(intervalId);
    };

    const handleVisibility = () => {
      if (document.hidden) stop(); else start();
    };

    start();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [refreshInterval]);

  return { track, loading };
};
