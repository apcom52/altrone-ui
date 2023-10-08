export type CalendarRenderDateProps = {
  currentDate: Date;
  weekDay: number;
  isAnotherMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

export interface CalendarProps {
  month: Date;
  selectedDates?: Date[];
  onDateChange?: (date: Date) => void;
  DateComponent?: React.FC<CalendarRenderDateProps>;
  disabled?: boolean;
  className?: string;
}
