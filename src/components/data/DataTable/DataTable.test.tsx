import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataTable, DataTableColumn } from './index';
import {
  defaultCheckboxesFilter,
  defaultSelectFilter,
  defaultSortFunc,
  filterVisibleColumns
} from './functions';
import { Sort } from '../../../types';

const DATA = [
  {
    id: 1,
    country: 'The United States of America',
    capital: 'Washington',
    population: 332
  },
  {
    id: 2,
    country: 'The United Kingdom',
    capital: 'Washington',
    population: 67
  },
  {
    id: 3,
    country: 'France',
    capital: 'Paris',
    population: 67
  },
  {
    id: 4,
    country: 'Turkey',
    capital: 'Ankara',
    population: 85
  },
  {
    id: 5,
    country: 'China',
    capital: 'Beijing',
    population: 1412
  },
  {
    id: 6,
    country: 'Russia',
    capital: 'Moscow',
    population: 143
  }
];

const COLUMNS: DataTableColumn[] = [
  {
    accessor: 'id',
    label: '#'
  },
  {
    accessor: 'country'
  },
  {
    accessor: 'capital'
  },
  {
    accessor: 'population',
    Component: ({ value }) => (
      <span data-testid="alt-test-datatable-customCell">{value} millions</span>
    )
  }
];

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Data.DataTable', () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
  });

  test('should renders correctly', () => {
    render(<DataTable data={DATA} columns={COLUMNS} />);

    const table = screen.getByTestId('alt-test-datatable');
    const rows = screen.queryAllByTestId('alt-test-datatable-row');

    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(6);
    expect(rows[0].children).toHaveLength(4);
  });

  test('should pagination works correctly', async () => {
    const { rerender } = render(<DataTable data={DATA} columns={COLUMNS} limit={5} />);

    let rows = screen.queryAllByTestId('alt-test-datatable-row');
    let currentPage = screen.getByTestId('alt-test-datatable-currentPage');
    expect(rows).toHaveLength(5);
    expect(currentPage).toHaveTextContent('1');

    const nextPage = screen.getByText('arrow_forward_ios');
    await waitFor(() => fireEvent.click(nextPage));

    rerender(<DataTable data={DATA} columns={COLUMNS} limit={5} />);
    rows = screen.queryAllByTestId('alt-test-datatable-row');
    currentPage = screen.getByTestId('alt-test-datatable-currentPage');
    expect(rows).toHaveLength(1);
    expect(currentPage).toHaveTextContent('2');

    const prevPage = screen.getByText('arrow_back_ios');
    await waitFor(() => fireEvent.click(prevPage));

    rerender(<DataTable data={DATA} columns={COLUMNS} limit={5} />);
    rows = screen.queryAllByTestId('alt-test-datatable-row');
    currentPage = screen.getByTestId('alt-test-datatable-currentPage');
    expect(rows).toHaveLength(5);
    expect(currentPage).toHaveTextContent('1');
  });

  test('should render custom cell correctly', () => {
    render(<DataTable data={DATA} columns={COLUMNS} />);

    const customCells = screen.queryAllByTestId('alt-test-datatable-customCell');
    expect(customCells).toHaveLength(6);
  });

  test('should sort correctly', () => {
    const originalValues = [{ value: 2 }, { value: 5 }, { value: 1 }, { value: 3 }, { value: 4 }];

    const ascSorted = originalValues
      .sort((itemA, itemB) => {
        return defaultSortFunc({ itemA, itemB, field: 'value', direction: Sort.asc });
      })
      .map((i) => i.value);

    const descSorted = originalValues
      .sort((itemA, itemB) => {
        return defaultSortFunc({ itemA, itemB, field: 'value', direction: Sort.desc });
      })
      .map((i) => i.value);

    expect(ascSorted).toStrictEqual([1, 2, 3, 4, 5]);
    expect(descSorted).toStrictEqual([5, 4, 3, 2, 1]);
  });

  test('should status works correctly', () => {
    render(<DataTable data={DATA} columns={COLUMNS} />);

    const status = screen.getByTestId('alt-test-datatable-status');
    expect(status).toHaveTextContent('Showing 6 lines');
  });

  test('should search works correctly', async () => {
    const { rerender } = render(<DataTable data={DATA} columns={COLUMNS} searchBy="country" />);

    let rows = screen.queryAllByTestId('alt-test-datatable-row');

    expect(rows).toHaveLength(6);

    const search = screen.getByTestId('alt-test-datatable-search').querySelector('input');
    await waitFor(() => fireEvent.change(search, { target: { value: 'The' } }));

    rerender(<DataTable data={DATA} columns={COLUMNS} searchBy="country" />);
    rows = screen.queryAllByTestId('alt-test-datatable-row');

    expect(rows).toHaveLength(2);
  });

  test('should filters works correctly', () => {
    const originalValues = [{ value: 2 }, { value: 5 }, { value: 1 }, { value: 3 }, { value: 4 }];

    const filteredBySelect = originalValues.filter((item) =>
      defaultSelectFilter({ item, field: 'value', value: 3 })
    );

    const filteredByCheckboxes = originalValues.filter((item) =>
      defaultCheckboxesFilter({ item, field: 'value', value: [2, 1] })
    );

    expect(filteredBySelect).toStrictEqual([{ value: 3 }]);
    expect(filteredByCheckboxes).toStrictEqual([{ value: 2 }, { value: 1 }]);
  });

  test('should show mobile columns correctly', () => {
    const columns = [
      {
        accessor: 'name'
      },
      {
        accessor: 'surname'
      },
      {
        accessor: 'gender'
      }
    ];

    expect(filterVisibleColumns(columns, [])).toStrictEqual(columns);
    expect(filterVisibleColumns(columns, ['name', 'surname'], true)).toStrictEqual([
      { accessor: 'name' },
      { accessor: 'surname' }
    ]);
  });
});
