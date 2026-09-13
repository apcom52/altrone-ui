import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  BottomNavigation,
  Box,
  Divider,
  Dropdown,
  Flex,
  Label,
  Screen,
  Text,
  TextInput,
  Toolbar,
} from 'components';
import { useBreakpoint } from 'utils';
import {
  Compass,
  ListMusic,
  MoreHorizontal,
  Play,
  Radio,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import { screenMeta } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Music app',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

/* ── demo data ───────────────────────────────────────────────── */

const cover = (seed: string, px = 240) =>
  `https://picsum.photos/seed/altrone-music-${seed}/${px}/${px}`;

const MADE_FOR_YOU = [
  { seed: 'daily-1', title: 'Daily Mix 1', subtitle: 'Marina Vale, Sundial…' },
  { seed: 'daily-2', title: 'Daily Mix 2', subtitle: 'Cassette Club, Alder…' },
  {
    seed: 'discover',
    title: 'Discover Weekly',
    subtitle: 'Fresh finds, every Monday',
  },
  {
    seed: 'radar',
    title: 'Release Radar',
    subtitle: 'New from artists you follow',
  },
  {
    seed: 'repeat',
    title: 'On Repeat',
    subtitle: 'The songs you keep coming back to',
  },
  { seed: 'lofi', title: 'Chill Lofi', subtitle: 'Low-key beats for focus' },
];

const ALBUMS = [
  { seed: 'neon', title: 'Neon Meridian', artist: 'Cassette Club' },
  { seed: 'paper', title: 'Paper Cities', artist: 'The Long Now' },
  { seed: 'glass', title: 'Glasshouse', artist: 'Marina Vale' },
  { seed: 'north', title: 'Northbound', artist: 'Alder & Ash' },
  { seed: 'slow', title: 'Slow Light', artist: 'Hana Ito' },
];

const ARTISTS = [
  ['Marina', 'Vale'],
  ['Cassette', 'Club'],
  ['Hana', 'Ito'],
  ['Alder', 'Ash'],
  ['The', 'Long Now'],
  ['Sundial', ''],
] as const;

const TRACKS = [
  {
    title: 'Midnight Ferry',
    artist: 'Marina Vale',
    album: 'glass',
    length: '3:42',
  },
  {
    title: 'Paper Cities',
    artist: 'The Long Now',
    album: 'paper',
    length: '4:07',
  },
  { title: 'Low Tide', artist: 'Hana Ito', album: 'slow', length: '2:58' },
  {
    title: 'Northbound',
    artist: 'Alder & Ash',
    album: 'north',
    length: '5:12',
  },
  {
    title: 'Neon Meridian',
    artist: 'Cassette Club',
    album: 'neon',
    length: '3:33',
  },
];

const MOODS = [
  'Focus',
  'Chill',
  'Workout',
  'Party',
  'Sleep',
  'Commute',
  'Feel Good',
  'Throwback',
];

const STATIONS = [
  { seed: 'st-fm', name: 'Altrone FM', tag: 'Indie / Alt' },
  { seed: 'st-focus', name: 'Deep Focus Radio', tag: 'Ambient' },
  { seed: 'st-golden', name: 'Golden Hour', tag: 'Soul / Funk' },
  { seed: 'st-night', name: 'Night Drive', tag: 'Synthwave' },
];

/* ── navigation model ────────────────────────────────────────── */

type TabId = 'listen' | 'browse' | 'radio' | 'playlists' | 'artists' | 'search';

interface Destination {
  id: TabId;
  label: string;
  icon: ReactElement;
}

const DESTINATIONS: Destination[] = [
  { id: 'listen', label: 'Listen Now', icon: <Play /> },
  { id: 'browse', label: 'Browse', icon: <Compass /> },
  { id: 'radio', label: 'Radio', icon: <Radio /> },
  { id: 'playlists', label: 'Playlists', icon: <ListMusic /> },
  { id: 'artists', label: 'Artists', icon: <Users /> },
  { id: 'search', label: 'Search', icon: <Search /> },
];

/** Kept in the bar on touch; the rest collapse behind the Menu button. */
const PRIMARY: TabId[] = ['listen', 'browse', 'radio'];
const OVERFLOW = DESTINATIONS.filter((d) => !PRIMARY.includes(d.id));

/* ── small presentational pieces ─────────────────────────────── */

const GRID: CSSProperties = {
  display: 'grid',
  gap: 'var(--space-content)',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
};

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <Text size={6} weight="bold" block>
    {children}
  </Text>
);

