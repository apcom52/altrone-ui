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
import { Altrone } from '../../../hocs';
import ReactDOM from 'react-dom';
import { Icon } from '../../icons';

const DATA = [
  {
    id: 1,
    country: 'The United States of America',
    capital: 'Washington',
    language: 'EN',
    population: 332,
    continent: 'NA'
  },
  {
    id: 2,
    country: 'The United Kingdom',
    capital: 'London',
    language: 'EN',
    population: 67,
    continent: 'EU'
  },
  {
    id: 3,
    country: 'France',
    capital: 'Paris',
    language: 'FR',
    population: 67,
    continent: 'EU'
  },
  {
    id: 4,
    country: 'Turkey',
    capital: 'Ankara',
    language: 'TR',
    population: 85,
    continent: 'AS'
  },
  {
    id: 5,
    country: 'China',
    capital: 'Beijing',
    language: 'CH',
    population: 1412,
    continent: 'AS'
  },
  {
    id: 6,
    country: 'Russia',
    capital: 'Moscow',
    language: 'RU',
    population: 143,
    continent: 'EU'
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
    ),
    label: 'Population (in millions)'
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

    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
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

  test('should sorting feature renders correctly', async () => {
    jest.useFakeTimers();
    jest.runAllTimers();

    const { rerender } = render(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} sortKeys={['country', 'population']} />
      </Altrone>
    );

    const sortingAction = screen.getByTitle('Sort');
    await waitFor(() => fireEvent.click(sortingAction));

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} sortKeys={['country', 'population']} />
      </Altrone>
    );

    const sortingPopup = screen.getByTestId('alt-test-datatable-sorting');
    expect(sortingPopup).toBeInTheDocument();

    const sortingKeysSelect = screen.getByText('Select an option');
    await waitFor(() => fireEvent.click(sortingKeysSelect));

    expect(sortingKeysSelect).toBeInTheDocument();

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} sortKeys={['country', 'population']} />
      </Altrone>
    );

    const selectMenu = await screen.findByTestId('alt-test-select-menu');
    const selectMenuOptions =
      selectMenu?.querySelectorAll('.alt-select-option .alt-select-option__label') || [];

    const selectMenuParsedOptions = Array.from(selectMenuOptions).map((button) => button.innerHTML);

    expect(selectMenuParsedOptions).toStrictEqual(['country', 'Population (in millions)']);
  });

  test('should renders headers of columns correctly', () => {
    const { container } = render(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} sortKeys={['country', 'population']} />
      </Altrone>
    );

    const headerCells = container.querySelectorAll('.alt-data-table__cell--header');
    expect(headerCells).toHaveLength(4);

    const textOfCells = Array.from(headerCells).map((cell) => cell.innerHTML);
    expect(textOfCells).toStrictEqual(['#', 'country', 'capital', 'Population (in millions)']);
  });

  test('should custom actions works correctly', async () => {
    const actionFn = jest.fn();

    render(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          sortKeys={['country', 'population']}
          actions={[
            {
              label: 'Schedule',
              icon: <Icon i="schedule" />,
              onClick: actionFn
            }
          ]}
        />
      </Altrone>
    );

    const scheduleAction = screen.getByText('schedule');
    await waitFor(() => fireEvent.click(scheduleAction));

    expect(actionFn).toBeCalledTimes(1);
  });

  test('should filtering feature renders correctly', async () => {
    const { rerender } = render(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          filters={[
            {
              type: 'select',
              accessor: 'language'
            },
            {
              type: 'checkboxList',
              accessor: 'continent'
            }
          ]}
        />
      </Altrone>
    );

    const filtersAction = screen.getByTitle('Filters');
    await waitFor(() => fireEvent.click(filtersAction));

    rerender(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          filters={[
            {
              type: 'select',
              accessor: 'language'
            },
            {
              type: 'checkboxList',
              accessor: 'continent'
            }
          ]}
        />
      </Altrone>
    );

    const filtersPopup = await screen.findByTestId('alt-test-datatable-filtering-popup');
    expect(filtersPopup).toBeInTheDocument();

    const checkboxList = Array.from(filtersPopup?.querySelectorAll('.alt-checkbox__label'))?.map(
      (item) => item.innerHTML
    );
    expect(checkboxList).toStrictEqual(['NA', 'EU', 'AS']);

    const select = screen.getByText('Select an option');
    expect(select).toBeInTheDocument();

    await waitFor(() => fireEvent.click(select));

    const selectMenu = await screen.findByTestId('alt-test-select-menu');
    const selectMenuOptions =
      selectMenu?.querySelectorAll('.alt-select-option .alt-select-option__label') || [];

    const selectMenuParsedOptions = Array.from(selectMenuOptions).map((button) => button.innerHTML);

    expect(selectMenuParsedOptions).toStrictEqual(['EN', 'FR', 'TR', 'CH', 'RU']);
  });

  test('should indicator works correctly', async () => {
    const { rerender } = render(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          filters={[
            {
              type: 'checkboxList',
              accessor: 'continent'
            }
          ]}
        />
      </Altrone>
    );

    let filtersAction = screen.getByTitle('Filters');
    await waitFor(() => fireEvent.click(filtersAction));

    const northAmerica = screen.getByText('NA');
    const europe = screen.getByText('EU');

    await waitFor(() => fireEvent.click(northAmerica));
    await waitFor(() => fireEvent.click(europe));

    rerender(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          filters={[
            {
              type: 'checkboxList',
              accessor: 'continent'
            }
          ]}
        />
      </Altrone>
    );

    filtersAction = screen.getByTitle('Filters');
    const indicator = filtersAction.querySelector('.alt-button__indicator');

    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveTextContent('1');
  });
});
