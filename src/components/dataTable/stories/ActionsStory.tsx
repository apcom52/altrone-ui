import { StoryObj } from '@storybook/react';
import { Flex } from '../../flex/index.ts';
import { Text } from '../../text/index.ts';
import { DataTable } from '../DataTable.tsx';
import { EMPLOYEES, EmployeeType } from './EMPLOYEES.ts';
import { Icon } from '../../icon/index.ts';
import { expect, userEvent, within } from '@storybook/test';
import { AsyncUtils } from '../../../utils/index.ts';

export const DataTableWithRowActionsStory: StoryObj<typeof Flex> = {
  name: 'DataTable with row actions',
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
          renderRowActions={({ rowIndex, selected }) => {
            return (
              <DataTable.RowActions>
                <DataTable.RowAction
                  label={`Edit ${rowIndex}`}
                  leftIcon={<Icon i="edit" />}
                  onClick={() => {}}
                />
                <DataTable.RowAction
                  label="Make WOW"
                  leftIcon={<Icon i="email" />}
                  showLabel={false}
                  onClick={() => alert('WOW')}
                />
                {selected ? (
                  <DataTable.RowAction
                    label="Make admin"
                    collapsed
                    leftIcon={<Icon i="campaign" />}
                    onClick={() => {}}
                  />
                ) : null}
                <DataTable.RowAction
                  label="Delete"
                  collapsed
                  leftIcon={<Icon i="delete" />}
                  severity="danger"
                  onClick={() => {}}
                />
              </DataTable.RowActions>
            );
          }}
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
