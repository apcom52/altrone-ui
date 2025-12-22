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
        <Text size={5} weight="bold" block>
          Vertical Divider
        </Text>
        <Flex direction="horizontal" gap="m">
          <Button label="Test A" />
          <Button label="Test B" />
          <Divider direction="vertical" />
          <Button label="Test C" />
        </Flex>
        <Text size={5} weight="bold" block>
          Horizontal Divider
        </Text>
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
