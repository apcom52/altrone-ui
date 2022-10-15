import {useThemeContext} from "../../../contexts";
import {memo, useMemo, useState} from "react";
import button from "../../button/Button/Button";
import clsx from "clsx";

export interface CalendarProps {
  currentMonth: Date
  selectedDate: Date
  onChange: (value: Date) => void
}

const makeDateString = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
}

const Calendar = ({ currentMonth, selectedDate, onChange }: CalendarProps) => {
  const { locale } = useThemeContext()

  const today = new Date()
  const todayString = makeDateString(today)

  const valueString = makeDateString(selectedDate)

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

    const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0)
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    console.log('prevMonthLastDay', prevMonthLastDay, '->', currentMonth, firstDay, lastDay);

    const renderDay = (date: Date, dayNumber: number, dayString: string, isAnotherMonth: boolean = false) => {
      return <button
        className={clsx('alt-calendar__day', {
          'alt-calendar__day--another-month': isAnotherMonth,
          'alt-calendar__day--selected': valueString === dayString,
          'alt-calendar__day--today': todayString === dayString
        })}
        onClick={() => onChange(date)}
      >{dayNumber}</button>
    }

    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay()
      const dayString = makeDateString(currentDate)

      console.log({ day, weekDay: currentDate.getDay() });

      if (day === 1) {
        for (let prevMonth = dayOfWeek - 1; prevMonth > 0; prevMonth--) {
          const dayNumber = prevMonthLastDay.getDate() - prevMonth

          weeks.push(
            renderDay(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, dayNumber), dayNumber, makeDateString(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, dayNumber)), true)
          )
        }

        weeks.push(renderDay(currentDate, day, dayString))
      } else if (day === lastDay.getDate()) {
        weeks.push(renderDay(currentDate, day, dayString))

        for (let nextMonth = 1; nextMonth <= 7 - lastDay.getDay(); nextMonth++) {
          weeks.push(
            renderDay(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, nextMonth), nextMonth, makeDateString(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, nextMonth)), true)
          )
        }
      } else {
        weeks.push(renderDay(currentDate, day, dayString))
      }
    }

    return weeks
  }, [currentMonth, onChange, todayString, valueString])

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