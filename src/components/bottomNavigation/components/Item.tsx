import { forwardRef } from 'react';
import { BottomNavigationItemProps } from '../BottomNavigation.types.ts';
import clsx from 'clsx';
import s from './item.module.scss';
import { useConfiguration } from 'components/configuration';
import { RenderFuncProp } from 'types';
import { Badge } from 'components/badge/Badge.tsx';
import { motion, useAnimate, useAnimationControls } from 'framer-motion';
import { useBottomNavigationContext } from '../BottomNavigation.context.tsx';

const bottomNavigationItemComponent: RenderFuncProp<
  HTMLAnchorElement,
  BottomNavigationItemProps
> = (ref, props) => {
  const { icon, label, badge, selected, ...restProps } = props;
  const bottomNavigationId = useBottomNavigationContext();

  const backdropControls = useAnimationControls();

  return (
    <a ref={ref} {...restProps}>
      {selected && (
        <motion.div
          animate={backdropControls}
          layout
          layoutId={`${bottomNavigationId}-backdrop`}
          className={s.Backdrop}
          onLayoutAnimationStart={() => {
            // 🔥 Дополнительная анимация при каждом перемещении
            backdropControls.start({
              scale: [1, 0.85, 1],
              transition: { duration: 0.4, ease: 'easeInOut' },
            });
          }}
        />
      )}
      <div className={s.Icon}>{icon}</div>
      <div className={s.Label}>{label}</div>
      {/* {badge ? <Badge className={s.Badge}>{badge}</Badge> : null} */}
    </a>
  );
};

export const Item = forwardRef<HTMLAnchorElement, BottomNavigationItemProps>(
  (props, ref) => {
    const { bottomNavigation: bottomNavigationConfig = {} } =
      useConfiguration();
    const { item: bottomNavigationItemConfig = {} } = bottomNavigationConfig;

    const {
      className,
      renderFunc = bottomNavigationItemComponent,
      ...restProps
    } = props;

    const cls = clsx(
      s.Item,
      {
        [s.Selected]: props.selected,
        [String(bottomNavigationConfig.selectedItemClassName)]:
          bottomNavigationConfig.selectedItemClassName && props.selected,
        [String(bottomNavigationItemConfig.selectedItemClassName)]:
          bottomNavigationItemConfig.selectedItemClassName && props.selected,
      },
      bottomNavigationItemConfig.className,
      className
    );

    const styles = {
      ...bottomNavigationItemConfig.style,
      ...props.style,
    };

    return renderFunc(ref, {
      ...restProps,
      className: cls,
      style: styles,
    });
  }
);
