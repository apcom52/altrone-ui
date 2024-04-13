import clsx from 'clsx';
import s from './text.module.scss';
import { TextIslandProps } from '../TextInput.types.ts';
import { memo } from 'react';

export const TextIsland = memo(
  ({ label, className, ...props }: TextIslandProps) => {
    const cls = clsx(s.TextIsland, className);

    return (
      <div className={cls} {...props}>
        {label}
      </div>
    );
  },
);
