import React from 'react';
import { expect, test, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  Configuration,
  AltroneApplication,
  DataTable,
  StringFilterRules,
  FilterType,
  NumberFilterRules,
  BooleanFilterRules,
  ArrayFilterRules,
} from '../src/components';
import { EMPLOYEES } from '../src/components/dataTable/stories/EMPLOYEES';
import {
  INVOICES,
  INVOICES2,
} from '../src/components/dataTable/stories/INVOICES';
import {
  arrayFilter,
  booleanFilter,
  dateFilter,
  numberFilter,
  stringFilter,
} from '../src/components/dataTable/filters';
import { DateFilterRules } from '../src/components/dataTable/DataTable.types';

describe('DataTable', () => {
  test('test DataTable cell renderers', () => {
    render(
      <AltroneApplication config={{ locale: { locale: 'en-US' } }}>
        <DataTable
          data={INVOICES}
          columns={[
            { accessor: 'description', type: 'text', label: 'Description' },
            { accessor: 'quantity', type: 'text', label: 'Quantity' },
            {
              accessor: 'price',
              type: 'currency',
              label: 'Price',
              options: {
                currencyAccessor: 'currency',
              },
            },
            {
              accessor: 'price',
              type: 'currency',
              label: 'Price',
              options: {
                currency: 'EUR',
              },
            },
            {
              accessor: 'price',
              type: 'currency',
              label: 'Price',
            },
            { accessor: 'date', type: 'date', label: 'Date' },
            { accessor: 'date', type: 'month', label: 'Month' },
            { accessor: 'date', type: 'year', label: 'Year' },
          ]}
          data-testid="data-table"
          id="table"
        />
      </AltroneApplication>,
    );

    const table = document.querySelector('#table') as HTMLTableElement;

    expect(table.rows[1].cells[0].textContent).toBe('Web Development');
    expect(table.rows[1].cells[1].textContent).toBe('1');
    expect(table.rows[3].cells[2].textContent).toBe('£1,200.00');
    expect(table.rows[3].cells[3].textContent).toBe('€1,200.00');
    expect(table.rows[3].cells[4].textContent).toBe('$1,200.00');
    expect(table.rows[1].cells[5].textContent).toBe('January 15, 2023');
    expect(table.rows[1].cells[6].textContent).toBe('January 2023');
    expect(table.rows[1].cells[7].textContent).toBe('2023');
  });

  test('test DataTable cell renderers [2]', () => {
    render(
      <AltroneApplication config={{ locale: { locale: 'en-US' } }}>
        <DataTable
          data={INVOICES2}
          columns={[
            {
              accessor: 'tags',
              type: 'array',
              label: 'Users',
              options: { arrayDelimiter: '; ' },
            },
            {
              accessor: 'users',
              type: 'array',
              label: 'Users',
              options: { arrayAccessor: 'name' },
            },
            { accessor: 'isPaid', type: 'boolean', label: 'Paid' },
          ]}
          data-testid="data-table"
          id="table"
        />
      </AltroneApplication>,
    );

    const table = document.querySelector('#table') as HTMLTableElement;

    expect(table.rows[1].cells[0].textContent).toBe('finance; monthly');
    expect(table.rows[1].cells[1].textContent).toBe('John Doe, Jane Smith');
    expect(table.rows[1].cells[2].querySelector('span')).toHaveTextContent(
      'check',
    );
    expect(table.rows[2].cells[2].querySelector('span')).toHaveTextContent(
      'close',
    );
  });

  test('check that cell renderers renders emdash when the value is undefined or null', () => {
    render(
      <AltroneApplication config={{ locale: { locale: 'en-US' } }}>
        <DataTable
          data={[
            {
              name: undefined,
              birthDate: undefined,
              graduationMonth: undefined,
              yearOfEmployment: undefined,
              age: undefined,
              salary: undefined,
              skills: undefined,
              isActive: undefined,
            },
            {
              name: null,
              birthDate: null,
              graduationMonth: null,
              yearOfEmployment: null,
              age: null,
              salary: null,
              skills: null,
              isActive: null,
            },
            {
              name: 'Jack Daniels',
              birthDate: '1999-03-25',
              graduationMonth: '2015-05',
              yearOfEmployment: 2024,
              age: 26,
              salary: 150000,
              skills: ['JavaScript', 'React', 'Node.js'],
              isActive: true,
            },
          ]}
          columns={[
            { accessor: 'name', type: 'text' },
            { accessor: 'birthDate', type: 'date' },
            { accessor: 'graduationMonth', type: 'month' },
            { accessor: 'yearOfEmployment', type: 'year' },
            { accessor: 'age', type: 'number' },
            { accessor: 'salary', type: 'currency' },
            { accessor: 'skills', type: 'array' },
            { accessor: 'isActive', type: 'boolean' },
          ]}
          data-testid="data-table"
          id="table"
        />
      </AltroneApplication>,
    );

    const table = document.querySelector('#table') as HTMLTableElement;

    expect(table.rows[1].cells[0]).toHaveTextContent('—');
    expect(table.rows[2].cells[0]).toHaveTextContent('—');
    expect(table.rows[3].cells[0]).toHaveTextContent('Jack Daniels');

    expect(table.rows[1].cells[1]).toHaveTextContent('—');
    expect(table.rows[2].cells[1]).toHaveTextContent('—');
    expect(table.rows[3].cells[1]).toHaveTextContent('March 25, 1999');

    expect(table.rows[1].cells[2]).toHaveTextContent('—');
    expect(table.rows[2].cells[2]).toHaveTextContent('—');
    expect(table.rows[3].cells[2]).toHaveTextContent('May 2015');

    expect(table.rows[1].cells[3]).toHaveTextContent('—');
    expect(table.rows[2].cells[3]).toHaveTextContent('—');
    expect(table.rows[3].cells[3]).toHaveTextContent('2024');

    expect(table.rows[1].cells[4]).toHaveTextContent('—');
    expect(table.rows[2].cells[4]).toHaveTextContent('—');
    expect(table.rows[3].cells[4]).toHaveTextContent('26');

    expect(table.rows[1].cells[5]).toHaveTextContent('—');
    expect(table.rows[2].cells[5]).toHaveTextContent('—');
    expect(table.rows[3].cells[5]).toHaveTextContent('$150,000.00');

    expect(table.rows[1].cells[6]).toHaveTextContent('—');
    expect(table.rows[2].cells[6]).toHaveTextContent('—');
    expect(table.rows[3].cells[6]).toHaveTextContent(
      'JavaScript, React, Node.js',
    );

    expect(table.rows[1].cells[7]).toHaveTextContent('—');
    expect(table.rows[2].cells[7]).toHaveTextContent('—');
    expect(table.rows[3].cells[7]).toHaveTextContent('check');
  });

  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <DataTable
          data={EMPLOYEES}
          columns={[]}
          data-testid="data-table"
          className="cls"
          style={{ fontSize: '18px' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('data-table')).toHaveClass('cls');
    expect(screen.getByTestId('data-table')).toHaveStyle('fontSize: 18px');
  });

  test('check that DataTable configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          dataTable={{
            className: 'cls',
            style: { fontSize: '18px' },
            action: { className: 'action', style: { fontSize: '18px' } },
            rowActions: {
              className: 'row-actions',
              style: { fontSize: '16px' },
            },
            rowAction: { className: 'row-action', style: { fontSize: '14px' } },
          }}
        >
          <DataTable
            data={EMPLOYEES.slice(0, 1)}
            columns={[]}
            data-testid="data-table"
            renderRowActions={() => {
              return (
                <DataTable.RowActions data-testid="row-actions">
                  <DataTable.RowAction label="Edit" data-testid="row-action" />
                </DataTable.RowActions>
              );
            }}
          >
            <DataTable.Action label="Edit" data-testid="action" />
          </DataTable>
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('data-table');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('fontSize: 18px');

    const rowActions = screen.getByTestId('row-actions');
    expect(rowActions).toHaveClass('row-actions');
    expect(rowActions).toHaveStyle('fontSize: 16px');

    const rowAction = screen.getByTestId('row-action');
    expect(rowAction).toHaveClass('row-action');
    expect(rowAction).toHaveStyle('fontSize: 14px');

    const action = screen.getByTestId('action');
    expect(action).toHaveClass('action');
    expect(action).toHaveStyle('fontSize: 18px');
  });

  test('check collapsible row actions', async () => {
    const { rerender } = render(
      <AltroneApplication>
        <DataTable
          data={EMPLOYEES.slice(0, 1)}
          columns={[]}
          data-testid="data-table"
          className="cls"
          style={{ fontSize: '18px' }}
          renderRowActions={() => (
            <DataTable.RowActions>
              <DataTable.RowAction label="Edit" data-testid="action1" />
              <DataTable.RowAction label="Edit" data-testid="action2" />
              <DataTable.RowAction
                label="Edit"
                data-testid="action3"
                collapsed
              />
              <DataTable.RowAction
                label="Edit"
                data-testid="action4"
                collapsed
              />
            </DataTable.RowActions>
          )}
        />
      </AltroneApplication>,
    );

    expect(screen.queryByTestId('action1')).toBeInTheDocument();
    expect(screen.queryByTestId('action2')).toBeInTheDocument();
    expect(screen.queryByTestId('action3')).not.toBeInTheDocument();
    expect(screen.queryByTestId('action4')).not.toBeInTheDocument();

    await fireEvent.click(screen.getByText('more_horiz'));

    rerender(
      <AltroneApplication>
        <DataTable
          data={EMPLOYEES.slice(0, 1)}
          columns={[]}
          data-testid="data-table"
          className="cls"
          style={{ fontSize: '18px' }}
          renderRowActions={() => (
            <DataTable.RowActions>
              <DataTable.RowAction label="Edit" data-testid="action1" />
              <DataTable.RowAction label="Edit" data-testid="action2" />
              <DataTable.RowAction
                label="Edit"
                data-testid="action3"
                collapsed
              />
              <DataTable.RowAction
                label="Edit"
                data-testid="action4"
                collapsed
              />
            </DataTable.RowActions>
          )}
        />
      </AltroneApplication>,
    );

    expect(screen.queryByTestId('action1')).toBeInTheDocument();
    expect(screen.queryByTestId('action2')).toBeInTheDocument();
    expect(screen.queryByTestId('action3')).toBeInTheDocument();
    expect(screen.queryByTestId('action4')).toBeInTheDocument();

    rerender(
      <AltroneApplication>
        <DataTable
          data={EMPLOYEES.slice(0, 1)}
          columns={[]}
          data-testid="data-table"
          className="cls"
          style={{ fontSize: '18px' }}
          renderRowActions={() => (
            <DataTable.RowActions>
              <DataTable.RowAction
                label="Edit"
                data-testid="action1"
                collapsed
              />
            </DataTable.RowActions>
          )}
        />
      </AltroneApplication>,
    );

    expect(screen.queryByTestId('action1')).toBeInTheDocument();
  });

  test('check showEmptyBanner works correctly', () => {
    const { rerender } = render(
      <AltroneApplication>
        <DataTable
          data={[]}
          columns={[{ accessor: 'name', type: 'text' }]}
          data-testid="data-table"
        />
      </AltroneApplication>,
    );

    expect(screen.getByText('No data')).toBeInTheDocument();

    rerender(
      <AltroneApplication>
        <DataTable
          data={[]}
          columns={[{ accessor: 'name', type: 'text' }]}
          data-testid="data-table"
          showEmptyBanner={false}
        />
      </AltroneApplication>,
    );
    expect(screen.queryByText('No data')).not.toBeInTheDocument();
  });

  test('check string filters', () => {
    const checkValue = (
      value: any,
      rule: StringFilterRules,
      filterValue: any,
    ) => {
      return stringFilter({
        row: { foo: value },
        filter: {
          field: 'foo',
          type: FilterType.string,
          columnType: 'text',
          conditions: [{ rule, value: filterValue, join: 'AND' }],
        },
      });
    };

    /* checking contain rule */
    expect(checkValue('bar', StringFilterRules.contain, 'bar')).toBe(true);
    expect(checkValue('bar', StringFilterRules.contain, 'foo')).toBe(false);
    expect(checkValue('bar', StringFilterRules.contain, '')).toBe(false);
    expect(checkValue('bar', StringFilterRules.contain, undefined)).toBe(false);
    expect(checkValue('bar', StringFilterRules.contain, null)).toBe(false);
    expect(checkValue(undefined, StringFilterRules.contain, 'bar')).toBe(false);
    expect(checkValue(null, StringFilterRules.contain, 'bar')).toBe(false);

    /* checking notContain rule */
    expect(checkValue('bar', StringFilterRules.notContain, 'foo')).toBe(true);
    expect(checkValue('bar', StringFilterRules.notContain, 'bar')).toBe(false);
    expect(checkValue('bar', StringFilterRules.notContain, '')).toBe(false);
    expect(checkValue('bar', StringFilterRules.notContain, undefined)).toBe(
      false,
    );
    expect(checkValue('bar', StringFilterRules.notContain, null)).toBe(false);
    expect(checkValue(undefined, StringFilterRules.notContain, 'bar')).toBe(
      true,
    );
    expect(checkValue(undefined, StringFilterRules.notContain, undefined)).toBe(
      false,
    );
    expect(checkValue(null, StringFilterRules.notContain, null)).toBe(false);

    /* checking empty rule */
    expect(checkValue('', StringFilterRules.empty, '')).toBe(true);
    expect(checkValue('bar', StringFilterRules.empty, '')).toBe(false);
    expect(checkValue(undefined, StringFilterRules.empty, undefined)).toBe(
      true,
    );
    expect(checkValue(null, StringFilterRules.empty, null)).toBe(true);

    /* checking notEmpty rule */
    expect(checkValue('bar', StringFilterRules.notEmpty, '')).toBe(true);
    expect(checkValue('', StringFilterRules.notEmpty, 'foo')).toBe(false);
    expect(checkValue(undefined, StringFilterRules.notEmpty, undefined)).toBe(
      false,
    );
    expect(checkValue(null, StringFilterRules.notEmpty, null)).toBe(false);

    /* checking equals rule */
    expect(checkValue('bar', StringFilterRules.equal, 'bar')).toBe(true);
    expect(checkValue('bar', StringFilterRules.equal, ' bar ')).toBe(true);
    expect(checkValue('bar', StringFilterRules.equal, 'foo')).toBe(false);
    expect(checkValue('bar', StringFilterRules.equal, 'barbar')).toBe(false);
    expect(checkValue('bar', StringFilterRules.equal, '')).toBe(false);
    expect(checkValue(undefined, StringFilterRules.equal, undefined)).toBe(
      true,
    );
    expect(checkValue('', StringFilterRules.equal, undefined)).toBe(true);
    expect(checkValue('', StringFilterRules.equal, null)).toBe(true);
  });

  test('check number filters', () => {
    const checkValue = (
      value: any,
      rule: NumberFilterRules,
      filterValue: any,
      minValue?: any,
      maxValue?: any,
    ) => {
      return numberFilter({
        row: { foo: value },
        filter: {
          field: 'foo',
          type: FilterType.number,
          columnType: 'number',
          conditions: [
            { rule, value: filterValue, join: 'AND', minValue, maxValue },
          ],
        },
      });
    };

    /* checking empty rule */
    expect(checkValue(12, NumberFilterRules.empty, 0)).toBe(false);
    expect(checkValue(0, NumberFilterRules.empty, 0)).toBe(false);
    expect(checkValue(undefined, NumberFilterRules.empty, undefined)).toBe(
      true,
    );
    expect(checkValue(null, NumberFilterRules.empty, null)).toBe(true);

    /* checking notEmpty rule */
    expect(checkValue(12, NumberFilterRules.notEmpty, 0)).toBe(true);
    expect(checkValue(0, NumberFilterRules.notEmpty, 0)).toBe(true);
    expect(checkValue(undefined, NumberFilterRules.notEmpty, undefined)).toBe(
      false,
    );
    expect(checkValue(null, NumberFilterRules.notEmpty, null)).toBe(false);

    /* checking equal rule */
    expect(checkValue(12, NumberFilterRules.equal, 12)).toBe(true);
    expect(checkValue(12, NumberFilterRules.equal, 15)).toBe(false);
    expect(checkValue(0, NumberFilterRules.equal, 0)).toBe(true);
    expect(checkValue(0, NumberFilterRules.equal, 8)).toBe(false);
    expect(checkValue(undefined, NumberFilterRules.equal, undefined)).toBe(
      false,
    );
    console.log('---');
    expect(checkValue(null, NumberFilterRules.equal, null)).toBe(true);

    /* checking notEqual rule */
    expect(checkValue(12, NumberFilterRules.notEqual, 12)).toBe(false);
    expect(checkValue(12, NumberFilterRules.notEqual, 15)).toBe(true);
    expect(checkValue(0, NumberFilterRules.notEqual, 0)).toBe(false);
    expect(checkValue(0, NumberFilterRules.notEqual, 8)).toBe(true);
    expect(checkValue(undefined, NumberFilterRules.notEqual, undefined)).toBe(
      false,
    );
    expect(checkValue(null, NumberFilterRules.notEqual, null)).toBe(false);

    /* checking gt rule */
    expect(checkValue(12, NumberFilterRules.gt, 12)).toBe(false);
    expect(checkValue(12, NumberFilterRules.gt, 8)).toBe(true);
    expect(checkValue(12, NumberFilterRules.gt, 15)).toBe(false);
    expect(checkValue(0, NumberFilterRules.gt, 0)).toBe(false);
    expect(checkValue(0, NumberFilterRules.gt, 8)).toBe(false);
    expect(checkValue(0, NumberFilterRules.gt, -5)).toBe(true);
    expect(checkValue(undefined, NumberFilterRules.gt, undefined)).toBe(false);
    expect(checkValue(null, NumberFilterRules.gt, null)).toBe(false);

    /* checking gte rule */
    expect(checkValue(12, NumberFilterRules.gte, 12)).toBe(true);
    expect(checkValue(12, NumberFilterRules.gte, 8)).toBe(true);
    expect(checkValue(12, NumberFilterRules.gte, 15)).toBe(false);
    expect(checkValue(0, NumberFilterRules.gte, 0)).toBe(true);
    expect(checkValue(0, NumberFilterRules.gte, 8)).toBe(false);
    expect(checkValue(0, NumberFilterRules.gte, -5)).toBe(true);
    expect(checkValue(undefined, NumberFilterRules.gte, undefined)).toBe(false);
    expect(checkValue(null, NumberFilterRules.gte, null)).toBe(true);

    /* checking lt rule */
    expect(checkValue(12, NumberFilterRules.lt, 12)).toBe(false);
    expect(checkValue(12, NumberFilterRules.lt, 8)).toBe(false);
    expect(checkValue(12, NumberFilterRules.lt, 15)).toBe(true);
    expect(checkValue(0, NumberFilterRules.lt, 0)).toBe(false);
    expect(checkValue(0, NumberFilterRules.lt, 8)).toBe(true);
    expect(checkValue(0, NumberFilterRules.lt, -5)).toBe(false);
    expect(checkValue(undefined, NumberFilterRules.lt, undefined)).toBe(false);
    expect(checkValue(null, NumberFilterRules.lt, null)).toBe(false);

    /* checking lte rule */
    expect(checkValue(12, NumberFilterRules.lte, 12)).toBe(true);
    expect(checkValue(12, NumberFilterRules.lte, 8)).toBe(false);
    expect(checkValue(12, NumberFilterRules.lte, 15)).toBe(true);
    expect(checkValue(0, NumberFilterRules.lte, 0)).toBe(true);
    expect(checkValue(0, NumberFilterRules.lte, 8)).toBe(true);
    expect(checkValue(0, NumberFilterRules.lte, -5)).toBe(false);
    expect(checkValue(undefined, NumberFilterRules.lte, undefined)).toBe(false);
    expect(checkValue(null, NumberFilterRules.lte, null)).toBe(true);

    /* checking between rule */
    expect(checkValue(12, NumberFilterRules.between, undefined, 8, 15)).toBe(
      true,
    );
    expect(checkValue(12, NumberFilterRules.between, undefined, 15, 100)).toBe(
      false,
    );
    expect(checkValue(12, NumberFilterRules.between, undefined, 4, 5)).toBe(
      false,
    );
    expect(checkValue(0, NumberFilterRules.between, undefined, 0, 5)).toBe(
      true,
    );
    expect(checkValue(0, NumberFilterRules.between, undefined, -5, 5)).toBe(
      true,
    );
    expect(checkValue(0, NumberFilterRules.between, undefined, 8, 15)).toBe(
      false,
    );
    expect(
      checkValue(
        undefined,
        NumberFilterRules.between,
        undefined,
        undefined,
        undefined,
      ),
    ).toBe(false);
    expect(checkValue(null, NumberFilterRules.between, null, null, null)).toBe(
      true,
    );

    /* checking notBetween rule */
    expect(checkValue(12, NumberFilterRules.notBetween, undefined, 8, 15)).toBe(
      false,
    );
    expect(
      checkValue(12, NumberFilterRules.notBetween, undefined, 15, 100),
    ).toBe(true);
    expect(checkValue(12, NumberFilterRules.notBetween, undefined, 4, 5)).toBe(
      true,
    );
    expect(checkValue(0, NumberFilterRules.notBetween, undefined, 0, 5)).toBe(
      false,
    );
    expect(checkValue(0, NumberFilterRules.notBetween, undefined, -5, 5)).toBe(
      false,
    );
    expect(checkValue(0, NumberFilterRules.notBetween, undefined, 8, 15)).toBe(
      true,
    );
    expect(
      checkValue(
        undefined,
        NumberFilterRules.notBetween,
        undefined,
        undefined,
        undefined,
      ),
    ).toBe(false);
    expect(
      checkValue(null, NumberFilterRules.notBetween, null, null, null),
    ).toBe(false);
  });

  test('check boolean filters', () => {
    const checkValue = (value: any, rule: BooleanFilterRules) => {
      return booleanFilter({
        row: { foo: value },
        filter: {
          field: 'foo',
          type: FilterType.boolean,
          columnType: 'boolean',
          conditions: [{ rule, join: 'AND', value: true }],
        },
      });
    };

    /* checking positive rule */
    expect(checkValue(true, BooleanFilterRules.positive)).toBe(true);
    expect(checkValue(false, BooleanFilterRules.positive)).toBe(false);
    expect(checkValue(undefined, BooleanFilterRules.positive)).toBe(false);
    expect(checkValue(null, BooleanFilterRules.positive)).toBe(false);
    expect(checkValue(0, BooleanFilterRules.positive)).toBe(false);
    expect(checkValue('abc', BooleanFilterRules.positive)).toBe(true);

    /* checking negative rule */
    expect(checkValue(true, BooleanFilterRules.negative)).toBe(false);
    expect(checkValue(false, BooleanFilterRules.negative)).toBe(true);
    expect(checkValue(undefined, BooleanFilterRules.negative)).toBe(true);
    expect(checkValue(null, BooleanFilterRules.negative)).toBe(true);
    expect(checkValue(0, BooleanFilterRules.negative)).toBe(true);
    expect(checkValue('abc', BooleanFilterRules.negative)).toBe(false);
  });

  test('check array filters', () => {
    const checkValue = (
      value: any,
      rule: ArrayFilterRules,
      filterValue: any,
    ) => {
      return arrayFilter({
        row: { foo: value },
        filter: {
          field: 'foo',
          type: FilterType.array,
          columnType: 'array',
          conditions: [
            {
              rule,
              join: 'AND',
              value: filterValue,
              options: [
                { value: 'france', label: 'France' },
                { value: 'germany', label: 'Germany' },
                { value: 'spain', label: 'Spain' },
              ],
            },
          ],
        },
      });
    };

    /* checking has rule */
    expect(
      checkValue(['russia', 'france'], ArrayFilterRules.has, ['france']),
    ).toBe(true);
    expect(
      checkValue(['russia', 'germany'], ArrayFilterRules.has, ['france']),
    ).toBe(false);
    expect(
      checkValue(['usa', 'france', 'spain'], ArrayFilterRules.has, [
        'spain',
        'usa',
      ]),
    ).toBe(true);
    expect(
      checkValue(['usa', 'france', 'spain'], ArrayFilterRules.has, ['germany']),
    ).toBe(false);
    expect(
      checkValue(['usa', 'france', 'spain'], ArrayFilterRules.has, []),
    ).toBe(false);
    expect(checkValue([undefined, undefined], ArrayFilterRules.has, [])).toBe(
      false,
    );

    /* checking not has rule */
    expect(
      checkValue(['russia', 'france'], ArrayFilterRules.notHas, ['france']),
    ).toBe(false);
    expect(
      checkValue(['russia', 'germany'], ArrayFilterRules.notHas, ['france']),
    ).toBe(true);
    expect(
      checkValue(['usa', 'france', 'spain'], ArrayFilterRules.notHas, [
        'spain',
        'usa',
      ]),
    ).toBe(false);
    expect(
      checkValue(['usa', 'france', 'spain'], ArrayFilterRules.notHas, [
        'germany',
      ]),
    ).toBe(true);
    expect(
      checkValue(['usa', 'france', 'spain'], ArrayFilterRules.notHas, []),
    ).toBe(true);
    expect(
      checkValue([undefined, undefined], ArrayFilterRules.notHas, []),
    ).toBe(true);
  });

  test('check date (date column type) filters', () => {
    const checkValue = (
      value: any,
      rule: DateFilterRules,
      filterValue: any,
      minValue?: any,
      maxValue?: any,
    ) => {
      return dateFilter({
        row: { foo: value },
        filter: {
          field: 'foo',
          type: FilterType.date,
          columnType: 'date',
          conditions: [
            {
              rule,
              join: 'AND',
              value: filterValue,
              minValue,
              maxValue,
            },
          ],
        },
      });
    };

    /* checking equal rule */
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2024-01-02')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2023-01-01')).toBe(
      false,
    );
    expect(
      checkValue('2024-01-01 18:45', DateFilterRules.equal, '2024-01-01 12:00'),
    ).toBe(true);
    expect(checkValue(undefined, DateFilterRules.equal, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.equal, null)).toBe(false);

    /* checking notEqual rule */
    expect(
      checkValue('2024-01-01', DateFilterRules.notEqual, '2024-01-01'),
    ).toBe(false);
    expect(
      checkValue('2024-01-01', DateFilterRules.notEqual, '2024-01-02'),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01 18:45',
        DateFilterRules.notEqual,
        '2024-01-01 12:00',
      ),
    ).toBe(false);
    expect(checkValue(undefined, DateFilterRules.equal, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.equal, null)).toBe(false);

    /* checking gt rule */
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2024-01-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2024-02-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2023-12-11')).toBe(
      true,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.gt, '2024-01-01 14:15'),
    ).toBe(false);
    expect(checkValue(undefined, DateFilterRules.gt, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.gt, null)).toBe(false);

    /* checking gte rule */
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2024-02-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2023-12-11')).toBe(
      true,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.gte, '2024-01-01 14:15'),
    ).toBe(true);
    expect(checkValue(undefined, DateFilterRules.gte, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.gte, null)).toBe(false);

    /* checking lt rule */
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2024-01-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2024-02-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2023-12-11')).toBe(
      false,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.lt, '2024-01-01 14:15'),
    ).toBe(false);
    expect(checkValue(undefined, DateFilterRules.lt, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.lt, null)).toBe(false);

    /* checking lte rule */
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2024-02-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2023-12-11')).toBe(
      false,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.lte, '2024-01-01 14:15'),
    ).toBe(true);
    expect(checkValue(undefined, DateFilterRules.lte, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.lte, null)).toBe(false);

    /* checking between rule */
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2023-12-01',
        '2024-05-01',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2024-01-02',
        '2024-12-31',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2024-01-01',
        '2024-01-01',
      ),
    ).toBe(true);
    expect(
      checkValue(
        undefined,
        DateFilterRules.between,
        undefined,
        undefined,
        undefined,
      ),
    ).toBe(false);
    expect(checkValue(null, DateFilterRules.between, null, null, null)).toBe(
      false,
    );

    /* checking beyond rule */
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2023-12-01',
        '2024-05-01',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2024-01-02',
        '2024-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2024-01-01',
        '2024-01-01',
      ),
    ).toBe(false);
    expect(
      checkValue(
        undefined,
        DateFilterRules.beyond,
        undefined,
        undefined,
        undefined,
      ),
    ).toBe(false);
    expect(checkValue(null, DateFilterRules.beyond, null, null, null)).toBe(
      false,
    );
  });

  test('check date (month column type) filters', () => {
    const checkValue = (
      value: any,
      rule: DateFilterRules,
      filterValue: any,
      minValue?: any,
      maxValue?: any,
    ) => {
      return dateFilter({
        row: { foo: value },
        filter: {
          field: 'foo',
          type: FilterType.date,
          columnType: 'month',
          conditions: [
            {
              rule,
              join: 'AND',
              value: filterValue,
              minValue,
              maxValue,
            },
          ],
        },
      });
    };

    /* checking equal rule */
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2024-02-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2023-01-01')).toBe(
      false,
    );
    expect(
      checkValue('2024-01-01 18:45', DateFilterRules.equal, '2024-01-01 12:00'),
    ).toBe(true);
    expect(checkValue(undefined, DateFilterRules.equal, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.equal, null)).toBe(false);

    /* checking notEqual rule */
    expect(
      checkValue('2024-01-01', DateFilterRules.notEqual, '2024-01-01'),
    ).toBe(false);
    expect(
      checkValue('2024-01-01', DateFilterRules.notEqual, '2024-01-02'),
    ).toBe(false);
    expect(
      checkValue('2024-01-01', DateFilterRules.notEqual, '2024-02-01'),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01 18:45',
        DateFilterRules.notEqual,
        '2024-01-01 12:00',
      ),
    ).toBe(false);
    expect(checkValue(undefined, DateFilterRules.equal, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.equal, null)).toBe(false);

    /* checking gt rule */
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2024-01-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2024-01-02')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2024-02-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2023-12-11')).toBe(
      true,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.gt, '2024-01-01 14:15'),
    ).toBe(false);
    expect(checkValue(undefined, DateFilterRules.gt, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.gt, null)).toBe(false);

    /* checking gte rule */
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2024-01-02')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2024-02-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2023-12-11')).toBe(
      true,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.gte, '2024-01-01 14:15'),
    ).toBe(true);
    expect(checkValue(undefined, DateFilterRules.gte, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.gte, null)).toBe(false);

    /* checking lt rule */
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2024-01-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2024-01-02')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2024-02-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2023-12-11')).toBe(
      false,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.lt, '2024-01-01 14:15'),
    ).toBe(false);
    expect(checkValue(undefined, DateFilterRules.lt, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.lt, null)).toBe(false);

    /* checking lte rule */
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2024-01-02')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2024-02-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2023-12-11')).toBe(
      false,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.lte, '2024-01-01 14:15'),
    ).toBe(true);
    expect(checkValue(undefined, DateFilterRules.lte, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.lte, null)).toBe(false);

    /* checking between rule */
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2023-12-01',
        '2024-05-01',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-05',
        DateFilterRules.between,
        undefined,
        '2024-01-01',
        '2024-01-10',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-02',
        DateFilterRules.between,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2024-01-02',
        '2024-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2024-01-01',
        '2024-01-01',
      ),
    ).toBe(true);
    expect(
      checkValue(
        undefined,
        DateFilterRules.between,
        undefined,
        undefined,
        undefined,
      ),
    ).toBe(false);
    expect(checkValue(null, DateFilterRules.between, null, null, null)).toBe(
      false,
    );

    /* checking beyond rule */
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2023-12-01',
        '2024-05-01',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2024-01-02',
        '2024-12-31',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2024-01-01',
        '2024-01-01',
      ),
    ).toBe(false);
    expect(
      checkValue(
        undefined,
        DateFilterRules.beyond,
        undefined,
        undefined,
        undefined,
      ),
    ).toBe(false);
    expect(checkValue(null, DateFilterRules.beyond, null, null, null)).toBe(
      false,
    );
  });

  test('check date (year column type) filters', () => {
    const checkValue = (
      value: any,
      rule: DateFilterRules,
      filterValue: any,
      minValue?: any,
      maxValue?: any,
    ) => {
      return dateFilter({
        row: { foo: value },
        filter: {
          field: 'foo',
          type: FilterType.date,
          columnType: 'year',
          conditions: [
            {
              rule,
              join: 'AND',
              value: filterValue,
              minValue,
              maxValue,
            },
          ],
        },
      });
    };

    /* checking equal rule */
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2024-05-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2024-02-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.equal, '2023-01-01')).toBe(
      false,
    );
    expect(
      checkValue('2024-01-01 18:45', DateFilterRules.equal, '2025-01-01 12:00'),
    ).toBe(false);
    expect(checkValue(undefined, DateFilterRules.equal, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.equal, null)).toBe(false);

    /* checking notEqual rule */
    expect(
      checkValue('2024-01-01', DateFilterRules.notEqual, '2024-01-01'),
    ).toBe(false);
    expect(
      checkValue('2024-01-01', DateFilterRules.notEqual, '2024-01-02'),
    ).toBe(false);
    expect(
      checkValue('2024-01-01', DateFilterRules.notEqual, '2024-02-01'),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01 18:45',
        DateFilterRules.notEqual,
        '2023-01-01 12:00',
      ),
    ).toBe(true);
    expect(checkValue(undefined, DateFilterRules.equal, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.equal, null)).toBe(false);

    /* checking gt rule */
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2024-01-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2024-01-02')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2025-02-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gt, '2023-12-11')).toBe(
      true,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.gt, '2024-01-01 14:15'),
    ).toBe(false);
    expect(checkValue(undefined, DateFilterRules.gt, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.gt, null)).toBe(false);

    /* checking gte rule */
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2024-01-02')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2025-02-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.gte, '2023-12-11')).toBe(
      true,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.gte, '2024-01-01 14:15'),
    ).toBe(true);
    expect(checkValue(undefined, DateFilterRules.gte, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.gte, null)).toBe(false);

    /* checking lt rule */
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2024-01-01')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2024-01-02')).toBe(
      false,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2025-02-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lt, '2023-12-11')).toBe(
      false,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.lt, '2024-01-01 14:15'),
    ).toBe(false);
    expect(checkValue(undefined, DateFilterRules.lt, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.lt, null)).toBe(false);

    /* checking lte rule */
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2024-01-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2024-01-02')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2025-02-01')).toBe(
      true,
    );
    expect(checkValue('2024-01-01', DateFilterRules.lte, '2023-12-11')).toBe(
      false,
    );
    expect(
      checkValue('2024-01-01 12:00', DateFilterRules.lte, '2024-01-01 14:15'),
    ).toBe(true);
    expect(checkValue(undefined, DateFilterRules.lte, undefined)).toBe(false);
    expect(checkValue(null, DateFilterRules.lte, null)).toBe(false);

    /* checking between rule */
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2023-12-01',
        '2024-05-01',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-05',
        DateFilterRules.between,
        undefined,
        '2023-01-01',
        '2025-01-10',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-05',
        DateFilterRules.between,
        undefined,
        '2024-01-01',
        '2025-01-10',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-05',
        DateFilterRules.between,
        undefined,
        '2026-01-01',
        '2028-01-10',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-02',
        DateFilterRules.between,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2024-01-02',
        '2024-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.between,
        undefined,
        '2024-01-01',
        '2024-01-01',
      ),
    ).toBe(true);
    expect(
      checkValue(
        undefined,
        DateFilterRules.between,
        undefined,
        undefined,
        undefined,
      ),
    ).toBe(false);
    expect(checkValue(null, DateFilterRules.between, null, null, null)).toBe(
      false,
    );

    /* checking beyond rule */
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2023-12-01',
        '2024-05-01',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2023-05-01',
        '2023-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2025-05-01',
        '2025-12-31',
      ),
    ).toBe(true);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2024-01-02',
        '2024-12-31',
      ),
    ).toBe(false);
    expect(
      checkValue(
        '2024-01-01',
        DateFilterRules.beyond,
        undefined,
        '2024-01-01',
        '2024-01-01',
      ),
    ).toBe(false);
    expect(
      checkValue(
        undefined,
        DateFilterRules.beyond,
        undefined,
        undefined,
        undefined,
      ),
    ).toBe(false);
    expect(checkValue(null, DateFilterRules.beyond, null, null, null)).toBe(
      false,
    );
  });
});
