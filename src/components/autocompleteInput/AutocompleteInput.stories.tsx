import { Meta, StoryObj } from '@storybook/react';
import { AutocompleteInput } from './AutocompleteInput.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Button, Flex, Message, Text, TextInput } from 'components';
import { useCallback, useRef, useState } from 'react';
import {
  AutocompleteRenderSuggestionContext,
  AutocompleteSuggestionsFunc,
} from './AutocompleteInput.types.ts';
import { useListItem } from '@floating-ui/react';
import { usePopoverCurrentIndex } from '../popover/Popover.tsx';
import { Globe, Code, Calendar } from 'lucide-react';

const story: Meta<typeof AutocompleteInput> = {
  title: 'Components/Form/AutocompleteInput',
  component: AutocompleteInput,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

// --- Shared helpers ---

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const filterCountries = (value: string) =>
  COUNTRIES.filter((c) => c.toLowerCase().startsWith(value.toLowerCase()));

// --- Custom string suggestion item with match highlighting ---

const CountrySuggestionItem = ({
  suggestion,
  inputValue,
  onSelect,
}: AutocompleteRenderSuggestionContext<string>) => {
  const currentIndex = usePopoverCurrentIndex();
  const { ref, index } = useListItem();

  return (
    <button onClick={(e) => onSelect(suggestion, e)} ref={ref}>
      {index === currentIndex && <strong>{'->> '}</strong>}
      <strong>{suggestion.slice(0, inputValue.length)}</strong>
      {suggestion.slice(inputValue.length)}
    </button>
  );
};

// --- Custom object suggestion item ---

type Language = {
  name: string;
  creator: string;
  year: number;
};

const LanguageSuggestion = ({
  suggestion,
  inputValue,
  onSelect,
}: AutocompleteRenderSuggestionContext<Language>) => {
  const currentIndex = usePopoverCurrentIndex();
  const { ref, index } = useListItem();
  const isActive = index === currentIndex;

  return (
    <button
      ref={ref}
      onClick={(e) => onSelect(suggestion.name, e)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        width: '100%',
        background: isActive ? 'var(--accent-3)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <Code size={16} style={{ flexShrink: 0, color: 'var(--accent-9)' }} />
      <span style={{ flex: 1 }}>
        <strong>{suggestion.name.slice(0, inputValue.length)}</strong>
        {suggestion.name.slice(inputValue.length)}
      </span>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          opacity: 0.6,
          fontSize: '0.85em',
        }}
      >
        <Calendar size={12} />
        {suggestion.year}
      </span>
    </button>
  );
};

// ─── Stories ──────────────────────────────────────────────────────────────────

export const BasicStory: StoryObj<typeof Flex> = {
  name: 'Using AutocompleteInput',
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    const getCountry = useCallback<AutocompleteSuggestionsFunc>(
      async ({ value }) => filterCountries(value),
      [],
    );

    return (
      <Flex direction="vertical" gap="l">
        <Text size={6} weight="bold">
          Standard AutocompleteInput
        </Text>
        <AutocompleteInput
          value={value1}
          getSuggestions={getCountry}
          onChange={setValue1}
          placeholder="e.g. France"
        />
        <Text size={6} weight="bold">
          With custom suggestion render
        </Text>
        <AutocompleteInput
          value={value2}
          getSuggestions={getCountry}
          onChange={setValue2}
          placeholder="e.g. France"
          renderSuggestion={(props) => <CountrySuggestionItem {...props} />}
        />
      </Flex>
    );
  },
};

