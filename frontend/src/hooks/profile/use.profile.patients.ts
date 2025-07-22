// src/hooks/use.patient.profile.ts

import { useState, useEffect, useCallback } from "react";
import {
  fetchPatient,
  updatePatient,
  deletePatient,
} from "../../utils/api/fetch.patient";
import { toast } from "react-toastify";
import { mapPatientToFormData } from "../../utils/form/patient.form.mapper";
import { initialPatientData } from "../../constants/patient/patient.initial.state";
import { normalizePatientData } from "../../utils/patients/normalize.patient";
import { updateNested } from "../../utils/form/form.utils"; // Importar updateNested
import type { PatientData } from "../../interface/patient/patient.interface.props";

// Definir la interfaz de retorno del hook
interface UsePatientProfileReturn {
  patient: PatientData | null;
  error: string | null;
  isEditing: boolean;
  updatedData: PatientData | null;
  handleEdit: () => void;
  // Tipado específico para handleChange de inputs normales
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  // Tipado específico para handleFileChange de archivos
  handleFileChange: ({
    name,
    value,
  }: {
    name: keyof PatientData;
    value: File | File[] | string | string[] | null;
  }) => void;
  handleDeleteFile: (fieldName: keyof PatientData, index?: number) => void;
  handleSubmitEdit: (e: React.FormEvent) => Promise<void>;
  handleDelete: () => Promise<void>;
  isDeleted: boolean;
  isNotFound: boolean;
}

