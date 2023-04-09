import { ComponentStory } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { default as COUNTRIES } from '../../../data/DataTable/stories/data';
import { Form, FormField, FormGroup } from '../../../containers';
import { Switcher } from '../../Switcher';

const SUGGESTIONS = COUNTRIES.map((country) => country.name);

const TextInputLiveSuggestions: ComponentStory<typeof TextInput> = ({ placeholder = '' }) => {
  const [value, setValue] = useState('');
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  return (
    <StorybookPlayground>
      <Form>
        <FormGroup>
          <FormField>
            <Switcher checked={isLeftActive} onChange={setIsLeftActive}>
              Show left island
            </Switcher>
          </FormField>
          <FormField>
            <Switcher checked={isRightActive} onChange={setIsRightActive}>
              Show right island
            </Switcher>
          </FormField>
        </FormGroup>
      </Form>
      <TextInput
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        suggestions={SUGGESTIONS}
        prefix={isLeftActive ? 'left' : undefined}
        suffix={isRightActive ? 'right' : undefined}
        useLiveSuggestions
      />
    </StorybookPlayground>
  );
};

TextInputLiveSuggestions.args = {
  placeholder: ''
};

export default TextInputLiveSuggestions;
