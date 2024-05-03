import { memo } from 'react';
import { Calendar } from '../../calendar';
import { DayButton } from './DayButton.tsx';
import s from './dayPicker.module.scss';

export const DayPicker = memo(() => {
  return (
    <Calendar
      className={s.DayPicker}
      month={new Date(2024, 4)}
      DateComponent={(props) => <DayButton {...props} />}
    />
  );
});
