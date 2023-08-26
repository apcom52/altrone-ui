import { FilePicker } from '../index';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { StoryObj } from '@storybook/react';
import { FileIcon } from '../FileIcon';

export const FileIconStory: StoryObj<typeof FilePicker> = {
  name: 'FileIcon',
  render: ({ ...args }) => {
    return (
      <StorybookPlayground>
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            padding: 20
          }}>
          <FileIcon>.jpg</FileIcon>
          <FileIcon>.psd</FileIcon>
          <FileIcon>.xlsx</FileIcon>
          <FileIcon>.xml</FileIcon>
          <FileIcon>.code</FileIcon>
        </div>
      </StorybookPlayground>
    );
  }
};
