export default function SpotifyPlaylist() {
  return (
    <div className="flex w-full items-center justify-center backdrop-blur-lg">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px", opacity: 0.9 }}
        src="https://open.spotify.com/embed/playlist/4GwBHykYDpARfWFjYPzF5Q?utm_source=generator&theme=0"
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
