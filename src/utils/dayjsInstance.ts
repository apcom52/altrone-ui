import dayjs from 'dayjs';
import IsBetween from 'dayjs/plugin/isBetween';
import IsToday from 'dayjs/plugin/isToday';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import WeekOfYear from 'dayjs/plugin/weekOfYear';
import LocaleData from 'dayjs/plugin/localeData';

dayjs.extend(IsBetween);
dayjs.extend(IsToday);
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
dayjs.extend(LocalizedFormat);
dayjs.extend(WeekOfYear);
dayjs.extend(LocaleData);

export const dayjsInstance = dayjs;
