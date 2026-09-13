import React from 'react';
import { Dayjs } from 'dayjs';

export type CalendarMode = 'single' | 'multiple' | 'range';

export type CalendarFirstDayOfWeek = 'monday' | 'sunday' | 'auto';

export interface CalendarDateRange {
  from?: Dayjs;
  to?: Dayjs;
}

/**
 * Shape of the selected value, keyed by `mode`:
 * - `single`   → `Dayjs | undefined`
 * - `multiple` → `Dayjs[]`
 * - `range`    → `CalendarDateRange`
 */
export type CalendarSelection =
  | Dayjs
  | Dayjs[]
  | CalendarDateRange
  | undefined;

export type CalendarRenderDateProps = {
  currentDate: Dayjs;
  weekDay: number;
  fromAnotherMonth: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
  /** Legacy range preview driven by the low-level `cursorDate` prop. */
  cursorHighlighted: boolean;
  /** Day lies within the (possibly hover-previewed) range bounds. */
  inRange: boolean;
  rangeStart: boolean;
  rangeEnd: boolean;
  /** First / last rendered column of the week row — used to round the band. */
  startOfWeek: boolean;
  endOfWeek: boolean;
  /**
   * Whether the band also covers the cell directly above / below in the grid.
   * Lets the renderer round only the band's outer corners as it steps between
   * week rows.
   */
  inRangeAbove: boolean;
  inRangeBelow: boolean;
  autoClose?: boolean;
  onSelect?: (date: Dayjs, event: React.MouseEvent<HTMLButtonElement>) => void;
  onHover?: (date: Dayjs | undefined) => void;
};

export interface CalendarProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onSelect' | 'defaultValue'
  > {
  ref?: React.Ref<HTMLDivElement>;

  /**
   * High-level selection mode. When set, `Calendar` owns the selection state
   * (`value` / `defaultValue` / `onSelect`) and renders its own header.
   * Omit it to use the low-level `selectedDates` + `DateComponent` API.
   */
  mode?: CalendarMode;
  value?: CalendarSelection;
  defaultValue?: CalendarSelection;
  onSelect?: (
    value: CalendarSelection,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;

  /** Currently displayed month. Controlled via `month`, uncontrolled via `defaultMonth`. */
  month?: Dayjs;
  defaultMonth?: Dayjs;
  onMonthChange?: (month: Dayjs) => void;

  /** `'auto'` (default) resolves the first weekday from the active locale. */
  firstDayOfWeek?: CalendarFirstDayOfWeek;

  /** BCP-47 locale override; defaults to the active app language. */
  locale?: string;

  minDate?: Dayjs;
  maxDate?: Dayjs;
  isDateDisabled?: (date: Dayjs) => boolean;
  disabled?: boolean;

  /** Defaults: header/weekdays visible only in high-level (`mode`) usage. */
  showHeader?: boolean;
  showNavigation?: boolean;
  showWeekdays?: boolean;
  showOutsideDays?: boolean;

  /** Low-level: override the day-cell renderer. */
  DateComponent?: React.FC<CalendarRenderDateProps>;

  /** Low-level selection API, used when `mode` is omitted. */
  selectedDates?: Dayjs[];
  cursorDate?: Dayjs;
  onDateChange?: (
    date: Dayjs,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}
