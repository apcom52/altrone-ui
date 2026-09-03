import { useCallback, useState } from 'react';
import { Flex, Text } from 'components';
import { AutocompleteInput } from '../AutocompleteInput.tsx';
import { AutocompleteSuggestionsFunc } from '../AutocompleteInput.types.ts';

const FONTS = [
  'Arial',
  'Baskerville',
  'Cambria',
  'Courier New',
  'Garamond',
  'Georgia',
  'Helvetica',
  'Optima',
  'Palatino',
  'Tahoma',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
];

const SAMPLE = 'The quick brown fox jumps over the lazy dog — 0123456789';

export const FontPicker = () => {
  const [query, setQuery] = useState('Georgia');
  const [font, setFont] = useState('Georgia');

  const search = useCallback<AutocompleteSuggestionsFunc>(
    ({ value }) =>
      FONTS.filter((f) => f.toLowerCase().includes(value.toLowerCase())),
    [],
  );

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 420 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Pick a font
        </Text>
        <Text block>
          The zero-config case: suggestions are plain strings, so there&apos;s no{' '}
          <Text code>renderSuggestion</Text> and no{' '}
          <Text code>getSuggestionValue</Text> — the field renders each match as
          its own row (with the sliding hover highlight) and writes the string
          straight into the input on select. Type something with no matches
          (&ldquo;zzz&rdquo;) to see the empty state.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="xs">
        <Text asChild size={2} weight="medium">
          <label htmlFor="fp-input">Font family</label>
        </Text>
        <AutocompleteInput
          id="fp-input"
          value={query}
          onChange={setQuery}
          getSuggestions={search}
          onSelect={(f) => setFont(f)}
          minChars={1}
          placeholder="Start typing a font name…"
        />
      </Flex>

      <Flex direction="vertical" gap="xxs">
        <Text size={1} weight="bold" color="muted">
          {font.toUpperCase()}
        </Text>
        <Text size={5} style={{ fontFamily: font }}>
          {SAMPLE}
        </Text>
      </Flex>
    </Flex>
  );
};
