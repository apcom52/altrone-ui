import { FilePicker, FilePickerVariant } from '../index';
import { useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { StoryObj } from '@storybook/react';

export const DefaultFilePicker: StoryObj<typeof FilePicker> = {
  name: 'Default FilePicker',
  render: ({ ...args }) => {
    const [value, setValue] = useState<File | File[]>();

    return (
      <StorybookPlayground>
        <FilePicker
          {...args}
          value={value}
          onChange={setValue}
          variant={FilePickerVariant.default}
        />
      </StorybookPlayground>
    );
  }
};
