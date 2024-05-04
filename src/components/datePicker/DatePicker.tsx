import { memo, useContext, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Popover } from '../popover';
import { TextInput } from '../textInput';
import s from './datePicker.module.scss';
import { Icon } from '../icon';
import { PopoverCalendar } from './inner/PopoverCalendar.tsx';
import {
  DatePickerContextType,
  DatePickerProps,
  DatePickerViewContextType,
  Picker,
} from './DatePicker.types.ts';
import dayjs from 'dayjs';
import ruLocale from 'dayjs/locale/ru.js';
import {
  DatePickerContext,
  DatePickerViewContext,
} from './DatePicker.contexts.ts';

dayjs.locale(ruLocale);

export const DatePicker = memo<DatePickerProps>(({ value, onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs(value));
  const [view, setView] = useState(Picker.day);

  const cls = clsx(s.DatePicker);
  const styles = {};

  const datePickerValueContext = useMemo<DatePickerContextType>(() => {
    return {
      selectedDates: [value],
      onChange: onChange,
    };
  }, [value]);

  const datePickerViewContext = useMemo<DatePickerViewContextType>(() => {
    return {
      viewMode: view,
      setViewMode: setView,
      currentMonth: currentMonth,
      setCurrentMonth: setCurrentMonth,
    };
  }, [view, currentMonth]);

  return (
    <div className={s.DatePickerWrapper}>
      <DatePickerContext.Provider value={datePickerValueContext}>
        <DatePickerViewContext.Provider value={datePickerViewContext}>
          <Popover placement="bottom-start" content={<PopoverCalendar />}>
            <TextInput
              className={cls}
              style={styles}
              value={dayjs(value).format('DD.MM.YYYY')}
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
        </DatePickerViewContext.Provider>
      </DatePickerContext.Provider>
    </div>
  );
});
