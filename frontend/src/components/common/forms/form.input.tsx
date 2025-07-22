// src/components/common/forms/form.input.tsx
import React, { ChangeEvent } from 'react';
import css from '../../../assets/styles/components/form.input.module.scss';
import { FormInputProps, SelectOption } from '../../../interface/common/forms/form.input.props';

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  placeholder,
  options,
  checked,
  accept,
  gridColumn,
  id, // <-- ¡Desestructura la prop 'id' aquí!
  autocomplete // <-- Desestructura la prop 'autocomplete' si la añadiste
}) => {
  const renderInput = () => {
    switch (type) {
      case 'text':
      case 'number':
      case 'email':
      case 'tel':
      case 'date':
      case 'password': // Incluimos 'password' aquí, ya debería estar
        return (
          <input
            id={id || name} // Usa 'id' si está presente, de lo contrario usa 'name'
            type={type}
            name={name}
            value={value as string | number | undefined}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            autoComplete={autocomplete} // <-- Pasa la prop 'autocomplete' aquí
          />
        );
      case 'textarea':
        return (
          <textarea
            id={id || name} // Usa 'id' si está presente
            name={name}
            value={value as string | undefined}
            onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
            required={required}
            placeholder={placeholder}
            rows={3}
          />
        );
        case 'select':
  const normalizedValue = options?.some((opt) => opt.value === value)
    ? value
    : "";
  return (
    <select
      id={id || name}
      name={name}
      value={normalizedValue as string}
      onChange={onChange}
      required={required}
    >
      {options?.map((option: SelectOption) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
      case 'checkbox':
      case 'radio':
        return (
          <input
            id={id || name} // Usa 'id' si está presente
            type={type}
            name={name}
            checked={checked}
            onChange={onChange}
          />
        );
      case 'file':
        return (
          <input
            id={id || name} // Usa 'id' si está presente
            type="file"
            name={name}
            onChange={onChange}
            required={required}
            accept={accept}
            multiple={name === "document3"} // <--- SOLO document3 permite múltiples archivos
          />
        );
      default:
        console.warn(`FormInput: Tipo de input desconocido o no manejado: ${type}`);
        return null;
    }
  };

  const containerStyle = gridColumn ? { gridColumn: gridColumn } : {};
  const isCheckboxOrRadio = type === 'checkbox' || type === 'radio';

  return (
    <div className={css.formGroup} style={containerStyle}>
      {isCheckboxOrRadio ? (
        <label htmlFor={id || name}> {/* <-- ¡Usa 'id' aquí también para la accesibilidad! */}
          {renderInput()}
          <span>{label}</span>
          {required && <span className={css.requiredIndicator}>*</span>}
        </label>
      ) : (
        <>
          <label htmlFor={id || name}>{label}</label> {/* <-- ¡Usa 'id' aquí! */}
          {renderInput()}
          {required && <span className={css.requiredIndicator}>*</span>}
        </>
      )}
    </div>
  );
};

export default FormInput;