import { memo, useEffect, useRef } from 'react';
import type { Dayjs } from 'dayjs';
import { Composite, CompositeItem } from '@floating-ui/react';
import { Calendar } from 'components/calendar';
import type {
  CalendarDateRange,
  CalendarRenderDateProps,
} from 'components/calendar/Calendar.types.ts';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import s from './dayPicker.module.scss';

/** Day cell wired into the popover's roving-tabindex grid. */
const renderCompositeDay = (props: CalendarRenderDateProps) => (
  <CompositeItem
    disabled={props.disabled || props.fromAnotherMonth}
    render={({ onSelect: _onSelect, ...htmlProps }) => (
      <Calendar.Date {...htmlProps} {...props} />
    )}
  />
);

export const DayPicker = memo<{ autoClose?: boolean }>(
  ({ autoClose = true }) => {
    const { picker, currentMonth, setCurrentMonth } =
      useDatePickerViewContext();
    const { selectedDates, onDayClicked, onRangeChange, minDate, maxDate } =
      useDateContext();
    const closePopup = useDatePickerCloseFn();

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      containerRef.current?.focus();
    }, []);

    const [from, to] = selectedDates;

    const shared = {
      month: currentMonth,
      onMonthChange: setCurrentMonth,
      showHeader: false,
      showWeekdays: true,
      minDate,
      maxDate,
      DateComponent: renderCompositeDay,
    } as const;

    return (
      <Composite
        orientation="both"
        cols={7}
        ref={containerRef}
        tabIndex={0}
        loop={false}
        className={s.Wrapper}
      >
        {picker === 'range' ? (
          <Calendar
            {...shared}
            mode="range"
            value={{ from, to }}
            isDateDisabled={
              from && !to ? (date) => date.isBefore(from, 'day') : undefined
            }
            onSelect={(next, event) => {
              const range = next as CalendarDateRange;
              onRangeChange?.(range, event);
              if (autoClose && range.from && range.to) {
                closePopup();
              }
            }}
          />
        ) : (
          <Calendar
            {...shared}
            mode="single"
            value={from}
            onSelect={(next, event) => {
              onDayClicked(next as Dayjs, event);
              if (autoClose) {
                closePopup();
              }
            }}
          />
        )}
      </Composite>
    );
  },
);
