import type { ReactNode } from "react";

export interface FormSectionProps {
  title: string;
  gridClassName?: string;
  children: ReactNode;
  sectionCssClass?: string;
}
