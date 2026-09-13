import { useCallback, useState } from 'react';
import { X } from 'lucide-react';
import { Avatar, Flex, Text } from 'components';
import { AutocompleteInput } from '../AutocompleteInput.tsx';
import {
  AutocompleteRenderSuggestionContext,
  AutocompleteSuggestionsFunc,
} from '../AutocompleteInput.types.ts';

interface Person {
  first: string;
  last: string;
  role: string;
}

const PEOPLE: Person[] = [
  { first: 'Ada', last: 'Okafor', role: 'Design' },
  { first: 'Bruno', last: 'Lima', role: 'Backend' },
  { first: 'Chen', last: 'Wei', role: 'Frontend' },
  { first: 'Dita', last: 'Novak', role: 'Frontend' },
  { first: 'Ewan', last: 'Fraser', role: 'QA' },
  { first: 'Farida', last: 'Aziz', role: 'PM' },
  { first: 'Georgi', last: 'Petrov', role: 'Backend' },
];

const full = (p: Person) => `${p.first} ${p.last}`;

const PersonRow = ({
  suggestion,
}: AutocompleteRenderSuggestionContext<Person>) => (
  <>
    <Avatar firstName={suggestion.first} lastName={suggestion.last} size="s" />
    <Text size={3} style={{ flex: 1 }}>
      {full(suggestion)}
    </Text>
    <Text size={1} color="muted" nowrap>
      {suggestion.role}
    </Text>
  </>
);

export const AssigneePicker = () => {
  const [query, setQuery] = useState('');
  const [assignee, setAssignee] = useState<Person | null>(PEOPLE[2]);

  const search = useCallback<AutocompleteSuggestionsFunc<Person>>(
    ({ value }) => {
      const q = value.toLowerCase();
      return PEOPLE.filter(
        (p) => full(p).toLowerCase().includes(q) && full(p) !== (assignee && full(assignee)),
      );
    },
    [assignee],
  );

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 400 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Assign a task
        </Text>
        <Text block>
          Object suggestions rendered as avatar rows. Picking one collapses the
          field to a chip; clearing it drops back to the search. The current
          assignee is filtered out of results.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="xs">
        <Text asChild size={2} weight="medium">
          <label htmlFor="ap-input">Assignee</label>
        </Text>

        {assignee ? (
          <Flex
            direction="horizontal"
            gap="s"
            align="center"
            style={{
              border: '1px solid var(--border-a2)',
              borderRadius: 10,
              padding: '5px 8px 5px 6px',
              width: 'fit-content',
            }}
          >
            <Avatar
              firstName={assignee.first}
              lastName={assignee.last}
              size="s"
            />
            <Text size={3}>{full(assignee)}</Text>
            <button
              type="button"
              aria-label="Clear assignee"
              onClick={() => setAssignee(null)}
              style={{
                display: 'flex',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: 'var(--text-2)',
              }}
            >
              <X size={14} />
            </button>
          </Flex>
        ) : (
          <AutocompleteInput<Person>
            id="ap-input"
            value={query}
            onChange={setQuery}
            getSuggestions={search}
            getSuggestionValue={full}
            renderSuggestion={(props) => <PersonRow {...props} />}
            onSelect={(p) => {
              setAssignee(p);
              setQuery('');
            }}
            placeholder="Search people…"
          />
        )}
      </Flex>
    </Flex>
  );
};
