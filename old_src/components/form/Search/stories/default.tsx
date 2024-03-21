import { ComponentStory } from '@storybook/react';
import { Search } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';

const DefaultSearchStory: ComponentStory<typeof Search> = (props) => {
  const [value, setValue] = useState('');

  return (
    <StorybookPlayground>
      <Search {...props} value={value} onChange={setValue} />
    </StorybookPlayground>
  );
};

DefaultSearchStory.args = {
  placeholder: ''
};

export default DefaultSearchStory;
