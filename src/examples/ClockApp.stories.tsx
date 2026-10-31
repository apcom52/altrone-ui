import { useEffect, useRef, useState } from 'react';
import type { ComponentProps, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  BottomNavigation,
  Button,
  Divider,
  Flex,
  NumberInput,
  Progress,
  Screen,
  showToast,
  Text,
  Toolbar,
} from 'components';
import {
  Clock,
  Flag,
  Hourglass,
  Pause,
  Play,
  RotateCcw,
  Timer,
} from 'lucide-react';
import { screenMeta, surface } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Applications/Clock app',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

/* ── domain ──────────────────────────────────────────────────── */

const TABS = [
  { id: 'clock', label: 'Clock', icon: <Clock /> },
  { id: 'stopwatch', label: 'Stopwatch', icon: <Timer /> },
  { id: 'timer', label: 'Timer', icon: <Hourglass /> },
] as const;

type TabId = (typeof TABS)[number]['id'];

const WORLD_CLOCKS = [
  { city: 'New York', zone: 'America/New_York' },
  { city: 'London', zone: 'Europe/London' },
  { city: 'Tokyo', zone: 'Asia/Tokyo' },
  { city: 'Sydney', zone: 'Australia/Sydney' },
];

const TIMER_PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '25 min', seconds: 1500 },
];

const pad = (value: number) => String(value).padStart(2, '0');

const formatElapsed = (ms: number) => {
  const totalCentis = Math.floor(ms / 10);
  const centis = totalCentis % 100;
  const totalSeconds = Math.floor(totalCentis / 100);
  const minutes = Math.floor(totalSeconds / 60);
  return `${pad(minutes)}:${pad(totalSeconds % 60)}.${pad(centis)}`;
};

