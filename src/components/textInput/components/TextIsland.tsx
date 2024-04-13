import clsx from 'clsx';
import s from './text.module.scss';
import { TextIslandProps } from '../TextInput.types.ts';
import { forwardRef } from 'react';

export const TextIsland = forwardRef<HTMLDivElement, TextIslandProps>(
  ({ label, className, ...props }, ref) => {
    const cls = clsx(s.TextIsland, className);

    return (
      <div className={cls} ref={ref} {...props}>
        {label}
      </div>
    );
  },
);
