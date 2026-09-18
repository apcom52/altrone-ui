import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Sheet } from './Sheet.tsx';
import type { SheetPlacement, SheetSize } from './Sheet.types.ts';
import {
  ArrowDownToLine,
  ArrowUpToLine,
  PanelLeft,
  PanelRight,
} from 'lucide-react';

const story: Meta<typeof Sheet> = {
  title: 'Internal/Sheet',
  component: Sheet,
  decorators: [StorybookDecorator],
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
      A sheet is the shape underneath both a drawer and a modal — a panel over a
      dimmed backdrop, anchored to a screen edge instead of floating near a
      trigger. It has no header/footer slots of its own; content is just{' '}
      <Text code>children</Text>.
    </Text>
    <Text block size={4}>
      It is a <Text code>Box</Text>, so <Text code>material</Text>,{' '}
      <Text code>tone</Text>, <Text code>elevation</Text>,{' '}
      <Text code>radius</Text> and <Text code>padding</Text> all forward
      straight through to it.
    </Text>
  </Flex>
);

export const Overview: StoryObj<typeof Sheet> = {
  name: 'Overview',
  render: () => (
    <Flex orientation="vertical" gap="l" align="start" style={{ padding: 24 }}>
      <Text block size={9} weight="bold">
        Sheet
      </Text>
      <Paragraph>
        Internal primitive: a <Text code>Box</Text> that slides in from a screen
        edge over a dimmed backdrop. It is controlled purely via{' '}
        <Text code>open</Text> — no <Text code>defaultOpen</Text>, since a
        higher-level component (<Text code>Drawer</Text>,{' '}
        <Text code>Modal</Text>) is expected to own that state and layer its own
        header/footer/title conventions on top.
      </Paragraph>
      <Paragraph>
        Focus is trapped inside the panel while it is open. <Text kbd>Esc</Text>{' '}
        and a click on the backdrop both call <Text code>onClose</Text>.
      </Paragraph>

      <Heading>Anatomy</Heading>
      <Paragraph>
        Just a backdrop and a panel — the panel is the <Text code>Box</Text>{' '}
        itself, so any Box prop shapes it directly.
      </Paragraph>
      <AnatomyDemo />

      <Heading>Placement</Heading>
      <Paragraph>
        <Text code>placement</Text> is one of <Text code>top</Text>,{' '}
        <Text code>bottom</Text> (default), <Text code>start</Text> or{' '}
        <Text code>end</Text> — the edge the panel slides in from.
      </Paragraph>
      <Flex orientation="horizontal" gap="m" wrap>
        <PlacementDemo placement="top" label="Top" icon={<ArrowUpToLine />} />
        <PlacementDemo
          placement="bottom"
          label="Bottom"
          icon={<ArrowDownToLine />}
        />
        <PlacementDemo placement="start" label="Start" icon={<PanelLeft />} />
        <PlacementDemo placement="end" label="End" icon={<PanelRight />} />
      </Flex>

      <Heading>Width and height</Heading>
      <Paragraph>
        Each placement has a sliding axis and a cross axis. For{' '}
        <Text code>start</Text>/<Text code>end</Text>, <Text code>width</Text>{' '}
        (a pixel number, defaulting to <Text code>400</Text>) sizes the sliding
        axis, and <Text code>height</Text> (<Text code>auto</Text> or{' '}
        <Text code>full-screen</Text>, defaulting to{' '}
        <Text code>full-screen</Text>) sizes the cross axis —{' '}
        <Text code>auto</Text> hugs its content and centers vertically. For{' '}
        <Text code>top</Text>/<Text code>bottom</Text>, the roles swap:{' '}
        <Text code>height</Text> sizes the sliding axis (default{' '}
        <Text code>auto</Text>) and <Text code>width</Text> constrains and
        centers the cross axis, left unset for a full-bleed panel.
      </Paragraph>
      <Flex orientation="horizontal" gap="m" wrap>
        <SizeDemo
          label="Drawer-like (full-screen)"
          placement="end"
          height="full-screen"
        />
        <SizeDemo label="Side panel (auto)" placement="end" height="auto" />
        <SizeDemo
          label="Full-bleed bottom sheet"
          placement="bottom"
          height="auto"
        />
        <SizeDemo
          label="Centered bottom sheet"
          placement="bottom"
          height="auto"
          width={420}
        />
      </Flex>

      <Heading>Tall content</Heading>
      <Paragraph>
        <Text code>height="auto"</Text> on <Text code>top</Text>/
        <Text code>bottom</Text> always leaves at least 15% of the viewport
        clear on the far edge from the anchor, however tall the content gets —
        the iOS-sheet idiom. That scroll happens at the screen level (the whole
        panel scrolls into view, not a fixed-size card with its own inner
        scrollbar), so there is no extra scroll wrapper to add.
      </Paragraph>
      <TallContentDemo />

      <Heading>Responsive</Heading>
      <Paragraph>
        Below <Text code>mobileBreakpoint</Text> (a{' '}
        <Text code>useBreakpoint()</Text> tier, defaulting to{' '}
        <Text code>sm</Text> — 768px) the sheet forces itself into the iOS-sheet
        idiom — <Text code>bottom</Text>, full width, <Text code>auto</Text>{' '}
        height — regardless of <Text code>placement</Text>/
        <Text code>width</Text>/<Text code>height</Text>. At or above it, those
        props are honoured as passed. The demo below sets{' '}
        <Text code>mobileBreakpoint="lg"</Text> (1280px) so it is easy to see
        both states just by resizing this window.
      </Paragraph>
      <ResponsiveDemo />

      <Heading>Inset</Heading>
      <Paragraph>
        <Text code>inset</Text> is the gap kept between the panel and the
        viewport edges, in px — defaults to <Text code>8</Text>.
      </Paragraph>
      <Flex orientation="horizontal" gap="m" wrap>
        <InsetDemo inset={0} label="0" />
        <InsetDemo inset={8} label="8 (default)" />
        <InsetDemo inset={32} label="32" />
      </Flex>

      <Heading>Reduced motion</Heading>
      <Paragraph>
        Under <Text code>prefers-reduced-motion</Text> the slide and the
        backdrop fade are dropped — the panel simply mounts and unmounts.
      </Paragraph>
    </Flex>
  ),
};

const AnatomyDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open sheet" onClick={() => setOpen(true)} />
      <Sheet open={open} onClose={() => setOpen(false)}>
        {filler}
      </Sheet>
    </>
  );
};

const PlacementDemo = ({
  placement,
  label,
  icon,
}: {
  placement: SheetPlacement;
  label: string;
  icon: React.ReactElement;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label={label} icon={icon} onClick={() => setOpen(true)} />
      <Sheet placement={placement} open={open} onClose={() => setOpen(false)}>
        {filler}
      </Sheet>
    </>
  );
};

const SizeDemo = ({
  label,
  placement,
  width,
  height,
}: {
  label: string;
  placement: SheetPlacement;
  width?: number;
  height?: SheetSize;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label={label} onClick={() => setOpen(true)} />
      <Sheet
        placement={placement}
        width={width}
        height={height}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Flex orientation="vertical" gap="s">
          <Text block size={5} weight="bold">
            {label}
          </Text>
          <Text block size={4} color="muted">
            placement=&quot;{placement}&quot;
            {width != null ? ` width={${width}}` : ''}
            {height != null ? ` height="${height}"` : ''}
          </Text>
        </Flex>
      </Sheet>
    </>
  );
};

const TallContentDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open tall sheet" onClick={() => setOpen(true)} />
      <Sheet placement="bottom" open={open} onClose={() => setOpen(false)}>
        <Flex orientation="vertical" gap="m">
          <Text block size={5} weight="bold">
            Terms of service
          </Text>
          {Array.from({ length: 40 }, (_, i) => (
            <Text block size={4} key={i}>
              Paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Text>
          ))}
        </Flex>
      </Sheet>
    </>
  );
};

const ResponsiveDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open responsive sheet" onClick={() => setOpen(true)} />
      <Sheet
        placement="end"
        mobileBreakpoint="lg"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Flex orientation="vertical" gap="s">
          <Text block size={5} weight="bold">
            placement=&quot;end&quot; mobileBreakpoint=&quot;lg&quot;
          </Text>
          <Text block size={4} color="muted">
            Wide window: a 400px side panel, as configured. Narrower than
            1280px: forced to a bottom iOS sheet instead.
          </Text>
        </Flex>
      </Sheet>
    </>
  );
};

const InsetDemo = ({ inset, label }: { inset: number; label: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label={label} onClick={() => setOpen(true)} />
      <Sheet
        placement="bottom"
        inset={inset}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Text block size={4}>
          inset={inset}
        </Text>
      </Sheet>
    </>
  );
};
