import {memo} from "react";
import './toolbar-action.scss';
import clsx from "clsx";

interface ToolbarActionProps {
  icon: JSX.Element,
  label: string
  active?: boolean
  disabled?: boolean
  danger?: boolean
}

const ToolbarAction = ({ icon, label, active = false, disabled = false, danger = false }: ToolbarActionProps) => {
  return <button className={clsx('alt-toolbar-action')} type='button' title={label}>
    <div className='alt-toolbar-action__icon'>{icon}</div>
    <div className='alt-toolbar-action__label'>{label}</div>
  </button>
}

export default memo(ToolbarAction)