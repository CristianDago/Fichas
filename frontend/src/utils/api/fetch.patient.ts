import { PatientData } from "../../interface/patient/patient.interface.props";

// Función para agregar un paciente
export const addPatient = async (
  patientData: FormData,
  token: string
): Promise<PatientData> => {
  if (!token) {
    throw new Error("Token no válido o no presente.");
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/patients`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: patientData,
    }
  );

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(
      errorBody.message ||
        errorBody.error ||
        "Error al agregar el paciente. Por favor, intente de nuevo."
    );
  }

  return response.json();
};

// Función para obtener los detalles de un solo paciente
export const fetchPatient = async (
  id: string,
  token: string
): Promise<PatientData> => {
  if (!token) {
    throw new Error("Token de autenticación no proporcionado.");
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/patients/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorBody = await response.json();
    console.error("Error al obtener paciente:", errorBody);
    throw new Error(
      errorBody.message ||
        errorBody.error ||
        "Error al obtener los datos del paciente."
    );
  }
  const data = await response.json();
  return data;
};

// Función para actualizar los datos de un paciente
export const updatePatient = async (
  id: string,
  token: string,
  updatedData: FormData
): Promise<PatientData> => {
  if (!token) {
    throw new Error("Token no válido o no presente.");
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/patients/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updatedData,
    }
  );
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(
      errorBody.message || errorBody.error || "Error al actualizar el paciente."
    );
  }
  return response.json();
};

// Función para eliminar un paciente
export const deletePatient = async (id: string, token: string) => {
  if (!token) {
    throw new Error("Token no válido o no presente.");
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/patients/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(
      errorBody.message || errorBody.error || "Error al eliminar el paciente."
    );
  }
  return response.json();
};

// Función para obtener la lista completa de pacientes
export const fetchPatientsList = async (
  token: string
): Promise<PatientData[]> => {
  if (!token) {
    throw new Error("Token de autenticación no proporcionado.");
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/patients`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Error al obtener los pacientes. Por favor, intente de nuevo."
    );
  }

  return response.json();
};
