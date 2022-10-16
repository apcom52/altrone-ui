import {memo, useEffect, useRef, useState} from "react";
import button, {ButtonStyle} from "../../button/Button/Button";
import {Icon} from "../../icons";
import {useThemeContext} from "../../../contexts";
import './date-picker.scss'
import {FloatingBox} from "../../containers";
import {Calendar, MonthPicker, YearPicker} from "./index";
import {Button} from "../../button";
import clsx from "clsx";
import {TextInputProps} from "../TextInput";

export enum Picker {
  day = 'day',
  month = 'month',
  year = 'year'
}

interface DatePickerProps extends Pick<TextInputProps, 'errorText' | 'hintText' | 'size' | 'disabled'> {
  value: Date
  onChange: (value: Date) => void
  picker?: Picker
  minYear?: number
  maxYear?: number
}

const DatePicker = ({ value, onChange, picker = Picker.day, minYear = 1900, maxYear = 2050 }: DatePickerProps) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value.getFullYear(), value.getMonth(), 1) :  new Date())
  const [currentView, setCurrentView] = useState<Picker>(picker)
  let { locale } = useThemeContext()

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

  return <>
    <button
      className='alt-date-picker'
      ref={inputRef}
      onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
      data-testid='alt-test-datepicker'
    >
      <div className='alt-date-picker__value'>{value && valueDateFormat.format(value)}</div>
      <div className='alt-date-picker__icon'><Icon i='calendar_month' /></div>
    </button>
    {isDatePickerVisible && <FloatingBox targetRef={inputRef.current} placement='bottom' onClose={() => setIsDatePickerVisible(false)}>
      <div className='alt-date-picker__header'>
        {picker === Picker.day && <button
          className={clsx('alt-date-picker__currentMonth', {
            'alt-date-picker__currentMonth--selected': currentView !== Picker.day
          })}
          onClick={onCurrentDateClick}
          data-testid='alt-test-datepicker-header'
        >
          {currentMonthFormat.format(currentMonth)}
        </button>}
        {picker === Picker.month && <div className='alt-date-picker__title'>Choose a month</div>}
        {picker === Picker.year && <div className='alt-date-picker__title'>Choose an year</div>}
        {currentView === Picker.day && <div className='alt-date-picker__navigation'>
          <button
            className='alt-date-picker__navigation-button'
            onClick={onPrevMonthClick}
            data-testid='alt-test-datepicker-prev'
          >
            <Icon i='arrow_back_ios' />
          </button>
          <button
            className='alt-date-picker__navigation-button'
            onClick={onNextMonthClick}
            data-testid='alt-test-datepicker-next'
          >
            <Icon i='arrow_forward_ios' />
          </button>
        </div>}
      </div>
      { currentView === Picker.day && <Calendar
        currentMonth={currentMonth}
        selectedDate={value as Date}
        onChange={onChange}
      /> }
      { currentView === Picker.month && <MonthPicker
        currentMonth={currentMonth}
        selectedDate={value as Date}
        onChange={onChange}
        minYear={minYear}
        maxYear={maxYear}
      /> }
      { currentView === Picker.year && <YearPicker
        currentMonth={currentMonth}
        selectedDate={value}
        onChange={onChange}
        minYear={minYear}
        maxYear={maxYear}
      /> }
      <div className='alt-date-picker__footer'>
        { currentView === Picker.day && <Button onClick={onTodayClick} data-testid='alt-test-datepicker-today'>Today</Button>}
        { currentView === Picker.month && <Button onClick={onTodayClick} data-testid='alt-test-datepicker-currentMonth'>Current month</Button>}
        <Button
          style={ButtonStyle.primary}
          className='alt-date-picker__apply'
          onClick={onApplyClick}
          data-testid='alt-test-datepicker-apply'
        >
          Apply
        </Button>
      </div>
    </FloatingBox>}
  </>
}

export default memo(DatePicker)