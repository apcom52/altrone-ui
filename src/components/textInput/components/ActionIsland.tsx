import { forwardRef } from 'react';
import clsx from 'clsx';
import { ActionIslandProps } from '../TextInput.types.ts';
import s from './action.module.scss';
import { useConfiguration } from 'components/configuration';
import { HTMLMotionProps, motion } from 'motion/react';

export const ActionIsland = forwardRef<
  HTMLMotionProps<'button'>,
  ActionIslandProps
>(
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
    ref
  ) => {
    const { textInput: { actionIsland: actionIslandConfig = {} } = {} } =
      useConfiguration();

    const cls = clsx(
      s.ActionIsland,
      {
        [s.LeftSide]: !placement || placement === 'left',
        [s.RightSide]: placement === 'right',
        [s.Danger]: danger,
        [s.OnlyIcon]: icon && showLabel === false,
      },
      className,
      actionIslandConfig.className
    );

    const styles = {
      ...actionIslandConfig.style,
      ...style,
    };

    return (
      <motion.button
        type="button"
        title={label}
        className={cls}
        ref={ref}
        style={styles}
        whileTap={{ scale: 0.98 }}
        {...restProps}
      >
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        {showLabel ? <div className={s.Label}>{label}</div> : null}
      </motion.button>
    );
  }
);
