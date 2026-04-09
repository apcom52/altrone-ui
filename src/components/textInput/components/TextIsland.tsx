import clsx from 'clsx';
import s from './text.module.scss';
import { TextIslandProps } from '../TextInput.types.ts';
import { forwardRef } from 'react';

export const TextIsland = forwardRef<HTMLDivElement, TextIslandProps>(
  ({ label, className, style, ...props }, ref) => {
    const cls = clsx(s.TextIsland, className);

    const styles = {
      ...style,
    };

    return (
      <div className={cls} style={styles} ref={ref} {...props}>
        {label}
      </div>
    );
  },
);
