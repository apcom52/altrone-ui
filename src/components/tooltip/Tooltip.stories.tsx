import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Tooltip } from './Tooltip.tsx';
import { HelpCircle, Play } from 'lucide-react';
// import { within, expect, userEvent } from '@storybook/test';

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
      <Flex direction="vertical" gap="l" style={{ padding: '100px' }}>
        <Text.Heading role="inner">Tooltips</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <Tooltip content="Simple tooltip without custom child element" />
          <Tooltip content="Here is the tooltip of the button">
            <Button icon={<HelpCircle />} label="Help me" />
          </Tooltip>
          <Tooltip content="Open the help page" kbd="Ctrl+H">
            <Button icon={<Play />} label="Run command" showLabel={false} />
          </Tooltip>
        </Flex>
      </Flex>
    );
  },
  // play: async ({ canvasElement, step }) => {
  //   const canvas = within(canvasElement);

  //   await step(
  //     'need to show tooltip when user hovers the tooltip button',
  //     async () => {
  //       await expect(
  //         canvas.queryByText('Simple tooltip without custom child element'),
  //       ).not.toBeInTheDocument();

  //       await userEvent.hover(canvas.getAllByText('help_outline')[0]);
  //       await AsyncUtils.timeout(500);
  //       await expect(
  //         canvas.queryByText('Simple tooltip without custom child element'),
  //       ).toBeInTheDocument();
  //     },
  //   );
  // },
};

export default story;
