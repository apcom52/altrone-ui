import {memo, useId} from "react";
import {Align} from "../../../types/Align";
import clsx from "clsx";
import './switcher.scss';

interface SwitcherProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  onChange: (checked: boolean) => void
  danger?: boolean
  align?: Align
}

const Switcher = ({ children, danger = false, align = Align.start, onChange, id, className, disabled, ...props }: SwitcherProps) => {
  const generatedSwitcherId = useId()

  const switcherId = id || generatedSwitcherId

  return <label htmlFor={switcherId} className={clsx('alt-switcher', className, {
    'alt-switcher--danger': danger,
    'alt-switcher--pin-end': align === Align.end,
    'alt-switcher--disabled': disabled
  })}>
    <input
      id={switcherId}
      type="checkbox"
      disabled={disabled}
      {...props}
      className='alt-switcher__input'
      onChange={e => onChange(e.target.checked)}
    />
    <div className='alt-switcher__indicator'></div>
    {children && <div className='alt-switcher__label'>{children}</div>}
  </label>
}

export default memo(Switcher)