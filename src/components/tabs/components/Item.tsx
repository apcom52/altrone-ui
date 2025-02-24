import { forwardRef } from 'react';
import { TabsItemProps } from '../Tabs.types.ts';
import s from './item.module.scss';
import clsx from 'clsx';
import { RenderFuncProp } from '../../../types';
import { useConfiguration } from '../../configuration';

const tabItemRenderFunc: RenderFuncProp<HTMLAnchorElement, TabsItemProps> = (
  ref,
  props,
) => {
  const { label, icon, showLabel = true, ...restProps } = props;

  return (
    <a ref={ref} role="tab" aria-selected={props.selected} {...restProps}>
      {icon ? <div className={s.Icon}>{icon}</div> : null}
      {showLabel ? <div>{label}</div> : null}
    </a>
  );
};

export const Item = forwardRef<HTMLAnchorElement, TabsItemProps>(
  (props, ref) => {
    const { tabs = {} } = useConfiguration();

    const { className, renderFunc = tabItemRenderFunc, ...restProps } = props;

    const cls = clsx(
      s.Item,
      {
        [s.Selected]: props.selected,
      },
      className,
      tabs.className,
    );

    return renderFunc(ref, {
      ...restProps,
      className: cls,
    });
  },
);
