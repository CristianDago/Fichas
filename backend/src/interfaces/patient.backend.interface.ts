export interface MedicalConditionDetailsBackend {
  present: "SÍ" | "NO" | "";
  type?: string;
  medications?: string;
  dose?: string;
}

export interface SelectOptionWithSpecifyBackend {
  selected: string;
  specify?: string;
}

export interface PatientBackend {
  id: string;
  createdAt?: Date;

  // --- Datos Personales ---
  name: string;
  lastname: string;
  rut?: string;
  age?: number;
  weight?: number;
  height?: number;
  imc?: number;
  email?: string;
  phone?: string;
  children?: number;
  occupation?: string;
  reasonForConsultation?: string;
  howDidYouHear: SelectOptionWithSpecifyBackend;
  gender: string;

  // --- Antecedentes Médicos ---
  cardiovascular: MedicalConditionDetailsBackend;
  ophthalmological: MedicalConditionDetailsBackend;
  psychologicalPsychiatric: MedicalConditionDetailsBackend;
  diabetes: MedicalConditionDetailsBackend;
  hypertension: MedicalConditionDetailsBackend;
  allergies: SelectOptionWithSpecifyBackend;
  autoimmuneDiseases: MedicalConditionDetailsBackend;
  hematologicalDiseases: MedicalConditionDetailsBackend;
  respiratoryDiseases: MedicalConditionDetailsBackend;
  sleepApnea: MedicalConditionDetailsBackend;
  eatingDisorder: MedicalConditionDetailsBackend;
  currentMedicationUse: { present: "Sí" | "No" | ""; specify?: string };
  otherDiseasesNotMentioned: MedicalConditionDetailsBackend;

  // --- Hábitos ---
  physicalActivity: string;
  smoking: { isSmoker: string; cigarettesPerDay?: number };
  drugs: { usesDrugs: string; type?: string };
  alcohol: { consumesAlcohol: string; quantity?: string };

  // --- Antecedentes Quirúrgicos ---
  surgeryDetails: {
    type: SelectOptionWithSpecifyBackend;
    anesthesiaType: SelectOptionWithSpecifyBackend;
    adverseEffect: SelectOptionWithSpecifyBackend;
  };

  // --- Procedimientos ---
  suggestedTreatmentBySurgeon?: string;
  patientDecidedTreatment?: string;

  // --- Documentación (Links a Drive) ---
  document1?: string | null;
  document2?: string | null;
  document3?: string[] | null;
}

// Interfaz para la data de creación (lo que recibe createPatient)
export type PatientCreationAttributes = Omit<
  PatientBackend,
  "id" | "createdAt"
>;

// Interfaz para la data de actualización (lo que recibe updatePatient)
export type PatientUpdateAttributes = Partial<
  Omit<PatientBackend, "id" | "createdAt">
>;
