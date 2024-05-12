import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text, TextHeadingRoles } from 'components';
import { Direction, Gap, Size } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { Tooltip } from './Tooltip.tsx';

const story: Meta<typeof Tooltip> = {
  title: 'Components/Display/Tooltip',
  component: Tooltip,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const TooltipStory: StoryObj<typeof Tooltip> = {
  name: 'Using Tooltips',
  render: () => {
    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>Tooltips</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.medium}>
          <Tooltip content="Simple tooltip without custom child element" />
          <Tooltip content="Here is the tooltip of the button">
            <Button leftIcon={<Icon i="help_outline" />} />
          </Tooltip>
          <Tooltip
            content={
              <Text.Paragraph size={Size.small}>
                Open the help page <Text.Keyboard>Ctrl+H</Text.Keyboard>
              </Text.Paragraph>
            }
          >
            <Button leftIcon={<Icon i="help_outline" />} label="Help" />
          </Tooltip>
        </Flex>
      </Flex>
    );
  },
};

export default story;
