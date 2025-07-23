import { Grid } from "../../components/common/grid/grid";
import { usePatientsList } from "../../hooks/patients/use.patients.list";
import { PatientTable } from "../../components/patient.table/patient.table";

export default function Dashboard() {
  const { patients, error, loading } = usePatientsList();
  if (loading) return <p>Cargando fichas clínicas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid>
      <PatientTable
        patients={patients}
        title={`Fichas Clínicas (${patients.length})`}
        viewProfilePath="/dashboard/patient"
      />
    </Grid>
  );
}
