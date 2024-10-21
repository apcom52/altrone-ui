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
import { useLocalization } from '../../application/useLocalization.tsx';

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

    const t = useLocalization();

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

    const { locale, datePicker: datePickerConfig = {} } = useConfiguration();

    const dateFormat =
      format ??
      datePickerConfig.dateFormat ??
      locale?.dateFormat ??
      defaultFormat;
    const monthFormat =
      format ??
      datePickerConfig.monthFormat ??
      locale?.monthFormat ??
      defaultFormat;
    const yearFormat =
      format ??
      datePickerConfig.yearFormat ??
      locale?.yearFormat ??
      defaultFormat;

    const pickerDateFormat =
      view === 'day' ? dateFormat : view === 'month' ? monthFormat : yearFormat;

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

    const onPopoverOpenChange = useCallback(
      (state: boolean) => {
        if (!state) {
          setView(picker);
        }
      },
      [picker],
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
              onOpenChange={onPopoverOpenChange}
            >
              <TextInput
                className={cls}
                style={styles}
                value={value ? dayjs(value).format(pickerDateFormat) : ''}
                onChange={() => null}
                readonlyStyles={readOnly}
                placeholder={t('datePicker.placeholder')}
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
