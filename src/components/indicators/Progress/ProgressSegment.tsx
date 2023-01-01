import clsx from 'clsx';

export interface ProgressSegmentProps {
  index: number;
  isActive: boolean;
}

export const ProgressSegment = ({ isActive = false }: ProgressSegmentProps) => {
  return (
    <div
      className={clsx('alt-progress__segment', {
        'alt-progress__segment--active': isActive
      })}
      data-testid="alt-test-progress-segment"
    />
  );
};
