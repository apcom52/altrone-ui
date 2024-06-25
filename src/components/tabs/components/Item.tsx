import { forwardRef } from 'react';
import { TabsItemProps } from '../Tabs.types.ts';
import s from './item.module.scss';
import { useRainbowEffect } from 'components/application';
import clsx from 'clsx';
import { RenderFuncProp } from '../../../types';
import { useConfiguration } from '../../configuration';

const tabItemRenderFunc: RenderFuncProp<HTMLAnchorElement, TabsItemProps> = (
  ref,
  props,
) => {
  const { label, icon, ...restProps } = props;

  return (
    <a ref={ref} {...restProps}>
      {icon ? <div className={s.Icon}>{icon}</div> : null}
      {label}
    </a>
  );
};

export const Item = forwardRef<HTMLAnchorElement, TabsItemProps>(
  (props, ref) => {
    const { tabs = {} } = useConfiguration();

    const { className, renderFunc = tabItemRenderFunc, ...restProps } = props;

    const rainbowEffectActive =
      typeof tabs.rainbowEffect === 'boolean' ? tabs.rainbowEffect : true;

    const rainbowProps = useRainbowEffect(rainbowEffectActive, {
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
