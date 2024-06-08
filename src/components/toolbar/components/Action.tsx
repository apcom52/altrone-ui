import { forwardRef } from 'react';
import { ToolbarActionProps } from '../Toolbar.types.ts';
import s from './action.module.scss';
import clsx from 'clsx';
import { useToolbarContext } from '../Toolbar.context.ts';
import { useConfiguration } from 'components/configuration';

export const Action = forwardRef<HTMLButtonElement, ToolbarActionProps>(
  (
    { label, showLabel = true, icon, children, className, ...restProps },
    ref,
  ) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();
    const { compact } = useToolbarContext();

    const cls = clsx(
      s.Action,
      {
        [s.Compact]: compact,
      },
      className,
      toolbarConfig.actionClassName,
    );

    return (
      <button className={cls} ref={ref} title={label} {...restProps}>
        {!children ? <div className={s.Icon}>{icon}</div> : null}
        {children ? <div className={s.CustomComponent}>{children}</div> : null}
        {(compact && showLabel) || !compact ? (
          <div className={s.Label}>{showLabel ? label : null}</div>
        ) : null}
      </button>
    );
  },
);
