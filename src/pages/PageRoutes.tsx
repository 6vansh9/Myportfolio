import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Home";
import About from "./About";
import Blogs from "./Blogs";
import Apps from "./Apps";
import NotFound from "./NotFound";
import metadata from "@/content/metadata.json";

export default function PageRoutes() {
  const location = useLocation();
  
  // Check if blogs section is enabled
  const isBlogsEnabled = metadata.settings?.blogs?.enabled !== false;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.645, 0.045, 0.355, 1],
        }}
        className="w-full"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/blogs" 
            element={isBlogsEnabled ? <Blogs /> : <Navigate to="/" replace />} 
          />
          <Route path="/apps" element={<Apps />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}