import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex, Form, Grid, Text } from 'components';
import { useState } from 'react';
import { dayjsInstance as dayjs } from 'utils';
import { Dayjs } from 'dayjs';
import { RangePickerValue } from './DatePicker.types.ts';
import { DatePicker } from './DatePicker.tsx';

// Earliest date the user can book — today
const TODAY = dayjs();
// Latest date available for booking — 2 years ahead
const MAX_BOOKING_DATE = TODAY.add(2, 'year');

const story: Meta<typeof DatePicker> = {
  title: 'Components/Controls/DatePicker',
  component: DatePicker,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

// ─── Main story: Travel booking form ─────────────────────────────────────────

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using DatePicker',
  render: () => {
    // Day picker state
    const [departureDate, setDepartureDate] = useState<Dayjs | undefined>(
      undefined,
    );
    const [returnDate, setReturnDate] = useState<Dayjs | undefined>(
      TODAY.add(14, 'day'),
    );

    // Month picker state
    const [reportMonth, setReportMonth] = useState<Dayjs | undefined>(
      TODAY.startOf('month'),
    );
    const [budgetMonth, setBudgetMonth] = useState<Dayjs | undefined>(
      undefined,
    );

    // Year picker state
    const [fiscalYear, setFiscalYear] = useState<Dayjs | undefined>(
      TODAY.startOf('year'),
    );
    const [birthYear, setBirthYear] = useState<Dayjs | undefined>(undefined);

    return (
      <Flex direction="vertical" gap="xl">
        {/* ── Section 1: Day picker ────────────────────────────── */}
        <Text size={5} weight="bold" block>
          DatePicker — day
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Departure date (min = today, max = +2 years)">
                <DatePicker
                  value={departureDate}
                  onChange={(v) => setDepartureDate(v)}
                  minDate={TODAY}
                  maxDate={MAX_BOOKING_DATE}
                  clearable
                  placeholder="Pick departure date"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Return date (custom format DD/MM/YYYY)">
                <DatePicker
                  value={returnDate}
                  onChange={(v) => setReturnDate(v)}
                  format="DD/MM/YYYY"
                  clearable
                  placeholder="Pick return date"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Selected values">
                <Text block style={{ opacity: departureDate ? 1 : 0.45 }}>
                  Departure:{' '}
                  {departureDate ? departureDate.format('LL') : 'not selected'}
                </Text>
                <Text block style={{ opacity: returnDate ? 1 : 0.45 }}>
                  Return:{' '}
                  {returnDate
                    ? returnDate.format('DD/MM/YYYY')
                    : 'not selected'}
                </Text>
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Russian locale">
                <DatePicker
                  value={returnDate}
                  onChange={(v) => setReturnDate(v)}
                  clearable
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Transparent">
                <DatePicker
                  value={returnDate}
                  onChange={(v) => setReturnDate(v)}
                  transparent
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Read-only (confirmed booking)">
                <DatePicker value={TODAY.add(7, 'day')} readOnly />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Disabled">
                <DatePicker value={returnDate} disabled />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>

        {/* ── Section 2: MonthPicker ───────────────────────────── */}
        <Text size={5} weight="bold" block>
          MonthPicker
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Report period (min Jan 2023 – max Dec 2025)">
                <DatePicker.MonthPicker
                  value={reportMonth}
                  onChange={(v) => setReportMonth(v)}
                  minDate={dayjs('2023-01')}
                  maxDate={dayjs('2025-12')}
                  clearable
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Budget month (custom format MMM YY)">
                <DatePicker.MonthPicker
                  value={budgetMonth}
                  onChange={(v) => setBudgetMonth(v)}
                  format="MMM YY"
                  clearable
                  placeholder="Pick month"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Selected values">
                <Text block style={{ opacity: reportMonth ? 1 : 0.45 }}>
                  Report:{' '}
                  {reportMonth
                    ? reportMonth.format('MMMM YYYY')
                    : 'not selected'}
                </Text>
                <Text block style={{ opacity: budgetMonth ? 1 : 0.45 }}>
                  Budget:{' '}
                  {budgetMonth ? budgetMonth.format('MMM YY') : 'not selected'}
                </Text>
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Russian locale">
                <DatePicker.MonthPicker
                  value={reportMonth}
                  onChange={(v) => setReportMonth(v)}
                  clearable
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Transparent">
                <DatePicker.MonthPicker
                  value={reportMonth}
                  onChange={(v) => setReportMonth(v)}
                  transparent
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Read-only">
                <DatePicker.MonthPicker
                  value={TODAY.startOf('month')}
                  readOnly
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Disabled">
                <DatePicker.MonthPicker value={reportMonth} disabled />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>

        {/* ── Section 3: YearPicker ────────────────────────────── */}
        <Text size={5} weight="bold" block>
          YearPicker
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Fiscal year (2020–2030)">
                <DatePicker.YearPicker
                  value={fiscalYear}
                  onChange={(v) => setFiscalYear(v)}
                  minDate={dayjs('2020')}
                  maxDate={dayjs('2030')}
                  clearable
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Year of birth (custom format YYYY г.)">
                <DatePicker.YearPicker
                  value={birthYear}
                  onChange={(v) => setBirthYear(v)}
                  format="YYYY [г.]"
                  clearable
                  placeholder="Birth year"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Selected values">
                <Text block style={{ opacity: fiscalYear ? 1 : 0.45 }}>
                  Fiscal:{' '}
                  {fiscalYear ? fiscalYear.format('YYYY') : 'not selected'}
                </Text>
                <Text block style={{ opacity: birthYear ? 1 : 0.45 }}>
                  Birth year:{' '}
                  {birthYear ? birthYear.format('YYYY [г.]') : 'not selected'}
                </Text>
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Russian locale">
                <DatePicker.YearPicker
                  value={fiscalYear}
                  onChange={(v) => setFiscalYear(v)}
                  clearable
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Transparent">
                <DatePicker.YearPicker
                  value={fiscalYear}
                  onChange={(v) => setFiscalYear(v)}
                  transparent
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Read-only">
                <DatePicker.YearPicker value={TODAY.startOf('year')} readOnly />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Disabled">
                <DatePicker.YearPicker value={fiscalYear} disabled />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>
      </Flex>
    );
  },
};

