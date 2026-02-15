import MaxWidthContainer from "@/components/MaxWidthContainer";
import BlogsContent from "./BlogsContent";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";

export default function Blogs() {
  useSEO({
    title: "Blog",
    description: "Technical articles and insights by Gautam Vhavle on Full-Stack Development, GenAI, IoT, React, Python, and cloud-native engineering.",
    path: "/blogs",
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <div className="h-[120px]" />

      <MaxWidthContainer>
        <BlogsContent />
      </MaxWidthContainer>

      <MaxWidthContainer>
          <Footer />
      </MaxWidthContainer>
    </div>
  );
}