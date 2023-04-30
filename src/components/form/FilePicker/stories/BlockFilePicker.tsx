import { FilePicker, FilePickerVariant } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { StoryObj } from '@storybook/react';

export const BlockFilePicker: StoryObj<typeof FilePicker> = {
  name: 'Block FilePicker',
  render: ({ ...args }) => {
    const [value, setValue] = useState<File | File[]>();

    console.log('value', value);

    return (
      <StorybookPlayground>
        <FilePicker {...args} value={value} onChange={setValue} variant={FilePickerVariant.block} />
      </StorybookPlayground>
    );
  }
};
