import type { ReactNode, HTMLAttributes } from "react";

export default interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;

  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";

  gap?: string;
  rows?: string;
  columns?: number;
}
