import { Icon } from 'components';
import s from './header.module.scss';
import { useDatePickerViewContext } from '../DatePicker.contexts.ts';
import { Picker } from '../DatePicker.types.ts';
import { useYearRanges } from '../utils.ts';

export const DatePickerHeader = () => {
  const { viewMode, setViewMode, currentMonth, setCurrentMonth } =
    useDatePickerViewContext();

  const [startYear, endYear] = useYearRanges(currentMonth);

  const onHeaderClick = () => {
    if (viewMode === Picker.day) {
      setViewMode(Picker.month);
    } else if (viewMode === Picker.month) {
      setViewMode(Picker.year);
    }
  };

  let headerLabel = currentMonth.locale('en').format('MMMM YYYY');
  if (viewMode === Picker.month) {
    headerLabel = currentMonth.format('YYYY');
  } else if (viewMode === Picker.year) {
    headerLabel = `${startYear}-${endYear}`;
  }

  const onPrevClick = () => {
    if (viewMode === Picker.day) {
      setCurrentMonth(currentMonth.subtract(1, 'month'));
    } else if (viewMode === Picker.month) {
      setCurrentMonth(currentMonth.subtract(1, 'year'));
    } else if (viewMode === Picker.year) {
      setCurrentMonth(currentMonth.set('year', startYear - 1));
    }
  };

  const onNextClick = () => {
    if (viewMode === Picker.day) {
      setCurrentMonth(currentMonth.add(1, 'month'));
    } else if (viewMode === Picker.month) {
      setCurrentMonth(currentMonth.add(1, 'year'));
    } else if (viewMode === Picker.year) {
      const newYear = endYear + 1;
      console.log('>> endYear', endYear, newYear);
      setCurrentMonth(currentMonth.set('year', newYear));
    }
  };

  return (
    <div className={s.Header}>
      <button className={s.CurrentDate} type="button" onClick={onHeaderClick}>
        {headerLabel}
      </button>
      <div className={s.Navigation}>
        <button className={s.Button} onClick={onPrevClick}>
          <Icon i="expand_more" />
        </button>
        <button className={s.Button} onClick={onNextClick}>
          <Icon i="expand_less" />
        </button>
      </div>
    </div>
  );
};
