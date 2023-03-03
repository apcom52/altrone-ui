import { ComponentStory } from '@storybook/react';
import { DataTable, DataTableColumn } from '../index';
import { Altrone } from '../../../../hocs';
import { default as data } from './data';
import { Icon } from '../../../icons';

const columns: DataTableColumn[] = [
  {
    accessor: 'iso',
    label: 'ISO Code',
    Component: ({ value }) => (
      <td>
        <code>{value}</code>
      </td>
    )
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
      <td style={{ display: 'flex' }}>
        <Icon i="phone" /> {value}
      </td>
    )
  },
  {
    accessor: 'currency'
  }
];

export const SelectableDataTable: ComponentStory<typeof DataTable> = ({ striped }) => {
  return (
    <Altrone style={{ padding: 8 }}>
      <DataTable data={data} columns={columns} sortKeys={['name']} striped={striped} selectable />
    </Altrone>
  );
};
