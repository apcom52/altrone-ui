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
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
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

const onPageChange = action('pageChange');
const onSortingChange = action('sortChange');
const onFiltersChange = action('filtersChange');
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
      [],
    );

    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Basic DataTable</Text.Heading>
        <DataTable
          data={isEmpty ? [] : COUNTRIES}
          rowsPerPage={5}
          selectable
          defaultPage={defaultPage}
          defaultSort={defaultSorting}
          defaultFilters={defaultFilters}
          columns={[
            { accessor: 'flag', label: 'Flag', width: '80px' },
            {
              accessor: 'country',
              label: 'Country Name',
              filterable: true,
              type: 'text',
            },
            { accessor: 'capital', label: 'Capital' },
          ]}
          onPageChange={onPageChange}
          onSortChange={onSortingChange}
          onFilterChange={onFiltersChange}
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
                  : { field: 'country', direction: 'desc' },
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
            content={<Text.Paragraph>Content is here</Text.Paragraph>}
          >
            <DataTable.Action
              leftIcon={<Icon i="sports_esports" />}
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
        <Text.Heading role="inner">
          DataTable with filtering and sorting
        </Text.Heading>
        <DataTable<EmployeeType>
          data={EMPLOYEES}
          rowsPerPage={20}
          selectable
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
              Component: ({ item }) => (
                <Text.Paragraph
                  data-name={`${item.firstName} ${item.lastName}`}
                >{`${item.firstName} ${item.lastName}`}</Text.Paragraph>
              ),
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              filterable: true,
              Component: ({ value }) => (
                <Text.Paragraph size="l">
                  {value ? <Icon i="check" /> : <Icon i="close" />}
                </Text.Paragraph>
              ),
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
              width: '100px',
              filterable: true,
              sortable: true,
            },
            {
              accessor: 'salary',
              label: 'Salary',
              width: '150px',
              filterable: true,
              sortable: true,
              Component: ({ value }) => (
                <Text.Paragraph style={{ width: '100%', textAlign: 'right' }}>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Number(value))}
                </Text.Paragraph>
              ),
            },
            { accessor: 'phoneNumber', label: 'Phone' },
            {
              accessor: 'skills',
              label: 'Skills',
              filterable: true,
              Component: ({ value }) => (
                <Flex gap="s" wrap>
                  {(value as string[]).map((skill, skillIndex) => (
                    <Text.Code key={skillIndex}>{skill}</Text.Code>
                  ))}
                </Flex>
              ),
            },
          ]}
        />
      </Flex>
    );
  },
};

export {
  InvoiceStory,
  InvoicesWithStatusesStory,
  FiltersDataTableStory,
  DataTableWithRowActionsStory,
};

export default meta;
