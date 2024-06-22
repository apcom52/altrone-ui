import { memo } from 'react';
import { TextKeyboardProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './keyboard.module.scss';
import { useConfiguration } from 'components/configuration';

export const Keyboard = memo(
  ({ children, className, bold, style, ...props }: TextKeyboardProps) => {
    const { text: { keyboard: keyboardConfig = {} } = {} } = useConfiguration();

    const cls = clsx(
      s.Keyboard,
      {
        [s.Bold]: bold,
      },
      className,
      keyboardConfig.className,
    );

    const styles = {
      ...keyboardConfig.style,
      ...style,
    };

    return (
      <kbd className={cls} style={styles} {...props}>
        {children}
      </kbd>
    );
  },
);
