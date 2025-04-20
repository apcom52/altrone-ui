import { forwardRef } from 'react';
import { ToolbarActionProps } from '../Toolbar.types.ts';
import s from './action.module.scss';
import clsx from 'clsx';
import { useToolbarContext } from '../Toolbar.context.ts';
import { useConfiguration } from 'components/configuration';
import { Badge } from 'components/badge/Badge.tsx';

const actionRenderFunc: ToolbarActionProps['renderFunc'] = (ref, props) => {
  const {
    label,
    children,
    showLabel = true,
    compact,
    icon,
    badge,
    ...restProps
  } = props;

  const { toolbar: { action: actionConfig = {} } = {} } = useConfiguration();

  const badgeCls = clsx(s.Badge, actionConfig.badgeClassName);

  return (
    <button type="button" ref={ref} title={props.label} {...restProps}>
      {!children ? <div className={s.Icon}>{icon}</div> : null}
      {children ? <div className={s.CustomComponent}>{children}</div> : null}
      {(compact && showLabel) || !compact ? (
        <div className={s.Label}>{showLabel ? label : null}</div>
      ) : null}
      {badge ? <Badge className={badgeCls}>{badge}</Badge> : null}
    </button>
  );
};

export const Action = forwardRef<HTMLButtonElement, ToolbarActionProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const { toolbar: toolbarConfig = {} } = useConfiguration();
    const { action: actionConfig = {} } = toolbarConfig;

    const { compact } = useToolbarContext();

    const cls = clsx(
      s.Action,
      {
        [s.Compact]: compact,
      },
      className,
      toolbarConfig.actionClassName,
      actionConfig.className,
    );

    const styles = {
      ...actionConfig.style,
      ...props.style,
    };

    return actionRenderFunc(ref, {
      ...restProps,
      className: cls,
      style: styles,
      compact,
    });
  },
);
