/// <reference types="react" />
export interface CalendarProps {
  currentMonth: Date;
  selectedDate: Date;
  onChange: (value: Date) => void;
}
declare const _default: import('react').MemoExoticComponent<
  ({ currentMonth, selectedDate, onChange }: CalendarProps) => JSX.Element
>;
export default _default;
