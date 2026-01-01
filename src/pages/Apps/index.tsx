import MaxWidthContainer from "@/components/MaxWidthContainer";
import Header from "@/components/Header";

export default function About() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <Header />

      <div className="h-[120px]" />

      <MaxWidthContainer>
        <p className="mb-4 text-xs tracking-widest text-zinc-600 uppercase transition-colors hover:text-white">
          Coming soon ...
        </p>
      </MaxWidthContainer>
    </div>
  );
}
