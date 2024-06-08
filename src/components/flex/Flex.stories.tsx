import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import {
  alignStoryField,
  directionStoryField,
  gapStoryField,
  StorybookDecorator,
} from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta<typeof Flex> = {
  title: 'Components/Containers/Flex',
  component: Flex,
  decorators: [StorybookDecorator],
  args: {
    align: 'start',
    justify: 'start',
    direction: 'vertical',
    gap: 'large',
    disableInnerMargins: true,
  },
  argTypes: {
    align: alignStoryField,
    justify: alignStoryField,
    gap: gapStoryField,
    direction: directionStoryField,
    disableInnerMargins: { control: 'boolean' },
  },
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export const FlexLayout: StoryObj<typeof Flex> = {
  name: 'Using Flex',
  render: (args) => (
    <Flex {...args}>
      <Text.Heading>
        The Guardian Tree: Elara's Journey of Discovery
      </Text.Heading>
      <Text.Paragraph>
        Once upon a time, in a quaint village nestled between rolling hills and
        dense forests, there lived a young girl named Elara. Elara was known for
        her boundless curiosity and adventurous spirit. Every day after
        completing her chores, she would wander into the woods, eager to explore
        the mysteries that lay beyond the village's borders. Her parents, though
        worried for her safety, admired her bravery and encouraged her to follow
        her heart.
      </Text.Paragraph>
      <Text.Paragraph>
        One crisp autumn morning, as the leaves painted the forest floor with
        hues of gold and crimson, Elara stumbled upon an ancient, overgrown path
        obscured by vines and brambles. Ignoring the warnings echoing in her
        mind, she ventured forth, driven by an insatiable desire for discovery.
        The path led her deeper into the woods, where sunlight filtered through
        the canopy above, casting enchanting patterns on the forest floor.
      </Text.Paragraph>
      <Text.Paragraph>
        As she delved deeper into the heart of the forest, Elara stumbled upon a
        hidden glade, bathed in ethereal light. In the center stood a
        magnificent tree, its branches reaching skyward like outstretched arms.
        Mesmerized, Elara approached the tree and reached out to touch its
        gnarled trunk. Suddenly, a soft whisper filled the air, and the tree
        began to shimmer, revealing itself to be a guardian of ancient wisdom.
      </Text.Paragraph>
      <Text.Paragraph>
        For hours, Elara listened enraptured as the guardian tree imparted tales
        of forgotten lands, mythical creatures, and lost civilizations. With
        each story, Elara's thirst for knowledge grew, and she realized that her
        adventures had only just begun. As the sun dipped below the horizon,
        painting the sky in shades of orange and pink, Elara bid farewell to the
        guardian tree, knowing that she would return to the forest, eager to
        uncover its many secrets. And so, with newfound determination and wisdom
        in her heart, Elara embarked on a journey that would change her life
        forever.
      </Text.Paragraph>
      <Text.Paragraph size="s">This story was generated by AI.</Text.Paragraph>
    </Flex>
  ),
};

export default story;
