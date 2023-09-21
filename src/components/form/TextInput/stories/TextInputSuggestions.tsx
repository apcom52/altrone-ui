import { ComponentStory } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { default as COUNTRIES } from '../../../data/DataTable/stories/data';
import { Form, FormField, FormGroup } from '../../../containers';
import { Switcher } from '../../Switcher';

const SUGGESTIONS = COUNTRIES.map((country) => country.name);

const TextInputSuggestions: ComponentStory<typeof TextInput> = ({ placeholder = '' }) => {
  const [value, setValue] = useState('');

  return (
    <StorybookPlayground>
      <TextInput
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        suggestions={SUGGESTIONS}
      />
    </StorybookPlayground>
  );
};

TextInputSuggestions.args = {
  placeholder: ''
};

export default TextInputSuggestions;
