import { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import warningOnce from 'rc-util/es/warning';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const RangePicker = memo<RangePickerProps>((props) => {
  const {
    value = EMPTY_ARRAY,
    onChange,
    placeholder = 'Select period',
    format,
    readOnly = false,
    minDate,
    maxDate,
    ...restProps
  } = props;

  const { locale: localeConfig = {}, datePicker: datePickerConfig = {} } =
    useConfiguration();

  const rangeFormatEmpty = datePickerConfig.rangeFormatEmpty || '...';
  const dateFormat =
    format ||
    datePickerConfig.rangeFormat ||
    localeConfig.dateFormat ||
    'DD.MM.YYYY';

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
    valueString = `${value[0] ? value[0].format(dateFormat) : rangeFormatEmpty} - ${value[1] ? value[1].format(dateFormat) : rangeFormatEmpty}`;
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
