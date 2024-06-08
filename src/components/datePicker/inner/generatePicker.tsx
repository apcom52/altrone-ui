import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { TextInput } from 'components/textInput';
import { Icon } from 'components/icon';
import warningOnce from 'rc-util/es/warning';
import { useConfiguration } from 'components/configuration';

export function generatePicker<DatePickerProps extends BasicDatePickerProps>(
  picker: Picker = 'day',
  defaultFormat: string = 'DD.MM.YYYY',
) {
  return (props: DatePickerProps) => {
    const {
      value,
      onChange,
      clearable = false,
      readOnly = false,
      minDate,
      maxDate,
      format,
      className,
      style,
      ...restProps
    } = props;

    useEffect(() => {
      warningOnce(
        !(minDate && maxDate && minDate.isSameOrAfter(maxDate)),
        '[DatePicker]: minDate prop has to be before than maxDate',
      );
      warningOnce(
        !(minDate && maxDate && maxDate.isBefore(minDate)),
        '[DatePicker]: maxDate prop has to be after than minDate',
      );
    }, [minDate, maxDate]);

    useEffect(() => {
      if (
        minDate &&
        maxDate &&
        value &&
        !value.isBetween(minDate, maxDate, '[]')
      ) {
        onChange?.(minDate);
      }
    }, [value, minDate, maxDate, onChange]);

    const [currentMonth, setCurrentMonth] = useState(value || dayjs());
    const [view, setView] = useState(picker);

    const { datePicker: datePickerConfig = {} } = useConfiguration();

    const configPickerFormat =
      view === 'day'
        ? datePickerConfig.dateFormat
        : view === 'month'
          ? datePickerConfig.monthFormat
          : datePickerConfig.yearFormat;

    const dateFormat = format || configPickerFormat || defaultFormat;

    const cls = clsx(
      s.DatePicker,
      {
        [s.Readonly]: readOnly,
      },
      className,
      datePickerConfig.className,
    );
    const styles = {
      ...datePickerConfig.style,
      ...style,
    };

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
        minDate:
          minDate && maxDate && minDate.isAfter(maxDate) ? maxDate : minDate,
        maxDate:
          minDate && maxDate && maxDate.isBefore(minDate) ? minDate : maxDate,
      };
    }, [value, onChangeHandler, minDate, maxDate]);

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
              enabled={!readOnly}
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
                value={value ? dayjs(value).format(dateFormat) : ''}
                onChange={() => null}
                readonlyStyles={readOnly}
                placeholder="Choose a date"
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
  };
}
