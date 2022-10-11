import {memo, useRef, useState} from "react";
import button, {ButtonStyle} from "../../button/Button/Button";
import {Icon} from "../../icons";
import {useThemeContext} from "../../../contexts";
import './date-picker.scss'
import {FloatingBox} from "../../containers";
import {Calendar} from "./index";
import {Button} from "../../button";

interface DatePickerProps {
  value: Date
  onChange: (value: Date) => void
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  let { locale } = useThemeContext()

  const inputRef = useRef<HTMLButtonElement>(null)

  const valueDateFormat = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  })

  const currentMonthFormat = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long'
  })

  return <>
    <button className='alt-date-picker' ref={inputRef} onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}>
      <div className='alt-date-picker__value'>{value && valueDateFormat.format(value)}</div>
      <div className='alt-date-picker__icon'><Icon i='calendar_month' /></div>
    </button>
    {isDatePickerVisible && <FloatingBox targetRef={inputRef.current} placement='bottom' onClose={() => setIsDatePickerVisible(false)}>
      <div>
        <button>{currentMonthFormat.format(value)}</button>
        <button>{value.getFullYear()}</button>
        <div>
          <button><Icon i='arrow_back_ios' /></button>
          <button><Icon i='arrow_forward_ios' /></button>
        </div>
      </div>
      <Calendar date={value} onChange={onChange} />
      <div>
        <Button>Today</Button>
        <Button style={ButtonStyle.primary}>Apply</Button>
      </div>
    </FloatingBox>}
  </>
}

export default memo(DatePicker)