import { forwardRef } from 'react';
import { TabsItemProps } from '../Tabs.types.ts';
import s from './item.module.scss';
import { useRainbowEffect } from '../../application/RainbowEffect.tsx';
import clsx from 'clsx';

export const Item = forwardRef<HTMLAnchorElement, TabsItemProps>(
  ({ label, className, selected, ...restProps }, ref) => {
    const rainbowProps = useRainbowEffect();

    const cls = clsx(
      s.Item,
      {
        [s.Selected]: selected,
      },
      className,
    );

    return (
      <a className={cls} ref={ref} {...restProps} {...rainbowProps}>
        {label}
      </a>
    );
  },
);
