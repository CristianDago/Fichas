export interface FormInputProps {
  id?: string;
  name: string;
  label: string;
  type: string;
  value?: string | number | readonly string[] | File | Date | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  options?: string[];
  accept?: string;
  autocomplete?: string;
}
