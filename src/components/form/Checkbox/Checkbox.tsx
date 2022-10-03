import {memo, useId} from "react";
import './checkbox.scss'
import {Icon} from "../../icons";
import clsx from "clsx";

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  danger?: boolean
  CheckIconComponent?: JSX.Element
}

const Checkbox = ({ disabled, id, checked, danger = false, label = '', CheckIconComponent, className, ...props }: CheckboxProps) => {
  const generatedCheckboxId = useId()

  const checkboxId = id || generatedCheckboxId

  return <label htmlFor={checkboxId} className={clsx('alt-checkbox', className, {
    'alt-checkbox--danger': danger
  })}>
    <input
      id={checkboxId}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      {...props}
      className='alt-checkbox__input'
    />
    <div className='alt-checkbox__control'>
      {checked ? <div className='alt-checkbox__icon'>{CheckIconComponent || <Icon i='check' />}</div> : null}
      {label && <div className='alt-checkbox__label'>{label}</div>}
    </div>
  </label>
}

export default memo(Checkbox)