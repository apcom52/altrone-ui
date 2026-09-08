import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Toolbar } from './Toolbar.tsx';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bell,
  Bold,
  Circle,
  CaseSensitive,
  Ellipsis,
  Eye,
  Grid3X3,
  Images,
  Italic,
  Layers,
  Maximize2,
  MessageCircle,
  MousePointer2,
  Pen,
  PencilLine,
  Plus,
  RectangleHorizontal,
  Redo2,
  Send,
  Settings,
  Share,
  Strikethrough,
  Trash2,
  Type,
  Underline,
  Undo2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Dropdown } from 'components/dropdown/index.ts';
import { ReactElement, useState } from 'react';
import { Label } from 'components/label/Label.tsx';
import { Avatar } from 'components/avatar/Avatar.tsx';
import { TextInput } from 'components/textInput/TextInput.tsx';
import { Switcher } from 'components/switcher/Switcher.tsx';

const story: Meta<typeof Toolbar> = {
  title: 'Components/Containers/Toolbar',
  component: Toolbar,
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

/* ─────────────────────────────────────────────────────────────
   Overview
   ───────────────────────────────────────────────────────────── */

export const Overview: StoryObj<typeof Toolbar> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 760 }}>
      <Text block size={9} weight="bold">
        Toolbar
      </Text>
      <Text block size={4} style={{ lineHeight: 1.6 }}>
        One horizontal or vertical strip of actions with{' '}
        <Text code>role="toolbar"</Text>, styled after Apple's liquid-glass
        toolbars — <Text code>Toolbar.Group</Text> collects controls into
        blurred glass capsules with a specular top edge. The same component
        dresses up as an application header, a panel header inside a frame, or
        an overlay floating above a canvas.
      </Text>

      <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
        Three variants
      </Text>
      <Text block size={4} style={{ lineHeight: 1.6 }}>
        <Text code>variant</Text> picks how much surface the toolbar carries —{' '}
        <Text code>plain</Text> (nothing, flat buttons), <Text code>floating</Text>{' '}
        (glass group pills over an invisible click-through strip),{' '}
        <Text code>glass</Text> (default — an accent-tinted blurred bar plus the
        pills). The <Text code>Variants</Text> story lays all three side by side.
      </Text>

      <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
        Anatomy
      </Text>
      <Text block size={4} style={{ lineHeight: 1.6 }}>
        Drop actions straight in for a simple bar, or wrap them in{' '}
        <Text code>Toolbar.Leading</Text> / <Text code>Toolbar.Center</Text> /{' '}
        <Text code>Toolbar.Trailing</Text> to get a three-region layout where
        the centre stays optically centred no matter how wide the sides grow.
        Group related actions with <Text code>Toolbar.Group</Text>, push the
        rest to the far edge with a flexible <Text code>Toolbar.Separator</Text>
        , or divide two groups with <Text code>Toolbar.Separator variant="line"</Text>.
      </Text>
      <Toolbar>
        <Toolbar.Leading>
          <Toolbar.Group>
            <Toolbar.Action label="Bold" icon={<Bold />} showLabel={false} />
            <Toolbar.Action label="Italic" icon={<Italic />} showLabel={false} />
          </Toolbar.Group>
          <Toolbar.Separator variant="line" />
          <Toolbar.Group>
            <Toolbar.Action
              label="Align left"
              icon={<AlignLeft />}
              showLabel={false}
            />
            <Toolbar.Action
              label="Align center"
              icon={<AlignCenter />}
              showLabel={false}
            />
          </Toolbar.Group>
        </Toolbar.Leading>
        <Toolbar.Trailing>
          <Toolbar.Action label="Preview" icon={<Eye />} />
        </Toolbar.Trailing>
      </Toolbar>
    </Flex>
  ),
};

/* ─────────────────────────────────────────────────────────────
   Variants
   ───────────────────────────────────────────────────────────── */

