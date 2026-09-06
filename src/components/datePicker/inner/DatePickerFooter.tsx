import { memo } from 'react';
import s from './footer.module.scss';
import { Button } from 'components/button';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { dayjsInstance as dayjs } from 'utils';
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

    const onCurrentDateButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      let thisDay = dayjs();

      if (picker === 'month') {
        thisDay = thisDay.date(1);
      } else if (picker === 'year') {
        thisDay = thisDay.month(0).date(1);
      }

      setCurrentMonth(thisDay);
      onDayClicked(thisDay, event);
      closePopup();
    };

    const onClearButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onDayClicked(undefined, event);
      closePopup();
    };

    if (!clearButtonVisible && !currentDateButtonVisible) {
      return null;
    }

    return (
      <div className={s.Footer}>
        {clearButtonVisible && (
          <Button label={t('common.clear')} onClick={onClearButtonClick} />
        )}
        {currentDateButtonVisible && (
          <Button label={currentDateLabel} onClick={onCurrentDateButtonClick} />
        )}
      </div>
    );
  },
);
