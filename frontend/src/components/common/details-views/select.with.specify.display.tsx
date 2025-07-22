import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "../../../assets/styles/layout/patient.profile.module.scss";
import { Props } from "../../../interface/common/forms/form.render.props";

const isValueTrulyEmpty = (val: any): boolean => {
  return (
    val === null ||
    val === undefined ||
    (typeof val === "string" && val.trim() === "") ||
    (typeof val === "number" && isNaN(val))
  );
};

const SelectWithSpecifyDisplay: React.FC<Props> = ({ icon, label, data }) => {
  // NO usamos `?? ""` aquí, para que `selected` y `specify` puedan ser `null`.
  const selected = data?.selected;
  const specify = data?.specify;

  let displayMain = "NO REGISTRADO"; // Valor por defecto si no hay datos significativos

  // Prioridad 1: Si hay una opción seleccionada (y no está vacía)
  if (!isValueTrulyEmpty(selected)) {
    displayMain = selected as string; // Casting seguro ahora que isValueTrulyEmpty lo validó
  }
  // Prioridad 2: Si no hay opción seleccionada, pero hay una especificación
  else if (!isValueTrulyEmpty(specify)) {
    displayMain = `Otros: ${specify}`;
  }

  return (
    <li className={css.twoLineItem}>
      <div className={css.firstLine}>
        <FontAwesomeIcon icon={icon} className={css.profileIcon} />
        <strong>{label}:</strong> <span>{displayMain}</span>
      </div>
      {/* Solo muestra la línea de detalles si `specify` no está vacío */}
      {!isValueTrulyEmpty(specify) && (
        <div className={css.detailsLine}>{specify}</div>
      )}
    </li>
  );
};

export default SelectWithSpecifyDisplay;