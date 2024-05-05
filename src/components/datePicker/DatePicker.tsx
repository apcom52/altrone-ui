import { memo, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Popover } from '../popover';
import { TextInput } from '../textInput';
import s from './datePicker.module.scss';
import { Icon } from '../icon';
import { PopoverDatePickerContent } from './inner/PopoverDatePickerContent.tsx';
import {
  DatePickerContextType,
  DatePickerProps,
  DatePickerViewContextType,
  Picker,
} from './DatePicker.types.ts';
import dayjs, { Dayjs } from 'dayjs';
import ruLocale from 'dayjs/locale/ru.js';
import {
  DatePickerContext,
  DatePickerViewContext,
} from './DatePicker.contexts.ts';

dayjs.locale(ruLocale);

const EMPTY_ARRAY: Dayjs[] = [];

const DatePickerComponent = ({
  value,
  onChange,
  ...restProps
}: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(value || dayjs());
  const [view, setView] = useState(Picker.day);

  const cls = clsx(s.DatePicker);
  const styles = {};

  const onChangeHandler = useCallback(
    (selectedDate: Dayjs) => {
      onChange?.(selectedDate);
    },
    [onChange],
  );

  const datePickerValueContext = useMemo<DatePickerContextType>(() => {
    return {
      selectedDates: value ? [value] : EMPTY_ARRAY,
      onDayClicked: onChangeHandler,
    };
  }, [value, onChangeHandler]);

  const datePickerViewContext = useMemo<DatePickerViewContextType>(() => {
    return {
      viewMode: view,
      setViewMode: setView,
      currentMonth: currentMonth,
      setCurrentMonth: setCurrentMonth,
      hoveredDate: undefined,
      setHoveredDate: () => null,
    };
  }, [view, currentMonth]);

  return (
    <div className={s.DatePickerWrapper}>
      <DatePickerContext.Provider value={datePickerValueContext}>
        <DatePickerViewContext.Provider value={datePickerViewContext}>
          <Popover
            placement="bottom-start"
            content={<PopoverDatePickerContent />}
          >
            <TextInput
              className={cls}
              style={styles}
              value={dayjs(value).format('DD.MM.YYYY')}
              onChange={() => null}
              readonlyStyles={false}
              placeholder="Choose a date"
              {...restProps}
              readOnly={true}
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
};

export const DatePicker = memo(
  DatePickerComponent,
) as typeof DatePickerComponent;
