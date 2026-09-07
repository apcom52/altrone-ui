import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Message, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { useBoolean } from '../../utils';
import { Info, Check, TriangleAlert, CircleAlert } from 'lucide-react';

const story: Meta<typeof Message> = {
  title: 'Components/Display/Message',
  component: Message,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export default story;

const Section = ({ children }: { children: string }) => (
  <Text block size={6} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

export const Overview: StoryObj<typeof Message> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Message
      </Text>
      <Paragraph>
        A <Text code>Message</Text> is an inline banner for a piece of status
        the user should notice but that does not block their work — a background
        job finished, a setting needs attention, a form was rejected. It sits in
        the flow of the page rather than floating over it like a{' '}
        <Text code>Toast</Text>.
      </Paragraph>
      <Paragraph>
        The only structural pieces are an optional <Text code>icon</Text>, an
        optional <Text code>header</Text>, the body (<Text code>children</Text>
        ), an optional row of <Text code>actions</Text>, and an optional close
        button that appears whenever <Text code>onClose</Text> is passed.
        Everything else is driven by <Text code>severity</Text>.
      </Paragraph>
      <Paragraph>
        The container is a <Text code>Box</Text> —{' '}
        <Text code>material="glass"</Text>, <Text code>shape="rounded"</Text> —
        so a message reads as a soft frosted panel consistent with the rest of
        the library, and <Text code>severity</Text> maps straight onto the Box{' '}
        <Text code>tone</Text>.
      </Paragraph>

      <Message
        icon={<Info />}
        header="Custom code is not validated"
        actions={[<Button key="ok" label="OK, got it" />]}
        onClose={() => {}}
      >
        Incorrect code may impact your website&rsquo;s performance.
      </Message>
    </Flex>
  ),
};

export const Severities: StoryObj<typeof Message> = {
  name: 'Severities',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Severities</Section>
      <Paragraph>
        <Text code>severity</Text> sets the colour and the implied urgency. With
        no severity the message is neutral; <Text code>primary</Text> ties it to
        the current accent for informational announcements;{' '}
        <Text code>success</Text>, <Text code>warning</Text> and{' '}
        <Text code>danger</Text> carry the usual status meanings.
      </Paragraph>
      <Paragraph>
        Severity also decides how a screen reader treats the banner:{' '}
        <Text code>danger</Text> renders as an assertive{' '}
        <Text code>role="alert"</Text> and interrupts, every other severity
        renders as a polite <Text code>role="status"</Text>. Override with{' '}
        <Text code>ariaRole</Text> when a specific case needs it.
      </Paragraph>

      <Message header="Neutral">
        No severity — used for plain, non-urgent information.
      </Message>
      <Message
        icon={<Info />}
        header="A new software update is available"
        severity="primary"
        actions={[<Button key="log" label="View the changelog" />]}
      >
        See what&rsquo;s new in version 2.0.
      </Message>
      <Message
        icon={<Check />}
        header="Your export is ready"
        severity="success"
        actions={[<Button key="dl" label="Download" />]}
      />
      <Message
        icon={<TriangleAlert />}
        header="You have no credits left"
        severity="warning"
      >
        Upgrade your plan to keep running exports.
      </Message>
      <Message
        icon={<CircleAlert />}
        header="There was a problem with your submission"
        severity="danger"
      >
        <Text block size={4}>
          Must include at least one number
        </Text>
        <Text block size={4}>
          Must include at least two uppercase letters
        </Text>
      </Message>
    </Flex>
  ),
};

export const WithoutIcon: StoryObj<typeof Message> = {
  name: 'Without an icon',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Without an icon</Section>
      <Paragraph>
        When <Text code>icon</Text> is omitted the container widens its
        horizontal padding, so the text keeps a comfortable inset instead of
        hugging the rounded edge where the icon used to sit.
      </Paragraph>

      <Message header="Draft saved">
        Your changes are stored locally and will sync when you reconnect.
      </Message>
      <Message
        header="Payment method expiring"
        severity="warning"
        actions={[<Button key="update" label="Update card" />]}
        onClose={() => {}}
      >
        The card ending 4242 expires next month.
      </Message>
    </Flex>
  ),
};

