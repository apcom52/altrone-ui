import { DataTable } from './index';
import { Meta } from '@storybook/react';
import { DataTableStoryDataInterface, DEFAULT_COLUMNS, FILTERS } from './stories/DefaultStory';

export { DefaultDataTableStory, DataTableWithFiltersStory } from './stories';

const KEYS = ['name', 'iso', 'continent', 'capital', 'phone', 'currency'];

const meta: Meta<typeof DataTable<DataTableStoryDataInterface>> = {
  component: DataTable,
  title: 'Data/DataTable',
  tags: ['autodocs'],
  args: {
    columns: DEFAULT_COLUMNS,
    limit: 20,
    searchBy: 'name',
    sortKeys: ['name', 'continent'],
    filters: FILTERS
  },
  argTypes: {
    data: { control: false, description: 'Data set' },
    columns: { control: 'object', description: 'Column configuration' },
    limit: { control: 'number', description: 'Number of rows on the page' },
    searchBy: {
      control: 'select',
      options: KEYS,
      description:
        'Field key to search by. If this prop is set user can see search field in the header'
    },
    sortKeys: {
      control: 'check',
      options: KEYS,
      defaultValue: 'name',
      description:
        'Field keys to sort by. If this prop is set user can see "Sort" button in the header'
    },
    sortFunc: { description: 'Custom sort function for complicated dataset' },
    searchFunc: { description: 'Custom search function for complicated dataset' },
    filters: {
      control: 'object',
      description: 'Set of filters. If this prop is set user can see "Filters" button in the header'
    },
    mobileColumns: {
      control: 'check',
      options: KEYS,
      description:
        'With this property you can set visible columns on mobile devices. By default you can see only the first column. Rest of them user can open only by clicking on "..." button. '
    },
    striped: {
      control: 'select',
      options: ['-', 'odd', 'even'],
      description: 'This property set background for odd or even rows of the table'
    },
    selectable: {
      control: 'boolean',
      defaultValue: false,
      description: 'Add special button in the header which activates selection mode'
    },
    DataTableStatusComponent: { description: 'Custom status bar' },
    className: { control: 'text', description: 'Custom CSS class' }
  }
};

export default meta;
