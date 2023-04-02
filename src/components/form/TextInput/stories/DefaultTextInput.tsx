import { ComponentStory } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';

export const DefaultTextInputStory: ComponentStory<typeof TextInput> = () => {
  const [value, setValue] = useState('');

  return (
    <StorybookPlayground>
      <TextInput value={value} onChange={setValue} />
    </StorybookPlayground>
  );
};
