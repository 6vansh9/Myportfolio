import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import PageRoutes from "@/pages/PageRoutes";
import SplashScreen from "@/components/SplashScreen";
import StarfieldBackground from "@/components/StarfieldBackground";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        {loading && <SplashScreen />}
        {!loading && (
          <>
            <StarfieldBackground />
            <PageRoutes />
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}
