import s from './header.module.scss';
import { useDatePickerViewContext } from '../DatePicker.contexts.ts';
import { useYearRanges } from '../utils.ts';
import { useLocalizationContext } from '../../application/useLocalization.tsx';
import { Button } from 'components/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DatePickerHeader = () => {
  const { viewMode, setViewMode, currentMonth, setCurrentMonth } =
    useDatePickerViewContext();
  const { language = 'en' } = useLocalizationContext();

  const [startYear, endYear] = useYearRanges(currentMonth);

  const onHeaderClick = () => {
    if (viewMode === 'day') {
      setViewMode('month');
    } else if (viewMode === 'month') {
      setViewMode('year');
    }
  };

  let headerLabel = currentMonth
    .locale(language.toLowerCase())
    .format('MMMM YYYY');
  if (viewMode === 'month') {
    headerLabel = currentMonth.format('YYYY');
  } else if (viewMode === 'year') {
    headerLabel = `${startYear}-${endYear}`;
  }

  const onPrevClick = () => {
    if (viewMode === 'day') {
      setCurrentMonth(currentMonth.subtract(1, 'month'));
    } else if (viewMode === 'month') {
      setCurrentMonth(currentMonth.subtract(1, 'year'));
    } else if (viewMode === 'year') {
      setCurrentMonth(currentMonth.set('year', startYear - 1));
    }
  };

  const onNextClick = () => {
    if (viewMode === 'day') {
      setCurrentMonth(currentMonth.add(1, 'month'));
    } else if (viewMode === 'month') {
      setCurrentMonth(currentMonth.add(1, 'year'));
    } else if (viewMode === 'year') {
      const newYear = endYear + 1;
      setCurrentMonth(currentMonth.set('year', newYear));
    }
  };

  return (
    <div className={s.Header}>
      <Button
        icon={<ChevronLeft />}
        onClick={onPrevClick}
        label="Previous"
        showLabel={false}
      />
      <button type="button" className={s.CurrentDate} onClick={onHeaderClick}>
        {headerLabel}
      </button>
      <Button
        icon={<ChevronRight />}
        onClick={onNextClick}
        label="Next"
        showLabel={false}
      />
    </div>
  );
};
