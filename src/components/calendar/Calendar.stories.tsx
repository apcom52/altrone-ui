import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import type { Dayjs } from 'dayjs';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Switcher } from '../switcher';
import { Calendar } from './Calendar.tsx';
import {
  CalendarDateRange,
  CalendarRenderDateProps,
} from './Calendar.types.ts';
import { dayjsInstance as dayjs } from '../../utils';

/**
 * These stories follow one running example: the booking widget for **Cedar
 * Cabin**, a fictional cabin rental. Each story is a different surface of that
 * product, so the props stay in a concrete context instead of an abstract demo.
 */
const story: Meta<typeof Calendar> = {
  title: 'Components/Display/Calendar',
  component: Calendar,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export default story;

type Story = StoryObj<typeof Calendar>;

/** Peak-season August — the month every Cedar Cabin story opens on. */
const SEASON = dayjs('2024-08-01');

const NIGHTLY_RATE = (date: Dayjs) =>
  date.day() === 5 || date.day() === 6 ? 210 : 160;

const BOOKED_NIGHTS = [
  ['2024-08-12', '2024-08-15'],
  ['2024-08-23', '2024-08-26'],
].map(([from, to]) => ({ from: dayjs(from), to: dayjs(to) }));

const isBooked = (date: Dayjs) =>
  BOOKED_NIGHTS.some(
    (nights) =>
      date.isSameOrAfter(nights.from, 'day') &&
      date.isSameOrBefore(nights.to, 'day'),
  );

const Receipt = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) => (
  <Flex
    direction="vertical"
    gap="none"
    style={{
      borderRadius: 'var(--radius-m)',
      border: '1px solid var(--border-1)',
      padding: 'var(--gap)',
      minWidth: 200,
    }}
  >
    <Text size={1} color="muted" block>
      {label}
    </Text>
    <Text size={4} weight="bold" block>
      {value}
    </Text>
    {hint ? (
      <Text size={1} color="muted" block>
        {hint}
      </Text>
    ) : null}
  </Flex>
);

// ─────────────────────────────────────────────────────────────────────────────

export const CheckInDate: Story = {
  name: 'Overview — “When do you arrive?”',
  render: () => {
    const [checkIn, setCheckIn] = useState(() => dayjs('2024-08-14'));

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Text size={6} weight="bold" block>
          Cedar Cabin
        </Text>
        <Text block>
          The whole booking flow starts here. <Text code>Calendar</Text> draws
          one month on a fixed six-row grid, so the panel never jumps height as a
          guest pages through the summer. The default (<Text code>mode</Text>{' '}
          set) is fully self-contained: it owns the selection via{' '}
          <Text code>value</Text> / <Text code>onSelect</Text> and paints its own
          month header. The day cells are the same ones{' '}
          <Text code>DatePicker</Text> renders.
        </Text>

        <Flex direction="horizontal" gap="xl" wrap align="start">
          <Calendar
            mode="single"
            defaultMonth={SEASON}
            value={checkIn}
            onSelect={(next) => setCheckIn(next as typeof checkIn)}
          />
          <Receipt
            label="Arrival"
            value={checkIn.format('ddd, D MMM')}
            hint={`Check-in from 15:00 · $${NIGHTLY_RATE(checkIn)}/night`}
          />
        </Flex>
      </Flex>
    );
  },
};

