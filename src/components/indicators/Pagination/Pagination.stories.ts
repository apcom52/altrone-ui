import { Meta } from '@storybook/react';
import { Pagination } from './index';

export { DefaultPagination } from './stories';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Indicators/Pagination',
  tags: ['autodocs'],
  args: {
    page: 1,
    totalPages: 10,
    useNavigateToPagePopup: true
  },
  argTypes: {
    page: {
      description: 'Current page'
    },
    totalPages: {
      description: 'Total amount of pages'
    },
    useNavigateToPagePopup: {
      description:
        'When this prop is activated pagination component has the ability to move to the specific page'
    },
    onChange: {
      description: 'Callback fires when user changes the current page'
    }
  }
};

export default meta;
