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
          <FileIcon>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Sonoma_City_Hall.jpg/1200px-Sonoma_City_Hall.jpg"
              alt=""
              className="example-image"
            />
          </FileIcon>
          <FileIcon>.xlsx</FileIcon>
          <FileIcon icon="music_note" />
          <FileIcon>.code</FileIcon>
          <FileIcon>
            <img
              src="https://hips.hearstapps.com/rover/profile_photos/67055711-c808-4a4d-811a-e7155a2bce10_1667409691.file"
              alt=""
              className="example-image"
            />
          </FileIcon>
          <FileIcon>
            <img
              src="https://media.vogue.co.uk/photos/60315dc888f7f3eda2ddfcca/2:3/w_2560%2Cc_limit/PIECES%2520OF%2520A%2520WOMAN%25202.jpg"
              alt=""
              className="example-image"
            />
          </FileIcon>
          <FileIcon icon="description" />
        </div>
      </StorybookPlayground>
    );
  }
};
