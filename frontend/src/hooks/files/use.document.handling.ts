// src/hooks/files/use.document.handling.ts
import { useCallback } from "react";
import {
  UseDocumentHandlingHookProps,
  UseDocumentHandlingHookResult,
} from "../../interface/hooks/document.handling.props";

export function useDocumentHandling<T>({
  onChange, // Este onChange es la prop que recibe del formulario padre
  formValues,
}: UseDocumentHandlingHookProps<T>): UseDocumentHandlingHookResult<T> {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      if (!name || !files) return;

      const isMultiple = name === "document3";
      const newValue = isMultiple ? Array.from(files) : files[0];

      // Siempre llama al onChange del padre con un objeto { name, value }
      onChange({ name: name as keyof T, value: newValue });
    },
    [onChange]
  );

  const handleDeleteFile = useCallback(
    (fieldName: keyof T, index?: number) => {
      const currentValue = formValues[fieldName];

      if (Array.isArray(currentValue) && typeof index === "number") {
        const updated = [...currentValue];
        updated.splice(index, 1);
        onChange({ name: fieldName, value: updated.length ? updated : [] });
      } else {
        onChange({ name: fieldName, value: null });
      }
    },
    [formValues, onChange]
  );

  const getLabelForField = (fieldName: keyof T): string => {
    const labels: Record<string, string> = {
      document1: "Documento 1",
      document2: "Documento 2",
      document3: "Documento 3",
    };
    return labels[fieldName as string] || (fieldName as string);
  };

  return {
    handleFileChange,
    handleDeleteFile,
    getLabelForField,
  };
}