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
    ],
    collapsible: false,
    disabled: false,
    showHomeLink: true
  },
  argTypes: {
    links: {
      description: 'The list of the links'
    },
    collapsible: {
      description:
        'When the list is collapsed, the inner items of the list are collapsed into context menu'
    },
    disabled: {
      description: 'When the list is disabled all items of the list are not clickable'
    },
    showHomeLink: {
      description: 'Use this property to show "Home" item'
    },
    className: {
      description: 'Custom css class which applies to wrapper'
    },
    HomeComponent: {
      description: 'Custom implementation of "Home" item'
    },
    onHomeClick: {
      description: 'Callback fires each time when user clicks on "Home" item'
    }
  }
};

export default meta;
