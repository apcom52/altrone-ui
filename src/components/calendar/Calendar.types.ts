import { Dayjs } from 'dayjs';

export type CalendarRenderDateProps = {
  currentDate: Dayjs;
  weekDay: number;
  fromAnotherMonth: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
  cursorHighlighted: boolean;
  onSelect?: (date: Dayjs) => void;
};

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  month: Dayjs;
  selectedDates?: Dayjs[];
  cursorDate?: Dayjs;
  onDateChange?: (date: Dayjs) => void;
  DateComponent?: React.FC<CalendarRenderDateProps>;
  disabled?: boolean;
}
