import { PatientData } from "../../patient/patient.interface.props";
import { ChangeEvent } from "react";

export interface AddPatientFormProps {
  patientData: PatientData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  // --- ESTA ES LA FIRMA CORRECTA Y FINAL PARA EL PROP handleFileChange en el formulario ---
  handleFileChange: ({ name, value }: { name: keyof PatientData; value: any }) => void; // Acepta el objeto {name, value}
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}