export const FeaturesStory: StoryObj<typeof Flex> = {
  name: 'All Features',
  render: () => {
    // minChars
    const [minCharsValue, setMinCharsValue] = useState('');
    const getCountry = useCallback<AutocompleteSuggestionsFunc>(
      async ({ value }) => {
        await delay(200);
        return filterCountries(value);
      },
      [],
    );

    // cacheResults
    const [cacheValue, setCacheValue] = useState('');
    const requestCountRef = useRef(0);
    const [requestCount, setRequestCount] = useState(0);
    const getCountryTracked = useCallback<AutocompleteSuggestionsFunc>(
      async ({ value }) => {
        await delay(400);
        requestCountRef.current += 1;
        setRequestCount(requestCountRef.current);
        return filterCountries(value);
      },
      [],
    );

    // onSelect
    const [selectValue, setSelectValue] = useState('');
    const [lastSelected, setLastSelected] = useState<string | null>(null);

    // onError
    const [errorValue, setErrorValue] = useState('');
    const [errorEnabled, setErrorEnabled] = useState(false);
    const errorEnabledRef = useRef(false);
    errorEnabledRef.current = errorEnabled;
    const getCountryWithError = useCallback<AutocompleteSuggestionsFunc>(
      async ({ value }) => {
        await delay(300);
        if (errorEnabledRef.current) throw new Error('Simulated network error');
        return filterCountries(value);
      },
      [],
    );

    // Empty state
    const [emptyValue, setEmptyValue] = useState('');
    const getStrictCountry = useCallback<AutocompleteSuggestionsFunc>(
      async ({ value }) => {
        await delay(200);
        return COUNTRIES.filter((c) => c.toLowerCase() === value.toLowerCase());
      },
      [],
    );

    // Object suggestions
    const [langValue, setLangValue] = useState('');
    const getLanguage = useCallback<AutocompleteSuggestionsFunc<Language>>(
      async ({ value }) => {
        await delay(200);
        return LANGUAGES.filter((l) =>
          l.name.toLowerCase().startsWith(value.toLowerCase()),
        );
      },
      [],
    );

    return (
      <Flex direction="vertical" gap="xl">
        {/* minChars */}
        <Flex direction="vertical" gap="s">
          <Text size={6} weight="bold">
            minChars = 3
          </Text>
          <Text>
            Suggestions appear only after typing 3 or more characters.
          </Text>
          <AutocompleteInput
            value={minCharsValue}
            getSuggestions={getCountry}
            onChange={setMinCharsValue}
            minChars={3}
            placeholder="Type at least 3 characters…"
          />
        </Flex>

        {/* cacheResults */}
        <Flex direction="vertical" gap="s">
          <Text size={6} weight="bold">
            cacheResults
          </Text>
          <Text>
            Network requests: <strong>{requestCount}</strong>. Type a prefix,
            clear, type the same prefix again — the counter stops growing.
          </Text>
          <AutocompleteInput
            value={cacheValue}
            getSuggestions={getCountryTracked}
            onChange={setCacheValue}
            cacheResults
            placeholder="e.g. Ger, Fra, Spa…"
          />
        </Flex>

        {/* onSelect */}
        <Flex direction="vertical" gap="s">
          <Text size={6} weight="bold">
            onSelect callback
          </Text>
          <AutocompleteInput
            value={selectValue}
            getSuggestions={getCountry}
            onChange={setSelectValue}
            onSelect={(suggestion) => setLastSelected(suggestion)}
            placeholder="Pick a country"
          />
          {lastSelected !== null && (
            <Message
              role="success"
              header={`Selected: ${lastSelected}`}
              compact
            />
          )}
        </Flex>

        {/* onError */}
        <Flex direction="vertical" gap="s">
          <Text size={6} weight="bold">
            onError — error island
          </Text>
          <Text>
            Toggle the error mode, then type to trigger a failed request. A red
            island with a tooltip will appear on the right.
          </Text>
          <Flex gap="m" align="center">
            <AutocompleteInput
              value={errorValue}
              getSuggestions={getCountryWithError}
              onChange={setErrorValue}
              placeholder="Type to search…"
            />
            <Button
              label={errorEnabled ? 'Errors on' : 'Errors off'}
              danger={errorEnabled}
              onClick={() => setErrorEnabled((v) => !v)}
            />
          </Flex>
        </Flex>

        {/* Empty state */}
        <Flex direction="vertical" gap="s">
          <Text size={6} weight="bold">
            Empty state
          </Text>
          <Text>
            Strict exact-match search — most queries return no results and show
            the empty state.
          </Text>
          <AutocompleteInput
            value={emptyValue}
            getSuggestions={getStrictCountry}
            onChange={setEmptyValue}
            placeholder="Try typing 'france' (lowercase)"
          />
        </Flex>

        {/* Object suggestions */}
        <Flex direction="vertical" gap="s">
          <Text size={6} weight="bold">
            Object suggestions
          </Text>
          <Text>
            <code>getSuggestions</code> returns <code>Language[]</code>.{' '}
            <code>getSuggestionValue</code> extracts the string for the input.
            Custom <code>renderSuggestion</code> shows name, creator and year.
          </Text>
          <AutocompleteInput<Language>
            value={langValue}
            getSuggestions={getLanguage}
            getSuggestionValue={(lang) => lang.name}
            onChange={setLangValue}
            placeholder="e.g. Type, Rust, Go…"
            renderSuggestion={(props) => <LanguageSuggestion {...props} />}
          >
            <TextInput.IconIsland icon={<Globe size={16} />} placement="left" />
          </AutocompleteInput>
        </Flex>
      </Flex>
    );
  },
};

