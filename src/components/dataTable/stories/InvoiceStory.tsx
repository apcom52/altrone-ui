import { StoryObj } from '@storybook/react';
import { Flex } from '../../flex';
import { DataTable } from '../DataTable.tsx';
import { INVOICES } from './INVOICES.ts';
import { Configuration } from '../../configuration';

export const InvoiceStory: StoryObj<typeof Flex> = {
  name: 'Invoice Table Example',
  render: () => {
    return (
      <Configuration locale={{ dateFormat: 'DD MMM YYYY' }}>
        <DataTable
          data={INVOICES}
          columns={[
            { accessor: 'description', label: 'Invoice Name' },
            { accessor: 'quantity', type: 'number', label: 'Quantity' },
            {
              accessor: 'price',
              type: 'currency',
              label: 'Amount',
              options: { currencyAccessor: 'currency' },
            },
            { accessor: 'date', type: 'year', label: 'Invoice date' },
            { accessor: 'location', label: 'Location' },
          ]}
        />
      </Configuration>
    );
  },
};
