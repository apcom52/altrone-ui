import { StoryObj } from '@storybook/react';
import { Flex } from '../../flex';
import { Text } from '../../text';
import { DataTable } from '../DataTable.tsx';
import { EMPLOYEES, EmployeeType } from './EMPLOYEES.ts';
import { Icon } from '../../icon';
import { expect, userEvent, within } from '@storybook/test';
import { AsyncUtils } from '../../../utils';

export const FiltersDataTableStory: StoryObj<typeof Flex> = {
  name: 'e2e tests for filters',
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

    await step(
      'Need to reset filters after the removing the latest applied filter',
      async () => {
        await userEvent.click(canvas.getByTitle('Filters'));
        await userEvent.click(canvas.getByTitle('Add filter'));
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
        await userEvent.click(canvas.getByTitle('Delete'));
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
  },
};
