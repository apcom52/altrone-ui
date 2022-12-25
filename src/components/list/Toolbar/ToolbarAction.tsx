import { forwardRef, memo } from 'react';
import './toolbar-action.scss';
import clsx from 'clsx';
import { Indicator } from '../../../types';

interface ToolbarActionProps {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
  indicator?: Indicator;
}

const ToolbarAction = forwardRef<HTMLButtonElement, ToolbarActionProps>(
  (
    {
      icon,
      label,
      onClick,
      active = false,
      disabled = false,
      danger = false,
      className,
      indicator
    },
    ref
  ) => {
    return (
      <button
        className={clsx('alt-toolbar-action', className, {
          'alt-toolbar-action--disabled': disabled,
          'alt-toolbar-action--active': active,
          'alt-toolbar-action--danger': danger
        })}
        type="button"
        title={label}
        disabled={disabled}
        ref={ref}
        onClick={onClick}
        data-testid="alt-test-toolbarAction"
      >
        <div className="alt-toolbar-action__icon">{icon}</div>
        <div className="alt-toolbar-action__label">{label}</div>
        {indicator && (
          <div
            className={clsx('alt-toolbar-action__indicator', {
              'alt-toolbar-action__indicator--position-corner': indicator.position === 'corner'
            })}
          >
            {indicator.value}
          </div>
        )}
      </button>
    );
  }
);

export default memo(ToolbarAction);
