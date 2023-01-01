import { memo } from 'react';
import './progress.scss';
import { Role, Size } from '../../../types';
import clsx from 'clsx';
import { ProgressSegment, ProgressSegmentProps } from './ProgressSegment';

export enum ProgressVariant {
  default = 'default',
  segmented = 'segmented'
}

interface ProgressProps {
  value: number;
  max?: number;
  size?: Size;
  role?: Role;
  variant?: ProgressVariant;
  className?: string;
  ProgressSegmentComponent?: React.FC<ProgressSegmentProps>;
}

const Progress = ({
  variant = ProgressVariant.default,
  value = 0,
  max = 100,
  role = Role.default,
  size = Size.medium,
  className,
  ProgressSegmentComponent = ProgressSegment
}: ProgressProps) => {
  const percent = Math.round((value / max) * 100);

  return (
    <div
      className={clsx('alt-progress', className, {
        'alt-progress--size-small': size === Size.small,
        'alt-progress--size-large': size === Size.large,
        'alt-progress--variant-segmented': variant === ProgressVariant.segmented,
        'alt-progress--primary': role === Role.primary,
        'alt-progress--success': role === Role.success,
        'alt-progress--danger': role === Role.danger
      })}
      data-testid="alt-test-progress">
      {variant === ProgressVariant.default && (
        <div
          className="alt-progress__active"
          style={{ width: percent + '%' }}
          data-testid="alt-test-progress-active"
        />
      )}
      {variant === ProgressVariant.segmented &&
        new Array(max).fill(0).map((_, segmentIndex) => {
          return (
            <ProgressSegmentComponent
              key={segmentIndex}
              index={segmentIndex}
              isActive={segmentIndex < value}
            />
          );
        })}
    </div>
  );
};

export default memo(Progress);
