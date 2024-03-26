import { Align, Direction, Gap } from 'types';

export const gapStoryField = {
  control: 'select',
  options: [
    Gap.none,
    Gap.xsmall,
    Gap.small,
    Gap.medium,
    Gap.large,
    Gap.xlarge,
    Gap.heading,
  ],
};

export const alignStoryField = {
  control: 'select',
  options: [Align.start, Align.center, Align.end],
};

export const directionStoryField = {
  control: 'select',
  options: [Direction.vertical, Direction.horizontal],
};
