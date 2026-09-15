import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Button,
  Flex,
  Form,
  Text,
  TextInput,
  TextArea,
  Spoiler,
} from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Drawer } from './Drawer.tsx';
import { FilterPanelStory } from './stories/Drawer.story.FilterPanel.tsx';
import { RecordDetailStory } from './stories/Drawer.story.RecordDetail.tsx';
import {
  Bell,
  History,
  PanelRight,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';

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
      <TextArea />
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
          <TextArea />
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
        backdrop. Unlike <Text code>Popover</Text>/<Text code>Dropdown</Text>/
        <Text code>Tooltip</Text>, a drawer isn&apos;t attached to a trigger
        element — open it explicitly via the <Text code>open</Text> prop (or let
        it manage its own state with <Text code>defaultOpen</Text>) and
        close it via <Text code>onClose</Text> or the render-prop form of{' '}
        <Text code>content</Text>, <Text code>footer</Text>,{' '}
        <Text code>startActions</Text>, or <Text code>endActions</Text> (which
        all receive <Text code>closeDrawer</Text>).
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
      <AnatomyDrawerDemo />

      <Heading>Placement</Heading>
      <Paragraph>
        <Text code>placement="start"</Text> (default) slides in from the left,{' '}
        <Text code>placement="end"</Text> from the right. Match it to where the
        trigger lives and what the panel is for — navigation on the start edge,
        contextual detail on the end.
      </Paragraph>
      <Flex direction="horizontal" gap="m" wrap>
        <PlacementDrawerDemo
          placement="start"
          title="Navigation"
          label="From the start"
          icon={<SlidersHorizontal />}
        />
        <PlacementDrawerDemo
          placement="end"
          title="Notifications"
          label="From the end"
          icon={<Bell />}
          showLabel={false}
        />
      </Flex>

      <Heading>Width</Heading>
      <Paragraph>
        <Text code>width</Text> is a pixel number, defaulting to{' '}
        <Text code>400</Text>. The panel never exceeds the viewport minus its
        edge inset, so a large value degrades gracefully on small screens.
      </Paragraph>
      <Flex direction="horizontal" gap="m" wrap>
        <WidthDrawerDemo width={320} title="Compact" label="320" />
        <WidthDrawerDemo title="Default" label="400" />
        <WidthDrawerDemo width={560} title="Roomy" label="560" />
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
      <DocumentDrawerDemo />

      <Heading>Reduced motion</Heading>
      <Paragraph>
        Under <Text code>prefers-reduced-motion</Text> the slide and the
        backdrop fade are dropped — the panel simply mounts and unmounts.
      </Paragraph>
    </Flex>
  ),
};

const AnatomyDrawerDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open drawer"
        icon={<PanelRight />}
        onClick={() => setOpen(true)}
      />
      <Drawer
        title="Edit project"
        content={longForm}
        onDone={async () => {}}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const PlacementDrawerDemo = ({
  placement,
  title,
  label,
  icon,
  showLabel,
}: {
  placement: 'start' | 'end';
  title: string;
  label: string;
  icon: React.ReactElement;
  showLabel?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label={label}
        icon={icon}
        showLabel={showLabel}
        onClick={() => setOpen(true)}
      />
      <Drawer
        title={title}
        placement={placement}
        content={filler}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const WidthDrawerDemo = ({
  width,
  title,
  label,
}: {
  width?: number;
  title: string;
  label: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label={label} onClick={() => setOpen(true)} />
      <Drawer
        title={title}
        width={width}
        content={filler}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const DocumentDrawerDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open document"
        icon={<PanelRight />}
        onClick={() => setOpen(true)}
      />
      <Drawer
        title="Document"
        content={filler}
        open={open}
        onClose={() => setOpen(false)}
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
      />
    </>
  );
};

const ValidatingDrawer = () => {
  const [open, setOpen] = useState(false);
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
    <>
      <Button
        label="Create workspace"
        variant="submit"
        onClick={() => setOpen(true)}
      />
      <Drawer
        title="New workspace"
        placement="end"
        open={open}
        onDone={handleDone}
        onClose={() => {
          setOpen(false);
          setError('');
        }}
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
      />
    </>
  );
};

export { FilterPanelStory, RecordDetailStory };
