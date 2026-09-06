import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

const REFERENCE_MONTH = dayjs('2024-08-01');

export const Overview: Story = {
  render: () => {
    const [value, setValue] = useState(() => dayjs('2024-08-14'));

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
        <Text size={6} weight="bold" block>
          Calendar
        </Text>
        <Text block>
          <Text code>Calendar</Text> renders a single month on a fixed six-row
          grid, so its height never shifts as you page between months. It ships
          with two API levels: a high-level one where the component owns the
          selection (<Text code>mode</Text> plus <Text code>value</Text> /{' '}
          <Text code>onSelect</Text>) and its own navigation header, and a
          low-level one (<Text code>selectedDates</Text> +{' '}
          <Text code>DateComponent</Text>) for embedding inside other controls.
          The day-cell styling mirrors the calendar inside{' '}
          <Text code>DatePicker</Text>.
        </Text>

        <Calendar
          mode="single"
          defaultMonth={REFERENCE_MONTH}
          value={value}
          onSelect={(next) => setValue(next as typeof value)}
        />

        <Text size={2} color="muted" block>
          Selected: {value.format('DD MMMM YYYY')}
        </Text>
      </Flex>
    );
  },
};

export const HeaderAndNavigation: Story = {
  render: () => {
    const [showHeader, setShowHeader] = useState(true);
    const [showNavigation, setShowNavigation] = useState(true);
    const [showWeekdays, setShowWeekdays] = useState(true);
    const [showOutsideDays, setShowOutsideDays] = useState(true);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
        <Text size={5} weight="bold" block>
          Header and navigation
        </Text>
        <Text block>
          The month caption, the <Text code>‹</Text> / <Text code>›</Text>{' '}
          navigation, the weekday row and the adjacent-month days are each
          independently toggleable. In high-level (<Text code>mode</Text>) usage
          the header and weekday row are on by default; the low-level API turns
          them off unless you ask for them.
        </Text>

        <Flex direction="vertical" gap="s">
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
          defaultMonth={REFERENCE_MONTH}
          showHeader={showHeader}
          showNavigation={showNavigation}
          showWeekdays={showWeekdays}
          showOutsideDays={showOutsideDays}
        />
      </Flex>
    );
  },
};

