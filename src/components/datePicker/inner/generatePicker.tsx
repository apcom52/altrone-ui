import { useCallback, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  BasicDatePickerProps,
  DatePickerContextType,
  DatePickerViewContextType,
  Picker,
} from '../DatePicker.types.ts';
import clsx from 'clsx';
import s from '../datePicker.module.scss';
import { EMPTY_ARRAY } from '../../../constants.ts';
import {
  DatePickerCloseFnContext,
  DatePickerContext,
  DatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { Popover } from '../../popover';
import { PopoverDatePickerContent } from './PopoverDatePickerContent.tsx';
import { TextInput } from '../../textInput';
import { Icon } from '../../icon';

export function generatePicker<DatePickerProps extends BasicDatePickerProps>(
  picker: Picker = 'day',
  defaultFormat: string = 'DD.MM.YYYY',
) {
  return (props: DatePickerProps) => {
    const { value, onChange, clearable = false, ...restProps } = props;

    const [currentMonth, setCurrentMonth] = useState(value || dayjs());
    const [view, setView] = useState(picker);

    const cls = clsx(s.DatePicker);
    const styles = {};

    const onChangeHandler = useCallback(
      (selectedDate: Dayjs | undefined) => {
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
        picker,
        viewMode: view,
        setViewMode: setView,
        currentMonth: currentMonth,
        setCurrentMonth: setCurrentMonth,
        hoveredDate: undefined,
        setHoveredDate: () => null,
      };
    }, [picker, view, currentMonth]);

    return (
      <div className={s.DatePickerWrapper}>
        <DatePickerContext.Provider value={datePickerValueContext}>
          <DatePickerViewContext.Provider value={datePickerViewContext}>
            <Popover
              placement="bottom-start"
              content={({ closeAllSequence }) => (
                <DatePickerCloseFnContext.Provider value={closeAllSequence}>
                  <PopoverDatePickerContent clearable={clearable} />
                </DatePickerCloseFnContext.Provider>
              )}
            >
              <TextInput
                className={cls}
                style={styles}
                value={value ? dayjs(value).format(defaultFormat) : ''}
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
}
