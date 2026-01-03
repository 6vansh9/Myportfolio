import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function RickRoll() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Delete Website</Button>
        </DialogTrigger>
        <DialogContent className="border-none bg-transparent shadow-none p-0">
          <div className="font-inter relative p-4 sm:p-6 rounded-xl bg-zinc-900/25 backdrop-blur-lg border border-zinc-800/50 shadow-[0_4px_32px_0_rgba(24,24,27,0.25)] overflow-hidden transition-all duration-300 group">
            {/* Animated modern reflection */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10">
              <div
                className="absolute left-0 top-0 w-2/3 h-1/3 rounded-t-full bg-gradient-to-br from-red-500/40 via-red-500/10 to-transparent blur-lg animate-card-reflection"
                style={{
                  filter: "blur(6px)",
                  opacity: 0.18,
                }}
              />
            </div>
            <div className="relative flex flex-col gap-4 z-20">
              <DialogHeader>
                <DialogTitle className="text-lg text-zinc-100">
                  Delete Website
                </DialogTitle>
              </DialogHeader>
              <p className="text-sm text-zinc-400">
                If you've decided to delete this website, there is no going back. Please be
                certain.
              </p>
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank", "noopener,noreferrer")}
                >
                  Delete this website
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
