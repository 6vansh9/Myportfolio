import MaxWidthContainer from "@/components/MaxWidthContainer";
import MarkdownViewer from "@/components/MarkdownViewer";
import aboutContent from "@/content/about.md?raw";
import SpotifyPlaylist from "./SpotifyPlaylist";
import RickRoll from "./RickRoll";
import Footer from "@/components/Footer";
import Live2DCharacter from "./Live2DCharacter";


export default function About() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      {/* Live2D Character - Only renders on About page */}
      <Live2DCharacter />

      <div className="h-[120px]" />

      <MaxWidthContainer>
        <div className="mb-4 flex flex-col">
          {/* Page Title */}
          <div className="flex flex-col gap-2">
            <p className="mb-4 text-xs tracking-widest text-zinc-300 uppercase transition-colors hover:text-white">
              A little bit about who I am and what I do
            </p>
          </div>

          {/* Markdown Viewer */}
          <MarkdownViewer content={aboutContent} filename="about.md" />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="spotify-playlist-section">
          <SpotifyPlaylist />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
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
      </MaxWidthContainer>

      <MaxWidthContainer>
        <Footer />
      </MaxWidthContainer>
    </div>
  );
}
