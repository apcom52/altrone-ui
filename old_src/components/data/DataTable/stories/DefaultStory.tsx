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
          selectableMode ? (
            <DataTable.Action
              icon={<Icon i="delete" />}
              label="Delete"
              onClick={() => {
                alert('Delete');
                console.log('>> selected', selectedItems);
              }}
            />
          ) : (
            <DataTable.Action
              icon={<Icon i="add" />}
              label="Add"
              disabled={selectableMode}
              onClick={() => alert('on add clicked')}
            />
          )
        ]}
      </DataTable>
    );
  },
  decorators: [StorybookDecorator]
};
