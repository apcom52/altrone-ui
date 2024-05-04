import { memo } from 'react';
import { Calendar } from '../../calendar';
import { DayButton } from './DayButton.tsx';
import s from './dayPicker.module.scss';
import {
  useDateContext,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';

export const DayPicker = memo(() => {
  const { currentMonth } = useDatePickerViewContext();
  const { selectedDates, onChange } = useDateContext();

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
        month={currentMonth.toDate()}
        selectedDates={selectedDates}
        onDateChange={onChange}
        DateComponent={(props) => <DayButton {...props} />}
      />
    </>
  );
});
