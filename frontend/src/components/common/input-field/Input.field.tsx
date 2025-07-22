import React from "react";
import type {FormInputProps} from "../../../interface/common/input-field/input.field.props";

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
  options,
  accept,
}) => (
  <div>
    <label htmlFor={id || name}>{label}</label>
    {type === "select" && options ? (
      <select
        id={id || name}
        name={name}
        value={String(value ?? "")}
        onChange={onChange}
        required={required}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={id || name}
        type={type}
        name={name}
        value={type !== "file" ? String(value ?? "") : undefined}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        accept={accept}
      />
    )}
  </div>
);

export default FormInput;
