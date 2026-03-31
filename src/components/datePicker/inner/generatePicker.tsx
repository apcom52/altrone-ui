import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { dayjsInstance as dayjs } from 'utils';
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
  DatePickerIdContext,
  DatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { Popover } from '../../popover';
import { PopoverDatePickerContent } from './PopoverDatePickerContent.tsx';
import { TextInput } from 'components/textInput';
import warningOnce from 'rc-util/es/warning';
import { useConfiguration } from 'components/configuration';
import { useLocalization } from 'components/application';
import { Dayjs } from 'dayjs';
import { useLocale } from '../../../utils/hooks/useLocale.ts';
import { Calendar } from 'lucide-react';

export function generatePicker<DatePickerProps extends BasicDatePickerProps>(
  picker: Picker = 'day'
) {
  return (props: DatePickerProps) => {
    const {
      ref,
      value,
      onChange,
      clearable = false,
      readOnly = false,
      minDate,
      maxDate,
      format,
      className,
      style,
      autoClose = true,
      ...restProps
    } = props;

    const t = useLocalization();

    const id = useId();

    // Warn once when minDate >= maxDate — single check covers both directions
    useEffect(() => {
      warningOnce(
        !(minDate && maxDate && minDate.isSameOrAfter(maxDate)),
        '[DatePicker]: minDate prop has to be before maxDate'
      );
    }, [minDate, maxDate]);

    const [currentMonth, setCurrentMonth] = useState(() => value || dayjs());
    const [view, setView] = useState(picker);
    const [hoveredDate, setHoveredDate] = useState<Dayjs | undefined>(
      undefined
    );

    const { datePicker: datePickerConfig = {} } = useConfiguration();
    const locale = useLocale({
      dateFormat: format ?? datePickerConfig.dateFormat,
      monthFormat: format ?? datePickerConfig.monthFormat,
      yearFormat: format ?? datePickerConfig.yearFormat,
    });

    const pickerDateFormat =
      picker === 'day'
        ? locale.dateFormat
        : picker === 'month'
        ? locale.monthFormat
        : locale.yearFormat;

    const cls = clsx(
      s.DatePicker,
      {
        [s.Readonly]: readOnly,
      },
      className,
      datePickerConfig.className
    );
    const styles = {
      ...datePickerConfig.style,
      ...style,
    };

    const onChangeHandler = useCallback(
      (
        selectedDate: Dayjs | undefined,
        event?: React.MouseEvent<HTMLButtonElement>
      ) => {
        onChange?.(selectedDate, event);
      },
      [onChange]
    );

    const onPopoverOpenChange = useCallback(
      (state: boolean) => {
        if (!state) {
          setView(picker);
        }
      },
      [picker]
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
        hoveredDate,
        setHoveredDate,
      };
    }, [picker, view, currentMonth, hoveredDate]);

    return (
      <div ref={ref} className={s.DatePickerWrapper}>
        <DatePickerContext.Provider value={datePickerValueContext}>
          <DatePickerViewContext.Provider value={datePickerViewContext}>
            <DatePickerIdContext.Provider value={id}>
              <Popover
                enabled={!readOnly}
                placement="bottom-start"
                content={({ closePopup }) => (
                  <DatePickerCloseFnContext.Provider value={closePopup}>
                    <PopoverDatePickerContent
                      autoClose={autoClose}
                      clearable={clearable}
                    />
                  </DatePickerCloseFnContext.Provider>
                )}
                onOpenChange={onPopoverOpenChange}
                focusTrapTargets={['content']}
                listNavigation
                overlap
              >
                <TextInput
                  className={cls}
                  style={styles}
                  value={
                    value
                      ? dayjs(value)
                          .locale(locale.locale)
                          .format(pickerDateFormat)
                      : ''
                  }
                  readonlyStyles={readOnly}
                  placeholder={t('datePicker.placeholder')}
                  {...restProps}
                  readOnly={true}
                >
                  {!readOnly ? (
                    <TextInput.IconIsland
                      className={s.ArrowIcon}
                      placement="right"
                      icon={<Calendar />}
                    />
                  ) : null}
                </TextInput>
              </Popover>
            </DatePickerIdContext.Provider>
          </DatePickerViewContext.Provider>
        </DatePickerContext.Provider>
      </div>
    );
  };
}
