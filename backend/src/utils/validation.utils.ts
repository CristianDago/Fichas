import { HttpError } from "./http.error.util"; // Asegúrate de que la ruta sea correcta

/**
 * Valida si un campo tiene un valor. Si no, lanza un HttpError.
 * @param field El valor del campo a validar.
 * @param fieldName El nombre del campo para el mensaje de error (ej. "El nombre").
 * @param errorCode El código de estado HTTP para el error (por defecto 400).
 */
export const validateField = (field: any, fieldName: string, errorCode: number = 400): void => {
  if (field === null || field === undefined || (typeof field === 'string' && field.trim() === '')) {
    throw new HttpError(`${fieldName} es obligatorio`, errorCode);
  }
};