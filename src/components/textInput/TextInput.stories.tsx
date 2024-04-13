import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  CloseButton,
  Dropdown,
  Flex,
  Icon,
  Text,
  TextHeadingRoles,
  TextInput,
} from 'components';
import { Direction, Gap, Size } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { useState } from 'react';

const story: Meta<typeof TextInput> = {
  title: 'Components/Input/TextInput',
  component: TextInput,
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
  name: 'Using TextInputs',
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('Hello!');
    const [value3, setValue3] = useState(
      'Invalid value (need to have only 3 characters to be valid)',
    );
    const [value4, setValue4] = useState('Lord Voldemort');
    const [readonly, setReadonly] = useState(true);
    const [value5, setValue5] = useState('');
    const [value6, setValue6] = useState('');

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic TextInputs
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
          />
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
          />
          <TextInput
            value={''}
            onChange={() => null}
            disabled
            placeholder="Disabled input"
          />
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Type 3 characters"
            invalid={value3.length !== 3}
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Transparent TextInputs
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
            transparent
          />
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
            transparent
          />
          <TextInput
            value={''}
            onChange={() => null}
            disabled
            placeholder="Disabled input"
            transparent
          />
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Type 3 characters"
            invalid={value3.length !== 3}
            transparent
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Read-only mode
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.small}>
          <TextInput value={value4} onChange={setValue4} readOnly={readonly} />
          <Button
            label={readonly ? 'Edit' : 'Save'}
            onClick={() => setReadonly(!readonly)}
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Small TextInputs
        </Text.Heading>
        <TextInput
          size={Size.small}
          value={value5}
          onChange={setValue5}
          placeholder="Type something in the small TextInput"
        />
        <Text.Heading role={TextHeadingRoles.inner}>
          Large TextInputs
        </Text.Heading>
        <TextInput
          size={Size.large}
          value={value6}
          onChange={setValue6}
          placeholder="Type something in the large TextInput"
        />
        <Text.Heading role={TextHeadingRoles.inner}>
          TextInput without rainbow effect
        </Text.Heading>
        <TextInput
          size={Size.small}
          value={value5}
          onChange={setValue5}
          placeholder="This just a TextInput without rainbow effect"
          rainbowEffect={false}
        />
      </Flex>
    );
  },
};

