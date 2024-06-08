import { memo, useCallback } from 'react';
import { Calendar } from 'components/calendar';
import { DayButton } from './DayButton.tsx';
import s from './dayPicker.module.scss';
import {
  useDateContext,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';

export const DayPicker = memo(() => {
  const { currentMonth, setHoveredDate } = useDatePickerViewContext();
  const { selectedDates } = useDateContext();

  const onMouseLeave = useCallback(() => {
    setHoveredDate(undefined);
  }, []);

  return (
    <>
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
    </>
  );
});
