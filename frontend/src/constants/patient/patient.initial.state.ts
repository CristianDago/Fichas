// src/constants/initialPatientData.ts

import type { MedicalConditionDetails, PatientData, SelectOptionWithSpecify } from "../../interface/patient/patient.interface.props";

const initialMedicalCondition: MedicalConditionDetails = {
  present: "NO",
  type: "",
  medications: "",
  dose: "",
};

const initialSelectOptionWithSpecify: SelectOptionWithSpecify = {
  selected: "",
  specify: "",
};

export const initialPatientData: PatientData = {
  id: undefined,
  createdAt: undefined,
  name: "",
  lastname: "",
  rut: "",
  age: undefined,
  weight: undefined,
  height: undefined,
  imc: undefined,
  email: "",
  phone: "",
  children: undefined,
  occupation: undefined,
  reasonForConsultation: undefined,
  gender: "",
  howDidYouHear: { ...initialSelectOptionWithSpecify },
  cardiovascular: { ...initialMedicalCondition },
  ophthalmological: { ...initialMedicalCondition },
  psychologicalPsychiatric: { ...initialMedicalCondition },
  diabetes: { ...initialMedicalCondition },
  hypertension: { ...initialMedicalCondition },
  allergies: { ...initialSelectOptionWithSpecify },
  autoimmuneDiseases: { ...initialMedicalCondition },
  hematologicalDiseases: { ...initialMedicalCondition },
  respiratoryDiseases: { ...initialMedicalCondition },
  sleepApnea: { ...initialMedicalCondition },
  eatingDisorder: { ...initialMedicalCondition },
  currentMedicationUse: { present: "NO", specify: "" },
  otherDiseasesNotMentioned: { ...initialMedicalCondition },
  physicalActivity: "NO",
  smoking: { isSmoker: "NO", cigarettesPerDay: null },
  drugs: { usesDrugs: "NO", type: "" },
  alcohol: { consumesAlcohol: "NO", quantity: "" },
  surgeryDetails: {
    type: { ...initialSelectOptionWithSpecify },
    anesthesiaType: { ...initialSelectOptionWithSpecify },
    adverseEffect: { ...initialSelectOptionWithSpecify },
  },
  suggestedTreatmentBySurgeon: undefined,
  patientDecidedTreatment: undefined,
  document1: null,
  document2: null,
  document3: null
};
