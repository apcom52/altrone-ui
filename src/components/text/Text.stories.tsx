import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from 'global/storybook/StorybookDecorator.tsx';
import { ArticleStory, FormattedArticle, TextFeaturesShowcase } from './stories';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta = {
  title: 'Components/Typography/Text',
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

export const ArticleStoryItem: StoryObj = {
  name: 'Article',
  render: () => <ArticleStory />,
};

export const FormattedArticleStory: StoryObj = {
  name: 'Article with Formatting',
  render: () => <FormattedArticle />,
};

export const TextFeaturesShowcaseStory: StoryObj = {
  name: 'New Features Showcase',
  render: () => <TextFeaturesShowcase />,
};

export default story;