const variantSample = (
  <>
    <Toolbar.Leading>
      <Toolbar.Group>
        <Toolbar.Action label="Undo" icon={<Undo2 />} showLabel={false} kbd="⌘Z" />
        <Toolbar.Action
          label="Redo"
          icon={<Redo2 />}
          showLabel={false}
          kbd="⌘⇧Z"
        />
      </Toolbar.Group>
      <Toolbar.Title label="Report.pdf" />
    </Toolbar.Leading>
    <Toolbar.Trailing>
      <Toolbar.Group>
        <Toolbar.Action label="Share" icon={<Share />} showLabel={false} />
        <Toolbar.Action label="Comments" icon={<MessageCircle />} showLabel={false} />
        <Toolbar.Action label="More" icon={<Ellipsis />} showLabel={false} />
      </Toolbar.Group>
    </Toolbar.Trailing>
  </>
);

/** A band of colourful content so the blur / translucency of each variant is visible. */
function SampleContent() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        gap: 12,
        padding: 16,
        paddingTop: 64,
      }}
    >
      {['--accent-4', '--teal-4', '--amber-4', '--purple-4', '--pink-4'].map(
        (c) => (
          <div
            key={c}
            style={{ flex: 1, borderRadius: 8, background: `var(${c})` }}
          />
        ),
      )}
    </div>
  );
}

export const Variants: StoryObj<typeof Toolbar> = {
  name: 'Variants',
  render: () => {
    const cases: {
      variant: 'plain' | 'floating' | 'glass';
      title: string;
      note: string;
    }[] = [
      {
        variant: 'plain',
        title: 'plain',
        note: 'No toolbar fill, no group material — flat text buttons. For a strip on a surface that already has its own background.',
      },
      {
        variant: 'floating',
        title: 'floating',
        note: 'No toolbar fill, but each Toolbar.Group is a raised glass pill. The strip pins to its edge and is click-through between the pills.',
      },
      {
        variant: 'glass',
        title: 'glass — default',
        note: 'Accent-tinted, blurred toolbar fill with a hairline edge, plus the glass group pills. A self-sufficient header.',
      },
    ];

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 760 }}>
        <Text block size={7} weight="bold">
          Variants
        </Text>
        <Text block size={4} style={{ lineHeight: 1.6 }}>
          Same markup in all three — only <Text code>variant</Text> changes. The
          coloured band sits behind each toolbar so the fill and blur are
          visible.
        </Text>

        {cases.map(({ variant, title, note }) => (
          <Flex key={variant} direction="vertical" gap="s">
            <Text size={3} weight="bold">
              {title}
            </Text>
            <Text size={3} color="muted" style={{ lineHeight: 1.5 }}>
              {note}
            </Text>
            <div
              style={{
                position: 'relative',
                height: 160,
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid var(--border-1)',
                background: 'var(--background-2)',
              }}
            >
              <SampleContent />
              <Toolbar variant={variant}>{variantSample}</Toolbar>
            </div>
          </Flex>
        ))}

        <Text block size={5} weight="bold" style={{ marginTop: 8 }}>
          Per-group override
        </Text>
        <Text block size={4} style={{ lineHeight: 1.6 }}>
          A group takes its look from the toolbar, but{' '}
          <Text code>Toolbar.Group variant</Text> overrides it — one raised
          glass pill in an otherwise chrome-less <Text code>plain</Text> bar, or
          a flat cluster inside a <Text code>glass</Text> bar.
        </Text>
        <div
          style={{
            position: 'relative',
            height: 160,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid var(--border-1)',
            background: 'var(--background-2)',
          }}
        >
          <SampleContent />
          <Toolbar variant="plain">
            <Toolbar.Leading>
              <Toolbar.Title label="Report.pdf" />
            </Toolbar.Leading>
            <Toolbar.Trailing>
              <Toolbar.Group variant="glass">
                <Toolbar.Action
                  label="Share"
                  icon={<Share />}
                  showLabel={false}
                />
                <Toolbar.Action
                  label="Comments"
                  icon={<MessageCircle />}
                  showLabel={false}
                />
                <Toolbar.Action
                  label="More"
                  icon={<Ellipsis />}
                  showLabel={false}
                />
              </Toolbar.Group>
            </Toolbar.Trailing>
          </Toolbar>
        </div>
      </Flex>
    );
  },
};

