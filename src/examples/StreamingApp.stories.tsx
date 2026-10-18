import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Label, Screen, Text, useAltroneTheme } from 'components';
import { List, Play } from 'lucide-react';
import { screenMeta } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Applications/Streaming app',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

/* ── demo data ───────────────────────────────────────────────── */

const picture = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/altrone-lost-${seed}/${w}/${h}`;

const SEASON_EPISODES = [25, 24, 23, 14, 17, 18];

const SEASON_4_TITLES = [
  'The Beginning of the End',
  'Confirmed Dead',
  'The Economist',
  'Eggtown',
  'The Constant',
  'The Other Woman',
  'Ji Yeon',
  'Meet Kevin Johnson',
  'The Shape of Things to Come',
  'Something Nice Back Home',
  'Cabin Fever',
  "There's No Place Like Home, Part 1",
  "There's No Place Like Home, Part 2",
  "There's No Place Like Home, Part 3",
];

const SEASON_1_TITLES = [
  'Pilot, Part 1',
  'Pilot, Part 2',
  'Tabula Rasa',
  'Walkabout',
  'White Rabbit',
  'House of the Rising Sun',
  'The Moth',
  'Confidence Man',
];

const INITIAL = { season: 4, episode: 8 };

const episodeTitle = (season: number, episode: number) => {
  if (season === 4) return SEASON_4_TITLES[episode - 1];
  if (season === 1 && episode <= SEASON_1_TITLES.length) {
    return SEASON_1_TITLES[episode - 1];
  }
  return `Episode ${episode}`;
};

const episodeRuntime = (season: number, episode: number) =>
  41 + ((season * 7 + episode * 3) % 5);

/* ── pieces ──────────────────────────────────────────────────── */

const onHero: CSSProperties = { color: 'var(--white)', textAlign: 'center' };

const GRID: CSSProperties = {
  display: 'grid',
  gap: 'calc(var(--space-section) * 1.5)',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
};

interface EpisodeRef {
  season: number;
  episode: number;
}

const EpisodeCard = ({
  season,
  episode,
  current,
  onPlay,
}: EpisodeRef & { current: boolean; onPlay: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Flex orientation="vertical" gap="xs" style={{ minWidth: 0 }}>
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <img
          src={picture(`s${season}e${episode}`, 480, 270)}
          alt=""
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 'var(--radius-l)',
            background: 'var(--gray-a3)',
            outline: current ? '2px solid var(--accent-9)' : undefined,
            outlineOffset: 2,
          }}
        />
        {current ? (
          <div
            style={{
              position: 'absolute',
              insetBlockStart: 10,
              insetInlineStart: 10,
            }}
          >
            <Label variant="soft" color="primary" size="s">
              Now playing
            </Label>
          </div>
        ) : null}
        <Flex
          align="center"
          justify="center"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'var(--radius-l)',
            background: 'var(--black-a6)',
            opacity: hovered || focused ? 1 : 0,
            transition: 'opacity var(--motion-duration-fast)',
            pointerEvents: hovered || focused ? 'auto' : 'none',
          }}
        >
          <Button
            label={`Play episode ${episode}`}
            showLabel={false}
            icon={<Play />}
            size="l"
            onClick={onPlay}
          />
        </Flex>
      </div>
      <Text size={4} weight="medium" truncate block>
        {episode}. {episodeTitle(season, episode)}
      </Text>
      <Text size={3} color="muted" block>
        {episodeRuntime(season, episode)} min
      </Text>
    </Flex>
  );
};

/* ── the screen ──────────────────────────────────────────────── */

/**
 * A streaming-service title page, always dark: a full-bleed hero showing the
 * still of the current episode with centered title and actions, then season
 * buttons and a grid of episode stills. Hovering a still reveals a play
 * button that scrolls back to the hero and makes that episode the current one.
 * `Screen.Content` is stripped of its padding so the hero reaches every edge;
 * the episodes section brings its own gutters back.
 */
export const StreamingApp: StoryObj<typeof Screen> = {
  name: 'Streaming app',
  render: () => {
    const { theme, setTheme } = useAltroneTheme();
    const [current, setCurrent] = useState<EpisodeRef>(INITIAL);
    const [season, setSeason] = useState(INITIAL.season);
    const heroRef = useRef<HTMLDivElement>(null);
    const episodesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setTheme('dark');
      return () => setTheme(theme);
    }, []);

    const play = (target: EpisodeRef) => {
      setCurrent(target);
      heroRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <Screen title="Lost">
        <Screen.Content style={{ padding: 0 }}>
          <Flex orientation="vertical" gap="xl">
            <div
              ref={heroRef}
              style={{
                width: '100%',
                minHeight: 680,
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${picture(`s${current.season}e${current.episode}`, 1920, 1080)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, var(--app-background) 0%, var(--black-a9) 35%, var(--black-a6) 100%)',
                }}
              />
              <Flex
                orientation="vertical"
                align="center"
                justify="end"
                gap="m"
                style={{
                  position: 'relative',
                  minHeight: 680,
                  padding: 'var(--space-section)',
                  maxWidth: 820,
                  marginInline: 'auto',
                }}
              >
                <Text size={4} block style={onHero}>
                  2004 · 6 seasons · Adventure, Mystery
                </Text>
                <Text
                  size={9}
                  weight="bold"
                  block
                  style={{
                    ...onHero,
                    fontSize: 'clamp(56px, 8vw, 96px)',
                    lineHeight: 1.1,
                  }}
                >
                  Lost
                </Text>
                <Text size={6} weight="medium" block style={onHero}>
                  {[
                    `Season ${current.season}`,
                    `Episode ${current.episode}`,
                    episodeTitle(current.season, current.episode),
                  ]
                    .filter((part, i, parts) => parts.indexOf(part) === i)
                    .join(' · ')}
                </Text>
                <Text size={5} block style={{ ...onHero, maxWidth: 640 }}>
                  Survivors of a plane crash find themselves stranded on a
                  mysterious island, where nothing is quite what it seems.
                </Text>
                <Flex gap="s" justify="center" wrap>
                  <Button
                    label={`Play ${current.season}S${current.episode}E`}
                    icon={<Play />}
                    variant="submit"
                    size="xl"
                  />
                  <Button
                    label="Episodes"
                    icon={<List />}
                    size="xl"
                    onClick={() =>
                      episodesRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }
                  />
                </Flex>
              </Flex>
            </div>

            <div
              ref={episodesRef}
              style={{
                width: '100%',
                maxWidth: 1400,
                marginInline: 'auto',
                padding:
                  '0 var(--space-section) calc(var(--space-section) * 2)',
              }}
            >
              <Flex orientation="vertical" gap="l">
                <Text size={7} weight="bold">
                  Episodes
                </Text>
                <Flex gap="s" wrap>
                  {SEASON_EPISODES.map((_, i) => (
                    <Button
                      key={i}
                      label={`Season ${i + 1}`}
                      size="l"
                      selected={season === i + 1}
                      onClick={() => setSeason(i + 1)}
                    />
                  ))}
                </Flex>
                <div style={GRID}>
                  {Array.from(
                    { length: SEASON_EPISODES[season - 1] },
                    (_, i) => (
                      <EpisodeCard
                        key={`${season}-${i}`}
                        season={season}
                        episode={i + 1}
                        current={
                          season === current.season && i + 1 === current.episode
                        }
                        onPlay={() => play({ season, episode: i + 1 })}
                      />
                    ),
                  )}
                </div>
              </Flex>
            </div>
          </Flex>
        </Screen.Content>
      </Screen>
    );
  },
};
