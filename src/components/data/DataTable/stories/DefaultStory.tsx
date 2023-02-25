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

export const DefaultDataTableStory: ComponentStory<typeof DataTable> = () => {
  return (
    <Altrone style={{ padding: 8 }}>
      <DataTable<DataTableStoryDataInterface> data={data} columns={columns} />
    </Altrone>
  );
};

DefaultDataTableStory.argTypes = [
  {
    striped: {
      control: 'select',
      options: [undefined, 'odd', 'even']
    }
  }
];