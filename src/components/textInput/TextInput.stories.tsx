import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  CloseButton,
  Dropdown,
  Flex,
  Text,
  TextInput,
} from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { useState } from 'react';
import {
  CircleUser,
  Sparkles,
  Search,
  Folder,
  ChevronDown,
  Delete,
  Ban,
  Repeat,
  Share,
  TriangleAlert,
} from 'lucide-react';
import { Size } from 'types/entity.ts';

const story: Meta<typeof TextInput> = {
  title: 'Components/Form/TextInput',
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
      'Invalid value (need to have only 3 characters to be valid)'
    );
    const [value4, setValue4] = useState('Lord Voldemort');
    const [readonly, setReadonly] = useState(true);
    const [value5, setValue5] = useState('');
    const [value6, setValue6] = useState('');

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Basic TextInputs
        </Text>
        <Flex direction="horizontal" gap="l" align="center">
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
        <Text size={5} weight="bold" block>
          Transparent TextInputs
        </Text>
        <Flex direction="horizontal" gap="l">
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
            variant="transparent"
          />
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
            variant="transparent"
          />
          <TextInput
            value={''}
            onChange={() => null}
            disabled
            placeholder="Disabled input"
            variant="transparent"
          />
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Type 3 characters"
            invalid={value3.length !== 3}
            variant="transparent"
          />
        </Flex>
        <Text size={5} weight="bold" block>
          Read-only mode
        </Text>
        <Flex direction="horizontal" gap="s">
          <TextInput value={value4} onChange={setValue4} readOnly={readonly} />
          <Button
            label={readonly ? 'Edit' : 'Save'}
            onClick={() => setReadonly(!readonly)}
          />
          <TextInput
            value={''}
            onChange={() => null}
            placeholder="Placeholder for read-only"
            readOnly={readonly}
          />
        </Flex>
        <Text size={5} weight="bold" block>
          Small TextInputs
        </Text>
        <TextInput
          size="s"
          value={value5}
          onChange={setValue5}
          placeholder="Type something in the small TextInput"
        />
        <Text size={5} weight="bold" block>
          Large TextInputs
        </Text>
        <TextInput
          size="l"
          value={value6}
          onChange={setValue6}
          placeholder="Type something in the large TextInput"
        />
        <Text size={5} weight="bold" block>
          TextInput without rainbow effect
        </Text>
        <TextInput
          size="s"
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
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Text Islands
        </Text>
        <Flex direction="horizontal" gap="l">
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
        <Flex direction="horizontal" gap="l">
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
            size="s"
          >
            <TextInput.TextIsland label="$" />
            <TextInput.TextIsland placement="right" label=".00" />
          </TextInput>
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
            size="s"
          >
            <TextInput.TextIsland label="cmd:" />
          </TextInput>
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Enter your zip"
            size="s"
            maxLength={10}
          >
            <TextInput.TextIsland
              placement="right"
              label={`${value3.length}/10`}
            />
          </TextInput>
        </Flex>
        <Flex direction="horizontal" gap="l">
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
            size="l"
          >
            <TextInput.TextIsland label="$" />
            <TextInput.TextIsland placement="right" label=".00" />
          </TextInput>
          <TextInput
            value={value2}
            onChange={setValue2}
            placeholder="Type something"
            size="l"
            variant="transparent"
          >
            <TextInput.TextIsland label="cmd:" />
          </TextInput>
          <TextInput
            value={value3}
            onChange={setValue3}
            placeholder="Enter your zip"
            size="l"
            maxLength={10}
          >
            <TextInput.TextIsland
              placement="right"
              label={`${value3.length}/10`}
            />
          </TextInput>
        </Flex>
        <Text size={5} weight="bold" block>
          Icon Islands
        </Text>
        <Flex direction="horizontal" gap="l">
          <TextInput
            value={value4}
            onChange={setValue4}
            placeholder="Type something"
          >
            <TextInput.IconIsland icon={<CircleUser />} />
          </TextInput>
          <TextInput
            value={value5}
            onChange={setValue5}
            placeholder="Ask AI Assistant"
          >
            <TextInput.IconIsland placement="right" icon={<Sparkles />} />
          </TextInput>
          <TextInput
            value={value6}
            onChange={setValue6}
            placeholder="Find a file"
          >
            <TextInput.IconIsland icon={<Search />} />
            <TextInput.IconIsland icon={<Folder />} />
            <TextInput.IconIsland placement="right" icon={<ChevronDown />} />
          </TextInput>
        </Flex>
        <Flex direction="horizontal" gap="l">
          <TextInput
            value={value6}
            onChange={setValue6}
            placeholder="Find a file"
            size="s"
          >
            <TextInput.IconIsland icon={<Search />} />
            <TextInput.IconIsland icon={<Folder />} />
            <TextInput.IconIsland placement="right" icon={<ChevronDown />} />
          </TextInput>
          <TextInput
            value={value6}
            onChange={setValue6}
            placeholder="Find a file"
            size="l"
          >
            <TextInput.IconIsland icon={<Search />} />
            <TextInput.IconIsland icon={<Folder />} />
            <TextInput.IconIsland placement="right" icon={<ChevronDown />} />
          </TextInput>
        </Flex>
        <Text size={5} weight="bold" block>
          Action Islands
        </Text>
        <Flex direction="horizontal" gap="l">
          <TextInput value={value7} onChange={setValue7} placeholder="Username">
            <Dropdown
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
              overlap
            >
              <TextInput.ActionIsland
                icon={<CircleUser />}
                label="Pick a user"
              />
            </Dropdown>
            <TextInput.ActionIsland
              icon={<Delete />}
              label="Clear field"
              showLabel={false}
              placement="right"
              onClick={() => setValue7('')}
            />
          </TextInput>

          <TextInput value={value7} onChange={setValue7} placeholder="Username">
            <TextInput.ActionIsland
              icon={<Ban />}
              label="Disabled action"
              disabled
            />
            <TextInput.ActionIsland
              icon={<Repeat />}
              label="Revert changes"
              placement="right"
              danger
            />
          </TextInput>
        </Flex>
        <Flex direction="horizontal" gap="l">
          <TextInput
            value={value8}
            onChange={setValue8}
            placeholder="User Password"
            size="s"
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
            size="l"
            variant="transparent"
          >
            <TextInput.ActionIsland
              icon={<Share />}
              label="Share"
              placement="right"
              onClick={() => setValue8('')}
            />
            <TextInput.ActionIsland
              icon={<ChevronDown />}
              label="Show more options"
              showLabel={false}
              placement="right"
            />
          </TextInput>
        </Flex>
        <Text size={5} weight="bold" block>
          Custom Islands
        </Text>
        <Flex direction="horizontal" gap="l">
          <TextInput
            value={value9}
            onChange={setValue9}
            placeholder="<-- Close button as custom island"
          >
            <TextInput.CustomIsland>
              <CloseButton size="s" />
            </TextInput.CustomIsland>
          </TextInput>
        </Flex>
        <Text size={5} weight="bold" block>
          Loading Islands
        </Text>
        <Flex direction="horizontal" gap="l">
          <TextInput
            value={value9}
            onChange={setValue9}
            placeholder="That input loads something"
          >
            <TextInput.LoadingIsland />
          </TextInput>
          <TextInput
            value={value9}
            onChange={setValue9}
            placeholder="That input loads something"
            size="s"
          >
            <TextInput.LoadingIsland placement="right" />
          </TextInput>
          <TextInput
            value={value9}
            onChange={setValue9}
            placeholder="That input loads something"
            size="l"
          >
            <TextInput.LoadingIsland placement="right" />
          </TextInput>
        </Flex>
        <Text size={5} weight="bold" block>
          Char Counter Islands
        </Text>
        <Flex direction="horizontal" gap="l">
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
            maxLength={8}
          >
            <TextInput.TextIsland label="Chars:" />
            <TextInput.CharCounterIsland />
          </TextInput>
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
          >
            <TextInput.CharCounterIsland />
          </TextInput>
          <TextInput
            value={value1}
            onChange={setValue1}
            placeholder="Type something"
            maxLength={12}
          >
            <TextInput.CharCounterIsland placement="right" />
          </TextInput>
        </Flex>
      </Flex>
    );
  },
};

