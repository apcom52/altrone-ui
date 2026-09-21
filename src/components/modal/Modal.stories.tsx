import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Button } from '../button';
import { Tooltip } from '../tooltip';
import { Modal } from './Modal.tsx';
import { PublishPostStory } from './stories/Modal.story.PublishPost.tsx';
import { DeleteWorkspaceStory } from './stories/Modal.story.DeleteWorkspace.tsx';
import { KeypadLockStory } from './stories/Modal.story.KeypadLock.tsx';
import { LifeBuoy, Sparkles } from 'lucide-react';

const story: Meta<typeof Modal> = {
  title: 'Components/Containers/Modal',
  component: Modal,
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

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 680, lineHeight: 1.6 }} color="muted">
    {children}
  </Text>
);

const filler = (
  <Flex orientation="vertical" gap="m">
    <Text block size={4}>
      A modal takes the whole screen hostage — the backdrop blocks every click
      behind it, focus is trapped inside, and <Text code>Escape</Text> is the
      only way out that doesn&apos;t involve a button. Spend that interruption
      on a decision, never on something the user could have read in place.
    </Text>
    <Text block size={4}>
      Keep the body short. If the content starts to scroll, the dialog has
      outgrown the pattern and wants to be a <Text code>Drawer</Text> or its own
      screen.
    </Text>
  </Flex>
);

export const Overview: StoryObj<typeof Modal> = {
  name: 'Overview',
  render: () => (
    <Flex orientation="vertical" gap="l" align="start" style={{ padding: 24 }}>
      <Text block size={9} weight="bold">
        Modal
      </Text>
      <Paragraph>
        An interruption with a title, a body, and a row of actions. Unlike{' '}
        <Text code>Popover</Text>/<Text code>Dropdown</Text>/
        <Text code>Tooltip</Text>, a modal isn&apos;t attached to a trigger
        element — open it explicitly via the <Text code>open</Text> prop (or let
        it manage its own state with <Text code>defaultOpen</Text>) and
        close it via <Text code>onClose</Text> or the render-prop form of{' '}
        <Text code>content</Text>, <Text code>actions</Text>, or{' '}
        <Text code>additionalActions</Text>.
      </Paragraph>

      <Heading>Anatomy</Heading>
      <Paragraph>
        Header with a centered title and a close button, a content area, and a
        footer split in two: <Text code>additionalActions</Text> for a secondary
        or destructive action set apart from the main flow, and{' '}
        <Text code>actions</Text> on the right for the primary choice. A
        built-in Cancel button sits before <Text code>actions</Text> unless you
        pass <Text code>showCancelButton={'{false}'}</Text>; the header close
        button is likewise on by default and can be hidden with{' '}
        <Text code>showCloseButton={'{false}'}</Text>.
      </Paragraph>
      <Flex orientation="horizontal" gap="m" wrap>
        <AnatomyDemo />
      </Flex>

      <Heading>Forcing an explicit choice</Heading>
      <Paragraph>
        Combine <Text code>showCloseButton={'{false}'}</Text> and{' '}
        <Text code>showCancelButton={'{false}'}</Text> when a decision can only
        be made through the footer actions — there's no header close button and
        no implicit Cancel to fall back on.
      </Paragraph>
      <Flex orientation="horizontal" gap="m" wrap>
        <ForcedChoiceDemo />
      </Flex>

      <Heading>Sizes</Heading>
      <Paragraph>
        Three widths. <Text code>s</Text> (280&nbsp;px) for a single question,{' '}
        <Text code>m</Text> (400&nbsp;px, default) for a short form,{' '}
        <Text code>l</Text> (640&nbsp;px) when the body needs room to breathe.
      </Paragraph>
      <Flex orientation="horizontal" gap="m" wrap>
        <SizeDemo size="s" label="Small" />
        <SizeDemo size="m" label="Medium" />
        <SizeDemo size="l" label="Large" />
      </Flex>

      <Heading>Closing from the content</Heading>
      <Paragraph>
        Pass a function to <Text code>content</Text> to get{' '}
        <Text code>hide</Text> where the work actually finishes — here,
        once a fake save resolves.
      </Paragraph>
      <SaveDemo />

      <Heading>Disabled</Heading>
      <Paragraph>
        With <Text code>enabled={'{false}'}</Text> the modal never renders —
        useful to hold off portalling anything while a precondition is still
        loading, even if something upstream already asked it to open.
      </Paragraph>
      <DisabledDemo />
    </Flex>
  ),
};

const AnatomyDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open modal" onClick={() => setOpen(true)} />
      <Modal
        title="Rename branch"
        data-testid="modal"
        content={filler}
        open={open}
        onClose={() => setOpen(false)}
        additionalActions={[
          <Tooltip key="help" content="Read the naming guide">
            <Button
              label="Help"
              icon={<LifeBuoy />}
              showLabel={false}
              variant="text"
            />
          </Tooltip>,
        ]}
        actions={({ hide }) => (
          <Button label="Rename" variant="submit" onClick={hide} />
        )}
      />
    </>
  );
};

const ForcedChoiceDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Review terms" onClick={() => setOpen(true)} />
      <Modal
        title="Updated Terms of Service"
        showCloseButton={false}
        showCancelButton={false}
        open={open}
        onClose={() => setOpen(false)}
        content={
          <Text block size={4}>
            We&apos;ve updated our terms. You need to accept them to keep
            using the workspace.
          </Text>
        }
        actions={({ hide }) => (
          <Button label="Accept" variant="submit" onClick={hide} />
        )}
      />
    </>
  );
};

const SizeDemo = ({
  size,
  label,
}: {
  size: 's' | 'm' | 'l';
  label: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label={label} onClick={() => setOpen(true)} />
      <Modal
        title={label}
        size={size}
        content={filler}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const SaveDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Save…" icon={<Sparkles />} onClick={() => setOpen(true)} />
      <Modal
        title="Save changes"
        showCancelButton={false}
        open={open}
        onClose={() => setOpen(false)}
        content={({ hide }) => <FakeSave onDone={hide} />}
      />
    </>
  );
};

const DisabledDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Never opens" onClick={() => setOpen(true)} />
      <Modal
        enabled={false}
        title="Never opens"
        content={filler}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const FakeSave = ({ onDone }: { onDone: () => void }) => {
  const [saving, setSaving] = useState(false);

  return (
    <Flex orientation="vertical" gap="m">
      <Text block size={4}>
        Your edits will replace the published version immediately.
      </Text>
      <Button
        label={saving ? 'Saving…' : 'Save and publish'}
        variant="submit"
        state={saving ? 'loading' : 'idle'}
        onClick={() => {
          setSaving(true);
          setTimeout(() => {
            setSaving(false);
            onDone();
          }, 1200);
        }}
      />
    </Flex>
  );
};

export { PublishPostStory, DeleteWorkspaceStory, KeypadLockStory };