// ─── Range story ─────────────────────────────────────────────────────────────

export const RangeStory: StoryObj<typeof Flex> = {
  name: 'Using DatePicker ranges',
  render: () => {
    const [hotelStay, setHotelStay] = useState<RangePickerValue>([
      TODAY.add(3, 'day'),
      TODAY.add(10, 'day'),
    ]);
    const [vacationRange, setVacationRange] = useState<RangePickerValue>([]);
    const [contractRange, setContractRange] = useState<RangePickerValue>([
      dayjs('2025-01-01'),
      dayjs('2025-12-31'),
    ]);

    const formatRange = (range: RangePickerValue) => {
      const [start, end] = range;
      if (!start && !end) return 'not selected';
      const s = start ? start.format('D MMM YYYY') : '…';
      const e = end ? end.format('D MMM YYYY') : '…';
      if (start && end) {
        return `${s} – ${e} (${end.diff(start, 'day')} days)`;
      }
      return `${s} – ${e}`;
    };

    return (
      <Flex direction="vertical" gap="xl">
        {/* ── Section 1: Basic range ───────────────────────────── */}
        <Text size={5} weight="bold" block>
          RangePicker — basic
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={5} style={{ padding: '8px' }}>
              <Form.Field label="Hotel stay (min = today, max = +2 years, clearable)">
                <DatePicker.RangePicker
                  value={hotelStay}
                  onChange={(v) => setHotelStay(v ?? [])}
                  minDate={TODAY}
                  maxDate={MAX_BOOKING_DATE}
                  clearable
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Vacation (empty start)">
                <DatePicker.RangePicker
                  value={vacationRange}
                  onChange={(v) => setVacationRange(v ?? [])}
                  placeholder="Select vacation period"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={3} style={{ padding: '8px' }}>
              <Form.Field label="Selected ranges">
                <Text block style={{ opacity: hotelStay[0] ? 1 : 0.45 }}>
                  Hotel: {formatRange(hotelStay)}
                </Text>
                <Text block style={{ opacity: vacationRange[0] ? 1 : 0.45 }}>
                  Vacation: {formatRange(vacationRange)}
                </Text>
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>

        {/* ── Section 2: Custom format + locale ───────────────── */}
        <Text size={5} weight="bold" block>
          RangePicker — custom format &amp; locale
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Contract period (format DD/MM/YYYY)">
                <DatePicker.RangePicker
                  value={contractRange}
                  onChange={(v) => setContractRange(v ?? [])}
                  format="DD/MM/YYYY"
                  clearable
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Russian locale">
                <DatePicker.RangePicker
                  value={contractRange}
                  onChange={(v) => setContractRange(v ?? [])}
                  clearable
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="autoClose=false (stays open after first pick)">
                <DatePicker.RangePicker
                  value={hotelStay}
                  onChange={(v) => setHotelStay(v ?? [])}
                  autoClose={false}
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>

        {/* ── Section 3: States ────────────────────────────────── */}
        <Text size={5} weight="bold" block>
          RangePicker — states
        </Text>
        <Form>
          <Grid>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Transparent">
                <DatePicker.RangePicker
                  value={contractRange}
                  onChange={(v) => setContractRange(v ?? [])}
                  transparent
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Read-only (confirmed booking)">
                <DatePicker.RangePicker
                  value={[TODAY.add(3, 'day'), TODAY.add(10, 'day')]}
                  readOnly
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column span={4} style={{ padding: '8px' }}>
              <Form.Field label="Disabled">
                <DatePicker.RangePicker value={contractRange} disabled />
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>
      </Flex>
    );
  },
};

export default story;
