// src/hooks/profile/normalize.patient.ts

import type { PatientData } from "../../interface/patient/patient.interface.props";
import { initialPatientData } from "../../constants/patient/patient.initial.state";

export function normalizePatientData(fetchedData: PatientData): PatientData {
  return {
    ...initialPatientData,
    ...fetchedData,
    id: fetchedData.id,
    createdAt: fetchedData.createdAt,
    howDidYouHear:
      fetchedData.howDidYouHear || initialPatientData.howDidYouHear,
    cardiovascular:
      fetchedData.cardiovascular || initialPatientData.cardiovascular,
    ophthalmological:
      fetchedData.ophthalmological || initialPatientData.ophthalmological,
    psychologicalPsychiatric:
      fetchedData.psychologicalPsychiatric ||
      initialPatientData.psychologicalPsychiatric,
    diabetes: fetchedData.diabetes || initialPatientData.diabetes,
    hypertension: fetchedData.hypertension || initialPatientData.hypertension,
    allergies: fetchedData.allergies || initialPatientData.allergies,
    autoimmuneDiseases:
      fetchedData.autoimmuneDiseases || initialPatientData.autoimmuneDiseases,
    hematologicalDiseases:
      fetchedData.hematologicalDiseases ||
      initialPatientData.hematologicalDiseases,
    respiratoryDiseases:
      fetchedData.respiratoryDiseases || initialPatientData.respiratoryDiseases,
    sleepApnea: fetchedData.sleepApnea || initialPatientData.sleepApnea,
    eatingDisorder:
      fetchedData.eatingDisorder || initialPatientData.eatingDisorder,
    currentMedicationUse:
      fetchedData.currentMedicationUse ||
      initialPatientData.currentMedicationUse,
    otherDiseasesNotMentioned:
      fetchedData.otherDiseasesNotMentioned ||
      initialPatientData.otherDiseasesNotMentioned,
    smoking: fetchedData.smoking || initialPatientData.smoking,
    drugs: fetchedData.drugs || initialPatientData.drugs,
    alcohol: fetchedData.alcohol || initialPatientData.alcohol,
    surgeryDetails: {
      type:
        fetchedData.surgeryDetails?.type ||
        initialPatientData.surgeryDetails.type,
      anesthesiaType:
        fetchedData.surgeryDetails?.anesthesiaType ||
        initialPatientData.surgeryDetails.anesthesiaType,
      adverseEffect:
        fetchedData.surgeryDetails?.adverseEffect ||
        initialPatientData.surgeryDetails.adverseEffect,
    }
  };
}
