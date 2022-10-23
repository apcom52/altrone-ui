import {memo} from "react";
import './form-group.scss';
import {Align} from "../../../types/Align";
import clsx from "clsx";
import {FormContext, FormContextProps, useFormContext} from "../../../contexts";

export enum FormGroupVariant {
  default = 'default',
  linear = 'linear',
  row = 'row'
}

interface FormGroupProps extends React.HTMLProps<HTMLDivElement>, FormContextProps {
  variant?: FormGroupVariant
  align?: Align
}

const FormGroup = ({ variant = FormGroupVariant.default, align = Align.start, children, className, required, disabled }: FormGroupProps) => {
  const context = useFormContext()

  return <FormContext.Provider value={{
    required: required || context.required,
    disabled: disabled || context.disabled
  }}>
    <div className={clsx('alt-form-group', className, {
      'alt-form-group--variant-linear': variant === FormGroupVariant.linear,
      'alt-form-group--variant-row': variant === FormGroupVariant.row,
      'alt-form-group--align-end': align === Align.end
    })}>
      {children}
    </div>
  </FormContext.Provider>
}

export default memo(FormGroup)