/* ─────────────────────────────────────────────────────────────
   Application header
   ───────────────────────────────────────────────────────────── */

export const ApplicationHeader: StoryObj<typeof Toolbar> = {
  name: 'Application header',
  render: () => {
    const [query, setQuery] = useState('');

    return (
      <Flex direction="vertical" gap="l">
        <Text block size={7} weight="bold">
          Application header
        </Text>
        <Text block size={4} style={{ maxWidth: 720, lineHeight: 1.6 }}>
          The default <Text code>glass</Text> variant with <Text code>sticky</Text>{' '}
          pins the header to the top of the scroll container. A branded title sits in{' '}
          <Text code>Toolbar.Leading</Text>, global search in{' '}
          <Text code>Toolbar.Center</Text>, account and app-level actions in{' '}
          <Text code>Toolbar.Trailing</Text>.
        </Text>

        <div
          style={{
            border: '1px solid var(--border-1)',
            borderRadius: 12,
            overflow: 'hidden',
            height: 320,
            overflowY: 'auto',
            background: 'var(--background-1)',
          }}
        >
          <Toolbar sticky>
            <Toolbar.Leading>
              <Dropdown
                content={
                  <Dropdown.Menu>
                    <Dropdown.Action label="Northwind" />
                    <Dropdown.Action label="Contoso" />
                    <Dropdown.Action label="Add workspace…" />
                  </Dropdown.Menu>
                }
              >
                <Toolbar.Title label="Northwind" clickable />
              </Dropdown>
            </Toolbar.Leading>
            <Toolbar.Center>
              <TextInput
                value={query}
                onChange={(value) => setQuery(value)}
                placeholder="Search everything"
                wrapperStyle={{ width: 280 }}
              />
            </Toolbar.Center>
            <Toolbar.Trailing>
              <Toolbar.Action
                label="Notifications"
                icon={<MessageCircle />}
                showLabel={false}
                badge={3}
              />
              <Toolbar.Action
                label="Settings"
                icon={<Settings />}
                showLabel={false}
              />
              <Avatar firstName="Ada" lastName="Lovelace" size="s" />
            </Toolbar.Trailing>
          </Toolbar>
          <div style={{ padding: 24 }}>
            <Flex direction="vertical" gap="m">
              {Array.from({ length: 12 }).map((_, i) => (
                <Text key={i} block size={4} color="muted">
                  Content row {i + 1} — scroll to watch the header stay put.
                </Text>
              ))}
            </Flex>
          </div>
        </div>
      </Flex>
    );
  },
};

/* ─────────────────────────────────────────────────────────────
   Component doc header (Toolbar.Logo)
   ───────────────────────────────────────────────────────────── */

