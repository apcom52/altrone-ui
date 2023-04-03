import { ComponentStory } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';

const TextInputSuggestions: ComponentStory<typeof TextInput> = ({ placeholder = '' }) => {
  const [value, setValue] = useState('');

  return (
    <StorybookPlayground>
      <TextInput value={value} onChange={setValue} placeholder={placeholder} />
    </StorybookPlayground>
  );
};

TextInputSuggestions.args = {
  placeholder: ''
};

export default TextInputSuggestions;
