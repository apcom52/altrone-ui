import clsx from 'clsx';
import s from './icon.module.scss';
import { forwardRef } from 'react';
import { IconIslandProps } from '../TextInput.types.ts';

export const IconIsland = forwardRef<HTMLDivElement, IconIslandProps>(
  ({ icon, className, ...props }, ref) => {
    const cls = clsx(s.IconIsland, className);

    return (
      <div className={cls} ref={ref} {...props}>
        {icon}
      </div>
    );
  },
);
