import { StoryObj } from '@storybook/react';
import { DataTable, DataTableAction, DataTableColumn } from '../index';
import { default as tableData } from './data';
import { Icon } from '../../../typography';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { DataTableSelectableAction } from '../DataTable';
import { DataTableFilter } from '../../../../contexts';

export interface DataTableStoryDataInterface {
  name: string;
  iso: string;
  continent: string;
  capital: string;
  phone: string;
  currency: string;
  isEU?: boolean;
}

export const DEFAULT_COLUMNS: DataTableColumn<DataTableStoryDataInterface>[] = [
  {
    accessor: 'iso',
    label: 'ISO Code',
    Component: (args) => <code>{String(args.value)}</code>
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
    Component: (args) => (
      <div style={{ display: 'flex' }}>
        <>
          <Icon i="phone" /> {String(args.value)}
        </>
      </div>
    )
  },
  {
    accessor: 'currency'
  },
  {
    accessor: 'isEU'
  }
];

export const ACTIONS: DataTableAction[] = [
  {
    label: 'Add',
    icon: <Icon i="add" />,
    onClick: () => alert('Add action clicked')
  }
];

export const SELECTABLE_ACTIONS: DataTableSelectableAction<DataTableStoryDataInterface>[] = [
  {
    label: 'Menu',
    icon: <Icon i="menu" />,
    contextMenu: [
      {
        title: 'Action',
        onClick: (selectedData) => console.log(selectedData)
      }
    ]
  },
  {
    label: 'Delete',
    icon: <Icon i="delete" />,
    onClick: (selectableRows) => console.log('edit click', selectableRows),
    danger: true
  },
  {
    label: 'Details',
    icon: <Icon i="info" />,
    content: ({ selectedRows }) => (
      <ul>
        {selectedRows?.map((row, rowIndex) => (
          <li key={rowIndex}>{row.name}</li>
        ))}
      </ul>
    )
  }
];

export const FILTERS: DataTableFilter<DataTableStoryDataInterface>[] = [
  {
    type: 'checkbox',
    accessor: 'isEU',
    defaultValue: false
  }
];

export const DefaultDataTableStory: StoryObj<typeof DataTable> = {
  storyName: 'Default DataTable',
  render: ({ data, columns, searchFunc, sortFunc, DataTableStatusComponent, ...args }) => {
    return <DataTable<DataTableStoryDataInterface> data={tableData} columns={columns} {...args} />;
  },
  decorators: [StorybookDecorator]
};