export const Dismissible: StoryObj<typeof Message> = {
  name: 'Dismissible',
  render: () => {
    const { value: visible, disable, enable } = useBoolean(true);

    return (
      <Flex
        direction="vertical"
        gap="l"
        align="start"
        style={{ maxWidth: 720 }}
      >
        <Section>Dismissible</Section>
        <Paragraph>
          Passing <Text code>onClose</Text> is what makes a message dismissible
          — it adds a round <Text code>CloseButton</Text> and leaves the
          visibility bookkeeping to the consumer. There is no internal
          &ldquo;dismissed&rdquo; state.
        </Paragraph>

        {visible ? (
          <Message
            icon={<Info />}
            header="New features are available"
            severity="primary"
            onClose={disable}
          >
            Take a look at what changed in the latest release.
          </Message>
        ) : (
          <Button label="Show the message again" onClick={enable} />
        )}
      </Flex>
    );
  },
};

export const WithActions: StoryObj<typeof Message> = {
  name: 'With actions',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>With actions</Section>
      <Paragraph>
        <Text code>actions</Text> takes an array of elements rendered in a row
        under the body. Match the buttons to the severity — a{' '}
        <Text code>danger</Text> message reads best with{' '}
        <Text code>danger</Text> buttons.
      </Paragraph>

      <Message
        icon={<Info />}
        header="The data export you requested is ready!"
        severity="primary"
        actions={[
          <Button key="view" label="View the data" />,
          <Button key="later" label="Maybe later" />,
        ]}
        onClose={() => {}}
      />
      <Message
        icon={<CircleAlert />}
        header="Whoops! Something went wrong"
        severity="danger"
        actions={[
          <Button key="retry" label="Retry" danger />,
          <Button key="report" label="Send crash report" danger />,
        ]}
        onClose={() => {}}
      >
        The last action could not be completed.
      </Message>
    </Flex>
  ),
};

export const Compact: StoryObj<typeof Message> = {
  name: 'Compact',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Compact</Section>
      <Paragraph>
        <Text code>compact</Text> stops stacking the header above the body and
        lays them out on a single wrapping line, vertically centred on the icon.
        Use it for short, low-stakes confirmations where a full banner would be
        too heavy.
      </Paragraph>

      <Message
        icon={<Check />}
        header="Successfully uploaded"
        severity="success"
        compact
        onClose={() => {}}
      />
      <Message
        icon={<TriangleAlert />}
        header="Weak password"
        severity="warning"
        compact
        onClose={() => {}}
      >
        Add a few more characters.
      </Message>
      <Message
        icon={<CircleAlert />}
        header="Connection lost"
        severity="danger"
        compact
        actions={[<Button key="retry" label="Retry" danger />]}
        onClose={() => {}}
      >
        We couldn&rsquo;t reach the server. Your last change is not saved.
      </Message>
    </Flex>
  ),
};

export const Accessibility: StoryObj<typeof Message> = {
  name: 'Accessibility',
  render: () => {
    const { value: visible, enable } = useBoolean(false);

    return (
      <Flex
        direction="vertical"
        gap="l"
        align="start"
        style={{ maxWidth: 720 }}
      >
        <Section>Accessibility</Section>
        <Paragraph>
          The message below is rendered on demand with{' '}
          <Text code>severity="danger"</Text>, so it mounts with an assertive{' '}
          <Text code>role="alert"</Text> and is announced immediately. A
          non-danger severity would mount as a polite{' '}
          <Text code>role="status"</Text> instead.
        </Paragraph>

        <Button onClick={enable} label="Trigger an error" danger />
        {visible && (
          <Message severity="danger" icon={<CircleAlert />}>
            Oops! Something went wrong. Please try again later.
          </Message>
        )}
      </Flex>
    );
  },
};
