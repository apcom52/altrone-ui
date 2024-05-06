import { memo } from 'react';
import s from './footer.module.scss';
import { Button, Icon } from 'components';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import dayjs from 'dayjs';

export const DatePickerFooter = memo(() => {
  const { picker, setCurrentMonth } = useDatePickerViewContext();
  const { onDayClicked } = useDateContext();
  const closePopup = useDatePickerCloseFn();

  const currentDateButtonVisible = picker !== 'range';

  const currentDateLabel =
    picker === 'day'
      ? 'Today'
      : picker === 'month'
        ? 'This month'
        : 'This year';

  const onCurrentDateButtonClick = () => {
    let thisDay = dayjs();

    if (picker === 'month') {
      thisDay = thisDay.date(1);
    } else if (picker === 'year') {
      thisDay = thisDay.month(0).date(1);
    }

    setCurrentMonth(thisDay);
    onDayClicked(thisDay);
    closePopup();
  };

  return (
    <div className={s.Footer}>
      <Button transparent leftIcon={<Icon i="backspace" />} label="Clear" />
      {currentDateButtonVisible && (
        <Button
          transparent
          leftIcon={<Icon i="event" />}
          label={currentDateLabel}
          onClick={onCurrentDateButtonClick}
        />
      )}
    </div>
  );
});