import { Meta } from '@storybook/react';
import { RadioList } from './index';

export { DefaultRadioListStory } from './stories';

const meta: Meta<typeof RadioList> = {
  component: RadioList,
  title: 'Forms/RadioList',
  tags: ['autodocs'],
  args: {
    options: [
      { label: 'North America', value: 'NA' },
      { label: 'South America', value: 'SA' },
      { label: 'Europe', value: 'EU' },
      { label: 'Asia', value: 'AS' },
      { label: 'Africa', value: 'AF' },
      { label: 'Australia', value: 'AU' }
    ]
  },
  argTypes: {
    name: { description: 'Name of the group' },
    options: { description: 'List of the possible options' },
    value: { description: 'Selected option' },
    onChange: { description: 'Callback is called when user chooses another option' },
    direction: { description: 'Direction of the list' },
    disabled: { description: 'Marks the list as disabled' }
  }
};

export default meta;
