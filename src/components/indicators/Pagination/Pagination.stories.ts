import { Meta } from '@storybook/react';
import { Pagination } from './index';

export { DefaultPagination } from './stories';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Indicators/Pagination',
  tags: ['autodocs'],
  args: {},
  argTypes: {}
};

export default meta;
