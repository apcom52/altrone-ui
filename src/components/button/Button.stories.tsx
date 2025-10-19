import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import {
  Camera,
  Send,
  Images,
  ChevronDown,
  AArrowDown,
  AArrowUp,
  Phone,
  MessageCircle,
  Delete,
  Check,
  X,
  Heart,
} from 'lucide-react';
// import { fn } from '@storybook/test';
import { ButtonProps } from './Button.types.ts';
import { Role, Size } from '../../types';

const story: Meta<typeof Button> = {
  title: 'Components/Form/Button',
  component: Button,
  decorators: [StorybookDecorator],
  // args: {
  //   onClick: fn(),
  //   onMouseEnter: fn(),
  //   onMouseLeave: fn(),
  //   onFocus: fn(),
  //   onBlur: fn(),
  // },
  argTypes: {},
};

const renderButtonsWithRole = (
  type: ButtonProps['variant'],
  args: ButtonProps
) => {
  return (
    <Flex gap="m" align="start" wrap>
      <Button
        {...args}
        variant={type}
        label="Reset"
        data-testid={`button-${type}`}
      />
      <Button
        {...args}
        variant={type}
        label="Cancel"
        data-testid={`button-${type}`}
        badge="NEW"
      />
      <Button {...args} variant={type} label="Submit" icon={<Send />} />
      <Button {...args} variant={type} label="Take a photo" icon={<Camera />} />
      <Button
        {...args}
        variant={type}
        label="Choose from gallery"
        icon={<Images />}
        badge="2"
      />
      <Button
        {...args}
        variant={type}
        label="More options"
        additionalIcon={<ChevronDown />}
      />
      <Button
        {...args}
        variant={type}
        icon={<Phone />}
        disabled
        label="Call to..."
      />
      <Button
        {...args}
        variant={type}
        disabled
        icon={<MessageCircle />}
        label="Chat with support"
        badge="Not working"
      />
      <Button
        {...args}
        variant={type}
        label="Sort ascending"
        showLabel={false}
        icon={<AArrowUp />}
      />
      <Button
        {...args}
        variant={type}
        label="Sort descending"
        showLabel={false}
        icon={<AArrowDown />}
      />
      <Button
        {...args}
        variant={type}
        label="Close"
        showLabel={false}
        icon={<X />}
      />
      <Button
        {...args}
        variant={type}
        label="Done"
        showLabel={false}
        icon={<Check />}
      />
      <Button
        {...args}
        variant={type}
        label="Delete"
        showLabel={false}
        icon={<Delete />}
        danger
      />
      <Button
        {...args}
        variant={type}
        label="Delete"
        icon={<Delete />}
        danger
      />
      <Button {...args} variant={type} label="Reject" danger />
      <Button {...args} variant={type} disabled label="Pay later" danger />
      <Button {...args} variant={type} label="Pay later" badge="+20%" danger />
      <Button
        {...args}
        variant={type}
        label="Like"
        badge="25k"
        icon={<Heart />}
        additionalIcon={<Heart />}
      />
    </Flex>
  );
};

const renderButtonsWithSize = (size: Size) => {
  return (
    <Flex gap="m" align="start">
      <Button size={size} label="Like" leftIcon={<Icon i="favorite" />} />
      <Button size={size} label="Like" rightIcon={<Icon i="favorite" />} />
      <Button
        size={size}
        label="Like"
        rightIcon={<Icon i="favorite" />}
        loading
      />
      <Button size={size} label="Like" loading />
      <Button size={size} label="Like" />
      <Button
        size={size}
        label="Like"
        showLabel={false}
        leftIcon={<Icon i="favorite" />}
      />
      <Button
        size={size}
        label="Likes"
        leftIcon={<Icon i="favorite" />}
        badge="8"
      />
    </Flex>
  );
};

export const ButtonStory: StoryObj<typeof Button> = {
  name: 'Using Buttons',
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
  render: ({ ...args }) => (
    <Flex direction="vertical" gap="l">
      <Text.Heading role="inner">Default buttons</Text.Heading>
      {renderButtonsWithRole('default', args)}
      <Text.Heading role="inner">Submit buttons</Text.Heading>
      {renderButtonsWithRole('submit', args)}
      <Text.Heading role="inner">Text buttons</Text.Heading>
      {renderButtonsWithRole('text', args)}
      <Text.Heading role="inner">Action buttons</Text.Heading>
      {renderButtonsWithRole('action', args)}
    </Flex>
  ),
};

export const ButtonSizeStory: StoryObj<typeof Button> = {
  name: 'Different sizes of buttons',
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text.Heading role="inner">Small buttons</Text.Heading>
      {renderButtonsWithSize('s')}
      <Text.Heading role="inner">Normal buttons</Text.Heading>
      {renderButtonsWithSize('m')}
      <Text.Heading role="inner">Large buttons</Text.Heading>
      {renderButtonsWithSize('l')}
    </Flex>
  ),
};

export default story;
