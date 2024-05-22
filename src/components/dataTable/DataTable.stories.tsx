import { DataTable } from './index';
import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../flex';
import { Direction, Gap } from 'types';
import { Text, TextHeadingRoles } from '../text';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Dropdown } from '../dropdown';
import { Icon } from '../icon';
import { Popover } from '../popover';
import { EMPLOYEES, EmployeeType } from './EMPLOYEES.ts';

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

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using DataTable',
  render: () => {
    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic DataTable
        </Text.Heading>
        <DataTable
          data={COUNTRIES}
          limit={20}
          selectable
          columns={[
            { accessor: 'flag', label: 'Flag', width: '80px' },
            { accessor: 'country', label: 'Country Name' },
            { accessor: 'capital', label: 'Capital' },
          ]}
        >
          <DataTable.Action label="Test" onClick={() => alert('Test !')} />
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
            <DataTable.Action label="Test Dropdown" />
          </Dropdown>
          <Popover
            title="Custom popover"
            content={<Text.Paragraph>Content is here</Text.Paragraph>}
          >
            <DataTable.Action
              leftIcon={<Icon i="sports_esports" />}
              label="Test Popover"
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
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          DataTable with filtering and sorting
        </Text.Heading>
        <DataTable<EmployeeType>
          data={EMPLOYEES}
          limit={20}
          selectable
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
              Component: ({ item }) => (
                <Text.Paragraph>{`${item.firstName} ${item.lastName}`}</Text.Paragraph>
              ),
            },
            { accessor: 'role', label: 'Position', filterable: true },
            {
              accessor: 'age',
              label: 'Age',
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
                <Flex gap={Gap.small} wrap direction={Direction.horizontal}>
                  {value.map((skill, skillIndex) => (
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

export default meta;
