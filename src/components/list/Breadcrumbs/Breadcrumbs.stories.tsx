import { Meta } from '@storybook/react';
import { Icon } from '../../icons';
import { Breadcrumbs } from './index';

export { DefaultBreadcrumbs } from './stories';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  title: 'Lists/Breadcrumbs',
  tags: ['autodocs'],
  args: {
    links: [
      {
        title: 'Dashboard',
        href: 'https://google.com'
      },
      {
        title: 'Invoices',
        icon: <Icon i="request_quote" />,
        onClick: () => alert('invoices')
      },
      {
        title: '#1309',
        href: '#1309'
      }
    ]
  },
  argTypes: {}
};

export default meta;
