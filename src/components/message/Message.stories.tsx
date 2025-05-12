import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Message, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { useBoolean } from '../../utils';

const story: Meta<typeof Message> = {
  title: 'Components/Display/Message',
  component: Message,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const MessageStory: StoryObj<typeof Flex> = {
  name: 'Using Flex',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text.Heading variant="inner">Standard messages</Text.Heading>
      <Message
        header="Custom code is not validated"
        actions={[<Button label="OK, got it" />]}
      >
        Incorrect code may impact your website's performance.
      </Message>
      <Message
        icon={<Icon i="info" />}
        header="The data export you requested is ready!"
        actions={[
          <Button label="View the data" />,
          <Button label="Maybe later" transparent />,
        ]}
        onClose={() => {}}
      />
      <Message
        icon={<Icon i="info" />}
        header="The data export you requested is ready!"
      />
      <Message
        icon={<Icon i="info" />}
        header="A new software update is available. See what's new in version 2.0."
        severity="primary"
        actions={[<Button label="View the changelog" />]}
        onClose={() => {}}
      />
      <Message
        icon={<Icon i="highlight_off" />}
        header="There was a problem with your submission"
        severity="danger"
      >
        <div>Must include at least 1 number</div>
        <div>Must include at least 2 uppercase letters</div>
      </Message>

      <Text.Heading variant="inner">Compact messages</Text.Heading>

      <Message
        icon={<Icon i="info" />}
        header="You have no credits left!"
        severity="warning"
        actions={[<Button severity="warning" label="Upgrade" transparent />]}
        compact
      >
        Upgrade to continue.
      </Message>
      <Message
        icon={<Icon i="check" />}
        header="Successully uploaded!"
        severity="success"
        compact
        onClose={() => {}}
      />
      <Message
        icon={<Icon i="info" />}
        header="Warning"
        severity="warning"
        compact
        onClose={() => {}}
      >
        Your password strength is too low.
      </Message>
      <Message
        icon={<Icon i="info" />}
        header="Compact message with long text content"
        severity="warning"
        compact
        onClose={() => {}}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </Message>
      <Message
        icon={<Icon i="info" />}
        header="Compact message with long text content and actions"
        severity="danger"
        compact
        onClose={() => {}}
        actions={[
          <Button severity="danger" label="Refresh" transparent />,
          <Button severity="danger" label="Send crash report" transparent />,
        ]}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </Message>
      <Message
        icon={<Icon i="info" />}
        header="Did you know?"
        severity="primary"
        compact
        onClose={() => {}}
      >
        Here's some additional information that helps to clarify the message.
      </Message>
      <Message
        icon={<Icon i="sentiment_very_dissatisfied" />}
        header="Whoops! Something went wrong."
        severity="danger"
        compact
        onClose={() => {}}
        actions={[
          <Button severity="danger" label="Send crash report" transparent />,
        ]}
      />
    </Flex>
  ),
};

export const AccessibilityStory: StoryObj<typeof Flex> = {
  name: 'Accessibility',
  render: () => {
    const { value: visible, enable } = useBoolean(false);

    return (
      <Flex direction="vertical" gap="l" align="start">
        <Button onClick={enable} label="Show alert" />
        {visible && (
          <Message role="danger" icon={<Icon i="error" />}>
            Oops! Something went wrong. Please try again later.
          </Message>
        )}
      </Flex>
    );
  },
};

export default story;
