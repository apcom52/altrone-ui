import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { fn } from '@storybook/test';
import { ButtonProps } from './Button.types.ts';
import { Role, Size } from '../../types';

const story: Meta<typeof Button> = {
  title: 'Components/Form/Button',
  component: Button,
  decorators: [StorybookDecorator],
  args: {
    onClick: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {},
};

const renderButtonsWithRole = (role: Role, args: ButtonProps) => {
  return (
    <Flex gap="m" align="start">
      <Button
        {...args}
        role={role}
        label="Action"
        leftIcon={<Icon i="bolt" />}
        data-testid={`button-${role}`}
      />
      <Button
        {...args}
        role={role}
        label="Action"
        leftIcon={<Icon i="bolt" />}
        loading
      />
      <Button
        {...args}
        role={role}
        label="Action"
        rightIcon={<Icon i="bolt" />}
      />
      <Button {...args} role={role} label="Action" />
      <Button {...args} role={role} disabled label="Disabled Action" />
      <Button {...args} role={role} leftIcon={<Icon i="bolt" />} />
      <Button {...args} role={role} leftIcon={<Icon i="bolt" />} loading />
      <Button
        {...args}
        role={role}
        label="Action"
        transparent
        leftIcon={<Icon i="bolt" />}
      />
      <Button
        {...args}
        role={role}
        label="Action"
        transparent
        leftIcon={<Icon i="bolt" />}
        loading
      />
      <Button
        {...args}
        role={role}
        label="Action"
        transparent
        rightIcon={<Icon i="bolt" />}
      />
      <Button {...args} role={role} label="Action" transparent />
      <Button
        {...args}
        role={role}
        disabled
        label="Disabled Action"
        transparent
      />
      <Button {...args} role={role} transparent leftIcon={<Icon i="bolt" />} />
      <Button
        {...args}
        role={role}
        transparent
        leftIcon={<Icon i="bolt" />}
        loading
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
      <Text.Heading role="inner">Primary buttons</Text.Heading>
      {renderButtonsWithRole('primary', args)}
      <Text.Heading role="inner">Success buttons</Text.Heading>
      {renderButtonsWithRole('success', args)}
      <Text.Heading role="inner">Warning buttons</Text.Heading>
      {renderButtonsWithRole('warning', args)}
      <Text.Heading role="inner">Warning buttons</Text.Heading>
      {renderButtonsWithRole('danger', args)}
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
