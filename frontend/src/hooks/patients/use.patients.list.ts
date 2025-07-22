import { useEffect, useState } from "react";
import { useAuth } from "../../components/auth/auth.context";
import { fetchPatientsList } from "../../utils/api/fetch.patient";
import type { PatientData } from "../../interface/patient/patient.interface.props"; // <-- Importa la interfaz PatientData

export const usePatientsList = () => {
  // <-- Renombrado a usePatientsList
  const { token } = useAuth();
  const [patients, setPatients] = useState<PatientData[]>([]); // <-- Cambiado a patients y tipo PatientData[]
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Token no proporcionado");
        setLoading(false);
        return;
      }

      try {
        const data: PatientData[] = await fetchPatientsList(token); // <-- Llama a fetchPatientsList

        const sortedData = [...data].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });

        setPatients(sortedData);
      } catch (err: any) {
        setError(err.message || "Error desconocido al obtener pacientes"); // Texto actualizado
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { patients, error, loading }; // <-- Devuelve patients
};
