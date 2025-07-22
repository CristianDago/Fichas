// Importa TODAS las interfaces de datos desde tu archivo principal de interfaces
import {
  IconDefinition
} from "@fortawesome/fontawesome-svg-core";
import {
  MedicalConditionDetails,
  PatientData,
  SelectOptionWithSpecify,
  SmokingData, // <-- Ahora importadas desde patient.interface.ts
  DrugsData, // <-- Ahora importadas desde patient.interface.ts
  AlcoholData, // <-- Ahora importadas desde patient.interface.ts
} from "../../patient/patient.interface.props"; // <-- Asegúrate que la ruta sea correcta

// --- ELIMINA CUALQUIER OTRA DEFINICIÓN DUPLICADA DE INTERFACES AQUÍ.
// Solo deben estar las interfaces de las PROPS para los componentes. ---

export interface MedicalConditionDisplayProps {
  icon: IconDefinition;
  label: string;
  data: MedicalConditionDetails; // Usa la interfaz importada (que permite null/undefined)
}

export interface PatientDetailsProps {
  patient: PatientData; // Usa la interfaz importada (que permite null/undefined)
  onEdit: () => void;
  onDelete: () => void;
}

export interface Props { // Interfaz para SelectWithSpecifyDisplayProps
  icon: IconDefinition;
  label: string;
  data: SelectOptionWithSpecify; // Usa la interfaz importada (que permite null/undefined)
}

// Estos tipos deben coincidir exactamente con los que importaste arriba
type HabitType = "smoking" | "drugs" | "alcohol";

export interface HabitDisplayProps {
  icon?: IconDefinition; // Hazlo opcional si a veces no se pasa
  label: string;
  // --- ¡SOLUCIÓN CLAVE AQUÍ: ELIMINAMOS `| string` de la unión de tipos para `data`! ---
  data: SmokingData | DrugsData | AlcoholData;
  habitType: HabitType;
}