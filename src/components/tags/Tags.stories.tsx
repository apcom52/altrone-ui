import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, TextHeadingRoles } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Tags } from './Tags.tsx';

const story: Meta<typeof Tags> = {
  title: 'Components/Display/Tags',
  component: Tags,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const FlexLayout: StoryObj<typeof Flex> = {
  name: 'Using Tags',
  render: (args) => (
    <Flex {...args} gap="l">
      <Text.Heading role={TextHeadingRoles.inner}>Standard Tags</Text.Heading>
      <Flex direction="horizontal" gap="l">
        <Tags>
          <Tags.Item href="#ai" label="#AI" />
          <Tags.Item href="#technology" label="#Technology" />
          <Tags.Item href="#innovation" label="#Innovation" />
          <Tags.Item href="#ml" label="#MachineLearning" />
          <Tags.Item
            onClick={() => alert('clicked on future tech')}
            label="#FutureTech"
          />
        </Tags>
      </Flex>
    </Flex>
  ),
};

export default story;
