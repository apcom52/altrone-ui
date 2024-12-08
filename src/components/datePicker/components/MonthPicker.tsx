import { memo } from 'react';
import { generatePicker } from '../inner/generatePicker.tsx';
import { MonthPickerProps } from '../DatePicker.types.ts';

export const MonthPicker = memo(generatePicker<MonthPickerProps>('month'));
