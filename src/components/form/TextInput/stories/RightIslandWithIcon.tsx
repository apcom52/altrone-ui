import { ComponentStory } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../icons';

const RightIslandWithIcon: ComponentStory<typeof TextInput> = () => {
  const [value, setValue] = useState('');

  return (
    <StorybookPlayground>
      <TextInput value={value} onChange={setValue} rightIcon={<Icon i="search" />} />
    </StorybookPlayground>
  );
};

export default RightIslandWithIcon;
