import { StoryObj } from '@storybook/react';
import { ScrollableSelector } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';

export const CustomScrollableSelector: StoryObj<typeof ScrollableSelector<number>> = {
  name: 'Custom Scrollable Selector',
  storyName: 'Custom Scrollable Selector',
  render: ({ ...args }) => {
    const [value, setValue] = useState(0);

    return (
      <ScrollableSelector<number>
        {...args}
        value={value}
        onChange={setValue}
        ScrollableSelectorOptionComponent={({ option, checked, onChange }) => (
          <div onClick={() => onChange(option.value)}>
            {checked ? <strong>{option.label}</strong> : <div>{option.label}</div>}
          </div>
        )}
      />
    );
  },
  decorators: [StorybookDecorator]
};
