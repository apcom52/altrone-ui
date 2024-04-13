import clsx from 'clsx';
import s from './icon.module.scss';
import { memo } from 'react';
import { IconIslandProps } from '../TextInput.types.ts';

export const IconIsland = memo(
  ({ icon, className, ...props }: IconIslandProps) => {
    const cls = clsx(s.IconIsland, className);

    return (
      <div className={cls} {...props}>
        {icon}
      </div>
    );
  },
);
