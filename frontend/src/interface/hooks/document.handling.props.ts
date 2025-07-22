// src/interface/hooks/document.handling.props.ts

import React from "react";

export interface UseDocumentHandlingHookProps<T> {
  formValues: T;
  onChange: (args: { name: keyof T; value: File | File[] | null | string }) => void;
}

export interface UseDocumentHandlingHookResult<T> {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteFile: (fieldName: keyof T, index?: number) => void;
  getLabelForField: (fieldName: keyof T) => string; // <-- ¡Añadir esta línea!
}