/** Altrone product mark, sized by its container. */
function AltroneMark() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Altrone"
    >
      <g clipPath="url(#altrone_clip0)">
        <g filter="url(#altrone_filter0_f)">
          <circle cx="24" cy="25" r="11" fill="url(#altrone_paint0)" />
        </g>
        <path
          d="M18.5 38L19.875 28.2H13L25.375 10H28.125L26.75 21.2H35L21.25 38H18.5Z"
          fill="url(#altrone_paint1)"
        />
        <foreignObject x="5" y="14" width="38" height="26">
          <div
            style={{
              backdropFilter: 'blur(2px)',
              clipPath: 'url(#altrone_bgblur_clip)',
              height: '100%',
              width: '100%',
            }}
          />
        </foreignObject>
        <g filter="url(#altrone_filter1_d)" data-figma-bg-blur-radius="4">
          <rect
            x="9"
            y="18"
            width="30"
            height="14"
            rx="4"
            fill="url(#altrone_paint2)"
            shapeRendering="crispEdges"
          />
          <rect
            x="9.5"
            y="18.5"
            width="29"
            height="13"
            rx="3.5"
            stroke="url(#altrone_paint3)"
            shapeRendering="crispEdges"
          />
        </g>
        <g filter="url(#altrone_filter2_di)">
          <path
            d="M22 30L22.5 26.5H20L24.5 20H25.5L25 24H28L23 30H22Z"
            fill="url(#altrone_paint4)"
            shapeRendering="crispEdges"
          />
        </g>
      </g>
      <defs>
        <filter
          id="altrone_filter0_f"
          x="-3"
          y="-2"
          width="54"
          height="54"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="altrone_filter1_d"
          x="5"
          y="14"
          width="38"
          height="26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <clipPath id="altrone_bgblur_clip" transform="translate(-5 -14)">
          <rect x="9" y="18" width="30" height="14" rx="4" />
        </clipPath>
        <filter
          id="altrone_filter2_di"
          x="18.5"
          y="19.5"
          width="11"
          height="14.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.75" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
        <linearGradient
          id="altrone_paint0"
          x1="13"
          y1="14"
          x2="35"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4DF0C4" />
          <stop offset="1" stopColor="#208368" />
        </linearGradient>
        <linearGradient
          id="altrone_paint1"
          x1="13"
          y1="10"
          x2="40.205"
          y2="31.3754"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4DF0C4" />
          <stop offset="1" stopColor="#208368" />
        </linearGradient>
        <linearGradient
          id="altrone_paint2"
          x1="4.5"
          y1="33.4"
          x2="17.2019"
          y2="7.36515"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.2" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="altrone_paint3"
          x1="36"
          y1="33.4"
          x2="27.3231"
          y2="11.1912"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="altrone_paint4"
          x1="18.8"
          y1="31"
          x2="29.9112"
          y2="22.4975"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.2" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <clipPath id="altrone_clip0">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export const ComponentHeader: StoryObj<typeof Toolbar> = {
  name: 'Component doc header',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 760 }}>
      <Text block size={7} weight="bold">
        Component doc header
      </Text>
      <Text block size={4} style={{ lineHeight: 1.6 }}>
        <Text code>Toolbar.Logo</Text> is a slot for the product mark, sized to a
        square that tracks the toolbar <Text code>size</Text>. Here it opens a
        docs header: logo, browser-style back/forward, the page title, then
        search / notifications / overflow on the trailing edge.
      </Text>

      <Toolbar sticky>
        <Toolbar.Leading>
          <Toolbar.Logo>
            <AltroneMark />
          </Toolbar.Logo>
          <Toolbar.BackForwardAction onBack={() => {}} onForward={() => {}} />
          <Toolbar.Title label="Button" />
        </Toolbar.Leading>
        <Toolbar.Trailing>
          <Toolbar.Group>
            <Toolbar.SearchAction onClick={() => {}} />
            <Toolbar.Action
              label="Notifications"
              icon={<Bell />}
              showLabel={false}
              badge={5}
            />
            <Toolbar.Action
              label="More"
              icon={<Ellipsis />}
              showLabel={false}
            />
          </Toolbar.Group>
        </Toolbar.Trailing>
      </Toolbar>

      <Text block size={4} style={{ lineHeight: 1.6 }}>
        Wrap the <Text code>Toolbar.Logo</Text> in an <Text code>{'<a>'}</Text> or
        give it an <Text code>onClick</Text> when it should navigate home.
      </Text>
    </Flex>
  ),
};

/* ─────────────────────────────────────────────────────────────
   Frame / panel toolbar
   ───────────────────────────────────────────────────────────── */

