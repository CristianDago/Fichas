// src/interface/common/forms/form.input.props.ts

import { ChangeEvent } from "react";

// Interfaz para las opciones de select
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Tipos permitidos de input
export type FormInputType =
  | "text"
  | "number"
  | "email"
  | "tel"
  | "date"
  | "select"
  | "textarea"
  | "checkbox"
  | "file"
  | "radio"
  | "password";

// Props comunes a todos los tipos
interface BaseInputProps {
  label: string;
  name: string;
  id?: string;
  value?: string | number | boolean | File | null | string[];
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  multiple?: boolean;
  checked?: boolean;
  accept?: string;
  gridColumn?: string;
  autocomplete?: string;
  min?: number;
  max?: number;
}

// Si el type es 'file', se espera solo HTMLInputElement en onChange
export type FormInputProps =
  | (BaseInputProps & {
      type: "file";
      onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    })
  | (BaseInputProps & {
      type: Exclude<FormInputType, "file">;
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    });
