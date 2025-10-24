import { memo } from 'react';
import { ToolbarTrailingProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';

export const Trailing = memo<ToolbarTrailingProps>(
  ({ children, className, style, ...restProps }) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();

    const cls = clsx(s.Trailing, className, toolbarConfig.className);

    const styles = {
      ...style,
    };

    return (
      <>
        <div className={s.Separator} />
        <div className={cls} style={styles} {...restProps}>
          {children}
        </div>
      </>
    );
  }
);
