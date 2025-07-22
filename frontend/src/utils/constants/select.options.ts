export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export const YES_NO_OPTIONS: SelectOption[] = [
  { value: "SÍ", label: "SÍ" },
  { value: "NO", label: "NO" },
];

export const GENDER_OPTIONS: SelectOption[] = [
  { value: "", label: "Seleccionar" },
  { value: "MASCULINO", label: "Masculino" },
  { value: "FEMENINO", label: "Femenino" },
  { value: "OTRO", label: "Otro" },
];

export const ALLERGY_OPTIONS: SelectOption[] = [
  { value: "", label: "Seleccionar" },
  { value: "Latex", label: "Látex" },
  { value: "Lidocaina", label: "Lidocaína" },
  { value: "Corticoides", label: "Corticoides" },
  { value: "Iodo", label: "Iodo" },
  { value: "Otros", label: "Otros (Especificar)" },
];

export const SURGERY_TYPE_OPTIONS: SelectOption[] = [
  { value: "", label: "Seleccione" },
  { value: "Cirugía bariátrica", label: "Cirugía bariátrica" },
  { value: "Cirugía tiroidea", label: "Cirugía tiroidea" },
  { value: "Hernias", label: "Hernias" },
  { value: "Cirugías abdominales", label: "Cirugías abdominales" },
  { value: "Cesáreas", label: "Cesáreas" },
  { value: "Cirugía facial", label: "Cirugía facial" },
  { value: "Cirugía ortognática", label: "Cirugía ortognática" },
  { value: "Otros", label: "Otros" },
];

export const ANESTHESIA_TYPE_OPTIONS: SelectOption[] = [
  { value: "", label: "Seleccione" },
  { value: "General", label: "General" },
  { value: "Raquidea", label: "Raquidea" },
  { value: "Local", label: "Local" },
  { value: "Otros", label: "Otros" },
];

export const ADVERSE_EFFECT_OPTIONS = [
  { value: "", label: "Seleccione" },
  { value: "Cefaleas", label: "Cefaleas" },
  { value: "Retención urinaria", label: "Retención urinaria" },
  { value: "Vómitos", label: "Vómitos" },
  { value: "Shock anafiláctico", label: "Shock anafiláctico" },
  { value: "Otros", label: "Otros" },
];

export const HOW_DID_YOU_HEAR = [
  { value: "", label: "Seleccione" },
  { value: "REDES SOCIALES", label: "Redes Sociales" },
  { value: "BÚSQUEDA EN GOOGLE", label: "Búsqueda en Google" },
  { value: "RECOMENDACIÓN", label: "Recomendación" },
  { value: "OTROS", label: "Otros" },
];
