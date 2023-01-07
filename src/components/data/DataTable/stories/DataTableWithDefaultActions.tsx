import { ComponentStory } from '@storybook/react';
import { DataTable, DataTableColumn } from '../index';
import { Altrone } from '../../../../hocs';
import { default as data } from './data';
import { Icon } from '../../../icons';
import { userEvent, within } from '@storybook/testing-library';

const columns: DataTableColumn[] = [
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

export const DataTableWithDefaultActions: ComponentStory<typeof DataTable> = ({}) => {
  return (
    <Altrone style={{ padding: 8 }}>
      <DataTable data={data} columns={columns} sortKeys={['iso', 'name', 'capital']} />
    </Altrone>
  );
};

DataTableWithDefaultActions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const sortButton = await canvas.findByText('Sort');
  await userEvent.click(sortButton);

  const fieldSelect = await canvas.findByText('Select an option');
  await userEvent.click(fieldSelect);

  const nameSelectOption = await canvas.findByTitle('ISO Code');
  await userEvent.click(nameSelectOption);
};
