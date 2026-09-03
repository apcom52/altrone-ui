import { Meta, StoryObj } from '@storybook/react';
import { Box, CloseButton, Flex, Range, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { BoxMaterial, BoxShape, BoxTone, BoxElevation } from './Box.types.ts';
import { useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Bell,
  Bold,
  Check,
  Clock,
  Download,
  Filter,
  Hash,
  Heart,
  Italic,
  Loader,
  Minus,
  Plus,
  Rocket,
  Search,
  Sparkles,
  Underline,
  Wifi,
  X,
} from 'lucide-react';
import './boxStory.css';

const story: Meta<typeof Box> = {
  title: 'Components/Core/Box',
  component: Box,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

const chromaticBoth = {
  chromatic: {
    modes: {
      light: allModes['light desktop'],
      dark: allModes['dark desktop'],
    },
  },
};

const Heading = ({ children }: { children: string }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Subheading = ({ children }: { children: string }) => (
  <Text block size={5} weight="bold">
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 680, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text size={2} color="muted" style={{ letterSpacing: '0.02em' }}>
    {children}
  </Text>
);

/** A caption + swatch column, reused across the matrices below. */
const Cell = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Flex direction="vertical" gap="xs" align="center" style={{ width: 92 }}>
    {children}
    <Label>{label}</Label>
  </Flex>
);

/* ---------------------------------------------------------------------- */
/* Overview                                                                */
/* ---------------------------------------------------------------------- */

export const Overview: StoryObj<typeof Box> = {
  name: 'Overview',
  parameters: chromaticBoth,
  render: () => (
    <div className="box-wrapper">
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Text block size={9} weight="bold">
          Box
        </Text>
        <Paragraph>
          <Text code>Box</Text> is the shared visual primitive behind
          &ldquo;chip-like&rdquo; components — <Text code>Button</Text>,{' '}
          <Text code>Badge</Text>, <Text code>Tag</Text>,{' '}
          <Text code>Avatar</Text>, a card. It isn&rsquo;t for structurally
          complex components like <Text code>Splitter</Text> or{' '}
          <Text code>DataGrid</Text> — those use <Text code>Box</Text> for
          individual internal parts (e.g. <Text code>Splitter.Divider</Text>),
          not as their whole implementation.
        </Paragraph>
        <Paragraph>
          Four independent axes describe how a <Text code>Box</Text> looks:{' '}
          <Text code>shape</Text> (the corner algorithm),{' '}
          <Text code>material</Text> (fill/blur/border treatment),{' '}
          <Text code>tone</Text> (which color), and <Text code>elevation</Text>{' '}
          (z-index + shadow, see <Text code>elevation.md</Text>
          ). None of them own state — every interaction (
          <Text code>pressable</Text>/<Text code>focusable</Text>/
          <Text code>editable</Text>) is pure CSS, because <Text code>Box</Text>{' '}
          underlies almost every component in the library; giving it React state
          would cascade the whole library into{' '}
          <Text code>&apos;use client&apos;</Text>.
        </Paragraph>

        <Subheading>The same primitive, worn six different ways</Subheading>
        <Flex gap="m" align="center" wrap>
          <Box material="solid" tone="accent" size="s">
            <Text size={3} weight="medium" style={{ color: 'inherit' }}>
              New
            </Text>
          </Box>
          <Box material="outline" tone="neutral" size="s">
            <Text size={3} weight="medium">
              Draft
            </Text>
          </Box>
          <Box material="translucent" tone="danger" size="s">
            <Text size={3} weight="medium" style={{ color: 'inherit' }}>
              3 issues
            </Text>
          </Box>
          <Box material="glass" tone="success" size="s" shape="pill">
            <Flex gap="xs" align="center">
              <Check size={12} />
              <Text size={3} weight="medium" style={{ color: 'inherit' }}>
                Paid
              </Text>
            </Flex>
          </Box>
          <Box shape="circle" material="solid" tone="success" size="l">
            <Bell size={16} />
          </Box>
        </Flex>

        <Subheading>A whole notification, built only from Box</Subheading>
        <Box
          material="glass"
          tone="neutral"
          elevation="toast"
          shape="squircle"
          radius={48}
          style={{
            gap: 12,
            padding: 14,
            maxWidth: 380,
            justifyContent: 'flex-start',
          }}
        >
          <Box shape="circle" material="translucent" tone="accent" size="xl">
            <Sparkles size={24} />
          </Box>
          <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
            <Text size={4} weight="bold">
              Deploy finished
            </Text>
            <Text size={3} color="muted">
              altrone-ui@4.0.0 is live on npm — 2 minutes ago.
            </Text>
          </Flex>
          <CloseButton />
        </Box>
      </Flex>
    </div>
  ),
};

/* ---------------------------------------------------------------------- */
/* Shape                                                                   */
/* ---------------------------------------------------------------------- */

const ShapePlayground = () => {
  const [outer, setOuter] = useState(20);
  const shapes: BoxShape[] = ['rect', 'rounded', 'squircle', 'circle', 'pill'];

  return (
    <Flex direction="vertical" gap="m">
      <div style={{ width: 240 }}>
        <Text block size={3} weight="medium">
          Ambient --radius-outer
        </Text>
        <Range
          min={0}
          max={40}
          value={outer}
          onChange={setOuter}
          renderLabel={(value) => `${value}px`}
          showCurrentValue="always"
        />
      </div>
      <div style={{ ['--radius-outer' as string]: `${outer}px` }}>
        <Flex gap="l" align="center">
          {shapes.map((shape) => (
            <Flex key={shape} direction="vertical" gap="s" align="center">
              <Box
                shape={shape}
                material="solid"
                tone="accent"
                size="xl"
                style={{ width: 100 }}
                elevation="sticky"
              />
              <Text size={3} color="muted">
                {shape}
              </Text>
            </Flex>
          ))}
        </Flex>
      </div>
      <Paragraph>
        Drag the slider — <Text code>rounded</Text> and{' '}
        <Text code>squircle</Text> track the ambient radius exactly like any
        other descendant in the concentric radius system (
        <Text code>radius.md</Text>). <Text code>rect</Text> stays square no
        matter what — <Text code>shape</Text> picks the corner{' '}
        <em>algorithm</em>, not how much rounding there is.{' '}
        <Text code>circle</Text> ignores the radius system entirely and locks to
        a square aspect ratio, which is why it&rsquo;s the shape{' '}
        <Text code>Avatar</Text> uses. <Text code>pill</Text> also ignores the
        ambient radius — it forces fully-round capsule ends and keeps that shape
        at any <Text code>size</Text> or width, without constraining the aspect
        ratio the way <Text code>circle</Text> does.
      </Paragraph>
    </Flex>
  );
};

/** Circle keeps a 1:1 box at every size — the reason Avatar leans on it. */
const CircleSizeRow = () => {
  const sizes = [
    { size: 'mini' as const, label: 'mini' },
    { size: 's' as const, label: 's' },
    { size: 'm' as const, label: 'm' },
    { size: 'l' as const, label: 'l' },
    { size: 'xl' as const, label: 'xl' },
    { size: 72, label: '72px' },
  ];

  return (
    <Flex gap="m" align="center">
      {sizes.map(({ size, label }) => (
        <Cell key={label} label={label}>
          <Box
            shape="circle"
            material="solid"
            tone="accent"
            size={size}
            elevation="overlay"
          />
        </Cell>
      ))}
    </Flex>
  );
};

/** Pill keeps fully-round ends at every size, without forcing a 1:1 box. */
const PillSizeRow = () => {
  const sizes = ['mini', 's', 'm', 'l', 'xl'] as const;
  const sizesLabels = ['mini', 'small', 'medium', 'large', 'x-large'];

  return (
    <Flex gap="m" align="center" wrap>
      {sizes.map((size, sizeIndex) => (
        <Cell key={size} label={size}>
          <Box shape="pill" material="outline" tone="accent" size={size}>
            <Text size={2} weight="medium" style={{ color: 'inherit' }}>
              {sizesLabels[sizeIndex]}
            </Text>
          </Box>
        </Cell>
      ))}
    </Flex>
  );
};

/** The `radius` prop overriding the nominal corner radius on rounded / squircle. */
const RadiusOverrideRow = () => (
  <Flex gap="l" align="center" wrap>
    <Cell label="composition">
      <Box
        shape="squircle"
        material="solid"
        tone="accent"
        size={64}
        padding={8}
        radius={20}
      >
        <Box
          shape="squircle"
          material="solid"
          tone="success"
          size="48px"
          radius={12}
        />
      </Box>
    </Cell>
    <Cell label="rounded · radius 24">
      <Box
        shape="rounded"
        material="solid"
        tone="accent"
        radius={24}
        style={{ width: 96, height: 72 }}
      />
    </Cell>
    <Cell label="squircle · radius 24">
      <Box
        shape="squircle"
        material="solid"
        tone="accent"
        radius={24}
        style={{ width: 96, height: 72 }}
      />
    </Cell>
    <Cell label="squircle · token">
      <Box
        shape="squircle"
        material="solid"
        tone="accent"
        radius="var(--radius-xl)"
        style={{ width: 96, height: 72 }}
      />
    </Cell>
  </Flex>
);

/** Which shape the real components reach for, and why. */
const ShapeInTheWild = () => (
  <Flex gap="xl" wrap align="start">
    <Flex direction="vertical" gap="s" align="center" style={{ width: 140 }}>
      <Box shape="circle" material="solid" tone="accent" size="xl">
        <Text size={4} weight="bold" style={{ color: 'inherit' }}>
          AP
        </Text>
      </Box>
      <Label>circle → Avatar</Label>
    </Flex>
    <Flex direction="vertical" gap="s" align="center" style={{ width: 140 }}>
      <Box shape="rounded" material="translucent" tone="success" size="s">
        <Text size={3} weight="medium" style={{ color: 'inherit' }}>
          stable
        </Text>
      </Box>
      <Label>rounded → Tag / Badge</Label>
    </Flex>
    <Flex direction="vertical" gap="s" align="center" style={{ width: 140 }}>
      <Box
        shape="squircle"
        material="solid"
        tone="neutral"
        elevation="raised"
        style={{ width: 120, height: 64 }}
      />
      <Label>squircle → Card</Label>
    </Flex>
    <Flex direction="vertical" gap="s" align="center" style={{ width: 140 }}>
      <Box shape="pill" material="translucent" tone="accent" size="s" pressable>
        <Flex gap="xs" align="center">
          <Check size={12} />
          <Text size={3} weight="medium" style={{ color: 'inherit' }}>
            Active
          </Text>
        </Flex>
      </Box>
      <Label>pill → filter chip</Label>
    </Flex>
    <Flex direction="vertical" gap="s" align="center" style={{ width: 140 }}>
      <Flex gap="none">
        <Box shape="rect" material="outline" tone="neutral" size="s">
          <Text size={3}>Q1</Text>
        </Box>
        <Box shape="rect" material="outline" tone="neutral" size="s">
          <Text size={3}>Q2</Text>
        </Box>
        <Box shape="rect" material="outline" tone="neutral" size="s">
          <Text size={3}>Q3</Text>
        </Box>
      </Flex>
      <Label>rect → table / grid cells</Label>
    </Flex>
  </Flex>
);

export const Shapes: StoryObj<typeof Box> = {
  name: 'Shapes',
  parameters: chromaticBoth,
  render: () => (
    <div className="box-wrapper">
      <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
        <Heading>Shape is an algorithm, not a radius value</Heading>
        <ShapePlayground />

        <Heading>Circle always stays a square box</Heading>
        <Paragraph>
          Whatever the <Text code>size</Text>, <Text code>circle</Text> forces a
          1:1 aspect ratio and a 50% radius — the rounding never depends on the
          ambient radius scale. That predictability is exactly what{' '}
          <Text code>Avatar</Text> needs: a face is a face at any size.
        </Paragraph>
        <CircleSizeRow />

        <Heading>Pill always keeps capsule ends</Heading>
        <Paragraph>
          <Text code>pill</Text> forces fully-round ends no matter the{' '}
          <Text code>size</Text> or the content width, and — unlike{' '}
          <Text code>circle</Text> — never constrains the aspect ratio. It also
          ignores the ambient <Text code>--radius-outer</Text>. This is the
          shape for filter chips, segmented controls, and tag-style toggles.
        </Paragraph>
        <PillSizeRow />

        <Heading>Seeding the radius scope directly</Heading>
        <Paragraph>
          When a <Text code>Box</Text> needs a specific radius rather than the
          inherited one — a standalone card, say — pass <Text code>radius</Text>
          . It just seeds <Text code>--radius-outer</Text> on that element, so{' '}
          <Text code>rounded</Text>/<Text code>squircle</Text> round to it{' '}
          <em>and</em> nested boxes inherit the same value through the cascade.
          A number is px, a string is used verbatim, e.g.{' '}
          <Text code>radius=&quot;var(--radius-xl)&quot;</Text>.{' '}
          <Text code>rect</Text>/<Text code>circle</Text>/<Text code>pill</Text>{' '}
          force their own radius and ignore it.
        </Paragraph>
        <Paragraph>
          For <Text code>squircle</Text> the value is what a browser with{' '}
          <Text code>corner-shape</Text> support rounds to. Browsers without it
          fall back to a plain <Text code>border-radius</Text>, which carves a
          visibly larger corner at the same number — so the fallback is scaled
          down by <Text code>--squircle-fallback-ratio</Text> (0.5) to keep the
          corner looking about as full as the real squircle. That correction is
          automatic; nothing to pass.
        </Paragraph>
        <RadiusOverrideRow />

        <Heading>Which shape each component reaches for</Heading>
        <ShapeInTheWild />
      </Flex>
    </div>
  ),
};

/* ---------------------------------------------------------------------- */
/* Sizes                                                                   */
/* ---------------------------------------------------------------------- */

const namedSizes = ['mini', 's', 'm', 'l', 'xl'] as const;

/** The built-in tiers: each sets both the box dimension and the control padding. */
const NamedSizeRow = () => (
  <Flex gap="m" align="center" wrap>
    {namedSizes.map((size) => (
      <Cell key={size} label={size}>
        <Box shape="circle" material="solid" tone="accent" size={size} />
      </Cell>
    ))}
  </Flex>
);

/** An arbitrary `size` makes a square; `width`/`height` override it per axis. */
const CustomSizeRow = () => (
  <Flex gap="m" align="center" wrap>
    <Cell label="size 28">
      <Box material="translucent" tone="accent" size={28} />
    </Cell>
    <Cell label='size "3em"'>
      <Box material="translucent" tone="accent" size="3em" />
    </Cell>
    <Cell label="size 64">
      <Box material="translucent" tone="accent" size={64} />
    </Cell>
    <Cell label="width 96 · height 40">
      <Box material="translucent" tone="accent" width={96} height={40} />
    </Cell>
  </Flex>
);

/** `padding` overriding the tier value — tighter, wider, and per-axis. */
const PaddingRow = () => (
  <Flex gap="l" align="center" wrap>
    <Cell label="tier default">
      <Box material="outline" tone="neutral">
        <Text size={3}>m</Text>
      </Box>
    </Cell>
    <Cell label="padding 4">
      <Box material="outline" tone="neutral" padding={4}>
        <Text size={3}>4</Text>
      </Box>
    </Cell>
    <Cell label="padding 20">
      <Box material="outline" tone="neutral" padding={20}>
        <Text size={3}>20</Text>
      </Box>
    </Cell>
    <Cell label="x 24 · y 6">
      <Box material="outline" tone="neutral" padding={{ x: 24, y: 6 }}>
        <Text size={3}>x/y</Text>
      </Box>
    </Cell>
  </Flex>
);

export const Sizes: StoryObj<typeof Box> = {
  name: 'Sizes',
  parameters: chromaticBoth,
  render: () => (
    <div className="box-wrapper">
      <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
        <Heading>Named tiers</Heading>
        <Paragraph>
          <Text code>size</Text> takes the same <Text code>mini</Text>/
          <Text code>s</Text>/<Text code>m</Text>/<Text code>l</Text>/
          <Text code>xl</Text> dictionary as the rest of the library. Each tier
          drives the box dimension (<Text code>--box-size</Text>) and the
          control padding together, so a tier change scales the whole thing
          coherently.
        </Paragraph>
        <NamedSizeRow />

        <Heading>An arbitrary size, or explicit width / height</Heading>
        <Paragraph>
          <Text code>size</Text> also accepts a number (px) or a CSS string (
          <Text code>&quot;12px&quot;</Text>, <Text code>&quot;8em&quot;</Text>,{' '}
          <Text code>&quot;50%&quot;</Text>). An arbitrary value turns the box
          into a <em>square</em> of that size — a named tier doesn&rsquo;t, it
          only sets the control height and padding. For a non-square box pass{' '}
          <Text code>width</Text> and/or <Text code>height</Text> (number = px);
          they take priority over <Text code>size</Text>. None of these touch
          the padding — use <Text code>padding</Text> for that.
        </Paragraph>
        <CustomSizeRow />

        <Heading>Overriding the padding</Heading>
        <Paragraph>
          <Text code>padding</Text> overrides the value the tier would set — a
          number (px), a string used verbatim (
          <Text code>padding=&quot;var(--space-content)&quot;</Text>
          ), or <Text code>&#123;&#123; x, y &#125;&#125;</Text> per axis. It
          only touches this box&rsquo;s own inset; it doesn&rsquo;t adjust the
          radius of anything nested inside.
        </Paragraph>
        <PaddingRow />
      </Flex>
    </div>
  ),
};

/* ---------------------------------------------------------------------- */
/* Materials                                                               */
/* ---------------------------------------------------------------------- */

const materials: BoxMaterial[] = [
  'solid',
  'glass',
  'plate',
  'translucent',
  'transparent',
  'outline',
  'ghost',
];

const MaterialRow = () => (
  <Flex gap="m" wrap>
    {materials.map((material) => (
      <div key={material} style={{ width: 110 }}>
        <Box material={material} tone="accent" pressable size="l">
          <Text
            size={3}
            weight="medium"
            style={{ color: material === 'solid' ? 'inherit' : undefined }}
          >
            {material}
          </Text>
        </Box>
      </div>
    ))}
  </Flex>
);

/** The same materials over a busy panel — where `glass`/`plate` finally read. */
const MaterialsOverPhoto = () => (
  <div className="box-photo">
    <Flex gap="m" wrap>
      {materials.map((material) => (
        <Box
          key={material}
          material={material}
          tone="neutral"
          size="l"
          style={{ minWidth: 104 }}
        >
          <Text
            size={3}
            weight="medium"
            style={{ color: material === 'solid' ? 'inherit' : '#fff' }}
          >
            {material}
          </Text>
        </Box>
      ))}
    </Flex>
    <span className="box-photo-caption">busy background</span>
  </div>
);

/** material × tone — every fill treatment against every semantic hue. */
const MaterialToneMatrix = () => {
  const tonesForMatrix: BoxTone[] = [
    'neutral',
    'accent',
    'danger',
    'success',
    'warning',
  ];

  return (
    <Flex direction="vertical" gap="s">
      {materials.map((material) => (
        <Flex key={material} gap="s" align="center">
          <Label>
            <span style={{ display: 'inline-block', width: 84 }}>
              {material}
            </span>
          </Label>
          {tonesForMatrix.map((tone) => (
            <Box
              key={tone}
              material={material}
              tone={tone}
              size="s"
              style={{ width: 72 }}
            >
              <Text
                size={2}
                weight="medium"
                style={{ color: material === 'solid' ? 'inherit' : undefined }}
              >
                {tone}
              </Text>
            </Box>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

/** Materials read as a button hierarchy: primary → secondary → quiet. */
const ButtonHierarchy = () => {
  const buttons: {
    material: BoxMaterial;
    tone: BoxTone;
    label: string;
    icon: typeof Rocket;
  }[] = [
    { material: 'solid', tone: 'accent', label: 'Deploy', icon: Rocket },
    { material: 'outline', tone: 'neutral', label: 'Preview', icon: Search },
    { material: 'translucent', tone: 'accent', label: 'Share', icon: Download },
    { material: 'ghost', tone: 'neutral', label: 'Cancel', icon: X },
  ];

  return (
    <Flex gap="m" align="center" wrap>
      {buttons.map(({ material, tone, label, icon: Icon }) => (
        <Box
          key={label}
          material={material}
          tone={tone}
          size="l"
          pressable
          focusable
          shape="squircle"
          radius={20}
          style={{ gap: 8 }}
        >
          <Icon size={15} />
          <Text
            size={3}
            weight="medium"
            style={{ color: material === 'solid' ? 'inherit' : undefined }}
          >
            {label}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export const Materials: StoryObj<typeof Box> = {
  name: 'Materials',
  parameters: chromaticBoth,
  render: () => (
    <div className="box-wrapper">
      <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
        <Heading>Seven fill treatments, one shared interaction model</Heading>
        <Paragraph>
          Each material differs in what&rsquo;s there at rest — a full fill (
          <Text code>solid</Text>), a blurred translucent one (
          <Text code>glass</Text>), that same frosted fill plus a hairline edge
          and a resting shadow so it reads as raised off the surface (
          <Text code>plate</Text>), a flat translucent one (
          <Text code>translucent</Text>), nothing at all (
          <Text code>transparent</Text>), a static border (
          <Text code>outline</Text>), or a border that only shows up on
          interaction (<Text code>ghost</Text>).
        </Paragraph>
        <Paragraph>
          Every <Text code>pressable</Text> material reacts the same way in two
          steps: hover is a lighter preview — a brightness nudge on the
          fill-bearing materials, a faint wash brought in on the ones with
          nothing at rest — and a press takes that one step further (stronger
          alpha, more backdrop saturation, a firmer border). Hover always yields
          to the press. Move the pointer over the chips below, then click and
          hold.
        </Paragraph>
        <MaterialRow />

        <Heading>Glass only earns its keep over busy content</Heading>
        <Paragraph>
          On a flat page <Text code>glass</Text> and{' '}
          <Text code>translucent</Text> look nearly identical — the{' '}
          <Text code>backdrop-filter</Text> has nothing to blur. Put the same
          row over a photo or a dense layout and the difference is the whole
          point: <Text code>glass</Text> frosts what&rsquo;s behind it,{' '}
          <Text code>translucent</Text> just tints it.
        </Paragraph>
        <MaterialsOverPhoto />

        <Heading>Every material, against every tone</Heading>
        <Paragraph>
          <Text code>material</Text> and <Text code>tone</Text> are independent
          axes — the material decides <em>how much</em> of the tone shows (a
          solid fill, a faint wash, an edge), the tone decides <em>which</em>{' '}
          color it pulls from.
        </Paragraph>
        <MaterialToneMatrix />

        <Heading>Read as a button hierarchy</Heading>
        <Paragraph>
          Nothing here is a <Text code>Button</Text> — each is a{' '}
          <Text code>pressable</Text> <Text code>focusable</Text>{' '}
          <Text code>Box</Text>. Swapping only the material walks the row from
          &ldquo;the primary action on the screen&rdquo; down to &ldquo;a quiet
          escape hatch&rdquo;. (<Text code>Button</Text> itself maps its{' '}
          <Text code>default</Text> variant to <Text code>plate</Text>, its{' '}
          <Text code>submit</Text> to <Text code>solid</Text>.)
        </Paragraph>
        <ButtonHierarchy />
      </Flex>
    </div>
  ),
};

/* ---------------------------------------------------------------------- */
/* Tone & elevation                                                        */
/* ---------------------------------------------------------------------- */

const tones: BoxTone[] = [
  'neutral',
  'accent',
  'danger',
  'success',
  'warning',
  'info',
];

const ToneRow = () => (
  <Flex gap="m" wrap>
    {tones.map((tone) => (
      <div key={tone} style={{ width: 96 }}>
        <Flex direction="vertical" gap="s" align="center">
          <Box material="solid" tone={tone} size="l" style={{ width: 80 }} />
          <Text size={3} color="muted">
            {tone}
          </Text>
        </Flex>
      </div>
    ))}
  </Flex>
);

const categoricalHues = [
  'red',
  'orange',
  'amber',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
  'brown',
] as const;

/** The 10 categorical hues via `color="teal"` etc., plus one arbitrary CSS color. */
const CategoricalColorRow = () => (
  <Flex direction="vertical" gap="m">
    <Flex gap="s" wrap>
      {categoricalHues.map((hue) => (
        <Cell key={hue} label={hue}>
          <Box material="solid" color={hue} size="l" style={{ width: 72 }} />
        </Cell>
      ))}
    </Flex>
    <Flex gap="m" wrap>
      <Cell label="translucent">
        <Box
          material="translucent"
          color="purple"
          size="l"
          style={{ width: 72 }}
        />
      </Cell>
      <Cell label="outline">
        <Box material="outline" color="purple" size="l" style={{ width: 72 }} />
      </Cell>
      <Cell label='"#f0abfc"'>
        <Box material="solid" color="#f0abfc" size="l" style={{ width: 72 }} />
      </Cell>
    </Flex>
  </Flex>
);

/** Tone carrying real meaning: a CI pipeline's per-stage status. */
const PipelineStatus = () => {
  const stages: {
    name: string;
    tone: BoxTone;
    material: BoxMaterial;
    icon: typeof Clock;
    label: string;
  }[] = [
    {
      name: 'Lint',
      tone: 'success',
      material: 'translucent',
      icon: Check,
      label: 'passed',
    },
    {
      name: 'Unit',
      tone: 'success',
      material: 'translucent',
      icon: Check,
      label: 'passed',
    },
    {
      name: 'E2E',
      tone: 'info',
      material: 'glass',
      icon: Loader,
      label: 'running',
    },
    {
      name: 'Visual',
      tone: 'warning',
      material: 'outline',
      icon: AlertTriangle,
      label: '2 diffs',
    },
    {
      name: 'Publish',
      tone: 'neutral',
      material: 'ghost',
      icon: Clock,
      label: 'queued',
    },
  ];

  return (
    <Flex gap="s" align="center" wrap>
      {stages.map(({ name, tone, material, icon: Icon, label }) => (
        <Box
          key={name}
          material={material}
          tone={tone}
          size="s"
          style={{ gap: 6 }}
        >
          <Icon size={12} />
          <Text
            size={2}
            weight="medium"
            style={{ color: material === 'solid' ? 'inherit' : undefined }}
          >
            {name} · {label}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

const ElevationStack = () => (
  <Flex gap="xl" align="center" style={{ padding: '24px 0' }}>
    <Box
      material="solid"
      tone="neutral"
      elevation="raised"
      size="l"
      style={{ width: 72 }}
    />
    <Box
      material="solid"
      tone="neutral"
      elevation="overlay"
      size="l"
      style={{ width: 72 }}
    />
    <Box
      material="solid"
      tone="neutral"
      elevation="modal"
      size="l"
      style={{ width: 72 }}
    />
  </Flex>
);

/** Each elevation role next to the component family it's tuned for. */
const ElevationRoles = () => {
  const roles: { role: BoxElevation; example: string }[] = [
    { role: 'flat', example: 'chip / tag at rest' },
    { role: 'raised', example: 'Tabs item, DatePicker day' },
    { role: 'sticky', example: 'Screen.Header, table head' },
    { role: 'overlay', example: 'Popover, Dropdown, Drawer' },
    { role: 'modal', example: 'Modal, Dialog' },
    { role: 'toast', example: 'Toast' },
  ];

  return (
    <div className="box-stage">
      <Flex gap="xl" wrap align="start">
        {roles.map(({ role, example }) => (
          <Flex
            key={role}
            direction="vertical"
            gap="s"
            align="center"
            style={{ width: 150 }}
          >
            <Box
              material="solid"
              tone="neutral"
              elevation={role}
              shape="squircle"
              style={{ width: 88, height: 56 }}
            />
            <Text size={3} weight="medium">
              {role}
            </Text>
            <Label>{example}</Label>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

/** flat → raised on hover: the elevation prop is just data, so state can swap it. */
const HoverLiftCard = () => {
  const [lifted, setLifted] = useState(false);

  return (
    <Box
      shape="squircle"
      material="solid"
      tone="neutral"
      elevation={lifted ? 'overlay' : 'flat'}
      onMouseEnter={() => setLifted(true)}
      onMouseLeave={() => setLifted(false)}
      style={{
        width: 260,
        padding: 16,
        gap: 12,
        justifyContent: 'flex-start',
        transform: lifted ? 'translateY(-2px)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <Box shape="squircle" material="translucent" tone="accent" size="xl">
        <Heart size={18} />
      </Box>
      <Flex direction="vertical" gap="xs">
        <Text size={3} weight="bold">
          Hover me
        </Text>
        <Text size={2} color="muted">
          flat → overlay, driven by React state
        </Text>
      </Flex>
    </Box>
  );
};

/** A dismissible toast, entirely Box: elevation="toast" + danger tone. */
const ToastMockup = () => (
  <Box
    shape="squircle"
    material="solid"
    tone="danger"
    elevation="toast"
    style={{
      gap: 12,
      padding: '12px 14px',
      maxWidth: 400,
      justifyContent: 'flex-start',
    }}
  >
    <AlertTriangle size={18} style={{ color: 'inherit', flexShrink: 0 }} />
    <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
      <Text size={3} weight="bold" style={{ color: 'inherit' }}>
        Build failed
      </Text>
      <Text size={2} style={{ color: 'inherit', opacity: 0.85 }}>
        3 tests broke on <Text code>main</Text>. Rollback started.
      </Text>
    </Flex>
    <Box
      shape="circle"
      material="ghost"
      tone="neutral"
      size="s"
      pressable
      focusable
      aria-label="Dismiss"
      style={{ color: 'inherit' }}
    >
      <X size={12} />
    </Box>
  </Box>
);

export const ToneAndElevation: StoryObj<typeof Box> = {
  name: 'Tone & elevation',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>Tone picks the color</Heading>
      <Paragraph>
        Five of the six tones are fixed hues, independent of the
        consumer&rsquo;s chosen accent color — <Text code>info</Text> is the one
        exception, aliasing <Text code>accent</Text> directly, since it&rsquo;s
        about the primary flow rather than a status that needs to stay
        recognizable regardless of branding (see <Text code>color.md</Text>).
      </Paragraph>
      <ToneRow />

      <Heading>A custom color, off the accent</Heading>
      <Paragraph>
        <Text code>color</Text> overrides <Text code>tone</Text> with a color
        that has nothing to do with the accent. Pass a categorical hue name —{' '}
        <Text code>&quot;teal&quot;</Text>, <Text code>&quot;indigo&quot;</Text>
        , <Text code>&quot;amber&quot;</Text>, … — and it resolves to that
        hue&rsquo;s solid step (<Text code>--&lt;hue&gt;-9</Text>), or pass any
        CSS color string. Every material still applies — <Text code>solid</Text>{' '}
        auto-contrasts its text, <Text code>translucent</Text>/
        <Text code>outline</Text>/<Text code>ghost</Text> derive their tints
        from it.
      </Paragraph>
      <CategoricalColorRow />

      <Heading>Tone doing real work: a CI pipeline</Heading>
      <Paragraph>
        Read left to right, the hue alone tells the story — green stages are
        done, the blue one is in flight, amber wants a look, the grey one
        hasn&rsquo;t started. The material varies too so the state never rests
        on color alone.
      </Paragraph>
      <PipelineStatus />

      <Heading>Elevation is z-index and shadow together</Heading>
      <Paragraph>
        <Text code>elevation</Text> maps straight onto the roles from{' '}
        <Text code>elevation.md</Text> — picking <Text code>raised</Text>,{' '}
        <Text code>overlay</Text>, or <Text code>modal</Text> sets both the
        shadow weight and the stacking context in one prop, instead of a
        component having to keep the two in sync by hand.
      </Paragraph>
      <ElevationStack />

      <Heading>All six roles, and what each is tuned for</Heading>
      <ElevationRoles />

      <Heading>Elevation is just a prop — state can animate it</Heading>
      <Paragraph>
        Because <Text code>Box</Text> holds no state itself, the consumer is
        free to. Here a hover handler swaps <Text code>flat</Text> for{' '}
        <Text code>overlay</Text>, and the base transition on{' '}
        <Text code>box-shadow</Text> makes the lift smooth.
      </Paragraph>
      <HoverLiftCard />

      <Heading>Top of the stack: a toast</Heading>
      <ToastMockup />
    </Flex>
  ),
};

/* ---------------------------------------------------------------------- */
/* Interaction                                                             */
/* ---------------------------------------------------------------------- */

const SearchFieldExample = () => (
  <Box
    material="outline"
    tone="neutral"
    editable
    style={{ width: 220, gap: 8, justifyContent: 'flex-start' }}
  >
    <Search size={16} style={{ flexShrink: 0, opacity: 0.6 }} />
    <input
      placeholder="Search…"
      style={{
        border: 'none',
        outline: 'none',
        background: 'transparent',
        font: 'inherit',
        color: 'inherit',
        width: '100%',
      }}
    />
  </Box>
);

/** A segmented control — one selected pressable Box among quiet siblings. */
const SegmentedControl = () => {
  const options = ['Day', 'Week', 'Month', 'Year'];
  const [selected, setSelected] = useState('Week');

  return (
    <Box
      material="translucent"
      tone="neutral"
      shape="rounded"
      style={{ gap: 2, padding: 3 }}
    >
      {options.map((option) => {
        const active = option === selected;
        return (
          <Box
            key={option}
            material={active ? 'solid' : 'ghost'}
            tone={active ? 'accent' : 'neutral'}
            size="s"
            pressable
            focusable
            onClick={() => setSelected(option)}
          >
            <Text
              size={2}
              weight="medium"
              style={{ color: active ? 'inherit' : undefined }}
            >
              {option}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

/** An icon-only toolbar: every control is focusable + labelled. */
const IconToolbar = () => {
  const [active, setActive] = useState<Set<string>>(new Set(['bold']));
  const tools: { id: string; icon: typeof Bold; label: string }[] = [
    { id: 'bold', icon: Bold, label: 'Bold' },
    { id: 'italic', icon: Italic, label: 'Italic' },
    { id: 'underline', icon: Underline, label: 'Underline' },
  ];

  const toggle = (id: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <Box material="outline" tone="neutral" style={{ gap: 2, padding: 3 }}>
      {tools.map(({ id, icon: Icon, label }) => {
        const on = active.has(id);
        return (
          <Box
            key={id}
            shape="rounded"
            material={on ? 'translucent' : 'ghost'}
            tone={on ? 'accent' : 'neutral'}
            size="s"
            pressable
            focusable
            aria-pressed={on}
            aria-label={label}
            onClick={() => toggle(id)}
          >
            <Icon size={14} />
          </Box>
        );
      })}
    </Box>
  );
};

/** A number stepper: editable frame, two pressable actions, live value. */
const QuantityStepper = () => {
  const [value, setValue] = useState(3);

  return (
    <Box
      material="outline"
      tone="neutral"
      editable
      style={{ gap: 4, padding: 3 }}
    >
      <Box
        shape="rounded"
        material="ghost"
        tone="neutral"
        size="s"
        pressable
        focusable
        aria-label="Decrease"
        onClick={() => setValue((v) => Math.max(0, v - 1))}
      >
        <Minus size={14} />
      </Box>
      <Text
        size={3}
        weight="medium"
        align="center"
        style={{ minWidth: 28, display: 'inline-block' }}
      >
        {value}
      </Text>
      <Box
        shape="rounded"
        material="ghost"
        tone="neutral"
        size="s"
        pressable
        focusable
        aria-label="Increase"
        onClick={() => setValue((v) => v + 1)}
      >
        <Plus size={14} />
      </Box>
    </Box>
  );
};

/** Filter chips that latch on press — the classic toggle-chip pattern. */
const FilterChips = () => {
  const all = ['Design', 'Bug', 'Docs', 'Infra', 'Good first issue'];
  const [picked, setPicked] = useState<Set<string>>(new Set(['Bug']));

  const toggle = (tag: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });

  return (
    <Flex gap="s" align="center" wrap>
      <Filter size={14} style={{ opacity: 0.5 }} />
      {all.map((tag) => {
        const on = picked.has(tag);
        return (
          <Box
            key={tag}
            material={on ? 'solid' : 'outline'}
            tone={on ? 'accent' : 'neutral'}
            size="s"
            pressable
            focusable
            aria-pressed={on}
            onClick={() => toggle(tag)}
            style={{ gap: 6 }}
          >
            {on && <Check size={12} />}
            <Text
              size={2}
              weight="medium"
              style={{ color: on ? 'inherit' : undefined }}
            >
              {tag}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

/** A tag-input: chips living inside a single editable Box. */
const TagInput = () => {
  const [tags, setTags] = useState(['react', 'ssr']);

  return (
    <Box
      material="outline"
      tone="neutral"
      editable
      style={{
        width: 320,
        gap: 6,
        padding: 6,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      }}
    >
      <Hash size={14} style={{ opacity: 0.5, flexShrink: 0 }} />
      {tags.map((tag) => (
        <Box
          key={tag}
          material="translucent"
          tone="accent"
          size="mini"
          style={{ gap: 4 }}
        >
          <Text size={2} weight="medium" style={{ color: 'inherit' }}>
            {tag}
          </Text>
          <Box
            shape="circle"
            material="ghost"
            tone="accent"
            size="mini"
            pressable
            aria-label={`Remove ${tag}`}
            onClick={() => setTags((t) => t.filter((x) => x !== tag))}
          >
            <X size={10} />
          </Box>
        </Box>
      ))}
      <input
        placeholder="Add tag…"
        style={{
          border: 'none',
          outline: 'none',
          background: 'transparent',
          font: 'inherit',
          color: 'inherit',
          flex: 1,
          minWidth: 60,
        }}
      />
    </Box>
  );
};

/** A vote widget: two pressable arrows around a running count. */
const VoteWidget = () => {
  const [vote, setVote] = useState<1 | 0 | -1>(0);
  const base = 128;

  return (
    <Box
      material="translucent"
      tone="neutral"
      shape="rounded"
      style={{ gap: 4, padding: 3, flexDirection: 'column' }}
    >
      <Box
        shape="rounded"
        material={vote === 1 ? 'translucent' : 'ghost'}
        tone={vote === 1 ? 'success' : 'neutral'}
        size="s"
        pressable
        focusable
        aria-label="Upvote"
        aria-pressed={vote === 1}
        onClick={() => setVote((v) => (v === 1 ? 0 : 1))}
      >
        <ArrowUp size={14} />
      </Box>
      <Text size={2} weight="bold" align="center">
        {base + vote}
      </Text>
      <Box
        shape="rounded"
        material={vote === -1 ? 'translucent' : 'ghost'}
        tone={vote === -1 ? 'danger' : 'neutral'}
        size="s"
        pressable
        focusable
        aria-label="Downvote"
        aria-pressed={vote === -1}
        onClick={() => setVote((v) => (v === -1 ? 0 : -1))}
      >
        <ArrowDown size={14} />
      </Box>
    </Box>
  );
};

/** A connectivity pill that flips its whole look on press. */
const ConnectionToggle = () => {
  const [online, setOnline] = useState(true);

  return (
    <Box
      material={online ? 'translucent' : 'ghost'}
      tone={online ? 'success' : 'neutral'}
      pressable
      focusable
      aria-pressed={online}
      onClick={() => setOnline((v) => !v)}
      style={{ gap: 8 }}
    >
      <Wifi size={14} />
      <Text
        size={3}
        weight="medium"
        style={{ color: online ? 'inherit' : undefined }}
      >
        {online ? 'Connected' : 'Offline'}
      </Text>
    </Box>
  );
};

export const Interaction: StoryObj<typeof Box> = {
  name: 'Pressable, focusable & editable',
  parameters: chromaticBoth,
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Heading>Three interaction flags, all pure CSS</Heading>
      <Paragraph>
        <Text code>pressable</Text> reacts to <Text code>:active</Text>,{' '}
        <Text code>focusable</Text> adds a <Text code>:focus-visible</Text> ring
        that&rsquo;s identical across every material — predictability matters
        more than visual customization for screen-reader users here — and{' '}
        <Text code>editable</Text> is for a <Text code>Box</Text> that wraps a
        real form control: the &ldquo;engaged&rdquo; look triggers on{' '}
        <Text code>:focus-within</Text> instead of hover/active, so it lights up
        while the inner input has focus rather than only while the pointer is
        down on the container.
      </Paragraph>
      <Paragraph>Tab to it and start typing:</Paragraph>
      <SearchFieldExample />

      <Heading>Composing pressables: a segmented control</Heading>
      <Paragraph>
        A translucent track wrapping four <Text code>pressable</Text>{' '}
        <Text code>focusable</Text> boxes. The selected one switches to{' '}
        <Text code>solid</Text> <Text code>accent</Text>; the rest are{' '}
        <Text code>ghost</Text>, so they only draw a border while actually being
        pressed.
      </Paragraph>
      <SegmentedControl />

      <Heading>Icon-only controls still get a name</Heading>
      <Paragraph>
        Per <Text code>accessibility.md</Text>, every icon-only control carries
        an <Text code>aria-label</Text>. These also report{' '}
        <Text code>aria-pressed</Text>, so a screen reader announces the toggle
        state the border is showing visually.
      </Paragraph>
      <IconToolbar />

      <Heading>Editable frame, pressable insides: a stepper</Heading>
      <Paragraph>
        The outer <Text code>Box</Text> is <Text code>editable</Text> — it
        lights up on <Text code>:focus-within</Text> as you tab onto either
        button — while the two
        <Text code>−</Text>/<Text code>+</Text> boxes are independently{' '}
        <Text code>pressable</Text>.
      </Paragraph>
      <Flex gap="xl" align="center" wrap>
        <QuantityStepper />
        <VoteWidget />
      </Flex>

      <Heading>Latching toggles: filter chips</Heading>
      <Paragraph>
        Press to select, press again to drop. Selected chips go{' '}
        <Text code>solid</Text> and gain a check so the state never rests on
        color alone.
      </Paragraph>
      <FilterChips />

      <Heading>Chips inside an input: a tag field</Heading>
      <Paragraph>
        One <Text code>editable</Text> <Text code>Box</Text> holds a wrapping
        row of removable tag chips plus a bare <Text code>&lt;input&gt;</Text>.
        Each chip is its own tiny <Text code>Box</Text>, with an even tinier
        circular <Text code>pressable</Text> one for the remove affordance.
      </Paragraph>
      <TagInput />

      <Heading>One press, a whole new look</Heading>
      <Paragraph>
        Nothing says an interaction has to be subtle — this pill swaps material,
        tone and label at once, and the base transitions carry it across.
      </Paragraph>
      <ConnectionToggle />
    </Flex>
  ),
};

export default story;
