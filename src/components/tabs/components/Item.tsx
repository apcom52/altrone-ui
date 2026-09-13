import { isValidElement, memo, ReactElement, Ref } from 'react';
import { TabsItemProps } from '../Tabs.types.ts';
import s from './item.module.scss';
import clsx from 'clsx';
import { Text } from 'components/text/Text.tsx';
import { Badge } from 'internal/badge';
import { motion, useAnimationControls } from 'motion/react';
import { useTabsContext } from '../Tabs.context.ts';
import { Slot } from 'utils/components/Slot.tsx';

type TabItemContentProps = Omit<
  TabsItemProps,
  'renderFunc' | 'asChild' | 'children'
>;

/* Separate component so its hooks aren't conditional on `renderFunc`/`asChild`. */
const TabItemContent = memo(
  ({
    ref,
    label,
    icon,
    showLabel = true,
    badge,
    selected,
    disabled,
    href,
    ...restProps
  }: TabItemContentProps) => {
    const { backdropId } = useTabsContext();
    const backdropControls = useAnimationControls();

    const inner = (
      <>
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
        {showLabel ? <Text className={s.Label}>{label}</Text> : null}
        {badge ? (
          <Badge className={s.Badge} size="s">
            {badge}
          </Badge>
        ) : null}
      </>
    );

    const shared: Record<string, unknown> = {
      role: 'tab',
      'aria-selected': Boolean(selected),
      'aria-disabled': disabled || undefined,
      'aria-label': showLabel ? undefined : label,
      tabIndex: selected ? 0 : -1,
      title: label,
      ...restProps,
    };

    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          {...shared}
        >
          {inner}
        </a>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        disabled={disabled}
        {...shared}
        type="button"
      >
        {inner}
      </button>
    );
  },
);

export const Item = memo(
  ({
    ref,
    className,
    renderFunc,
    asChild,
    children,
    ...restProps
  }: TabsItemProps) => {
    const cls = clsx(
      s.Item,
      {
        [s.Selected]: restProps.selected,
        [s.Disabled]: restProps.disabled,
      },
      className,
    );

    if (renderFunc) {
      return renderFunc((ref ?? null) as Ref<HTMLAnchorElement>, {
        ...restProps,
        className: cls,
      });
    }

    if (asChild) {
      if (!isValidElement(children)) {
        console.error(
          '[Tabs.Item] asChild requires a valid React element as children',
        );
        return null;
      }
      return (
        <Slot
          ref={ref}
          className={cls}
          role="tab"
          aria-selected={Boolean(restProps.selected)}
          aria-disabled={restProps.disabled || undefined}
          tabIndex={restProps.selected ? 0 : -1}
          {...restProps}
        >
          {children as ReactElement<Record<string, unknown>>}
        </Slot>
      );
    }

    return <TabItemContent ref={ref} className={cls} {...restProps} />;
  },
);
