import { useCallback, useState } from 'react';
import {
  GitPullRequest,
  Moon,
  Plug,
  Search as SearchIcon,
  Settings,
  UserPlus,
} from 'lucide-react';
import { Flex, Text } from 'components';
import { AutocompleteInput } from '../AutocompleteInput.tsx';
import {
  AutocompleteRenderSuggestionContext,
  AutocompleteSuggestionsFunc,
} from '../AutocompleteInput.types.ts';

interface Command {
  label: string;
  section: string;
  shortcut?: string;
  icon: React.ReactElement;
}

const COMMANDS: Command[] = [
  { label: 'Create pull request', section: 'Git', shortcut: '⌘ P', icon: <GitPullRequest size={15} /> },
  { label: 'Invite teammate', section: 'Team', icon: <UserPlus size={15} /> },
  { label: 'Open settings', section: 'App', shortcut: '⌘ ,', icon: <Settings size={15} /> },
  { label: 'Toggle dark theme', section: 'App', icon: <Moon size={15} /> },
  { label: 'Install integration', section: 'App', icon: <Plug size={15} /> },
  { label: 'Search the docs', section: 'Help', shortcut: '?', icon: <SearchIcon size={15} /> },
];

const CommandRow = ({
  suggestion,
  inputValue,
}: AutocompleteRenderSuggestionContext<Command>) => {
  const matchLen = suggestion.label
    .toLowerCase()
    .indexOf(inputValue.toLowerCase());

  return (
    <>
      <Flex style={{ color: 'var(--text-2)' }}>{suggestion.icon}</Flex>
      <Text size={3} style={{ flex: 1 }}>
        {matchLen >= 0 ? (
          <>
            {suggestion.label.slice(0, matchLen)}
            <Text size={3} weight="bold">
              {suggestion.label.slice(matchLen, matchLen + inputValue.length)}
            </Text>
            {suggestion.label.slice(matchLen + inputValue.length)}
          </>
        ) : (
          suggestion.label
        )}
      </Text>
      <Text size={1} color="muted" nowrap>
        {suggestion.section}
      </Text>
      {suggestion.shortcut && (
        <Text kbd size={1}>
          {suggestion.shortcut}
        </Text>
      )}
    </>
  );
};

export const CommandPalette = () => {
  const [query, setQuery] = useState('');
  const [ran, setRan] = useState<string | null>(null);

  const getCommands = useCallback<AutocompleteSuggestionsFunc<Command>>(
    async ({ value }) => {
      await new Promise((r) => setTimeout(r, 120));
      return COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(value.toLowerCase()),
      );
    },
    [],
  );

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 460 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          A command palette
        </Text>
        <Text block>
          <Text code>renderSuggestion</Text> returns just the row content —
          icon, match-highlighted label, section, shortcut hint. The field wraps
          it in the interactive row itself, so the sliding highlight, arrow-key
          navigation and <Text code>onSelect</Text> on Enter all come for free.
        </Text>
      </Flex>

      <AutocompleteInput<Command>
        value={query}
        onChange={setQuery}
        getSuggestions={getCommands}
        getSuggestionValue={(c) => c.label}
        renderSuggestion={(props) => <CommandRow {...props} />}
        onSelect={(c) => {
          setRan(c.label);
          setQuery('');
        }}
        placeholder="Type a command…"
      />

      <Text size={2} color="muted">
        {ran ? `Ran: ${ran}` : 'Nothing run yet — try “invite” or “theme”.'}
      </Text>
    </Flex>
  );
};
