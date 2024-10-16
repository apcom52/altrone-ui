import { memo } from 'react';
import s from './footer.module.scss';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import dayjs from 'dayjs';
import { DatePickerFooterProps } from '../DatePicker.types.ts';
import { useLocalization } from '../../application/useLocalization.tsx';

export const DatePickerFooter = memo<DatePickerFooterProps>(
  ({ clearable = false }) => {
    const t = useLocalization();

    const { picker, setCurrentMonth } = useDatePickerViewContext();
    const { selectedDates, onDayClicked } = useDateContext();
    const closePopup = useDatePickerCloseFn();

    const currentDateButtonVisible = picker !== 'range';
    const clearButtonVisible = Boolean(
      clearable && selectedDates.length && selectedDates[0],
    );

    const currentDateLabel =
      picker === 'day'
        ? t('datePicker.today')
        : picker === 'month'
          ? t('datePicker.thisMonth')
          : t('datePicker.thisYear');

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
            label={t('common.clear')}
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
