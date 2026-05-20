import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { lazy, Suspense } from "react";
import Home from "./Home";
import ScrollProgress from "@/components/ScrollProgress";
import metadata from "@/content/metadata.json";

// Lazy-load non-home routes — only the Home page is in the critical path
const About = lazy(() => import("./About"));
const Blogs = lazy(() => import("./Blogs"));
const Apps = lazy(() => import("./Apps"));
const NotFound = lazy(() => import("./NotFound"));

const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(4px)",
  },
};

const pageTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

export default function PageRoutes() {
  const location = useLocation();
  
  // Check if blogs section is enabled
  const isBlogsEnabled = metadata.settings?.blogs?.enabled !== false;

  return (
    <>
      <ScrollProgress />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="w-full"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Suspense fallback={null}><About /></Suspense>} />
            <Route 
              path="/blogs" 
              element={isBlogsEnabled ? <Suspense fallback={null}><Blogs /></Suspense> : <Navigate to="/" replace />} 
            />
            <Route path="/apps/*" element={<Suspense fallback={null}><Apps /></Suspense>} />
            <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}