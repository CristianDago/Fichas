import { Grid } from "../../components/common/grid/grid"; // Asumo que esta ruta es correcta
import { usePatientsList } from "../../hooks/patients/use.patients.list";
import { PatientTable } from "../../components/patient.table/patient.table";

export default function Dashboard() {
  const { patients, error, loading } = usePatientsList(); // <-- Usa el hook de pacientes

  if (loading) return <p>Cargando fichas clínicas...</p>; // Mensaje actualizado
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid>
      <PatientTable // <-- Usa la PatientTable
        patients={patients} // <-- Pasa los datos de pacientes
        title={`Fichas Clínicas (${patients.length})`} // <-- Título actualizado
        viewProfilePath="/dashboard/patient" // <-- Ruta para ver perfil de paciente
      />
    </Grid>
  );
}
