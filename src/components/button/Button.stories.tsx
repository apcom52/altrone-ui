import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon } from 'components';
import { Align, Gap } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
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

export const ButtonStory: StoryObj<typeof Flex> = {
  name: 'Using Buttons',
  render: () => (
    <Flex gap={Gap.medium} align={Align.start}>
      <Button label="Action" leftIcon={<Icon i="bolt" />} />
      <Button label="Action" rightIcon={<Icon i="bolt" />} />
      <Button label="Action" />
      <Button disabled label="Disabled Action" />
      <Button label="Action" transparent leftIcon={<Icon i="bolt" />} />
      <Button label="Action" transparent rightIcon={<Icon i="bolt" />} />
      <Button label="Action" transparent />
      <Button disabled label="Disabled Action" transparent />
    </Flex>
  ),
};

export default story;
