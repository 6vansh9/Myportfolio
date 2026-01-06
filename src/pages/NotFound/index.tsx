import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Button } from "@/components/ui/button";

const glitchMessages = [
  "Looks like you've ventured into the void...",
  "This page got mass deleted. Oops.",
  "Error 404: Reality not found.",
  "You broke the matrix. Congrats.",
  "This route is on vacation. Permanently.",
  "The page you seek has been mass deleted...",
  "git checkout main — trust me.",
  "Segmentation fault. Just kidding. Or am I?",
];

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % glitchMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Random glitch effect on 404
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789";
      let iterations = 0;
      const maxIterations = 10;

      const scramble = setInterval(() => {
        setGlitchText(
          "404"
            .split("")
            .map((char, index) => {
              if (iterations > index * 2) return "404"[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        iterations++;
        if (iterations > maxIterations) {
          clearInterval(scramble);
          setGlitchText("404");
          setIsGlitching(false);
        }
      }, 50);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center gap-9">
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="h-[60px]" />

        <MaxWidthContainer>
          <div className="flex flex-col items-center justify-center gap-5 py-16">
            {/* Glowing 404 Container */}
            <div className="relative">
              {/* Background glow */}
              <div
                className={`absolute inset-0 blur-3xl transition-opacity duration-300 ${
                  isGlitching ? "opacity-60" : "opacity-30"
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.4) 0%, transparent 70%)",
                }}
              />

              {/* Main 404 text */}
              <h1
                className={`relative font-mono text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none tracking-tighter select-none transition-all duration-100 ${
                  isGlitching
                    ? "text-red-500 animate-pulse"
                    : "text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-600"
                }`}
                style={{
                  textShadow: isGlitching
                    ? "0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.4)"
                    : "0 0 60px rgba(255, 255, 255, 0.1)",
                }}
              >
                {glitchText}
              </h1>

              {/* Glitch overlay lines */}
              {isGlitching && (
                <>
                  <div className="absolute top-1/4 left-0 w-full h-[2px] bg-red-500/60 animate-pulse" />
                  <div className="absolute top-2/3 left-0 w-full h-[1px] bg-cyan-500/40 animate-pulse" />
                </>
              )}
            </div>

            {/* Terminal-style message box */}
            <div className="w-full max-w-lg">
              <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-lg p-6 shadow-[0_4px_32px_0_rgba(24,24,27,0.25)]">
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs text-zinc-500 font-mono">
                    ~/page_not_found
                  </span>
                </div>

                {/* Message content */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-mono text-sm">❯</span>
                    <p
                      className="text-zinc-300 font-mono text-sm transition-all duration-500"
                      key={messageIndex}
                    >
                      {glitchMessages[messageIndex]}
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-mono text-sm">❯</span>
                    <p className="text-zinc-500 font-mono text-sm">
                      return_code: <span className="text-red-400">404</span>
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-mono text-sm">❯</span>
                    <p className="text-zinc-500 font-mono text-sm">
                      suggestion:{" "}
                      <span className="text-cyan-400">navigate_home()</span>
                    </p>
                  </div>

                  {/* Blinking cursor */}
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 font-mono text-sm">❯</span>
                    <span className="w-2 h-4 bg-zinc-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Link to="/">
                <Button
                  variant="outline"
                  className="group px-6 py-5 text-base font-mono border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50 backdrop-blur-lg transition-all duration-300"
                >
                  <span className="text-zinc-400 group-hover:text-white transition-colors">
                    cd ~
                  </span>
                  <span className="ml-2 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    // go home
                  </span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="group px-6 py-5 text-base font-mono text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30 hover:border-zinc-500 hover:backdrop-blur-lg transition-all duration-300"
              >
                <span>cd ..</span>
                <span className="ml-2 text-zinc-600 group-hover:text-zinc-500 transition-colors">
                  // go back
                </span>
              </Button>
            </div>
          </div>
        </MaxWidthContainer>
      </div>
      <Footer />
    </div>
  );
}