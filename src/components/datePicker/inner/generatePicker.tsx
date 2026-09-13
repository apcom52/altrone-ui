import { isValidElement, useCallback, useEffect, useMemo, useState } from 'react';
import { dayjsInstance as dayjs } from 'utils';
import {
  BasicDatePickerProps,
  DatePickerContextType,
  DatePickerTriggerContextType,
  DatePickerViewContextType,
  Picker,
} from '../DatePicker.types.ts';
import clsx from 'clsx';
import s from '../datePicker.module.scss';
import { EMPTY_ARRAY } from '../../../constants.ts';
import {
  DatePickerCloseFnContext,
  DatePickerContext,
  DatePickerTriggerContext,
  DatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { Popover } from '../../popover';
import { PopoverDatePickerContent } from './PopoverDatePickerContent.tsx';
import { TextInput } from 'components/textInput';
import { Slot } from 'utils/components/Slot.tsx';
import type { AnyObject } from 'utils/types.ts';
import warningOnce from 'rc-util/es/warning';
import { useLocalization } from 'components/application';
import { Dayjs } from 'dayjs';
import { useLocale } from '../../../utils/hooks/useLocale.ts';
import { Calendar } from 'lucide-react';

export function generatePicker<DatePickerProps extends BasicDatePickerProps>(
  picker: Picker = 'day',
) {
  return (props: DatePickerProps) => {
    const {
      ref,
      value,
      onChange,
      clearable = false,
      readOnly = false,
      disabled = false,
      minDate,
      maxDate,
      format,
      className,
      style,
      autoClose = true,
      asChild = false,
      renderFunc,
      children,
      ...restProps
    } = props;

    const t = useLocalization();

    // Warn once when minDate >= maxDate — single check covers both directions
    useEffect(() => {
      warningOnce(
        !(minDate && maxDate && minDate.isSameOrAfter(maxDate)),
        '[DatePicker]: minDate prop has to be before maxDate',
      );
    }, [minDate, maxDate]);

    const [currentMonth, setCurrentMonth] = useState(() => value || dayjs());
    const [view, setView] = useState(picker);
    const [opened, setOpened] = useState(false);

    const locale = useLocale({
      dateFormat: format,
      monthFormat: format,
      yearFormat: format,
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
    );
    const styles = {
      ...style,
    };

    const onChangeHandler = useCallback(
      (
        selectedDate: Dayjs | undefined,
        event?: React.MouseEvent<HTMLButtonElement>,
      ) => {
        onChange?.(selectedDate, event);
      },
      [onChange],
    );

    const onPopoverOpenChange = useCallback(
      (state: boolean) => {
        setOpened(state);
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
      };
    }, [picker, view, currentMonth]);

    const displayValue = value
      ? dayjs(value).locale(locale.locale).format(pickerDateFormat)
      : '';

    const triggerContext = useMemo<DatePickerTriggerContextType>(
      () => ({
        value,
        displayValue,
        expanded: opened,
        disabled,
        clear: (event) =>
          onChangeHandler(
            undefined,
            event as React.MouseEvent<HTMLButtonElement>,
          ),
      }),
      [value, displayValue, opened, disabled, onChangeHandler],
    );

    const renderTrigger = () => {
      if (renderFunc) {
        return renderFunc({ ...triggerContext, className: cls, style: styles });
      }

      if (asChild) {
        if (!isValidElement(children)) {
          console.error(
            '[DatePicker] asChild requires a valid React element as children',
          );
          return <span />;
        }
        return (
          <Slot className={cls} style={styles}>
            {children as React.ReactElement<AnyObject>}
          </Slot>
        );
      }

      return (
        <TextInput
          className={cls}
          style={styles}
          value={displayValue}
          readonlyStyles={readOnly}
          placeholder={t('datePicker.placeholder')}
          disabled={disabled}
          {...restProps}
          readOnly={true}
        >
          {!readOnly ? (
            <TextInput.IconIsland
              className={s.ArrowIcon}
              placement="end"
              icon={<Calendar />}
            />
          ) : null}
        </TextInput>
      );
    };

    return (
      <div ref={ref} className={s.DatePickerWrapper}>
        <DatePickerContext.Provider value={datePickerValueContext}>
          <DatePickerViewContext.Provider value={datePickerViewContext}>
            <DatePickerTriggerContext.Provider value={triggerContext}>
              <Popover
                enabled={!readOnly && !disabled}
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
                {renderTrigger()}
              </Popover>
            </DatePickerTriggerContext.Provider>
          </DatePickerViewContext.Provider>
        </DatePickerContext.Provider>
      </div>
    );
  };
}
