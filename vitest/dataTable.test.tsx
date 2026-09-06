import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AltroneApplication, DataTable } from '../src/components';
import {
  textFilterFn,
  numberFilterFn,
  booleanFilterFn,
  selectFilterFn,
  colorFilterFn,
  passwordFilterFn,
  dateFilterFn,
} from '../src/components/dataTable/filters';

/**
 * Minimal stand-in for a TanStack row — the filter functions only ever call
 * `row.getValue(columnId)`.
 */
const row = (value: unknown) =>
  ({ getValue: () => value }) as unknown as Parameters<typeof textFilterFn>[0];

const PEOPLE = [
  { id: 1, name: 'Ada', role: 'Engineer', age: 36, active: true, color: '#f00', joined: '2019-06-10', skills: ['ts', 'go'] },
  { id: 2, name: 'Alan', role: 'Engineer', age: 41, active: true, color: '#0f0', joined: '2020-02-01', skills: ['ts'] },
  { id: 3, name: 'Grace', role: 'Manager', age: 52, active: false, color: '#00f', joined: '2021-11-20', skills: ['cobol'] },
  { id: 4, name: 'Katherine', role: 'Analyst', age: 47, active: true, color: '#f00', joined: '2022-05-15', skills: ['py'] },
  { id: 5, name: 'Edsger', role: 'Engineer', age: 58, active: true, color: '#0f0', joined: '2018-01-30', skills: ['algo'] },
];

const renderTable = (props: Partial<Parameters<typeof DataTable>[0]> = {}) =>
  render(
    <AltroneApplication config={{ locale: { locale: 'en-US' } }}>
      <DataTable
        data={PEOPLE}
        rowsPerPage={3}
        data-testid="table"
        columns={[
          { accessor: 'name', label: 'Name', sortable: true, filterable: true },
          { accessor: 'role', label: 'Role', type: 'select', filterable: true },
          { accessor: 'age', label: 'Age', type: 'number', sortable: true },
        ]}
        {...props}
      />
    </AltroneApplication>,
  );

/** All rendered body rows (the grid uses divs, not a <table>). */
const bodyRows = () =>
  Array.from(
    screen.getByTestId('table').querySelectorAll('[data-selected]'),
  ) as HTMLElement[];

