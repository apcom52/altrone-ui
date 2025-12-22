import { StoryObj } from '@storybook/react';
import { Flex } from '../../flex';
import { Text } from '../../text';
import { DataTable } from '../DataTable.tsx';
import { EMPLOYEES, EmployeeType } from './EMPLOYEES.ts';
import { Icon } from '../../icon';
// import { expect, userEvent, within } from '@storybook/test';
import { AsyncUtils } from '../../../utils';

export const FiltersDataTableStory: StoryObj<typeof Flex> = {
  name: 'e2e tests for filters',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          DataTable with filtering and sorting
        </Text>
        <DataTable<EmployeeType>
          data={EMPLOYEES}
          rowsPerPage={20}
          selectable
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
              Component: ({ item }) => (
                <Text
                  data-name={`${item.firstName} ${item.lastName}`}
                >{`${item.firstName} ${item.lastName}`}</Text>
              ),
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              filterable: true,
              Component: ({ value }) => (
                <Text size={3} block>
                  {value ? <Icon i="check" /> : <Icon i="close" />}
                </Text>
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
                <Text style={{ width: '100%', textAlign: 'right' }}>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Number(value))}
                </Text>
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
                    <Text code key={skillIndex}>
                      {skill}
                    </Text>
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