export const FrameToolbar: StoryObj<typeof Toolbar> = {
  name: 'Frame / panel toolbar',
  render: () => {
    const [wrap, setWrap] = useState(true);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Text block size={7} weight="bold">
          Frame / panel toolbar
        </Text>
        <Text block size={4} style={{ lineHeight: 1.6 }}>
          The same <Text code>glass</Text> variant scoped to a single frame — an
          editor pane, a card, a preview window. Here it is the header of a code
          panel: a <Text code>Toolbar.Title</Text>, a live toggle built from{' '}
          <Text code>Switcher</Text>, and a small action cluster on the right.
        </Text>

        <div
          style={{
            border: '1px solid var(--border-1)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <Toolbar size="s">
            <Toolbar.Leading>
              <Toolbar.Title label="index.tsx" />
            </Toolbar.Leading>
            <Toolbar.Trailing>
              <Switcher checked={wrap} onChange={() => setWrap((v) => !v)}>
                Wrap
              </Switcher>
              <Toolbar.Separator variant="line" />
              <Toolbar.Group>
                <Toolbar.Action
                  label="Format"
                  icon={<PencilLine />}
                  showLabel={false}
                  kbd="⇧⌥F"
                />
                <Toolbar.Action
                  label="Copy"
                  icon={<Images />}
                  showLabel={false}
                />
                <Toolbar.Action
                  label="More"
                  icon={<Ellipsis />}
                  showLabel={false}
                />
              </Toolbar.Group>
            </Toolbar.Trailing>
          </Toolbar>
          <pre
            style={{
              margin: 0,
              padding: 20,
              fontSize: 13,
              lineHeight: 1.7,
              color: 'var(--text-11)',
              background: 'var(--background-2)',
              whiteSpace: wrap ? 'pre-wrap' : 'pre',
              overflowX: 'auto',
            }}
          >
            {`export const Panel = () => {\n  return <div className="panel">A tidy little frame with its own toolbar header.</div>;\n};`}
          </pre>
        </div>

        <Text block size={4} style={{ lineHeight: 1.6 }}>
          Drop <Text code>variant="plain"</Text> instead when the frame already
          paints its own header background and you just need the layout.
        </Text>
        <div
          style={{
            border: '1px solid var(--border-1)',
            borderRadius: 12,
            background: 'var(--accent-2)',
            overflow: 'hidden',
          }}
        >
          <Toolbar variant="plain" size="s">
            <Toolbar.Leading>
              <Toolbar.Title label="Selection" />
            </Toolbar.Leading>
            <Toolbar.Trailing>
              <Toolbar.Action label="Duplicate" icon={<Images />} />
              <Toolbar.Action label="Delete" icon={<Trash2 />} danger />
            </Toolbar.Trailing>
          </Toolbar>
        </div>
      </Flex>
    );
  },
};

/* ─────────────────────────────────────────────────────────────
   Sizes
   ───────────────────────────────────────────────────────────── */

export const Sizes: StoryObj<typeof Toolbar> = {
  name: 'Sizes',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={7} weight="bold">
        Sizes
      </Text>
      <Text block size={4} style={{ lineHeight: 1.6 }}>
        <Text code>size</Text> sets the toolbar height and inset, cascades as the
        default <Text code>size</Text> of every <Text code>Toolbar.Action</Text>{' '}
        inside it, and scales <Text code>Toolbar.Title</Text> to match — the
        whole strip grows from one prop.
      </Text>
      {(['mini', 's', 'm', 'l', 'xl'] as const).map((size) => (
        <Flex key={size} direction="vertical" gap="s">
          <Text size={3} color="muted">
            size="{size}"
          </Text>
          <Toolbar size={size}>
            <Toolbar.Leading>
              <Dropdown
                content={
                  <Dropdown.Menu>
                    <Dropdown.Action label="Documents" />
                    <Dropdown.Action label="Shared with me" />
                    <Dropdown.Action label="Trash" />
                  </Dropdown.Menu>
                }
              >
                <Toolbar.Title label="Documents" clickable />
              </Dropdown>
            </Toolbar.Leading>
            <Toolbar.Trailing>
              <Toolbar.Action label="New" icon={<Plus />} showLabel={false} />
              <Toolbar.Action label="Share" icon={<Share />} showLabel={false} />
              <Toolbar.Action
                label="Settings"
                icon={<Settings />}
                showLabel={false}
              />
            </Toolbar.Trailing>
          </Toolbar>
        </Flex>
      ))}
    </Flex>
  ),
};

