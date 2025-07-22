// src/components/common/profile-field/profile.field.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "../../../assets/styles/layout/patient.profile.module.scss";

interface ProfileFieldProps {
  icon?: any;
  label: string;
  value: string | number | null | undefined;
}

const isValueEmpty = (val: any): boolean => {
  return (
    val === null ||
    val === undefined ||
    (typeof val === "string" && val.trim() === "") ||
    (typeof val === "number" && isNaN(val))
  );
};

const ProfileField: React.FC<ProfileFieldProps> = ({ icon, label, value }) => {
  const mainValue = isValueEmpty(value) ? "NO REGISTRADO" : String(value);

  return (
    <li className={css.twoLineItem}>
      <div className={css.firstLine}>
        {icon && <FontAwesomeIcon icon={icon} className={css.profileIcon} />}{" "}
        <strong>{label}:</strong> {mainValue}
      </div>
    </li>
  );
};

export default ProfileField;
