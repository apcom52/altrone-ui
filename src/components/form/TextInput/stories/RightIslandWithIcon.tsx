import { ComponentStory } from '@storybook/react';
import { TextInput } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../typography';

const RightIslandWithIcon: ComponentStory<typeof TextInput> = ({ value, onChange, ...args }) => {
  const [_value, setValue] = useState('');

  return (
    <StorybookPlayground>
      <TextInput value={_value} onChange={setValue} rightIcon={<Icon i="search" />} {...args} />
    </StorybookPlayground>
  );
};

RightIslandWithIcon.args = {
  loading: false
};

export default RightIslandWithIcon;
