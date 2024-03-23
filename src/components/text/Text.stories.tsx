import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from 'global/storybook/StorybookDecorator.tsx';

import { ArticleStory, FormattedArticle } from './stories';

const story: Meta = {
  title: 'Typography/Text',
  decorators: [StorybookDecorator],
};

export const ArticleStoryItem: StoryObj = {
  name: 'Article',
  render: () => <ArticleStory />,
};

export const FormattedArticleStory: StoryObj = {
  name: 'Article with Formatting',
  render: () => <FormattedArticle />,
};

export default story;
