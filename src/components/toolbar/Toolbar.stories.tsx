import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Toolbar } from './Toolbar.tsx';
import {
  AlignCenter,
  AlignCenterVertical,
  AlignEndVertical,
  AlignLeft,
  AlignRight,
  AlignStartVertical,
  Bold,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CaseSensitive,
  DiamondPlus,
  Ellipsis,
  Grid3X3,
  Images,
  Italic,
  Layers,
  Maximize2,
  MessageCircle,
  MousePointer2,
  Pen,
  PencilLine,
  Pointer,
  RectangleHorizontal,
  Redo2,
  Search,
  Send,
  Share,
  Strikethrough,
  Tags,
  Type,
  Underline,
  Undo2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Dropdown } from 'components/dropdown/index.ts';
import { useState } from 'react';
import { Button } from 'components/button/Button.tsx';
import { Label } from 'components/label/Label.tsx';
import { Paperclip, Camera } from 'lucide-react';

const story: Meta<typeof Toolbar> = {
  title: 'Components/Containers/Toolbar',
  component: Toolbar,
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

export const ToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Using Toolbar',
  render: () => {
    const [placement, setPlacement] = useState<
      'top' | 'bottom' | 'left' | 'right'
    >('top');
    const [fixed, setFixed] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [buttonSelected, setButtonSelected] = useState(false);

    const vertical = placement === 'left' || placement === 'right';

    return (
      <Flex
        direction="vertical"
        gap="l"
        style={{
          position: 'relative',
          marginTop: -8,
          marginLeft: -24,
          marginRight: -24,
          width: 'calc(100% + 48px)',
          height: '100vh',
        }}
      >
        <div style={{ padding: 200 }}>
          <Flex gap="s">
            <Button
              label={`Placement: ${placement.toUpperCase()}`}
              onClick={() =>
                setPlacement(
                  placement === 'top'
                    ? 'bottom'
                    : placement === 'bottom'
                      ? 'left'
                      : placement === 'left'
                        ? 'right'
                        : 'top',
                )
              }
            />
            <Button
              label="Fixed"
              selected={fixed}
              onClick={() => setFixed(!fixed)}
            />
            <Button
              label="Show Backdrop"
              selected={showBackdrop}
              onClick={() => setShowBackdrop(!showBackdrop)}
            />
          </Flex>
        </div>

        <Toolbar
          placement={placement}
          fixed={fixed}
          showBackdrop={showBackdrop}
          style={{ zIndex: 100 }}
        >
          <Toolbar.Leading>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<ChevronLeft />}
                label="Back"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<ChevronRight />}
                label="Forward"
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Title label="Adobe Photoshop" />
          </Toolbar.Leading>
          <Toolbar.Center>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<Paperclip />}
                label="Attach a file"
                kbd="⌘+I"
                showLabel={false}
                selected={buttonSelected}
                onClick={() => setButtonSelected(!buttonSelected)}
              />
              <Toolbar.Action
                kbd="⌘+P"
                icon={<Camera />}
                label="Take a photo"
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action
                label="Send a message"
                showLabel={!vertical}
                icon={vertical ? <Send /> : undefined}
              />
            </Toolbar.Group>
          </Toolbar.Center>
          <Toolbar.Trailing>
            <Toolbar.Group>
              <Toolbar.Action
                label={buttonSelected ? 'Finish editing' : 'Edit'}
                showLabel={!vertical}
                icon={vertical ? <PencilLine /> : undefined}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<Grid3X3 />}
                label="View"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<Share />}
                label="Share"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<Tags />}
                label="Tags"
                showLabel={false}
                badge={vertical ? undefined : 'Beta'}
              />
              <Toolbar.Action
                icon={<Ellipsis />}
                label="More"
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<Search />}
                label="Search"
                showLabel={false}
              />
            </Toolbar.Group>
          </Toolbar.Trailing>
        </Toolbar>
      </Flex>
    );
  },
};

// ─── Design Canvas ────────────────────────────────────────────────────────────

type CanvasTool =
  | 'cursor'
  | 'frame'
  | 'rect'
  | 'ellipse'
  | 'text'
  | 'pen'
  | 'image'
  | 'layers';