/* ─────────────────────────────────────────────────────────────
   Title
   ───────────────────────────────────────────────────────────── */

export const TitleStates: StoryObj<typeof Toolbar> = {
  name: 'Title — static vs. menu',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={7} weight="bold">
        Title
      </Text>
      <Text block size={4} style={{ lineHeight: 1.6 }}>
        A plain <Text code>Toolbar.Title</Text> is just text. Add{' '}
        <Text code>clickable</Text> when it opens a menu — it grows a chevron and
        a pointer cursor, and you wrap it in a <Text code>Dropdown</Text> that
        supplies the menu. Either way the title scales with the toolbar{' '}
        <Text code>size</Text>.
      </Text>

      <Flex direction="vertical" gap="s">
        <Text size={3} color="muted">
          static
        </Text>
        <Toolbar>
          <Toolbar.Leading>
            <Toolbar.Title label="Untitled document" />
          </Toolbar.Leading>
          <Toolbar.Trailing>
            <Toolbar.Action label="Share" icon={<Share />} showLabel={false} />
          </Toolbar.Trailing>
        </Toolbar>
      </Flex>

      <Flex direction="vertical" gap="s">
        <Text size={3} color="muted">
          clickable — opens a Dropdown menu
        </Text>
        <Toolbar>
          <Toolbar.Leading>
            <Dropdown
              content={
                <Dropdown.Menu>
                  <Dropdown.Action label="Rename" />
                  <Dropdown.Action label="Move to…" />
                  <Dropdown.Action label="Version history" />
                </Dropdown.Menu>
              }
            >
              <Toolbar.Title label="Q3 planning" clickable />
            </Dropdown>
          </Toolbar.Leading>
          <Toolbar.Trailing>
            <Toolbar.Action label="Share" icon={<Share />} showLabel={false} />
          </Toolbar.Trailing>
        </Toolbar>
      </Flex>

      <Flex direction="vertical" gap="s">
        <Text size={3} color="muted">
          clickable at size="s" / "l" / "xl"
        </Text>
        {(['s', 'l', 'xl'] as const).map((size) => (
          <Toolbar key={size} size={size}>
            <Toolbar.Leading>
              <Dropdown
                content={
                  <Dropdown.Menu>
                    <Dropdown.Action label="Switch workspace" />
                  </Dropdown.Menu>
                }
              >
                <Toolbar.Title label="Acme Corp" clickable />
              </Dropdown>
            </Toolbar.Leading>
          </Toolbar>
        ))}
      </Flex>
    </Flex>
  ),
};

/* ─────────────────────────────────────────────────────────────
   Vertical rail
   ───────────────────────────────────────────────────────────── */

