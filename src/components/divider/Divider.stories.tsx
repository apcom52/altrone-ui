import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Divider } from './Divider.tsx';

const story: Meta<typeof Divider> = {
  title: 'Components/Atoms/Divider',
  component: Divider,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export const PaginationStory: StoryObj<typeof Divider> = {
  name: 'Using Divider',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Vertical Divider</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <Button label="Test A" />
          <Button label="Test B" />
          <Divider direction="vertical" />
          <Button label="Test C" />
        </Flex>
        <Text.Heading role="inner">Horizontal Divider</Text.Heading>
        <Flex direction="vertical" gap="m">
          <Button label="Test A" />
          <Button label="Test B" />
          <Divider direction="horizontal" />
          <Button label="Test C" />
        </Flex>
      </Flex>
    );
  },
};

export default story;
