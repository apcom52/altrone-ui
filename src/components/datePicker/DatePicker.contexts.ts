import { createContext, useContext } from 'react';
import {
  DatePickerContextType,
  DatePickerTriggerContextType,
  DatePickerViewContextType,
} from './DatePicker.types.ts';
import { dayjsInstance as dayjs } from 'utils';

export const DatePickerContext = createContext<DatePickerContextType>({
  selectedDates: [],
  onDayClicked: () => null,
});
export const useDateContext = () => useContext(DatePickerContext);

export const DatePickerViewContext = createContext<DatePickerViewContextType>({
  viewMode: 'day',
  picker: 'day',
  currentMonth: dayjs(),
  setCurrentMonth: () => null,
  setViewMode: () => null,
});
export const useDatePickerViewContext = () => useContext(DatePickerViewContext);

export const DatePickerCloseFnContext = createContext<() => void>(() => null);
export const useDatePickerCloseFn = () => useContext(DatePickerCloseFnContext);

export const DatePickerTriggerContext =
  createContext<DatePickerTriggerContextType | null>(null);

/**
 * Live trigger state (`value`, `displayValue`, `expanded`, `clear`) for a
 * component rendered inside a `DatePicker`'s `renderFunc` / `asChild` trigger.
 * Throws when used outside a `DatePicker` / `RangePicker`.
 */
export const useDatePickerTrigger = (): DatePickerTriggerContextType => {
  const context = useContext(DatePickerTriggerContext);

  if (!context) {
    throw new Error('useDatePickerTrigger must be used within a DatePicker');
  }

  return context;
};
