import { createContext, useContext } from 'react';
import {
  DatePickerContextType,
  DatePickerViewContextType,
} from './DatePicker.types.ts';
import dayjs from 'dayjs';

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
  hoveredDate: undefined,
  setHoveredDate: () => null,
});
export const useDatePickerViewContext = () => useContext(DatePickerViewContext);

export const DatePickerCloseFnContext = createContext<() => void>(() => null);
export const useDatePickerCloseFn = () => useContext(DatePickerCloseFnContext);