const CoverCard = ({
  seed,
  title,
  subtitle,
}: {
  seed: string;
  title: string;
  subtitle?: string;
}) => (
  <Flex direction="vertical" gap="xs" style={{ minWidth: 0 }}>
    <img
      src={cover(seed)}
      alt=""
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        objectFit: 'cover',
        borderRadius: 'var(--radius-l)',
        background: 'var(--gray-a3)',
      }}
    />
    <Text size={3} weight="medium" truncate block>
      {title}
    </Text>
    {subtitle ? (
      <Text size={2} color="muted" truncate block>
        {subtitle}
      </Text>
    ) : null}
  </Flex>
);

const TrackRow = ({
  index,
  track,
}: {
  index: number;
  track: (typeof TRACKS)[number];
}) => (
  <Flex align="center" gap="m" style={{ width: '100%', minWidth: 0 }}>
    <Text size={2} color="muted" style={{ width: 20, textAlign: 'end' }}>
      {index}
    </Text>
    <img
      src={cover(track.album, 80)}
      alt=""
      width={40}
      height={40}
      style={{
        borderRadius: 'var(--radius-s)',
        objectFit: 'cover',
        flexShrink: 0,
        background: 'var(--gray-a3)',
      }}
    />
    <Flex direction="vertical" style={{ flex: 1, minWidth: 0 }}>
      <Text size={3} truncate block>
        {track.title}
      </Text>
      <Text size={2} color="muted" truncate block>
        {track.artist}
      </Text>
    </Flex>
    <Text size={2} color="muted">
      {track.length}
    </Text>
  </Flex>
);

/* ── per-destination views ───────────────────────────────────── */

const ListenNow = () => (
  <Flex direction="vertical" gap="xl">
    <Box
      material="translucent"
      tone="accent"
      shape="rounded"
      padding={20}
      radius={24}
      style={{ width: '100%' }}
    >
      <Flex gap="l" align="center" wrap>
        <img
          src={cover('featured', 320)}
          alt=""
          width={160}
          height={160}
          style={{ borderRadius: 'var(--radius-l)', objectFit: 'cover' }}
        />
        <Flex direction="vertical" gap="xs" style={{ flex: 1, minWidth: 200 }}>
          <Text size={2} color="muted">
            Featured Playlist
          </Text>
          <Text size={7} weight="bold" block>
            City Lights After Dark
          </Text>
          <Text size={3} color="muted" block>
            A slow-burn set of late-night electronica and downtempo cuts.
          </Text>
          <Flex gap="s" align="center" wrap>
            <Label variant="soft" color="primary" size="mini">
              Updated today
            </Label>
            <Text size={2} color="muted">
              48 songs · 2 hr 54 min
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>

    <Flex direction="vertical" gap="m">
      <SectionTitle>Made for You</SectionTitle>
      <div style={GRID}>
        {MADE_FOR_YOU.map((playlist) => (
          <CoverCard key={playlist.seed} {...playlist} />
        ))}
      </div>
    </Flex>

    <Flex direction="vertical" gap="m">
      <SectionTitle>Recently Played</SectionTitle>
      <div style={GRID}>
        {ALBUMS.map((album) => (
          <CoverCard
            key={album.seed}
            seed={album.seed}
            title={album.title}
            subtitle={album.artist}
          />
        ))}
      </div>
    </Flex>

    <Flex direction="vertical" gap="m">
      <SectionTitle>Top Songs Today</SectionTitle>
      <Box
        material="plate"
        shape="rounded"
        padding={12}
        style={{ width: '100%' }}
      >
        <Flex direction="vertical" gap="s">
          {TRACKS.map((track, i) => (
            <TrackRow key={track.title} index={i + 1} track={track} />
          ))}
        </Flex>
      </Box>
    </Flex>
  </Flex>
);

