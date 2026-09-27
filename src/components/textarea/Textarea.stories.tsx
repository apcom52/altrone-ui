import { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Announcement, CommentComposer, ProfileBio, SnippetEditor } from './stories';

const story: Meta<typeof TextArea> = {
  title: 'Components/Controls/TextArea',
  component: TextArea,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const WritingAComment: StoryObj = {
  name: 'Writing a comment',
  render: () => <CommentComposer />,
};

export const ProfileBioStory: StoryObj = {
  name: 'A profile field, edited in place',
  render: () => <ProfileBio />,
};

export const SnippetEditorStory: StoryObj = {
  name: 'Paste a config',
  render: () => <SnippetEditor />,
};

export const AnnouncementStory: StoryObj = {
  name: 'Compose & preview',
  render: () => <Announcement />,
};

export default story;
