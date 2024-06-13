import { forwardRef } from 'react';
import { TabsItemProps } from '../Tabs.types.ts';
import s from './item.module.scss';
import { useRainbowEffect } from 'components/application';
import clsx from 'clsx';

export const Item = forwardRef<HTMLAnchorElement, TabsItemProps>(
  ({ label, className, selected, ...restProps }, ref) => {
    const rainbowProps = useRainbowEffect(true, {
      opacity: 1,
      blur: 36,
    });

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
