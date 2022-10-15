import {memo, useEffect, useRef, useState} from "react";
import button, {ButtonStyle} from "../../button/Button/Button";
import {Icon} from "../../icons";
import {useThemeContext} from "../../../contexts";
import './date-picker.scss'
import {FloatingBox} from "../../containers";
import {Calendar} from "./index";
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
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value.getFullYear(), value.getMonth(), 1) :  new Date())
  let { locale } = useThemeContext()

  const inputRef = useRef<HTMLButtonElement>(null)

  const valueDateFormat = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
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

  useEffect(() => {
    if (value) {
      setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1))
    }
  }, [value])

  return <>
    <button className='alt-date-picker' ref={inputRef} onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}>
      <div className='alt-date-picker__value'>{value && valueDateFormat.format(value)}</div>
      <div className='alt-date-picker__icon'><Icon i='calendar_month' /></div>
    </button>
    {isDatePickerVisible && <FloatingBox targetRef={inputRef.current} placement='bottom' onClose={() => setIsDatePickerVisible(false)}>
      <div className='alt-date-picker__header'>
        <button className={clsx('alt-date-picker__currentMonth')}>{currentMonthFormat.format(currentMonth)}</button>
        <div className='alt-date-picker__navigation'>
          <button className='alt-date-picker__navigation-button' onClick={onPrevMonthClick}><Icon i='arrow_back_ios' /></button>
          <button className='alt-date-picker__navigation-button' onClick={onNextMonthClick}><Icon i='arrow_forward_ios' /></button>
        </div>
      </div>
      <Calendar currentMonth={currentMonth} selectedDate={value} onChange={onChange} />
      <div className='alt-date-picker__footer'>
        <Button>Today</Button>
        <Button style={ButtonStyle.primary}>Apply</Button>
      </div>
    </FloatingBox>}
  </>
}

export default memo(DatePicker)