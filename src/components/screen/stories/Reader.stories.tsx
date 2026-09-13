import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import {
  Avatar,
  BottomNavigation,
  Box,
  Divider,
  Flex,
  NavigationList,
  Popover,
  Screen,
  SideNavigation,
  Skeleton,
  Text,
  Toolbar,
} from 'components';
import { useBreakpoint } from 'utils';
import {
  BookOpen,
  ChevronLeft,
  Heart,
  Library as LibraryIcon,
  List,
} from 'lucide-react';
import { screenMeta } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Reader',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

const API = 'https://poetrydb.org';

interface StoryBook {
  id: string;
  title: string;
  /** Exact PoetryDB author key — the reading text is fetched by it, never bundled. */
  author: string;
  year: string;
  blurb: string;
}

const LIBRARY: StoryBook[] = [
  {
    id: 'dickinson',
    title: 'A Route of Evanescence',
    author: 'Emily Dickinson',
    year: '1860s',
    blurb: 'Compressed lyric riddles on death, weather, and the turning of the mind.',
  },
  {
    id: 'blake',
    title: 'Songs of Experience',
    author: 'William Blake',
    year: '1794',
    blurb: 'Visionary short poems set against their innocent twins.',
  },
  {
    id: 'poe',
    title: 'The Bells & Other Poems',
    author: 'Edgar Allan Poe',
    year: '1840s',
    blurb: 'Gothic music, grief that will not close, and the uncanny.',
  },
  {
    id: 'rossetti',
    title: 'Goblin Market & Devotions',
    author: 'Christina Rossetti',
    year: '1862',
    blurb: 'Victorian fairy-tale verse with a devotional undertow.',
  },
  {
    id: 'whitman',
    title: 'Inscriptions',
    author: 'Walt Whitman',
    year: '1855',
    blurb: 'The opening address of Leaves of Grass — free verse cataloguing the self.',
  },
  {
    id: 'shakespeare',
    title: 'The Sonnets',
    author: 'William Shakespeare',
    year: '1609',
    blurb: 'Fourteen lines at a time on love, time, and being forgotten.',
  },
  {
    id: 'shelley',
    title: 'Ozymandias & Other Poems',
    author: 'Percy Bysshe Shelley',
    year: '1818',
    blurb: 'Romantic argument at full volume — ruin, wind, and liberty.',
  },
  {
    id: 'byron',
    title: 'Hebrew Melodies',
    author: 'Lord Byron',
    year: '1815',
    blurb: 'Short songs of exile, ash, and walking in beauty.',
  },
];

interface Chapter {
  title: string;
  lines: string[];
}

interface PoetryDbPoem {
  title: string;
  lines: string[];
  linecount: string;
}

interface BookState {
  loading: boolean;
  error: boolean;
  chapters: Chapter[];
}

const useBookText = (book: StoryBook | null): BookState => {
  const [state, setState] = useState<BookState>({
    loading: false,
    error: false,
    chapters: [],
  });

  useEffect(() => {
    if (!book) {
      return;
    }

    let cancelled = false;
    setState({ loading: true, error: false, chapters: [] });

    fetch(`${API}/author/${encodeURIComponent(book.author)}/title,lines,linecount`)
      .then((response) => response.json())
      .then((data: PoetryDbPoem[]) => {
        if (cancelled) {
          return;
        }
        const chapters = data
          .filter((poem) => {
            const count = Number(poem.linecount);
            return count >= 8 && count <= 44;
          })
          .slice(0, 7)
          .map((poem) => ({ title: poem.title, lines: poem.lines }));
        setState({ loading: false, error: chapters.length === 0, chapters });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ loading: false, error: true, chapters: [] });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [book]);

  return state;
};

const BookCard = ({
  book,
  liked,
  onOpen,
}: {
  book: StoryBook;
  liked: boolean;
  onOpen: () => void;
}) => (
  <Box
    shape="rounded"
    material="plate"
    tone="neutral"
    padding={{ x: 16, y: 14 }}
    radius="16px"
    pressable
    focusable
    role="button"
    tabIndex={0}
    onClick={onOpen}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
      }
    }}
    style={{ height: '100%', cursor: 'pointer' }}
  >
    <Flex direction="vertical" gap="s" style={{ height: '100%' }}>
      <Flex justify="between" align="start" gap="s">
        <Text size={4} weight="bold" block style={{ flex: 1, minWidth: 0 }}>
          {book.title}
        </Text>
        {liked ? <Heart size={16} fill="currentColor" /> : null}
      </Flex>
      <Text size={2} color="muted" block>
        {book.author} · {book.year}
      </Text>
      <Text size={3} color="muted" block lineClamp={3}>
        {book.blurb}
      </Text>
    </Flex>
  </Box>
);

