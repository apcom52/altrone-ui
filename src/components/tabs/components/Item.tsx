import { isValidElement, memo } from 'react';
import { TabsItemProps } from '../Tabs.types.ts';
import s from './item.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../../configuration';
import { Badge } from 'components/badge/Badge.tsx';
import { motion, useAnimationControls } from 'motion/react';
import { useTabsContext } from '../Tabs.context.ts';
import { Slot } from 'utils/components/Slot.tsx';

type TabItemContentProps = Omit<TabsItemProps, 'renderFunc' | 'asChild' | 'children'>;

// Separate component so hooks are called correctly
const TabItemContent = memo(
  ({ ref, label, icon, showLabel = true, badge, selected, ...restProps }: TabItemContentProps) => {
    const { tabs: { item: tabsItemConfig = {} } = {} } = useConfiguration();
    const { backdropId } = useTabsContext();
    const backdropControls = useAnimationControls();

    const badgeCls = clsx(s.Badge, tabsItemConfig.badgeClassName);

    return (
      <a ref={ref} role="tab" aria-selected={selected} title={label} {...restProps}>
        {selected ? (
          <motion.div
            animate={backdropControls}
            layout
            layoutId={backdropId}
            className={s.Backdrop}
            onLayoutAnimationStart={() => {
              backdropControls.start({
                scale: [1, 0.85, 1],
                transition: { duration: 0.4, ease: 'easeInOut' },
              });
            }}
          />
        ) : null}
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        {showLabel ? <div className={s.Label}>{label}</div> : null}
        {badge ? <Badge className={badgeCls}>{badge}</Badge> : null}
      </a>
    );
  },
);

export const Item = memo(
  ({ ref, className, renderFunc, asChild, children, ...restProps }: TabsItemProps) => {
    const { tabs: { item: tabsItemConfig = {} } = {} } = useConfiguration();

    const cls = clsx(
      s.Item,
      {
        [s.Selected]: restProps.selected,
        [tabsItemConfig.selectedClassName!]:
          tabsItemConfig.selectedClassName && restProps.selected,
      },
      className,
      tabsItemConfig.className,
    );

    if (renderFunc) {
      return renderFunc(ref ?? null, { ...restProps, className: cls });
    }

    if (asChild) {
      if (!isValidElement(children)) {
        console.error('[Tabs.Item] asChild requires a valid React element as children');
        return null;
      }
      return (
        <Slot
          ref={ref}
          className={cls}
          role="tab"
          aria-selected={restProps.selected}
          {...restProps}
        >
          {children}
        </Slot>
      );
    }

    return <TabItemContent ref={ref} className={cls} {...restProps} />;
  },
);
