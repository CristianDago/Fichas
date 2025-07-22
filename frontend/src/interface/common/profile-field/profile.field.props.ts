import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ProfileFieldProps {
  icon?: IconDefinition;
  label: string;
  value: string | number | null | undefined;
}
