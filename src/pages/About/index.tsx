import MaxWidthContainer from "@/components/MaxWidthContainer";
import MarkdownViewer from "./MarkdownViewer";
import aboutContent from '@/content/about.md?raw';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <Header />

      <div className="h-[120px]" />

      <MaxWidthContainer>
        <div className="flex flex-col mb-4">
          {/* Page Title */}
          <div className="flex flex-col gap-2">
            <p className="mb-4 text-xs tracking-widest text-zinc-600 uppercase transition-colors hover:text-white">
              A little bit about who I am and what I do
            </p>
          </div>

          {/* Markdown Viewer */}
          <MarkdownViewer content={aboutContent} filename="about.md" />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer>
        <Footer />
      </MaxWidthContainer>
    </div>
  );
}
