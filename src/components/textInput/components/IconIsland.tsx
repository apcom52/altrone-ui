import clsx from 'clsx';
import s from './icon.module.scss';
import { forwardRef } from 'react';
import { IconIslandProps } from '../TextInput.types.ts';

export const IconIsland = forwardRef<HTMLDivElement, IconIslandProps>(
  ({ icon, className, style, ...props }, ref) => {
    const cls = clsx(s.IconIsland, className);

    const styles = {
      ...style,
    };

    return (
      <div className={cls} style={styles} ref={ref} {...props}>
        {icon}
      </div>
    );
  },
);
