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
  argTypes: {
    values: { description: 'List of selected chips' },
    options: { description: 'List of chips' },
    multiple: { description: 'Allows to select some chips' },
    onChange: { description: 'Callback is called when user toggles the chip' },
    SelectedIcon: { control: 'none', description: 'Custom icon of selected chip' },
    direction: { control: 'select', description: 'Direction of the list' },
    size: { control: 'select', description: 'Size of the chips' }
  }
};

export default meta;
