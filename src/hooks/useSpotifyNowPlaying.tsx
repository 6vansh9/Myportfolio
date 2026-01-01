import { useState, useEffect } from 'react';

interface SpotifyTrack {
  is_playing: boolean;
  title: string;
  artiste: string;
  image_url: string;
  url: string;
}

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async (): Promise<string | null> => {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return null;
  }

  const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }),
    });

    const data = await response.json();
    return data.error ? null : data.access_token;
  } catch {
    return null;
  }
};

const getCurrentlyPlaying = async (accessToken: string): Promise<SpotifyTrack | null> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });

    if (response.status === 204 || response.status > 400) return null;

    const data = await response.json();
    if (!data?.item) return null;

    return {
      is_playing: data.is_playing,
      title: data.item.name,
      artiste: data.item.artists.map((a: { name: string }) => a.name).join(', '),
      image_url: data.item.album.images[0]?.url,
      url: data.item.external_urls.spotify,
    };
  } catch {
    return null;
  }
};

const getRecentlyPlayed = async (accessToken: string): Promise<SpotifyTrack | null> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });

    if (response.status > 400) return null;

    const data = await response.json();
    if (!data?.items?.length) return null;

    const track = data.items[0].track;
    return {
      is_playing: false,
      title: track.name,
      artiste: track.artists.map((a: { name: string }) => a.name).join(', '),
      image_url: track.album.images[0]?.url,
      url: track.external_urls.spotify,
    };
  } catch {
    return null;
  }
};

export const useSpotifyNowPlaying = (refreshInterval = 30000) => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
          setError('Failed to get access token');
          setLoading(false);
          return;
        }

        const currentTrack = await getCurrentlyPlaying(accessToken) || await getRecentlyPlayed(accessToken);
        setTrack(currentTrack);
        setError(null);
      } catch {
        setError('Failed to fetch Spotify data');
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { track, loading, error };
};