export const ThreeQuestions: Story = {
  name: 'Selection modes — one calendar, three jobs',
  render: () => {
    const [arrival, setArrival] = useState(() => dayjs('2024-08-09'));
    const [cleaningDays, setCleaningDays] = useState(() => [
      dayjs('2024-08-05'),
      dayjs('2024-08-12'),
      dayjs('2024-08-19'),
      dayjs('2024-08-26'),
    ]);
    const [stay, setStay] = useState<CalendarDateRange>(() => ({
      from: dayjs('2024-08-09'),
      to: dayjs('2024-08-15'),
    }));

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          The same widget answers three different questions
        </Text>
        <Text block>
          <Text code>mode</Text> decides how clicks accumulate.{' '}
          <Text code>single</Text> keeps one date, <Text code>multiple</Text>{' '}
          toggles a set, <Text code>range</Text> collects a start and an end —
          and <Text code>onSelect</Text> hands back the matching value shape.
        </Text>

        <Flex direction="horizontal" gap="xl" wrap align="start">
          <Flex direction="vertical" gap="s">
            <Text weight="medium" block>
              Guest picks an arrival day — <Text code>single</Text>
            </Text>
            <Calendar
              mode="single"
              defaultMonth={SEASON}
              value={arrival}
              onSelect={(next) => setArrival(next as typeof arrival)}
            />
            <Text size={2} color="muted" block>
              {arrival.format('dddd, D MMMM')}
            </Text>
          </Flex>

          <Flex direction="vertical" gap="s">
            <Text weight="medium" block>
              Host schedules housekeeping — <Text code>multiple</Text>
            </Text>
            <Calendar
              mode="multiple"
              defaultMonth={SEASON}
              value={cleaningDays}
              onSelect={(next) => setCleaningDays(next as typeof cleaningDays)}
            />
            <Text size={2} color="muted" block>
              {cleaningDays.length} cleaning visit
              {cleaningDays.length === 1 ? '' : 's'} this month
            </Text>
          </Flex>

          <Flex direction="vertical" gap="s">
            <Text weight="medium" block>
              Guest blocks out the whole stay — <Text code>range</Text>
            </Text>
            <Calendar
              mode="range"
              defaultMonth={SEASON}
              value={stay}
              onSelect={(next) => setStay(next as CalendarDateRange)}
            />
            <Text size={2} color="muted" block>
              {stay.from && stay.to
                ? `${stay.to.diff(stay.from, 'day')} nights`
                : 'pick a start and an end'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export const CountingNights: Story = {
  name: 'Range highlighting — drag to count nights',
  render: () => {
    const [stay, setStay] = useState<CalendarDateRange>(() => ({
      from: dayjs('2024-08-08'),
    }));

    const nights =
      stay.from && stay.to ? stay.to.diff(stay.from, 'day') : undefined;
    const total = useMemo(() => {
      if (!stay.from || !stay.to) return undefined;
      let sum = 0;
      let cursor = stay.from;
      while (cursor.isBefore(stay.to, 'day')) {
        sum += NIGHTLY_RATE(cursor);
        cursor = cursor.add(1, 'day');
      }
      return sum;
    }, [stay]);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
        <Text size={5} weight="bold" block>
          The nights add up as you hover
        </Text>
        <Text block>
          Once a range has a start but no end, hovering a day previews the band
          between them — the exact interaction <Text code>DatePicker.RangePicker</Text>{' '}
          uses. The fill is one continuous block: it rounds only at the true
          ends, and where the stay spills onto the next week the corners stay
          square.
        </Text>

        <Flex direction="horizontal" gap="xl" wrap align="start">
          <Calendar
            mode="range"
            defaultMonth={SEASON}
            value={stay}
            onSelect={(next) => setStay(next as CalendarDateRange)}
          />
          <Receipt
            label={stay.from && stay.to ? 'Your stay' : 'Pick your dates'}
            value={
              nights === undefined
                ? '— nights'
                : `${nights} night${nights === 1 ? '' : 's'}`
            }
            hint={
              total === undefined
                ? stay.from
                  ? `${stay.from.format('D MMM')} → …`
                  : undefined
                : `${stay.from!.format('D MMM')} – ${stay.to!.format(
                    'D MMM',
                  )} · $${total} total`
            }
          />
        </Flex>
      </Flex>
    );
  },
};

export const BookedAndClosed: Story = {
  name: 'Constraints — the calendar the guest actually sees',
  render: () => {
    const [stay, setStay] = useState<CalendarDateRange>(() => ({}));

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
        <Text size={5} weight="bold" block>
          Half the month is already off the table
        </Text>
        <Text block>
          <Text code>minDate</Text> opens the booking window (no arrivals before
          the 5th), <Text code>maxDate</Text> closes it at the end of the season,
          and <Text code>isDateDisabled</Text> knocks out the nights that are
          already booked plus every Wednesday, when the cabin has no turnover
          crew.
        </Text>

        <Calendar
          mode="range"
          defaultMonth={SEASON}
          value={stay}
          onSelect={(next) => setStay(next as CalendarDateRange)}
          minDate={dayjs('2024-08-05')}
          maxDate={dayjs('2024-08-31')}
          isDateDisabled={(date) => isBooked(date) || date.day() === 3}
        />

        <Text size={2} color="muted" block>
          Greyed days: already booked (12–15, 23–26 Aug), closed Wednesdays, or
          outside the 5–31 Aug window.
        </Text>
      </Flex>
    );
  },
};

export const GuestsFromEverywhere: Story = {
  name: 'Localization — the same week, three guests',
  render: () => {
    const guests: Array<{ city: string; locale: string; note: string }> = [
      { city: 'Denver', locale: 'en-US', note: 'auto → week starts Sunday' },
      { city: 'Berlin', locale: 'de-DE', note: 'auto → week starts Monday' },
      { city: 'Moscow', locale: 'ru-RU', note: 'auto → week starts Monday' },
    ];

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Cedar Cabin takes bookings from everywhere
        </Text>
        <Text block>
          The month caption and weekday names come from the active locale, and
          the first day of the week is derived from it too
          (<Text code>firstDayOfWeek="auto"</Text>). Pass{' '}
          <Text code>locale</Text> to override the app language for one calendar,
          or pin the week with{' '}
          <Text code>firstDayOfWeek="monday" | "sunday"</Text>.
        </Text>

        <Flex direction="horizontal" gap="xl" wrap align="start">
          {guests.map((guest) => (
            <Flex key={guest.city} direction="vertical" gap="s">
              <Text weight="medium" block>
                {guest.city} · <Text code>{guest.locale}</Text>
              </Text>
              <Calendar
                mode="single"
                locale={guest.locale}
                defaultMonth={SEASON}
                defaultValue={dayjs('2024-08-14')}
              />
              <Text size={1} color="muted" block>
                {guest.note}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  },
};

export const FitsAnywhere: Story = {
  name: 'Chrome — trim it to fit a narrow sidebar',
  render: () => {
    const [showHeader, setShowHeader] = useState(true);
    const [showNavigation, setShowNavigation] = useState(true);
    const [showWeekdays, setShowWeekdays] = useState(true);
    const [showOutsideDays, setShowOutsideDays] = useState(true);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
        <Text size={5} weight="bold" block>
          The same calendar, embedded four ways
        </Text>
        <Text block>
          When <Text code>Calendar</Text> sits inside a bigger control (a
          date-range popover, a compact filter rail) the surrounding UI often
          supplies its own month switcher and weekday labels. Every piece of
          chrome is an independent toggle — flip them to see what stays.
        </Text>

        <Flex direction="horizontal" gap="l" wrap>
          <Switcher
            checked={showHeader}
            onChange={(checked) => setShowHeader(checked)}
          >
            showHeader
          </Switcher>
          <Switcher
            checked={showNavigation}
            onChange={(checked) => setShowNavigation(checked)}
          >
            showNavigation
          </Switcher>
          <Switcher
            checked={showWeekdays}
            onChange={(checked) => setShowWeekdays(checked)}
          >
            showWeekdays
          </Switcher>
          <Switcher
            checked={showOutsideDays}
            onChange={(checked) => setShowOutsideDays(checked)}
          >
            showOutsideDays
          </Switcher>
        </Flex>

        <Calendar
          mode="single"
          defaultMonth={SEASON}
          defaultValue={dayjs('2024-08-14')}
          showHeader={showHeader}
          showNavigation={showNavigation}
          showWeekdays={showWeekdays}
          showOutsideDays={showOutsideDays}
        />
      </Flex>
    );
  },
};

export const HostAvailability: Story = {
  name: 'Low-level — the host’s pricing grid',
  render: () => {
    const [openNight, setOpenNight] = useState(() => dayjs('2024-08-14'));

    const PriceCell = (props: CalendarRenderDateProps) => {
      const booked = isBooked(props.currentDate);
      const selectable = !props.fromAnotherMonth && !booked;

      return (
        <button
          type="button"
          disabled={!selectable}
          onClick={(event) => props.onSelect?.(props.currentDate, event)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: 44,
            height: 44,
            border: props.selected
              ? '1px solid var(--accent-8)'
              : '1px solid transparent',
            borderRadius: 'var(--radius-s)',
            background: booked
              ? 'var(--interactive-a1)'
              : props.selected
                ? 'var(--accent-a3)'
                : 'transparent',
            color: props.fromAnotherMonth
              ? 'var(--disabled-text-color)'
              : 'var(--text-2)',
            cursor: selectable ? 'pointer' : 'default',
          }}
        >
          <Text size={2} weight="medium">
            {props.currentDate.date()}
          </Text>
          <Text size={1} color={booked ? 'muted' : undefined}>
            {booked ? 'booked' : `$${NIGHTLY_RATE(props.currentDate)}`}
          </Text>
        </button>
      );
    };

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 480 }}>
        <Text size={5} weight="bold" block>
          The host sees rates, not just dates
        </Text>
        <Text block>
          Drop <Text code>mode</Text> and the header and weekday row go away —{' '}
          <Text code>Calendar</Text> becomes a bare grid whose cells you render
          yourself via <Text code>DateComponent</Text>. Here each cell carries a
          nightly rate and its own booked state; the grid, the month math and the
          fixed six rows still come for free.
        </Text>

        <Calendar
          month={SEASON}
          selectedDates={[openNight]}
          onDateChange={(date) => setOpenNight(date)}
          DateComponent={PriceCell}
        />

        <Text size={2} color="muted" block>
          Editing {openNight.format('D MMMM')} · $
          {NIGHTLY_RATE(openNight)}/night
        </Text>
      </Flex>
    );
  },
};