const TOOLS: {
  id: CanvasTool;
  icon: React.ReactNode;
  label: string;
  kbd: string;
}[] = [
  { id: 'cursor', icon: <MousePointer2 />, label: 'Move', kbd: 'V' },
  { id: 'frame', icon: <Layers />, label: 'Frame', kbd: 'F' },
  { id: 'rect', icon: <RectangleHorizontal />, label: 'Rectangle', kbd: 'R' },
  { id: 'ellipse', icon: <Circle />, label: 'Ellipse', kbd: 'O' },
  { id: 'text', icon: <Type />, label: 'Text', kbd: 'T' },
  { id: 'pen', icon: <Pen />, label: 'Pen', kbd: 'P' },
  { id: 'image', icon: <Images />, label: 'Image', kbd: 'I' },
  { id: 'layers', icon: <DiamondPlus />, label: 'Component', kbd: '⌘K' },
];

const TOOL_CURSOR: Record<CanvasTool, string> = {
  cursor: 'default',
  frame: 'crosshair',
  rect: 'crosshair',
  ellipse: 'crosshair',
  text: 'text',
  pen: 'crosshair',
  image: 'crosshair',
  layers: 'copy',
};

// Fake design elements on the canvas
const CANVAS_SHAPES = [
  {
    x: 60,
    y: 60,
    w: 280,
    h: 160,
    r: 12,
    bg: 'var(--accent-3)',
    label: 'Hero Section',
  },
  { x: 60, y: 240, w: 130, h: 80, r: 8, bg: 'var(--teal-3)', label: 'Card A' },
  {
    x: 210,
    y: 240,
    w: 130,
    h: 80,
    r: 8,
    bg: 'var(--amber-3)',
    label: 'Card B',
  },
  { x: 60, y: 340, w: 280, h: 40, r: 20, bg: 'var(--accent-9)', label: '' },
  {
    x: 100,
    y: 400,
    w: 200,
    h: 12,
    r: 4,
    bg: 'var(--interactive-1)',
    label: '',
  },
  { x: 120, y: 424, w: 160, h: 8, r: 4, bg: 'var(--interactive-1)', label: '' },
];

function CenterToolbarContent({ activeTool }: { activeTool: CanvasTool }) {
  if (activeTool === 'cursor' || activeTool === 'frame') {
    return (
      <>
        <Toolbar.Group>
          <Toolbar.Action
            icon={<AlignLeft />}
            label="Align left"
            showLabel={false}
            kbd="⌘⇧L"
          />
          <Toolbar.Action
            icon={<AlignCenter />}
            label="Align center"
            showLabel={false}
            kbd="⌘⇧C"
          />
          <Toolbar.Action
            icon={<AlignRight />}
            label="Align right"
            showLabel={false}
            kbd="⌘⇧R"
          />
        </Toolbar.Group>
        <Toolbar.Group>
          <Toolbar.Action
            icon={<AlignStartVertical />}
            label="Align top"
            showLabel={false}
          />
          <Toolbar.Action
            icon={<AlignCenterVertical />}
            label="Align middle"
            showLabel={false}
          />
          <Toolbar.Action
            icon={<AlignEndVertical />}
            label="Align bottom"
            showLabel={false}
          />
        </Toolbar.Group>
      </>
    );
  }

  if (activeTool === 'text') {
    return (
      <Toolbar.Group>
        <Toolbar.Action
          icon={<Bold />}
          label="Bold"
          showLabel={false}
          kbd="⌘B"
        />
        <Toolbar.Action
          icon={<Italic />}
          label="Italic"
          showLabel={false}
          kbd="⌘I"
        />
        <Toolbar.Action
          icon={<Underline />}
          label="Underline"
          showLabel={false}
          kbd="⌘U"
        />
        <Toolbar.Action
          icon={<Strikethrough />}
          label="Strikethrough"
          showLabel={false}
        />
        <Toolbar.Action
          icon={<CaseSensitive />}
          label="Font size"
          showLabel={false}
        />
      </Toolbar.Group>
    );
  }

  if (activeTool === 'rect' || activeTool === 'ellipse') {
    return (
      <Toolbar.Group>
        <Toolbar.Action
          icon={<PencilLine />}
          label="Stroke"
          showLabel={false}
        />
        <Toolbar.Action icon={<Grid3X3 />} label="Fill" showLabel={false} />
        <Toolbar.Action
          icon={<Layers />}
          label="Corner radius"
          showLabel={false}
        />
      </Toolbar.Group>
    );
  }

  if (activeTool === 'pen') {
    return (
      <Toolbar.Group>
        <Toolbar.Action label="Close path" showLabel icon={<Pen />} />
        <Toolbar.Action label="Smooth" showLabel />
        <Toolbar.Action label="Corner" showLabel />
      </Toolbar.Group>
    );
  }

  if (activeTool === 'image') {
    return (
      <Toolbar.Group>
        <Toolbar.Action label="Crop" showLabel />
        <Toolbar.Action label="Fit" showLabel />
        <Toolbar.Action label="Fill" showLabel />
        <Toolbar.Action label="Replace" showLabel icon={<Images />} />
      </Toolbar.Group>
    );
  }

  if (activeTool === 'layers') {
    return (
      <Toolbar.Group>
        <Toolbar.Action label="Detach instance" showLabel />
        <Toolbar.Action label="Push changes" showLabel icon={<Send />} />
      </Toolbar.Group>
    );
  }

  return null;
}

