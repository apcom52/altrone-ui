import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  DataTable,
  DataTableColumn,
  DataTablePopupActionProps,
  DataTableSelectablePopupActionProps
} from './index';
import {
  DataTableSortFunc,
  defaultCheckboxesFilter,
  defaultCheckboxFilter,
  defaultDateFilter,
  defaultDateRangeFilter,
  defaultSelectFilter,
  defaultSortFunc,
  filterVisibleColumns
} from './functions';
import { Sort } from '../../../types';
import { Altrone } from '../../../hocs';
import * as ReactDOM from 'react-dom';
import { Icon } from '../../typography';
import { TEST_MATCH_MEDIA_FN } from '../../../utils/_testUtils';
import { Picker } from '../../form';

type DataInstance = {
  id: number;
  country: string;
  capital: string;
  language: string;
  population: number;
  continent: string;
};

const DATA: DataInstance[] = [
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

const COLUMNS: DataTableColumn<DataInstance>[] = [
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
    Component: (props) => (
      // eslint-disable-next-line react/prop-types
      <span data-testid="alt-test-datatable-customCell">{String(props.value)} millions</span>
    ),
    label: 'Population (in millions)'
  }
];

class ResizeObserver {
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

describe('Data.DataTable', () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
    window.matchMedia = TEST_MATCH_MEDIA_FN;

    Object.defineProperty(ReactDOM, 'createPortal', {
      value: jest.fn((element) => {
        return element;
      })
    });
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
    let currentPage = screen.getByTestId('alt-test-pagination-currentPage');
    expect(rows).toHaveLength(5);
    expect(currentPage).toHaveTextContent('1');

    const nextPage = screen.getByText('arrow_forward_ios');
    await waitFor(() => fireEvent.click(nextPage));

    rerender(<DataTable data={DATA} columns={COLUMNS} limit={5} />);
    rows = screen.queryAllByTestId('alt-test-datatable-row');
    currentPage = screen.getByTestId('alt-test-pagination-currentPage');
    expect(rows).toHaveLength(1);
    expect(currentPage).toHaveTextContent('2');

    const prevPage = screen.getByText('arrow_back_ios_new');
    await waitFor(() => fireEvent.click(prevPage));

    rerender(<DataTable data={DATA} columns={COLUMNS} limit={5} />);
    rows = screen.queryAllByTestId('alt-test-datatable-row');
    currentPage = screen.getByTestId('alt-test-pagination-currentPage');
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

    const search = screen.getByRole('searchbox');
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

    const sortingAction = screen.getByText('Sort');
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

    const filtersAction = screen.getByText('Filters');
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

    let filtersAction = screen.getByText('Filters');
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

    filtersAction = screen.getByText('Filters');
    const indicator = filtersAction.querySelector('.alt-button__indicator');

    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveTextContent('1');
  });

  test('should limit < 0 works correctly', () => {
    render(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} limit={-5} />
      </Altrone>
    );

    expect(screen.queryAllByTestId('alt-test-datatable-row')).toHaveLength(1);
  });

  test('should custom sort func works correctly', async () => {
    const sortFunction = ({ direction, itemA, itemB, field }: DataTableSortFunc<DataInstance>) => {
      return direction === Sort.asc
        ? itemA[field] > itemB[field]
          ? 1
          : -1
        : itemA[field] < itemB[field]
        ? 1
        : -1;
    };

    const { rerender } = render(
      <Altrone>
        <DataTable<DataInstance>
          data={DATA}
          columns={COLUMNS}
          sortKeys={['country']}
          sortFunc={sortFunction}
        />
      </Altrone>
    );

    const sortingButton = screen.getByText('Sort');
    expect(sortingButton).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(sortingButton);
    });

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} sortKeys={['country']} sortFunc={sortFunction} />
      </Altrone>
    );

    const sorting = screen.getByTestId('alt-test-datatable-sorting');
    expect(sorting).toBeInTheDocument();

    const sortingSelect = screen.getByTestId('alt-test-select');
    expect(sortingSelect).toBeInTheDocument();

    await waitFor(() => fireEvent.click(sortingSelect));

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} sortKeys={['country']} sortFunc={sortFunction} />
      </Altrone>
    );

    const countryOption = await screen.findByTestId('alt-test-select-option');

    await waitFor(() => fireEvent.click(countryOption));
    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} sortKeys={['country']} sortFunc={sortFunction} />
      </Altrone>
    );

    const countries = screen.queryAllByTestId('alt-test-datatable-row').map((row) => {
      return row.querySelectorAll('td')[1].innerHTML;
    });

    expect(countries).toStrictEqual([
      'China',
      'France',
      'Russia',
      'The United Kingdom',
      'The United States of America',
      'Turkey'
    ]);
  });

  test('should search clear button works correctly', async () => {
    const { rerender } = render(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} searchBy="country" />
      </Altrone>
    );

    let searchField = screen.getByRole('searchbox');
    await waitFor(() => fireEvent.change(searchField, { target: { value: 'the' } }));

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} searchBy="country" />
      </Altrone>
    );

    searchField = screen.getByRole('searchbox');
    expect(searchField).toHaveValue('the');

    const clearButton = screen.getByText('backspace');
    await waitFor(() => fireEvent.click(clearButton));

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} searchBy="country" />
      </Altrone>
    );

    searchField = screen.getByRole('searchbox');
    expect(searchField).toHaveValue('');
  });

  test('should show header if either selectable or actions prop passed', () => {
    const { rerender } = render(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          actions={[
            {
              label: 'Test',
              icon: <></>,
              onClick: () => null
            }
          ]}
        />
      </Altrone>
    );

    expect(screen.getByTestId('alt-test-datatable-header')).toBeInTheDocument();

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} selectable />
      </Altrone>
    );

    expect(screen.getByTestId('alt-test-datatable-header')).toBeInTheDocument();

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} />
      </Altrone>
    );

    expect(screen.queryByTestId('alt-test-datatable-header')).not.toBeInTheDocument();
  });

  test('should selectable mode works correctly', async () => {
    const { rerender } = render(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} selectable />
      </Altrone>
    );

    const selectableAction = screen.getByText('check_box');

    expect(selectableAction).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectableAction));

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} selectable />
      </Altrone>
    );

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes).toHaveLength(6);

    await waitFor(() => fireEvent.click(checkboxes[1]));

    rerender(
      <Altrone>
        <DataTable data={DATA} columns={COLUMNS} selectable />
      </Altrone>
    );

    expect(screen.getAllByTestId('alt-test-datatable-row')[1]).toHaveClass(
      'alt-data-table__row--selected'
    );
  });

  test('should selectable actions works correctly', async () => {
    let value: typeof DATA = [];
    let contextMenuValue: typeof DATA = [];

    const ActionPopupComponent: React.FC<DataTableSelectablePopupActionProps<DataInstance>> = ({
      selectedRows
    }) => {
      return <div data-testid="popupContent">{JSON.stringify(selectedRows?.map((v) => v.id))}</div>;
    };

    const { rerender } = render(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          selectable
          selectableActions={[
            {
              icon: <></>,
              label: 'Click test',
              onClick: (selectedRows) => (value = selectedRows)
            },
            {
              icon: <></>,
              label: 'ContextMenu test',
              contextMenu: [
                {
                  title: 'execute context',
                  onClick: (selectedRows) => (contextMenuValue = selectedRows as typeof DATA)
                }
              ]
            }
          ]}
        />
      </Altrone>
    );

    const selectableAction = screen.getByText('check_box');

    expect(selectableAction).toBeInTheDocument();
    await waitFor(() => fireEvent.click(selectableAction));

    rerender(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          selectable
          selectableActions={[
            {
              icon: <></>,
              label: 'Click test',
              onClick: (selectedRows) => (value = selectedRows)
            },
            {
              icon: <></>,
              label: 'ContextMenu test',
              contextMenu: [
                {
                  title: 'execute context',
                  onClick: (selectedRows) => (contextMenuValue = selectedRows as typeof DATA)
                }
              ]
            }
          ]}
        />
      </Altrone>
    );

    const checkboxes = screen.getAllByRole('checkbox');

    await waitFor(() => fireEvent.click(checkboxes[1]));
    await waitFor(() => fireEvent.click(checkboxes[3]));

    const applyButton = screen.getByText('Click test');

    await waitFor(() => fireEvent.click(applyButton));

    expect(value.map((v) => v.id)).toStrictEqual([2, 4]);

    rerender(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          selectable
          selectableActions={[
            {
              icon: <></>,
              label: 'Click test',
              onClick: (selectedRows) => (value = selectedRows)
            },
            {
              icon: <></>,
              label: 'ContextMenu test',
              contextMenu: [
                {
                  title: 'execute context',
                  onClick: (selectedRows) => (contextMenuValue = selectedRows as typeof DATA)
                }
              ]
            }
          ]}
        />
      </Altrone>
    );

    const contextMenu = screen.getByText('ContextMenu test');

    await waitFor(() => fireEvent.click(contextMenu));

    rerender(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          selectable
          selectableActions={[
            {
              icon: <></>,
              label: 'Click test',
              onClick: (selectedRows) => (value = selectedRows)
            },
            {
              icon: <></>,
              label: 'ContextMenu test',
              contextMenu: [
                {
                  title: 'execute context',
                  onClick: (selectedRows) => (contextMenuValue = selectedRows as typeof DATA)
                }
              ]
            },
            {
              icon: <></>,
              label: 'Popup test',
              content: ActionPopupComponent
            }
          ]}
        />
      </Altrone>
    );

    const contextMenuAction = await screen.findByText('execute context');
    await waitFor(() => fireEvent.click(contextMenuAction));

    expect(contextMenuValue.map((v) => v.id)).toStrictEqual([2, 4]);

    rerender(
      <Altrone>
        <DataTable
          data={DATA}
          columns={COLUMNS}
          selectable
          selectableActions={[
            {
              icon: <></>,
              label: 'Click test',
              onClick: (selectedRows) => (value = selectedRows)
            },
            {
              icon: <></>,
              label: 'ContextMenu test',
              contextMenu: [
                {
                  title: 'execute context',
                  onClick: (selectedRows) => (contextMenuValue = selectedRows as typeof DATA)
                }
              ]
            },
            {
              icon: <></>,
              label: 'Popup test',
              content: ActionPopupComponent
            }
          ]}
        />
      </Altrone>
    );

    const popup = await screen.findByText('Popup test');
    await waitFor(() => fireEvent.click(popup));

    const popupContent = await screen.findByText('[2,4]');

    expect(popupContent).toBeInTheDocument();
  });

  test('should DataTableStatusComponent renders correctly', () => {
    render(
      <DataTable
        data={DATA}
        columns={COLUMNS}
        DataTableStatusComponent={() => <div>footer status</div>}
      />
    );

    expect(screen.getByText('footer status')).toBeInTheDocument();
  });

  test('should DataTableAction be disabled', () => {
    render(
      <DataTable
        data={DATA}
        columns={COLUMNS}
        actions={[
          {
            label: 'Disabled action',
            disabled: true,
            icon: <></>,
            onClick: () => null
          }
        ]}
      />
    );

    expect(screen.getByText('Disabled action')).toHaveAttribute('disabled', '');
  });

  test('should hide normal actions in selection mode', async () => {
    const { rerender } = render(
      <DataTable
        data={DATA}
        columns={COLUMNS}
        selectable
        actions={[
          {
            label: 'Normal action',
            icon: <></>,
            onClick: () => null
          }
        ]}
      />
    );

    expect(screen.getByText('Normal action')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(screen.getByText('check_box')));

    rerender(
      <DataTable
        data={DATA}
        columns={COLUMNS}
        selectable
        actions={[
          {
            label: 'Normal action',
            icon: <></>,
            onClick: () => null
          }
        ]}
      />
    );

    expect(screen.queryByText('Normal action')).not.toBeInTheDocument();
  });

  test('checkbox filter', () => {
    const originalValues = [
      { value: 2, valid: true },
      { value: 5, valid: false },
      { value: 1, valid: false },
      { value: 3, valid: true },
      { value: 4, valid: false }
    ];

    const filteredByCheckbox = originalValues
      .filter((item) => defaultCheckboxFilter({ item, field: 'valid', value: true }))
      .map((item) => item.value);

    expect(filteredByCheckbox).toStrictEqual([2, 3]);
  });

  test('date filter', () => {
    const originalValues = [
      { value: 2, createdAt: new Date(2022, 4, 25) },
      { value: 5, createdAt: new Date(2023, 5, 10) },
      { value: 1, createdAt: new Date(2024, 2, 12) },
      { value: 3, createdAt: new Date(2023, 6, 14) },
      { value: 4, createdAt: new Date(2022, 8, 1) }
    ];

    const filteredByDate = originalValues
      .filter((item) =>
        defaultDateFilter({ item, field: 'createdAt', value: new Date(2023, 5, 10) })
      )
      .map((item) => item.value);

    const filteredByMonth = originalValues
      .filter((item) =>
        defaultDateFilter({
          item,
          field: 'createdAt',
          value: new Date(2023, 5, 10),
          picker: Picker.month
        })
      )
      .map((item) => item.value);

    const filteredByYear = originalValues
      .filter((item) =>
        defaultDateFilter({
          item,
          field: 'createdAt',
          value: new Date(2023, 5, 10),
          picker: Picker.year
        })
      )
      .map((item) => item.value);

    expect(filteredByDate).toStrictEqual([5]);
    expect(filteredByMonth).toStrictEqual([5]);
    expect(filteredByYear).toStrictEqual([5, 3]);
  });

  test('date range filter', () => {
    const originalValues = [
      { value: 2, createdAt: new Date(2022, 4, 25) },
      { value: 5, createdAt: new Date(2023, 5, 10) },
      { value: 1, createdAt: new Date(2024, 2, 12) },
      { value: 3, createdAt: new Date(2023, 0, 14) },
      { value: 4, createdAt: new Date(2022, 8, 1) }
    ];

    const filteredByDate = originalValues
      .filter((item) =>
        defaultDateRangeFilter({
          item,
          field: 'createdAt',
          value: [new Date(2022, 0, 1), new Date(2023, 0, 1)]
        })
      )
      .map((item) => item.value);

    const filteredByMonth = originalValues
      .filter((item) =>
        defaultDateRangeFilter({
          item,
          field: 'createdAt',
          value: [new Date(2022, 0, 1), new Date(2023, 0, 1)],
          picker: Picker.month
        })
      )
      .map((item) => item.value);

    const filteredByYear = originalValues
      .filter((item) =>
        defaultDateRangeFilter({
          item,
          field: 'createdAt',
          value: [new Date(2022, 0, 1), new Date(2023, 0, 1)],
          picker: Picker.year
        })
      )
      .map((item) => item.value);

    expect(filteredByDate).toStrictEqual([2, 4]);
    expect(filteredByMonth).toStrictEqual([2, 3, 4]);
    expect(filteredByYear).toStrictEqual([2, 5, 3, 4]);
  });
});
