import { Shadow } from 'types/entity';

export const BOX_LOWER_SHADOW: Record<Shadow, Shadow> = {
  none: 'none',
  inset: 'inset',
  '1': 'none',
  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
};

export const BOX_UPPER_SHADOW: Record<Shadow, Shadow> = {
  none: '2',
  inset: 'inset',
  '1': '2',
  '2': '3',
  '3': '4',
  '4': '5',
  '5': '5',
};
