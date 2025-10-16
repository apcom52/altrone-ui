import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
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
  type: ButtonProps['type'],
  args: ButtonProps
) => {
  return (
    <Flex gap="m" align="start" wrap>
      <Button
        {...args}
        type={type}
        label="Action"
        icon={<Icon i="bolt" />}
        data-testid={`button-${type}`}
      />
      <Button
        {...args}
        type={type}
        label="Action"
        icon={<Icon i="bolt" />}
        data-testid={`button-${type}`}
        badge="NEW"
      />
      <Button
        {...args}
        type={type}
        label="Action"
        icon={<Icon i="bolt" />}
        loading
      />
      <Button {...args} type={type} label="Action" icon={<Icon i="bolt" />} />
      <Button
        {...args}
        type={type}
        label="Action"
        icon={<Icon i="bolt" />}
        badge="2"
      />
      <Button {...args} type={type} label="Action" />
      <Button {...args} type={type} disabled label="Disabled Action" />
      <Button
        {...args}
        type={type}
        disabled
        label="Disabled Action"
        badge="NEW"
      />
      <Button {...args} type={type} icon={<Icon i="bolt" />} />
      <Button {...args} type={type} icon={<Icon i="bolt" />} loading />
      <Button
        {...args}
        type={type}
        icon={<Icon i="bolt" />}
        loading
        badge="3"
      />
      <Button
        {...args}
        type={type}
        label="Action"
        showLabel={false}
        transparent
        icon={<Icon i="bolt" />}
      />
      <Button
        {...args}
        type={type}
        label="Action"
        showLabel={false}
        transparent
        icon={<Icon i="bolt" />}
        badge="4"
      />
      <Button
        {...args}
        type={type}
        label="Action"
        showLabel={false}
        transparent
        icon={<Icon i="bolt" />}
        loading
      />
      <Button
        {...args}
        type={type}
        label="Action"
        transparent
        icon={<Icon i="bolt" />}
      />
      <Button {...args} type={type} label="Action" transparent />
      <Button
        {...args}
        type={type}
        disabled
        label="Disabled Action"
        transparent
      />
      <Button
        {...args}
        type={type}
        disabled
        label="Disabled Action"
        transparent
        badge="4"
      />
      <Button {...args} type={type} transparent icon={<Icon i="bolt" />} />
      <Button
        {...args}
        type={type}
        transparent
        icon={<Icon i="bolt" />}
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
      <Text.Heading role="inner">Primary buttons</Text.Heading>
      {renderButtonsWithRole('primary', args)}
      <Text.Heading role="inner">Transparent buttons</Text.Heading>
      {renderButtonsWithRole('transparent', args)}
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
