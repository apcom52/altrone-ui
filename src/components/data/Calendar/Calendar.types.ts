export type CalendarRenderDateProps = {
  currentDate: Date;
  weekDay: number;
  fromAnotherMonth: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
  onSelect?: (date: Date) => void;
};

export interface CalendarProps {
  month: Date;
  selectedDates?: Date[];
  onDateChange?: (date: Date) => void;
  DateComponent?: React.FC<CalendarRenderDateProps>;
  disabled?: boolean;
  className?: string;
}
