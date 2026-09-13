import { useCallback, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button, Flex, Text } from 'components';
import { AutocompleteInput } from '../AutocompleteInput.tsx';
import {
  AutocompleteRenderSuggestionContext,
  AutocompleteSuggestionsFunc,
} from '../AutocompleteInput.types.ts';

interface Place {
  line1: string;
  city: string;
  postcode: string;
}

const PLACES: Place[] = [
  { line1: '10 Downing Street', city: 'London', postcode: 'SW1A 2AA' },
  { line1: '221B Baker Street', city: 'London', postcode: 'NW1 6XE' },
  { line1: '20 Deansgate', city: 'Manchester', postcode: 'M3 1PY' },
  { line1: '1 Princes Street', city: 'Edinburgh', postcode: 'EH2 2EQ' },
  { line1: '48 Park Street', city: 'Bristol', postcode: 'BS1 5JB' },
  { line1: '30 St Mary Axe', city: 'London', postcode: 'EC3A 8BF' },
];

const PlaceRow = ({
  suggestion,
}: AutocompleteRenderSuggestionContext<Place>) => (
  <>
    <MapPin size={15} style={{ color: 'var(--text-2)', flexShrink: 0 }} />
    <Flex direction="vertical">
      <Text size={3}>{suggestion.line1}</Text>
      <Text size={2} color="muted">
        {suggestion.city} · {suggestion.postcode}
      </Text>
    </Flex>
  </>
);

export const AddressLookup = () => {
  const [query, setQuery] = useState('');
  const [confirmed, setConfirmed] = useState<Place | null>(null);
  const [failing, setFailing] = useState(false);
  const failingRef = useRef(false);
  failingRef.current = failing;

  const [calls, setCalls] = useState(0);

  const lookup = useCallback<AutocompleteSuggestionsFunc<Place>>(
    async ({ value }) => {
      await new Promise((r) => setTimeout(r, 650));
      setCalls((n) => n + 1);
      if (failingRef.current) {
        throw new Error('Geocoding service unavailable');
      }
      const q = value.toLowerCase();
      return PLACES.filter(
        (p) =>
          p.line1.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.postcode.toLowerCase().replace(/\s/g, '').includes(q.replace(/\s/g, '')),
      );
    },
    [],
  );

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 460 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Address lookup against a slow API
        </Text>
        <Text block>
          The real-world autocomplete: an async <Text code>getSuggestions</Text>{' '}
          with a ~650ms round-trip (watch the spinner island),{' '}
          <Text code>minChars=3</Text> so it doesn&apos;t fire on every keystroke,{' '}
          <Text code>cacheResults</Text> so re-typing a prefix is free, and{' '}
          <Text code>onError</Text> surfacing a failure without breaking the
          field.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="xs">
        <Text asChild size={2} weight="medium">
          <label htmlFor="al-input">Shipping address</label>
        </Text>
        <AutocompleteInput<Place>
          id="al-input"
          value={query}
          onChange={setQuery}
          getSuggestions={lookup}
          getSuggestionValue={(p) => `${p.line1}, ${p.city} ${p.postcode}`}
          renderSuggestion={(props) => <PlaceRow {...props} />}
          onSelect={(p) => setConfirmed(p)}
          minChars={3}
          cacheResults
          placeholder="Start typing a street or postcode"
        />
        <Flex direction="horizontal" gap="m" align="center" justify="between">
          <Text size={2} color="muted">
            Lookups sent: {calls}
          </Text>
          <Button
            size="s"
            variant="text"
            danger={failing}
            label={failing ? 'API: failing' : 'API: healthy'}
            onClick={() => setFailing((v) => !v)}
          />
        </Flex>
      </Flex>

      {confirmed && (
        <Flex
          direction="vertical"
          gap="xxs"
          style={{
            border: '1px solid var(--success-border-a2)',
            borderRadius: 10,
            padding: '10px 12px',
          }}
        >
          <Text size={1} weight="bold" color="success">
            DELIVER TO
          </Text>
          <Text size={3}>{confirmed.line1}</Text>
          <Text size={2} color="muted">
            {confirmed.city} · {confirmed.postcode}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
