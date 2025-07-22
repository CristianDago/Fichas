import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import { DateTime } from "luxon";
import {
  MedicalConditionDetailsBackend,
  SelectOptionWithSpecifyBackend,
} from "../interfaces/patient.backend.interface";

@Table({
  tableName: "Profiles",
  modelName: "Profile",
})
export class Profile extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  // --- Datos Personales ---
  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare lastname: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare rut?: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  declare age?: number;

  @AllowNull(true)
  @Column(DataType.FLOAT)
  declare weight?: number;

  @AllowNull(true)
  @Column(DataType.FLOAT)
  declare height?: number;

  @AllowNull(true)
  @Column(DataType.FLOAT)
  declare imc?: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare email?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare phone?: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  declare children?: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare occupation?: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare reasonForConsultation?: string;

  // --- ¿Cómo nos conoció? ---
  @AllowNull(true)
  @Column(DataType.JSON)
  declare howDidYouHear?: SelectOptionWithSpecifyBackend;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare gender: string;

  // --- Antecedentes Médicos ---
  @AllowNull(true)
  @Column(DataType.JSON)
  declare cardiovascular?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare ophthalmological?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare psychologicalPsychiatric?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare diabetes?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare hypertension?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare allergies?: SelectOptionWithSpecifyBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare autoimmuneDiseases?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare hematologicalDiseases?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare respiratoryDiseases?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare sleepApnea?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare eatingDisorder?: MedicalConditionDetailsBackend;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare currentMedicationUse?: { present: string; specify?: string };

  @AllowNull(true)
  @Column(DataType.JSON)
  declare otherDiseasesNotMentioned?: MedicalConditionDetailsBackend;

  // --- Hábitos ---
  @AllowNull(true)
  @Column(DataType.STRING)
  declare physicalActivity: string;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare smoking?: { isSmoker: string; cigarettesPerDay?: number };

  @AllowNull(true)
  @Column(DataType.JSON)
  declare drugs?: { usesDrugs: string; type?: string };

  @AllowNull(true)
  @Column(DataType.JSON)
  declare alcohol?: { consumesAlcohol: string; quantity?: string };

  // --- Antecedentes Quirúrgicos ---
  @AllowNull(true)
  @Column(DataType.JSON)
  declare surgeryDetails?: {
    type: SelectOptionWithSpecifyBackend;
    anesthesiaType: SelectOptionWithSpecifyBackend;
    adverseEffect: SelectOptionWithSpecifyBackend;
  };

  // --- Procedimientos ---
  @AllowNull(true)
  @Column(DataType.TEXT)
  declare suggestedTreatmentBySurgeon?: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare patientDecidedTreatment?: string;

  // --- Documentación (Links a Drive) ---
  @AllowNull(true)
  @Column(DataType.STRING)
  declare document1?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare document2?: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    get(this: Profile): string[] {
      const raw = this.getDataValue("document3");
      try {
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    },
    set(this: Profile, value: string[] | string | null) {
      if (Array.isArray(value)) {
        this.setDataValue("document3", JSON.stringify(value));
      } else if (typeof value === "string") {
        this.setDataValue("document3", value);
      } else {
        this.setDataValue("document3", null);
      }
    },
  })
  declare document3?: string[];

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare createdAt?: Date;

  @BeforeCreate
  @BeforeUpdate
  static adjustDates(instance: Profile) {
    const adjustDateToChileTimezone = (
      date: Date | undefined
    ): Date | undefined => {
      if (!date) return date;
      return DateTime.fromJSDate(date).setZone("America/Santiago").toJSDate();
    };

    if (instance.createdAt !== undefined) {
      instance.createdAt = adjustDateToChileTimezone(instance.createdAt);
    }
  }
}
