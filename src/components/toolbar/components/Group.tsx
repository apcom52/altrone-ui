import { memo } from 'react';
import { ToolbarGroupProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';

export const Group = memo<ToolbarGroupProps>(
  ({ children, className, ...restProps }) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();

    const cls = clsx(s.Group, toolbarConfig.className);

    return (
      <div className={cls} {...restProps}>
        {children}
      </div>
    );
  },
);