export const DesignCanvasStory: StoryObj<typeof Toolbar> = {
  name: 'Design Canvas',
  render: () => {
    const [activeTool, setActiveTool] = useState<CanvasTool>('cursor');
    const [zoom, setZoom] = useState(100);

    const changeZoom = (delta: number) =>
      setZoom((z) => Math.min(400, Math.max(25, z + delta)));

    return (
      <div
        style={{
          position: 'relative',
          marginTop: -8,
          marginLeft: -24,
          marginRight: -24,
          width: 'calc(100% + 48px)',
          height: '100vh',
          overflow: 'hidden',
          background: 'var(--gray-2)',
        }}
      >
        {/* ── Top toolbar ── */}
        <Toolbar placement="top" fixed showBackdrop style={{ zIndex: 100 }}>
          <Toolbar.Leading>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<Undo2 />}
                label="Undo"
                showLabel={false}
                kbd="⌘Z"
              />
              <Toolbar.Action
                icon={<Redo2 />}
                label="Redo"
                showLabel={false}
                kbd="⌘⇧Z"
              />
            </Toolbar.Group>
            <Dropdown
              content={
                <Dropdown.Menu>
                  <Dropdown.Action label="Rename file" />
                  <Dropdown.Action label="Duplicate" />
                  <Dropdown.Action label="Move to project…" />
                  <Dropdown.Action label="Export…" />
                </Dropdown.Menu>
              }
            >
              <Toolbar.Title label="Landing Page 2025" clickable />
            </Dropdown>
          </Toolbar.Leading>

          <Toolbar.Center>
            <CenterToolbarContent activeTool={activeTool} />
          </Toolbar.Center>

          <Toolbar.Trailing>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<ZoomOut />}
                label="Zoom out"
                showLabel={false}
                onClick={() => changeZoom(-25)}
              />
              <Toolbar.Action
                icon={<Maximize2 />}
                label={`${zoom}%`}
                showLabel
                onClick={() => setZoom(100)}
              />
              <Toolbar.Action
                icon={<ZoomIn />}
                label="Zoom in"
                showLabel={false}
                onClick={() => changeZoom(25)}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<Share />}
                label="Share"
                showLabel={false}
                badge="3"
                onClick={() => alert('Share with team')}
              />
              <Toolbar.Action
                icon={<MessageCircle />}
                label="Comments"
                showLabel={false}
                badge="7"
                onClick={() => alert('Open comments panel')}
              />
              <Dropdown
                content={
                  <Dropdown.Menu>
                    <Dropdown.Action label="Presentation mode" kbd="⌘\" />
                    <Dropdown.Action label="Show grid" kbd="⌘'" />
                    <Dropdown.Action label="Show rulers" kbd="⌘R" />
                    <Dropdown.Action label="Export as PNG…" />
                    <Dropdown.Action label="Export as SVG…" />
                  </Dropdown.Menu>
                }
              >
                <Toolbar.Action
                  icon={<Ellipsis />}
                  label="More"
                  showLabel={false}
                />
              </Dropdown>
            </Toolbar.Group>
          </Toolbar.Trailing>
        </Toolbar>

        {/* ── Left toolbar ── */}
        <Toolbar placement="left" fixed style={{ zIndex: 100 }}>
          <Toolbar.Center>
            <Toolbar.Group>
              {TOOLS.map((tool) => (
                <Toolbar.Action
                  key={tool.id}
                  icon={tool.icon}
                  label={tool.label}
                  kbd={tool.kbd}
                  showLabel={false}
                  selected={activeTool === tool.id}
                  onClick={() => setActiveTool(tool.id)}
                />
              ))}
            </Toolbar.Group>
          </Toolbar.Center>
        </Toolbar>

        {/* ── Canvas ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            paddingTop: 56,
            paddingLeft: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: TOOL_CURSOR[activeTool],
          }}
        >
          {/* White page */}
          <div
            style={{
              position: 'relative',
              width: 400,
              height: 480,
              background: 'white',
              borderRadius: 4,
              boxShadow: '0 8px 48px rgba(0,0,0,0.12)',
              transform: `scale(${zoom / 100})`,
              transition: 'transform 0.2s ease',
            }}
          >
            {CANVAS_SHAPES.map((shape, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: shape.x,
                  top: shape.y,
                  width: shape.w,
                  height: shape.h,
                  borderRadius: shape.r,
                  background: shape.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  color: 'var(--text-2)',
                  fontWeight: 500,
                }}
              >
                {shape.label}
              </div>
            ))}
          </div>

          {/* Active tool indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Label color="default" variant="soft">
              {TOOLS.find((t) => t.id === activeTool)?.label} · {zoom}%
            </Label>
          </div>
        </div>
      </div>
    );
  },
};

export const HeaderActionsStory: StoryObj<typeof Toolbar> = {
  name: 'Header Actions',
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [historyIndex, setHistoryIndex] = useState(1);
    const historyLength = 3;

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Text block size={9} weight="bold">
          Toolbar Header Actions
        </Text>
        <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
          A small set of pre-configured <code>Toolbar.Action</code>s for the
          controls a typical app header reaches for over and over — back,
          search, a sidebar toggle, browser-style back/forward history. Each
          is fully controlled: it renders whatever state you pass in and
          calls your handler, without holding any state of its own.
        </Text>

        <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
          Back &amp; Search
        </Text>
        <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
          Icon-only by default, each with a localized{' '}
          <code>aria-label</code> — pass <code>showLabel</code> to reveal
          the text.
        </Text>
        <Toolbar showBackdrop={false}>
          <Toolbar.Leading>
            <Toolbar.Group>
              <Toolbar.BackAction onClick={() => {}} />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.SearchAction onClick={() => {}} />
            </Toolbar.Group>
          </Toolbar.Leading>
        </Toolbar>

        <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
          Sidebar Toggle
        </Text>
        <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
          Controlled by a <code>collapsed</code> boolean — the same value
          you&rsquo;d pass to <code>Screen.Sidebar</code>&rsquo;s own{' '}
          <code>collapsed</code> prop, so both stay in sync from one piece
          of state you own. Icon and label swap automatically.
        </Text>
        <Toolbar showBackdrop={false}>
          <Toolbar.Leading>
            <Toolbar.Group>
              <Toolbar.SidebarToggleAction
                collapsed={sidebarCollapsed}
                onClick={() => setSidebarCollapsed((v) => !v)}
              />
            </Toolbar.Group>
          </Toolbar.Leading>
        </Toolbar>
        <Text size={3} color="muted">
          Sidebar is currently {sidebarCollapsed ? 'collapsed' : 'expanded'}.
        </Text>

        <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
          Back / Forward
        </Text>
        <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
          A single segmented control, browser/macOS-style — not two
          independent buttons. Each half disables on its own when
          there&rsquo;s nowhere left to go.
        </Text>
        <Toolbar showBackdrop={false}>
          <Toolbar.Leading>
            <Toolbar.BackForwardAction
              backDisabled={historyIndex <= 0}
              forwardDisabled={historyIndex >= historyLength - 1}
              onBack={() => setHistoryIndex((i) => Math.max(0, i - 1))}
              onForward={() =>
                setHistoryIndex((i) => Math.min(historyLength - 1, i + 1))
              }
            />
          </Toolbar.Leading>
        </Toolbar>
        <Text size={3} color="muted">
          History position: {historyIndex + 1} of {historyLength}.
        </Text>
      </Flex>
    );
  },
};

export default story;
