import { memo } from 'react';
import './icon.scss';
import clsx from 'clsx';

type MaterialIconStyle = 'outlined' | 'rounded' | 'sharp';

interface IconProps {
  i: string;
  size?: number;
  className?: string;
  style?: MaterialIconStyle;
}

const Icon = ({ i, size, className, style = 'outlined', ...props }: IconProps) => {
  return (
    <span
      className={clsx('alt-icon', `material-symbols-${style}`, className)}
      style={{ fontSize: size || '1em' }}
      {...props}>
      {i}
    </span>
  );
};

export default memo(Icon);
