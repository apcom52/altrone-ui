import { memo } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarRenderDateProps } from '../Calendar.types';
import s from '../calendar.module.scss';

export const CalendarDate = memo<CalendarRenderDateProps>(
  ({
    currentDate,
    weekDay,
    fromAnotherMonth,
    today,
    selected,
    disabled,
    cursorHighlighted,
    inRange,
    rangeStart,
    rangeEnd,
    startOfWeek,
    endOfWeek,
    inRangeAbove,
    inRangeBelow,
    onSelect,
    onHover,
  }) => {
    const interactive = !disabled && !fromAnotherMonth;
    const banded = inRange || cursorHighlighted;
    const weekend = weekDay === 0 || weekDay === 6;

    /**
     * Round only the band's outer corners: a corner is rounded when the cell is
     * on the band's left/right edge for its row and there is no banded cell in
     * the adjacent row on that side (so the band "steps" between weeks with
     * square inner corners and rounded outer ones).
     */
    const bandLeftEdge = banded && (startOfWeek || rangeStart);
    const bandRightEdge = banded && (endOfWeek || rangeEnd);

    return (
      <button
        type="button"
        className={clsx(s.Date, {
          [s.OutsideMonth]: fromAnotherMonth,
          [s.Weekend]: weekend,
          [s.Today]: today,
          [s.Selected]: selected,
          [s.Disabled]: disabled,
          [s.InRange]: banded,
          [s.RangeStart]: rangeStart,
          [s.RangeEnd]: rangeEnd,
          [s.BandRoundTopLeft]: bandLeftEdge && !inRangeAbove,
          [s.BandRoundBottomLeft]: bandLeftEdge && !inRangeBelow,
          [s.BandRoundTopRight]: bandRightEdge && !inRangeAbove,
          [s.BandRoundBottomRight]: bandRightEdge && !inRangeBelow,
        })}
        data-full-date={currentDate.format('YYYY-MM-DD')}
        data-today={today || undefined}
        data-selected={selected || undefined}
        data-outside-month={fromAnotherMonth || undefined}
        data-in-range={banded || undefined}
        data-range-start={rangeStart || undefined}
        data-range-end={rangeEnd || undefined}
        data-start-of-week={startOfWeek || undefined}
        data-end-of-week={endOfWeek || undefined}
        disabled={disabled || fromAnotherMonth}
        aria-hidden={fromAnotherMonth || undefined}
        onClick={
          interactive && onSelect ? (e) => onSelect(currentDate, e) : undefined
        }
        onMouseEnter={
          interactive && onHover ? () => onHover(currentDate) : undefined
        }
      >
        <AnimatePresence>
          {selected ? (
            <motion.span
              className={s.SelectedPill}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, transition: { type: 'tween', duration: 0.12 } }}
              transition={{ type: 'spring', stiffness: 500, damping: 22, mass: 0.6 }}
            />
          ) : null}
        </AnimatePresence>
        <span className={s.DateLabel}>{currentDate.date()}</span>
      </button>
    );
  },
);
