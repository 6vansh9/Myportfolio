import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import StarfieldBackground from "@/components/StarfieldBackground";
import Home from "./Home";
import About from "./About";
import Apps from "./Apps";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g., wait for starfield or assets)
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        {loading && <SplashScreen />}
        {!loading && (
          <>
            <StarfieldBackground />

            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/about" element={<About />} />

              <Route path="/apps" element={<Apps />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}
