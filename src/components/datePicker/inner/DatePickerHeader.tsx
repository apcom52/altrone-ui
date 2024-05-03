import { Icon } from 'components';
import s from './header.module.scss';

export const DatePickerHeader = () => {
  return (
    <div className={s.Header}>
      <div className={s.CurrentDate}>
        <button className={s.CurrentDateItem}>April 2024</button>
      </div>
      <div className={s.Navigation}>
        <button className={s.Button}>
          <Icon i="expand_more" />
        </button>
        <button className={s.Button}>
          <Icon i="expand_less" />
        </button>
      </div>
    </div>
  );
};