export const VerticalRail: StoryObj<typeof Toolbar> = {
  name: 'Vertical rail',
  render: () => {
    const [tool, setTool] = useState('select');
    const tools = [
      { id: 'select', icon: <MousePointer2 />, label: 'Select', kbd: 'V' },
      { id: 'rect', icon: <RectangleHorizontal />, label: 'Rectangle', kbd: 'R' },
      { id: 'ellipse', icon: <Circle />, label: 'Ellipse', kbd: 'O' },
      { id: 'text', icon: <Type />, label: 'Text', kbd: 'T' },
      { id: 'pen', icon: <Pen />, label: 'Pen', kbd: 'P' },
    ];

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Text block size={7} weight="bold">
          Vertical rail
        </Text>
        <Text block size={4} style={{ lineHeight: 1.6 }}>
          <Text code>placement="left"</Text> (or <Text code>"right"</Text>) turns
          the toolbar on its side, flips <Text code>aria-orientation</Text> to{' '}
          <Text code>vertical</Text>, and stacks regions top-to-bottom. Actions
          go icon-only with a tooltip.
        </Text>

        <div
          style={{
            position: 'relative',
            height: 340,
            border: '1px solid var(--border-1)',
            borderRadius: 12,
            overflow: 'hidden',
            background: 'var(--background-2)',
          }}
        >
          <Toolbar placement="left">
            <Toolbar.Center>
              <Toolbar.Group>
                {tools.map((t) => (
                  <Toolbar.Action
                    key={t.id}
                    icon={t.icon}
                    label={t.label}
                    kbd={t.kbd}
                    showLabel={false}
                    selected={tool === t.id}
                    onClick={() => setTool(t.id)}
                  />
                ))}
              </Toolbar.Group>
            </Toolbar.Center>
          </Toolbar>
          <Flex
            style={{ height: '100%', paddingLeft: 56 }}
            justify="center"
            align="center"
          >
            <Label variant="soft">Active tool: {tool}</Label>
          </Flex>
        </div>
      </Flex>
    );
  },
};

/* ─────────────────────────────────────────────────────────────
   Header action presets
   ───────────────────────────────────────────────────────────── */

