import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";
import PageRoutes from "@/pages/PageRoutes";
import SplashScreen from "@/components/SplashScreen";
import StarfieldBackground from "@/components/StarfieldBackground";
import CanvasCursor from "@/components/CanvasCursor";
import Aurora from "@/components/Aurora";

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
          <Aurora
              colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
              blend={1.0}
              amplitude={0.8}
              speed={0.9}
            />
            <Header />
            <CanvasCursor />
            <StarfieldBackground />
            <PageRoutes />
            <Chatbot />
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}
