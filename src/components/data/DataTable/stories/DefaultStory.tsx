import { StoryObj } from '@storybook/react';
import { DataTable, DataTableColumn } from '../index';
import { default as tableData } from './data';
import { Icon } from '../../../typography';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { DataTableFilter } from '../DataTableFilter.types';
import { DataTableCellProps } from '../DataTableCell';
import React from 'react';

export interface DataTableStoryDataInterface {
  name: string;
  iso: string;
  continent: string;
  capital: string;
  phone: string;
  currency: string;
  isEU?: boolean;
}

const IsoCodeComponent: React.FC<DataTableCellProps<DataTableStoryDataInterface>> = ({ value }) => {
  return <code>{String(value)}</code>;
};

const PhoneComponent: React.FC<DataTableCellProps<DataTableStoryDataInterface>> = ({ value }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Icon i="phone" /> {String(value)}
    </div>
  );
};

export const DEFAULT_COLUMNS: DataTableColumn<DataTableStoryDataInterface>[] = [
  {
    accessor: 'iso',
    label: 'ISO Code',
    Component: IsoCodeComponent
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
    Component: PhoneComponent
  },
  {
    accessor: 'currency'
  },
  {
    accessor: 'isEU',
    label: 'in EU',
    Component: ({ value }) => {
      return value ? <Icon i="check" /> : null;
    }
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
  },
  {
    type: 'select',
    accessor: 'continent',
    defaultValue: false
  }
];

export const DefaultDataTableStory: StoryObj<typeof DataTable<DataTableStoryDataInterface>> = {
  storyName: 'Default DataTable',
  render: ({ data, columns, searchFunc, sortFunc, DataTableStatusComponent, ...args }) => {
    return (
      <DataTable<DataTableStoryDataInterface>
        data={tableData}
        columns={DEFAULT_COLUMNS}
        {...args}
        selectable={true}>
        {({ selectableMode, selectedItems }) => [
          <DataTable.Action
            icon={<Icon i="add" />}
            label="Add"
            disabled={selectableMode}
            onClick={() => alert('on add clicked')}
          />,
          selectableMode ? (
            <DataTable.Action
              icon={<Icon i="delete" />}
              label="Delete"
              onClick={() => {
                alert('Delete');
                console.log('>> selected', selectedItems);
              }}
            />
          ) : null
        ]}
      </DataTable>
    );
  },
  decorators: [StorybookDecorator]
};
