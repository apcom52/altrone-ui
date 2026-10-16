import { Meta, StoryObj } from '@storybook/react';
import { Download, Mail, Pencil, RefreshCw } from 'lucide-react';
import { DataTable } from './index';
import { Toolbar } from '../toolbar';
import { Flex } from '../flex';
import { Avatar } from '../avatar';
import { Label } from '../label';
import { Text } from '../text';
import { StorybookDecorator } from '../../global/storybook';
import type { DataTableColumn } from './DataTable.types';

const meta: Meta<typeof DataTable<Account>> = {
  component: DataTable,
  title: 'Marketing/DataTable banner',
  decorators: [StorybookDecorator],
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof meta>;

type AccountStatus = 'Active' | 'Trial' | 'Past due' | 'Churned';

interface Account {
  id: number;
  customer: string;
  plan: string;
  status: AccountStatus;
  region: string;
  revenue: number;
  currency: string;
  renewsAt: string;
}

const ACCOUNTS: Account[] = [
  {
    id: 1,
    customer: 'Mira Okafor',
    plan: 'Enterprise',
    status: 'Active',
    region: 'Europe',
    revenue: 48_200,
    currency: 'USD',
    renewsAt: '2027-02-14',
  },
  {
    id: 2,
    customer: 'Lucas Ferreira',
    plan: 'Business',
    status: 'Active',
    region: 'South America',
    revenue: 21_750,
    currency: 'USD',
    renewsAt: '2027-01-08',
  },
  {
    id: 3,
    customer: 'Hana Takahashi',
    plan: 'Enterprise',
    status: 'Active',
    region: 'Asia Pacific',
    revenue: 39_900,
    currency: 'USD',
    renewsAt: '2026-12-21',
  },
  {
    id: 4,
    customer: 'Oliver Bennett',
    plan: 'Starter',
    status: 'Trial',
    region: 'North America',
    revenue: 0,
    currency: 'USD',
    renewsAt: '2026-11-02',
  },
  {
    id: 5,
    customer: 'Amara Diallo',
    plan: 'Business',
    status: 'Past due',
    region: 'Africa',
    revenue: 17_400,
    currency: 'USD',
    renewsAt: '2026-10-29',
  },
  {
    id: 6,
    customer: 'Sofia Rossi',
    plan: 'Business',
    status: 'Active',
    region: 'Europe',
    revenue: 26_300,
    currency: 'USD',
    renewsAt: '2027-03-17',
  },
  {
    id: 7,
    customer: 'Noah Kim',
    plan: 'Starter',
    status: 'Churned',
    region: 'North America',
    revenue: 4_800,
    currency: 'USD',
    renewsAt: '2026-09-30',
  },
  {
    id: 8,
    customer: 'Elena Petrova',
    plan: 'Enterprise',
    status: 'Active',
    region: 'Europe',
    revenue: 52_600,
    currency: 'USD',
    renewsAt: '2027-04-05',
  },
  {
    id: 9,
    customer: 'Daniel Okoye',
    plan: 'Starter',
    status: 'Trial',
    region: 'Africa',
    revenue: 0,
    currency: 'USD',
    renewsAt: '2026-11-19',
  },
];

const STATUS_COLOR = {
  Active: 'success',
  Trial: 'blue',
  'Past due': 'warning',
  Churned: 'danger',
} as const;

const COLUMNS: DataTableColumn<Account>[] = [
  {
    accessor: 'customer',
    label: 'Customer',
    type: 'custom',
    sortable: true,
    filterable: 'string',
    width: 220,
    options: {
      renderReadMode: ({ value }) => {
        const [firstName, lastName] = String(value).split(' ');

        return (
          <Flex align="center" gap="m">
            <Avatar firstName={firstName} lastName={lastName} size="s" />
            <Text weight="medium">{String(value)}</Text>
          </Flex>
        );
      },
    },
  },
  {
    accessor: 'plan',
    label: 'Plan',
    type: 'select',
    sortable: true,
    filterable: true,
    width: 130,
  },
  {
    accessor: 'status',
    label: 'Status',
    type: 'custom',
    sortable: true,
    filterable: 'select',
    width: 140,
    options: {
      renderReadMode: ({ value }) => (
        <Label
          variant="status"
          shape="pill"
          color={STATUS_COLOR[value as AccountStatus]}
        >
          {String(value)}
        </Label>
      ),
    },
  },
  {
    accessor: 'region',
    label: 'Region',
    type: 'select',
    filterable: true,
    width: 160,
  },
  {
    accessor: 'revenue',
    label: 'Annual revenue',
    type: 'currency',
    sortable: true,
    filterable: true,
    width: 150,
    options: { currencyAccessor: 'currency' },
  },
  {
    accessor: 'renewsAt',
    label: 'Renews',
    type: 'date',
    sortable: true,
    filterable: true,
    width: 180,
  },
];

export const Banner: Story = {
  render: () => (
    <Flex
      orientation="vertical"
      style={{ width: 1280, padding: 48, boxSizing: 'border-box' }}
    >
      <DataTable<Account>
        data={ACCOUNTS}
        columns={COLUMNS}
        getRowId={(account) => String(account.id)}
        rowsPerPage={9}
        selectable
        defaultSort={{ field: 'revenue', direction: 'desc' }}
        actions={
          <Toolbar.Group>
            <DataTable.Action
              label="Export"
              icon={<Download />}
              showLabel={false}
              onClick={() => undefined}
            />
            <DataTable.Action
              label="Refresh"
              icon={<RefreshCw />}
              showLabel={false}
              onClick={() => undefined}
            />
          </Toolbar.Group>
        }
        rowActions={[
          <DataTable.RowAction
            key="edit"
            label="Edit"
            icon={<Pencil />}
            showLabel={false}
            onClick={() => undefined}
          />,
          <DataTable.RowAction
            key="mail"
            label="Email"
            icon={<Mail />}
            showLabel={false}
            onClick={() => undefined}
          />,
        ]}
      />
    </Flex>
  ),
};
