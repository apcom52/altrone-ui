import {
  DatePickerContextType,
  DatePickerProps,
  DatePickerViewContextType,
  Picker,
} from '../DatePicker.types.ts';
import { memo, useCallback, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import clsx from 'clsx';
import s from '../datePicker.module.scss';
import {
  DatePickerCloseFnContext,
  DatePickerContext,
  DatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { Popover } from '../../popover';
import { PopoverDatePickerContent } from '../inner/PopoverDatePickerContent.tsx';
import { TextInput } from '../../textInput';
import { Icon } from '../../icon';
import { EMPTY_ARRAY } from '../../../constants.ts';

export const MonthPicker = memo(
  ({ value, onChange, ...restProps }: DatePickerProps) => {
    const [currentMonth, setCurrentMonth] = useState(value || dayjs());
    const [view, setView] = useState(Picker.month);

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
        picker: 'month',
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
              content={({ closeAllSequence }) => (
                <DatePickerCloseFnContext.Provider value={closeAllSequence}>
                  <PopoverDatePickerContent />
                </DatePickerCloseFnContext.Provider>
              )}
            >
              <TextInput
                className={cls}
                style={styles}
                value={dayjs(value).format('MM.YYYY')}
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
  },
);
