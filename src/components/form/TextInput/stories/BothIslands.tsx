import { ComponentStory } from '@storybook/react';
import { InputIslandType, TextInput } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../icons';

const BothIslands: ComponentStory<typeof TextInput> = () => {
  const [value, setValue] = useState('');

  return (
    <StorybookPlayground>
      <TextInput
        value={value}
        onChange={setValue}
        leftIsland={{ type: InputIslandType.components, content: <b>{'q>:'}</b> }}
        rightIsland={{
          type: InputIslandType.actions,
          content: [
            {
              title: 'Decrease',
              icon: <Icon i="keyboard_arrow_down" />,
              onClick: () => alert('Decrease clicked')
            },
            {
              title: 'Increase',
              icon: <Icon i="keyboard_arrow_up" />,
              onClick: () => alert('Increase clicked')
            }
          ]
        }}
      />
    </StorybookPlayground>
  );
};

export default BothIslands;
