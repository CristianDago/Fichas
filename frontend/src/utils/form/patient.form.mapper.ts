import { PatientData } from "../../interface/patient/patient.interface.props";

export const mapPatientToFormData = (
  data: PatientData,
  // --- ¡AÑADE ESTE PARÁMETRO CON SU TIPO! ---
  isUpdate: boolean = false // Establece un valor por defecto si se llama sin él
  // --- FIN DEL CAMBIO ---
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // Manejo de document1
    if (key === "document1") {
      if (value instanceof File) {
        formData.append("document1", value);
      } else if (value === null && isUpdate) { // Solo si es una actualización y el valor es null
        formData.append("document1_delete", "true");
      } else if (typeof value === 'string' && value !== '') { // Si es una URL de un archivo existente
        formData.append("document1_existing", value);
      }
      return;
    }

    // Manejo de document2
    if (key === "document2") {
      if (value instanceof File) {
        formData.append("document2", value);
      } else if (value === null && isUpdate) { // Solo si es una actualización y el valor es null
        formData.append("document2_delete", "true");
      } else if (typeof value === 'string' && value !== '') { // Si es una URL de un archivo existente
        formData.append("document2_existing", value);
      }
      return;
    }

    if (key === "document3") {
      // Asegurarse de que document3Value sea siempre un array o null
      const document3Value = value === null || value === undefined ? [] : value;
      const safeArray = Array.isArray(document3Value)
        ? document3Value
        : []; // Si no es un array, se inicializa como vacío

      const newFiles = safeArray.filter(
        (item) => item instanceof File
      ) as File[];
      const existingUrls = safeArray.filter(
        (item) => typeof item === "string" && item !== ""
      ) as string[];

      // Añadir archivos nuevos
      newFiles.forEach((file) => {
        formData.append("document3", file);
      });

      // Añadir URLs de archivos existentes
      existingUrls.forEach((url) => {
        formData.append("existingDocument3[]", url);
      });

      // Lógica para marcar eliminación total de document3 solo si no hay nuevos archivos
      // y no hay archivos existentes Y estamos en modo actualización.
      if (isUpdate && newFiles.length === 0 && existingUrls.length === 0) {
        formData.append("document3_delete", "true");
      }
      
      return;
    }

    // Manejo de otros campos
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof File) && // Asegurarse de que no sea un objeto File
      !Array.isArray(value) // Asegurarse de que no sea un array (ya sea de File o string)
    ) {
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === "string" || typeof value === "number") {
      formData.append(key, String(value));
    } else if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
    }
    // No necesitamos un 'else if (Array.isArray(value))' aquí porque los arrays de documentos
    // (document3) ya se manejan arriba. Si tuvieras otros arrays, los manejarías aquí.
  });

  console.log("📦 FormData generado:");
  for (const [key, val] of formData.entries()) {
    console.log(`${key}:`, val);
  }

  return formData;
};