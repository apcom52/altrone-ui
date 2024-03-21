import { FilePicker, FilePickerVariant } from '../index';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { StoryObj } from '@storybook/react';

export const BlockFilePicker: StoryObj<typeof FilePicker> = {
  name: 'Block FilePicker',
  render: ({ ...args }) => {
    return (
      <StorybookPlayground showBackground>
        <FilePicker
          {...args}
          variant={FilePickerVariant.block}
          onSuccess={(response) => {
            console.log('onSuccess', response);
          }}
          onDelete={(response) => {
            console.log('onDelete', response);
          }}
        />
      </StorybookPlayground>
    );
  }
};
