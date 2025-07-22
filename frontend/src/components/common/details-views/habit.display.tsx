import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "../../../assets/styles/layout/patient.profile.module.scss";
import {
  SmokingData,
  DrugsData,
  AlcoholData,
} from "../../../interface/patient/patient.interface.props";

import {
  HabitDisplayProps
} from "../../../interface/common/forms/form.render.props";

const isValueTrulyEmpty = (val: any): boolean => {
  return (
    val === null ||
    val === undefined ||
    (typeof val === "string" && val.trim() === "") ||
    (typeof val === "number" && isNaN(val))
  );
};

const HabitDisplay: React.FC<HabitDisplayProps> = ({
  icon,
  label,
  data,
  habitType,
}) => {
  // Función auxiliar para mostrar "SÍ"/"NO" o "NO REGISTRADO"

  let mainAnswerRaw: string | undefined | null = "";
  let detail: string | null = null;
  let hasMainAnswerValid = false; // Bandera para verificar si la respuesta principal es "SÍ" o "NO"

  switch (habitType) {
    case "smoking":
      const smoking = data as SmokingData;
      mainAnswerRaw = smoking.isSmoker; // Sin ?? ""
      hasMainAnswerValid = mainAnswerRaw?.toUpperCase() === "SÍ" || mainAnswerRaw?.toUpperCase() === "NO";
      if (smoking.isSmoker?.toUpperCase() === "SÍ") {
        detail = `Cigarrillos por día: ${
          isValueTrulyEmpty(smoking.cigarettesPerDay) ? "No registrado" : smoking.cigarettesPerDay
        }`;
      }
      break;

    case "drugs":
      const drugs = data as DrugsData;
      mainAnswerRaw = drugs.usesDrugs; // Sin ?? ""
      hasMainAnswerValid = mainAnswerRaw?.toUpperCase() === "SÍ" || mainAnswerRaw?.toUpperCase() === "NO";
      if (drugs.usesDrugs?.toUpperCase() === "SÍ") {
        detail = `Tipos: ${isValueTrulyEmpty(drugs.type) ? "No registrado" : drugs.type}`;
      }
      break;

    case "alcohol":
      const alcohol = data as AlcoholData;
      mainAnswerRaw = alcohol.consumesAlcohol; // Sin ?? ""
      hasMainAnswerValid = mainAnswerRaw?.toUpperCase() === "SÍ" || mainAnswerRaw?.toUpperCase() === "NO";
      if (alcohol.consumesAlcohol?.toUpperCase() === "SÍ") {
        detail = `Frecuencia: ${isValueTrulyEmpty(alcohol.quantity) ? "No registrado" : alcohol.quantity}`;
      }
      break;

    default:
      // Esto no debería pasar si habitType es controlado
      mainAnswerRaw = null;
  }

  // Si la respuesta principal no es "SÍ" o "NO", y no hay detalles, se considera "NO REGISTRADO"
  const displayMainAnswer = hasMainAnswerValid ? (mainAnswerRaw as string).toUpperCase() : (detail ? (mainAnswerRaw?.toUpperCase() || "SÍ (con detalles)") : "NO REGISTRADO");


  return (
    <li className={css.twoLineItem}>
      <div className={css.firstLine}>
        {icon && <FontAwesomeIcon icon={icon} className={css.profileIcon} />}{" "}
        <strong>{label}:</strong> {displayMainAnswer}
      </div>
      {detail && <div className={css.detailsLine}>{detail}</div>}
    </li>
  );
};

export default HabitDisplay;