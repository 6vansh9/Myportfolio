import React, {type ReactNode} from "react";

export interface MaxWidthContainerProps {
  children: ReactNode;
  height?: React.CSSProperties["height"];
}