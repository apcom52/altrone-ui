import { StoryObj } from '@storybook/react';
import { DataTable, DataTableColumn } from '../index';
import { Altrone } from '../../../../hocs';
import { default as tableData } from './data';
import { Icon } from '../../../icons';

export interface DataTableStoryDataInterface {
  name: string;
  iso: string;
  continent: string;
  capital: string;
  phone: string;
  currency: string;
}

export const defaultColumns: DataTableColumn<DataTableStoryDataInterface>[] = [
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
        <>
          <Icon i="phone" /> {value}
        </>
      </div>
    )
  },
  {
    accessor: 'currency'
  }
];

export const DefaultDataTableStory: StoryObj<typeof DataTable> = {
  render: ({
    data,
    columns = defaultColumns,
    searchFunc,
    sortFunc,
    DataTableStatusComponent,
    ...args
  }) => {
    return (
      <Altrone style={{ padding: 8 }}>
        <DataTable<DataTableStoryDataInterface> data={tableData} columns={columns} {...args} />
      </Altrone>
    );
  }
};
