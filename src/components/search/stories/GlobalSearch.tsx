import { useCallback, useState } from 'react';
import { useListItem } from '@floating-ui/react';
import {
  FileText,
  Hash,
  Settings2,
  User,
} from 'lucide-react';
import { Flex, Text } from 'components';
import { Search } from '../Search.tsx';
import {
  AutocompleteRenderSuggestionContext,
  AutocompleteSuggestionsFunc,
} from '../../autocompleteInput/AutocompleteInput.types.ts';
import { usePopoverCurrentIndex } from '../../popover/Popover.tsx';

type Kind = 'person' | 'doc' | 'channel' | 'setting';

interface Hit {
  kind: Kind;
  label: string;
  meta: string;
}

const ICON: Record<Kind, React.ReactElement> = {
  person: <User size={15} />,
  doc: <FileText size={15} />,
  channel: <Hash size={15} />,
  setting: <Settings2 size={15} />,
};

const KIND_LABEL: Record<Kind, string> = {
  person: 'Person',
  doc: 'Document',
  channel: 'Channel',
  setting: 'Setting',
};

const INDEX: Hit[] = [
  { kind: 'person', label: 'Ada Okafor', meta: 'Design · online' },
  { kind: 'person', label: 'Bruno Lima', meta: 'Backend · away' },
  { kind: 'doc', label: 'v4 migration plan', meta: 'edited 2h ago by you' },
  { kind: 'doc', label: 'Design tokens reference', meta: 'edited yesterday' },
  { kind: 'channel', label: 'design-system', meta: '38 members' },
  { kind: 'channel', label: 'incidents', meta: '12 members' },
  { kind: 'setting', label: 'Two-factor authentication', meta: 'Security' },
  { kind: 'setting', label: 'Notification preferences', meta: 'Account' },
];

const HitRow = ({
  suggestion,
  inputValue,
  onSelect,
}: AutocompleteRenderSuggestionContext<Hit>) => {
  const current = usePopoverCurrentIndex();
  const { ref, index } = useListItem();
  const active = index === current;
  const i = suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase());

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => onSelect(suggestion.label, e)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '8px 12px',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        background: active ? 'var(--accent-a3)' : 'transparent',
      }}
    >
      <Flex style={{ color: 'var(--text-2)' }}>{ICON[suggestion.kind]}</Flex>
      <Text size={3} style={{ flex: 1 }}>
        {i >= 0 ? (
          <>
            {suggestion.label.slice(0, i)}
            <Text weight="bold">
              {suggestion.label.slice(i, i + inputValue.length)}
            </Text>
            {suggestion.label.slice(i + inputValue.length)}
          </>
        ) : (
          suggestion.label
        )}
      </Text>
      <Text size={1} color="muted" nowrap>
        {KIND_LABEL[suggestion.kind]} · {suggestion.meta}
      </Text>
    </button>
  );
};

export const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState<string | null>(null);

  const search = useCallback<AutocompleteSuggestionsFunc<Hit>>(
    async ({ value }) => {
      await new Promise((r) => setTimeout(r, 90));
      const q = value.toLowerCase();
      return INDEX.filter((h) => h.label.toLowerCase().includes(q));
    },
    [],
  );

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 480 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Search everything
        </Text>
        <Text block>
          One field over a mixed index — people, documents, channels, settings.{' '}
          <Text code>renderSuggestion</Text> gives each type its own icon and
          trailing label so the results stay scannable.
        </Text>
      </Flex>

      <Search<Hit>
        value={query}
        onChange={setQuery}
        getSuggestions={search}
        getSuggestionValue={(h) => h.label}
        renderSuggestion={(props) => <HitRow {...props} />}
        onSelect={(h) => setOpened(`${KIND_LABEL[h.kind]}: ${h.label}`)}
        placeholder="Jump to anything"
      />

      <Text size={2} color="muted">
        {opened ? `Opened → ${opened}` : 'Try “design”, “v4”, or “two”.'}
      </Text>
    </Flex>
  );
};
