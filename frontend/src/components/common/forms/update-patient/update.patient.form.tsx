// src/components/common/forms/update.patient.form.tsx

import React from "react";
import FormInput from "../form.input";
import { FormSection } from "../form-section/form.section";
import { PatientData } from "../../../../interface/patient/patient.interface.props";
import formCss from "../../../../assets/styles/layout/add.patient.form.module.scss";
import { useDocumentHandling } from "../../../../hooks/files/use.document.handling";
import DocumentUploadSection from "../document-upload-section/document.upload.section";

import {
  YES_NO_OPTIONS,
  ALLERGY_OPTIONS,
  SURGERY_TYPE_OPTIONS,
  ANESTHESIA_TYPE_OPTIONS,
  ADVERSE_EFFECT_OPTIONS,
  HOW_DID_YOU_HEAR,
  GENDER_OPTIONS,
} from "../../../../utils/constants/select.options";

import {
  renderMedicalConditionSection,
  renderSelectWithSpecify,
  renderHabitInput,
} from "../form-renderers/form.renderers";

// Actualizar UpdatePatientFormProps en update.patient.form.tsx
interface UpdatePatientFormProps {
  patient: PatientData; // Este es el updatedData del hook
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  // --- AHORA handleFileChange espera { name, value } ---
  handleFileChange: ({
    name,
    value,
  }: {
    name: keyof PatientData;
    value: File | File[] | string | string[] | null;
  }) => void;
  handleDeleteFile: (fieldName: keyof PatientData, index?: number) => void; // Recibe esta prop
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
const UpdatePatientForm: React.FC<UpdatePatientFormProps> = ({
  patient, // patient aquí es el `updatedData` del hook usePatientProfile
  onChange,
  handleFileChange,
  handleDeleteFile, // Desestructurar handleDeleteFile
  onSubmit,
}) => {
  const { handleFileChange: docHandleFileChange } =
    useDocumentHandling<PatientData>({
      formValues: patient, // `patient` es `updatedData`
      onChange: (change) => {
        handleFileChange({ name: change.name, value: change.value });
      },
    });

  const safeSurgeryDetails = patient.surgeryDetails || {
    type: { selected: undefined, specify: undefined },
    anesthesiaType: { selected: undefined, specify: undefined },
    adverseEffect: { selected: undefined, specify: undefined },
  };

  return (
    <form onSubmit={onSubmit} className={formCss.patientForm}>
      <h1 className={formCss.name}>Editar Ficha Clínica</h1>

      {/* --- Datos personales --- */}
      <FormSection title="Datos personales" gridClassName="grid-columns-4">
        <FormInput
          label="Nombres"
          name="name"
          type="text"
          value={patient.name || ""}
          onChange={onChange}
          required
        />
        <FormInput
          label="Apellidos"
          name="lastname"
          type="text"
          value={patient.lastname || ""}
          onChange={onChange}
          required
        />
        <FormInput
          label="RUT (sin puntos ni guión)"
          name="rut"
          type="text"
          value={patient.rut || ""}
          onChange={onChange}
        />
        <FormInput
          label="Edad"
          name="age"
          type="number"
          value={patient.age ?? ""}
          onChange={onChange}
        />
        <FormInput
          label="Peso (kg)"
          name="weight"
          type="number"
          value={patient.weight ?? ""}
          onChange={onChange}
        />
        <FormInput
          label="Estatura (cm)"
          name="height"
          type="number"
          value={patient.height ?? ""}
          onChange={onChange}
        />
        <FormInput
          label="IMC"
          name="imc"
          type="number"
          value={patient.imc ?? ""}
          onChange={onChange}
        />
        <FormInput
          label="Correo electrónico"
          name="email"
          type="email"
          value={patient.email || ""}
          onChange={onChange}
        />
        <FormInput
          label="Teléfono"
          name="phone"
          type="tel"
          value={patient.phone || ""}
          onChange={onChange}
        />
        <FormInput
          label="Hijos"
          name="children"
          type="number"
          value={patient.children ?? ""}
          onChange={onChange}
          min={0}
        />
        <FormInput
          label="Ocupación"
          name="occupation"
          type="text"
          value={patient.occupation || ""}
          onChange={onChange}
        />
        <FormInput
          label="Motivo de consulta"
          name="reasonForConsultation"
          type="text"
          value={patient.reasonForConsultation || ""}
          onChange={onChange}
        />
        <FormInput
          label="Género:"
          name="gender"
          type="select"
          value={patient.gender || ""}
          onChange={onChange}
          options={GENDER_OPTIONS}
        />
        {renderSelectWithSpecify(
          onChange,
          "¿Cómo llegaste a nosotros?",
          patient.howDidYouHear,
          HOW_DID_YOU_HEAR,
          "howDidYouHear"
        )}
      </FormSection>

      {/* --- Antecedentes Médicos --- */}
      <FormSection title="Antecedentes Médicos" gridClassName="grid-columns-3">
        {renderMedicalConditionSection(
          onChange,
          "cardiovascular",
          "Cardio Vascular",
          patient.cardiovascular
        )}
        {renderMedicalConditionSection(
          onChange,
          "ophthalmological",
          "Oftalmológica",
          patient.ophthalmological
        )}
        {renderMedicalConditionSection(
          onChange,
          "psychologicalPsychiatric",
          "Psicológica/Psiquiátrica",
          patient.psychologicalPsychiatric
        )}
        {renderMedicalConditionSection(
          onChange,
          "diabetes",
          "Diabetes",
          patient.diabetes
        )}
        {renderMedicalConditionSection(
          onChange,
          "hypertension",
          "Hipertensión",
          patient.hypertension
        )}
        {renderSelectWithSpecify(
          onChange,
          "Alergias",
          patient.allergies,
          ALLERGY_OPTIONS,
          "allergies"
        )}
        {renderMedicalConditionSection(
          onChange,
          "autoimmuneDiseases",
          "Enfermedades Autoinmunes",
          patient.autoimmuneDiseases
        )}
        {renderMedicalConditionSection(
          onChange,
          "hematologicalDiseases",
          "Enfermedades Hematológicas",
          patient.hematologicalDiseases
        )}
        {renderMedicalConditionSection(
          onChange,
          "respiratoryDiseases",
          "Enfermedades Respiratorias",
          patient.respiratoryDiseases
        )}
        {renderMedicalConditionSection(
          onChange,
          "sleepApnea",
          "Apnea del Sueño",
          patient.sleepApnea
        )}
        {renderMedicalConditionSection(
          onChange,
          "eatingDisorder",
          "Trastorno Alimenticio",
          patient.eatingDisorder
        )}
        {renderMedicalConditionSection(
          onChange,
          "currentMedicationUse",
          "Uso de otros medicamentos",
          patient.currentMedicationUse
        )}
        {renderMedicalConditionSection(
          onChange,
          "otherDiseasesNotMentioned",
          "Otra enfermedad no mencionada",
          patient.otherDiseasesNotMentioned
        )}
      </FormSection>

      {/* --- Hábitos --- */}
      <FormSection title="Hábitos" gridClassName="grid-columns-2">
        <FormInput
          label="Realiza actividad física:"
          name="physicalActivity"
          type="select"
          value={patient.physicalActivity || ""}
          onChange={onChange}
          options={YES_NO_OPTIONS}
        />
        {renderHabitInput(
          patient,
          onChange,
          "smoking",
          "Fumador:",
          "¿Cuántos al día?",
          "number"
        )}
        {renderHabitInput(patient, onChange, "drugs", "Drogas:", "Tipo")}
        {renderHabitInput(
          patient,
          onChange,
          "alcohol",
          "Alcohol:",
          "Frecuencia"
        )}
      </FormSection>

      {/* --- Antecedentes Quirúrgicos --- */}
      <FormSection
        title="Antecedentes Quirúrgicos"
        gridClassName="grid-columns-1"
      >
        {renderSelectWithSpecify(
          onChange,
          "Cirugía",
          safeSurgeryDetails.type,
          SURGERY_TYPE_OPTIONS,
          "surgeryDetails.type"
        )}
        {renderSelectWithSpecify(
          onChange,
          "Tipo de anestesia",
          safeSurgeryDetails.anesthesiaType,
          ANESTHESIA_TYPE_OPTIONS,
          "surgeryDetails.anesthesiaType"
        )}
        {renderSelectWithSpecify(
          onChange,
          "¿Presentó algún efecto adverso?",
          safeSurgeryDetails.adverseEffect,
          ADVERSE_EFFECT_OPTIONS,
          "surgeryDetails.adverseEffect"
        )}
      </FormSection>

      {/* --- Procedimientos --- */}
      <FormSection title="Procedimientos" gridClassName="grid-columns-1">
        <FormInput
          label="Tratamiento quirúrgico sugerido por el Cirujano plástico:"
          name="suggestedTreatmentBySurgeon"
          type="textarea"
          value={patient.suggestedTreatmentBySurgeon || ""}
          onChange={onChange}
        />
        <FormInput
          label="Tratamiento quirúrgico que decide realizarse el/la paciente:"
          name="patientDecidedTreatment"
          type="textarea"
          value={patient.patientDecidedTreatment || ""}
          onChange={onChange}
        />
      </FormSection>

      {/* --- Documentación --- */}
      <FormSection title="Documentación" gridClassName="grid-columns-3">
        <DocumentUploadSection
          label="Documento 1"
          name="document1"
          value={patient.document1}
          onChange={docHandleFileChange}
          onDelete={() => handleDeleteFile("document1")} // Pasa `document1` a handleDeleteFile
        />
        <DocumentUploadSection
          label="Documento 2"
          name="document2"
          value={patient.document2}
          onChange={docHandleFileChange}
          onDelete={() => handleDeleteFile("document2")} // Pasa `document2` a handleDeleteFile
        />
        <DocumentUploadSection
          label="Imágenes"
          name="document3"
          value={
            Array.isArray(patient.document3)
              ? patient.document3
              : patient.document3 // Si es un solo string (URL), lo pone en un array
              ? [patient.document3 as string]
              : []
          }
          onChange={docHandleFileChange}
          onDelete={(index) => handleDeleteFile("document3", index)} // Pasa `document3` e `index`
          multiple
        />
      </FormSection>

      <button type="submit">Actualizar Ficha Clínica</button>
    </form>
  );
};

export default UpdatePatientForm;
