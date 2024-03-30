import { memo } from 'react';
import { TextKeyboardProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './keyboard.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const Keyboard = memo(
  ({ children, className, bold, style, ...props }: TextKeyboardProps) => {
    const { textKeyboard = {} } = useConfiguration();

    const cls = clsx(
      s.Keyboard,
      {
        [s.Bold]: bold,
      },
      className,
      textKeyboard.className,
    );

    const styles = {
      ...textKeyboard.style,
      ...style,
    };

    return (
      <kbd className={cls} style={styles} {...props}>
        {children}
      </kbd>
    );
  },
);
