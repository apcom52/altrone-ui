import React from 'react';
import { Dayjs } from 'dayjs';

export type CalendarRenderDateProps = {
  currentDate: Dayjs;
  weekDay: number;
  fromAnotherMonth: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
  cursorHighlighted: boolean;
  autoClose?: boolean;
  onSelect?: (date: Dayjs, event: React.MouseEvent<HTMLButtonElement>) => void;
};

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  month: Dayjs;
  selectedDates?: Dayjs[];
  cursorDate?: Dayjs;
  onDateChange?: (date: Dayjs, event: React.MouseEvent<HTMLButtonElement>) => void;
  DateComponent?: React.FC<CalendarRenderDateProps>;
  disabled?: boolean;
  firstDayOfWeek?: 'monday' | 'sunday';
}
