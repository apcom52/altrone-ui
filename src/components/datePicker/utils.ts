import { Dayjs } from 'dayjs';

export function useYearRanges(currentMonth: Dayjs) {
  const currentYear = currentMonth.year();
  const startRange = Math.floor(currentYear / 15) * 15;
  const endRange = startRange + 14;

  return [startRange, endRange];
}
