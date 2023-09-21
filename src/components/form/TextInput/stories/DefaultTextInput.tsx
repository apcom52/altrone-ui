import { ComponentStory } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';

const DefaultTextInputStory: ComponentStory<typeof TextInput> = ({
  placeholder = '',
  value,
  onChange,
  ...args
}) => {
  const [_value, setValue] = useState('');

  return (
    <StorybookPlayground>
      <TextInput value={_value} onChange={setValue} placeholder={placeholder} {...args} />
    </StorybookPlayground>
  );
};

DefaultTextInputStory.args = {
  placeholder: '',
  loading: false
};

export default DefaultTextInputStory;
