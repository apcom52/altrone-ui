import {forwardRef, memo, RefObject} from "react";
import './toolbar-action.scss';
import clsx from "clsx";

interface ToolbarActionProps {
  icon: JSX.Element,
  label: string
  onClick: () => void
  active?: boolean
  disabled?: boolean
  danger?: boolean
  className?: string
}

const ToolbarAction = forwardRef(({ icon, label, onClick, active = false, disabled = false, danger = false, className }: ToolbarActionProps, ref: RefObject<HTMLButtonElement>) => {
  return <button
    className={clsx('alt-toolbar-action', className, {
      'alt-toolbar-action--disabled': disabled,
      'alt-toolbar-action--active': active,
      'alt-toolbar-action--danger': danger,
    })}
    type='button'
    title={label}
    disabled={disabled}
    ref={ref}
    onClick={onClick}
  >
    <div className='alt-toolbar-action__icon'>{icon}</div>
    <div className='alt-toolbar-action__label'>{label}</div>
  </button>
})

export default memo(ToolbarAction)