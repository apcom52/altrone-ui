import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { GlassSurface } from './GlassSurface.tsx';
import { Icon } from 'components/icon/Icon.tsx';

const story: Meta<typeof GlassSurface> = {
  title: 'Components/Containers/GlassSurface',
  component: GlassSurface,
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

export const AvatarStory: StoryObj<typeof Flex> = {
  name: 'Using Glass Surface',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Using glass surfaces</Text.Heading>
        <Flex gap="m">
          <GlassSurface glow style={{ width: '400px', height: '300px' }}>
            <Flex gap="m">
              <Icon i="face" />
              <Text.Paragraph>Heart</Text.Paragraph>
            </Flex>
          </GlassSurface>
        </Flex>
      </Flex>
    );
  },
};

export default story;
