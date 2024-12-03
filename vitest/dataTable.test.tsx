import { render, screen } from '@testing-library/react';
import {
  Configuration,
  AltroneApplication,
  DataTable,
} from '../src/components';
import { EMPLOYEES } from '../src/components/dataTable/stories/EMPLOYEES';
import { INVOICES } from '../src/components/dataTable/stories/INVOICES';

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
    expect(table.rows[1].cells[2].textContent).toBe('$1,500.00');
    expect(table.rows[1].cells[3].textContent).toBe('January 15, 2024');
    expect(table.rows[1].cells[4].textContent).toBe('January 2024');
    expect(table.rows[1].cells[5].textContent).toBe('2024');
  });

  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <DataTable
          data={EMPLOYEES}
          columns={[]}
          data-testid="data-table"
          className="cls"
          style={{ color: 'blue' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('data-table')).toHaveClass('cls');
    expect(screen.getByTestId('data-table')).toHaveStyle('color: blue');
  });

  test('check that CollapsedList configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          dataTable={{ className: 'cls', style: { color: 'blue' } }}
        >
          <DataTable data={EMPLOYEES} columns={[]} data-testid="data-table" />
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('data-table');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
