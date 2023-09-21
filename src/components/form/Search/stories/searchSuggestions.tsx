import { ComponentStory } from '@storybook/react';
import { Search } from '../index';
import { useCallback, useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';

const DefaultSearchStory: ComponentStory<typeof Search> = (props) => {
  const [value, setValue] = useState('');

  const suggestionsCallback = useCallback(async (query: string) => {
    const request = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    const response = await request.json();

    return response.map((item: any) => item.name.common);
  }, []);

  return (
    <StorybookPlayground>
      <Search {...props} value={value} onChange={setValue} suggestions={suggestionsCallback} />
    </StorybookPlayground>
  );
};

DefaultSearchStory.args = {
  placeholder: ''
};

export default DefaultSearchStory;
