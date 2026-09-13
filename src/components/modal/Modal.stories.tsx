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
  <Flex direction="vertical" gap="m">
    <Text block size={4}>
      A modal takes the whole screen hostage — the backdrop blocks every click
      behind it, focus is trapped inside, and <Text code>Escape</Text> is the
      only way out that doesn&apos;t involve a button. Spend that interruption on
      a decision, never on something the user could have read in place.
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
    <Flex direction="vertical" gap="l" align="start" style={{ padding: 24 }}>
      <Text block size={9} weight="bold">
        Modal
      </Text>
      <Paragraph>
        An interruption with a title, a body, and a row of actions. The trigger
        is whatever you pass as <Text code>children</Text> — Modal clones it and
        adds its own <Text code>onClick</Text> alongside any handler the element
        already had. Open state is managed internally; reach{' '}
        <Text code>closeModal</Text> through the render-prop form of{' '}
        <Text code>content</Text>, <Text code>actions</Text>, or{' '}
        <Text code>leftActions</Text>.
      </Paragraph>

      <Heading>Anatomy</Heading>
      <Paragraph>
        Header with a centered title and a close button, a content area, and a
        footer split in two: <Text code>leftActions</Text> for a secondary or
        destructive action set apart from the main flow, and{' '}
        <Text code>actions</Text> on the right for the primary choice. A built-in
        Cancel button sits before <Text code>actions</Text> unless you pass{' '}
        <Text code>showCancelButton={'{false}'}</Text>.
      </Paragraph>
      <Flex direction="horizontal" gap="m" wrap>
        <Modal
          title="Rename branch"
          data-testid="modal"
          content={filler}
          leftActions={[
            <Tooltip content="Read the naming guide">
              <Button
                label="Help"
                icon={<LifeBuoy />}
                showLabel={false}
                variant="text"
              />
            </Tooltip>,
          ]}
          actions={({ closeModal }) => (
            <Button label="Rename" variant="submit" onClick={closeModal} />
          )}
        >
          <Button label="Open modal" />
        </Modal>
      </Flex>

      <Heading>Sizes</Heading>
      <Paragraph>
        Three widths. <Text code>s</Text> (280&nbsp;px) for a single question,{' '}
        <Text code>m</Text> (400&nbsp;px, default) for a short form,{' '}
        <Text code>l</Text> (640&nbsp;px) when the body needs room to breathe.
      </Paragraph>
      <Flex direction="horizontal" gap="m" wrap>
        <Modal title="Small" size="s" content={filler}>
          <Button label="Small" />
        </Modal>
        <Modal title="Medium" size="m" content={filler}>
          <Button label="Medium" />
        </Modal>
        <Modal title="Large" size="l" content={filler}>
          <Button label="Large" />
        </Modal>
      </Flex>

      <Heading>Closing from the content</Heading>
      <Paragraph>
        Pass a function to <Text code>content</Text> to get{' '}
        <Text code>closeModal</Text> where the work actually finishes — here, once
        a fake save resolves.
      </Paragraph>
      <Modal
        title="Save changes"
        showCancelButton={false}
        content={({ closeModal }) => <FakeSave onDone={closeModal} />}
      >
        <Button label="Save…" icon={<Sparkles />} />
      </Modal>

      <Heading>Disabled</Heading>
      <Paragraph>
        With <Text code>enabled={'{false}'}</Text> the trigger renders but never
        opens anything — useful while a precondition is still loading.
      </Paragraph>
      <Modal enabled={false} title="Never opens" content={filler}>
        <Button label="Disabled trigger" />
      </Modal>
    </Flex>
  ),
};

const FakeSave = ({ onDone }: { onDone: () => void }) => {
  const [saving, setSaving] = useState(false);

  return (
    <Flex direction="vertical" gap="m">
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
