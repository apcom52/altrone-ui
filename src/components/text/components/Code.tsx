import { memo } from 'react';
import { TextCodeProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './code.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const Code = memo(
  ({ children, className, bold, italic, style, ...props }: TextCodeProps) => {
    const { textCode = {} } = useConfiguration();

    const cls = clsx(s.Code, className, textCode.className, {
      [s.Bold]: bold,
      [s.Italic]: italic,
    });

    const styles = {
      ...textCode.style,
      ...style,
    };

    return (
      <code className={cls} style={styles} {...props}>
        {children}
      </code>
    );
  },
);
