import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ActionIslandProps, IconIslandProps, IslandRef, TextIslandProps } from '../TextInput.types';
import './action-island.scss';
import clsx from 'clsx';

export const ActionIsland = forwardRef<IslandRef, ActionIslandProps>((props, ref) => {
  const { icon, className, label, showLabel = true, disabled, danger, onClick } = props;

  const islandRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      container: islandRef.current,
      placement: props.placement
    }),
    [props.placement]
  );

  return (
    <button
      disabled={disabled}
      title={label}
      className={clsx(
        'alt-action-island',
        {
          'alt-action-island--danger': danger
        },
        className
      )}
      ref={islandRef}
      onClick={onClick}>
      {icon && <div className="alt-action-island__icon">{icon}</div>}
      {showLabel && <div className="alt-action-island__label">{label}</div>}
    </button>
  );
});
ActionIsland.displayName = 'TextInputActionIsland';
