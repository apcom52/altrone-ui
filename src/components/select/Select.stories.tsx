import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Button, Flex, Icon } from 'components';
import { useState } from 'react';
import { Direction, Gap, Size } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';
import { Option } from './Select.types.ts';

const story: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
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

const SELECT_COUNTRIES: Option<string> = COUNTRIES.map((item) => ({
  label: item.country,
  value: item.country.toLowerCase(),
}));

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using Select',
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('portugal');
    const [value3, setValue3] = useState('china');
    const [value4, setValue4] = useState<string[]>(['russia']);
    const [value5, setValue5] = useState('');
    const [value6, setValue6] = useState(['russia']);

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>Basic Select</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Select
            name="country"
            multiple={false}
            value={value1}
            onChange={setValue1}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
          />
          <Select
            multiple={false}
            value={value2}
            onChange={setValue2}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
            clearable
          />
          <Select
            multiple={false}
            value={value3}
            onChange={setValue3}
            options={SELECT_COUNTRIES}
            disabled
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Multiple Select
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Select
            multiple={true}
            value={value4}
            onChange={setValue4}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Select with search
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Select
            value={value5}
            onChange={setValue5}
            placeholder="What is your homeland?"
            options={SELECT_COUNTRIES}
            searchable
          />
          <Select
            value={value6}
            onChange={setValue6}
            placeholder="Choose countries where have you been"
            options={SELECT_COUNTRIES}
            multiple
            searchable
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Select with different sizes
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Select
            name="country"
            multiple={false}
            value={value1}
            onChange={setValue1}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
            size={Size.small}
          />
          <Select
            multiple={false}
            value={value2}
            onChange={setValue2}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
            size={Size.large}
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Transparent Select
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Select
            name="country"
            multiple={false}
            value={value2}
            onChange={setValue2}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
            transparent
          />
          <Select
            value={value6}
            onChange={setValue6}
            placeholder="Choose countries where have you been"
            options={SELECT_COUNTRIES}
            multiple
            searchable
            transparent
            clearable
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>Custom Select</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <Select
            name="country"
            value={value2}
            onChange={setValue2}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
            Component={({ selectedOptions, expanded }) => (
              <Button
                style={{ minWidth: '300px' }}
                label={(selectedOptions as Option).label}
                rightIcon={
                  <Icon i={expanded ? 'expand_less' : 'expand_more'} />
                }
              />
            )}
          />
          <Select
            name="country"
            value={value6}
            multiple={true}
            onChange={setValue6}
            placeholder="Choose countries where have you been"
            options={SELECT_COUNTRIES}
            Component={({ selectedOptions, expanded }) => (
              <Button
                style={{ minWidth: '320px' }}
                label={(selectedOptions as Option[])
                  .map((item) => `[${item.label}]`)
                  .join(', ')}
                rightIcon={
                  <Icon i={expanded ? 'expand_less' : 'expand_more'} />
                }
              />
            )}
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
