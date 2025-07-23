// src/views/add.patient.page.tsx

import { useEffect } from "react";
import { AddPatientForm } from "../../components/common/forms/add-patient/add.patient.form";
import { useAuth } from "../../components/auth/auth.context";
import { useAddPatient } from "../../hooks/add-profile/use.add.patients";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "../../assets/styles/components/patient.table.module.scss";

export default function AddPatient() {
  const { token } = useAuth();
  const {
    successMessage,
    errorMessage,
    handleSubmit,
    patientData,
    handleChange,
    handleFileChange, 
    formKey,
  } = useAddPatient(token);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { position: "top-right", autoClose: 5000 });
    }
    if (errorMessage) {
      toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
    }
  }, [successMessage, errorMessage]);

  if (!token) {
    return (
      <div>
        <h1>Agregar Paciente</h1>
        <p style={{ color: "red" }}>
          No estás autenticado. Inicia sesión para agregar pacientes.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className={css.name}>Agregar Paciente</h1>
      <AddPatientForm
        key={formKey}
        patientData={patientData}
        handleChange={handleChange}
        // --- ¡PASAR handleFileChange COMO PROP! ---
        handleFileChange={handleFileChange}
        // --- FIN DEL CAMBIO ---
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
