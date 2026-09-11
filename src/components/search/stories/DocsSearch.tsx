import { useCallback, useState } from 'react';
import { useListItem } from '@floating-ui/react';
import { FileText } from 'lucide-react';
import { Flex, Text } from 'components';
import { Search } from '../Search.tsx';
import {
  AutocompleteRenderSuggestionContext,
  AutocompleteSuggestionsFunc,
} from '../../autocompleteInput/AutocompleteInput.types.ts';
import { usePopoverCurrentIndex } from '../../popover/Popover.tsx';

interface Doc {
  title: string;
  section: string;
  snippet: string;
}

const DOCS: Doc[] = [
  { title: 'Installation', section: 'Getting started', snippet: 'Add altrone-ui to your project with npm or pnpm and wrap the tree in Application.' },
  { title: 'Theming', section: 'Foundations', snippet: 'Every colour and type value is a CSS custom property; switch light and dark with a data attribute.' },
  { title: 'Form.Field', section: 'Components', snippet: 'Wrap any input to inject name, invalid, disabled and size from context and render the label.' },
  { title: 'TextInput islands', section: 'Components', snippet: 'Icons, actions, counters and prefixes drop into the field as children and lay out in a flex row.' },
  { title: 'Dark theme', section: 'Foundations', snippet: 'A FOUC-blocking script sets the theme before paint; the toggle is JS state to a data attribute.' },
  { title: 'Accessibility', section: 'Foundations', snippet: 'Roving tabindex, focus-visible rings, Escape closes overlays and returns focus to the trigger.' },
];

const highlight = (text: string, q: string) => {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <Text weight="bold">{text.slice(i, i + q.length)}</Text>
      {text.slice(i + q.length)}
    </>
  );
};

const DocRow = ({
  suggestion,
  inputValue,
  onSelect,
}: AutocompleteRenderSuggestionContext<Doc>) => {
  const current = usePopoverCurrentIndex();
  const { ref, index } = useListItem();
  const active = index === current;

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => onSelect(suggestion.title, e)}
      style={{
        display: 'flex',
        gap: 10,
        width: '100%',
        padding: '8px 12px',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        background: active ? 'var(--accent-a3)' : 'transparent',
      }}
    >
      <FileText size={15} style={{ color: 'var(--text-2)', flexShrink: 0, marginTop: 2 }} />
      <Flex direction="vertical" gap="xxs" style={{ minWidth: 0 }}>
        <Flex direction="horizontal" gap="xs" align="center">
          <Text size={3} weight="medium">
            {highlight(suggestion.title, inputValue)}
          </Text>
          <Text size={1} color="muted" nowrap>
            {suggestion.section}
          </Text>
        </Flex>
        <Text size={2} color="muted" lineClamp={2}>
          {highlight(suggestion.snippet, inputValue)}
        </Text>
      </Flex>
    </button>
  );
};

export const DocsSearch = () => {
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState<string | null>(null);

  const search = useCallback<AutocompleteSuggestionsFunc<Doc>>(
    ({ value }) => {
      const q = value.toLowerCase();
      return DOCS.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.snippet.toLowerCase().includes(q),
      );
    },
    [],
  );

  return (
    <Flex direction="horizontal" gap="xl" style={{ maxWidth: 640 }}>
      <Flex direction="vertical" gap="m" style={{ width: 300, flexShrink: 0 }}>
        <Text size={2} weight="bold" color="muted" block>
          DOCUMENTATION
        </Text>
        <Search<Doc>
          value={query}
          onChange={setQuery}
          getSuggestions={search}
          getSuggestionValue={(d) => d.title}
          renderSuggestion={(props) => <DocRow {...props} />}
          onSelect={(d) => setOpened(d.title)}
        />
        <Text size={2} color="muted" block>
          Search-as-you-type over a page index. Each hit shows a breadcrumb and a
          two-line snippet with the query highlighted; nothing matched falls back
          to the built-in empty state.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
        <Text size={6} weight="bold" block>
          {opened ?? 'Pick a result'}
        </Text>
        <Text block color="muted">
          {opened
            ? DOCS.find((d) => d.title === opened)?.snippet
            : 'The selected page would render here.'}
        </Text>
      </Flex>
    </Flex>
  );
};
