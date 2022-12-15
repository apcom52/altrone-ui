import {CalendarProps} from "./Calendar";
import {memo, useMemo} from "react";
import {Option} from "../../../types";
import {ScrollableSelector} from "../ScrollableSelector";

export interface YearPickerProps extends CalendarProps {
  minYear: number
  maxYear: number
}

const YearPicker = ({ selectedDate = new Date(), onChange, minYear, maxYear }: YearPickerProps) => {
  const years = useMemo(() => {
    const result: Option<number>[] = []
    for (let year = minYear; year <= maxYear; year++) {
      result.push({
        label: year.toString(),
        value: year
      })
    }

    return result
  }, [minYear, maxYear])

  const onSelectYear = (year) => {
    onChange(new Date(year, 1, 1))
  }

  return <div className='alt-year-picker' data-testid='alt-test-year-picker'>
    <ScrollableSelector value={selectedDate.getFullYear()} options={years} onChange={onSelectYear} />
  </div>
}

export default memo(YearPicker)