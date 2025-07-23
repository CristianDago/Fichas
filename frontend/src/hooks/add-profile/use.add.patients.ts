// src/hooks/forms/use.add.patients.ts

import { useState, useCallback } from "react";
import { addPatient } from "../../utils/api/fetch.patient";
import { initialPatientData } from "../../constants/patient/patient.initial.state";
import { mapPatientToFormData } from "../../utils/form/patient.form.mapper";
import { updateNested } from "../../utils/form/form.utils";
import type { PatientData } from "../../interface/patient/patient.interface.props";

interface UseAddPatientReturn {
  patientData: PatientData;
  setPatientData: React.Dispatch<React.SetStateAction<PatientData>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleFileChange: ({
    name,
    value,
  }: {
    name: keyof PatientData;
    value: File | File[] | string | string[] | null;
  }) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  successMessage: string | null;
  errorMessage: string | null;
  formKey: number;
}

export const useAddPatient = (token: string | null): UseAddPatientReturn => {
  const [patientData, setPatientData] =
    useState<PatientData>(initialPatientData);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      const path = name.split(".");

      const parsedValue =
        type === "number" && value === ""
          ? undefined
          : type === "number"
          ? Number(value)
          : value;

      if (type === "checkbox") {
        setPatientData((prevData) =>
          updateNested(prevData, path, (e.target as HTMLInputElement).checked)
        );
        return;
      }

      setPatientData((prevData) => {
        const sectionName = path.length > 1 ? path[0] : null;

        if (
          sectionName &&
          typeof prevData[sectionName as keyof PatientData] === "object" &&
          prevData[sectionName as keyof PatientData] !== null &&
          !Array.isArray(prevData[sectionName as keyof PatientData])
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

  const handleFileChange = useCallback(
    ({
      name,
      value,
    }: {
      name: keyof PatientData;
      value: File | File[] | string | string[] | null;
    }) => {
      setPatientData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!token) {
        console.error("⛔ Token no presente.");
        setErrorMessage("Error de autenticación. Por favor inicia sesión.");
        return;
      }

      const formData = mapPatientToFormData(patientData);

      try {
        await addPatient(formData, token);
        setSuccessMessage("Ficha creada correctamente.");
        setErrorMessage(null);
        setPatientData(initialPatientData);
        setFormKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error("🚨 Error al enviar paciente:", error);
        setSuccessMessage(null);
        setErrorMessage("Error al crear la ficha.");
      }
    },
    [patientData, token]
  );

  return {
    patientData,
    setPatientData,
    handleChange,
    handleFileChange,
    handleSubmit,
    successMessage,
    errorMessage,
    formKey,
  };
};
