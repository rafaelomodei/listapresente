import type { InputHTMLAttributes } from 'react';

export type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const FormField = ({ label, id, ...props }: FormFieldProps) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={inputId}>
      {label}
      <input id={inputId} {...props} />
    </label>
  );
};

export default FormField;
