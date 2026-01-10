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
      <div className="w-1/2 h-full flex items-center justify-center">
        <img
          src={gif}
          alt={alt}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}