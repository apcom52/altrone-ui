import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Application, DataTable } from '../src/components';
import type { DataTableProps } from '../src/components/dataTable/DataTable.types';
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

type Person = (typeof PEOPLE)[number];

const renderTable = (props: Partial<DataTableProps<Person>> = {}) =>
  render(
    <Application language="en">
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
    </Application>,
  );

/** All rendered body rows (the grid uses divs, not a <table>). */
const bodyRows = () =>
  Array.from(
    screen.getByTestId('table').querySelectorAll('[data-selected]'),
  ) as HTMLElement[];

describe('DataTable row selection', () => {
  const selectionTable = (props: Partial<DataTableProps<Person>> = {}) => (
    <Application language="en">
      <DataTable
        data={PEOPLE}
        getRowId={(person) => String(person.id)}
        columns={[{ accessor: 'name', label: 'Name' }]}
        data-testid="table"
        rowsPerPage={3}
        selectionMode="multiple"
        selectionToggle={false}
        {...props}
      />
    </Application>
  );

  const checkbox = (name: string) =>
    screen.getByRole('checkbox', { name: `Select row ${name}` });
  const pageCheckbox = () =>
    screen.getByRole('checkbox', { name: 'Select all rows on this page' });

  test('keeps uncontrolled ids when data is replaced and returns the current row objects', () => {
    const onSelectionChange = vi.fn();
    const actions = vi.fn(() => null);
    const props = { actions, onSelectionChange, defaultSelectedRowIds: ['1'] };
    const { rerender } = render(selectionTable(props));

    expect(checkbox('Ada')).toBeChecked();
    expect(screen.queryByRole('button', { name: 'Select rows' })).toBeNull();
    expect(onSelectionChange).not.toHaveBeenCalled();

    rerender(selectionTable({ ...props, data: PEOPLE.slice(3) }));
    fireEvent.click(checkbox('Katherine'));
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      ['1', '4'],
      { rows: [PEOPLE[3]], event: expect.any(MouseEvent) },
    );
    expect(actions).toHaveBeenLastCalledWith({
      selectableMode: true,
      selectedItems: [PEOPLE[3]],
    });

    const updatedAda = { ...PEOPLE[0], name: 'Ada Lovelace' };
    rerender(selectionTable({ ...props, data: [PEOPLE[1], updatedAda] }));
    expect(checkbox('Ada Lovelace')).toBeChecked();
    expect(checkbox('Alan')).not.toBeChecked();
    expect(actions).toHaveBeenLastCalledWith({
      selectableMode: true,
      selectedItems: [updatedAda],
    });
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
  });

  test('a controlled selection and its mixed page checkbox wait for the next prop', () => {
    const onSelectionChange = vi.fn();
    const props = { onSelectionChange, selectedRowIds: ['1', 'outside'] };
    const { rerender } = render(selectionTable(props));

    fireEvent.click(checkbox('Alan'));
    expect(checkbox('Alan')).not.toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      ['1', 'outside', '2'],
      { rows: PEOPLE.slice(0, 2), event: expect.any(MouseEvent) },
    );

    expect(pageCheckbox()).toBePartiallyChecked();
    fireEvent.click(pageCheckbox());
    expect(pageCheckbox()).toBePartiallyChecked();
    expect(checkbox('Alan')).not.toBeChecked();

    rerender(selectionTable({ ...props, selectedRowIds: ['1', '2', '3', 'outside'] }));
    expect(checkbox('Alan')).toBeChecked();
    expect(pageCheckbox()).toBeChecked();
    rerender(selectionTable({ ...props, selectedRowIds: [] }));
    expect(checkbox('Ada')).not.toBeChecked();
    expect(pageCheckbox()).not.toBeChecked();
    expect(onSelectionChange).toHaveBeenCalledTimes(2);
  });

  test('bulk selection changes only eligible rows on the current filtered page', () => {
    const onSelectionChange = vi.fn();
    const { rerender } = render(selectionTable({
      defaultSelectedRowIds: ['1', '4', 'outside'],
      isRowSelectable: (person) => person.active,
      onSelectionChange,
    }));

    expect(checkbox('Grace')).toBeDisabled();
    expect(pageCheckbox()).toBePartiallyChecked();
    fireEvent.click(pageCheckbox());
    expect(pageCheckbox()).toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      ['1', '4', 'outside', '2'],
      { rows: [PEOPLE[0], PEOPLE[1], PEOPLE[3]], event: expect.any(MouseEvent) },
    );

    const props: Partial<DataTableProps<Person>> = {
      columns: [{ accessor: 'name', label: 'Name', filterable: true }],
      isRowSelectable: (person) => person.active,
      onSelectionChange,
      filters: [{ id: 'name', value: { rule: 'contains', value: 'Ada' } }],
    };
    rerender(selectionTable(props));
    expect(screen.queryByRole('checkbox', { name: 'Select row Alan' })).toBeNull();
    fireEvent.click(pageCheckbox());
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      ['4', 'outside', '2'],
      { rows: [PEOPLE[1], PEOPLE[3]], event: expect.any(MouseEvent) },
    );
  });

  test('single selection replaces the previous id and can disallow deselection', () => {
    const onSelectionChange = vi.fn();
    const props = { selectionMode: 'single' as const, onSelectionChange };
    const { rerender } = render(selectionTable({ ...props, defaultSelectedRowIds: ['1'] }));
    const ada = screen.getByRole('radio', { name: 'Select row Ada' });
    const alan = screen.getByRole('radio', { name: 'Select row Alan' });
    expect(ada).toBeChecked();
    expect(screen.queryByRole('checkbox')).toBeNull();

    fireEvent.click(alan);
    expect(ada).not.toBeChecked();
    expect(alan).toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      ['2'],
      { rows: [PEOPLE[1]], event: expect.any(MouseEvent) },
    );

    rerender(selectionTable({ ...props, allowDeselect: false }));
    fireEvent.click(alan);
    expect(alan).toBeChecked();
    expect(onSelectionChange).toHaveBeenCalledTimes(1);

    rerender(selectionTable(props));
    fireEvent.click(alan);
    expect(alan).not.toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      [],
      { rows: [], event: expect.any(MouseEvent) },
    );
  });

  test('Space on a row and optional row clicks leave embedded controls alone', () => {
    const onSelectionChange = vi.fn();
    const openDetails = vi.fn();
    render(selectionTable({
      selectOnRowClick: true,
      onSelectionChange,
      columns: [{
        accessor: 'name',
        label: 'Name',
        type: 'custom',
        options: {
          renderReadMode: ({ item }) => (
            <>
              <span>{item.name}</span>
              <button onClick={openDetails}>Details {item.name}</button>
            </>
          ),
        },
      }],
    }));

    const ada = bodyRows()[0];
    ada.focus();
    expect(ada).toHaveFocus();
    fireEvent.keyDown(ada, { key: ' ' });
    fireEvent.keyDown(ada, { key: ' ', repeat: true });
    expect(ada).toHaveAttribute('aria-selected', 'true');
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      ['1'],
      { rows: [PEOPLE[0]], event: expect.any(KeyboardEvent) },
    );

    const details = screen.getByRole('button', { name: 'Details Ada' });
    fireEvent.keyDown(details, { key: ' ' });
    fireEvent.click(details);
    expect(openDetails).toHaveBeenCalledOnce();
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText('Alan'));
    expect(checkbox('Alan')).toBeChecked();
    fireEvent.click(checkbox('Ada'));
    expect(checkbox('Ada')).not.toBeChecked();
    expect(onSelectionChange).toHaveBeenCalledTimes(3);
  });

  test('the toggle and cell menu preserve the modern selection', async () => {
    const onSelectionChange = vi.fn();
    render(selectionTable({
      selectionToggle: true,
      defaultSelectedRowIds: ['2', 'outside'],
      onSelectionChange,
    }));
    const toggle = screen.getByRole('button', { name: 'Select rows' });
    expect(screen.queryByRole('checkbox')).toBeNull();
    fireEvent.contextMenu(screen.getByText('Ada').closest('[role="cell"]')!);
    fireEvent.click(await screen.findByRole('button', { name: 'Select this row' }));
    await waitFor(() => {
      expect(checkbox('Ada')).toBeChecked();
      expect(checkbox('Alan')).toBeChecked();
    });
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      ['2', 'outside', '1'],
      { rows: PEOPLE.slice(0, 2), event: expect.any(MouseEvent) },
    );
    fireEvent.click(toggle);
    expect(screen.queryByRole('checkbox')).toBeNull();
    fireEvent.click(toggle);
    expect(checkbox('Ada')).toBeChecked();
    expect(onSelectionChange).toHaveBeenCalledOnce();
  });

  test('loading keeps an always-visible selection column disabled', () => {
    const onSelectionChange = vi.fn();
    render(selectionTable({ mode: 'loading', onSelectionChange }));
    expect(checkbox('Ada')).toBeDisabled();
    expect(pageCheckbox()).toBeDisabled();
    fireEvent.click(checkbox('Ada'));
    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  test('row selection labels fall back to the id when the first column masks passwords', () => {
    render(selectionTable({
      columns: [{ accessor: 'name', label: 'Password', type: 'password' }],
    }));
    expect(checkbox('1')).toBeEnabled();
    expect(
      screen.queryByRole('checkbox', { name: 'Select row Ada' }),
    ).toBeNull();
  });

  test('an explicit selection mode requires getRowId in development', () => {
    expect(() => render(selectionTable({ getRowId: undefined }))).toThrow(
      /getRowId is required/,
    );
  });
});

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

  test('sorts from the header context menu and marks the current radio option', async () => {
    const onSortChange = vi.fn();
    renderTable({ onSortChange });
    const header = screen.getByTitle('age');
    fireEvent.contextMenu(header, { button: 2, clientX: 100, clientY: 80 });
    let group = await screen.findByRole('radiogroup', { name: 'Sort column' });
    expect(within(group).getByRole('radio', { name: 'No sorting' })).toBeChecked();
    expect(screen.queryByRole('button', { name: 'Hide' })).toBeNull();

    fireEvent.click(within(group).getByRole('radio', { name: 'Sort ascending' }));
    expect(header).toHaveAttribute('aria-sort', 'ascending');
    await waitFor(() => expect(screen.queryByRole('radiogroup')).toBeNull());

    fireEvent.contextMenu(header, { button: 2, clientX: 100, clientY: 80 });
    group = await screen.findByRole('radiogroup', { name: 'Sort column' });
    expect(within(group).getByRole('radio', { name: 'Sort ascending' })).toBeChecked();
    fireEvent.click(within(group).getByRole('radio', { name: 'Sort descending' }));
    expect(header).toHaveAttribute('aria-sort', 'descending');
    await waitFor(() => expect(screen.queryByRole('radiogroup')).toBeNull());

    fireEvent.contextMenu(header, { button: 2, clientX: 100, clientY: 80 });
    group = await screen.findByRole('radiogroup', { name: 'Sort column' });
    expect(within(group).getByRole('radio', { name: 'Sort descending' })).toBeChecked();
    fireEvent.click(within(group).getByRole('radio', { name: 'No sorting' }));
    expect(header).toHaveAttribute('aria-sort', 'none');
    expect(onSortChange).toHaveBeenLastCalledWith(
      undefined,
      expect.objectContaining({ type: 'click' }),
    );
  });

  test('opens a non-sortable header menu by keyboard and preserves the last column', async () => {
    const onHiddenColumnsChange = vi.fn();
    renderTable({
      hideableColumns: true,
      columns: [
        { accessor: 'name', label: 'Name', sortable: true },
        { accessor: 'role', label: 'Role' },
      ],
      onHiddenColumnsChange,
    });

    fireEvent.keyDown(screen.getByTitle('role'), { key: 'F10', shiftKey: true });
    expect(screen.queryByRole('radiogroup')).toBeNull();
    fireEvent.click(await screen.findByRole('button', { name: 'Hide' }));
    expect(onHiddenColumnsChange).toHaveBeenCalledWith(
      ['role'],
      expect.objectContaining({ type: 'click' }),
    );
    expect(screen.queryByTitle('role')).toBeNull();

    fireEvent.contextMenu(screen.getByTitle('name'), { button: 2 });
    expect(await screen.findByRole('button', { name: 'Hide' })).toBeDisabled();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  test('stages visibility changes, restores defaults and applies the draft', async () => {
    renderTable({
      hideableColumns: true,
      defaultHiddenColumns: ['role', 'color', 'age'],
      selectable: true,
      mode: 'select',
      rowActions: <DataTable.RowAction label="Edit" />,
      columns: [
        { accessor: 'name', label: 'Name' },
        { accessor: 'role', label: 'Role' },
        { accessor: 'age', label: 'Age', enabled: false },
      ],
    });

    expect(within(screen.getByTestId('table')).queryByText('Role')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Column visibility' }));
    const panel = await screen.findByRole('dialog', { name: 'Columns' });
    const name = within(panel).getByRole('checkbox', { name: 'Name' });
    const role = within(panel).getByRole('checkbox', { name: 'Role' });

    expect(within(panel).getAllByRole('checkbox')).toHaveLength(2);
    expect(name).toBeDisabled();
    expect(role).not.toBeChecked();

    fireEvent.click(role);
    expect(within(screen.getByTestId('table')).queryByText('Role')).toBeNull();
    fireEvent.click(name);
    expect(within(screen.getByTestId('table')).getByText('Name')).toBeInTheDocument();
    expect(role).toBeDisabled();

    fireEvent.click(within(panel).getByRole('button', { name: 'Reset' }));
    expect(name).toBeChecked();
    expect(role).not.toBeChecked();

    fireEvent.click(role);
    fireEvent.click(name);
    fireEvent.click(within(panel).getByRole('button', { name: 'Apply' }));
    expect(within(screen.getByTestId('table')).getByText('Role')).toBeInTheDocument();
    expect(within(screen.getByTestId('table')).queryByText('Name')).toBeNull();
  });

  test('shows all columns immediately and closes the picker', async () => {
    const onHiddenColumnsChange = vi.fn();
    renderTable({
      hideableColumns: true,
      defaultHiddenColumns: ['role'],
      onHiddenColumnsChange,
    });
    const action = screen.getByRole('button', { name: 'Column visibility' });
    fireEvent.click(action);
    const panel = await screen.findByRole('dialog', { name: 'Columns' });
    expect(within(panel).getByRole('checkbox', { name: 'Role' })).not.toBeChecked();

    fireEvent.click(within(panel).getByRole('button', { name: 'Show all' }));
    expect(onHiddenColumnsChange).toHaveBeenCalledWith(
      [],
      expect.objectContaining({ type: 'click' }),
    );
    expect(within(screen.getByTestId('table')).getByText('Role')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Columns' })).toBeNull());

    fireEvent.click(action);
    const reopenedPanel = await screen.findByRole('dialog', { name: 'Columns' });
    for (const checkbox of within(reopenedPanel).getAllByRole('checkbox')) {
      expect(checkbox).toBeChecked();
    }
  });

  test('discards unapplied visibility changes when the picker closes', async () => {
    renderTable({ hideableColumns: true });
    const action = screen.getByRole('button', { name: 'Column visibility' });
    fireEvent.click(action);
    const panel = await screen.findByRole('dialog', { name: 'Columns' });
    fireEvent.click(within(panel).getByRole('checkbox', { name: 'Age' }));
    fireEvent.keyDown(panel, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Columns' })).toBeNull());

    fireEvent.click(action);
    const reopenedPanel = await screen.findByRole('dialog', { name: 'Columns' });
    expect(within(reopenedPanel).getByRole('checkbox', { name: 'Age' })).toBeChecked();
  });

  test('keeps controlled visibility until the caller updates it and forwards the event', async () => {
    const onHiddenColumnsChange = vi.fn();
    renderTable({
      hideableColumns: true,
      hiddenColumns: [],
      defaultHiddenColumns: ['age'],
      onHiddenColumnsChange,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Column visibility' }));
    const panel = await screen.findByRole('dialog', { name: 'Columns' });
    const age = within(panel).getByRole('checkbox', { name: 'Age' });
    expect(age).toBeChecked();
    fireEvent.click(age);
    expect(onHiddenColumnsChange).not.toHaveBeenCalled();
    fireEvent.click(within(panel).getByRole('button', { name: 'Apply' }));

    expect(onHiddenColumnsChange).toHaveBeenCalledWith(
      ['age'],
      expect.objectContaining({ type: 'click' }),
    );
    expect(within(screen.getByTestId('table')).getByText('Age')).toBeInTheDocument();
  });

  test('keeps one data column visible with controlled state and no change handler', async () => {
    renderTable({ hideableColumns: true, hiddenColumns: ['name', 'role', 'age'] });
    expect(screen.getAllByRole('columnheader')).toHaveLength(1);
    expect(within(screen.getByTestId('table')).getByText('Name')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Column visibility' }));
    const panel = await screen.findByRole('dialog', { name: 'Columns' });
    fireEvent.click(within(panel).getByRole('checkbox', { name: 'Age' }));
    fireEvent.click(within(panel).getByRole('button', { name: 'Apply' }));
    expect(within(screen.getByTestId('table')).queryByText('Age')).toBeNull();
  });

  test('applies visibility without the toolbar and preserves filtering and sorting', () => {
    renderTable({
      hiddenColumns: ['role', 'age'],
      defaultFilters: [{ id: 'role', value: { rule: 'has', value: ['Engineer'] } }],
      defaultSort: { field: 'age', direction: 'desc' },
    });
    expect(screen.queryByRole('button', { name: 'Column visibility' })).toBeNull();
    expect(within(screen.getByTestId('table')).queryByText('Role')).toBeNull();
    expect(bodyRows().map((row) => row.textContent)).toEqual(['Edsger', 'Alan', 'Ada']);
    fireEvent.click(screen.getByText('Filters'));
    expect(screen.getByDisplayValue('Role')).toBeInTheDocument();
  });

  test('disables the visibility action while loading', () => {
    renderTable({ hideableColumns: true, mode: 'loading' });
    expect(screen.getByRole('button', { name: 'Column visibility' })).toBeDisabled();
  });

  test('keeps the resized width after hiding and showing a column', async () => {
    renderTable({ hideableColumns: true, resizableColumns: true });
    const handle = document.querySelector('[data-resize-handle="name"]')!;
    fireEvent.mouseDown(handle, { clientX: 150, button: 0 });
    fireEvent.mouseMove(document, { clientX: 210 });
    fireEvent.mouseUp(document, { clientX: 210 });
    expect(bodyRows()[0].style.gridTemplateColumns).toBe('210px 150px 150px');

    fireEvent.click(screen.getByRole('button', { name: 'Column visibility' }));
    const panel = await screen.findByRole('dialog', { name: 'Columns' });
    const name = within(panel).getByRole('checkbox', { name: 'Name' });
    fireEvent.click(name);
    fireEvent.click(within(panel).getByRole('button', { name: 'Apply' }));
    expect(bodyRows()[0].style.gridTemplateColumns).toBe('150px 150px');

    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Columns' })).toBeNull());
    fireEvent.click(screen.getByRole('button', { name: 'Column visibility' }));
    const reopenedPanel = await screen.findByRole('dialog', { name: 'Columns' });
    fireEvent.click(within(reopenedPanel).getByRole('checkbox', { name: 'Name' }));
    fireEvent.click(within(reopenedPanel).getByRole('button', { name: 'Apply' }));
    expect(bodyRows()[0].style.gridTemplateColumns).toBe('210px 150px 150px');
  });

  test('enabled: false removes the column from the table, sorting and filters', () => {
    renderTable({
      columns: [
        { accessor: 'name', label: 'Name', sortable: true, filterable: true },
        { accessor: 'age', label: 'Age', type: 'number', sortable: true, filterable: true, enabled: false },
      ],
    });

    expect(screen.queryByTitle('age')).not.toBeInTheDocument();
    expect(bodyRows()[0].textContent).not.toContain('36');

    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Add filter'));
    expect(screen.getByRole('button', { name: 'Name' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Age' })).not.toBeInTheDocument();
  });

  test('the filter panel adds a row for the chosen column', () => {
    renderTable();

    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Add filter'));
    fireEvent.click(screen.getByRole('button', { name: 'Role' }));

    // The read-only field of the new filter row shows the column label.
    expect(screen.getByDisplayValue('Role')).toBeInTheDocument();
  });

  test('the filter menu lists only columns whose type has filter rules', () => {
    renderTable({
      columns: [
        { accessor: 'name', label: 'Name', type: 'link', filterable: true },
        { accessor: 'role', label: 'Role', type: 'custom', filterable: true },
        { accessor: 'color', label: 'Color', type: 'custom', filterable: 'string' },
      ],
    });

    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Add filter'));

    expect(screen.queryByRole('button', { name: 'Role' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Name' }));
    expect(screen.getByDisplayValue('Name')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add filter'));
    fireEvent.click(screen.getByRole('button', { name: 'Color' }));
    expect(screen.getByDisplayValue('Color')).toBeInTheDocument();
  });

  test('an explicit `filterable` type drives both the filter control and the filter function', () => {
    renderTable({
      columns: [
        { accessor: 'name', label: 'Name' },
        { accessor: 'age', label: 'Age', type: 'number', filterable: 'text' },
      ],
    });

    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Add filter'));
    fireEvent.click(screen.getByRole('button', { name: 'Age' }));

    const control = document.querySelector('[data-filter-control="true"]') as HTMLInputElement;
    expect(control).not.toHaveAttribute('inputmode', 'numeric');
    fireEvent.change(control, { target: { value: '4' } });
    fireEvent.click(screen.getByText('Apply'));

    expect(bodyRows().map((r) => r.textContent)).toEqual([
      expect.stringContaining('Alan'),
      expect.stringContaining('Katherine'),
    ]);
  });

  test('the filter panel reflects a controlled `filters` prop set before it was ever opened', () => {
    renderTable({
      filters: [{ id: 'role', value: { rule: 'has', value: ['Engineer'] } }],
    });

    fireEvent.click(screen.getByText('Filters'));

    expect(screen.getByDisplayValue('Role')).toBeInTheDocument();
  });

  test('copies rendered cell text without exposing masked values', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const clipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    try {
      renderTable({
        columns: [
          {
            accessor: 'name',
            type: 'link',
            options: { textTransformer: (value) => `Profile: ${value}` },
          },
          { accessor: 'role', type: 'password' },
        ],
      });
      const [linkCell, passwordCell] = within(bodyRows()[0]).getAllByRole('cell');

      fireEvent.contextMenu(linkCell, { button: 2 });
      expect(await screen.findByRole('button', { name: 'Copy' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Select this row' })).toBeNull();
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(writeText).toHaveBeenLastCalledWith('Profile: Ada');
      await waitFor(() => expect(screen.queryByRole('button', { name: 'Copy' })).toBeNull());

      fireEvent.contextMenu(passwordCell, { button: 2 });
      fireEvent.click(await screen.findByRole('button', { name: 'Copy' }));
      expect(writeText).toHaveBeenLastCalledWith('********');
    } finally {
      if (clipboard) {
        Object.defineProperty(navigator, 'clipboard', clipboard);
      } else {
        Reflect.deleteProperty(navigator, 'clipboard');
      }
    }
  });

  test('cell menu enters selection mode and toggles rows without exiting it', async () => {
    const onModeChange = vi.fn();
    renderTable({ selectable: true, onModeChange });

    fireEvent.keyDown(screen.getByText('Ada').closest('[role="cell"]')!, {
      key: 'F10',
      shiftKey: true,
    });
    fireEvent.click(await screen.findByRole('button', { name: 'Select this row' }));

    expect(bodyRows()[0]).toHaveAttribute('aria-selected', 'true');
    expect(bodyRows()[1]).toHaveAttribute('aria-selected', 'false');
    expect(onModeChange).toHaveBeenCalledWith(
      'select',
      expect.objectContaining({ type: 'click' }),
    );
    await waitFor(() => expect(screen.queryByRole('button', { name: 'Copy' })).toBeNull());

    fireEvent.contextMenu(screen.getByText('Alan').closest('[role="cell"]')!, { button: 2 });
    fireEvent.click(await screen.findByRole('button', { name: 'Select this row' }));

    expect(bodyRows()[0]).toHaveAttribute('aria-selected', 'true');
    expect(bodyRows()[1]).toHaveAttribute('aria-selected', 'true');
    for (const name of ['Ada', 'Alan']) {
      await waitFor(() =>
        expect(screen.queryByRole('button', { name: 'Copy' })).toBeNull(),
      );
      fireEvent.keyDown(screen.getByText(name).closest('[role="cell"]')!, {
        key: 'F10',
        shiftKey: true,
      });
      fireEvent.click(await screen.findByRole('button', { name: 'Deselect this row' }));
      expect(screen.getByText(name).closest('[role="row"]')).toHaveAttribute(
        'aria-selected',
        'false',
      );
    }
    expect(onModeChange).toHaveBeenCalledTimes(1);
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
      <Application>
        <DataTable
          data={[]}
          data-testid="table"
          columns={[{ accessor: 'name', label: 'Name' }]}
        />
      </Application>,
    );

    expect(screen.getByTestId('table')).toHaveTextContent('No data');
  });

  test('mode="loading" swaps cells for skeletons', () => {
    renderTable({ mode: 'loading' });

    expect(
      screen.getByTestId('table').querySelectorAll('[class*="Skeleton"]').length,
    ).toBeGreaterThan(0);
  });

  test('rowActions accepts a plain element, rendered identically for every row', () => {
    renderTable({
      rowActions: <DataTable.RowAction label="Edit" onClick={() => undefined} />,
    });

    expect(
      screen.getAllByRole('button', { name: 'Edit' }).length,
    ).toBeGreaterThan(0);
  });

  test('rowActions accepts a function receiving row context', () => {
    renderTable({
      rowActions: ({ row }) => (
        <DataTable.RowAction
          label={`Edit ${row.name}`}
          onClick={() => undefined}
        />
      ),
    });

    expect(screen.getByRole('button', { name: 'Edit Ada' })).toBeInTheDocument();
  });

  test('cell context menu puts the current row actions before built-in actions', async () => {
    const onEdit = vi.fn();
    renderTable({
      selectable: true,
      rowActions: ({ row }) =>
        row.name === 'Ada'
          ? [
              <DataTable.RowAction key="edit" label={`Edit ${row.name}`} onClick={onEdit} />,
              null,
              <DataTable.RowAction key="delete" label="Delete" collapsed disabled />,
            ]
          : null,
    });

    fireEvent.contextMenu(screen.getByText('Ada').closest('[role="cell"]')!, {
      button: 2,
    });
    await screen.findByRole('button', { name: 'Copy' });
    expect(screen.getAllByRole('button', { name: /^(Edit Ada|Delete|Copy|Select this row)$/ }).map((item) => item.textContent)).toEqual([
      'Edit Ada',
      'Delete',
      'Copy',
      'Select this row',
    ]);
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Edit Ada' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('button', { name: 'Copy' })).toBeNull());

    fireEvent.contextMenu(screen.getByText('Alan').closest('[role="cell"]')!, {
      button: 2,
    });
    await screen.findByRole('button', { name: 'Copy' });
    expect(screen.getAllByRole('button', { name: /^(Edit Ada|Delete|Copy|Select this row)$/ }).map((item) => item.textContent)).toEqual([
      'Copy',
      'Select this row',
    ]);
    expect(screen.queryByRole('separator')).toBeNull();
  });

  test('controlled `page` ignores its own pagination until the consumer updates the prop', () => {
    const onPageChange = vi.fn();
    const { rerender } = renderTable({ page: 1, onPageChange });

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    expect(onPageChange).toHaveBeenCalledWith(2, expect.anything());
    // still page 1 — the consumer hasn't fed the new page back in yet
    expect(bodyRows().map((r) => r.textContent)?.[0]).toContain('Ada');

    rerender(
      <Application language="en">
        <DataTable
          data={PEOPLE}
          rowsPerPage={3}
          page={2}
          onPageChange={onPageChange}
          data-testid="table"
          columns={[
            { accessor: 'name', label: 'Name', sortable: true, filterable: true },
            { accessor: 'role', label: 'Role', type: 'select', filterable: true },
            { accessor: 'age', label: 'Age', type: 'number', sortable: true },
          ]}
        />
      </Application>,
    );

    expect(bodyRows().map((r) => r.textContent)?.[0]).toContain('Katherine');
  });

  test('collapsed RowActions fold into an overflow menu', () => {
    renderTable({
      rowsPerPage: 1,
      rowActions: () => [
        <DataTable.RowAction key="edit" label="Edit" onClick={() => undefined} />,
        <DataTable.RowAction
          key="delete"
          label="Delete"
          collapsed
          onClick={() => undefined}
        />,
      ],
    });

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More actions' })).toBeInTheDocument();
  });

  test('getRowId keeps an open row menu tied to its row when `data` is reordered externally', () => {
    const onDelete = vi.fn();
    const table = (data: typeof PEOPLE) => (
      <Application language="en">
        <DataTable
          data={data}
          getRowId={(person) => String(person.id)}
          data-testid="table"
          columns={[{ accessor: 'name', label: 'Name' }]}
          rowActions={({ row }) => [
            <DataTable.RowAction key="edit" label="Edit" onClick={() => undefined} />,
            <DataTable.RowAction
              key="delete"
              label="Delete"
              collapsed
              onClick={() => onDelete(row.name)}
            />,
          ]}
        />
      </Application>
    );

    const { rerender } = render(table(PEOPLE));

    // Open the 3rd row's ("Grace") overflow menu.
    fireEvent.click(screen.getAllByRole('button', { name: 'More actions' })[2]);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();

    // A refetch reorders `data` — Grace moves from index 2 to index 0 —
    // without `getRowId` this would leave the still-open menu attached to
    // whichever row now occupies index 2 instead of following Grace.
    rerender(table([PEOPLE[2], PEOPLE[0], PEOPLE[1]]));

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onDelete).toHaveBeenCalledWith('Grace');
  });
});
