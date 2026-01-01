import type { MaxWidthContainerProps } from "../interfaces";

export default function MaxWidthContainer({
  children,
  height,
}: MaxWidthContainerProps) {
  return (
    <div
      className="max-w-3xl h-full w-full px-2.5 sm:px-3 md:px-6 lg:px-0"
      style={{ height }}
    >
      {children}
    </div>
  );
}