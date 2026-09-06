import { isValidElement, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { dayjsInstance as dayjs } from 'utils';
import { Dayjs } from 'dayjs';
import clsx from 'clsx';
import s from '../datePicker.module.scss';
import { CalendarDateRange } from '../../calendar/Calendar.types.ts';
import {
  DatePickerContextType,
  DatePickerTriggerContextType,
  DatePickerViewContextType,
  Picker,
  RangePickerProps,
} from '../DatePicker.types.ts';
import { EMPTY_ARRAY } from '../../../constants.ts';
import {
  DatePickerCloseFnContext,
  DatePickerContext,
  DatePickerTriggerContext,
  DatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { Popover } from 'components/popover';
import { PopoverDatePickerContent } from '../inner/PopoverDatePickerContent.tsx';
import { TextInput } from 'components/textInput';
import { Slot } from 'utils/components/Slot.tsx';
import type { AnyObject } from 'utils/types.ts';
import warningOnce from 'rc-util/es/warning';
import { useLocalization } from 'components/application';
import { useLocale } from 'utils';
import { Calendar } from 'lucide-react';

export const RangePicker = memo<RangePickerProps>((props) => {
  const t = useLocalization();

  const {
    ref,
    value = EMPTY_ARRAY,
    onChange,
    placeholder = t('datePicker.placeholderRange'),
    format,
    readOnly = false,
    disabled = false,
    minDate,
    maxDate,
    autoClose = true,
    asChild = false,
    renderFunc,
    children,
    ...restProps
  } = props;

  const locale = useLocale({
    dateFormat: format,
  });

  const rangeFormatEmpty = '...';
  const dateFormat = locale.dateFormat;

  // Single check covers both directions
  useEffect(() => {
    warningOnce(
      !(minDate && maxDate && minDate.isSameOrAfter(maxDate)),
      '[DatePicker]: minDate prop has to be before maxDate',
    );
  }, [minDate, maxDate]);

  const [currentMonth, setCurrentMonth] = useState(() => value?.[0] || dayjs());
  const [view, setView] = useState<Picker>('day');
  const [opened, setOpened] = useState(false);

  const cls = clsx(s.DatePicker, {
    [s.Readonly]: readOnly,
  });
  const styles = {};

  /** Clearing (footer button, or a custom trigger) is the only single-shot path. */
  const onClear = useCallback(
    (
      selectedDate: Dayjs | undefined,
      event?: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (!selectedDate) {
        onChange?.([], event);
      }
    },
    [onChange],
  );

  const onRangeChange = useCallback(
    (range: CalendarDateRange, event?: React.MouseEvent<HTMLButtonElement>) => {
      onChange?.([range.from, range.to], event);
    },
    [onChange],
  );

  const datePickerValueContext = useMemo<DatePickerContextType>(() => {
    return {
      selectedDates: value || EMPTY_ARRAY,
      onDayClicked: onClear,
      onRangeChange,
      minDate,
      maxDate,
    };
  }, [value, onClear, onRangeChange, minDate, maxDate]);

  const datePickerViewContext = useMemo<DatePickerViewContextType>(() => {
    return {
      picker: 'range',
      viewMode: view,
      setViewMode: setView,
      currentMonth: currentMonth,
      setCurrentMonth: setCurrentMonth,
    };
  }, [view, currentMonth]);

  const displayValue =
    value[0] || value[1]
      ? `${value[0] ? value[0].format(dateFormat) : rangeFormatEmpty} - ${
          value[1] ? value[1].format(dateFormat) : rangeFormatEmpty
        }`
      : '';

  const triggerContext = useMemo<DatePickerTriggerContextType>(
    () => ({
      value,
      displayValue,
      expanded: opened,
      disabled,
      clear: (event) =>
        onChange?.([], event as React.MouseEvent<HTMLButtonElement>),
    }),
    [value, displayValue, opened, disabled, onChange],
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
        placeholder={placeholder}
        readonlyStyles={readOnly}
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
              onOpenChange={setOpened}
              content={({ closePopup }) => (
                <DatePickerCloseFnContext.Provider value={closePopup}>
                  <PopoverDatePickerContent
                    clearable={props.clearable}
                    autoClose={autoClose}
                  />
                </DatePickerCloseFnContext.Provider>
              )}
            >
              {renderTrigger()}
            </Popover>
          </DatePickerTriggerContext.Provider>
        </DatePickerViewContext.Provider>
      </DatePickerContext.Provider>
    </div>
  );
});
