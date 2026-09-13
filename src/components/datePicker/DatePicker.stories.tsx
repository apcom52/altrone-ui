import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Flex, Form, Text } from 'components';
import { dayjsInstance as dayjs } from 'utils';
import { Dayjs } from 'dayjs';
import { CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { RangePickerValue } from './DatePicker.types.ts';
import { useDatePickerTrigger } from './DatePicker.contexts.ts';
import { DatePicker } from './DatePicker.tsx';

/**
 * The running example here is **Kestrel**, a private-charter booking desk.
 * `DatePicker` and its variants show up on every form the dispatchers touch —
 * a single departure date, a lease window, a roster month, an airframe year.
 * All variants share one read-only `TextInput` that opens a `Calendar` popover.
 */
const story: Meta<typeof DatePicker> = {
  title: 'Components/Controls/DatePicker',
  component: DatePicker,
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

const TODAY = dayjs();
/** Kestrel takes bookings up to a year out. */
const BOOKING_HORIZON = TODAY.add(1, 'year');

const Panel = ({ children }: { children: React.ReactNode }) => (
  <Flex
    direction="vertical"
    gap="l"
    style={{
      maxWidth: 720,
      padding: 'var(--l-gap)',
      borderRadius: 'var(--radius-l)',
      border: '1px solid var(--border-1)',
    }}
  >
    {children}
  </Flex>
);

// ─────────────────────────────────────────────────────────────────────────────

export const DepartureDate: StoryObj = {
  name: 'Overview — a single departure date',
  render: () => {
    const [departure, setDeparture] = useState<Dayjs | undefined>(
      TODAY.add(9, 'day'),
    );

    return (
      <Flex direction="vertical" gap="xl">
        <Text size={6} weight="bold" block>
          Kestrel — book a flight
        </Text>
        <Text block>
          The field itself is a read-only <Text code>TextInput</Text>; clicking
          it opens the day grid, which is the library's{' '}
          <Text code>Calendar</Text> in <Text code>mode="single"</Text>. Set{' '}
          <Text code>minDate</Text> / <Text code>maxDate</Text> to fence the
          booking window, <Text code>format</Text> to control how the chosen date
          reads back, and <Text code>clearable</Text> to let a dispatcher wipe
          it.
        </Text>

        <Panel>
          <Form>
            <Flex direction="horizontal" gap="l" wrap>
              <Form.Field
                label="Departure"
                hintText="Today through one year out"
              >
                <DatePicker
                  value={departure}
                  onChange={(value) => setDeparture(value)}
                  minDate={TODAY}
                  maxDate={BOOKING_HORIZON}
                  format="ddd, DD MMM YYYY"
                  clearable
                  placeholder="Pick a departure date"
                />
              </Form.Field>
              <Form.Field label="Confirmed">
                <Text block style={{ opacity: departure ? 1 : 0.45 }}>
                  {departure
                    ? departure.format('dddd, D MMMM YYYY')
                    : 'no date yet'}
                </Text>
              </Form.Field>
            </Flex>
          </Form>
        </Panel>
      </Flex>
    );
  },
};

export const LeaseWindow: StoryObj = {
  name: 'RangePicker — an aircraft lease window',
  render: () => {
    const [lease, setLease] = useState<RangePickerValue>([
      TODAY.add(5, 'day'),
      TODAY.add(19, 'day'),
    ]);
    const [survey, setSurvey] = useState<RangePickerValue>([]);

    const summarise = (range: RangePickerValue) => {
      const [start, end] = range;
      if (!start && !end) return 'not set';
      const a = start ? start.format('D MMM') : '…';
      const b = end ? end.format('D MMM') : '…';
      return start && end
        ? `${a} – ${b} · ${end.diff(start, 'day')} days`
        : `${a} – ${b}`;
    };

    return (
      <Flex direction="vertical" gap="xl">
        <Text size={5} weight="bold" block>
          Two dates, one field
        </Text>
        <Text block>
          <Text code>DatePicker.RangePicker</Text> collects a start and an end in
          a single control. The <Text code>Calendar</Text> underneath runs in{' '}
          <Text code>mode="range"</Text>: the first click sets the start, hovering
          previews the span, the second click closes it. Days before the start
          are locked until the range completes, and <Text code>minDate</Text> /{' '}
          <Text code>maxDate</Text> bound both ends.
        </Text>

        <Panel>
          <Form>
            <Flex direction="horizontal" gap="l" wrap>
              <Form.Field
                label="Lease period"
                hintText={summarise(lease)}
              >
                <DatePicker.RangePicker
                  value={lease}
                  onChange={(value) => setLease(value ?? [])}
                  minDate={TODAY}
                  maxDate={BOOKING_HORIZON}
                  clearable
                />
              </Form.Field>
              <Form.Field
                label="Pre-delivery survey (stays open after first pick)"
                hintText={summarise(survey)}
              >
                <DatePicker.RangePicker
                  value={survey}
                  onChange={(value) => setSurvey(value ?? [])}
                  autoClose={false}
                  placeholder="Select survey dates"
                />
              </Form.Field>
            </Flex>
          </Form>
        </Panel>
      </Flex>
    );
  },
};

export const CoarserGrains: StoryObj = {
  name: 'Month & Year — same field, coarser grain',
  render: () => {
    const [rosterMonth, setRosterMonth] = useState<Dayjs | undefined>(
      TODAY.startOf('month'),
    );
    const [airframeYear, setAirframeYear] = useState<Dayjs | undefined>(
      dayjs('2019'),
    );

    return (
      <Flex direction="vertical" gap="xl">
        <Text size={5} weight="bold" block>
          When the day doesn&apos;t matter
        </Text>
        <Text block>
          <Text code>MonthPicker</Text> and <Text code>YearPicker</Text> come off
          the same factory as <Text code>DatePicker</Text> — only the popover&apos;s
          starting view changes. The stored value is still a full{' '}
          <Text code>Dayjs</Text>, snapped to the first of the month or year.
        </Text>

        <Panel>
          <Form>
            <Flex direction="horizontal" gap="l" wrap>
              <Form.Field
                label="Crew roster month"
                hintText={
                  rosterMonth ? rosterMonth.format('MMMM YYYY') : 'not set'
                }
              >
                <DatePicker.MonthPicker
                  value={rosterMonth}
                  onChange={(value) => setRosterMonth(value)}
                  minDate={dayjs('2023-01')}
                  maxDate={dayjs('2026-12')}
                  clearable
                />
              </Form.Field>
              <Form.Field
                label="Airframe year of manufacture"
                hintText={airframeYear ? airframeYear.format('YYYY') : 'not set'}
              >
                <DatePicker.YearPicker
                  value={airframeYear}
                  onChange={(value) => setAirframeYear(value)}
                  minDate={dayjs('2005')}
                  maxDate={TODAY}
                  format="YYYY"
                />
              </Form.Field>
            </Flex>
          </Form>
        </Panel>
      </Flex>
    );
  },
};

export const FieldStates: StoryObj = {
  name: 'States — the field on a real form',
  render: () => {
    const confirmedLeg = TODAY.add(7, 'day');
    const [draft, setDraft] = useState<Dayjs | undefined>(undefined);

    return (
      <Flex direction="vertical" gap="xl">
        <Text size={5} weight="bold" block>
          Read-only, disabled, transparent, invalid
        </Text>
        <Text block>
          Because the trigger is a <Text code>TextInput</Text>, its style props
          pass straight through. <Text code>readOnly</Text> keeps the value
          legible but stops the popover from opening — the right state for a leg
          that&apos;s already been flown — while <Text code>invalid</Text> flags
          a field dispatch still needs.
        </Text>

        <Panel>
          <Form>
            <Flex direction="horizontal" gap="l" wrap>
              <Form.Field label="Return leg (confirmed)">
                <DatePicker value={confirmedLeg} readOnly />
              </Form.Field>
              <Form.Field label="Disabled">
                <DatePicker value={confirmedLeg} disabled />
              </Form.Field>
              <Form.Field label="Compact (sits in a filter rail)">
                <DatePicker
                  value={draft}
                  onChange={(value) => setDraft(value)}
                  size="s"
                  clearable
                  placeholder="Add a date"
                />
              </Form.Field>
              <Form.Field
                label="Required, not yet filled"
                hintText="Dispatch needs a date before release"
              >
                <DatePicker
                  value={draft}
                  onChange={(value) => setDraft(value)}
                  invalid={!draft}
                  clearable
                  placeholder="Pick a date"
                />
              </Form.Field>
            </Flex>
          </Form>
        </Panel>
      </Flex>
    );
  },
};

/**
 * A trigger built as its own component: it reads the live picker state through
 * `useDatePickerTrigger()` instead of threading it through props, and forwards
 * `ref` + the picker's props (`className` / `onClick` / aria) onto its `Button`.
 */
const FancyTrigger = ({
  ref,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { displayValue, expanded } = useDatePickerTrigger();

  return (
    <Button
      ref={ref}
      {...rest}
      label={displayValue || 'Choose a date'}
      icon={<CalendarDays />}
      additionalIcon={expanded ? <ChevronUp /> : <ChevronDown />}
      selected={expanded}
    />
  );
};

export const CustomTrigger: StoryObj = {
  name: 'Custom trigger — renderFunc & asChild',
  render: () => {
    const [asButton, setAsButton] = useState<Dayjs | undefined>(
      TODAY.add(4, 'day'),
    );
    const [asChip, setAsChip] = useState<Dayjs | undefined>(undefined);
    const [asChildDate, setAsChildDate] = useState<Dayjs | undefined>(
      TODAY.add(21, 'day'),
    );

    return (
      <Flex direction="vertical" gap="xl">
        <Text size={5} weight="bold" block>
          The field doesn&apos;t have to be a field
        </Text>
        <Text block>
          By default the trigger is a read-only <Text code>TextInput</Text>.{' '}
          <Text code>renderFunc</Text> swaps it for whatever element you return —
          it receives the live trigger state (<Text code>displayValue</Text>,{' '}
          <Text code>value</Text>, <Text code>expanded</Text>,{' '}
          <Text code>clear</Text>) plus the picker&apos;s{' '}
          <Text code>className</Text> / <Text code>style</Text>.{' '}
          <Text code>asChild</Text> instead merges those onto an element you pass
          as <Text code>children</Text>. Any component nested under the picker can
          also read the state via <Text code>useDatePickerTrigger()</Text>.
        </Text>

        <Panel>
          <Form>
            <Flex direction="vertical" gap="l">
              <Form.Field label="renderFunc → a Button">
                <DatePicker
                  value={asButton}
                  onChange={(value) => setAsButton(value)}
                  renderFunc={({ displayValue, expanded }) => (
                    <Button
                      label={displayValue || 'Choose a date'}
                      icon={<CalendarDays />}
                      additionalIcon={
                        expanded ? <ChevronUp /> : <ChevronDown />
                      }
                      selected={expanded}
                    />
                  )}
                />
              </Form.Field>

              <Form.Field label="renderFunc → an inline text trigger">
                <DatePicker
                  value={asChip}
                  onChange={(value) => setAsChip(value)}
                  renderFunc={({ displayValue }) => (
                    <Button
                      variant="text"
                      label={displayValue || 'Add a date'}
                      additionalIcon={<ChevronDown />}
                    />
                  )}
                />
              </Form.Field>

              <Form.Field label="asChild → your own element becomes the trigger">
                <DatePicker
                  value={asChildDate}
                  onChange={(value) => setAsChildDate(value)}
                  asChild
                >
                  <Button
                    variant="submit"
                    icon={<CalendarDays />}
                    label={
                      asChildDate
                        ? asChildDate.format('ddd, D MMM')
                        : 'Pick a day'
                    }
                  />
                </DatePicker>
              </Form.Field>

              <Form.Field label="renderFunc → a component using useDatePickerTrigger()">
                <DatePicker
                  value={asButton}
                  onChange={(value) => setAsButton(value)}
                  renderFunc={({ className, style }) => (
                    <FancyTrigger className={className} style={style} />
                  )}
                />
              </Form.Field>
            </Flex>
          </Form>
        </Panel>
      </Flex>
    );
  },
};
