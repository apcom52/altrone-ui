import { Meta, StoryObj } from '@storybook/react';
import { Button, Divider, Flex, Range, Text, TextInput } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { ColorPicker } from './ColorPicker.tsx';
import { COLORS } from './COLORS.ts';
import { useState } from 'react';
import { ColorPreset } from './ColorPicker.types.ts';
import {
  Baseline,
  Bold,
  Highlighter,
  Italic,
  Underline,
} from 'lucide-react';

const story: Meta<typeof ColorPicker> = {
  title: 'Components/Controls/ColorPicker',
  component: ColorPicker,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export default story;

type Story = StoryObj<typeof ColorPicker>;

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text block size={6} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <Text block size={3} style={{ maxWidth: 620, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Flex direction="vertical" gap="xs">
    <Text size={2} color="muted">
      {label}
    </Text>
    {children}
  </Flex>
);

const BRAND_COLORS: ColorPreset[] = [
  { name: 'Iris', title: 'Iris', value: '#5b5bd6' },
  { name: 'Iris Deep', title: 'Iris Deep', value: '#3a3aa8' },
  { name: 'Mint', title: 'Mint', value: '#3dd68c' },
  { name: 'Sun', title: 'Sun', value: '#f5a623' },
  { name: 'Ember', title: 'Ember', value: '#e5484d' },
  { name: 'Ink', title: 'Ink', value: '#1c2024' },
  { name: 'Fog', title: 'Fog', value: '#e6e8eb' },
];

/* ------------------------------------------------------------------ */
/* 1. Three ways to pick                                               */
/* ------------------------------------------------------------------ */

export const ThreeWaysToPick: Story = {
  name: 'Three ways to pick',
  render: () => {
    const [full, setFull] = useState<string | undefined>('#5b5bd6');
    const [paletteOnly, setPaletteOnly] = useState<string | undefined>(
      '#3dd68c',
    );
    const [presetsOnly, setPresetsOnly] = useState<string | undefined>(
      COLORS[4].value,
    );
    const [erasable, setErasable] = useState<string | undefined>('#f5a623');

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 720 }}>
        <Heading>Three ways to pick</Heading>
        <Lead>
          The popover adapts to what you give it. Pass{' '}
          <Text code>colorPresets</Text> and consumers get a swatch grid; the
          free-form palette rides alongside it on a second tab. Drop the presets
          and the palette fills the whole popover. Set{' '}
          <Text code>allowPalette={'{false}'}</Text> and the picker becomes a
          strict swatch chooser with no way to invent an off-brand colour.
        </Lead>

        <Flex direction="horizontal" gap="l" wrap align="start">
          <Field label="Presets + palette">
            <ColorPicker
              colorPresets={COLORS}
              value={full}
              onChange={setFull}
            />
          </Field>
          <Field label="Palette only">
            <ColorPicker
              value={paletteOnly}
              onChange={setPaletteOnly}
              placeholder="Pick a colour"
            />
          </Field>
          <Field label="Presets only — allowPalette={false}">
            <ColorPicker
              colorPresets={COLORS}
              value={presetsOnly}
              onChange={setPresetsOnly}
              allowPalette={false}
              placeholder="From the set"
            />
          </Field>
          <Field label="clearable — adds Clear / Apply">
            <ColorPicker
              colorPresets={COLORS}
              value={erasable}
              onChange={setErasable}
              clearable
              placeholder="Optional colour"
            />
          </Field>
        </Flex>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ */
/* 2. Gradient Forge                                                   */
/* ------------------------------------------------------------------ */

export const GradientForge: Story = {
  name: 'Gradient Forge',
  render: () => {
    const [angle, setAngle] = useState(135);
    const [stops, setStops] = useState<string[]>([
      '#5b5bd6',
      '#e5484d',
      '#f5a623',
    ]);

    const css = `linear-gradient(${angle}deg, ${stops.join(', ')})`;

    const setStop = (index: number, next?: string) =>
      setStops((prev) =>
        prev.map((stop, i) => (i === index ? next ?? stop : stop)),
      );

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 640 }}>
        <Heading>Gradient Forge</Heading>
        <Lead>
          Three pickers, one angle slider, and a running CSS declaration. Each
          swatch feeds a stop in a <Text code>linear-gradient()</Text>; the
          preview and the code block update on every change.
        </Lead>

        <div
          style={{
            height: 160,
            borderRadius: 14,
            border: '1px solid var(--border-1)',
            background: css,
          }}
        />

        <Flex direction="horizontal" gap="l" wrap align="start">
          {stops.map((stop, index) => (
            <Field key={index} label={`Stop ${index + 1}`}>
              <ColorPicker
                value={stop}
                onChange={(next) => setStop(index, next)}
                colorPresets={BRAND_COLORS}
              />
            </Field>
          ))}
          <Field label={`Angle — ${angle}°`}>
            <div style={{ width: 220 }}>
              <Range
                min={0}
                max={360}
                value={angle}
                onChange={setAngle}
                renderLabel={(value) => `${value}°`}
                showCurrentValue="always"
              />
            </div>
          </Field>
        </Flex>

        <Text
          block
          code
          style={{
            display: 'block',
            padding: '12px 16px',
            background: 'var(--gray-a3)',
            borderRadius: 'var(--radius-s)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {`background: ${css};`}
        </Text>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ */
/* 3. Neon Sign Studio                                                 */
/* ------------------------------------------------------------------ */

export const NeonSignStudio: Story = {
  name: 'Neon Sign Studio',
  render: () => {
    const [glow, setGlow] = useState<string | undefined>('#3dd68c');
    const [wall, setWall] = useState<string | undefined>('#1c2024');
    const [word, setWord] = useState('altrone');

    const glowColor = glow ?? '#ffffff';

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 620 }}>
        <Heading>Neon Sign Studio</Heading>
        <Lead>
          A picker is only as good as the thing it recolours. Here the glow
          swatch drives a stack of <Text code>text-shadow</Text> layers and the
          wall swatch paints the backdrop — the alpha channel of the palette is
          handy for a soft outer bloom.
        </Lead>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            borderRadius: 16,
            background: wall,
            border: '1px solid var(--border-1)',
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: 4,
              color: '#fdfdfd',
              textShadow: `0 0 4px ${glowColor}, 0 0 12px ${glowColor}, 0 0 32px ${glowColor}, 0 0 64px ${glowColor}`,
            }}
          >
            {word || 'neon'}
          </span>
        </div>

        <Flex direction="horizontal" gap="l" wrap align="start">
          <Field label="Glow (try the alpha slider)">
            <ColorPicker value={glow} onChange={setGlow} />
          </Field>
          <Field label="Wall">
            <ColorPicker
              value={wall}
              onChange={setWall}
              colorPresets={[
                { name: 'Ink', title: 'Ink', value: '#1c2024' },
                { name: 'Plum', title: 'Plum', value: '#2b1a2e' },
                { name: 'Navy', title: 'Navy', value: '#13233b' },
                { name: 'Coal', title: 'Coal', value: '#0a0a0a' },
              ]}
              allowPalette={false}
            />
          </Field>
          <Field label="Sign text">
            <TextInput
              value={word}
              maxLength={10}
              onChange={setWord}
              style={{ width: 160 }}
            />
          </Field>
        </Flex>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ */
/* 4. Building a palette                                               */
/* ------------------------------------------------------------------ */

const TOKENS = [
  { name: '--accent', fallback: '#5b5bd6' },
  { name: '--accent-hover', fallback: '#4a4ac2' },
  { name: '--surface', fallback: '#ffffff' },
  { name: '--text', fallback: '#1c2024' },
];

export const BuildingAPalette: Story = {
  name: 'Building a palette',
  render: () => {
    const [values, setValues] = useState<Record<string, string | undefined>>(
      Object.fromEntries(TOKENS.map((token) => [token.name, token.fallback])),
    );

    const resolve = (name: string) =>
      values[name] ?? TOKENS.find((token) => token.name === name)?.fallback;

    return (
      <Flex direction="horizontal" gap="xl" style={{ padding: 24 }} wrap>
        <Flex direction="vertical" gap="m" style={{ maxWidth: 380 }}>
          <Heading>Building a palette</Heading>
          <Lead>
            Four tokens, four pickers. Brand presets keep the common choices one
            click away; the palette tab is there for the moment a designer wants
            a value that isn&apos;t in the system yet.
          </Lead>

          <Flex direction="vertical" gap="s">
            {TOKENS.map((token) => (
              <Flex
                key={token.name}
                direction="horizontal"
                gap="m"
                align="center"
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-1)',
                  background: 'var(--background-2)',
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: resolve(token.name),
                    border: '1px solid var(--border-a2)',
                    flexShrink: 0,
                  }}
                />
                <Text code style={{ flex: 1, fontSize: 12 }}>
                  {token.name}
                </Text>
                <ColorPicker
                  value={values[token.name]}
                  onChange={(next) =>
                    setValues((prev) => ({ ...prev, [token.name]: next }))
                  }
                  colorPresets={BRAND_COLORS}
                  size="s"
                  clearable
                />
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Flex direction="vertical" gap="xs">
          <Text size={2} color="muted">
            Live preview
          </Text>
          <div
            style={{
              width: 260,
              padding: 20,
              borderRadius: 12,
              background: resolve('--surface'),
              border: '1px solid var(--border-1)',
              color: resolve('--text'),
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
              Weekly digest
            </div>
            <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 16 }}>
              Twelve people joined your workspace this week.
            </div>
            <button
              style={{
                border: 'none',
                borderRadius: 8,
                padding: '8px 14px',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                background: resolve('--accent'),
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background =
                  resolve('--accent-hover') ?? '';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = resolve('--accent') ?? '';
              }}
            >
              View report
            </button>
          </div>
        </Flex>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ */
/* 5. Writing desk                                                     */
/* ------------------------------------------------------------------ */

const TEXT_COLORS: ColorPreset[] = [
  { name: 'Ink', title: 'Ink', value: '#1c2024' },
  { name: 'Slate', title: 'Slate', value: '#3b4149' },
  { name: 'Rust', title: 'Rust', value: '#ad1a12' },
  { name: 'Pine', title: 'Pine', value: '#1a7f5a' },
  { name: 'Sea', title: 'Sea', value: '#1f6feb' },
  { name: 'Plum', title: 'Plum', value: '#7c3aed' },
];

const HIGHLIGHT_COLORS: ColorPreset[] = [
  { name: 'Butter', title: 'Butter', value: '#fef08a' },
  { name: 'Aloe', title: 'Aloe', value: '#bbf7d0' },
  { name: 'Sky', title: 'Sky', value: '#bae6fd' },
  { name: 'Rose', title: 'Rose', value: '#fbcfe8' },
];

export const WritingDesk: Story = {
  name: 'Writing desk',
  render: () => {
    const [textColor, setTextColor] = useState<string | undefined>('#1c2024');
    const [highlight, setHighlight] = useState<string | undefined>('#fef08a');
    const [paper, setPaper] = useState<string | undefined>('#ffffff');

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 620 }}>
        <Heading>Writing desk</Heading>
        <Lead>
          The realistic case: colour controls tucked into a formatting toolbar,
          each one an <Text code>asChild</Text> trigger so the picker rides on a{' '}
          <Text code>Button</Text> instead of a text field. Character colour and
          page colour keep the full palette; the highlighter is locked to a
          short preset list.
        </Lead>

        <Flex
          direction="horizontal"
          gap="xs"
          align="center"
          style={{
            border: '1px solid var(--border-1)',
            borderRadius: 10,
            padding: '6px 8px',
            width: 'fit-content',
          }}
        >
          <Button icon={<Bold />} label="Bold" showLabel={false} variant="text" />
          <Button
            icon={<Italic />}
            label="Italic"
            showLabel={false}
            variant="text"
          />
          <Button
            icon={<Underline />}
            label="Underline"
            showLabel={false}
            variant="text"
          />

          <Divider direction="vertical" style={{ height: 20, margin: '0 4px' }} />

          <ColorPicker
            value={textColor}
            onChange={setTextColor}
            colorPresets={TEXT_COLORS}
            asChild
          >
            <Button
              title="Character colour"
              label="Character colour"
              showLabel={false}
              variant="text"
              icon={
                <Flex direction="vertical" align="center" style={{ gap: 2 }}>
                  <Baseline />
                  <div
                    style={{
                      width: 14,
                      height: 3,
                      borderRadius: 2,
                      background: textColor || 'var(--text-2)',
                    }}
                  />
                </Flex>
              }
            />
          </ColorPicker>

          <ColorPicker
            value={highlight}
            onChange={setHighlight}
            colorPresets={HIGHLIGHT_COLORS}
            allowPalette={false}
            asChild
          >
            <Button
              title="Highlight colour"
              label="Highlight colour"
              showLabel={false}
              variant="text"
              icon={
                <Flex direction="vertical" align="center" style={{ gap: 2 }}>
                  <Highlighter />
                  <div
                    style={{
                      width: 14,
                      height: 3,
                      borderRadius: 2,
                      background: highlight || 'transparent',
                      border: highlight ? 'none' : '1px dashed var(--border-2)',
                    }}
                  />
                </Flex>
              }
            />
          </ColorPicker>

          <Divider direction="vertical" style={{ height: 20, margin: '0 4px' }} />

          <ColorPicker
            value={paper}
            onChange={setPaper}
            colorPresets={[
              { name: 'White', title: 'White', value: '#ffffff' },
              { name: 'Cream', title: 'Cream', value: '#fffbeb' },
              { name: 'Mist', title: 'Mist', value: '#eff6ff' },
              { name: 'Sage', title: 'Sage', value: '#f0fdf4' },
            ]}
            clearable
            asChild
          >
            <Button label="Page colour" variant="text" showLabel={false} title="Page colour" />
          </ColorPicker>
        </Flex>

        <div
          style={{
            padding: '28px 32px',
            borderRadius: 12,
            border: '1px solid var(--border-1)',
            background: paper,
            minHeight: 140,
          }}
        >
          <p style={{ margin: 0, color: textColor, lineHeight: 1.7, fontSize: 15 }}>
            The quick brown fox jumps over the lazy dog.{' '}
            <span
              style={{
                background: highlight,
                borderRadius: 3,
                padding: '1px 3px',
              }}
            >
              This clause is highlighted
            </span>{' '}
            and the paragraph as a whole uses the chosen character colour on the
            chosen page colour.
          </p>
        </div>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ */
/* 6. Sizes, states & custom triggers                                  */
/* ------------------------------------------------------------------ */

export const SizesStatesAndTriggers: Story = {
  name: 'Sizes, states & custom triggers',
  render: () => {
    const [value, setValue] = useState<string | undefined>('#5b5bd6');
    const [swatch, setSwatch] = useState<string | undefined>('#e5484d');

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 720 }}>
        <Heading>Sizes</Heading>
        <Lead>
          The trigger is a <Text code>TextInput</Text> under the hood, so it
          honours the same <Text code>size</Text> scale. The preview dot and the
          hex / RGB inputs inside the popover follow suit.
        </Lead>
        <Flex direction="horizontal" gap="l" align="center" wrap>
          {(['mini', 's', 'm', 'l', 'xl'] as const).map((size) => (
            <Field key={size} label={`size="${size}"`}>
              <ColorPicker
                value={value}
                onChange={setValue}
                size={size}
                colorPresets={COLORS}
              />
            </Field>
          ))}
        </Flex>

        <Divider />

        <Heading>States</Heading>
        <Flex direction="horizontal" gap="l" align="center" wrap>
          <Field label="default">
            <ColorPicker value="#5b5bd6" onChange={() => {}} />
          </Field>
          <Field label="readOnly">
            <ColorPicker value="#5b5bd6" onChange={() => {}} readOnly />
          </Field>
          <Field label="disabled">
            <ColorPicker value="#5b5bd6" onChange={() => {}} disabled />
          </Field>
          <Field label="empty">
            <ColorPicker onChange={() => {}} placeholder="Not set" />
          </Field>
          <Field label="transparent">
            <ColorPicker value="#5b5bd6" onChange={() => {}} transparent />
          </Field>
        </Flex>

        <Divider />

        <Heading>Custom triggers</Heading>
        <Lead>
          <Text code>asChild</Text> merges the trigger behaviour onto whatever
          single element you pass — a bare swatch, a labelled button, or an
          inline chip inside running text. <Text code>renderFunc</Text> goes one
          step further and hands you <Text code>value</Text> /{' '}
          <Text code>opened</Text> to build the trigger from scratch.
        </Lead>

        <Field label="renderFunc">
          <ColorPicker
            value={swatch}
            onChange={setSwatch}
            colorPresets={COLORS}
            renderFunc={({ value, opened }) => (
              <Button
                variant={opened ? 'submit' : 'default'}
                label={value ?? 'No colour'}
                icon={
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: value || 'var(--border-2)',
                    }}
                  />
                }
              />
            )}
          />
        </Field>
        <Flex direction="horizontal" gap="xl" align="center" wrap>
          <Field label="Bare swatch">
            <ColorPicker
              value={swatch}
              onChange={setSwatch}
              colorPresets={COLORS}
              clearable
              asChild
            >
              <div
                title="Click to recolour"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: swatch || 'var(--interactive-2)',
                  border: '2px solid var(--border-2)',
                  cursor: 'pointer',
                }}
              />
            </ColorPicker>
          </Field>

          <Field label="Labelled button">
            <ColorPicker
              value={swatch}
              onChange={setSwatch}
              colorPresets={COLORS}
              asChild
            >
              <Button
                label={swatch ?? 'Choose'}
                icon={
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      background: swatch || 'var(--border-2)',
                      border: '1px solid var(--border-a2)',
                      flexShrink: 0,
                    }}
                  />
                }
              />
            </ColorPicker>
          </Field>

          <Field label="Inline in text">
            <Flex direction="horizontal" gap="xs" align="center">
              <Text>Accent</Text>
              <ColorPicker value={swatch} onChange={setSwatch} asChild>
                <span
                  style={{
                    display: 'inline-block',
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    background: swatch || 'var(--interactive-2)',
                    border: '1px solid var(--border-2)',
                    cursor: 'pointer',
                    verticalAlign: 'middle',
                  }}
                />
              </ColorPicker>
              <Text>{swatch ?? '—'}</Text>
            </Flex>
          </Field>
        </Flex>
      </Flex>
    );
  },
};
