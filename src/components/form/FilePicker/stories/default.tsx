import { ComponentStory } from '@storybook/react';
import { FilePicker } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';

const DefaultSingleFilePicker: ComponentStory<typeof FilePicker> = (args) => {
  const [value, setValue] = useState<File | File[]>();

  return (
    <StorybookPlayground>
      <FilePicker value={value} onChange={setValue} {...args} />
    </StorybookPlayground>
  );
};

DefaultSingleFilePicker.argTypes = {
  extensions: {
    control: 'select',
    options: ['none', 'text', 'image', 'audio', 'video', 'table', 'presentation', 'code', 'archive']
  }
};

export default DefaultSingleFilePicker;
