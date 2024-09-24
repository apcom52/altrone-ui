import clsx from 'clsx';
import s from './icon.module.scss';
import { forwardRef } from 'react';
import { IconIslandProps } from '../TextInput.types.ts';
import { useConfiguration } from 'components/configuration';

export const IconIsland = forwardRef<HTMLDivElement, IconIslandProps>(
  ({ icon, className, style, ...props }, ref) => {
    const { textInput: { iconIsland: iconIslandConfig = {} } = {} } =
      useConfiguration();

    const cls = clsx(s.IconIsland, className, iconIslandConfig.className);

    const styles = {
      ...iconIslandConfig.style,
      ...style,
    };

    return (
      <div className={cls} style={styles} ref={ref} {...props}>
        {icon}
      </div>
    );
  },
);