export const RestApiStory: StoryObj<typeof Flex> = {
  name: 'Using with REST API',
  render: () => {
    const [value, setValue] = useState('');

    const getData = useCallback<AutocompleteSuggestionsFunc>(
      async ({ value }) => {
        const response = await fetch(
          `https://demo.dataverse.org/api/search?q=${value}`,
        );
        const data = await response.json();
        return data.data.items.map((item: { name: string }) => item.name);
      },
      [],
    );

    return (
      <Flex direction="vertical" gap="l">
        <Text size={6} weight="bold">
          AutocompleteInput with REST API
        </Text>
        <AutocompleteInput
          value={value}
          getSuggestions={getData}
          onChange={setValue}
          minChars={2}
          cacheResults
          placeholder="Type to search, e.g. Trees"
        />
      </Flex>
    );
  },
};

export default story;

// ─── Data ─────────────────────────────────────────────────────────────────────

const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Liberia',
  'Libya',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'Norway',
  'Oman',
  'Pakistan',
  'Panama',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Somalia',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const LANGUAGES: Language[] = [
  { name: 'TypeScript', creator: 'Microsoft', year: 2012 },
  { name: 'JavaScript', creator: 'Brendan Eich', year: 1995 },
  { name: 'Python', creator: 'Guido van Rossum', year: 1991 },
  { name: 'Rust', creator: 'Graydon Hoare', year: 2010 },
  { name: 'Go', creator: 'Google', year: 2009 },
  { name: 'Kotlin', creator: 'JetBrains', year: 2011 },
  { name: 'Swift', creator: 'Apple', year: 2014 },
  { name: 'Ruby', creator: 'Yukihiro Matsumoto', year: 1995 },
  { name: 'Scala', creator: 'Martin Odersky', year: 2003 },
  { name: 'Haskell', creator: 'Simon Peyton Jones', year: 1990 },
  { name: 'Elixir', creator: 'José Valim', year: 2011 },
  { name: 'Clojure', creator: 'Rich Hickey', year: 2007 },
  { name: 'Dart', creator: 'Google', year: 2011 },
  { name: 'Lua', creator: 'PUC-Rio', year: 1993 },
  { name: 'Perl', creator: 'Larry Wall', year: 1987 },
  { name: 'PHP', creator: 'Rasmus Lerdorf', year: 1994 },
  { name: 'C', creator: 'Dennis Ritchie', year: 1972 },
  { name: 'C++', creator: 'Bjarne Stroustrup', year: 1983 },
  { name: 'C#', creator: 'Microsoft', year: 2000 },
  { name: 'Java', creator: 'James Gosling', year: 1995 },
  { name: 'Julia', creator: 'MIT', year: 2012 },
  { name: 'R', creator: 'Ross Ihaka', year: 1993 },
  { name: 'Groovy', creator: 'James Strachan', year: 2003 },
  { name: 'F#', creator: 'Microsoft Research', year: 2005 },
  { name: 'Fortran', creator: 'John Backus', year: 1957 },
  { name: 'COBOL', creator: 'Grace Hopper', year: 1959 },
  { name: 'Lisp', creator: 'John McCarthy', year: 1958 },
  { name: 'Erlang', creator: 'Ericsson', year: 1986 },
  { name: 'OCaml', creator: 'INRIA', year: 1996 },
  { name: 'Zig', creator: 'Andrew Kelley', year: 2016 },
];