const LibraryView = ({
  books,
  filter,
  isLiked,
  onOpen,
}: {
  books: StoryBook[];
  filter: 'all' | 'liked';
  isLiked: (id: string) => boolean;
  onOpen: (id: string) => void;
}) => (
  <Flex direction="vertical" gap="l">
    <Flex direction="vertical" gap="xxs">
      <Text size={7} weight="bold" block>
        {filter === 'liked' ? 'Liked stories' : 'Short stories'}
      </Text>
      <Text size={3} color="muted" block>
        Public-domain verse pulled live from poetrydb.org — pick one to read.
      </Text>
    </Flex>

    {books.length === 0 ? (
      <Text size={3} color="muted" block>
        Nothing liked yet — open a story and tap the heart in the header.
      </Text>
    ) : (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            liked={isLiked(book.id)}
            onOpen={() => onOpen(book.id)}
          />
        ))}
      </div>
    )}
  </Flex>
);

/** Keeps an anchored chapter clear of the fixed `Screen.Header` on jump. */
const SECTION_OFFSET = 'calc(var(--screen-header-height) + var(--space-content))';

const ChapterBlock = ({
  index,
  chapter,
  last,
}: {
  index: number;
  chapter: Chapter;
  last: boolean;
}) => (
  <Flex
    id={`chapter-${index}`}
    direction="vertical"
    gap="m"
    style={{ scrollMarginTop: SECTION_OFFSET }}
  >
    <Flex direction="vertical" gap="xxs">
      <Text size={2} color="muted">
        Chapter {index + 1}
      </Text>
      <Text size={6} weight="bold" block>
        {chapter.title}
      </Text>
    </Flex>
    <Flex direction="vertical" gap="xxs">
      {chapter.lines.map((line, lineIndex) =>
        line.trim() === '' ? (
          <div key={lineIndex} style={{ height: 12 }} />
        ) : (
          <Text key={lineIndex} size={4} block>
            {line}
          </Text>
        ),
      )}
    </Flex>
    {last ? null : <Divider />}
  </Flex>
);

const ReaderView = ({
  book,
  state,
}: {
  book: StoryBook;
  state: BookState;
}) => {
  if (state.loading) {
    return (
      <Flex direction="vertical" gap="m">
        <Skeleton height="44px" width="60%" radius="var(--radius-m)" />
        <Skeleton height="20px" width="40%" radius="var(--radius-s)" />
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} height="18px" radius="var(--radius-s)" />
        ))}
      </Flex>
    );
  }

  if (state.error) {
    return (
      <Text size={3} color="danger" block>
        Could not load “{book.title}” from poetrydb.org — check the connection and
        reopen it.
      </Text>
    );
  }

  return (
    <Flex direction="vertical" gap="xl">
      <Flex direction="vertical" gap="s">
        <Text size={8} weight="bold" block>
          {book.title}
        </Text>
        <Text size={3} color="muted" block>
          {book.author} · {book.year} · {state.chapters.length} chapters
        </Text>
        <Text size={3} block>
          {book.blurb}
        </Text>
      </Flex>

      {state.chapters.map((chapter, index) => (
        <ChapterBlock
          key={index}
          index={index}
          chapter={chapter}
          last={index === state.chapters.length - 1}
        />
      ))}
    </Flex>
  );
};

/**
 * The chapter list. `sticky` pins it inside the (non-sticky by default)
 * `Screen.Aside` column on desktop; in the mobile `Popover` it's a fixed-width
 * panel and `onNavigate` closes the popup after a jump.
 */
const Contents = ({
  state,
  progress,
  sticky = false,
  onNavigate,
}: {
  state: BookState;
  progress: number;
  sticky?: boolean;
  onNavigate?: () => void;
}) => (
  <Flex
    direction="vertical"
    gap="m"
    style={sticky ? { position: 'sticky', top: SECTION_OFFSET } : { width: 240 }}
  >
    {state.loading ? (
      <Flex direction="vertical" gap="xxs">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} height="24px" radius="8px" />
        ))}
      </Flex>
    ) : (
      <SideNavigation title="Contents">
        {state.chapters.map((chapter, index) => (
          <SideNavigation.Item
            key={index}
            href={`#chapter-${index}`}
            label={`${index + 1}. ${chapter.title}`}
            onClick={onNavigate}
          />
        ))}
      </SideNavigation>
    )}

    <Divider />
    <Text size={2} color="muted">
      {progress}% read
    </Text>
  </Flex>
);

