import { ComponentStory } from '@storybook/react';
import { DataTable, DataTableColumn } from '../index';
import { Altrone } from '../../../../hocs';
import { default as data } from './data';
import { Icon } from '../../../icons';

const columns: DataTableColumn[] = [
  {
    accessor: 'iso',
    label: 'ISO Code',
    Component: ({ value }) => <code>{value}</code>
  },
  {
    accessor: 'name'
  },
  {
    accessor: 'continent'
  },
  {
    accessor: 'capital'
  },
  {
    accessor: 'phone',
    label: 'Phone code',
    Component: ({ value }) => (
      <div style={{ display: 'flex' }}>
        <Icon i="phone" /> {value}
      </div>
    )
  },
  {
    accessor: 'currency'
  }
];

export const DataTableWithDefaultActions: ComponentStory<typeof DataTable> = ({ striped }) => {
  return (
    <Altrone style={{ padding: 8 }}>
      <DataTable
        data={data}
        columns={columns}
        sortKeys={['iso', 'name', 'capital']}
        striped={striped}
      />
    </Altrone>
  );
};
