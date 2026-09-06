import React, { memo, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import { dayjsInstance as dayjs } from 'utils';
import { useLocalizationContext } from '../application/useLocalization';
import {
  CalendarDateRange,
  CalendarProps,
  CalendarRenderDateProps,
  CalendarSelection,
} from './Calendar.types';
import {
  buildCalendarGrid,
  getMonthCaption,
  getWeekdayNames,
  nextRange,
  orderRange,
  resolveBcp47,
  resolveFirstWeekday,
} from './calendarUtils';
import { CalendarDate } from './components/CalendarDate';
import { CalendarHeader } from './components/CalendarHeader';
import s from './calendar.module.scss';

const EMPTY_DATES: Dayjs[] = [];

const asArray = (value: CalendarSelection): Dayjs[] =>
  Array.isArray(value) ? value : EMPTY_DATES;

const asRange = (value: CalendarSelection): CalendarDateRange =>
  value && typeof value === 'object' && !Array.isArray(value) && !dayjs.isDayjs(value)
    ? (value as CalendarDateRange)
    : {};

const CalendarComponent = memo(
  ({
    ref,
    className,
    style,
    mode,
    value,
    defaultValue,
    onSelect,
    month,
    defaultMonth,
    onMonthChange,
    firstDayOfWeek = 'auto',
    locale,
    minDate,
    maxDate,
    isDateDisabled,
    disabled,
    showHeader,
    showNavigation = true,
    showWeekdays,
    showOutsideDays = true,
    DateComponent = CalendarDate,
    selectedDates,
    cursorDate,
    onDateChange,
    ...restProps
  }: CalendarProps) => {
    const { language } = useLocalizationContext();
    const bcp47 = resolveBcp47(language, locale);

    const isControlledMonth = month !== undefined;
    const [internalMonth, setInternalMonth] = useState<Dayjs>(
      month ?? defaultMonth ?? dayjs(),
    );
    const displayMonth = month ?? internalMonth;

    const isControlledValue = value !== undefined;
    const [internalValue, setInternalValue] = useState<CalendarSelection>(
      defaultValue ?? (mode === 'multiple' ? EMPTY_DATES : mode === 'range' ? {} : undefined),
    );
    const selection = isControlledValue ? value : internalValue;

    const [hoveredDate, setHoveredDate] = useState<Dayjs | undefined>(undefined);

    const firstWeekday = useMemo(
      () => resolveFirstWeekday(bcp47, firstDayOfWeek),
      [bcp47, firstDayOfWeek],
    );
    const weekdayNames = useMemo(
      () => getWeekdayNames(bcp47, firstWeekday),
      [bcp47, firstWeekday],
    );
    const grid = useMemo(
      () => buildCalendarGrid(displayMonth, firstWeekday),
      [displayMonth, firstWeekday],
    );

    const changeMonth = useCallback(
      (next: Dayjs) => {
        if (!isControlledMonth) setInternalMonth(next);
        onMonthChange?.(next);
      },
      [isControlledMonth, onMonthChange],
    );

    const selectedDatesResolved = useMemo<Dayjs[]>(() => {
      if (!mode) return selectedDates ?? EMPTY_DATES;
      if (mode === 'single') return dayjs.isDayjs(selection) ? [selection] : EMPTY_DATES;
      if (mode === 'multiple') return asArray(selection);
      const range = asRange(selection);
      return [range.from, range.to].filter(Boolean) as Dayjs[];
    }, [mode, selection, selectedDates]);

    const effectiveRange = useMemo<CalendarDateRange | null>(() => {
      if (mode !== 'range') return null;
      const range = asRange(selection);
      if (range.from && range.to) return range;
      if (range.from && hoveredDate) {
        return orderRange({ from: range.from, to: hoveredDate });
      }
      if (range.from) return { from: range.from, to: range.from };
      return null;
    }, [mode, selection, hoveredDate]);

    const handleSelect = useCallback(
      (date: Dayjs, event: React.MouseEvent<HTMLButtonElement>) => {
        if (!mode) {
          onDateChange?.(date, event);
          return;
        }

        let next: CalendarSelection;
        if (mode === 'single') {
          next = date;
        } else if (mode === 'multiple') {
          const current = asArray(selection);
          next = current.some((d) => d.isSame(date, 'day'))
            ? current.filter((d) => !d.isSame(date, 'day'))
            : [...current, date];
        } else {
          next = nextRange(asRange(selection), date);
          setHoveredDate(undefined);
        }

        if (!isControlledValue) setInternalValue(next);
        onSelect?.(next, event);
      },
      [mode, selection, isControlledValue, onDateChange, onSelect],
    );

    const handleHover = useCallback(
      (date?: Dayjs) => {
        if (mode === 'range') setHoveredDate(date);
      },
      [mode],
    );

    const headerVisible = showHeader ?? Boolean(mode);
    const weekdaysVisible = showWeekdays ?? Boolean(mode);
    const hasChrome = headerVisible || weekdaysVisible;
    const cursor = cursorDate ? dayjs(cursorDate) : undefined;
    const rangeAnchor = selectedDates?.[0];

    /** Whether the (range or legacy cursor) band covers a given grid cell. */
    const isBanded = (date: Dayjs): boolean => {
      if (
        effectiveRange &&
        date.isSameOrAfter(effectiveRange.from, 'day') &&
        date.isSameOrBefore(effectiveRange.to, 'day')
      ) {
        return true;
      }
      if (cursor && rangeAnchor) {
        return (
          (date.isSameOrAfter(rangeAnchor, 'day') &&
            date.isSameOrBefore(cursor, 'day')) ||
          (date.isSameOrBefore(rangeAnchor, 'day') &&
            date.isSameOrAfter(cursor, 'day'))
        );
      }
      return false;
    };

    const bandedFlags = grid.map(isBanded);

    const days = grid.map((date, index) => {
      const fromAnotherMonth = !date.isSame(displayMonth, 'month');

      if (fromAnotherMonth && !showOutsideDays) {
        return <div key={index} className={s.Empty} aria-hidden />;
      }

      const column = index % 7;
      const selected = selectedDatesResolved.some((d) =>
        d?.isSame?.(date, 'day'),
      );
      const disabledDay =
        Boolean(disabled) ||
        Boolean(minDate && date.isBefore(minDate, 'day')) ||
        Boolean(maxDate && date.isAfter(maxDate, 'day')) ||
        Boolean(isDateDisabled?.(date));

      const inRange = effectiveRange
        ? date.isSameOrAfter(effectiveRange.from, 'day') &&
          date.isSameOrBefore(effectiveRange.to, 'day')
        : false;

      const cellProps: CalendarRenderDateProps = {
        currentDate: date,
        weekDay: date.day(),
        fromAnotherMonth,
        today: date.isToday(),
        selected,
        disabled: disabledDay,
        cursorHighlighted: Boolean(cursor && rangeAnchor) && bandedFlags[index],
        inRange,
        rangeStart: effectiveRange
          ? date.isSame(effectiveRange.from, 'day')
          : false,
        rangeEnd: effectiveRange
          ? date.isSame(effectiveRange.to, 'day')
          : false,
        startOfWeek: column === 0,
        endOfWeek: column === 6,
        inRangeAbove: index >= 7 ? bandedFlags[index - 7] : false,
        inRangeBelow: index < 35 ? bandedFlags[index + 7] : false,
        onSelect: handleSelect,
        onHover: handleHover,
      };

      return <DateComponent key={index} {...cellProps} />;
    });

    if (!hasChrome) {
      return (
        <div
          ref={ref}
          className={clsx(s.Calendar, s.Bare, className)}
          style={style}
          {...restProps}
        >
          {days}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(s.Calendar, className)}
        style={style}
        {...restProps}
      >
        {headerVisible ? (
          <CalendarHeader
            caption={getMonthCaption(displayMonth, bcp47)}
            showNavigation={showNavigation}
            onPrev={() => changeMonth(displayMonth.subtract(1, 'month'))}
            onNext={() => changeMonth(displayMonth.add(1, 'month'))}
          />
        ) : null}

        {weekdaysVisible ? (
          <div className={s.Weekdays}>
            {weekdayNames.map((name, index) => (
              <div key={index} className={s.Weekday}>
                {name}
              </div>
            ))}
          </div>
        ) : null}

        <div className={s.Grid}>{days}</div>
      </div>
    );
  },
);

export const Calendar = Object.assign(CalendarComponent, {
  Date: CalendarDate,
});
