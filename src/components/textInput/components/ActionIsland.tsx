import { forwardRef } from 'react';
import clsx from 'clsx';
import { ActionIslandProps } from '../TextInput.types.ts';
import s from './action.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const ActionIsland = forwardRef<HTMLButtonElement, ActionIslandProps>(
  (
    {
      showLabel = true,
      label,
      icon,
      className,
      placement,
      danger = false,
      style,
      ...restProps
    },
    ref,
  ) => {
    const { inputActionIsland: actionIslandConfig = {} } = useConfiguration();

    const cls = clsx(
      s.ActionIsland,
      {
        [s.LeftSide]: !placement || placement === 'left',
        [s.RightSide]: placement === 'right',
        [s.Danger]: danger,
      },
      className,
      actionIslandConfig.className,
    );

    const styles = {
      ...actionIslandConfig.style,
      ...style,
    };

    return (
      <button
        type="button"
        title={label}
        className={cls}
        ref={ref}
        style={styles}
        {...restProps}
      >
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        {showLabel ? <div className={s.Label}>{label}</div> : null}
      </button>
    );
  },
);
