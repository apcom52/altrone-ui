import { StoryObj } from '@storybook/react';
import { Flex } from '../../flex';
import { DataTable } from '../DataTable.tsx';
import { INVOICES2 } from './INVOICES.ts';

export const InvoicesWithStatusesStory: StoryObj<typeof Flex> = {
  name: 'Invoice Table Example',
  render: () => {
    return (
      <DataTable
        data={INVOICES2}
        columns={[
          {
            accessor: 'date',
            label: 'Invoice date',
            type: 'date',
            filterable: true,
          },
          {
            accessor: 'amount',
            label: 'Amount',
            type: 'currency',
            filterable: true,
          },
          {
            accessor: 'users',
            label: 'Users',
            type: 'array',
            options: { arrayAccessor: 'name', arrayDelimiter: '; ' },
            filterable: true,
          },
          { accessor: 'tags', label: 'Tags', type: 'array', filterable: true },
          {
            accessor: 'isPaid',
            label: 'Paid',
            type: 'boolean',
            filterable: true,
          },
        ]}
      />
    );
  },
};
