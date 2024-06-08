import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text, TextHeadingRoles } from '../text';
import { Spoiler } from './Spoiler.tsx';

const story: Meta<typeof Spoiler> = {
  title: 'Components/Container/Spoiler',
  component: Spoiler,
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

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using Spoilers',
  render: () => {
    return (
      <Flex gap="l">
        <Text.Heading role={TextHeadingRoles.inner}>Spoilers</Text.Heading>
        <Flex gap="l">
          <Spoiler title="The Beauty of Nature">
            <Text.Paragraph>
              Nature's beauty is a profound source of inspiration and solace.
              From the majestic mountains standing tall against the sky to the
              serene beaches where the waves kiss the shore, every element of
              nature is a masterpiece. The vibrant colors of a sunset, the
              intricate patterns of leaves, and the gentle rustle of the wind
              through the trees all contribute to the symphony of the natural
              world. The diversity of flora and fauna, each species playing its
              unique role in the ecosystem, showcases the intricate balance and
              interdependence that sustains life. Embracing nature not only
              rejuvenates the soul but also reminds us of the delicate and
              awe-inspiring beauty that surrounds us.
            </Text.Paragraph>
          </Spoiler>
          <Spoiler title="The Magic of Music" openedByDefault={true}>
            <Text.Paragraph>
              Music has an unparalleled ability to evoke emotions and create
              connections across cultures and generations. Its melodies can
              transport us to different times and places, while its rhythms can
              energize or soothe our spirits. Whether it's the harmonious
              strains of a symphony, the raw energy of a rock concert, or the
              heartfelt lyrics of a folk song, music speaks a universal language
              that transcends words. It has the power to unite people, providing
              comfort in times of sorrow and joy in moments of celebration.
              Through music, we find a means to express our deepest feelings,
              share our stories, and connect with others on a profound level.
            </Text.Paragraph>
          </Spoiler>
        </Flex>
      </Flex>
    );
  },
  play: () => {
    // const canvas = within(canvasElement);
  },
};

export default story;
