import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Tooltip } from './Tooltip.tsx';
import { within, expect, userEvent } from '@storybook/test';
import { timeout } from '../../utils';

const story: Meta<typeof Tooltip> = {
  title: 'Components/Containers/Tooltip',
  component: Tooltip,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const TooltipStory: StoryObj<typeof Tooltip> = {
  name: 'Using Tooltips',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Tooltips</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <Tooltip content="Simple tooltip without custom child element" />
          <Tooltip content="Here is the tooltip of the button">
            <Button leftIcon={<Icon i="help_outline" />} />
          </Tooltip>
          <Tooltip
            content={
              <Text.Paragraph size="s">
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'need to show tooltip when user hovers the tooltip button',
      async () => {
        await expect(
          canvas.queryByText('Simple tooltip without custom child element'),
        ).not.toBeInTheDocument();

        await userEvent.hover(canvas.getAllByText('help_outline')[0]);
        await timeout(500);
        await expect(
          canvas.queryByText('Simple tooltip without custom child element'),
        ).toBeInTheDocument();
      },
    );
  },
};

export default story;
