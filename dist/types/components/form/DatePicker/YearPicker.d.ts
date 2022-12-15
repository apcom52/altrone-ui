/// <reference types="react" />
import { CalendarProps } from "./Calendar";
export interface YearPickerProps extends CalendarProps {
    minYear: number;
    maxYear: number;
}
declare const _default: import("react").MemoExoticComponent<({ selectedDate, onChange, minYear, maxYear }: YearPickerProps) => JSX.Element>;
export default _default;
