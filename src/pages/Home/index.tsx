import MaxWidthContainer from "@/components/MaxWidthContainer";
import Intro from "./Intro";
import Bio from "./Bio";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import GithubHeatmap from "./GithubHeatmap";
import TechStack from "./TechStack";
import FeaturedProjects from "./FeaturedProjects";
import Experience from "./Experience";
import Contact from "./Contact";
import Quote from "./Quote";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <div className="h-[120px]" />

      <MaxWidthContainer>
        <Intro />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <Bio />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <SpotifyNowPlaying />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <GithubHeatmap />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <TechStack />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <FeaturedProjects />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <Experience />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <Contact />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <Quote />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <Footer />
      </MaxWidthContainer> 
    </div>
  );
}
