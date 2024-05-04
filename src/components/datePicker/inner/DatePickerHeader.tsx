import { Icon } from 'components';
import s from './header.module.scss';
import { useDatePickerViewContext } from '../DatePicker.contexts.ts';
import { Picker } from '../DatePicker.types.ts';

export const DatePickerHeader = () => {
  const { viewMode, setViewMode, currentMonth, setCurrentMonth } =
    useDatePickerViewContext();

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
    headerLabel = `${currentMonth.year() - 7}-${currentMonth.year() + 7}`;
  }

  return (
    <div className={s.Header}>
      <div className={s.CurrentDate}>
        <button
          className={s.CurrentDateItem}
          type="button"
          onClick={onHeaderClick}
        >
          {headerLabel}
        </button>
      </div>
      <div className={s.Navigation}>
        <button
          className={s.Button}
          onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
        >
          <Icon i="expand_more" />
        </button>
        <button
          className={s.Button}
          onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
        >
          <Icon i="expand_less" />
        </button>
      </div>
    </div>
  );
};
