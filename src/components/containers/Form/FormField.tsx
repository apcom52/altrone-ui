import {cloneElement, memo, ReactElement, useId} from "react";
import './form-field.scss';
import clsx from "clsx";
import {FormContextProps, useFormContext} from "../../../contexts";

interface FormFieldProps extends Omit<React.HTMLProps<HTMLDivElement>, 'children'>, FormContextProps {
  children: ReactElement
  label?: string
  required?: boolean
}

const FormField = ({ className, label, children, required = false, disabled}: FormFieldProps) => {
  const context = useFormContext()
  const id = useId()
  const isRequired = required || context.required

  return <div className={clsx('alt-form-field', className)}>
    {label && <label htmlFor={id} className='alt-form-field__label'>{label} {isRequired && <span className='alt-form-field__required-mark'>*</span>}</label>}
    <div className='alt-form-field__control'>
      {typeof children === 'object' ? cloneElement(children, { id }) : children}
    </div>
  </div>
}

export default memo(FormField)