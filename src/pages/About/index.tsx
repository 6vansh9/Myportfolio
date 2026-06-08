import MaxWidthContainer from "@/components/MaxWidthContainer";
import MarkdownViewer from "@/components/MarkdownViewer";
import ScrollReveal from "@/components/ScrollReveal";
import aboutContent from "@/content/about.md?raw";
import SpotifyPlaylist from "./SpotifyPlaylist";
import RickRoll from "./RickRoll";
import Footer from "@/components/Footer";
import Live2DCharacter from "./Live2DCharacter";
import { Meteors } from "@/components/ui/meteors";
import useSEO from "@/hooks/useSEO";


export default function About() {
  useSEO({
    title: "About",
    description: "Learn about Vansh Aggarwal, his journey from curious web explorer to Front-End Web Developer. B.Tech CSE student at Manipal University Jaipur building scalable, user-centric web applications with React and JavaScript.",
    path: "/about",
    type: "profile",
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      {/* Live2D Character - Only renders on About page */}
      <Live2DCharacter />
      <Meteors />

      <div className="h-[120px]" />

      <MaxWidthContainer>
          <div className="mb-4 flex flex-col">
            {/* Page Title */}
            <div className="flex flex-col gap-2">
              <h1 className="mb-4 text-xs tracking-widest text-zinc-300 uppercase transition-colors hover:text-white">
                About Vansh Aggarwal
              </h1>
            </div>

            {/* Markdown Viewer */}
            <MarkdownViewer content={aboutContent} filename="about.md" />
          </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="left" distance={40}>
          <div id="spotify-playlist-section">
            <SpotifyPlaylist />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="up">
          <div className="w-full rounded-2xl border border-red-700/50 bg-gradient-to-br from-red-900/20 via-zinc-900/10 to-red-900/5 p-8 flex flex-col items-center gap-5 backdrop-blur-lg">
          <div className="flex items-center gap-2">
            <svg
              width={20}
              height={20}
              className="text-red-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>
            <p className="text-base font-bold tracking-wider text-red-400 uppercase">
              Danger Zone
            </p>
          </div>
          <p className="text-sm text-red-300 text-center max-w-md">
            Actions in this area are irreversible. Proceed with caution.
          </p>
          <RickRoll />
        </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="up" distance={20} duration={0.5}>
          <Footer />
        </ScrollReveal>
      </MaxWidthContainer>
    </div>
  );
}
