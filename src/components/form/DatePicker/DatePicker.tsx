import {memo, useEffect, useRef, useState} from "react";
import {Icon} from "../../icons";
import {useThemeContext} from "../../../contexts";
import './date-picker.scss'
import {FloatingBox} from "../../containers";
import {Calendar, MonthPicker, YearPicker} from "./index";
import {Button} from "../../button";
import clsx from "clsx";
import {TextInputProps} from "../TextInput";
import {Role, Size} from "../../../types";
import {FloatingBoxMobileBehaviour} from "../../containers/FloatingBox/FloatingBox";
import {useLocalization, useWindowSize} from "../../../hooks";
import {BasicInput, BasicInputProps} from "../BasicInput";

export enum Picker {
  day = 'day',
  month = 'month',
  year = 'year'
}

interface DatePickerProps extends Pick<TextInputProps, 'errorText' | 'hintText' | 'size' | 'disabled'>, BasicInputProps {
  value: Date
  onChange: (value: Date) => void
  picker?: Picker
  minDate?: Date
  maxDate?: Date
  placeholder?: string
}

const today = new Date()

const DatePicker = ({ value, onChange, picker = Picker.day, minDate = new Date(1900, 0, 0), maxDate = new Date(2050, 13, 0), disabled = false, placeholder, size = Size.medium, hintText, errorText, className }: DatePickerProps) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value.getFullYear(), value.getMonth(), 1) :  new Date())
  const [currentView, setCurrentView] = useState<Picker>(picker)
  let { locale } = useThemeContext()

  const { ltePhoneL } = useWindowSize()
  const t = useLocalization()

  const inputRef = useRef<HTMLButtonElement>(null)

  const valueDateFormat = new Intl.DateTimeFormat(locale, picker === Picker.year ? {
    year: 'numeric'
  } : picker === Picker.month ? {
    year: 'numeric',
    month: 'long'
  }: {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const currentMonthFormat = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: "numeric"
  })

  const onNextMonthClick = () => {
    setCurrentMonth(old => new Date(old.getFullYear(), old.getMonth() + 1, old.getDate()))
  }

  const onPrevMonthClick = () => {
    setCurrentMonth(old => new Date(old.getFullYear(), old.getMonth() - 1, old.getDate()))
  }

  const onTodayClick = () => {
    const today = new Date()
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    onChange(today)
  }

  const onApplyClick = () => {
    if (picker === Picker.day && currentView !== Picker.day) {
      setCurrentView(Picker.day)
    } else {
      setIsDatePickerVisible(false)
    }
  }

  const onCurrentDateClick = () => {
    setCurrentView(view => view === Picker.day ? Picker.month : Picker.day)
  }

  useEffect(() => {
    if (value) {
      setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1))
    }
  }, [value])

  useEffect(() => {
    setCurrentView(picker)
  }, [picker])

  return <BasicInput
    disabled={disabled}
    hintText={hintText}
    errorText={errorText}
    size={size}
  >
    <button
      className={clsx('alt-date-picker', className)}
      ref={inputRef}
      onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
      data-testid='alt-test-datepicker'
      type='button'
      disabled={disabled}
    >
      {value
        ? <div className='alt-date-picker__value'>{valueDateFormat.format(value)}</div>
        : <div className="alt-date-picker__placeholder">{placeholder || t('form.datePicker.placeholder')}</div>
      }
      <div className='alt-date-picker__icon'><Icon i='calendar_month' /></div>
    </button>
    {isDatePickerVisible && <FloatingBox
      targetElement={inputRef.current}
      placement='bottom'
      onClose={() => setIsDatePickerVisible(false)}
      mobileBehaviour={FloatingBoxMobileBehaviour.modal}
    >
      <div className='alt-date-picker__header'>
        {!ltePhoneL && picker === Picker.day && <button
          className={clsx('alt-date-picker__currentMonth', {
            'alt-date-picker__currentMonth--selected': currentView !== Picker.day
          })}
          onClick={onCurrentDateClick}
          data-testid='alt-test-datepicker-header'
          type='button'
        >
          {currentMonthFormat.format(currentMonth)}
        </button>}
        {ltePhoneL && picker === Picker.day && <div className='alt-date-picker__title'>{currentMonthFormat.format(currentMonth)}</div>}
        {picker === Picker.month && <div className='alt-date-picker__title'>{t('form.datePicker.chooseMonth')}</div>}
        {picker === Picker.year && <div className='alt-date-picker__title'>{t('form.datePicker.chooseYear')}</div>}
        {!ltePhoneL && currentView === Picker.day && <div className='alt-date-picker__navigation'>
          <button
            className='alt-date-picker__navigation-button'
            onClick={onPrevMonthClick}
            data-testid='alt-test-datepicker-prev'
            type='button'
          >
            <Icon i='arrow_back_ios' />
          </button>
          <button
            className='alt-date-picker__navigation-button'
            onClick={onNextMonthClick}
            data-testid='alt-test-datepicker-next'
            type='button'
          >
            <Icon i='arrow_forward_ios' />
          </button>
        </div>}
      </div>
      { currentView === Picker.day && <Calendar
        currentMonth={currentMonth}
        selectedDate={(value || today) as Date}
        onChange={onChange}
      /> }
      { currentView === Picker.month && <MonthPicker
        currentMonth={currentMonth}
        selectedDate={(value || today) as Date}
        onChange={onChange}
        minYear={minDate.getFullYear()}
        maxYear={maxDate.getFullYear()}
      /> }
      { currentView === Picker.year && <YearPicker
        currentMonth={currentMonth}
        selectedDate={(value || today) as Date}
        onChange={onChange}
        minYear={minDate.getFullYear()}
        maxYear={maxDate.getFullYear()}
      /> }
      {!ltePhoneL && <div className='alt-date-picker__footer'>
        { currentView === Picker.day && <Button onClick={onTodayClick} data-testid='alt-test-datepicker-today'>{t('form.datePicker.today')}</Button>}
        { currentView === Picker.month && <Button onClick={onTodayClick} data-testid='alt-test-datepicker-currentMonth'>{t('form.datePicker.currentMonth')}</Button>}
        <Button
          role={Role.primary}
          className='alt-date-picker__apply'
          onClick={onApplyClick}
          data-testid='alt-test-datepicker-apply'
        >
          {t('common.apply')}
        </Button>
      </div>}
      {ltePhoneL && <div className={clsx('alt-date-picker__footer', {
        'alt-date-picker__footer--compact': currentView !== Picker.day
      })}>
        {currentView === Picker.day && <Button onClick={onPrevMonthClick} className='alt-date-picker__mobilePrevMonth' isIcon><Icon i='arrow_back' /></Button>}
        {currentView === Picker.day && <Button onClick={onCurrentDateClick} className='alt-date-picker__mobileMonthName'>{t('form.datePicker.chooseMonth')}</Button>}
        {currentView === Picker.day && <Button onClick={onNextMonthClick} className='alt-date-picker__mobileNextMonth' isIcon><Icon i='arrow_forward' /></Button>}
        {currentView !== Picker.year && <Button onClick={onTodayClick} className='alt-date-picker__mobileToday' leftIcon={<Icon i='today' />}>{currentView === Picker.day ? t('form.datePicker.today') : t('form.datePicker.currentMonth')}</Button>}
        {(currentView === Picker.day || picker !== Picker.day) && <Button onClick={onApplyClick} className='alt-date-picker__mobileApply' role={Role.primary}>{t('common.apply')}</Button>}
        {currentView !== Picker.day && picker === Picker.day && <Button onClick={onApplyClick} className='alt-date-picker__mobileApply' role={Role.primary} leftIcon={<Icon i='arrow_back_ios' />}>{t('common.back')}</Button>}
      </div>}
    </FloatingBox>}
  </BasicInput>
}

export default memo(DatePicker)