import { forwardRef } from 'react';
import { ToolbarActionProps } from '../Toolbar.types.ts';
import s from './action.module.scss';
import clsx from 'clsx';
import { useToolbarContext } from '../Toolbar.context.ts';
import { useConfiguration } from 'components/configuration';

const actionRenderFunc: ToolbarActionProps['renderFunc'] = (ref, props) => {
  const { label, children, showLabel, compact, icon, ...restProps } = props;

  return (
    <button type="button" ref={ref} title={props.label} {...restProps}>
      {!children ? <div className={s.Icon}>{icon}</div> : null}
      {children ? <div className={s.CustomComponent}>{children}</div> : null}
      {(compact && showLabel) || !compact ? (
        <div className={s.Label}>{showLabel ? label : null}</div>
      ) : null}
    </button>
  );
};

export const Action = forwardRef<HTMLButtonElement, ToolbarActionProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

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

    return actionRenderFunc(ref, {
      ...restProps,
      className: cls,
      compact,
    });
  },
);
