import { DataTable } from './index';
import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../flex';
import { Text } from '../text';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Dropdown } from '../dropdown';
import { Icon } from '../icon';
import { Popover } from '../popover';
import { EMPLOYEES, EmployeeType } from './EMPLOYEES.ts';
import { expect, within, fireEvent, userEvent } from '@storybook/test';
import { AsyncUtils } from 'utils';

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
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Basic DataTable</Text.Heading>
        <DataTable
          data={COUNTRIES}
          rowsPerPage={20}
          selectable
          columns={[
            { accessor: 'flag', label: 'Flag', width: '80px' },
            { accessor: 'country', label: 'Country Name' },
            { accessor: 'capital', label: 'Capital' },
          ]}
          showFooter={false}
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
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

    await step('data table has to have three columns', async () => {
      await expect(canvas.getByText('Flag')).toBeInTheDocument();
      await expect(canvas.getByText('Country Name')).toBeInTheDocument();
      await expect(canvas.getByText('Capital')).toBeInTheDocument();

      await expect(
        Array.from(canvasElement.querySelectorAll('table > thead > tr > th')),
      ).toHaveLength(3);
    });

    await step(
      'when user clicks on the checkbox icon Altrone needs to show column with checkboxes',
      async () => {
        await fireEvent.click(canvas.getByText('check_box'));

        await expect(
          Array.from(canvasElement.querySelectorAll('table > thead > tr > th')),
        ).toHaveLength(4);
      },
    );

    await step('need to show custom actions', async () => {
      await expect(canvas.getByText('Test')).toBeInTheDocument();
      await expect(canvas.getByText('Test Dropdown')).toBeInTheDocument();
      await expect(canvas.getByText('Test Popover')).toBeInTheDocument();
    });
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
              accessor: 'role',
              label: 'Position',
              filterable: true,
            },
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
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

    const getRows = () => {
      const items = Array.from(
        canvasElement.querySelectorAll('tr [data-name]'),
      );

      return items.map((item) => item.innerHTML);
    };

    await step('Number filtering: equals', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByText('Add filter'));
      await userEvent.click(canvas.getByTitle('Age'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.type(inputField, '25');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual(['Jane Smith']);
    });

    await step('Number filtering: not equals', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('equals to'));
      await userEvent.click(canvas.getByText('not equals to'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.clear(inputField);
      await userEvent.type(inputField, '30');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'Jane Smith',
        'Emily Johnson',
        'Michael Brown',
        'Jessica Davis',
        'David Wilson',
        'Laura Martinez',
        'Robert Garcia',
        'Sarah Miller',
        'James Anderson',
      ]);
    });

    await step('Number filtering: more than', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('not equals to'));
      await userEvent.click(canvas.getByText('>'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.clear(inputField);
      await userEvent.type(inputField, '30');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'Emily Johnson',
        'Michael Brown',
        'David Wilson',
        'Robert Garcia',
        'Sarah Miller',
        'James Anderson',
      ]);
    });

    await step('Number filtering: more or equals', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('>'));
      await userEvent.click(canvas.getByText('≥'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.clear(inputField);
      await userEvent.type(inputField, '30');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'John Doe',
        'Emily Johnson',
        'Michael Brown',
        'David Wilson',
        'Robert Garcia',
        'Sarah Miller',
        'James Anderson',
      ]);
    });

    await step('Number filtering: less than', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('≥'));
      await userEvent.click(canvas.getByText('<'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.clear(inputField);
      await userEvent.type(inputField, '30');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'Jane Smith',
        'Jessica Davis',
        'Laura Martinez',
      ]);
    });

    await step('Number filtering: less than', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('<'));
      await userEvent.click(canvas.getByText('≤'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.clear(inputField);
      await userEvent.type(inputField, '30');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'John Doe',
        'Jane Smith',
        'Jessica Davis',
        'Laura Martinez',
      ]);
    });

    await step('Number filtering: is between', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('≤'));
      await userEvent.click(canvas.getByText('is between'));

      const startField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"][data-filter-control-side="start"]',
      ) as HTMLElement;
      await userEvent.clear(startField);
      await userEvent.type(startField, '28');

      const endField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"][data-filter-control-side="end"]',
      ) as HTMLElement;
      await userEvent.clear(endField);
      await userEvent.type(endField, '35');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'John Doe',
        'Emily Johnson',
        'Jessica Davis',
        'David Wilson',
        'Laura Martinez',
        'Sarah Miller',
      ]);
    });

    await step('Number filtering: not between', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('is between'));
      await userEvent.click(canvas.getByText('is not between'));

      const startField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"][data-filter-control-side="start"]',
      ) as HTMLElement;
      await userEvent.clear(startField);
      await userEvent.type(startField, '28');

      const endField = canvasElement.querySelector(
        '[data-filter-name="age"][data-filter-control="true"][data-filter-control-side="end"]',
      ) as HTMLElement;
      await userEvent.clear(endField);
      await userEvent.type(endField, '35');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'Jane Smith',
        'Michael Brown',
        'Robert Garcia',
        'James Anderson',
      ]);
    });

    await step('String filtering: contains', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByText('Clear'));
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByText('Add filter'));
      await userEvent.click(canvas.getByTitle('Position'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="role"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.type(inputField, 'frontend');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'John Doe',
        'Jane Smith',
        'Laura Martinez',
      ]);
    });

    await step('String filtering: not contains', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('contains'));
      await userEvent.click(canvas.getByText('not contains'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="role"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.clear(inputField);
      await userEvent.type(inputField, 'frontend');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'Emily Johnson',
        'Michael Brown',
        'Jessica Davis',
        'David Wilson',
        'Robert Garcia',
        'Sarah Miller',
        'James Anderson',
      ]);
    });

    await step('String filtering: equals', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('not contains'));
      await userEvent.click(canvas.getByText('equals to'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="role"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.clear(inputField);
      await userEvent.type(inputField, 'backend developer');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'Emily Johnson',
        'Michael Brown',
        'David Wilson',
        'Sarah Miller',
        'James Anderson',
      ]);
    });

    await step('String filtering: not equals', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('equals to'));
      await userEvent.click(canvas.getByText('not equals to'));

      const inputField = canvasElement.querySelector(
        '[data-filter-name="role"][data-filter-control="true"]',
      ) as HTMLElement;
      await userEvent.clear(inputField);
      await userEvent.type(inputField, 'backend developer');

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'John Doe',
        'Jane Smith',
        'Jessica Davis',
        'Laura Martinez',
        'Robert Garcia',
      ]);
    });

    await step('String filtering: empty', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('not equals to'));
      await userEvent.click(canvas.getByText('is empty'));

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([]);
    });

    await step('String filtering: not empty', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByPlaceholderText('is empty'));
      await userEvent.click(canvas.getByText('is not empty'));

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'John Doe',
        'Jane Smith',
        'Emily Johnson',
        'Michael Brown',
        'Jessica Davis',
        'David Wilson',
        'Laura Martinez',
        'Robert Garcia',
        'Sarah Miller',
        'James Anderson',
      ]);
    });

    await step('Array filtering: contains', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByText('Clear'));
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByText('Add filter'));
      await userEvent.click(canvas.getByTitle('Skills'));

      await userEvent.click(canvas.getByPlaceholderText('JavaScript'));
      await userEvent.click(canvas.getByTitle('JavaScript'));
      await userEvent.click(canvas.getByTitle('React'));
      await userEvent.click(canvas.getByTitle('Node.js'));

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'John Doe',
        'Jessica Davis',
        'Laura Martinez',
      ]);
    });

    await step('Array filtering: not contains', async () => {
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByText('Clear'));
      await userEvent.click(canvas.getByTitle('Filters'));
      await userEvent.click(canvas.getByText('Add filter'));
      await userEvent.click(canvas.getByTitle('Skills'));

      await userEvent.click(canvas.getByPlaceholderText('is contained in'));
      await userEvent.click(canvas.getByText('is not contained in'));

      await userEvent.click(canvas.getByPlaceholderText('JavaScript'));
      await userEvent.click(canvas.getByTitle('Spring'));

      await userEvent.click(canvas.getByTitle('Apply'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'Emily Johnson',
        'David Wilson',
        'Sarah Miller',
        'James Anderson',
      ]);
    });

    await step(
      'Need to reset filters after the removing the latest applied filter',
      async () => {
        await userEvent.click(canvas.getByTitle('Filters'));
        await userEvent.click(canvas.getByText('Clear'));
        await userEvent.click(canvas.getByTitle('Filters'));
        await userEvent.click(canvas.getByText('Add filter'));
        await userEvent.click(canvas.getByTitle('Age'));

        await userEvent.click(canvas.getByPlaceholderText('equals to'));
        await userEvent.click(canvas.getByText('≥'));

        const inputField = canvasElement.querySelector(
          '[data-filter-name="age"][data-filter-control="true"]',
        ) as HTMLElement;
        await userEvent.clear(inputField);
        await userEvent.type(inputField, '30');

        await userEvent.click(canvas.getByTitle('Apply'));
        await AsyncUtils.timeout(1);

        await expect(getRows()).toStrictEqual([
          'John Doe',
          'Emily Johnson',
          'Michael Brown',
          'David Wilson',
          'Robert Garcia',
          'Sarah Miller',
          'James Anderson',
        ]);

        await userEvent.click(canvas.getByTitle('Filters'));
        await userEvent.click(canvas.getByPlaceholderText('Age'));
        await userEvent.click(canvas.getByTitle('Salary'));
        await AsyncUtils.timeout(1);

        await expect(getRows()).toStrictEqual([
          'John Doe',
          'Emily Johnson',
          'Michael Brown',
          'David Wilson',
          'Robert Garcia',
          'Sarah Miller',
          'James Anderson',
        ]);

        await userEvent.click(canvas.getAllByText('close')[1]);
        await AsyncUtils.timeout(1);

        await expect(getRows()).toStrictEqual([
          'John Doe',
          'Jane Smith',
          'Emily Johnson',
          'Michael Brown',
          'Jessica Davis',
          'David Wilson',
          'Laura Martinez',
          'Robert Garcia',
          'Sarah Miller',
          'James Anderson',
        ]);
      },
    );

    await step('Sorting', async () => {
      await userEvent.click(canvas.getByText('Clear'));

      await userEvent.click(canvas.getByText('Age'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'Jane Smith',
        'Jessica Davis',
        'Laura Martinez',
        'John Doe',
        'David Wilson',
        'Sarah Miller',
        'Emily Johnson',
        'Robert Garcia',
        'Michael Brown',
        'James Anderson',
      ]);

      await userEvent.click(canvas.getByText('Age'));
      await AsyncUtils.timeout(1);

      await expect(getRows()).toStrictEqual([
        'James Anderson',
        'Michael Brown',
        'Robert Garcia',
        'Emily Johnson',
        'Sarah Miller',
        'David Wilson',
        'John Doe',
        'Laura Martinez',
        'Jessica Davis',
        'Jane Smith',
      ]);
    });
  },
};

export default meta;
