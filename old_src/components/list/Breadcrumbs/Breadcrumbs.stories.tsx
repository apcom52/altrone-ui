import { Meta } from '@storybook/react';
import { Icon } from '../../typography';
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
      description: 'Array of links'
    },
    showHomeLink: {
      description: 'Show home button'
    },
    collapsible: {
      description:
        'If true it shows only the first and the last links. Rest links are hidden behind "..." '
    },
    disabled: {
      description: 'Marks all links as disabled'
    },
    HomeComponent: {
      description: 'Custom home link'
    },
    onHomeClick: {
      description: 'Callback fires when user clicks on home button'
    },
    homepageHref: {
      description: 'Makes homepage as link with this url'
    },
    className: {
      description: 'Custom css class which applies to wrapper'
    }
  }
};

export default meta;
