import MaxWidthContainer from "@/components/MaxWidthContainer";

export default function Apps() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">

      <div className="h-[120px]" />

      <MaxWidthContainer>
        <p className="mb-4 text-xs tracking-widest text-zinc-300 uppercase transition-colors hover:text-white">
          Coming soon ...
        </p>
      </MaxWidthContainer>
    </div>
  );
}
