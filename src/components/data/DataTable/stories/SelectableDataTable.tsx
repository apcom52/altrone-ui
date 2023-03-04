import { ComponentStory } from '@storybook/react';
import { DataTable, DataTableColumn } from '../index';
import { Altrone } from '../../../../hocs';
import { default as data } from './data';
import { Icon } from '../../../icons';
import { Theme } from '../../../../types';

const columns: DataTableColumn[] = [
  {
    accessor: 'iso',
    label: 'ISO Code',
    Component: ({ value }) => (
      <div>
        <code>{value}</code>
      </div>
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
      <div style={{ display: 'flex' }}>
        <Icon i="phone" /> {value}
      </div>
    )
  },
  {
    accessor: 'currency'
  }
];

export const SelectableDataTable: ComponentStory<typeof DataTable & { dark: boolean }> = ({
  striped,
  dark
}) => {
  return (
    <Altrone style={{ padding: 8 }} theme={dark ? Theme.dark : Theme.light}>
      <DataTable data={data} columns={columns} sortKeys={['name']} striped={striped} selectable />
    </Altrone>
  );
};

SelectableDataTable.args = {
  dark: false
};
