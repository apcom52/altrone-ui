import { StoryObj } from '@storybook/react';
import { CheckboxList } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';
import { Checkbox } from '../../Checkbox';

export const DefaultCheckboxListStory: StoryObj<typeof CheckboxList> = {
  name: 'Default CheckboxList',
  storyName: 'Default CheckboxList',
  render: ({ ...args }) => {
    const [value1, setValue1] = useState(false);
    const [value2, setValue2] = useState(false);
    const [value3, setValue3] = useState(false);
    const [value4, setValue4] = useState(false);
    const [value5, setValue5] = useState(false);
    const [value6, setValue6] = useState(false);

    return (
      <CheckboxList {...args}>
        <Checkbox checked={value1} onChange={setValue1}>
          Russia
        </Checkbox>
        <Checkbox checked={value2} onChange={setValue2}>
          China
        </Checkbox>
        <Checkbox checked={value3} onChange={setValue3}>
          France
        </Checkbox>
        <Checkbox checked={value4} onChange={setValue4}>
          The United Kingdom
        </Checkbox>
        <Checkbox checked={value5} onChange={setValue5}>
          The United States
        </Checkbox>
        <Checkbox checked={value6} onChange={setValue6}>
          India
        </Checkbox>
      </CheckboxList>
    );
  },
  decorators: [StorybookDecorator]
};
