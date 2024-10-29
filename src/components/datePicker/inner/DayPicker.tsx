import { memo, useCallback, useRef } from 'react';
import { Calendar } from 'components/calendar';
import { DayButton } from './DayButton.tsx';
import s from './dayPicker.module.scss';
import {
  useDateContext,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { useKeyboardSupport } from '../useKeyboardSupport.ts';

export const DayPicker = memo(() => {
  const { currentMonth, setHoveredDate } = useDatePickerViewContext();
  const { selectedDates } = useDateContext();

  const onMouseLeave = useCallback(() => {
    setHoveredDate(undefined);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const weeks =
    currentMonth.endOf('month').week() -
    currentMonth.startOf('month').week() +
    1;

  console.log('weeks', weeks);

  useKeyboardSupport(containerRef, {
    rows: weeks,
    columns: 7,
    index: selectedDates[0].date(),
    minIndex: 1,
    maxIndex: currentMonth.endOf('month').date(),
  });

  return (
    <div ref={containerRef}>
      <div className={s.DayNames}>
        <div className={s.DayName}>M</div>
        <div className={s.DayName}>T</div>
        <div className={s.DayName}>W</div>
        <div className={s.DayName}>T</div>
        <div className={s.DayName}>F</div>
        <div className={s.DayName}>S</div>
        <div className={s.DayName}>S</div>
      </div>
      <Calendar
        className={s.DayPicker}
        month={currentMonth}
        selectedDates={selectedDates}
        onMouseLeave={onMouseLeave}
        DateComponent={(props) => <DayButton {...props} />}
      />
    </div>
  );
});
