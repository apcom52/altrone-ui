import { memo } from 'react';
import clsx from 'clsx';
import { Popover } from '../popover';
import { TextInput } from '../textInput';
import s from './datePicker.module.scss';
import { Icon } from '../icon';
import { PopoverCalendar } from './inner/PopoverCalendar.tsx';

export const DatePicker = memo(({}) => {
  const cls = clsx(s.DatePicker);
  const styles = {};

  return (
    <div className={s.DatePickerWrapper}>
      <Popover placement="bottom-start" content={<PopoverCalendar />}>
        <TextInput
          className={cls}
          style={styles}
          value=""
          onChange={() => null}
          readOnly={true}
          readonlyStyles={false}
          placeholder="Choose a date"
        >
          <TextInput.IconIsland
            className={s.ArrowIcon}
            placement="right"
            icon={<Icon i="calendar_month" />}
          />
        </TextInput>
      </Popover>
    </div>
  );
});
