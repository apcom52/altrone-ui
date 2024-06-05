import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, TextHeadingRoles } from 'components';
import { Direction, Gap } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Progress } from './Progress.tsx';

const story: Meta<typeof Progress> = {
  title: 'Components/Indicators/Progress',
  component: Progress,
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
  name: 'Using Flex',
  render: (args) => (
    <Flex {...args} gap={Gap.large}>
      <Text.Heading role={TextHeadingRoles.inner}>
        Standard Progress bars
      </Text.Heading>
      <Flex direction={Direction.horizontal} gap={Gap.large}>
        <Progress value={8} max={100} />
        <Progress value={63} max={100}>
          Charisma
        </Progress>
        <Progress value={100} max={100}>
          {({ value, max }) => (
            <span>
              {value} of {max}
            </span>
          )}
        </Progress>
      </Flex>
    </Flex>
  ),
};

export default story;