describe('filter functions', () => {
  test('textFilterFn: contains is case-insensitive, empty/equal are exact', () => {
    expect(textFilterFn(row('Hello World'), 'c', { rule: 'contains', value: 'hello' })).toBe(true);
    expect(textFilterFn(row('Hello World'), 'c', { rule: 'contains', value: 'xyz' })).toBe(false);
    expect(textFilterFn(row('  '), 'c', { rule: 'empty' })).toBe(true);
    expect(textFilterFn(row('a'), 'c', { rule: 'empty' })).toBe(false);
    expect(textFilterFn(row('abc'), 'c', { rule: 'equal', value: 'ABC' })).toBe(true);
    // no rule → row passes through
    expect(textFilterFn(row('abc'), 'c', undefined)).toBe(true);
  });

  test('numberFilterFn: between is inclusive, missing bound is a no-op, null row fails comparisons', () => {
    expect(numberFilterFn(row(5), 'c', { rule: 'between', value: [5, 10] })).toBe(true);
    expect(numberFilterFn(row(10), 'c', { rule: 'between', value: [5, 10] })).toBe(true);
    expect(numberFilterFn(row(11), 'c', { rule: 'between', value: [5, 10] })).toBe(false);
    // right side blank → condition not applied
    expect(numberFilterFn(row(3), 'c', { rule: 'gt', value: '' })).toBe(true);
    // non-numeric row value never satisfies a numeric comparison
    expect(numberFilterFn(row(null), 'c', { rule: 'gte', value: 0 })).toBe(false);
    expect(numberFilterFn(row(null), 'c', { rule: 'empty' })).toBe(true);
  });

  test('booleanFilterFn: positive / negative coerce the row value', () => {
    expect(booleanFilterFn(row(1), 'c', { rule: 'positive' })).toBe(true);
    expect(booleanFilterFn(row(0), 'c', { rule: 'negative' })).toBe(true);
    expect(booleanFilterFn(row(true), 'c', { rule: 'negative' })).toBe(false);
  });

  test('selectFilterFn: has / notHas against scalar and array row values', () => {
    expect(selectFilterFn(row('ts'), 'c', { rule: 'has', value: ['ts', 'go'] })).toBe(true);
    expect(selectFilterFn(row(['py']), 'c', { rule: 'has', value: ['ts'] })).toBe(false);
    expect(selectFilterFn(row(['py']), 'c', { rule: 'notHas', value: ['ts'] })).toBe(true);
    // nothing selected → no filtering
    expect(selectFilterFn(row('ts'), 'c', { rule: 'has', value: [] })).toBe(true);
  });

  test('colorFilterFn: normalizes case and trims', () => {
    expect(colorFilterFn(row('#FFF'), 'c', { rule: 'has', value: [' #fff '] })).toBe(true);
    expect(colorFilterFn(row('#000'), 'c', { rule: 'notHas', value: ['#fff'] })).toBe(true);
  });

  test('passwordFilterFn: only reports empty / not-empty', () => {
    expect(passwordFilterFn(row(''), 'c', { rule: 'empty' })).toBe(true);
    expect(passwordFilterFn(row('secret'), 'c', { rule: 'notEmpty' })).toBe(true);
  });

  test('dateFilterFn: between honours the month level and rejects invalid dates', () => {
    const filter = {
      rule: 'between',
      level: 'month' as const,
      value: ['2020-01-05', '2020-03-20'],
    };
    // 2020-03-31 is still "March 2020" at month granularity
    expect(dateFilterFn(row('2020-03-31'), 'c', filter)).toBe(true);
    expect(dateFilterFn(row('2020-04-01'), 'c', filter)).toBe(false);
    expect(dateFilterFn(row('not-a-date'), 'c', { rule: 'notEmpty' })).toBe(false);
  });
});

describe('DataTable component', () => {
  test('paginates to rowsPerPage and passes className/style through', () => {
    renderTable({ className: 'custom', style: { fontSize: '18px' } });

    expect(bodyRows()).toHaveLength(3);
    expect(screen.getByTestId('table')).toHaveClass('custom');
    expect(screen.getByTestId('table')).toHaveStyle('font-size: 18px');
  });

  test('clicking a sortable header cycles none → desc → asc', () => {
    renderTable();
    const ageHeader = screen.getByTitle('age');

    const ages = () => bodyRows().map((r) => r.textContent);

    fireEvent.click(ageHeader); // desc
    expect(ages()[0]).toContain('Edsger');

    fireEvent.click(ageHeader); // asc
    expect(ages()[0]).toContain('Ada');
  });

  test('the filter panel adds a row for the chosen column', () => {
    renderTable();

    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Add filter'));
    fireEvent.click(screen.getByRole('button', { name: 'Role' }));

    // The read-only field of the new filter row echoes the column id.
    expect(screen.getByDisplayValue('role')).toBeInTheDocument();
  });

  test('selectable reveals a checkbox column only after toggling select mode', () => {
    renderTable({ selectable: true });

    expect(screen.getByTestId('table').querySelectorAll('input[type="checkbox"]')).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', { name: 'Select rows' }));

    expect(
      screen.getByTestId('table').querySelectorAll('input[type="checkbox"]').length,
    ).toBeGreaterThan(0);
  });

  test('showEmptyBanner renders an empty state for no data', () => {
    render(
      <AltroneApplication>
        <DataTable
          data={[]}
          data-testid="table"
          columns={[{ accessor: 'name', label: 'Name' }]}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('table')).toHaveTextContent('No data');
  });

  test('mode="loading" swaps cells for skeletons', () => {
    renderTable({ mode: 'loading' });

    expect(
      screen.getByTestId('table').querySelectorAll('[class*="Skeleton"]').length,
    ).toBeGreaterThan(0);
  });
});
