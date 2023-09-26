import { Meta } from '@storybook/react';
import { Chips } from './index';

export { MultipleChipsStory, SingleChipStory } from './stories';

const meta: Meta<typeof Chips> = {
  component: Chips,
  title: 'Lists/Chips',
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
  argTypes: {}
};

export default meta;
