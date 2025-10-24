import { memo } from 'react';
import { ToolbarLeadingProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';

export const Leading = memo<ToolbarLeadingProps>(
  ({ children, className, style, ...restProps }) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();

    const cls = clsx(s.Leading, className, toolbarConfig.className);

    const styles = {
      ...style,
    };

    return (
      <>
        <div className={cls} style={styles} {...restProps}>
          {children}
        </div>
        <div className={s.Separator} />
      </>
    );
  }
);
