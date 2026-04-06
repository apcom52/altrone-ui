import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select.tsx';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Button, Flex } from 'components';
import { useState } from 'react';
import { Text } from '../text';
import { Option } from './Select.types.ts';
import { SELECT_COUNTRIES } from './constants.ts';
import { ChevronDown, ChevronUp } from 'lucide-react';
// import { userEvent, within, expect } from '@storybook/test';

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
    const [value1, setValue1] = useState<string | undefined>('');
    const [value2, setValue2] = useState<string | undefined>('portugal');
    const [value3, setValue3] = useState<string | undefined>('china');
    const [value4, setValue4] = useState<string[] | undefined>(['russia']);
    const [value5, setValue5] = useState<string | undefined>('');
    const [value6, setValue6] = useState<string[] | undefined>(['russia']);

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Basic Select
        </Text>
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
        <Text size={5} weight="bold" block>
          Multiple Select
        </Text>
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
        <Text size={5} weight="bold" block>
          Select with search
        </Text>
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
        <Text size={5} weight="bold" block>
          Select with different sizes
        </Text>
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
        <Text size={5} weight="bold" block>
          Transparent Select
        </Text>
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
        <Text size={5} weight="bold" block>
          Custom Select
        </Text>
        <Flex direction="horizontal" gap="l">
          <Select
            name="country"
            value={value2}
            onChange={setValue2}
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
            renderFunc={({ selectedOptions, expanded }) => (
              <Button
                style={{ minWidth: '300px' }}
                label={(selectedOptions as Option)?.label}
                additionalIcon={expanded ? <ChevronUp /> : <ChevronDown />}
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
              />
            )}
          />
        </Flex>
      </Flex>
    );
  },
  // play: async ({ canvasElement, step }) => {
  //   const canvas = within(canvasElement);

  //   await step('open the select and choose one of the options', async () => {
  //     await userEvent.click(canvas.getByTestId('select'));
  //     await userEvent.click(canvas.getByText('France'));

  //     expect(canvas.getByTestId('select')).toHaveValue('France');
  //   });

  //   await step(
  //     'open the multiple select and choose some of the options',
  //     async () => {
  //       await userEvent.click(canvas.getByTestId('multiple-select'));
  //       await userEvent.click(canvas.getByText('France'));
  //       await userEvent.click(canvas.getByText('Japan'));
  //       await userEvent.click(canvas.getByText('Australia'));

  //       expect(canvas.getByTestId('multiple-select')).toHaveValue(
  //         'France, Japan, Russia, Australia',
  //       );
  //     },
  //   );

  //   await step('clear button has to clear select', async () => {
  //     await userEvent.click(canvas.getAllByText('backspace')[0]);

  //     await expect(true).toBeTruthy();
  //     // expect(canvas.getByTestId('clearable-select')).toHaveValue(
  //     //   'Choose your country',
  //     // );
  //   });
  // },
};

export default story;
