import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { roleStoryField } from '../../global/storybook/argTypes.ts';
import { within, expect, userEvent, fn } from '@storybook/test';
import { ButtonProps } from './Button.types.ts';
import { StorybookCSSVariables } from '../../global/storybook/StorybookCSSVariables.tsx';
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
  argTypes: {
    role: roleStoryField,
  },
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
    <Flex gap="m" align="start">
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

export const VariablesStory: StoryObj<typeof Button> = {
  name: 'Buttons CSS Variables',
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
  render: () => (
    <StorybookCSSVariables
      title="Button CSS Variables"
      data={[
        'buttonBackgroundColor',
        { name: 'buttonBorderColor', type: 'border' },
        { name: 'buttonTextColor', type: 'text' },
        'buttonHoverBackgroundColor',
        { name: 'buttonHoverBorderColor', type: 'border' },
        { name: 'buttonHoverTextColor', type: 'text' },
        'buttonPressBackgroundColor',
        { name: 'buttonPressBorderColor', type: 'border' },
        { name: 'buttonPressTextColor', type: 'text' },
        'buttonTransparentBackgroundColor',
        'buttonTransparentHoverBackgroundColor',
        'buttonTransparentPressBackgroundColor',
        { name: 'buttonTransparentTextColor', type: 'text' },
        { name: 'buttonTransparentHoverTextColor', type: 'text' },
        { name: 'buttonTransparentPressTextColor', type: 'text' },

        'buttonPrimaryBackgroundColor',
        { name: 'buttonPrimaryBorderColor', type: 'border' },
        { name: 'buttonPrimaryTextColor', type: 'text' },
        'buttonPrimaryHoverBackgroundColor',
        { name: 'buttonPrimaryHoverBorderColor', type: 'border' },
        { name: 'buttonPrimaryHoverTextColor', type: 'text' },
        'buttonPrimaryPressBackgroundColor',
        { name: 'buttonPrimaryPressBorderColor', type: 'border' },
        { name: 'buttonPrimaryPressTextColor', type: 'text' },
        'buttonPrimaryTransparentBackgroundColor',
        'buttonPrimaryTransparentHoverBackgroundColor',
        'buttonPrimaryTransparentPressBackgroundColor',
        { name: 'buttonPrimaryTransparentTextColor', type: 'text' },
        { name: 'buttonPrimaryTransparentHoverTextColor', type: 'text' },
        { name: 'buttonPrimaryTransparentPressTextColor', type: 'text' },

        'buttonSuccessBackgroundColor',
        { name: 'buttonSuccessBorderColor', type: 'border' },
        { name: 'buttonSuccessTextColor', type: 'text' },
        'buttonSuccessHoverBackgroundColor',
        { name: 'buttonSuccessHoverBorderColor', type: 'border' },
        { name: 'buttonSuccessHoverTextColor', type: 'text' },
        'buttonSuccessPressBackgroundColor',
        { name: 'buttonSuccessPressBorderColor', type: 'border' },
        { name: 'buttonSuccessPressTextColor', type: 'text' },
        'buttonSuccessTransparentBackgroundColor',
        'buttonSuccessTransparentHoverBackgroundColor',
        'buttonSuccessTransparentPressBackgroundColor',
        { name: 'buttonSuccessTransparentTextColor', type: 'text' },
        { name: 'buttonSuccessTransparentHoverTextColor', type: 'text' },
        { name: 'buttonSuccessTransparentPressTextColor', type: 'text' },

        'buttonWarningBackgroundColor',
        { name: 'buttonWarningBorderColor', type: 'border' },
        { name: 'buttonWarningTextColor', type: 'text' },
        'buttonWarningHoverBackgroundColor',
        { name: 'buttonWarningHoverBorderColor', type: 'border' },
        { name: 'buttonWarningHoverTextColor', type: 'text' },
        'buttonWarningPressBackgroundColor',
        { name: 'buttonWarningPressBorderColor', type: 'border' },
        { name: 'buttonWarningPressTextColor', type: 'text' },
        'buttonWarningTransparentBackgroundColor',
        'buttonWarningTransparentHoverBackgroundColor',
        'buttonWarningTransparentPressBackgroundColor',
        { name: 'buttonWarningTransparentTextColor', type: 'text' },
        { name: 'buttonWarningTransparentHoverTextColor', type: 'text' },
        { name: 'buttonWarningTransparentPressTextColor', type: 'text' },

        'buttonDangerBackgroundColor',
        { name: 'buttonDangerBorderColor', type: 'border' },
        { name: 'buttonDangerTextColor', type: 'text' },
        'buttonDangerHoverBackgroundColor',
        { name: 'buttonDangerHoverBorderColor', type: 'border' },
        { name: 'buttonDangerHoverTextColor', type: 'text' },
        'buttonDangerPressBackgroundColor',
        { name: 'buttonDangerPressBorderColor', type: 'border' },
        { name: 'buttonDangerPressTextColor', type: 'text' },
        'buttonDangerTransparentBackgroundColor',
        'buttonDangerTransparentHoverBackgroundColor',
        'buttonDangerTransparentPressBackgroundColor',
        { name: 'buttonDangerTransparentTextColor', type: 'text' },
        { name: 'buttonDangerTransparentHoverTextColor', type: 'text' },
        { name: 'buttonDangerTransparentPressTextColor', type: 'text' },
      ]}
    />
  ),
};

export default story;
