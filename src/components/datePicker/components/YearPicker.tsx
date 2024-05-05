import { memo } from 'react';
import { generatePicker } from '../inner/generatePicker.tsx';
import { YearPickerProps } from '../DatePicker.types.ts';

export const YearPicker = memo(generatePicker<YearPickerProps>('year', 'YYYY'));
