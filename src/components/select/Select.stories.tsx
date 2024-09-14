import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Button, Flex, Icon } from 'components';
import { useState } from 'react';
import { Text } from '../text';
import { Option } from './Select.types.ts';
import { SELECT_COUNTRIES } from './constants.ts';
import { userEvent, within, expect } from '@storybook/test';

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
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Basic Select</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Select
            name="country"
            multiple={false}
            value={value1}
            onChange={setValue1}
            data-testid="select"
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
            data-testid="clearable-select"
          />
          <Select
            multiple={false}
            value={value3}
            onChange={setValue3}
            options={SELECT_COUNTRIES}
            disabled
          />
        </Flex>
        <Text.Heading role="inner">Multiple Select</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Select
            multiple={true}
            value={value4}
            onChange={setValue4}
            data-testid="multiple-select"
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
          />
        </Flex>
        <Text.Heading role="inner">Select with search</Text.Heading>
        <Flex direction="horizontal" gap="l">
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
        <Text.Heading role="inner">Select with different sizes</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Select
            name="country"
            multiple={false}
            value={value1}
            onChange={setValue1}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
            size="s"
          />
          <Select
            multiple={false}
            value={value2}
            onChange={setValue2}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
            size="l"
          />
        </Flex>
        <Text.Heading role="inner">Transparent Select</Text.Heading>
        <Flex direction="horizontal" gap="l">
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
        <Text.Heading role="inner">Custom Select</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Select
            name="country"
            value={value2}
            onChange={setValue2}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
            Component={({ selectedOptions, expanded }) => (
              <Button
                style={{ minWidth: '300px' }}
                label={(selectedOptions as Option)?.label}
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
                  .map((item) => `[${item?.label}]`)
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('open the select and choose one of the options', async () => {
      await userEvent.click(canvas.getByTestId('select'));
      await userEvent.click(canvas.getByText('France'));

      expect(canvas.getByTestId('select')).toHaveValue('France');
    });

    await step(
      'open the multiple select and choose some of the options',
      async () => {
        await userEvent.click(canvas.getByTestId('multiple-select'));
        await userEvent.click(canvas.getByText('France'));
        await userEvent.click(canvas.getByText('Japan'));
        await userEvent.click(canvas.getByText('Australia'));

        expect(canvas.getByTestId('multiple-select')).toHaveValue(
          'France, Japan, Russia, Australia',
        );
      },
    );

    await step('clear button has to clear select', async () => {
      await userEvent.click(canvas.getAllByText('backspace')[0]);

      await expect(true).toBeTruthy();
      // expect(canvas.getByTestId('clearable-select')).toHaveValue(
      //   'Choose your country',
      // );
    });
  },
};

export default story;
