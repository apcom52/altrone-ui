import {memo} from "react";
import './form-field.scss';
import clsx from "clsx";
import {FormContextProps, useFormContext} from "../../../contexts";

interface FormFieldProps extends React.HTMLProps<HTMLDivElement>, FormContextProps {
  label?: string
  required?: boolean
}

const FormField = ({ className, label, children, required = false, disabled}: FormFieldProps) => {
  const context = useFormContext()

  const isRequired = required || context.required

  return <div className={clsx('alt-form-field', className)}>
    {label && <div className='alt-form-field__label'>{label} {isRequired   && <span className='alt-form-field__required-mark'>*</span>}</div>}
    <div className='alt-form-field__control'>
      {children}
    </div>
  </div>
}

export default memo(FormField)