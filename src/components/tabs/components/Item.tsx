import { forwardRef } from 'react';
import { TabsItemProps } from '../Tabs.types.ts';
import s from './item.module.scss';
import clsx from 'clsx';
import { RenderFuncProp } from '../../../types';
import { useConfiguration } from '../../configuration';
import { Badge } from 'components/badge/Badge.tsx';
import { motion } from 'framer-motion';

const tabItemRenderFunc: RenderFuncProp<HTMLAnchorElement, TabsItemProps> = (
  ref,
  props
) => {
  const { label, icon, showLabel = true, badge, ...restProps } = props;
  const { tabs: { item: tabsItemConfig = {} } = {} } = useConfiguration();

  const badgeCls = clsx(s.Badge, tabsItemConfig.badgeClassName);
  return (
    <a
      ref={ref}
      role="tab"
      aria-selected={props.selected}
      title={label}
      {...restProps}
    >
      {props.selected ? (
        <motion.div className={s.Backdrop} layoutId="tabs-backdrop" />
      ) : null}
      {icon ? <div className={s.Icon}>{icon}</div> : null}
      {showLabel ? <div className={s.Label}>{label}</div> : null}
      {badge ? <Badge className={badgeCls}>{badge}</Badge> : null}
    </a>
  );
};

export const Item = forwardRef<HTMLAnchorElement, TabsItemProps>(
  (props, ref) => {
    const { tabs: { item: tabsItemConfig = {} } = {} } = useConfiguration();

    const { className, renderFunc = tabItemRenderFunc, ...restProps } = props;

    const cls = clsx(
      s.Item,
      {
        [s.Selected]: props.selected,
        [String(tabsItemConfig.selectedClassName)]:
          tabsItemConfig.selectedClassName && props.selected,
      },
      className,
      tabsItemConfig.className
    );

    return renderFunc(ref, {
      ...restProps,
      className: cls,
    });
  }
);
