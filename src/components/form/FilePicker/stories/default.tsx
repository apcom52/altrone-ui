import { ComponentStory } from '@storybook/react';
import { FilePicker } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';

const DefaultSingleFilePicker: ComponentStory<typeof FilePicker> = ({}) => {
  const [value, setValue] = useState<File | File[]>();

  return (
    <StorybookPlayground>
      <FilePicker value={value} onChange={setValue} />
    </StorybookPlayground>
  );
};

DefaultSingleFilePicker.args = {};

export default DefaultSingleFilePicker;