export const IslandsStory: StoryObj<typeof Flex> = {
  name: 'Using islands',
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('npm install altrone-ui');
    const [value3, setValue3] = useState('10111');

    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState('');
    const [value6, setValue6] = useState('');

    const [value7, setValue7] = useState('');
    const [value8, setValue8] = useState('');
    const [value9, setValue9] = useState('');

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>Text Islands</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
          >
            <TextInput.TextIsland label="$" />
            <TextInput.TextIsland placement="right" label=".00" />
          </TextInput>
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
          >
            <TextInput.TextIsland label="cmd:" />
          </TextInput>
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Enter your zip"
            maxLength={10}
          >
            <TextInput.TextIsland
              placement="right"
              label={`${value3.length}/10`}
            />
          </TextInput>
        </Flex>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
            size={Size.small}
          >
            <TextInput.TextIsland label="$" />
            <TextInput.TextIsland placement="right" label=".00" />
          </TextInput>
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
            size={Size.small}
          >
            <TextInput.TextIsland label="cmd:" />
          </TextInput>
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Enter your zip"
            size={Size.small}
            maxLength={10}
          >
            <TextInput.TextIsland
              placement="right"
              label={`${value3.length}/10`}
            />
          </TextInput>
        </Flex>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
            size={Size.large}
          >
            <TextInput.TextIsland label="$" />
            <TextInput.TextIsland placement="right" label=".00" />
          </TextInput>
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
            size={Size.large}
          >
            <TextInput.TextIsland label="cmd:" />
          </TextInput>
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Enter your zip"
            size={Size.large}
            maxLength={10}
          >
            <TextInput.TextIsland
              placement="right"
              label={`${value3.length}/10`}
            />
          </TextInput>
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>Icon Islands</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value4}
            onChange={setValue4}
            placeholder="Type something"
          >
            <TextInput.IconIsland icon={<Icon i="account_circle" />} />
          </TextInput>
          <TextInput
            value={value5}
            onChange={setValue5}
            placeholder="Ask AI Assistant"
          >
            <TextInput.IconIsland
              placement="right"
              icon={<Icon i="auto_awesome" />}
            />
          </TextInput>
          <TextInput
            value={value6}
            onChange={setValue6}
            placeholder="Find a file"
          >
            <TextInput.IconIsland icon={<Icon i="search" />} />
            <TextInput.IconIsland icon={<Icon i="folder" />} />
            <TextInput.IconIsland
              placement="right"
              icon={<Icon i="expand_more" />}
            />
          </TextInput>
        </Flex>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value6}
            onChange={setValue6}
            placeholder="Find a file"
            size={Size.small}
          >
            <TextInput.IconIsland icon={<Icon i="search" />} />
            <TextInput.IconIsland icon={<Icon i="folder" />} />
            <TextInput.IconIsland
              placement="right"
              icon={<Icon i="expand_more" />}
            />
          </TextInput>
          <TextInput
            value={value6}
            onChange={setValue6}
            placeholder="Find a file"
            size={Size.large}
          >
            <TextInput.IconIsland icon={<Icon i="search" />} />
            <TextInput.IconIsland icon={<Icon i="folder" />} />
            <TextInput.IconIsland
              placement="right"
              icon={<Icon i="expand_more" />}
            />
          </TextInput>
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Action Islands
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput value={value7} onChange={setValue7} placeholder="Username">
            <Dropdown
              focusFirstElement={false}
              content={
                <Dropdown.Menu>
                  <Dropdown.Action
                    label="@Wolf"
                    onClick={() => setValue7('Wolf')}
                  />
                  <Dropdown.Action
                    label="@Fox"
                    onClick={() => setValue7('Fox')}
                  />
                  <Dropdown.Action
                    label="@Bear"
                    onClick={() => setValue7('Bear')}
                  />
                  <Dropdown.Action
                    label="@Chicken"
                    onClick={() => setValue7('Chicken')}
                  />
                </Dropdown.Menu>
              }
            >
              <TextInput.ActionIsland
                icon={<Icon i="account_circle" />}
                label="Pick a user"
              />
            </Dropdown>
            <TextInput.ActionIsland
              icon={<Icon i="backspace" />}
              label="Clear field"
              showLabel={false}
              placement="right"
              onClick={() => setValue7('')}
            />
          </TextInput>

          <TextInput value={value7} onChange={setValue7} placeholder="Username">
            <TextInput.ActionIsland
              icon={<Icon i="block" />}
              label="Disabled action"
              disabled
            />
            <TextInput.ActionIsland
              icon={<Icon i="replay" />}
              label="Revert changes"
              placement="right"
              danger
            />
          </TextInput>
        </Flex>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value8}
            onChange={setValue8}
            placeholder="User Password"
            size={Size.small}
          >
            <TextInput.ActionIsland
              label="Generate"
              placement="right"
              onClick={() => setValue8('')}
            />
          </TextInput>
          <TextInput
            value={value8}
            onChange={setValue8}
            placeholder="Write your thoughts"
            size={Size.large}
          >
            <TextInput.ActionIsland
              icon={<Icon i="share" />}
              label="Share"
              placement="right"
              onClick={() => setValue8('')}
            />
            <TextInput.ActionIsland
              icon={<Icon i="expand_more" />}
              label="Show more options"
              showLabel={false}
              placement="right"
            />
          </TextInput>
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Custom Islands
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <TextInput
            value={value9}
            onChange={setValue9}
            placeholder="<-- Close button as custom island"
          >
            <TextInput.CustomIsland>
              <CloseButton />
            </TextInput.CustomIsland>
          </TextInput>
        </Flex>
      </Flex>
    );
  },
};

export const CustomInputStory: StoryObj<typeof Flex> = {
  name: 'Using custom input',
  render: () => {
    const [value, setValue] = useState('0');

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Using custom component instead of standard input
        </Text.Heading>
        <TextInput value={value} onChange={setValue} Component={<textarea />}>
          <TextInput.TextIsland label="Left island" />
        </TextInput>
      </Flex>
    );
  },
};

export default story;
