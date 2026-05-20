import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState, useCallback, useRef } from "react";
import { Analytics } from '@vercel/analytics/react';
import Header from "@/components/Header";
import PageRoutes from "@/pages/PageRoutes";
import SplashScreen from "@/components/SplashScreen";
import StarfieldBackground from "@/components/StarfieldBackground";
import CanvasCursor from "@/components/CanvasCursor";
import Aurora from "@/components/Aurora";
import metadata from "@/content/metadata.json";

// Eagerly pre-import lazy route chunks so they're cached in the module system
// before the splash finishes — prevents the second loading delay
function preloadRouteChunks(): Promise<void> {
  return Promise.all([
    import("./About"),
    import("./Blogs"),
    import("./Apps"),
    import("./NotFound"),
  ])
    .then(() => {})
    .catch(() => {});
}

// Critical images to preload during splash (above-the-fold + key UI + projects)
const PRELOAD_IMAGES = [
  "/assets/me.png",
  "/assets/icons/ai-icon.svg",
  "/assets/avatar.jpg",
  "/assets/company-logos/siemens.jpeg",
  "/assets/company-logos/grig.jpeg",
  "/assets/company-logos/e4a.jpeg",
  "/assets/company-logos/brandcontext.jpeg",
  "/assets/company-logos/golain.jpeg",
  // Project images
  ...((metadata.home?.featuredProjects || []) as Array<{ image?: string }>)
    .map((p) => p.image)
    .filter(Boolean) as string[],
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

// Preload Live2D widget script + model assets so they're cached for the About page
function preloadLive2D(): Promise<void> {
  const live2dSettings = metadata.settings?.live2dCharacter;
  if (!live2dSettings || live2dSettings.enabled === false) return Promise.resolve();

  const modelBase = (live2dSettings.modelJsonPath || "").replace(/\/[^/]+$/, "");

  // Prefetch the script, model JSON, moc, and texture in parallel
  const urls = [
    "https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js",
    live2dSettings.modelJsonPath,
    `${modelBase}/model.moc`,
    `${modelBase}/model.1024/texture_00.png`,
  ].filter(Boolean) as string[];

  return Promise.all(
    urls.map((url) =>
      fetch(url, { mode: "cors", credentials: "omit" })
        .then(() => {})
        .catch(() => {})
    )
  ).then(() => {});
}

// Dev.to username from settings
const DEV_TO_USERNAME = metadata.settings?.blogs?.devToUsername || "username";

// Prefetch blog articles + their cover images so the Blogs page loads instantly
function preloadBlogArticles(): Promise<void> {
  const isDev = import.meta.env.DEV;
  const url = isDev
    ? `https://dev.to/api/articles?username=${DEV_TO_USERNAME}`
    : `/api/devto-articles?username=${DEV_TO_USERNAME}`;

  return fetch(url)
    .then((res) => (res.ok ? res.json() : []))
    .then((articles: Array<{ cover_image?: string; social_image?: string }>) => {
      // Preload cover images in parallel
      const imageUrls = articles
        .map((a) => a.cover_image || a.social_image)
        .filter(Boolean) as string[];
      return Promise.all(imageUrls.map(preloadImage));
    })
    .then(() => {})
    .catch(() => {});
}

// Staged progress that takes ~5.5s minimum — progress caps at 90% until
// real work finishes, ensuring the splash never exits before content is ready
function createStagedProgress(onProgress: (pct: number) => void) {
  const stages = [
    { weight: 6, delay: 400 },   // Boot
    { weight: 7, delay: 500 },   // Fonts loading
    { weight: 8, delay: 500 },   // Images start
    { weight: 9, delay: 550 },   // Images loading
    { weight: 9, delay: 500 },   // More images
    { weight: 8, delay: 450 },   // Blog articles
    { weight: 9, delay: 500 },   // Live2D assets
    { weight: 7, delay: 450 },   // API warm-up
    { weight: 7, delay: 400 },   // Compiling
    { weight: 7, delay: 400 },   // Building UI
    { weight: 6, delay: 400 },   // Final polish
    { weight: 7, delay: 500 },   // Ready
  ];
  // Total delay: ~5550ms, total weight: 90 → caps at 90%

  let accumulated = 0;
  let resolve: () => void;
  const promise = new Promise<void>((r) => { resolve = r; });
  let i = 0;

  function next() {
    if (i >= stages.length) {
      onProgress(100);
      resolve();
      return;
    }
    const stage = stages[i];
    i++;
    setTimeout(() => {
      accumulated += stage.weight;
      onProgress(Math.min(accumulated, 99));
      next();
    }, stage.delay);
  }

  next();
  return promise;
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [splashDone, setSplashDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // Run real preloading and staged animation in parallel
    const realWork = Promise.all([
      ...PRELOAD_IMAGES.map(preloadImage),
      preloadLive2D(),
      preloadBlogArticles(),
      preloadRouteChunks(),
      document.fonts.ready,
    ]);

    const stagedAnimation = createStagedProgress(setProgress);

    // Both must complete before hitting 100%
    Promise.all([realWork, stagedAnimation]).then(() => {
      setProgress(100);
    });
  }, []);

  const handleExitComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          {/* Splash overlay — sits on top of content with z-[9999] */}
          {!splashDone && (
            <SplashScreen progress={progress} onExitComplete={handleExitComplete} />
          )}

          {/* Main app content — always mounted so everything pre-renders behind splash */}
          <div
            style={{
              opacity: splashDone ? 1 : 0,
              transition: splashDone ? "opacity 0.3s ease-in" : "none",
              visibility: splashDone ? "visible" : "hidden",
            }}
          >
            <Aurora
              colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
              blend={1.0}
              amplitude={0.8}
              speed={0.9}
            />
            <CanvasCursor />
            <StarfieldBackground />
            <Header />
            <PageRoutes />
          </div>
        </BrowserRouter>
      </ThemeProvider>

      <Analytics />
    </div>
  );
}
