import { AnyObject } from 'utils';
import { Size } from 'types';

export interface FormProps<FormState extends AnyObject>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'size'> {
  errorMessages?: Record<keyof FormState | string, string | undefined | null>;
  size?: Size;
  disabled?: boolean;
}

export interface FormFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {
  name?: string;
  label?: string;
  required?: boolean;
  hintText?: string;
  disabled?: boolean;
  errorMessage?: string;
  description?: string;
}

export interface FormContextType {
  size?: Size;
  disabled?: boolean;
  errorMessages?: Record<string, string | undefined | boolean | null>;
}

export interface FormFieldContextType {
  size?: Size;
  disabled?: boolean;
  name?: string;
  invalid?: boolean;
}
