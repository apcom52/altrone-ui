import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Button,
  Flex,
  Form,
  Text,
  TextInput,
  Textarea,
  Spoiler,
} from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Drawer } from './Drawer.tsx';
import { FilterPanelStory } from './stories/Drawer.story.FilterPanel.tsx';
import { RecordDetailStory } from './stories/Drawer.story.RecordDetail.tsx';
import { Bell, History, PanelRight, Share2, SlidersHorizontal } from 'lucide-react';

const story: Meta<typeof Drawer> = {
  title: 'Components/Containers/Drawer',
  component: Drawer,
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
      A drawer suits a task long enough to need its own space but not important
      enough to seize the screen — a filter set, a detail view, a form the user
      fills without losing sight of where they came from.
    </Text>
    <Text block size={4}>
      The panel scrolls its own content, so it is the right home for something
      that would burst a <Text code>Modal</Text>. Keep the header action to a
      single confirming choice.
    </Text>
  </Flex>
);

const longForm = (
  <Form>
    <Form.Field label="Project name">
      <TextInput />
    </Form.Field>
    <Form.Field label="Slug">
      <TextInput />
    </Form.Field>
    <Form.Field label="Description">
      <Textarea />
    </Form.Field>
    <Spoiler title="Advanced">
      <Form>
        <Form.Field label="Repository URL">
          <TextInput />
        </Form.Field>
        <Form.Field label="Build command">
          <TextInput />
        </Form.Field>
        <Form.Field label="Notes">
          <Textarea />
        </Form.Field>
      </Form>
    </Spoiler>
  </Form>
);

export const Overview: StoryObj<typeof Drawer> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" align="start" style={{ padding: 24 }}>
      <Text block size={9} weight="bold">
        Drawer
      </Text>
      <Paragraph>
        A panel that slides in from the edge of the screen over a dimmed
        backdrop. The trigger is whatever you pass as{' '}
        <Text code>children</Text> — Drawer clones it and adds its own{' '}
        <Text code>onClick</Text> alongside any handler the element already had.
        Open state is managed internally; reach <Text code>closeDrawer</Text>{' '}
        through the render-prop form of <Text code>content</Text>,{' '}
        <Text code>footer</Text>, <Text code>startActions</Text>, or{' '}
        <Text code>endActions</Text>.
      </Paragraph>
      <Paragraph>
        Focus is trapped inside the panel while it is open and returns to the
        trigger on close. <Text kbd>Esc</Text> and a click on the backdrop both
        close it.
      </Paragraph>

      <Heading>Anatomy</Heading>
      <Paragraph>
        A header with a close button and an action group on each side, with the{' '}
        <Text code>title</Text> centred on the panel between them; a scrollable{' '}
        <Text code>content</Text> area; and an optional <Text code>footer</Text>{' '}
        pinned below the scroll. Passing <Text code>onDone</Text> puts a submit
        button in the header.
      </Paragraph>
      <Drawer title="Edit project" content={longForm} onDone={async () => {}}>
        <Button label="Open drawer" icon={<PanelRight />} />
      </Drawer>

      <Heading>Placement</Heading>
      <Paragraph>
        <Text code>placement="start"</Text> (default) slides in from the left,{' '}
        <Text code>placement="end"</Text> from the right. Match it to where the
        trigger lives and what the panel is for — navigation on the start edge,
        contextual detail on the end.
      </Paragraph>
      <Flex direction="horizontal" gap="m" wrap>
        <Drawer title="Navigation" placement="start" content={filler}>
          <Button label="From the start" icon={<SlidersHorizontal />} />
        </Drawer>
        <Drawer title="Notifications" placement="end" content={filler}>
          <Button label="From the end" icon={<Bell />} showLabel={false} />
        </Drawer>
      </Flex>

      <Heading>Width</Heading>
      <Paragraph>
        <Text code>width</Text> is a pixel number, defaulting to{' '}
        <Text code>400</Text>. The panel never exceeds the viewport minus its
        edge inset, so a large value degrades gracefully on small screens.
      </Paragraph>
      <Flex direction="horizontal" gap="m" wrap>
        <Drawer title="Compact" width={320} content={filler}>
          <Button label="320" />
        </Drawer>
        <Drawer title="Default" content={filler}>
          <Button label="400" />
        </Drawer>
        <Drawer title="Roomy" width={560} content={filler}>
          <Button label="560" />
        </Drawer>
      </Flex>

      <Heading>The Done button and async onDone</Heading>
      <Paragraph>
        While the promise returned by <Text code>onDone</Text> is pending the
        button shows a loading state. Resolving to <Text code>false</Text> keeps
        the drawer open — use it when validation fails; any other value
        (including nothing) closes it.
      </Paragraph>
      <ValidatingDrawer />

      <Heading>Header actions</Heading>
      <Paragraph>
        <Text code>startActions</Text> and <Text code>endActions</Text> add
        controls to either side of the header — one element or several. Both
        take the render-prop form for <Text code>closeDrawer</Text>. Supplying{' '}
        <Text code>endActions</Text> replaces the default Done button; the title
        stays centred whatever lands on each side.
      </Paragraph>
      <Drawer
        title="Document"
        content={filler}
        startActions={
          <Button
            label="Version history"
            icon={<History />}
            showLabel={false}
            variant="text"
          />
        }
        endActions={({ closeDrawer }) => [
          <Button
            key="share"
            label="Share"
            icon={<Share2 />}
            showLabel={false}
            variant="text"
          />,
          <Button
            key="save"
            label="Save"
            variant="submit"
            onClick={closeDrawer}
          />,
        ]}
      >
        <Button label="Open document" icon={<PanelRight />} />
      </Drawer>

      <Heading>Reduced motion</Heading>
      <Paragraph>
        Under <Text code>prefers-reduced-motion</Text> the slide and the
        backdrop fade are dropped — the panel simply mounts and unmounts.
      </Paragraph>
    </Flex>
  ),
};

const ValidatingDrawer = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleDone = async () => {
    setError('');
    if (!name.trim()) {
      setError('Give the workspace a name before continuing.');
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setName('');
    return true;
  };

  return (
    <Drawer
      title="New workspace"
      placement="end"
      onDone={handleDone}
      onClose={() => setError('')}
      content={
        <Form>
          {error && (
            <Text block size={3} color="danger">
              {error}
            </Text>
          )}
          <Form.Field label="Workspace name">
            <TextInput value={name} onChange={(value) => setName(value)} />
          </Form.Field>
        </Form>
      }
    >
      <Button label="Create workspace" variant="submit" />
    </Drawer>
  );
};

export { FilterPanelStory, RecordDetailStory };
