import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text, TextHeadingRoles } from 'components';
import { Align, Direction, Gap, Role, Size } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { roleStoryField } from '../../global/storybook/argTypes.ts';

const story: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {
    role: roleStoryField,
  },
};

const renderButtonsWithRole = (role: Role) => {
  return (
    <Flex gap={Gap.medium} align={Align.start} direction={Direction.horizontal}>
      <Button role={role} label="Action" leftIcon={<Icon i="bolt" />} />
      <Button role={role} label="Action" rightIcon={<Icon i="bolt" />} />
      <Button role={role} label="Action" />
      <Button role={role} disabled label="Disabled Action" />
      <Button role={role} leftIcon={<Icon i="bolt" />} />
      <Button
        role={role}
        label="Action"
        transparent
        leftIcon={<Icon i="bolt" />}
      />
      <Button
        role={role}
        label="Action"
        transparent
        rightIcon={<Icon i="bolt" />}
      />
      <Button role={role} label="Action" transparent />
      <Button role={role} disabled label="Disabled Action" transparent />
      <Button role={role} transparent leftIcon={<Icon i="bolt" />} />
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
  render: () => (
    <Flex gap={Gap.large}>
      <Text.Heading role={TextHeadingRoles.inner}>Default buttons</Text.Heading>
      {renderButtonsWithRole(Role.default)}
      <Text.Heading role={TextHeadingRoles.inner}>Primary buttons</Text.Heading>
      {renderButtonsWithRole(Role.primary)}
      <Text.Heading role={TextHeadingRoles.inner}>Success buttons</Text.Heading>
      {renderButtonsWithRole(Role.success)}
      <Text.Heading role={TextHeadingRoles.inner}>Warning buttons</Text.Heading>
      {renderButtonsWithRole(Role.warning)}
      <Text.Heading role={TextHeadingRoles.inner}>Warning buttons</Text.Heading>
      {renderButtonsWithRole(Role.danger)}
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
