import { memo, useCallback } from 'react';
import { Calendar } from '../../calendar';
import { DayButton } from './DayButton.tsx';
import s from './dayPicker.module.scss';
import {
  useDateContext,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';

export const DayPicker = memo(() => {
  const { currentMonth, hoveredDate, setHoveredDate } =
    useDatePickerViewContext();
  const { selectedDates } = useDateContext();

  const onMouseLeave = useCallback(() => {
    setHoveredDate(undefined);
  }, []);

  // const onSelectDate = useCallback(
  //   (date: Date) => {
  //     const selectedDate = dayjs(date);
  //
  //     if (!isDateRange) {
  //       onChange('both', selectedDate, undefined);
  //       return;
  //     }
  //
  //     if (!startSelectedDate) {
  //       onChange('start', selectedDate);
  //     } else if (!endSelectedDate) {
  //       onChange('end', selectedDate);
  //       setHoveredDate(undefined);
  //     } else {
  //       onChange('both', selectedDate, undefined);
  //     }
  //   },
  //   [isDateRange, startSelectedDate, endSelectedDate, onChange],
  // );

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
        onMouseLeave={onMouseLeave}
        DateComponent={(props) => <DayButton {...props} />}
      />
    </>
  );
});
