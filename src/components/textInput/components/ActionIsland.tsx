import { forwardRef } from 'react';
import clsx from 'clsx';
import { ActionIslandProps } from '../TextInput.types.ts';
import s from './action.module.scss';

export const ActionIsland = forwardRef<HTMLButtonElement, ActionIslandProps>(
  (
    {
      showLabel = true,
      label,
      icon,
      className,
      placement,
      danger = false,
      ...restProps
    },
    ref,
  ) => {
    const cls = clsx(
      s.ActionIsland,
      {
        [s.LeftSide]: !placement || placement === 'left',
        [s.RightSide]: placement === 'right',
        [s.Danger]: danger,
      },
      className,
    );

    return (
      <button
        type="button"
        title={label}
        className={cls}
        ref={ref}
        {...restProps}
      >
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        {showLabel ? <div className={s.Label}>{label}</div> : null}
      </button>
    );
  },
);
