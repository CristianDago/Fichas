import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/auth.context";
import { usePatientProfile } from "../../hooks/profile/use.profile.patients";
import UpdatePatientForm from "../../components/common/forms/update-patient/update.patient.form";
import PatientDetails from "../../components/common/details-views/patient.profile.details";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const {
    patient,
    error,
    isEditing,
    updatedData,
    handleEdit,
    handleChange,
    handleFileChange, // <--- DESESTRUCTURAR ESTA FUNCIÓN
    handleDeleteFile, // <--- DESESTRUCTURAR ESTA FUNCIÓN
    handleSubmitEdit,
    handleDelete,
    isDeleted,
    isNotFound,
  } = usePatientProfile(id, token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDeleted) {
      navigate("/dashboard"); // Redirigir a la lista de pacientes
    }
  }, [isDeleted, navigate]);

  // Mensajes de carga y error mejorados
  if (isNotFound) {
    return (
      <div>
        <p>Lo sentimos, la ficha clínica no fue encontrada.</p>
        <button onClick={() => navigate("/dashboard")}>
          Volver al listado
        </button>
      </div>
    );
  }

  if (error) {
    return <div>Error al cargar la ficha clínica: {error}</div>;
  }

  if (!patient) {
    return <div>Cargando ficha clínica...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <UpdatePatientForm
          patient={updatedData!} // updatedData siempre será PatientData o null, se fuerza con !
          onChange={handleChange}
          handleFileChange={handleFileChange} // <--- PASAR COMO PROP
          handleDeleteFile={handleDeleteFile} // <--- PASAR COMO PROP
          onSubmit={handleSubmitEdit}
        />
      ) : (
        <PatientDetails
          patient={patient}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PatientProfile;
