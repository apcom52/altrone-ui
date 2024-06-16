import { forwardRef } from 'react';
import { TabsItemProps } from '../Tabs.types.ts';
import s from './item.module.scss';
import { useRainbowEffect } from 'components/application';
import clsx from 'clsx';
import { RenderFuncProp } from '../../../types';

const tabItemRenderFunc: RenderFuncProp<HTMLAnchorElement, TabsItemProps> = (
  ref,
  props,
) => {
  const { label, ...restProps } = props;

  return (
    <a ref={ref} {...restProps}>
      {label}
    </a>
  );
};

export const Item = forwardRef<HTMLAnchorElement, TabsItemProps>(
  (props, ref) => {
    const { className, renderFunc = tabItemRenderFunc, ...restProps } = props;

    const rainbowProps = useRainbowEffect(true, {
      opacity: 1,
      blur: 36,
    });

    const cls = clsx(
      s.Item,
      {
        [s.Selected]: props.selected,
      },
      className,
    );

    return renderFunc(ref, {
      ...restProps,
      ...rainbowProps,
      className: cls,
    });
  },
);
