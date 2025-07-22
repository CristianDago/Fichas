// src/components/patient/patient.profile.details.tsx

import { Grid } from "../grid/grid";
import css from "../../../assets/styles/layout/patient.profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PatientDetailsProps } from "../../../interface/common/forms/form.render.props";
import {
  faCircleUser,
  faFile,
  faMobile,
  faEnvelope,
  faCalendarAlt,
  faIdCard,
  faWeightHanging,
  faArrowsUpDown,
  faUser,
  faBriefcase,
  faQuestionCircle,
  faChild,
  faHeartPulse,
  faEye,
  faBrain,
  faHouseMedical,
  faAllergies,
  faLungs,
  faBed,
  faBowlFood,
  faPills,
  faSyringe,
  faBone,
  faNotesMedical,
  faRunning,
  faSmoking,
  faCapsules,
  faWineGlass,
  faCut,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { PatientData } from "../../../interface/patient/patient.interface.props";
import ProfileField from "../profile-field/profile.field";
import MedicalConditionDisplay from "./medical.condition.display";
import SelectWithSpecifyDisplay from "./select.with.specify.display";
import HabitDisplay from "./habit.display";

const isValueTrulyEmpty = (val: any): boolean => {
  return (
    val === null ||
    val === undefined ||
    (typeof val === "string" && val.trim() === "") ||
    (typeof val === "number" && isNaN(val))
  );
};

const PatientDetails: React.FC<PatientDetailsProps> = ({
  patient,
  onEdit,
  onDelete,
}) => {
  const getSimpleValue = (value: any): string => {
    return isValueTrulyEmpty(value) ? "NO REGISTRADO" : String(value);
  };

  // --- Función auxiliar para obtener los botones de documentos ---
  const renderDocumentButtons = (
    labelPrefix: string,
    // ¡Tipo de linksData ajustado de nuevo! Ahora acepta File individualmente.
    linksData: string | File | (string | File)[] | null | undefined
  ) => {
    let actualLinks: string[] = [];

    if (Array.isArray(linksData)) {
      // Si es un array, filtramos para asegurarnos de que solo tengamos strings (URLs)
      actualLinks = linksData.filter(
        (link): link is string => typeof link === "string" && link.trim() !== ""
      );
    } else if (typeof linksData === "string" && linksData.trim() !== "") {
      // Si es un solo string no vacío, lo ponemos en un array
      actualLinks = [linksData];
    }
    // Si linksData es un solo objeto File, null o undefined,
    // actualLinks permanecerá como un array vacío [], lo cual es el comportamiento deseado.

    if (actualLinks.length > 0) {
      return (
        <div className={css.documentButtons}>
          {actualLinks.map(
            (
              href,
              index // 'href' ahora es garantizado que es un string
            ) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={css.documentButton}
              >
                <button>
                  <FontAwesomeIcon icon={faFile} /> {labelPrefix}{" "}
                  {actualLinks.length > 1 ? index + 1 : ""}
                </button>
              </a>
            )
          )}
        </div>
      );
    } else {
      // Si no hay links (o solo hay objetos File que no son links directos), se muestra el botón deshabilitado
      return (
        <button disabled className={css.disabledButton}>
          <FontAwesomeIcon icon={faFile} /> {labelPrefix}
        </button>
      );
    }
  };

  const patientSafe: PatientData = {
    ...patient,
    howDidYouHear: patient.howDidYouHear || {
      selected: undefined,
      specify: undefined,
    },
    cardiovascular: patient.cardiovascular || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    ophthalmological: patient.ophthalmological || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    psychologicalPsychiatric: patient.psychologicalPsychiatric || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    diabetes: patient.diabetes || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    hypertension: patient.hypertension || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    allergies: patient.allergies || { selected: undefined, specify: undefined },
    autoimmuneDiseases: patient.autoimmuneDiseases || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    hematologicalDiseases: patient.hematologicalDiseases || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    respiratoryDiseases: patient.respiratoryDiseases || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    sleepApnea: patient.sleepApnea || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    eatingDisorder: patient.eatingDisorder || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    currentMedicationUse: patient.currentMedicationUse || {
      present: undefined,
      specify: undefined,
    },
    otherDiseasesNotMentioned: patient.otherDiseasesNotMentioned || {
      present: undefined,
      type: undefined,
      medications: undefined,
      dose: undefined,
    },
    smoking: patient.smoking || {
      isSmoker: undefined,
      cigarettesPerDay: undefined,
    },
    drugs: patient.drugs || { usesDrugs: undefined, type: undefined },
    alcohol: patient.alcohol || {
      consumesAlcohol: undefined,
      quantity: undefined,
    },
    surgeryDetails: {
      type: patient.surgeryDetails.type || {
        selected: undefined,
        specify: undefined,
      },
      anesthesiaType: patient.surgeryDetails.anesthesiaType || {
        selected: undefined,
        specify: undefined,
      },
      adverseEffect: patient.surgeryDetails.adverseEffect || {
        selected: undefined,
        specify: undefined,
      },
    },
    suggestedTreatmentBySurgeon:
      patient.suggestedTreatmentBySurgeon ?? undefined,
    patientDecidedTreatment: patient.patientDecidedTreatment ?? undefined,
    document1: patient.document1 ?? null,
    document2: patient.document2 ?? null,
    document3:
      typeof patient.document3 === "string"
        ? JSON.parse(patient.document3)
        : patient.document3 ?? null,
    id: patient.id,
    createdAt: patient.createdAt,
    gender: patient.gender ?? undefined,
    rut: patient.rut ?? undefined,
    age: patient.age ?? undefined,
    weight: patient.weight ?? undefined,
    height: patient.height ?? undefined,
    imc: patient.imc ?? undefined,
    email: patient.email ?? undefined,
    phone: patient.phone ?? undefined,
    children: patient.children ?? undefined,
    occupation: patient.occupation ?? undefined,
    reasonForConsultation: patient.reasonForConsultation ?? undefined,
    physicalActivity: patient.physicalActivity ?? undefined,
  };

  return (
    <>
      <Grid className={`grid-columns-2 ${css.mainInformation}`}>
        <div>
          <FontAwesomeIcon icon={faCircleUser} className={css.iconUser} />
        </div>

        <div>
          <h1 className={`name`}>{`${patientSafe.name || "NO REGISTRADO"} ${
            patientSafe.lastname || "NO REGISTRADO"
          }`}</h1>

          <ul className={css.profile}>
            <ProfileField
              icon={faEnvelope}
              label="Email"
              value={patientSafe.email}
            />
            <ProfileField
              icon={faMobile}
              label="Teléfono"
              value={patientSafe.phone}
            />
            <ProfileField
              icon={faCalendarAlt}
              label="Fecha de Creación"
              value={
                patientSafe.createdAt === undefined
                  ? "Cargando..."
                  : patientSafe.createdAt
                  ? new Date(patientSafe.createdAt).toLocaleDateString()
                  : "NO REGISTRADA"
              }
            />
          </ul>
          <Grid className="grid-columns-2">
            <button onClick={onEdit}>Editar</button>
            <button onClick={onDelete}>Eliminar</button>
          </Grid>
        </div>
      </Grid>

      {/* --- Datos Personales Completos --- */}
      <Grid className={`grid-columns-2 ${css.personalData}`}>
        <div>
          <h2>Datos Personales</h2>
          <ul>
            <ProfileField icon={faIdCard} label="RUT" value={patientSafe.rut} />
            <ProfileField
              icon={faCalendarAlt}
              label="Edad"
              value={patientSafe.age}
            />
            <ProfileField
              icon={faWeightHanging}
              label="Peso (kg)"
              value={patientSafe.weight}
            />
            <ProfileField
              icon={faArrowsUpDown}
              label="Estatura (cm)"
              value={patientSafe.height}
            />
            <ProfileField icon={faBone} label="IMC" value={patientSafe.imc} />
            <ProfileField
              icon={faUser}
              label="Género"
              value={patientSafe.gender}
            />
            <ProfileField
              icon={faChild}
              label="Hijos"
              value={patientSafe.children}
            />
            <ProfileField
              icon={faBriefcase}
              label="Ocupación"
              value={patientSafe.occupation}
            />
            <ProfileField
              icon={faNotesMedical}
              label="Motivo de Consulta"
              value={patientSafe.reasonForConsultation}
            />
            <SelectWithSpecifyDisplay
              icon={faQuestionCircle}
              label="¿Cómo Llegó a Nosotros?"
              data={patientSafe.howDidYouHear}
            />
          </ul>
        </div>

        {/* --- Antecedentes Médicos --- */}
        <div>
          <h2>Antecedentes Médicos</h2>
          <ul>
            <MedicalConditionDisplay
              icon={faHeartPulse}
              label="Cardiovascular"
              data={patientSafe.cardiovascular}
            />
            <MedicalConditionDisplay
              icon={faEye}
              label="Oftalmológica"
              data={patientSafe.ophthalmological}
            />
            <MedicalConditionDisplay
              icon={faBrain}
              label="Psicológica/Psiquiátrica"
              data={patientSafe.psychologicalPsychiatric}
            />
            <MedicalConditionDisplay
              icon={faSyringe}
              label="Diabetes"
              data={patientSafe.diabetes}
            />
            <MedicalConditionDisplay
              icon={faHouseMedical}
              label="Hipertensión"
              data={patientSafe.hypertension}
            />
            <SelectWithSpecifyDisplay
              icon={faAllergies}
              label="Alergias"
              data={patientSafe.allergies}
            />
            <MedicalConditionDisplay
              icon={faHouseMedical}
              label="Enfermedades Autoinmunes"
              data={patientSafe.autoimmuneDiseases}
            />
            <MedicalConditionDisplay
              icon={faPills}
              label="Enfermedades Hematológicas"
              data={patientSafe.hematologicalDiseases}
            />
            <MedicalConditionDisplay
              icon={faLungs}
              label="Enfermedades Respiratorias"
              data={patientSafe.respiratoryDiseases}
            />
            <MedicalConditionDisplay
              icon={faBed}
              label="Apnea del Sueño"
              data={patientSafe.sleepApnea}
            />
            <MedicalConditionDisplay
              icon={faBowlFood}
              label="Trastorno Alimenticio"
              data={patientSafe.eatingDisorder}
            />
            <MedicalConditionDisplay
              icon={faSyringe}
              label="Uso de Otros Medicamentos"
              data={patientSafe.currentMedicationUse}
            />
            <MedicalConditionDisplay
              icon={faNotesMedical}
              label="Otra Enfermedad No Mencionada"
              data={patientSafe.otherDiseasesNotMentioned}
            />
          </ul>
        </div>
      </Grid>

      {/* --- Hábitos --- */}
      <Grid className={`grid-columns-2 ${css.datosHabitos}`}>
        <div>
          <h2>Hábitos</h2>
          <ul>
            <ProfileField
              icon={faRunning}
              label="Actividad Física"
              value={getSimpleValue(patientSafe.physicalActivity)}
            />
            <HabitDisplay
              icon={faSmoking}
              label="Fumador"
              data={patientSafe.smoking}
              habitType="smoking"
            />
            <HabitDisplay
              icon={faCapsules}
              label="Drogas"
              data={patientSafe.drugs}
              habitType="drugs"
            />
            <HabitDisplay
              icon={faWineGlass}
              label="Alcohol"
              data={patientSafe.alcohol}
              habitType="alcohol"
            />
          </ul>
        </div>
        {/* --- Antecedentes Quirúrgicos --- */}
        <div>
          <h2>Antecedentes Quirúrgicos</h2>
          <ul>
            <SelectWithSpecifyDisplay
              icon={faCut}
              label="Tipo de Cirugía"
              data={patientSafe.surgeryDetails.type}
            />
            <SelectWithSpecifyDisplay
              icon={faSyringe}
              label="Tipo de Anestesia"
              data={patientSafe.surgeryDetails.anesthesiaType}
            />
            <SelectWithSpecifyDisplay
              icon={faExclamationTriangle}
              label="Efecto Adverso"
              data={patientSafe.surgeryDetails.adverseEffect}
            />
          </ul>
        </div>
      </Grid>

      {/* --- Procedimientos --- */}
      <Grid className={`grid-columns-1 ${css.personalData}`}>
        <div>
          <h2>Procedimientos</h2>
          <ul>
            <li className={css.twoLineItem}>
              <div className={css.firstLine}>
                <FontAwesomeIcon
                  icon={faNotesMedical}
                  className={css.profileIcon}
                />
                <strong>Sugerido por Cirujano:</strong>
              </div>
              <div className={css.detailsLine}>
                {getSimpleValue(patientSafe.suggestedTreatmentBySurgeon)}
              </div>
            </li>
            <li className={css.twoLineItem}>
              <div className={css.firstLine}>
                <FontAwesomeIcon icon={faUser} className={css.profileIcon} />
                <strong>Decide Realizarse:</strong>
              </div>
              <div className={css.detailsLine}>
                {getSimpleValue(patientSafe.patientDecidedTreatment)}
              </div>
            </li>
          </ul>
        </div>
      </Grid>

      {/* --- Documentos --- */}
      <div className={css.personalData}>
        <h2>Documentos</h2>
        <Grid className="grid-columns-3">
          <div>
            {renderDocumentButtons("Documento 1", patientSafe.document1)}
          </div>
          <div>
            {renderDocumentButtons("Documento 2", patientSafe.document2)}
          </div>
          <div className={css.photosColumn}>
            {renderDocumentButtons("Imagen", patientSafe.document3)}
          </div>
        </Grid>
      </div>
    </>
  );
};

export default PatientDetails;