export const SizesStory: StoryObj<typeof Flex> = {
  name: 'Using different sizes',
  render: () => {
    const [value1, setValue1] = useState('');

    return (
      <Flex direction="vertical" gap="l">
        {(['mini', 's', 'm', 'l', 'xl'] as Size[]).map((size: Size) => (
          <>
            <Text size={5} weight="bold" block>
              Size {size.toUpperCase()}
            </Text>
            <Flex direction="horizontal" gap="l">
              <TextInput
                value={value1}
                onChange={setValue1}
                placeholder="Type something"
                size={size}
              />
              <TextInput
                value={value1}
                onChange={setValue1}
                placeholder="Type something"
                size={size}
              >
                <TextInput.TextIsland label="$" />
                <TextInput.IconIsland icon={<CircleUser />} />
                <TextInput.TextIsland placement="right" label=".00" />
              </TextInput>
            </Flex>
            <Flex direction="horizontal" gap="l">
              <TextInput
                value={value1}
                onChange={setValue1}
                placeholder="Type something"
                size={size}
              >
                <TextInput.ActionIsland
                  label="Alert!"
                  onClick={() => setValue1('')}
                />
                <TextInput.IconIsland
                  icon={<TriangleAlert />}
                  placement="right"
                />
                <TextInput.ActionIsland
                  label="Delete"
                  icon={<Delete />}
                  placement="right"
                  onClick={() => setValue1('')}
                />
              </TextInput>
              <TextInput
                value={value1}
                onChange={setValue1}
                placeholder="Type something"
                size={size}
              >
                <TextInput.LoadingIsland />
                <TextInput.CharCounterIsland placement="right" />
              </TextInput>
            </Flex>
          </>
        ))}
      </Flex>
    );
  },
};

export const CustomInputStory: StoryObj<typeof Flex> = {
  name: 'Using custom input',
  render: () => {
    const [value, setValue] = useState('0');

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Using custom component instead of standard input
        </Text>
        <TextInput value={value} onChange={setValue} Component={<textarea />}>
          <TextInput.TextIsland label="Left island" />
        </TextInput>
      </Flex>
    );
  },
};

export default story;
