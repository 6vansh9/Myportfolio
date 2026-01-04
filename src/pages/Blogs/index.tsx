import MaxWidthContainer from "@/components/MaxWidthContainer";
import BlogsContent from "./BlogsContent";

export default function Blogs() {

  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <div className="h-[120px]" />

      <MaxWidthContainer>
        <BlogsContent />
      </MaxWidthContainer>

      <div className="h-20" />
    </div>
  );
}