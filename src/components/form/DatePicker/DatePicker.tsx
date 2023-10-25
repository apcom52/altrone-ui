import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../../typography';
import { useThemeContext } from '../../../contexts';
import './date-picker.scss';
import { FloatingBox, FloatingBoxMobileBehaviour } from '../../containers';
import { DayPicker, MonthPicker, Picker, YearPicker } from './index';
import { Button } from '../../form';
import clsx from 'clsx';
import { ContextMenuType, Elevation, Role, Size, Surface } from '../../../types';
import { useLocalization, useWindowSize } from '../../../hooks';
import { BasicInput } from '../BasicInput';
import { DatePickerProps, DateRangePosition, DateValue } from './DatePicker.types';
import { date2Number, number2Date } from './DatePicker.utils';
import dayjs, { Dayjs } from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

const today = new Date();

/**
 * This component is used to pick a date in a calendar
 * @param value
 * @param onChange
 * @param id
 * @param picker
 * @param minDate
 * @param maxDate
 * @param disabled test
 * @param clearable
 * @param placeholder
 * @param size
 * @param hintText
 * @param errorText
 * @param className
 * @param elevation
 * @param surface
 * @constructor
 */
export const DatePicker = <IsDateRange extends boolean | undefined = false>({
  value,
  onChange,
  picker = Picker.day,
  minDate = new Date(1900, 0, 0),
  maxDate = new Date(2050, 13, 0),
  disabled = false,
  clearable = false,
  placeholder,
  size = Size.medium,
  hintText,
  errorText,
  className,
  elevation = Elevation.convex,
  surface = Surface.paper,
  useDateRange = false
}: DatePickerProps<IsDateRange>) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value && !Array.isArray(value) ? dayjs(value) : dayjs()
  );

  const [startDate, setStartDate] = useState<Dayjs | undefined>(() => {
    return useDateRange && Array.isArray(value) && value[1] ? dayjs(value[0]) : undefined;
  });

  const [endDate, setEndDate] = useState<Dayjs | undefined>(() => {
    return useDateRange && Array.isArray(value) && value[1] ? dayjs(value[1]) : undefined;
  });

  const [currentView, setCurrentView] = useState<Picker>(picker);
  const { locale } = useThemeContext();

  const { ltePhoneL } = useWindowSize();
  const t = useLocalization();

  const inputRef = useRef<HTMLButtonElement>(null);

  const valueDateFormat = new Intl.DateTimeFormat(
    locale,
    picker === Picker.year
      ? {
          year: 'numeric'
        }
      : picker === Picker.month
      ? {
          year: 'numeric',
          month: useDateRange ? 'short' : 'long'
        }
      : {
          year: 'numeric',
          month: useDateRange ? 'short' : 'long',
          day: 'numeric'
        }
  );

  const currentMonthFormat = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric'
  });

  const onNextMonthClick = () => {
    setCurrentMonth((old) => {
      return old.add(1, 'month');
    });
  };

  const onPrevMonthClick = () => {
    setCurrentMonth((old) => {
      return old.subtract(1, 'month');
    });
  };

  const onTodayClick = () => {
    if (!useDateRange) {
      const todayDate = dayjs().toDate();
      setCurrentMonth(dayjs());
      onChange(todayDate as DateValue<IsDateRange>);
    }
  };

  const onApplyClick = () => {
    if (picker === Picker.day && currentView !== Picker.day) {
      setCurrentView(Picker.day);
    } else {
      setIsDatePickerVisible(false);
    }
  };

  const onCurrentDateClick = () => {
    setCurrentView((view) => (view === Picker.day ? Picker.month : Picker.day));
  };

  const datePickerMenu: ContextMenuType = useMemo(
    () => [
      {
        title: t('common.clear'),
        icon: <Icon i="backspace" />,
        onClick: () => {
          setStartDate(undefined);
          setEndDate(undefined);

          if (useDateRange) {
            onChange(undefined);
          } else {
            onChange(undefined);
          }
        }
      }
    ],
    [onChange, useDateRange]
  );

  useEffect(() => {
    setCurrentView(picker);
  }, [picker]);

  useEffect(() => {
    const getValidDate = (date: Date | undefined) => {
      if (!date) {
        return undefined;
      }

      const date_dj = dayjs(date);

      if (date_dj.isBefore(minDate)) {
        return minDate;
      } else if (date_dj.isAfter(maxDate)) {
        return maxDate;
      }

      return undefined;
    };

    if (useDateRange && Array.isArray(value)) {
      const startValue = getValidDate(value[0]);
      const endValue = getValidDate(value[1]);

      if (startValue || endValue) {
        onChange([startValue || value[0], endValue || value[1]] as DateValue<IsDateRange>);
      }
    } else if (!Array.isArray(value)) {
      const result = getValidDate(value);

      if (result) {
        onChange(result as DateValue<IsDateRange>);
      }
    }
  }, [value, minDate, maxDate, onChange, useDateRange]);

  const [minMonth, maxMonth] = useMemo(() => {
    return [dayjs(minDate), dayjs(maxDate)];
  }, [minDate, maxDate]);

  const onChangeHandler = useCallback(
    (position: DateRangePosition, value?: Dayjs, extraValue?: Dayjs) => {
      let _startDate = position === 'start' ? value : startDate;
      let _endDate = position === 'end' ? value : endDate;

      if (position === 'both') {
        _startDate = value;
        _endDate = extraValue;
      }

      if (picker === Picker.day && currentView === Picker.month && value) {
        setCurrentMonth(value);
        setCurrentView(Picker.day);
        return;
      }

      if (position === 'start') {
        setStartDate(_startDate);
        if (_endDate) {
          _endDate = undefined;
          setEndDate(undefined);
        }
      } else if (position === 'end') {
        setEndDate(_endDate);
      } else if (position === 'both') {
        setStartDate(_startDate);
        setEndDate(_endDate);
      }

      if (!useDateRange) {
        onChange(value?.toDate() as DateValue<IsDateRange>);
      } else if (_startDate && _endDate) {
        onChange([_startDate?.toDate(), _endDate?.toDate()] as DateValue<IsDateRange>);
      }
    },
    [useDateRange, startDate, endDate, onChange, picker, currentView]
  );

  const isMonthViewInDayPicker = picker === Picker.day && currentView === Picker.month;

  const currentLabel = useMemo(() => {
    if (!useDateRange) {
      return valueDateFormat.format(startDate?.toDate());
    } else {
      return `${startDate ? valueDateFormat.format(startDate.toDate()) : '...'} — ${
        endDate ? valueDateFormat.format(endDate.toDate()) : '...'
      }`;
    }
  }, [startDate, endDate, useDateRange, locale, picker]);

  return (
    <BasicInput disabled={disabled} hintText={hintText} errorText={errorText} size={size}>
      <button
        className={clsx('alt-date-picker', className, {
          [`alt-text-input__control--elevation-${elevation}`]: elevation,
          [`alt-text-input__control--surface-${surface}`]: surface !== Surface.paper
        })}
        ref={inputRef}
        onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
        data-testid="alt-test-datepicker"
        type="button"
        disabled={disabled}>
        {value ? (
          <div className="alt-date-picker__value">{currentLabel}</div>
        ) : (
          <div className="alt-date-picker__placeholder">
            {placeholder || t('form.datePicker.placeholder')}
          </div>
        )}
        <div className="alt-date-picker__icon">
          <Icon i="calendar_month" />
        </div>
      </button>
      {isDatePickerVisible && (
        <FloatingBox
          targetElement={inputRef.current}
          placement="bottom"
          onClose={() => setIsDatePickerVisible(false)}
          mobileBehaviour={FloatingBoxMobileBehaviour.modal}
          closeOnAnotherFloatingBoxClick
          useRootContainer>
          <div className="alt-date-picker__header">
            {!ltePhoneL && picker === Picker.day && (
              <button
                className={clsx('alt-date-picker__currentMonth', {
                  'alt-date-picker__currentMonth--selected': currentView !== Picker.day
                })}
                onClick={onCurrentDateClick}
                data-testid="alt-test-datepicker-header"
                type="button">
                {currentMonthFormat.format(currentMonth.toDate())}
              </button>
            )}
            {ltePhoneL && picker === Picker.day && (
              <div className="alt-date-picker__title">
                {currentMonthFormat.format(currentMonth.toDate())}
              </div>
            )}
            {picker === Picker.month && (
              <div className="alt-date-picker__title">{t('form.datePicker.chooseMonth')}</div>
            )}
            {picker === Picker.year && (
              <div className="alt-date-picker__title">{t('form.datePicker.chooseYear')}</div>
            )}
            {!ltePhoneL && currentView === Picker.day && (
              <div className="alt-date-picker__navigation">
                <button
                  className="alt-date-picker__navigation-button"
                  onClick={onPrevMonthClick}
                  data-testid="alt-test-datepicker-prev"
                  type="button"
                  disabled={currentMonth <= minMonth}>
                  <Icon i="arrow_back_ios" />
                </button>
                <button
                  className="alt-date-picker__navigation-button"
                  onClick={onNextMonthClick}
                  data-testid="alt-test-datepicker-next"
                  type="button"
                  disabled={currentMonth >= maxMonth}>
                  <Icon i="arrow_forward_ios" />
                </button>
              </div>
            )}
          </div>
          {currentView === Picker.day && (
            <DayPicker
              currentMonth={currentMonth}
              startSelectedDate={startDate}
              endSelectedDate={endDate}
              onChange={onChangeHandler}
              minDate={minDate}
              maxDate={maxDate}
              isDateRange={useDateRange}
            />
          )}
          {currentView === Picker.month && (
            <MonthPicker
              currentMonth={currentMonth}
              startSelectedDate={isMonthViewInDayPicker ? currentMonth : startDate}
              endSelectedDate={endDate}
              onChange={onChangeHandler}
              minDate={minDate}
              maxDate={maxDate}
              isDateRange={isMonthViewInDayPicker ? false : useDateRange}
            />
          )}
          {currentView === Picker.year && (
            <YearPicker
              currentMonth={currentMonth}
              startSelectedDate={startDate}
              endSelectedDate={endDate}
              onChange={onChangeHandler}
              minDate={minDate}
              maxDate={maxDate}
              isDateRange={useDateRange}
            />
          )}
          {!ltePhoneL && (
            <div className="alt-date-picker__footer">
              {clearable && (
                <>
                  <Button isIcon dropdown={datePickerMenu}>
                    <Icon i="more_horiz" />
                  </Button>
                  <div className="alt-date-picker__footer-separator" />
                </>
              )}
              {currentView === Picker.day && !useDateRange && (
                <Button onClick={onTodayClick} data-testid="alt-test-datepicker-today">
                  {t('form.datePicker.today')}
                </Button>
              )}
              {currentView === Picker.month && !useDateRange && (
                <Button onClick={onTodayClick} data-testid="alt-test-datepicker-currentMonth">
                  {t('form.datePicker.currentMonth')}
                </Button>
              )}
              <Button
                role={Role.primary}
                className="alt-date-picker__apply"
                onClick={onApplyClick}
                data-testid="alt-test-datepicker-apply">
                {t('common.apply')}
              </Button>
            </div>
          )}
          {ltePhoneL && (
            <div
              className={clsx('alt-date-picker__footer', {
                'alt-date-picker__footer--compact': currentView !== Picker.day,
                'alt-date-picker__footer--clearable': clearable && value
              })}>
              {currentView === Picker.day && (
                <Button
                  onClick={onPrevMonthClick}
                  className="alt-date-picker__mobilePrevMonth"
                  isIcon>
                  <Icon i="arrow_back" />
                </Button>
              )}
              {currentView === Picker.day && (
                <Button onClick={onCurrentDateClick} className="alt-date-picker__mobileMonthName">
                  {t('form.datePicker.chooseMonth')}
                </Button>
              )}
              {currentView === Picker.day && (
                <Button
                  onClick={onNextMonthClick}
                  className="alt-date-picker__mobileNextMonth"
                  isIcon>
                  <Icon i="arrow_forward" />
                </Button>
              )}
              {currentView !== Picker.year && (
                <Button
                  onClick={onTodayClick}
                  className="alt-date-picker__mobileToday"
                  leftIcon={<Icon i="today" />}>
                  {currentView === Picker.day
                    ? t('form.datePicker.today')
                    : t('form.datePicker.currentMonth')}
                </Button>
              )}
              {clearable && value && (
                <Button
                  leftIcon={<Icon i="backspace" />}
                  className="alt-date-picker__mobileClear"
                  onClick={() => onChange(undefined)}>
                  {t('common.clear')}
                </Button>
              )}
              {(currentView === Picker.day || picker !== Picker.day) && (
                <Button
                  onClick={onApplyClick}
                  className="alt-date-picker__mobileApply"
                  role={Role.primary}>
                  {t('common.apply')}
                </Button>
              )}
              {currentView !== Picker.day && picker === Picker.day && (
                <Button
                  onClick={onApplyClick}
                  className="alt-date-picker__mobileApply"
                  role={Role.primary}
                  leftIcon={<Icon i="arrow_back_ios" />}>
                  {t('common.back')}
                </Button>
              )}
            </div>
          )}
        </FloatingBox>
      )}
    </BasicInput>
  );
};
