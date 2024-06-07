import { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon, Message } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

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
    <Flex gap="large">
      <Message header="Welcome!" icon={<Icon i="waving_hand" />}>
        Welcome to our platform! We're excited to have you join our community.
        Explore, learn, and engage with others. If you have any questions, don't
        hesitate to reach out to our support team.
      </Message>
      <Message role="primary" header="New Feature Update">
        We're thrilled to announce the release of our latest feature! Explore
        the enhanced functionality and improved user experience. Check out our
        release notes for more details on how to make the most of this update.
        Happy exploring!
      </Message>
      <Message role="danger" icon={<Icon i="error" />}>
        Oops! Something went wrong. Please try again later.
      </Message>
      <Message role="warning">
        Attention! Unusual activity detected on your account. Please review your
        recent login history and ensure your account is secure. If you suspect
        unauthorized access, change your password immediately and contact
        support for further assistance.
      </Message>
      <Message
        role="success"
        header="Payment Processed Successfully"
        icon={<Icon i="check" />}
      >
        Congratulations! Your payment has been processed successfully. Thank you
        for your purchase. You will receive a confirmation email shortly. If you
        have any questions or concerns, feel free to contact our support team.
      </Message>
    </Flex>
  ),
};

export default story;
