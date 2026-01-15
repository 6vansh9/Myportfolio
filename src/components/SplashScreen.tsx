import metadata from "@/content/metadata.json";


export default function SplashScreen() {
  const splashSettings = metadata.settings?.splashScreen;

  // Don't render if disabled
  if (splashSettings?.enabled === false) {
    return null;
  }

  const gif = splashSettings?.gif || "/assets/nyan-cat.gif";
  const backgroundColor = splashSettings?.backgroundColor || "#000000";
  const alt = splashSettings?.alt || "Loading...";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-start"
      style={{ backgroundColor }}
    >
      <div className="flex h-full w-1/2 flex-col gap-30 items-center justify-center">
        <img
          src={gif}
          alt={alt}
          className="max-h-full max-w-full object-contain"
        />
        <div>
        </div>
      </div>
      <img
        src="/assets/star.gif"
        alt="star"
        className="fixed right-8 bottom-8"
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
}
