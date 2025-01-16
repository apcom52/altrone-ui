import { memo, useCallback, useEffect, useRef } from 'react';
import { Calendar } from 'components/calendar';
import { DayButton } from './DayButton.tsx';
import s from './dayPicker.module.scss';
import {
  useDateContext,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { Composite } from '@floating-ui/react';
import { dayjsInstance as dayjs } from '../../calendar/Calendar.tsx';

export const DayPicker = memo<{ autoClose?: boolean }>(
  ({ autoClose = true }) => {
    const { currentMonth, setHoveredDate } = useDatePickerViewContext();
    const { selectedDates } = useDateContext();

    const onMouseLeave = useCallback(() => {
      setHoveredDate(undefined);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);

    const weekdays = dayjs.weekdaysMin(true);

    useEffect(() => {
      containerRef.current?.focus();
    }, []);

    return (
      <Composite
        orientation="both"
        cols={7}
        ref={containerRef}
        tabIndex={0}
        loop={false}
        className={s.Wrapper}
      >
        <div className={s.DayNames}>
          {weekdays.map((weekday, weekdayIndex) => (
            <div key={weekdayIndex} className={s.DayName}>
              {weekday.at(0)?.toUpperCase()}
            </div>
          ))}
        </div>
        <Calendar
          className={s.DayPicker}
          month={currentMonth}
          selectedDates={selectedDates}
          onMouseLeave={onMouseLeave}
          DateComponent={(props) => (
            <DayButton autoClose={autoClose} {...props} />
          )}
        />
      </Composite>
    );
  },
);
