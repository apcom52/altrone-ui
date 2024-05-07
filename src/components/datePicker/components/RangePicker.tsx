import { memo, useCallback, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import clsx from 'clsx';
import s from '../datePicker.module.scss';
import {
  DatePickerContextType,
  DatePickerViewContextType,
  Picker,
  RangePickerProps,
} from '../DatePicker.types.ts';
import { EMPTY_ARRAY } from '../../../constants.ts';
import {
  DatePickerCloseFnContext,
  DatePickerContext,
  DatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { Popover } from '../../popover';
import { PopoverDatePickerContent } from '../inner/PopoverDatePickerContent.tsx';
import { TextInput } from '../../textInput';
import { Icon } from '../../icon';

export const RangePicker = memo<RangePickerProps>((props) => {
  const {
    value = EMPTY_ARRAY,
    onChange,
    placeholder = 'Select period',
    format = 'DD.MM.YYYY',
    readOnly = false,
    ...restProps
  } = props;

  const [currentMonth, setCurrentMonth] = useState(value?.[0] || dayjs());
  const [hoveredDate, setHoveredDate] = useState<Dayjs | undefined>(undefined);
  const [view, setView] = useState<Picker>('day');
  const cls = clsx(s.DatePicker, {
    [s.Readonly]: readOnly,
  });
  const styles = {};

  const onChangeHandler = useCallback(
    (selectedDate: Dayjs | undefined) => {
      if (!selectedDate) {
        onChange?.([]);
      }

      const startDate = value[0];
      const endDate = value[1];

      let newValues = [];

      if (selectedDate && startDate && !endDate) {
        newValues = [startDate, selectedDate];
      } else {
        newValues = [selectedDate, undefined];
      }

      onChange?.(newValues);
    },
    [value, onChange],
  );

  const datePickerValueContext = useMemo<DatePickerContextType>(() => {
    return {
      selectedDates: value || EMPTY_ARRAY,
      onDayClicked: onChangeHandler,
    };
  }, [value, onChangeHandler]);

  const datePickerViewContext = useMemo<DatePickerViewContextType>(() => {
    return {
      picker: 'range',
      viewMode: view,
      setViewMode: setView,
      currentMonth: currentMonth,
      setCurrentMonth: setCurrentMonth,
      hoveredDate,
      setHoveredDate,
    };
  }, [view, currentMonth, hoveredDate]);

  let valueString = '';
  if (value[0] || value[1]) {
    valueString = `${value[0] ? value[0].format(format) : '...'} - ${value[1] ? value[1].format(format) : '...'}`;
  }

  return (
    <div className={s.DatePickerWrapper}>
      <DatePickerContext.Provider value={datePickerValueContext}>
        <DatePickerViewContext.Provider value={datePickerViewContext}>
          <Popover
            enabled={!readOnly}
            placement="bottom-start"
            content={({ closeAllSequence }) => (
              <DatePickerCloseFnContext.Provider value={closeAllSequence}>
                <PopoverDatePickerContent />
              </DatePickerCloseFnContext.Provider>
            )}
          >
            <TextInput
              className={cls}
              style={styles}
              value={valueString}
              onChange={() => null}
              placeholder={placeholder}
              readonlyStyles={readOnly}
              {...restProps}
              readOnly={true}
            >
              {!readOnly ? (
                <TextInput.IconIsland
                  className={s.ArrowIcon}
                  placement="right"
                  icon={<Icon i="calendar_month" />}
                />
              ) : null}
            </TextInput>
          </Popover>
        </DatePickerViewContext.Provider>
      </DatePickerContext.Provider>
    </div>
  );
});