const formatCountdown = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(totalSeconds % 60)}`;
};

const formatTime = (date: Date, timeZone?: string) =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(date);

/** Ticks while `active`, re-rendering with the current timestamp. */
const useNow = (active: boolean, intervalMs: number) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [active, intervalMs]);

  return now;
};

const Digits = ({ children }: { children: string }) => (
  <Text
    block
    weight="bold"
    style={{
      fontSize: 56,
      lineHeight: 1.1,
      fontVariantNumeric: 'tabular-nums',
      textAlign: 'center',
      letterSpacing: '-0.02em',
    }}
  >
    {children}
  </Text>
);

/* ── clock ───────────────────────────────────────────────────── */

const ClockView = () => {
  const [mounted, setMounted] = useState(false);
  const now = useNow(true, 1000);

  useEffect(() => setMounted(true), []);

  const date = new Date(now);
  const seconds = pad(date.getSeconds());

  return (
    <Flex orientation="vertical" gap="xl" style={{ paddingTop: 24 }}>
      <Flex orientation="vertical" align="center" gap="s">
        <Digits>
          {mounted ? `${formatTime(date)}:${seconds}` : '--:--:--'}
        </Digits>
        <Text size={4} color="muted">
          {mounted
            ? new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              }).format(date)
            : ' '}
        </Text>
      </Flex>

      <Flex orientation="vertical" gap="s">
        <Text size={3} weight="bold" color="muted">
          World clock
        </Text>
        {WORLD_CLOCKS.map(({ city, zone }) => (
          <Flex key={zone} align="center" justify="between" style={surface(16)}>
            <Text size={4}>{city}</Text>
            <Text
              size={6}
              weight="bold"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {mounted ? formatTime(date, zone) : '--:--'}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

/* ── stopwatch ───────────────────────────────────────────────── */

const StopwatchView = () => {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startedAt = useRef(0);
  const base = useRef(0);

  useEffect(() => {
    if (!running) return;
    startedAt.current = performance.now();
    const id = setInterval(
      () => setElapsed(base.current + performance.now() - startedAt.current),
      30,
    );
    return () => {
      clearInterval(id);
      base.current += performance.now() - startedAt.current;
    };
  }, [running]);

  const reset = () => {
    base.current = 0;
    setElapsed(0);
    setLaps([]);
  };

  const lapSplits = laps.map((total, index) => ({
    number: laps.length - index,
    total,
    split: total - (laps[index + 1] ?? 0),
  }));

  return (
    <Flex orientation="vertical" gap="xl" style={{ paddingTop: 24 }}>
      <Digits>{formatElapsed(elapsed)}</Digits>

      <Flex gap="m" justify="center">
        <Button
          label="Reset"
          icon={<RotateCcw />}
          size="l"
          disabled={running || elapsed === 0}
          onClick={reset}
        />
        <Button
          label={running ? 'Stop' : elapsed > 0 ? 'Resume' : 'Start'}
          icon={running ? <Pause /> : <Play />}
          variant="submit"
          size="l"
          onClick={() => setRunning((value) => !value)}
        />
        <Button
          label="Lap"
          icon={<Flag />}
          size="l"
          disabled={!running}
          onClick={() => setLaps((current) => [elapsed, ...current])}
        />
      </Flex>

      {lapSplits.length > 0 && (
        <Flex orientation="vertical">
          {lapSplits.map(({ number, total, split }, index) => (
            <Flex key={number} orientation="vertical">
              {index > 0 && <Divider />}
              <Flex align="center" justify="between" style={{ padding: 12 }}>
                <Text size={3} color="muted">
                  Lap {number}
                </Text>
                <Text size={4} style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {formatElapsed(split)}
                </Text>
                <Text
                  size={3}
                  color="muted"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {formatElapsed(total)}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

const DurationField = ({
  label,
  ...props
}: { label: string } & ComponentProps<typeof NumberInput>) => (
  <Flex orientation="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
    <Text size={2} color="muted">
      {label}
    </Text>
    <NumberInput {...props} />
  </Flex>
);

/* ── timer ───────────────────────────────────────────────────── */

const TimerView = () => {
  const [duration, setDuration] = useState(300);
  const [remainingMs, setRemainingMs] = useState(300_000);
  const [running, setRunning] = useState(false);
  const endsAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    endsAt.current = performance.now() + remainingMs;
    const id = setInterval(() => {
      const left = endsAt.current - performance.now();
      if (left <= 0) {
        setRemainingMs(0);
        setRunning(false);
        showToast("Time's up");
        return;
      }
      setRemainingMs(left);
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  const apply = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, 99 * 3600 + 3599));
    setRunning(false);
    setDuration(clamped);
    setRemainingMs(clamped * 1000);
  };

  const parts = {
    hours: Math.floor(duration / 3600),
    minutes: Math.floor((duration % 3600) / 60),
    seconds: duration % 60,
  };
  const finished = remainingMs === 0;
  const pristine = remainingMs === duration * 1000;

  return (
    <Flex orientation="vertical" gap="xl" style={{ paddingTop: 24 }}>
      <Flex orientation="vertical" gap="m">
        <Digits>{formatCountdown(Math.ceil(remainingMs / 1000))}</Digits>
        <Progress
          min={0}
          max={duration * 1000 || 1}
          value={duration * 1000 - remainingMs}
        />
      </Flex>

      <Flex gap="m" justify="center">
        <Button
          label="Reset"
          icon={<RotateCcw />}
          size="l"
          disabled={pristine}
          onClick={() => apply(duration)}
        />
        <Button
          label={running ? 'Pause' : 'Start'}
          icon={running ? <Pause /> : <Play />}
          variant="submit"
          size="l"
          disabled={duration === 0 || finished}
          onClick={() => setRunning((value) => !value)}
        />
      </Flex>

      <Flex orientation="vertical" gap="s">
        <Text size={3} weight="bold" color="muted">
          Duration
        </Text>
        <Flex gap="s">
          <DurationField
            label="Hours"
            min={0}
            max={99}
            value={parts.hours}
            onChange={(value = 0) =>
              apply(value * 3600 + parts.minutes * 60 + parts.seconds)
            }
          />
          <DurationField
            label="Min"
            min={0}
            max={59}
            value={parts.minutes}
            onChange={(value = 0) =>
              apply(parts.hours * 3600 + value * 60 + parts.seconds)
            }
          />
          <DurationField
            label="Sec"
            min={0}
            max={59}
            value={parts.seconds}
            onChange={(value = 0) =>
              apply(parts.hours * 3600 + parts.minutes * 60 + value)
            }
          />
        </Flex>
        <Flex gap="s" wrap>
          {TIMER_PRESETS.map((preset) => (
            <Button
              key={preset.seconds}
              label={preset.label}
              selected={duration === preset.seconds}
              onClick={() => apply(preset.seconds)}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

/* ── app ─────────────────────────────────────────────────────── */

const VIEWS: Record<TabId, () => ReactElement> = {
  clock: ClockView,
  stopwatch: StopwatchView,
  timer: TimerView,
};

/**
 * A mobile clock app: current time with a world clock, a stopwatch with laps
 * and a countdown timer. `Screen.BottomNavigation` is the only navigation and
 * `Screen.Content` is capped to a phone-width column, so on a desktop canvas
 * the app stays a centered phone-sized layout; narrow the canvas to see it
 * fill the screen.
 */
export const ClockApp: StoryObj<typeof Screen> = {
  name: 'Clock app',
  render: () => {
    const [tab, setTab] = useState<TabId>('clock');
    const View = VIEWS[tab];

    return (
      <Screen title="Clock" contentAlign="start">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            <Toolbar.Title
              title={TABS.find((candidate) => candidate.id === tab)!.label}
            />
          </Toolbar>
        </Screen.Header>

        <Screen.Content maxWidth={480}>
          <View />
        </Screen.Content>

        <Screen.BottomNavigation>
          <BottomNavigation floating={false}>
            {TABS.map((destination) => (
              <BottomNavigation.Link
                key={destination.id}
                href="#"
                icon={destination.icon}
                label={destination.label}
                selected={tab === destination.id}
                onClick={(event) => {
                  event.preventDefault();
                  setTab(destination.id);
                }}
              />
            ))}
          </BottomNavigation>
        </Screen.BottomNavigation>
      </Screen>
    );
  },
};
