import MaxWidthContainer from "@/components/MaxWidthContainer";
import Intro from "./Intro";
import Bio from "./Bio";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import GithubHeatmap from "./GithubHeatmap";
import TechStack from "./TechStack";
import FeaturedProjects from "./FeaturedProjects";
import FeaturedCertificates from "./FeaturedCertificates";
import Experience from "./Experience";
import Contact from "./Contact";
import Quote from "./Quote";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <div className="h-[120px]" />

      <MaxWidthContainer>
        <div id="intro-section">
          <Intro />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="bio-section">
          <Bio />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="spotify-now-playing-section">
          <SpotifyNowPlaying />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="github-heatmap-section">
          <GithubHeatmap />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="tech-stack-section">
          <TechStack />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="featured-projects-section">
          <FeaturedProjects />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="experience-section">
          <Experience />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="certificates-section">
          <FeaturedCertificates />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="contact-section">
          <Contact />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <div id="quote-section">
          <Quote />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <Footer />
      </MaxWidthContainer> 
    </div>
  );
}
