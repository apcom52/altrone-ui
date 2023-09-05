import { FileItem, FilePicker, FilePickerVariant } from '../index';
import { useCallback, useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { StoryObj } from '@storybook/react';
import { UploadedFile } from '../FilePicker.types';

export const DefaultFilePicker: StoryObj<typeof FilePicker> = {
  name: 'Default FilePicker',
  render: ({ ...args }) => {
    return (
      <StorybookPlayground showBackground>
        <FilePicker
          {...args}
          defaultValue={[
            {
              filename: 'mojave-wallaper.jpg',
              src: 'https://cdn.osxdaily.com/wp-content/uploads/2018/06/macos-mojave-night-wallpaper-r-610x343.jpg'
            },
            {
              filename: 'receipt.pdf',
              src: 'http://example.com'
            },
            {
              filename: 'song-with-a-very-very-very-long-name.mp3',
              src: 'http://example.com'
            }
          ]}
          variant={FilePickerVariant.default}
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
