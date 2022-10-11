import {useThemeContext} from "../../../contexts";
import {memo, useMemo} from "react";
import button from "../../button/Button/Button";

export interface CalendarProps {
  date: Date
  onChange: (value: Date) => void
}

const Calendar = ({ date, onChange }: CalendarProps) => {
  const { locale } = useThemeContext()

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

    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      if (day === 1) {
        for (let prevMonth = 0; prevMonth < firstDay.getDay() - 1; prevMonth++) {
          weeks.push(<button>{prevMonthLastDay.getDate() - firstDay.getDay() + 2 + prevMonth}</button>)
        }

        weeks.push(<button>{day}</button>)
      } else if (day === lastDay.getDate()) {
        weeks.push(<button>{day}</button>)

        for (let nextMonth = 1; nextMonth <= 7 - lastDay.getDay(); nextMonth++) {
          weeks.push(<button>{nextMonth}</button>)
        }
      } else {
        weeks.push(<button>{day}</button>)
      }
    }

    return weeks
  }, [date, onChange])

  return <div className='alt-calendar'>
    {weekdayDateMap.map((day, dayIndex) => (
      <span key={dayIndex}>{weekdayDateFormat.format(day)}</span>
    ))}
    {calendar}
  </div>
}

export default memo(Calendar)