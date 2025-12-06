import { StoryObj } from '@storybook/react';
import { Flex } from '../../flex/index.ts';
import { Text } from '../../text/index.ts';
import { DataTable } from '../DataTable.tsx';
import { EMPLOYEES, EmployeeType } from './EMPLOYEES.ts';
import { Flame } from 'lucide-react';

export const DataTableWithRowActionsStory: StoryObj<typeof Flex> = {
  name: 'DataTable with row actions',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text block size={5} weight="bold">
          DataTable with filtering and sorting
        </Text>
        <DataTable
          data={EMPLOYEES}
          rowsPerPage={20}
          selectable
          renderRowActions={({ rowIndex, selected, ...rest }) => {
            console.log('rest', rest, rowIndex, selected);
            return (
              <DataTable.RowActions>
                <DataTable.RowAction
                  label={`Edit ${rowIndex}`}
                  onClick={() => {}}
                />
                <DataTable.RowAction
                  label="Make WOW"
                  collapsed
                  showLabel={false}
                  onClick={() => alert('WOW')}
                  icon={<Flame />}
                />
                {selected ? (
                  <DataTable.RowAction
                    label="Make admin"
                    collapsed
                    onClick={() => {}}
                  />
                ) : null}
                <DataTable.RowAction
                  label="Delete"
                  collapsed
                  danger
                  onClick={() => {}}
                />
              </DataTable.RowActions>
            );
          }}
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
              type: 'string',
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              filterable: true,
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
        />
      </Flex>
    );
  },
};