/**
 * A pocket reader for public-domain short texts, fetched live from
 * poetrydb.org — no story text lives in this file. The layout is **adaptive**,
 * switching idiom at the `md` viewport breakpoint (`useBreakpoint`):
 *
 * - **Library filter.** Desktop: a persistent `Screen.Sidebar`
 *   (`visibleFrom="md"`). Mobile: `Screen.BottomNavigation` (`hiddenFrom="md"`)
 *   with the same All / Liked items. Either way it's library-only — opening a
 *   story unmounts it.
 * - **Table of contents.** Desktop: an inline `Screen.Aside` column holding a
 *   sticky `SideNavigation`; the header's *Contents* action toggles its
 *   `collapsed` prop. Mobile: no column — *Contents* is a `Popover` trigger and
 *   the same `SideNavigation` lives in the overlay; picking a chapter jumps to
 *   its section and closes the popup. `SideNavigation`'s built-in scroll-spy
 *   tracks the current chapter in both.
 * - **Reading measure.** Desktop caps `Screen.Content` at `maxWidth={550}` and
 *   centres it (gutters + the Aside column beside it); mobile drops the cap and
 *   the column runs edge to edge.
 * - **Header controls.** Desktop keeps text labels (`‹ Library`, *Contents*,
 *   *Like*). Mobile goes icon-only — a bare `Toolbar.BackAction` arrow and
 *   `showLabel={false}` on the rest — so the row fits a handset. `Toolbar.Title`
 *   truncates the book title to whatever space is left.
 *
 * Throughout, `Screen` scrolls as one document — the header stays pinned, the
 * footer sits at the end.
 */
