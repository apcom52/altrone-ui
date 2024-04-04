import { Align, Direction, Gap, Role } from 'types';

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

export const roleStoryField = {
  control: 'select',
  options: [
    Role.default,
    Role.primary,
    Role.success,
    Role.warning,
    Role.danger,
  ],
};
