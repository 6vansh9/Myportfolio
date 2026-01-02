import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";
import PageRoutes from "@/pages/PageRoutes";
import SplashScreen from "@/components/SplashScreen";
import StarfieldBackground from "@/components/StarfieldBackground";
import CanvasCursor from "@/components/CanvasCursor";

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
