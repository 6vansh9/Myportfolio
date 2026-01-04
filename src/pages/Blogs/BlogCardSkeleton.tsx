export default function BlogCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-900/25 backdrop-blur-lg animate-pulse">
      <div className="aspect-[2/1] w-full bg-zinc-800/50" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 rounded-full bg-zinc-800/50" />
          <div className="h-5 w-20 rounded-full bg-zinc-800/50" />
        </div>
        <div className="h-6 w-3/4 rounded bg-zinc-800/50" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-zinc-800/50" />
          <div className="h-4 w-2/3 rounded bg-zinc-800/50" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-12 rounded-md bg-zinc-800/50" />
          <div className="h-6 w-14 rounded-md bg-zinc-800/50" />
        </div>
      </div>
    </div>
  );
}