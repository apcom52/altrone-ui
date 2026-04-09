import { memo } from 'react';
import { BottomNavigationItemProps } from '../BottomNavigation.types.ts';
import clsx from 'clsx';
import s from './item.module.scss';
import { RenderFuncProp } from 'types';
import { Badge } from 'components/badge/Badge.tsx';
import { motion, useAnimationControls } from 'framer-motion';
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
            // Extra animation on each backdrop move
            backdropControls.start({
              scale: [1, 0.85, 1],
              transition: { duration: 0.4, ease: 'easeInOut' },
            });
          }}
        />
      )}
      <div className={s.Icon}>{icon}</div>
      <div className={s.Label}>{label}</div>
      {badge ? <Badge className={s.Badge}>{badge}</Badge> : null}
    </a>
  );
};

export const Item = memo<BottomNavigationItemProps>((props) => {
  const {
    ref,
    className,
    renderFunc = bottomNavigationItemComponent,
    ...restProps
  } = props;

  const cls = clsx(
    s.Item,
    {
      [s.Selected]: props.selected,
    },
    className,
  );

  const styles = {
    ...props.style,
  };

  return renderFunc(ref ?? null, {
    ...restProps,
    className: cls,
    style: styles,
  });
});
