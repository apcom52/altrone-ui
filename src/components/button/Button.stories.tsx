import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text, TextHeadingRoles } from 'components';
import { Align, Direction, Gap, Role } from 'types';
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
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
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

export const ButtonStory: StoryObj<typeof Button> = {
  name: 'Using Buttons',
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

export default story;
