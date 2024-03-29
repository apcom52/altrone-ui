import { StoryObj } from '@storybook/react';
import { DataTable, DataTableColumn } from '../index';
import { default as tableData } from './data2';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { DataTableFilter } from '../DataTableFilter.types';
import { Picker } from '../../../form';

export interface DataTableStoryDataInterface {
  name: string;
  age: number;
  city: string;
  registrationDate: string;
}

export const DEFAULT_COLUMNS: DataTableColumn<DataTableStoryDataInterface>[] = [
  {
    accessor: 'name'
  },
  {
    accessor: 'age'
  },
  {
    accessor: 'city'
  },
  {
    accessor: 'registrationDate'
  }
];

export const FILTERS: DataTableFilter<DataTableStoryDataInterface>[] = [
  {
    accessor: 'registrationDate',
    type: 'date',
    useRange: false,
    picker: Picker.year,
    label: 'Registration Date'
  }
];

export const DataTableWithFiltersStory: StoryObj<typeof DataTable<DataTableStoryDataInterface>> = {
  storyName: 'DataTable with Filters',
  render: ({ data, columns, searchFunc, sortFunc, DataTableStatusComponent, ...args }) => {
    return (
      <DataTable<DataTableStoryDataInterface>
        {...args}
        data={tableData}
        columns={DEFAULT_COLUMNS}
        filters={FILTERS}
      />
    );
  },
  decorators: [StorybookDecorator]
};