export const HeaderActions: StoryObj<typeof Toolbar> = {
  name: 'Header action presets',
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [historyIndex, setHistoryIndex] = useState(1);
    const historyLength = 3;

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Text block size={7} weight="bold">
          Header action presets
        </Text>
        <Text block size={4} style={{ lineHeight: 1.6 }}>
          Pre-composed <Text code>Toolbar.Action</Text>s for the controls a
          typical header reaches for over and over. Each is fully controlled —
          it renders the state you pass and calls your handler, holding nothing
          of its own — and icon-only by default with a localized{' '}
          <Text code>aria-label</Text>.
        </Text>

        <Text block size={5} weight="bold" style={{ marginTop: 8 }}>
          Back &amp; Search
        </Text>
        <Toolbar>
          <Toolbar.Leading>
            <Toolbar.Group>
              <Toolbar.BackAction onClick={() => {}} />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.SearchAction onClick={() => {}} />
            </Toolbar.Group>
          </Toolbar.Leading>
        </Toolbar>

        <Text block size={5} weight="bold" style={{ marginTop: 8 }}>
          Sidebar toggle
        </Text>
        <Text block size={4} style={{ lineHeight: 1.6 }}>
          Drive it from the same <Text code>collapsed</Text> boolean you pass to{' '}
          <Text code>Screen.Sidebar</Text> so the two stay in sync. Icon and
          label swap automatically.
        </Text>
        <Toolbar>
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

        <Text block size={5} weight="bold" style={{ marginTop: 8 }}>
          Back / Forward
        </Text>
        <Text block size={4} style={{ lineHeight: 1.6 }}>
          One segmented control, browser/macOS-style — not two loose buttons.
          Each half disables on its own when there is nowhere left to go, and it
          renders its own <Text code>Toolbar.Group</Text> (do not wrap it).
        </Text>
        <Toolbar>
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

/* ─────────────────────────────────────────────────────────────
   Floating overlay — design canvas
   ───────────────────────────────────────────────────────────── */

type CanvasTool = 'cursor' | 'rect' | 'ellipse' | 'text' | 'pen';

const TOOLS: {
  id: CanvasTool;
  icon: ReactElement;
  label: string;
  kbd: string;
}[] = [
  { id: 'cursor', icon: <MousePointer2 />, label: 'Move', kbd: 'V' },
  { id: 'rect', icon: <RectangleHorizontal />, label: 'Rectangle', kbd: 'R' },
  { id: 'ellipse', icon: <Circle />, label: 'Ellipse', kbd: 'O' },
  { id: 'text', icon: <Type />, label: 'Text', kbd: 'T' },
  { id: 'pen', icon: <Pen />, label: 'Pen', kbd: 'P' },
];

function CenterToolbarContent({ activeTool }: { activeTool: CanvasTool }) {
  if (activeTool === 'cursor') {
    return (
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
    );
  }

  if (activeTool === 'text') {
    return (
      <Toolbar.Group>
        <Toolbar.Action icon={<Bold />} label="Bold" showLabel={false} kbd="⌘B" />
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
        <Toolbar.Action icon={<PencilLine />} label="Stroke" showLabel={false} />
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

  return null;
}

const CANVAS_SHAPES = [
  { x: 60, y: 60, w: 280, h: 160, r: 12, bg: 'var(--accent-3)', label: 'Hero' },
  { x: 60, y: 240, w: 130, h: 80, r: 8, bg: 'var(--teal-3)', label: 'Card A' },
  { x: 210, y: 240, w: 130, h: 80, r: 8, bg: 'var(--amber-3)', label: 'Card B' },
  { x: 60, y: 340, w: 280, h: 40, r: 20, bg: 'var(--accent-9)', label: '' },
];

export const FloatingOverlay: StoryObj<typeof Toolbar> = {
  name: 'Floating overlay (design canvas)',
  render: () => {
    const [activeTool, setActiveTool] = useState<CanvasTool>('cursor');
    const [zoom, setZoom] = useState(100);

    const changeZoom = (delta: number) =>
      setZoom((z) => Math.min(400, Math.max(25, z + delta)));

    return (
      <Flex direction="vertical" gap="m">
        <Text block size={7} weight="bold">
          Floating overlay
        </Text>
        <Text block size={4} style={{ maxWidth: 720, lineHeight: 1.6 }}>
          <Text code>variant="floating"</Text> pins the toolbar to its{' '}
          <Text code>placement</Text> edge inside the nearest positioned
          ancestor and turns the strip click-through — only the{' '}
          <Text code>Toolbar.Group</Text> glass pills stay interactive, so the
          canvas underneath keeps receiving the pointer. Add{' '}
          <Text code>showBackdrop</Text> for a scrim that lifts the pills off
          busy content.
        </Text>

        <div
          style={{
            position: 'relative',
            height: 460,
            borderRadius: 12,
            overflow: 'hidden',
            background: 'var(--gray-2)',
          }}
        >
          <Toolbar
            variant="floating"
            placement="top"
            showBackdrop
            style={{ zIndex: 100 }}
          >
            <Toolbar.Leading>
              <Toolbar.Group>
                <Toolbar.Action
                  icon={<Undo2 />}
                  label="Undo"
                  showLabel={false}
                  kbd="⌘Z"
                  onClick={() => {}}
                />
                <Toolbar.Action
                  icon={<Redo2 />}
                  label="Redo"
                  showLabel={false}
                  kbd="⌘⇧Z"
                  onClick={() => {}}
                />
              </Toolbar.Group>
              <Dropdown
                content={
                  <Dropdown.Menu>
                    <Dropdown.Action label="Rename file" />
                    <Dropdown.Action label="Duplicate" />
                    <Dropdown.Action label="Export…" />
                  </Dropdown.Menu>
                }
              >
                <Toolbar.Title label="Landing Page" clickable />
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
                  onClick={() => {}}
                />
                <Toolbar.Action
                  icon={<Send />}
                  label="Publish"
                  showLabel={false}
                  onClick={() => {}}
                />
              </Toolbar.Group>
            </Toolbar.Trailing>
          </Toolbar>

          <Toolbar
            variant="floating"
            placement="left"
            style={{ zIndex: 100 }}
          >
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

          <div
            style={{
              position: 'absolute',
              inset: 0,
              paddingTop: 56,
              paddingLeft: 72,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 400,
                height: 420,
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

            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <Label variant="soft">
                {TOOLS.find((t) => t.id === activeTool)?.label} · {zoom}%
              </Label>
            </div>
          </div>
        </div>
      </Flex>
    );
  },
};
