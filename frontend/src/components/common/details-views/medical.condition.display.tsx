import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "../../../assets/styles/layout/patient.profile.module.scss";
import { MedicalConditionDisplayProps } from "../../../interface/common/forms/form.render.props";

const isValueTrulyEmpty = (val: any): boolean => {
  return (
    val === null ||
    val === undefined ||
    (typeof val === "string" && val.trim() === "") ||
    (typeof val === "number" && isNaN(val))
  );
};

const MedicalConditionDisplay: React.FC<MedicalConditionDisplayProps> = ({
  icon,
  label,
  data,
}) => {
  // CAMBIO CLAVE AQUÍ: No uses `|| ""` al extraer el valor. Que sea null/undefined si es el caso.
  const present = data?.present; // Ahora `present` puede ser "" | "Sí" | "No" | null | undefined

  const type = data?.type;
  const medications = data?.medications;
  const dose = data?.dose;

  let displayPresent = "NO REGISTRADO";

  // CAMBIO CLAVE AQUÍ: Asegúrate de que `present` no sea null/undefined antes de llamar a `toUpperCase()`
  // Y luego usa `isValueTrulyEmpty` para la lógica de "SÍ" / "NO".
  const presentUpper = typeof present === 'string' ? present.toUpperCase() : undefined; // Convierte a uppercase solo si es string, sino undefined

  const hasValidPresentValue = presentUpper === "SÍ" || presentUpper === "NO";

  const details = [];
  if (!isValueTrulyEmpty(type)) details.push(`Tipo: ${type}`);
  if (!isValueTrulyEmpty(medications)) details.push(`Medicamentos: ${medications}`);
  if (!isValueTrulyEmpty(dose)) details.push(`Dosis: ${dose}`);

  const hasDetails = details.length > 0;

  if (hasValidPresentValue) {
    displayPresent = presentUpper as string; // Mostrar "SÍ" o "NO"
  } else if (hasDetails) {
    displayPresent = "SÍ (con detalles)";
  }
  // Si no hay valor `present` válido y no hay detalles, se queda en "NO REGISTRADO"

  return (
    <li className={css.twoLineItem}>
      <div className={css.firstLine}>
        <FontAwesomeIcon icon={icon} className={css.profileIcon} />{" "}
        <strong>{label}:</strong> {displayPresent}
      </div>
      {hasDetails && (
        <div className={css.detailsLine}>{details.join(" | ")}</div>
      )}
    </li>
  );
};

export default MedicalConditionDisplay;