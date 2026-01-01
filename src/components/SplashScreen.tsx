export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-start">
      <div className="w-1/2 h-full flex items-center justify-center">
        <img
          src="/assets/nyan-cat.gif"
          alt="Loading..."
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}