export const Reader: StoryObj<typeof Screen> = {
  name: 'Reader',
  render: () => {
    const [view, setView] = useState<'library' | 'reader'>('library');
    const [openId, setOpenId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'liked'>('all');
    const [liked, setLiked] = useState<Record<string, boolean>>({});
    const [progress, setProgress] = useState(0);
    const [asideCollapsed, setAsideCollapsed] = useState(false);

    /** Below `md` the reader takes its mobile idiom (bottom bar, popover TOC). */
    const isCompact = !useBreakpoint().isMd;

    const activeBook =
      view === 'reader'
        ? (LIBRARY.find((entry) => entry.id === openId) ?? null)
        : null;
    const state = useBookText(activeBook);

    const likedCount = Object.values(liked).filter(Boolean).length;
    const visibleBooks =
      filter === 'liked' ? LIBRARY.filter((entry) => liked[entry.id]) : LIBRARY;

    const openBook = (id: string) => {
      setOpenId(id);
      setView('reader');
      setProgress(0);
      setAsideCollapsed(false);
      window.scrollTo({ top: 0 });
    };

    const closeBook = () => {
      setView('library');
      setOpenId(null);
      window.scrollTo({ top: 0 });
    };

    const toggleLike = (id: string) =>
      setLiked((current) => ({ ...current, [id]: !current[id] }));

    useEffect(() => {
      if (view !== 'reader' || state.chapters.length === 0) {
        return;
      }

      const onScroll = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(
          max > 0
            ? Math.min(100, Math.max(0, Math.round((doc.scrollTop / max) * 100)))
            : 0,
        );
      };

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, [view, state.chapters.length]);

    return (
      <Screen title={activeBook ? activeBook.title : 'Reader'}>
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            {activeBook ? (
              <>
                <Toolbar.Group>
                  {isCompact ? (
                    <Toolbar.BackAction onClick={closeBook} />
                  ) : (
                    <Toolbar.Action
                      label="Library"
                      icon={<ChevronLeft />}
                      onClick={closeBook}
                    />
                  )}
                </Toolbar.Group>
                <Toolbar.Title label={activeBook.title} />
                <Toolbar.Separator />
                <Toolbar.Group>
                  {isCompact ? (
                    <Popover
                      placement="bottom-end"
                      content={({ closePopup }) => (
                        <Contents
                          state={state}
                          progress={progress}
                          onNavigate={closePopup}
                        />
                      )}
                    >
                      <Toolbar.Action
                        label="Contents"
                        icon={<List />}
                        showLabel={false}
                      />
                    </Popover>
                  ) : (
                    <Toolbar.Action
                      label="Contents"
                      icon={<List />}
                      selected={!asideCollapsed}
                      onClick={() => setAsideCollapsed((value) => !value)}
                    />
                  )}
                  <Toolbar.Action
                    label={liked[activeBook.id] ? 'Liked' : 'Like'}
                    icon={
                      <Heart
                        fill={liked[activeBook.id] ? 'currentColor' : 'none'}
                      />
                    }
                    showLabel={!isCompact}
                    selected={Boolean(liked[activeBook.id])}
                    onClick={() => toggleLike(activeBook.id)}
                  />
                </Toolbar.Group>
                <Toolbar.Group>
                  <Avatar firstName="Ada" lastName="Lovelace" />
                </Toolbar.Group>
              </>
            ) : (
              <>
                <Toolbar.Logo>
                  <BookOpen size={26} />
                </Toolbar.Logo>
                <Toolbar.Title label="Reader" />
                <Toolbar.Separator />
                <Toolbar.Group>
                  <Toolbar.SearchAction showLabel={false} />
                </Toolbar.Group>
                <Toolbar.Group>
                  <Avatar firstName="Ada" lastName="Lovelace" />
                </Toolbar.Group>
              </>
            )}
          </Toolbar>
        </Screen.Header>

        {view === 'library' ? (
          <Screen.Sidebar visibleFrom="md">
            <NavigationList>
              <NavigationList.Group title="Library">
                <NavigationList.Link
                  href="#"
                  icon={<LibraryIcon />}
                  label="All stories"
                  badge={LIBRARY.length}
                  selected={filter === 'all'}
                  onClick={(event) => {
                    event.preventDefault();
                    setFilter('all');
                  }}
                />
                <NavigationList.Link
                  href="#"
                  icon={<Heart />}
                  label="Liked"
                  badge={likedCount || undefined}
                  selected={filter === 'liked'}
                  onClick={(event) => {
                    event.preventDefault();
                    setFilter('liked');
                  }}
                />
              </NavigationList.Group>
            </NavigationList>
          </Screen.Sidebar>
        ) : null}

        <Screen.Content maxWidth={activeBook && !isCompact ? 550 : undefined}>
          {activeBook ? (
            <ReaderView book={activeBook} state={state} />
          ) : (
            <LibraryView
              books={visibleBooks}
              filter={filter}
              isLiked={(id) => Boolean(liked[id])}
              onOpen={openBook}
            />
          )}
        </Screen.Content>

        {activeBook && !isCompact ? (
          <Screen.Aside collapsed={asideCollapsed}>
            <Contents state={state} progress={progress} sticky />
          </Screen.Aside>
        ) : null}

        {view === 'library' ? (
          <Screen.BottomNavigation hiddenFrom="md">
            <BottomNavigation floating={false}>
              <BottomNavigation.Item
                href="#"
                icon={<LibraryIcon />}
                label="All stories"
                badge={LIBRARY.length}
                selected={filter === 'all'}
                onClick={(event) => {
                  event.preventDefault();
                  setFilter('all');
                }}
              />
              <BottomNavigation.Item
                href="#"
                icon={<Heart />}
                label="Liked"
                badge={likedCount || undefined}
                selected={filter === 'liked'}
                onClick={(event) => {
                  event.preventDefault();
                  setFilter('liked');
                }}
              />
            </BottomNavigation>
          </Screen.BottomNavigation>
        ) : null}

        <Screen.Footer>
          <Flex justify="between" align="center">
            {activeBook ? (
              <>
                <Text size={2} color="muted">
                  {activeBook.author} · {activeBook.year}
                </Text>
                <Text size={2} color="muted">
                  {progress}% · {state.chapters.length} chapters
                  {liked[activeBook.id] ? ' · liked' : ''}
                </Text>
              </>
            ) : (
              <>
                <Text size={2} color="muted">
                  {visibleBooks.length}{' '}
                  {visibleBooks.length === 1 ? 'story' : 'stories'}
                </Text>
                <Text size={2} color="muted">
                  {likedCount} liked · source: poetrydb.org
                </Text>
              </>
            )}
          </Flex>
        </Screen.Footer>
      </Screen>
    );
  },
};
