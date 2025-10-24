import { memo } from 'react';
import { ToolbarCenterProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';

export const Center = memo<ToolbarCenterProps>(
  ({ children, className, style, ...restProps }) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();

    const cls = clsx(s.Center, className, toolbarConfig.className);

    const styles = {
      ...style,
    };

    return (
      <div className={cls} style={styles} {...restProps}>
        {children}
      </div>
    );
  }
);
