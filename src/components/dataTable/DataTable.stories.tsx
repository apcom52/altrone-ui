import { DataTable, Filter, StringFilterRules } from './index';
import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../flex';
import { Text } from '../text';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Dropdown } from '../dropdown';
import { Icon } from '../icon';
import { Popover } from '../popover';
import { EMPLOYEES, EmployeeType } from './stories/EMPLOYEES.ts';
import { InvoiceStory } from './stories/InvoiceStory.tsx';
import { InvoicesWithStatusesStory } from './stories/Invoice2Story.tsx';
import { DataTableWithRowActionsStory } from './stories/ActionsStory.tsx';
import { FiltersDataTableStory } from './stories/FiltersStory.tsx';
import { StoryWithDifferentRenderers } from './stories/StoryWithDifferentRenderers.tsx';
import { useState } from 'react';
import { FilterType, Sorting } from './DataTable.types.ts';

const meta: Meta<typeof DataTable<any>> = {
  component: DataTable,
  title: 'Components/Display/DataTable',
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

const DEFAULT_FILTERS: Filter[] = [
  {
    field: 'country',
    type: FilterType.string,
    conditions: [{ rule: StringFilterRules.contain, join: 'AND', value: 'Ru' }],
  },
];

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using DataTable',
  render: () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const [defaultPage, setDefaultPage] = useState(3);
    const [defaultSorting, setDefaultSorting] = useState<Sorting | undefined>({
      field: 'country',
      direction: 'desc',
    });
    const [defaultFilters, setDefaultFilters] = useState<Filter[] | undefined>(
      []
    );

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold">
          Basic DataTable
        </Text>
        <DataTable
          data={COUNTRIES}
          rowsPerPage={7}
          selectable
          defaultPage={defaultPage}
          defaultSort={defaultSorting}
          defaultFilters={defaultFilters}
          columns={[
            { accessor: 'flag', label: 'Flag', type: 'string', width: 40 },
            {
              accessor: 'country',
              label: 'Country Name',
              filterable: true,
              type: 'string',
            },
            { accessor: 'capital', label: 'Capital', type: 'string' },
          ]}
        >
          <DataTable.Action
            label="Toggle page"
            onClick={() => setDefaultPage(defaultPage === 3 ? 5 : 3)}
          />
          <DataTable.Action
            label={isEmpty ? 'Show data' : 'Hide data'}
            onClick={() => setIsEmpty(!isEmpty)}
          />
          <DataTable.Action
            label="Toggle sorting"
            onClick={() =>
              setDefaultSorting(
                defaultSorting
                  ? undefined
                  : { field: 'country', direction: 'desc' }
              )
            }
          />
          <DataTable.Action
            label="Toggle filters"
            onClick={() =>
              setDefaultFilters(defaultFilters ? undefined : DEFAULT_FILTERS)
            }
          />
          <Dropdown
            content={
              <Dropdown.Menu>
                <Dropdown.Action
                  icon={<Icon i="play_arrow" />}
                  label="Test A"
                />
                <Dropdown.Action
                  icon={<Icon i="play_arrow" />}
                  label="Test B"
                />
              </Dropdown.Menu>
            }
          >
            <DataTable.Action label="Dropdown" />
          </Dropdown>
          <Popover
            title="Custom popover"
            content={<Text block>Content is here</Text>}
          >
            <DataTable.Action
              icon={<Icon i="sports_esports" />}
              label="Popover"
            />
          </Popover>
        </DataTable>
      </Flex>
    );
  },
};

export const ComplexDataTable: StoryObj<typeof Flex> = {
  name: 'Using filtering and sorting',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold">
          DataTable with filtering and sorting
        </Text>
        <DataTable
          data={EMPLOYEES}
          rowsPerPage={20}
          selectable
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
              type: 'custom',
              filterable: 'string',
              options: {
                renderReadMode: ({ item }) => (
                  <Text block>
                    {item.firstName} {item.lastName}
                  </Text>
                ),
              },
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              filterable: true,
              type: 'boolean',
            },
            {
              accessor: 'role',
              label: 'Position',
              filterable: true,
            },
            {
              accessor: 'age',
              label: 'Age',
              type: 'number',
              width: 100,
              filterable: true,
              sortable: true,
            },
            {
              accessor: 'salary',
              label: 'Salary',
              width: 150,
              type: 'currency',
              filterable: true,
              sortable: true,
              options: {
                currency: 'USD',
              },
            },
            { accessor: 'phoneNumber', label: 'Phone' },
            {
              accessor: 'skills',
              label: 'Skills',
              filterable: true,
              type: 'select',
            },
          ]}
        >
          {({ selectableMode, selectedItems }) => (
            <>
              {selectableMode && (
                <DataTable.Action
                  label={`Make something with ${selectedItems.length} selected items`}
                  onClick={() => {
                    console.log('selectedItems', selectedItems);
                  }}
                />
              )}
            </>
          )}
        </DataTable>
      </Flex>
    );
  },
};

export {
  InvoiceStory,
  InvoicesWithStatusesStory,
  FiltersDataTableStory,
  DataTableWithRowActionsStory,
  StoryWithDifferentRenderers,
};

export default meta;
