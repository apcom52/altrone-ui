import { ComponentStory } from '@storybook/react';
import { DataTable, DataTableColumn } from '../index';
import { Altrone } from '../../../../hocs';
import { default as data } from './data';
import { Icon } from '../../../icons';

export interface DataTableStoryDataInterface {
  name: string;
  iso: string;
  continent: 'AS' | 'EU' | 'NA';
  capital: string;
  phone: string;
  currency: string;
}

const columns: DataTableColumn<DataTableStoryDataInterface>[] = [
  {
    accessor: 'iso',
    label: 'ISO Code',
    Component: ({ value }) => <code>{value}</code>
  },
  {
    accessor: 'name'
  },
  {
    accessor: 'continent',
    visible: false
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

export const DefaultDataTableWithHiddenColumnsStory: ComponentStory<typeof DataTable> = () => {
  return (
    <Altrone style={{ padding: 8 }}>
      <DataTable<DataTableStoryDataInterface> data={data} columns={columns} />
    </Altrone>
  );
};
