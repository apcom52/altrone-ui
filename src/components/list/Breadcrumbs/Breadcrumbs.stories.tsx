import { Meta } from '@storybook/react';
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
        href: '#dashboard'
      },
      {
        title: 'Invoices',
        href: '#invoices'
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
