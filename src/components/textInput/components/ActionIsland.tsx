import { forwardRef, useImperativeHandle, useRef } from 'react';
import clsx from 'clsx';

export const ActionIsland = forwardRef((props, ref) => {
  const {
    icon,
    className,
    label,
    showLabel = true,
    disabled,
    danger,
    onClick,
  } = props;

  const islandRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      container: islandRef.current,
      placement: props.placement,
    }),
    [props.placement],
  );

  return (
    <button
      disabled={disabled}
      title={label}
      className={clsx(
        'alt-action-island',
        {
          'alt-action-island--danger': danger,
        },
        className,
      )}
      ref={islandRef}
      onClick={onClick}
    >
      {icon && <div className="alt-action-island__icon">{icon}</div>}
      {showLabel && <div className="alt-action-island__label">{label}</div>}
    </button>
  );
});
ActionIsland.displayName = 'TextInputActionIsland';
