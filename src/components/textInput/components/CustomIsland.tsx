import { forwardRef } from 'react';
import clsx from 'clsx';
import { CustomIslandProps } from '../TextInput.types.ts';
import s from './custom.module.scss';
import { useConfiguration } from 'components/configuration';

export const CustomIsland = forwardRef<HTMLDivElement, CustomIslandProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;
    const { textInput: { customIsland: customIslandConfig = {} } = {} } =
      useConfiguration();

    const cls = clsx(s.CustomAction, className, customIslandConfig.className);

    const styles = {
      ...customIslandConfig.style,
      ...style,
    };

    return (
      <div className={cls} style={styles} ref={ref} {...restProps}>
        {children}
      </div>
    );
  },
);
CustomIsland.displayName = 'TextInputCustomIsland';
