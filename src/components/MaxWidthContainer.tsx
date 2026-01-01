import type { MaxWidthContainerProps } from "../interfaces";

export default function MaxWidthContainer({
  children,
  height,
}: MaxWidthContainerProps) {
  return (
    <div
      className="mx-auto h-full w-full max-w-3xl px-4 sm:px-6 md:px-6 lg:px-0"
      style={{ height }}
    >
      {children}
    </div>
  );
}