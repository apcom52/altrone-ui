import { Dayjs } from 'dayjs';
import { CalendarDateRange, CalendarFirstDayOfWeek } from './Calendar.types';

const APP_LANGUAGE_TO_BCP47: Record<string, string> = {
  en: 'en-US',
  ru: 'ru-RU',
  fr: 'fr-FR',
  ge: 'de-DE',
  sp: 'es-ES',
};

export const resolveBcp47 = (
  appLanguage: string | undefined,
  override?: string,
): string =>
  override ??
  APP_LANGUAGE_TO_BCP47[appLanguage ?? ''] ??
  appLanguage ??
  'en-US';

/**
 * First weekday index (0 = Sunday … 6 = Saturday) for a BCP-47 locale.
 * Prefers `Intl.Locale` week info (`getWeekInfo()` on newer engines,
 * `weekInfo` on older Safari); falls back to a Sunday-first check for the
 * few locales that use it when the engine exposes neither.
 */
export const resolveFirstWeekday = (
  locale: string,
  preference: CalendarFirstDayOfWeek,
): 0 | 1 => {
  if (preference === 'monday') return 1;
  if (preference === 'sunday') return 0;

  try {
    const intlLocale = new Intl.Locale(locale) as Intl.Locale & {
      getWeekInfo?: () => { firstDay: number };
      weekInfo?: { firstDay: number };
    };
    const info = intlLocale.getWeekInfo?.() ?? intlLocale.weekInfo;
    if (info?.firstDay) {
      /** Intl reports 1 = Monday … 7 = Sunday. */
      return info.firstDay === 7 ? 0 : 1;
    }
  } catch {
    /* engine without Intl.Locale week info — use the heuristic below */
  }

  return /^(en(-|$)|es-(US|MX)|ja|he|pt-BR|zh)/i.test(locale) ? 0 : 1;
};

/** Localized short weekday names, ordered from `firstWeekday`. */
export const getWeekdayNames = (
  locale: string,
  firstWeekday: 0 | 1,
): string[] => {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  /** 2024-01-07 is a Sunday. */
  const sunday = new Date(2024, 0, 7);
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + ((index + firstWeekday) % 7));
    return formatter.format(day);
  });
};

export const getMonthCaption = (month: Dayjs, locale: string): string =>
  new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(month.toDate());

/**
 * Fixed 6×7 grid of days covering `month`, padded with leading/trailing days
 * from the neighbouring months so the calendar never changes height.
 */
export const buildCalendarGrid = (
  month: Dayjs,
  firstWeekday: 0 | 1,
): Dayjs[] => {
  const firstOfMonth = month.startOf('month');
  const leading = (firstOfMonth.day() - firstWeekday + 7) % 7;
  const gridStart = firstOfMonth.subtract(leading, 'day').startOf('day');

  return Array.from({ length: 42 }, (_, index) => gridStart.add(index, 'day'));
};

/** Orders a range so `from` never comes after `to`. */
export const orderRange = (range: CalendarDateRange): CalendarDateRange => {
  if (range.from && range.to && range.to.isBefore(range.from, 'day')) {
    return { from: range.to, to: range.from };
  }
  return range;
};

/**
 * Range transition on a day click: opens a new range when there is no active
 * start (or the previous range is already complete), otherwise closes it.
 */
export const nextRange = (
  current: CalendarDateRange,
  date: Dayjs,
): CalendarDateRange => {
  if (!current.from || current.to) return { from: date, to: undefined };
  return orderRange({ from: current.from, to: date });
};