export const usePatientProfile = (
  id: string | undefined,
  token: string | null | undefined
): UsePatientProfileReturn => {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState<PatientData | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsNotFound(false);
      if (!id) {
        setIsNotFound(true);
        setError("ID de paciente no proporcionado.");
        return;
      }
      if (!token) {
        setError("Token de autenticación no proporcionado.");
        return;
      }
      try {
        const fetchedData: PatientData = await fetchPatient(id, token);
        const normalizedData = normalizePatientData(fetchedData);
        setPatient(normalizedData);
        setUpdatedData(normalizedData);
      } catch (err: any) {
        if (
          err.message?.includes("no se encontraron datos") ||
          err.message?.includes("404") ||
          err.message?.includes("not found") ||
          err.message?.includes("ID de paciente no es válido")
        ) {
          setIsNotFound(true);
          setError(null);
        } else {
          setError(
            err.message || "Error desconocido al cargar la ficha clínica."
          );
          setIsNotFound(false);
        }
      }
    };

    fetchData();
  }, [id, token]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    // Asegurarse de que updatedData se inicialice correctamente desde patient
    setUpdatedData(patient ? { ...patient } : initialPatientData);
  }, [patient]);

  // --- REFACTORIZACIÓN DE handleChange para inputs NORMALES ---
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      const path = name.split(".");

      setUpdatedData((prevData) => {
        if (!prevData) return { ...initialPatientData }; // Debería tener data si handleEdit fue llamado

        const parsedValue =
          type === "number" ? (value === "" ? undefined : Number(value)) : value;

        // Lógica para checkboxes
        if (type === "checkbox") {
          return updateNested(prevData, path, (e.target as HTMLInputElement).checked);
        }

        // Lógica para selects (como 'howDidYouHear', 'present', etc.)
        if (type === "select-one" || type === "select-multiple") { // type 'select' ya no existe en React.ChangeEvent
            const isOtherSelectedValue = value === "Otros"; // Esto es específico de tu lógica

            // Ejemplo para secciones con 'selected' y 'specify' (ej. howDidYouHear)
            if (path.length > 1 && path[path.length - 1] === "selected") {
                const sectionName = path[0];
                const newSection = { ...(prevData as any)[sectionName], selected: value };
                if (!isOtherSelectedValue) {
                    newSection.specify = "";
                }
                return updateNested(prevData, [sectionName], newSection);
            }
            // Ejemplo para secciones con 'present' o campos específicos de sí/no
            if (path.length > 1 && ["present", "isSmoker", "usesDrugs", "consumesAlcohol"].includes(path[path.length - 1])) {
                const sectionName = path[0];
                const fieldName = path[1];
                let section = { ...(prevData as any)[sectionName] };
                section[fieldName] = value;

                // Limpiar campos relacionados si la opción es "NO" o vacía
                if (value === "NO" || value === "") {
                    if (sectionName === "smoking") section.cigarettesPerDay = null;
                    else if (sectionName === "drugs") section.type = "";
                    else if (sectionName === "alcohol") section.quantity = "";
                    else if (sectionName === "currentMedicationUse") section.specify = "";
                    else { // Resetea otras secciones de salud si no son 'present'
                      if (section.type !== undefined) section.type = "";
                      if (section.medications !== undefined) section.medications = "";
                      if (section.dose !== undefined) section.dose = "";
                    }
                }
                return updateNested(prevData, [sectionName], section);
            }
        }
        // Para campos anidados generales o campos directos
        const sectionName = path.length > 1 ? path[0] : null;
        if (
          sectionName &&
          typeof (prevData as any)[sectionName] === "object" &&
          (prevData as any)[sectionName] !== null &&
          !Array.isArray((prevData as any)[sectionName])
        ) {
          return updateNested(prevData, path, parsedValue);
        } else {
          return {
            ...prevData,
            [name as keyof PatientData]: parsedValue,
          };
        }
      });
    },
    []
  );
  // --- FIN DE REFACTORIZACIÓN DE handleChange ---

  // --- NUEVA FUNCIÓN: handleFileChange para inputs de ARCHIVO ---
  const handleFileChange = useCallback(
    ({
      name,
      value,
    }: {
      name: keyof PatientData;
      value: File | File[] | string | string[] | null;
    }) => {
      console.log(
        `💡 usePatientProfile - handleFileChange recibido - name: ${String(
          name
        )}, value:`,
        value
      );
      setUpdatedData((prevData) => {
        if (!prevData) return { ...initialPatientData };

        const currentDocs = (prevData as any)[name];

        // Si es un campo de múltiples archivos (como document3)
        if (name === "document3" && Array.isArray(value)) {
          // Concatenar los nuevos archivos a los existentes (si los hay)
          const existingFiles = Array.isArray(currentDocs) ? currentDocs : [];
          return {
            ...prevData,
            [name]: [...existingFiles, ...value],
          };
        }
        // Para campos de un solo archivo (document1, document2) o si document3 es reemplazado
        return {
          ...prevData,
          [name]: value,
        };
      });
    },
    []
  );
  // --- FIN DE handleFileChange ---

  // --- NUEVA FUNCIÓN: handleDeleteFile para ELIMINAR ARCHIVOS ---
  const handleDeleteFile = useCallback(
    (fieldName: keyof PatientData, index?: number) => {
      setUpdatedData((prevData) => {
        if (!prevData) return { ...initialPatientData };

        const updatedPatient = { ...prevData };

        // Si es un campo de un solo archivo (document1, document2)
        if (fieldName === "document1" || fieldName === "document2") {
          updatedPatient[fieldName] = null; // <--- SOLO ESTO ES NECESARIO
          // REMUEVE LA LÍNEA: (updatedPatient as any)[`${fieldName}_delete`] = true;
        }
        // Si es un campo de múltiples archivos (document3)
        else if (fieldName === "document3") {
          const currentDocs = Array.isArray(updatedPatient.document3)
            ? updatedPatient.document3
            : [];

          if (index !== undefined && index >= 0 && index < currentDocs.length) {
            const newDocs = currentDocs.filter((_, i) => i !== index);
            updatedPatient.document3 = newDocs;
          } else {
            // Si no se especifica índice o es inválido, eliminar todos (vaciar array)
            updatedPatient.document3 = [];
          }
        }
        return updatedPatient;
      });
    },
    []
  );
  // --- FIN DE handleDeleteFile ---

  const handleSubmitEdit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!updatedData || !id || !token) {
        toast.error("Falta información para actualizar el paciente.", {
          position: "top-right",
        });
        return;
      }

      console.log("🧪 DEBUG antes de FormData (Update):");
      console.log(
        "🧪 updatedData.document1:",
        updatedData.document1,
        updatedData.document1 instanceof File
      );
      console.log(
        "🧪 updatedData.document2:",
        updatedData.document2,
        updatedData.document2 instanceof File
      );
      console.log("🧪 updatedData.document3:", updatedData.document3);
      if (Array.isArray(updatedData.document3)) {
        console.log(
          "🧪 updatedData.document3 es Array. Es File[]?",
          updatedData.document3.every((f) => f instanceof File)
        );
        if (updatedData.document3.length > 0) {
          console.log(
            "🧪 updatedData.document3[0] es File?",
            updatedData.document3[0] instanceof File
          );
        }
      }

      // mapPatientToFormData ahora debería poder manejar los tipos File/File[]
      const formData = mapPatientToFormData(updatedData, true); // true para indicar que es update

      console.log("📦 FormData generado (Update):");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File object] - ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      try {
        const data = await updatePatient(id, token, formData); // Pasa formData, no token en el medio
        const normalized = normalizePatientData(data);
        setPatient(normalized); // Actualizar el estado principal del paciente
        setUpdatedData(normalized); // Actualizar los datos del formulario de edición
        setIsEditing(false);
        toast.success("Ficha clínica actualizada con éxito", {
          position: "top-right",
        });
      } catch (error: any) {
        toast.error(
          error.message || "Error inesperado al actualizar la ficha clínica",
          {
            position: "top-right",
          }
        );
      }
    },
    [updatedData, id, token]
  );

  const handleDelete = useCallback(async () => {
    if (!id || !token) return;
    if (
      !window.confirm(
        "¿Estás seguro de eliminar esta ficha clínica? Esta acción es irreversible."
      )
    )
      return;
    try {
      await deletePatient(id, token);
      setIsDeleted(true);
      toast.success("Ficha clínica eliminada con éxito", {
        position: "top-right",
      });
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar la ficha clínica", {
        position: "top-right",
      });
    }
  }, [id, token]);

  return {
    patient,
    error,
    isEditing,
    updatedData,
    handleEdit,
    handleChange, // Para inputs normales
    handleFileChange, // Para inputs de archivo
    handleDeleteFile, // Para eliminar archivos
    handleSubmitEdit,
    handleDelete,
    isDeleted,
    isNotFound,
  };
};