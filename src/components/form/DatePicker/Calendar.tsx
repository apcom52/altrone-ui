import {useThemeContext} from "../../../contexts";
import {memo, useMemo, useState} from "react";
import button from "../../button/Button/Button";
import clsx from "clsx";

export interface CalendarProps {
  date: Date
  onChange: (value: Date) => void
}

const makeDateString = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
}

const Calendar = ({ date, onChange }: CalendarProps) => {
  const { locale } = useThemeContext()

  const today = new Date()
  const todayString = makeDateString(today)

  const [calendarDate, setCalendarDate] = useState(date || today)
  const valueString = makeDateString(calendarDate)

  const weekdayDateMap = [
    new Date('2020-01-06T00:00:00.000Z'),
    new Date('2020-01-07T00:00:00.000Z'),
    new Date('2020-01-08T00:00:00.000Z'),
    new Date('2020-01-09T00:00:00.000Z'),
    new Date('2020-01-10T00:00:00.000Z'),
    new Date('2020-01-11T00:00:00.000Z'),
    new Date('2020-01-12T00:00:00.000Z'),
  ];

  const weekdayDateFormat = new Intl.DateTimeFormat(locale, {
    weekday: 'short'
  })

  const calendar = useMemo(() => {
    const weeks = []

    const prevMonthLastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 0)
    const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1)
    const lastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0)

    const renderDay = (dayNumber: number, dayString: string, isAnotherMonth: boolean = false) => {
      return <button className={clsx('alt-calendar__day', {
        'alt-calendar__day--another-month': isAnotherMonth,
        'alt-calendar__day--selected': valueString === dayString,
        'alt-calendar__day--today': todayString === dayString
      })}>{dayNumber}</button>
    }

    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      const dayString = makeDateString(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day))

      if (day === 1) {
        for (let prevMonth = 0; prevMonth < firstDay.getDay() - 1; prevMonth++) {
          const dayNumber = prevMonthLastDay.getDate() - firstDay.getDay() + 2 + prevMonth

          weeks.push(
            renderDay(dayNumber, makeDateString(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, dayNumber)), true)
          )
        }

        weeks.push(renderDay(day, dayString))
      } else if (day === lastDay.getDate()) {
        weeks.push(renderDay(day, dayString))

        for (let nextMonth = 1; nextMonth <= 7 - lastDay.getDay(); nextMonth++) {
          weeks.push(
            renderDay(nextMonth, makeDateString(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, nextMonth)), true)
          )
        }
      } else {
        weeks.push(renderDay(day, dayString))
      }
    }

    return weeks
  }, [calendarDate, onChange, todayString, valueString])

  return <div className='alt-calendar'>
    {weekdayDateMap.map((day, dayIndex) => (
      <span className={clsx('alt-calendar__weekday', {
        'alt-calendar__weekday--weekend': dayIndex > 4
      })} key={dayIndex}>{weekdayDateFormat.format(day)}</span>
    ))}
    {calendar}
  </div>
}

export default memo(Calendar)