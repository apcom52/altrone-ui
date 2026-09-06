import { Meta, StoryObj } from '@storybook/react';
import { Button, Divider, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Range } from './Range.tsx';
import { useState } from 'react';
import {
  Contrast,
  Droplet,
  Flame,
  Pause,
  Play,
  Snowflake,
  Sun,
  Thermometer,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react';

const story: Meta<typeof Range> = {
  title: 'Components/Controls/Range',
  component: Range,
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

type Story = StoryObj<typeof Range>;

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
  label: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Flex direction="vertical" gap="xs">
    <Text size={2} color="muted">
      {label}
    </Text>
    {children}
  </Flex>
);

const mmss = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.round(seconds) % 60).padStart(
    2,
    '0',
  )}`;

/* ------------------------------------------------------------------ */
/* 1. Darkroom — the dense adjustments panel                           */
/* ------------------------------------------------------------------ */

export const Darkroom: Story = {
  name: 'Darkroom',
  render: () => {
    const [exposure, setExposure] = useState(10);
    const [contrast, setContrast] = useState(15);
    const [saturation, setSaturation] = useState(-5);
    const [warmth, setWarmth] = useState(20);
    const [applied, setApplied] = useState('nothing yet');

    const filter = [
      `brightness(${1 + exposure / 100})`,
      `contrast(${1 + contrast / 100})`,
      `saturate(${Math.max(0, 1 + saturation / 100)})`,
      `sepia(${Math.max(0, warmth) / 100})`,
      `hue-rotate(${warmth < 0 ? warmth * 0.6 : 0}deg)`,
    ].join(' ');

    const signed = (value: number) => `${value > 0 ? '+' : ''}${value}`;

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 560 }}>
        <Heading>Darkroom</Heading>
        <Lead>
          The natural home of the <Text code>default</Text> variant: a stack of
          adjustment sliders that each run from a negative to a positive extreme
          through a neutral centre. <Text code>renderLabel</Text> puts the sign
          back on the number, and <Text code>onValueCommit</Text> is where a real
          editor re-runs the expensive develop pass —{' '}
          <Text code>onChange</Text> only drives the cheap live preview.
        </Lead>

        <div
          style={{
            height: 200,
            borderRadius: 14,
            border: '1px solid var(--border-1)',
            background:
              'linear-gradient(180deg, #6ba7de 0%, #b9def0 42%, #ead9a6 54%, #a9793f 100%)',
            filter,
          }}
        />

        <Flex direction="vertical" gap="m">
          <Field label={`Exposure — ${signed(exposure)}`}>
            <Range
              min={-100}
              max={100}
              value={exposure}
              onChange={setExposure}
              onValueCommit={() => setApplied(`exposure ${signed(exposure)}`)}
              icon={<Sun />}
              renderLabel={signed}
            />
          </Field>
          <Field label={`Contrast — ${signed(contrast)}`}>
            <Range
              min={-100}
              max={100}
              value={contrast}
              onChange={setContrast}
              onValueCommit={() => setApplied(`contrast ${signed(contrast)}`)}
              icon={<Contrast />}
              renderLabel={signed}
            />
          </Field>
          <Field label={`Saturation — ${signed(saturation)}`}>
            <Range
              min={-100}
              max={100}
              value={saturation}
              onChange={setSaturation}
              onValueCommit={() =>
                setApplied(`saturation ${signed(saturation)}`)
              }
              icon={<Droplet />}
              renderLabel={signed}
            />
          </Field>
          <Field label={`Warmth — ${signed(warmth)}`}>
            <Range
              min={-100}
              max={100}
              value={warmth}
              onChange={setWarmth}
              onValueCommit={() => setApplied(`warmth ${signed(warmth)}`)}
              icon={<Thermometer />}
              renderLabel={signed}
            />
          </Field>
        </Flex>

        <Text size={2} color="muted">
          Last committed adjustment: {applied}
        </Text>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ */
/* 2. Mixing Desk — fill faders standing in for hardware               */
/* ------------------------------------------------------------------ */

const CHANNELS = ['Kick', 'Snare', 'Bass', 'Keys', 'Vox'];

export const MixingDesk: Story = {
  name: 'Mixing Desk',
  render: () => {
    const [levels, setLevels] = useState<number[]>([78, 64, 71, 55, 82]);
    const [master, setMaster] = useState(70);
    const [pan, setPan] = useState<number[]>([0, -30, 0, 25, 0]);

    const setLevel = (index: number, next: number) =>
      setLevels((prev) => prev.map((v, i) => (i === index ? next : v)));
    const setChannelPan = (index: number, next: number) =>
      setPan((prev) => prev.map((v, i) => (i === index ? next : v)));

    const panLabel = (value: number) =>
      value === 0 ? 'C' : `${value < 0 ? 'L' : 'R'}${Math.abs(value)}`;

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 640 }}>
        <Heading>Mixing Desk</Heading>
        <Lead>
          The <Text code>fill</Text> variant earns its keep when a control wants
          to feel like hardware. Run vertical, the fill level reads as a fader
          cap you can slam — right for channel gain. The thin{' '}
          <Text code>default</Text> sliders underneath handle pan, where a
          precise centre matters more than a big target.
        </Lead>

        <Flex direction="horizontal" gap="l" align="end">
          {CHANNELS.map((name, index) => (
            <Flex key={name} direction="vertical" align="center" gap="s">
              <div style={{ height: 220 }}>
                <Range
                  direction="vertical"
                  variant="fill"
                  value={levels[index]}
                  onChange={(next) => setLevel(index, next)}
                  showCurrentValue="always"
                />
              </div>
              <Text size={2} weight="medium">
                {name}
              </Text>
            </Flex>
          ))}

          <Divider direction="vertical" style={{ margin: '0 4px', height: 220 }} />

          <Flex direction="vertical" align="center" gap="s">
            <div style={{ height: 220 }}>
              <Range
                direction="vertical"
                variant="fill"
                size="l"
                value={master}
                onChange={setMaster}
                icon={<Volume2 />}
                showCurrentValue="always"
              />
            </div>
            <Text size={2} weight="bold">
              Master
            </Text>
          </Flex>
        </Flex>

        <Divider />

        <Flex direction="vertical" gap="s">
          {CHANNELS.map((name, index) => (
            <Flex key={name} direction="horizontal" gap="m" align="center">
              <Text size={2} color="muted" style={{ width: 48 }}>
                {name}
              </Text>
              <div style={{ flex: 1 }}>
                <Range
                  size="s"
                  min={-50}
                  max={50}
                  step={5}
                  value={pan[index]}
                  onChange={(next) => setChannelPan(index, next)}
                  renderLabel={panLabel}
                />
              </div>
              <Text size={2} style={{ width: 40 }}>
                {panLabel(pan[index])}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ */
/* 3. Now Playing — one card, both variants, different jobs            */
/* ------------------------------------------------------------------ */

export const NowPlaying: Story = {
  name: 'Now Playing',
  render: () => {
    const duration = 214;
    const [position, setPosition] = useState(72);
    const [volume, setVolume] = useState(45);
    const [playing, setPlaying] = useState(true);

    const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 460 }}>
        <Heading>Now Playing</Heading>
        <Lead>
          Two sliders, two roles. The scrubber is a hairline{' '}
          <Text code>default</Text> Range — it should recede into the card until
          you reach for it, and the value bubble does the talking. Volume is a{' '}
          <Text code>fill</Text> slab, the tactile control you nudge without
          looking.
        </Lead>

        <Flex
          direction="vertical"
          gap="m"
          style={{
            padding: 20,
            borderRadius: 16,
            border: '1px solid var(--border-1)',
            background: 'var(--background-2)',
          }}
        >
          <Flex direction="horizontal" gap="m" align="center">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                background:
                  'linear-gradient(135deg, var(--accent-9), var(--accent-11))',
                flexShrink: 0,
              }}
            />
            <Flex direction="vertical" gap="xs">
              <Text weight="bold">Parallel Lines</Text>
              <Text size={2} color="muted">
                The Meridians — Long Distances
              </Text>
            </Flex>
          </Flex>

          <Range
            value={position}
            max={duration}
            onChange={setPosition}
            showCurrentValue="always"
            renderLabel={mmss}
          />
          <Flex direction="horizontal" align="between">
            <Text size={2} color="muted">
              {mmss(position)}
            </Text>
            <Text size={2} color="muted">
              −{mmss(duration - position)}
            </Text>
          </Flex>

          <Flex direction="horizontal" gap="m" align="center">
            <Button
              icon={playing ? <Pause /> : <Play />}
              label={playing ? 'Pause' : 'Play'}
              showLabel={false}
              onClick={() => setPlaying((p) => !p)}
            />
            <div style={{ flex: 1 }}>
              <Range
                variant="fill"
                size="s"
                value={volume}
                onChange={setVolume}
                icon={<VolumeIcon />}
              />
            </div>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ */
/* 4. Thermostat — one big fill dial                                   */
/* ------------------------------------------------------------------ */

export const Thermostat: Story = {
  name: 'Thermostat',
  render: () => {
    const [target, setTarget] = useState(21.5);

    const t = (target - 16) / (30 - 16);
    const cold = [219, 234, 254];
    const warm = [254, 215, 170];
    const mix = cold.map((c, i) => Math.round(c + (warm[i] - c) * t));

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 520 }}>
        <Heading>Thermostat</Heading>
        <Lead>
          When the slider <Text weight="bold">is</Text> the interface, go{' '}
          <Text code>fill</Text> and go large. A single vertical slab, a{' '}
          <Text code>step</Text> of <Text code>0.5</Text>, and{' '}
          <Text code>showCurrentValue="always"</Text> so the target reads from
          across the room — the value chip keeps its own solid background, so it
          never sinks into the fill.
        </Lead>

        <Flex
          direction="horizontal"
          gap="xl"
          align="center"
          style={{
            padding: 24,
            borderRadius: 20,
            background: `rgb(${mix.join(', ')})`,
            border: '1px solid var(--border-1)',
            transition: 'background 0.2s ease',
          }}
        >
          <div style={{ height: 260 }}>
            <Range
              direction="vertical"
              variant="fill"
              size="xl"
              min={16}
              max={30}
              step={0.5}
              value={target}
              onChange={setTarget}
              icon={target >= 23 ? <Flame /> : <Snowflake />}
              showCurrentValue="always"
              renderLabel={(value) => `${value}°`}
            />
          </div>

          <Flex direction="vertical" gap="xs">
            <Text size={7} weight="bold" style={{ color: '#1c2024' }}>
              {target.toFixed(1)}°C
            </Text>
            <Text size={3} style={{ color: '#1c2024' }}>
              {target >= 23
                ? 'Heating'
                : target <= 18
                  ? 'Cooling'
                  : 'Holding steady'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

/* ------------------------------------------------------------------ */
/* 5. Anatomy — variants, sizes, states, keyboard                      */
/* ------------------------------------------------------------------ */

export const Anatomy: Story = {
  name: 'Anatomy & options',
  render: () => {
    const [a, setA] = useState(40);
    const [b, setB] = useState(60);

    const sizes = ['mini', 's', 'm', 'l', 'xl'] as const;

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 720 }}>
        <Heading>Two variants</Heading>
        <Lead>
          <Text code>default</Text> is the thin track with a round thumb — the
          shape a range control has almost everywhere, and the right pick for
          forms and dense panels. <Text code>fill</Text> is the iOS Control
          Centre slab: the whole control is the track and its fill level is the
          handle. Expressive and tactile, but heavy — reserve it for media and
          ambient settings.
        </Lead>
        <Flex direction="vertical" gap="m" style={{ maxWidth: 420 }}>
          <Field label={<Text code>variant=&quot;default&quot;</Text>}>
            <Range value={a} onChange={setA} />
          </Field>
          <Field label={<Text code>variant=&quot;fill&quot;</Text>}>
            <Range variant="fill" value={a} onChange={setA} />
          </Field>
        </Flex>

        <Divider />

        <Heading>Sizes</Heading>
        <Lead>
          Both variants share the <Text code>mini / s / m / l / xl</Text> scale.
          Size drives track thickness and thumb diameter, and for{' '}
          <Text code>fill</Text> the height of the slab.
        </Lead>
        <Flex direction="vertical" gap="m">
          {sizes.map((size) => (
            <Flex key={size} direction="horizontal" gap="l" align="center">
              <Text code style={{ width: 44 }}>
                {size}
              </Text>
              <div style={{ flex: 1 }}>
                <Range size={size} value={b} onChange={setB} />
              </div>
              <div style={{ flex: 1 }}>
                <Range size={size} variant="fill" value={b} onChange={setB} />
              </div>
            </Flex>
          ))}
        </Flex>

        <Divider />

        <Heading>Vertical</Heading>
        <Lead>
          Set <Text code>direction=&quot;vertical&quot;</Text> and give the
          control a height. The fill grows from the bottom; arrow keys keep
          working.
        </Lead>
        <Flex direction="horizontal" gap="xl">
          <div style={{ height: 220 }}>
            <Range
              direction="vertical"
              value={b}
              onChange={setB}
              showCurrentValue="always"
            />
          </div>
          <div style={{ height: 220 }}>
            <Range
              direction="vertical"
              variant="fill"
              value={b}
              onChange={setB}
              icon={<Sun />}
              showCurrentValue="always"
            />
          </div>
        </Flex>

        <Divider />

        <Heading>States</Heading>
        <Lead>
          <Text code>disabled</Text> freezes interaction and drops the fill to a
          neutral grey. <Text code>readOnly</Text> removes the slider entirely
          and renders the formatted value as selectable text — for a summary row
          where the number matters but can&apos;t be touched.
        </Lead>
        <Flex direction="vertical" gap="m" style={{ maxWidth: 420 }}>
          <Field label="disabled — default">
            <Range value={35} onChange={() => null} disabled />
          </Field>
          <Field label="disabled — fill">
            <Range
              variant="fill"
              value={35}
              onChange={() => null}
              icon={<Volume2 />}
              disabled
            />
          </Field>
          <Field label="readOnly">
            <Range
              value={72}
              onChange={() => null}
              readOnly
              renderLabel={(value) => `${value}% complete`}
            />
          </Field>
        </Flex>

        <Divider />

        <Heading>Value label &amp; keyboard</Heading>
        <Lead>
          <Text code>showCurrentValue</Text> takes <Text code>&quot;active&quot;</Text>{' '}
          (visible while hovered, focused, or dragging — the default),{' '}
          <Text code>&quot;always&quot;</Text>, or <Text code>false</Text>. Once
          focused, the track responds to <Text kbd>←</Text> <Text kbd>→</Text>{' '}
          <Text kbd>↑</Text> <Text kbd>↓</Text> by one <Text code>step</Text>,
          and <Text kbd>Home</Text> / <Text kbd>End</Text> jump to the ends —
          every press also fires <Text code>onValueCommit</Text>.
        </Lead>
        <Flex direction="horizontal" gap="xl" wrap style={{ maxWidth: 640 }}>
          <Field label={<Text code>&quot;active&quot;</Text>}>
            <div style={{ width: 200 }}>
              <Range value={a} onChange={setA} />
            </div>
          </Field>
          <Field label={<Text code>&quot;always&quot;</Text>}>
            <div style={{ width: 200 }}>
              <Range value={a} onChange={setA} showCurrentValue="always" />
            </div>
          </Field>
          <Field label={<Text code>false</Text>}>
            <div style={{ width: 200 }}>
              <Range value={a} onChange={setA} showCurrentValue={false} />
            </div>
          </Field>
        </Flex>
      </Flex>
    );
  },
};