const Browse = () => (
  <Flex direction="vertical" gap="xl">
    <Flex direction="vertical" gap="m">
      <SectionTitle>Browse by Mood</SectionTitle>
      <div style={GRID}>
        {MOODS.map((mood, i) => (
          <Box
            key={mood}
            material="translucent"
            tone="accent"
            shape="rounded"
            padding={16}
            radius={12}
            style={{ minHeight: 88 }}
          >
            <Flex direction="vertical" gap="l">
              <Text size={4} weight="bold" block>
                {mood}
              </Text>
              <Text size={2} color="muted">
                {12 + i * 3} playlists
              </Text>
            </Flex>
          </Box>
        ))}
      </div>
    </Flex>

    <Flex direction="vertical" gap="m">
      <SectionTitle>New Releases</SectionTitle>
      <div style={GRID}>
        {ALBUMS.map((album) => (
          <CoverCard
            key={album.seed}
            seed={album.seed}
            title={album.title}
            subtitle={album.artist}
          />
        ))}
      </div>
    </Flex>
  </Flex>
);

const RadioView = () => (
  <Flex direction="vertical" gap="m">
    <SectionTitle>Stations</SectionTitle>
    <Flex direction="vertical" gap="s">
      {STATIONS.map((station) => (
        <Box
          key={station.seed}
          material="plate"
          shape="rounded"
          padding={12}
          style={{ width: '100%' }}
        >
          <Flex align="center" gap="m">
            <img
              src={cover(station.seed, 96)}
              alt=""
              width={48}
              height={48}
              style={{
                borderRadius: 'var(--radius-m)',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <Flex direction="vertical" style={{ flex: 1, minWidth: 0 }}>
              <Text size={3} weight="medium" truncate block>
                {station.name}
              </Text>
              <Text size={2} color="muted" truncate block>
                {station.tag}
              </Text>
            </Flex>
            <Label variant="soft" color="danger" size="mini">
              Live
            </Label>
          </Flex>
        </Box>
      ))}
    </Flex>
  </Flex>
);

const Playlists = () => (
  <Flex direction="vertical" gap="m">
    <SectionTitle>Your Playlists</SectionTitle>
    <div style={GRID}>
      {[...MADE_FOR_YOU, ...MADE_FOR_YOU.slice(0, 3)].map((playlist, i) => (
        <CoverCard
          key={`${playlist.seed}-${i}`}
          seed={`${playlist.seed}-${i}`}
          title={i < MADE_FOR_YOU.length ? playlist.title : `Mix ${i}`}
          subtitle={`${20 + i * 7} songs`}
        />
      ))}
    </div>
  </Flex>
);

const Artists = () => (
  <Flex direction="vertical" gap="xl">
    <Flex direction="vertical" gap="m">
      <SectionTitle>Artists You Follow</SectionTitle>
      <div
        style={{
          ...GRID,
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        }}
      >
        {ARTISTS.map(([first, last]) => (
          <Flex key={first} direction="vertical" align="center" gap="xs">
            <Avatar firstName={first} lastName={last || undefined} size="xl" />
            <Text size={2} weight="medium" truncate block>
              {`${first} ${last}`.trim()}
            </Text>
          </Flex>
        ))}
      </div>
    </Flex>

    <Flex direction="vertical" gap="m">
      <SectionTitle>Top Tracks</SectionTitle>
      <Box
        material="plate"
        shape="rounded"
        padding={12}
        style={{ width: '100%' }}
      >
        <Flex direction="vertical" gap="s">
          {TRACKS.map((track, i) => (
            <TrackRow key={track.title} index={i + 1} track={track} />
          ))}
        </Flex>
      </Box>
    </Flex>
  </Flex>
);

const SearchView = () => {
  const [query, setQuery] = useState('');

  return (
    <Flex direction="vertical" gap="xl">
      <TextInput
        value={query}
        onChange={(value) => setQuery(value)}
        placeholder="Artists, songs, or albums"
      />
      <Flex direction="vertical" gap="m">
        <SectionTitle>Browse Genres</SectionTitle>
        <Flex gap="s" wrap>
          {[
            'Pop',
            'Hip-Hop',
            'Rock',
            'Electronic',
            'Jazz',
            'Classical',
            'R&B',
            'Ambient',
          ].map((genre) => (
            <Label key={genre} variant="soft" color="primary" size="m">
              {genre}
            </Label>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

const VIEWS: Record<TabId, ReactElement> = {
  listen: <ListenNow />,
  browse: <Browse />,
  radio: <RadioView />,
  playlists: <Playlists />,
  artists: <Artists />,
  search: <SearchView />,
};

/* ── the screen ──────────────────────────────────────────────── */

/**
 * `BottomNavigation` is not a touch-only idiom. Here `Screen.BottomNavigation`
 * carries **no** `visibleFrom` / `hiddenFrom`, so the bar is the primary
 * navigation at every width — a media app (Apple Music / Spotify style) where a
 * persistent transport-adjacent bar reads better than a sidebar even on
 * desktop.
 *
 * The adaptation is inside the bar, not a swap of zones: at desktop width every
 * destination gets its own slot; below `mobileBreakpoint` only the top three
 * stay and the last slot becomes a **Menu** button — a `Dropdown` trigger that
 * opens upward with the overflow (Playlists, Artists, Search) plus Settings —
 * the same navigation, one tap deeper.
 */
export const MusicApp: StoryObj<typeof Screen> = {
  name: 'Music app',
  render: () => {
    const { isLg } = useBreakpoint();
    const [tab, setTab] = useState<TabId>('listen');

    const barItems = isLg
      ? DESTINATIONS.map((destination) => (
          <BottomNavigation.Item
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
        ))
      : [
          ...DESTINATIONS.filter((destination) =>
            PRIMARY.includes(destination.id),
          ).map((destination) => (
            <BottomNavigation.Item
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
          )),
          <Dropdown
            key="menu"
            placement="top-end"
            content={
              <Dropdown.Menu>
                {[
                  ...OVERFLOW.map((destination) => (
                    <Dropdown.Action
                      key={destination.id}
                      icon={destination.icon}
                      label={destination.label}
                      hintText={tab === destination.id ? 'Current' : undefined}
                      onClick={() => setTab(destination.id)}
                    />
                  )),
                  <Divider key="sep" />,
                  <Dropdown.Action
                    key="settings"
                    icon={<Settings />}
                    label="Settings"
                  />,
                ]}
              </Dropdown.Menu>
            }
          >
            {() => (
              <BottomNavigation.Item
                icon={<MoreHorizontal />}
                label="Menu"
                selected={OVERFLOW.some(
                  (destination) => destination.id === tab,
                )}
              />
            )}
          </Dropdown>,
        ];

    return (
      <Screen title="Music" mobileBreakpoint="lg">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            <Toolbar.Logo
              style={{ '--toolbar-logo-size': '32px' } as CSSProperties}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/4505/4505917.png"
                alt=""
                style={{ objectFit: 'contain' }}
              />
            </Toolbar.Logo>
            <Toolbar.Title label="Soundwave" />
            <Toolbar.Separator />
            <Toolbar.Group>
              <Toolbar.SearchAction
                showLabel={false}
                onClick={() => setTab('search')}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Avatar firstName="Ada" lastName="Lovelace" />
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>

        <Screen.Content>{VIEWS[tab]}</Screen.Content>

        <Screen.BottomNavigation>
          <BottomNavigation floating={false}>{barItems}</BottomNavigation>
        </Screen.BottomNavigation>
      </Screen>
    );
  },
};
