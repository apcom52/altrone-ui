import { DataTable } from './index';
import { Meta } from '@storybook/react';
import {
  DataTableStoryDataInterface,
  DEFAULT_COLUMNS,
  SELECTABLE_ACTIONS,
  ACTIONS
} from './stories/DefaultStory';

export { DefaultDataTableStory } from './stories/DefaultStory';

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
    actions: ACTIONS,
    selectableActions: SELECTABLE_ACTIONS
  },
  argTypes: {
    data: { control: false },
    columns: { control: 'object' },
    limit: { control: 'number' },
    className: { control: 'text' },
    striped: { control: 'select', options: ['-', 'odd', 'even'] },
    searchBy: { control: 'select', options: KEYS },
    sortKeys: { control: 'check', options: KEYS, defaultValue: 'name', description: 'Keys' },
    mobileColumns: { control: 'check', options: KEYS },
    filters: { control: 'object' },
    actions: { control: 'object' },
    selectable: { control: 'boolean', defaultValue: false },
    selectableActions: { control: 'object', if: { arg: 'selectable' } }
  }
};

export default meta;
