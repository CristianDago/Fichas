// interface/patient/patient.interface.ts

// Interfaz para detalles de condiciones médicas (SÍ/NO con especificaciones)
export interface MedicalConditionDetails {
  present?: "SÍ" | "NO" | "" | null;
  type?: string | null;
  medications?: string | null;
  dose?: string | null;
}

// Interfaz genérica para select con opción "Otros"
export interface SelectOptionWithSpecify {
  selected?: string | null;
  specify?: string | null;
}

// --- Interfaces de Hábitos - AÑADIDAS AQUÍ Y EXPORTADAS ---
export interface SmokingData {
  isSmoker?: "SÍ" | "NO" | "" | null;
  cigarettesPerDay?: number | null;
}

export interface DrugsData {
  usesDrugs?: "SÍ" | "NO" | "" | null;
  type?: string | null;
}

export interface AlcoholData {
  consumesAlcohol?: "SÍ" | "NO" | "" | null;
  quantity?: string | null;
}
// --- FIN Interfaces de Hábitos ---

// Interfaz principal de datos
export interface PatientData {
  // --- Datos Personales ---
  id?: string;
  createdAt?: Date;
  name: string;
  lastname: string;
  rut: string;
  age?: number | null;
  gender?: "Masculino" | "Femenino" | "Otro" | "" | null;
  weight?: number | null;
  height?: number | null;
  imc?: number | null;
  email?: string | null;
  phone?: string | null;
  children?: number | null;
  occupation?: string | null;
  reasonForConsultation?: string | null;
  howDidYouHear: SelectOptionWithSpecify;

  // --- Antecedentes Médicos ---
  cardiovascular: MedicalConditionDetails;
  ophthalmological: MedicalConditionDetails;
  psychologicalPsychiatric: MedicalConditionDetails;
  diabetes: MedicalConditionDetails;
  hypertension: MedicalConditionDetails;
  allergies: SelectOptionWithSpecify;
  autoimmuneDiseases: MedicalConditionDetails;
  hematologicalDiseases: MedicalConditionDetails;
  respiratoryDiseases: MedicalConditionDetails;
  sleepApnea: MedicalConditionDetails;
  eatingDisorder: MedicalConditionDetails;
  currentMedicationUse: {
    present?: "SÍ" | "NO" | "" | null;
    specify?: string | null;
  };
  otherDiseasesNotMentioned: MedicalConditionDetails;

  // --- Hábitos ---
  physicalActivity?: "SÍ" | "NO" | "" | null;
  smoking: SmokingData;
  drugs: DrugsData;
  alcohol: AlcoholData;

  // --- Antecedentes Quirúrgicos ---
  surgeryDetails: {
    type: SelectOptionWithSpecify;
    anesthesiaType: SelectOptionWithSpecify;
    adverseEffect: SelectOptionWithSpecify;
  };

  // --- Procedimientos ---
  suggestedTreatmentBySurgeon?: string | null;
  patientDecidedTreatment?: string | null;

  // --- Documentación ---
  document1?: File | string | null;
  document2?: File | string | null;
  document3?: (File | string)[] | null;

  document1_delete?: boolean;
  document2_delete?: boolean;
  document3_delete?: boolean;


}
