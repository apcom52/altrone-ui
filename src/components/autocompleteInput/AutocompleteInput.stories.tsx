import { Meta, StoryObj } from '@storybook/react';
import { AutocompleteInput } from './AutocompleteInput.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { FC, useCallback, useState } from 'react';
import { Direction, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import {
  AutocompleteCustomComponent,
  AutocompleteSuggestionsFunc,
} from './AutocompleteInput.types.ts';
import { useListItem } from '@floating-ui/react';
import { usePopoverCurrentIndex } from '../popover/Popover.tsx';

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

const CountrySuggestionItem = ({
  inputValue = '',
  label = '',
  onClick,
}: AutocompleteCustomComponent) => {
  const currentIndex = usePopoverCurrentIndex();
  const { ref, index } = useListItem();

  return (
    <button onClick={onClick} ref={ref}>
      {index === currentIndex && <strong>{'->> '}</strong>}
      <strong>{inputValue}</strong>
      {label.slice(inputValue.length)}
    </button>
  );
};

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using AutocompleteInput',
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    const getCountry = useCallback<AutocompleteSuggestionsFunc>(
      async ({ value }) => {
        return COUNTRIES.filter((country) =>
          country.toLowerCase().startsWith(value.toLowerCase()),
        );
      },
      [],
    );

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Standard AutocompleteInput
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <AutocompleteInput
            value={value1}
            getSuggestions={getCountry}
            onChange={setValue1}
            placeholder="e.g. France"
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          AutocompleteInput with custom component
        </Text.Heading>
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
  'Congo (Congo-Brazzaville)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia (Czech Republic)',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  "Eswatini (fmr. 'Swaziland')",
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
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Holy See',
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
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (formerly Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine State',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

export default story;
