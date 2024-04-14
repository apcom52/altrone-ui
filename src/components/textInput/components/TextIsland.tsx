import clsx from 'clsx';
import s from './text.module.scss';
import { TextIslandProps } from '../TextInput.types.ts';
import { forwardRef } from 'react';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const TextIsland = forwardRef<HTMLDivElement, TextIslandProps>(
  ({ label, className, style, ...props }, ref) => {
    const { inputTextIsland: textIslandConfig = {} } = useConfiguration();

    const cls = clsx(s.TextIsland, className, textIslandConfig.className);

    const styles = {
      ...textIslandConfig.style,
      ...style,
    };

    return (
      <div className={cls} style={styles} ref={ref} {...props}>
        {label}
      </div>
    );
  },
);
