import { memo } from 'react';
import clsx from 'clsx';
import { LoadingProps } from './Loading.types.ts';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import s from './loading.module.scss';

import type {} from 'ldrs';
import 'ldrs/ring';

export const Loading = memo<LoadingProps>(
  ({
    color,
    size = '24px',
    strokeWidth = '2px',
    className,
    style,
    ...restProps
  }) => {
    const { loading: loadingConfig = {} } = useConfiguration();

    const currentColor = color || loadingConfig.color || 'var(--loadingColor)';

    const cls = clsx(s.Loading, className, loadingConfig.className);
    const styles = {
      ...loadingConfig.style,
      ...style,
    };

    return (
      <div className={cls} style={styles} {...restProps}>
        <l-ring size={size} stroke={strokeWidth} color={currentColor}></l-ring>
      </div>
    );
  },
);
