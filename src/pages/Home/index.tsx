import MaxWidthContainer from "@/components/MaxWidthContainer";
import { lazy, Suspense } from "react";
import ScrollReveal from "@/components/ScrollReveal";
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
import VisitorCounter from "@/components/VisitorCounter";
import Footer from "../../components/Footer";
import { ShootingStars } from "@/components/ui/shooting-stars";
import useSEO from "@/hooks/useSEO";

// Chatbot is heavy (ReactMarkdown + remarkGfm) — lazy-load it
const Chatbot = lazy(() => import("@/components/Chatbot"));

export default function Home() {
  useSEO({ path: "/" });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <ShootingStars />
      
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>

      <div className="h-[120px]" />

      <MaxWidthContainer>
        <ScrollReveal direction="up" distance={50} duration={0.7} scale={0.98}>
          <div id="intro-section">
            <Intro />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="left" distance={40}>
          <div id="bio-section">
            <Bio />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="right" distance={40}>
          <div id="spotify-now-playing-section">
            <SpotifyNowPlaying />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="up">
          <div id="github-heatmap-section">
            <GithubHeatmap />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="up">
          <div id="tech-stack-section">
            <TechStack />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="up" delay={0.1}>
          <div id="featured-projects-section">
            <FeaturedProjects />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="up">
          <div id="experience-section">
            <Experience />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="up">
          <div id="certificates-section">
            <FeaturedCertificates />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="up" distance={50} scale={0.97}>
          <div id="contact-section">
            <Contact />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="none" duration={0.8}>
          <div id="quote-section">
            <Quote />
          </div>
        </ScrollReveal>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <ScrollReveal direction="up" distance={20} duration={0.5}>
          <div className="flex justify-center">
            <VisitorCounter />
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