export const SelectionModes: Story = {
  render: () => {
    const [single, setSingle] = useState(() => dayjs('2024-08-09'));
    const [multiple, setMultiple] = useState(() => [
      dayjs('2024-08-06'),
      dayjs('2024-08-13'),
      dayjs('2024-08-20'),
    ]);
    const [range, setRange] = useState<CalendarDateRange>(() => ({
      from: dayjs('2024-08-11'),
      to: dayjs('2024-08-19'),
    }));

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Selection modes
        </Text>
        <Text block>
          The <Text code>mode</Text> prop picks how clicks accumulate:{' '}
          <Text code>single</Text> keeps one date, <Text code>multiple</Text>{' '}
          toggles a set, and <Text code>range</Text> collects a start and an end.
          Each mode reports the matching value shape through{' '}
          <Text code>onSelect</Text>.
        </Text>

        <Flex direction="horizontal" gap="xl" wrap>
          <Flex direction="vertical" gap="s">
            <Text weight="medium" block>
              single
            </Text>
            <Calendar
              mode="single"
              defaultMonth={REFERENCE_MONTH}
              value={single}
              onSelect={(next) => setSingle(next as typeof single)}
            />
          </Flex>

          <Flex direction="vertical" gap="s">
            <Text weight="medium" block>
              multiple
            </Text>
            <Calendar
              mode="multiple"
              defaultMonth={REFERENCE_MONTH}
              value={multiple}
              onSelect={(next) => setMultiple(next as typeof multiple)}
            />
          </Flex>

          <Flex direction="vertical" gap="s">
            <Text weight="medium" block>
              range
            </Text>
            <Calendar
              mode="range"
              defaultMonth={REFERENCE_MONTH}
              value={range}
              onSelect={(next) => setRange(next as CalendarDateRange)}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export const RangeHighlighting: Story = {
  render: () => {
    const [range, setRange] = useState<CalendarDateRange>(() => ({
      from: dayjs('2024-08-08'),
    }));

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
        <Text size={5} weight="bold" block>
          Range highlighting
        </Text>
        <Text block>
          While a range has a start but no end, hovering a day previews the band
          between them — the same interaction <Text code>DatePicker.Range</Text>{' '}
          uses. The band rounds at the range ends and at the edges of every week
          row.
        </Text>

        <Calendar
          mode="range"
          defaultMonth={REFERENCE_MONTH}
          value={range}
          onSelect={(next) => setRange(next as CalendarDateRange)}
        />

        <Text size={2} color="muted" block>
          {range.from
            ? range.to
              ? `${range.from.format('DD.MM')} – ${range.to.format('DD.MM')}`
              : `${range.from.format('DD.MM')} – …`
            : 'nothing selected'}
        </Text>
      </Flex>
    );
  },
};

export const LocalizationAndWeekStart: Story = {
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text size={5} weight="bold" block>
        Localization and week start
      </Text>
      <Text block>
        Month captions and weekday names come from the active locale. The first
        day of the week is resolved from that locale by default
        (<Text code>firstDayOfWeek="auto"</Text>) — Sunday for{' '}
        <Text code>en-US</Text>, Monday for <Text code>ru-RU</Text> — and can be
        pinned with <Text code>firstDayOfWeek="monday" | "sunday"</Text>.
      </Text>

      <Flex direction="horizontal" gap="xl" wrap>
        <Flex direction="vertical" gap="s">
          <Text weight="medium" block>
            locale="en-US" (auto → Sunday)
          </Text>
          <Calendar
            mode="single"
            locale="en-US"
            defaultMonth={REFERENCE_MONTH}
          />
        </Flex>

        <Flex direction="vertical" gap="s">
          <Text weight="medium" block>
            locale="ru-RU" (auto → Monday)
          </Text>
          <Calendar
            mode="single"
            locale="ru-RU"
            defaultMonth={REFERENCE_MONTH}
          />
        </Flex>

        <Flex direction="vertical" gap="s">
          <Text weight="medium" block>
            locale="en-US", firstDayOfWeek="monday"
          </Text>
          <Calendar
            mode="single"
            locale="en-US"
            firstDayOfWeek="monday"
            defaultMonth={REFERENCE_MONTH}
          />
        </Flex>
      </Flex>
    </Flex>
  ),
};

export const Constraints: Story = {
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
      <Text size={5} weight="bold" block>
        Disabled days
      </Text>
      <Text block>
        <Text code>minDate</Text> / <Text code>maxDate</Text> clamp the
        selectable window; <Text code>isDateDisabled</Text> rejects individual
        days by predicate (here: every weekend).
      </Text>

      <Calendar
        mode="single"
        defaultMonth={REFERENCE_MONTH}
        minDate={dayjs('2024-08-05')}
        maxDate={dayjs('2024-08-26')}
        isDateDisabled={(date) => date.day() === 0 || date.day() === 6}
      />
    </Flex>
  ),
};

export const LowLevelGrid: Story = {
  render: () => {
    const [selected, setSelected] = useState(() => dayjs('2024-08-14'));

    const DateCell = (props: CalendarRenderDateProps) => (
      <button
        type="button"
        onClick={(event) => props.onSelect?.(props.currentDate, event)}
        style={{
          border: 'none',
          background: props.selected ? 'var(--accent-a4)' : 'transparent',
          color: props.fromAnotherMonth
            ? 'var(--disabled-text-color)'
            : 'var(--text-2)',
          borderRadius: 'var(--radius-s)',
          height: 32,
          cursor: 'pointer',
        }}
      >
        {props.currentDate.date()}
      </button>
    );

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 480 }}>
        <Text size={5} weight="bold" block>
          Low-level grid
        </Text>
        <Text block>
          Omit <Text code>mode</Text> and the header/weekday row disappear —{' '}
          <Text code>Calendar</Text> becomes a bare day grid whose cells are
          rendered by <Text code>DateComponent</Text> (or{' '}
          <Text code>Calendar.Date</Text>). This is the shape{' '}
          <Text code>DatePicker</Text> builds on. Navigation and selection state
          are the caller's responsibility.
        </Text>

        <Calendar
          month={REFERENCE_MONTH}
          selectedDates={[selected]}
          onDateChange={(date) => setSelected(date)}
          DateComponent={DateCell}
        />
      </Flex>
    );
  },
};
