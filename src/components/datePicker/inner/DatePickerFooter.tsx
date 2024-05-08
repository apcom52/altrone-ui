import { memo } from 'react';
import s from './footer.module.scss';
import { Button, Icon } from 'components';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import dayjs from 'dayjs';
import { DatePickerFooterProps } from '../DatePicker.types.ts';

export const DatePickerFooter = memo<DatePickerFooterProps>(
  ({ clearable = false }) => {
    const { picker, setCurrentMonth } = useDatePickerViewContext();
    const { selectedDates, onDayClicked } = useDateContext();
    const closePopup = useDatePickerCloseFn();

    const currentDateButtonVisible = picker !== 'range';
    const clearButtonVisible = Boolean(
      clearable && selectedDates.length && selectedDates[0],
    );

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

    const onClearButtonClick = () => {
      onDayClicked(undefined);
      closePopup();
    };

    return (
      <div className={s.Footer}>
        {clearButtonVisible && (
          <Button
            transparent
            leftIcon={<Icon i="backspace" />}
            label="Clear"
            onClick={onClearButtonClick}
          />
        )}
        <div className={s.Separator} />
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
  },
);
