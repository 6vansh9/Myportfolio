import MaxWidthContainer from "@/components/MaxWidthContainer";
import ScrollReveal from "@/components/ScrollReveal";
import BlogsContent from "./BlogsContent";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";

export default function Blogs() {
  useSEO({
    title: "Blog",
    description: "Technical articles and insights by Vansh Aggarwal on Front-End Development, React, JavaScript, HTML/CSS, and building user-centric web applications.",
    path: "/blogs",
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <div className="h-[120px]" />

      <MaxWidthContainer>
        <ScrollReveal direction="up" distance={50} duration={0.7}>
          <BlogsContent />
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