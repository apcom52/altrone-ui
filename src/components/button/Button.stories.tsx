import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text, TextHeadingRoles } from 'components';
import { Align, Direction, Gap, Role, Size } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { roleStoryField } from '../../global/storybook/argTypes.ts';
import { within, expect, userEvent, fn } from '@storybook/test';
import { ButtonProps } from './Button.types.ts';

const story: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  decorators: [StorybookDecorator],
  args: {
    onClick: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    role: roleStoryField,
  },
};

const renderButtonsWithRole = (role: Role, args: ButtonProps) => {
  return (
    <Flex gap={Gap.medium} align={Align.start} direction={Direction.horizontal}>
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
        rightIcon={<Icon i="bolt" />}
      />
      <Button {...args} role={role} label="Action" />
      <Button {...args} role={role} disabled label="Disabled Action" />
      <Button {...args} role={role} leftIcon={<Icon i="bolt" />} />
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
    </Flex>
  );
};

const renderButtonsWithSize = (size: Size) => {
  return (
    <Flex gap={Gap.medium} align={Align.start} direction={Direction.horizontal}>
      <Button size={size} label="Like" leftIcon={<Icon i="favorite" />} />
      <Button size={size} label="Like" rightIcon={<Icon i="favorite" />} />
      <Button size={size} label="Like" />
      <Button size={size} leftIcon={<Icon i="favorite" />} />
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
    <Flex gap={Gap.large}>
      <Text.Heading role={TextHeadingRoles.inner}>Default buttons</Text.Heading>
      {renderButtonsWithRole(Role.default, args)}
      <Text.Heading role={TextHeadingRoles.inner}>Primary buttons</Text.Heading>
      {renderButtonsWithRole(Role.primary, args)}
      <Text.Heading role={TextHeadingRoles.inner}>Success buttons</Text.Heading>
      {renderButtonsWithRole(Role.success, args)}
      <Text.Heading role={TextHeadingRoles.inner}>Warning buttons</Text.Heading>
      {renderButtonsWithRole(Role.warning, args)}
      <Text.Heading role={TextHeadingRoles.inner}>Warning buttons</Text.Heading>
      {renderButtonsWithRole(Role.danger, args)}
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.hover(canvas.getByTestId('button-default'));
    await expect(canvas.getByTestId('rainbow')).toBeInTheDocument();
    await userEvent.unhover(canvas.getByTestId('button-default'));
    await expect(canvas.queryByTestId('rainbow')).not.toBeInTheDocument();
  },
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
    <Flex gap={Gap.large}>
      <Text.Heading role={TextHeadingRoles.inner}>Small buttons</Text.Heading>
      {renderButtonsWithSize(Size.small)}
      <Text.Heading role={TextHeadingRoles.inner}>Normal buttons</Text.Heading>
      {renderButtonsWithSize(Size.medium)}
      <Text.Heading role={TextHeadingRoles.inner}>Large buttons</Text.Heading>
      {renderButtonsWithSize(Size.large)}
    </Flex>
  ),
};

export default story;
