import { memo } from 'react';
import './progress.scss';
import { Role, Size } from '../../../types';
import clsx from 'clsx';
import { ProgressSegment, ProgressSegmentProps } from './ProgressSegment';

export enum ProgressVariant {
  default = 'default',
  segmented = 'segmented',
  circular = 'circular'
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

const CIRCULAR_PROGRESS_DIAMETERS: Record<Size, number> = {
  [Size.small]: 26,
  [Size.medium]: 34,
  [Size.large]: 42
};

/**
 * Progress indicators let people know that your application loads content or performs lengthy operations.

 * @component
 * @param variant - Variant of the progress
 * @param { number } value - Current value of the progress
 * @param { number } max - Maximum value of the progress
 * @param role - Current role of the progress
 * @param { Size } size - Size of the progress. See {@link Size} size
 * @param className - custom className for Progress
 * @param ProgressSegmentComponent - custom component for segment
 */
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

  const boxSize = CIRCULAR_PROGRESS_DIAMETERS[size];
  const borderSize = Math.floor(CIRCULAR_PROGRESS_DIAMETERS[size] * 0.12);
  const circleCenter = boxSize / 2;
  const diameter = boxSize - borderSize * 2;
  const radius = diameter / 2;
  const circleValue = 2 * Math.PI * radius * (value / max);

  return (
    <div
      className={clsx('alt-progress', className, {
        'alt-progress--size-small': size === Size.small,
        'alt-progress--size-large': size === Size.large,
        'alt-progress--variant-segmented': variant === ProgressVariant.segmented,
        'alt-progress--variant-circular': variant === ProgressVariant.circular,
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
      {variant === ProgressVariant.circular && (
        <svg width={boxSize} height={boxSize} viewBox={`0 0 ${boxSize} ${boxSize}`}>
          <circle
            cx={circleCenter}
            cy={circleCenter}
            r={radius}
            strokeWidth={borderSize}
            className="alt-progress__circle"
          />
          <circle
            cx={circleCenter}
            cy={circleCenter}
            r={radius}
            strokeWidth={borderSize}
            className="alt-progress__circle alt-progress__circle--active"
            strokeDasharray={`${circleValue} 360`}
          />
        </svg>
      )}
    </div>
  );
};

export default Progress;
