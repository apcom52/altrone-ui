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
import { InlineEdit, OtpEntry } from './stories';

const story: Meta<typeof TextInput> = {
  title: 'Components/Controls/TextInput',
  component: TextInput,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const Overview: StoryObj<typeof Flex> = {
  name: 'Overview',
  render: () => {
    const [value, setValue] = useState('');
    const [filled, setFilled] = useState('altrone-ui');
    const [pin, setPin] = useState('12');
    const [readonly, setReadonly] = useState(true);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
        <Text size={6} weight="bold" block>
          TextInput
        </Text>
        <Text block>
          A single-line text field. Visually it is a <Text code>Box</Text> — the
          frame, fill, corner radius, elevation and the focus ring while typing
          all come from the primitive, so every button-like control in the
          library shares one material system. This stylesheet only adds the
          field&apos;s own typography and the row that arranges islands around
          the input.
        </Text>

        <Text size={4} weight="bold" block>
          States
        </Text>
        <Text block>
          The field reads its <Text code>name</Text>, <Text code>invalid</Text>,{' '}
          <Text code>disabled</Text> and <Text code>size</Text> from a
          surrounding <Text code>Form.Field</Text> when the prop is not passed
          explicitly.
        </Text>
        <Flex direction="vertical" gap="m">
          <TextInput
            value={value}
            onChange={setValue}
            placeholder="Empty — placeholder shown"
          />
          <TextInput value={filled} onChange={setFilled} />
          <TextInput
            value={pin}
            onChange={setPin}
            placeholder="Exactly 3 characters"
            invalid={pin.length !== 3}
          />
          <TextInput
            value=""
            onChange={() => null}
            disabled
            placeholder="Disabled"
          />
        </Flex>

        <Text size={4} weight="bold" block>
          Read-only
        </Text>
        <Text block>
          With <Text code>readonlyStyles</Text> (on by default) a read-only
          field drops its material and reads as plain text, while staying
          focusable so the value can be selected and copied.
        </Text>
        <Flex direction="horizontal" gap="s" align="center">
          <TextInput
            value="Lord Voldemort"
            onChange={() => null}
            readOnly={readonly}
          />
          <Button
            label={readonly ? 'Edit' : 'Save'}
            onClick={() => setReadonly(!readonly)}
          />
        </Flex>
      </Flex>
    );
  },
};

export const Materials: StoryObj<typeof Flex> = {
  name: 'Materials',
  render: () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
        <Text size={6} weight="bold" block>
          Materials
        </Text>
        <Text size={4} weight="bold" block>
          default
        </Text>
        <Text block>
          The <Text code>default</Text> variant is a <Text code>plate</Text>{' '}
          material — a frosted fill with a hairline edge, the same surface the
          default <Text code>Button</Text> uses. It suits a field that sits on a
          plain page background.
        </Text>
        <TextInput value={a} onChange={setA} placeholder="default variant" />

        <Text size={4} weight="bold" block>
          transparent
        </Text>
        <Text block>
          The <Text code>transparent</Text> variant has no fill or edge at rest
          and washes in the same tint on hover and on focus (like the{' '}
          <Text code>text</Text> Button). Use it for fields embedded in dense
          chrome — a toolbar, a table filter row, a segmented control.
        </Text>
        <TextInput
          value={b}
          onChange={setB}
          placeholder="transparent variant"
          variant="transparent"
        />
      </Flex>
    );
  },
};

export const Islands: StoryObj<typeof Flex> = {
  name: 'Islands',
  render: () => {
    const [amount, setAmount] = useState('');
    const [cmd, setCmd] = useState('npm install altrone-ui');
    const [file, setFile] = useState('');
    const [user, setUser] = useState('');
    const [note, setNote] = useState('');
    const [chars, setChars] = useState('');

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
        <Text size={6} weight="bold" block>
          Islands
        </Text>
        <Text block>
          Any <Text code>TextInput.*Island</Text> passed as a child is pulled
          out of the content and laid into a flex row beside the input —{' '}
          <Text code>placement=&quot;start&quot;</Text> (the default) or{' '}
          <Text code>placement=&quot;end&quot;</Text>. The passive ones are
          plain inline chips; <Text code>ActionIsland</Text> is a{' '}
          <Text code>Button</Text>.
        </Text>

        <Text size={4} weight="bold" block>
          Text &amp; icon
        </Text>
        <Text block>
          Static, non-interactive labels — a currency symbol, a command prefix,
          a leading glyph.
        </Text>
        <Flex direction="horizontal" gap="l">
          <TextInput value={amount} onChange={setAmount} placeholder="0">
            <TextInput.TextIsland placement="start" label="$" />
            <TextInput.TextIsland placement="end" label=".00" />
          </TextInput>
          <TextInput value={cmd} onChange={setCmd}>
            <TextInput.TextIsland label="cmd:" />
          </TextInput>
        </Flex>
        <TextInput value={file} onChange={setFile} placeholder="Find a file">
          <TextInput.IconIsland icon={<Search />} />
          <TextInput.IconIsland icon={<Folder />} />
          <TextInput.IconIsland placement="end" icon={<ChevronDown />} />
        </TextInput>

        <Text size={4} weight="bold" block>
          Action
        </Text>
        <Text block>
          An <Text code>ActionIsland</Text> is a <Text code>Button</Text> locked
          to the in-field <Text code>plate</Text> chip — it takes the whole
          Button API (<Text code>state</Text>, <Text code>badge</Text>,{' '}
          <Text code>tooltip</Text>, …) bar <Text code>variant</Text>. With{' '}
          <Text code>showLabel</Text> false it is a circular icon-only button
          with an auto tooltip from <Text code>label</Text>.
        </Text>
        <Flex direction="horizontal" gap="l">
          <TextInput value={user} onChange={setUser} placeholder="Username">
            <Dropdown
              content={
                <Dropdown.Menu>
                  <Dropdown.Action
                    label="@Wolf"
                    onClick={() => setUser('Wolf')}
                  />
                  <Dropdown.Action
                    label="@Fox"
                    onClick={() => setUser('Fox')}
                  />
                  <Dropdown.Action
                    label="@Bear"
                    onClick={() => setUser('Bear')}
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
              placement="end"
              onClick={() => setUser('')}
            />
          </TextInput>
          <TextInput value={user} onChange={setUser} placeholder="Username">
            <TextInput.ActionIsland
              icon={<Ban />}
              label="Disabled action"
              disabled
            />
            <TextInput.ActionIsland
              icon={<Repeat />}
              label="Revert changes"
              placement="end"
              danger
            />
          </TextInput>
        </Flex>
        <TextInput
          value={note}
          onChange={setNote}
          placeholder="Write your thoughts"
          variant="transparent"
        >
          <TextInput.ActionIsland
            icon={<Share />}
            label="Share"
            placement="end"
            onClick={() => setNote('')}
          />
          <TextInput.ActionIsland
            icon={<ChevronDown />}
            label="More options"
            showLabel={false}
            placement="end"
          />
        </TextInput>

        <Text size={4} weight="bold" block>
          Loading, custom &amp; char counter
        </Text>
        <Text block>
          <Text code>LoadingIsland</Text> shows a spinner with a localized{' '}
          <Text code>aria-label</Text>; <Text code>CustomIsland</Text> keeps
          pointer events so arbitrary interactive content works;{' '}
          <Text code>CharCounterIsland</Text> reads the field&apos;s value
          length and <Text code>maxLength</Text>.
        </Text>
        <Flex direction="horizontal" gap="l">
          <TextInput value={note} onChange={setNote} placeholder="Loading…">
            <TextInput.LoadingIsland placement="end" />
          </TextInput>
          <TextInput
            value={note}
            onChange={setNote}
            placeholder="Custom island"
          >
            <TextInput.CustomIsland placement="end">
              <CloseButton size="s" />
            </TextInput.CustomIsland>
          </TextInput>
        </Flex>
        <TextInput
          value={chars}
          onChange={setChars}
          placeholder="Type something"
          maxLength={8}
        >
          <TextInput.TextIsland label="Chars:" />
          <TextInput.CharCounterIsland placement="end" />
        </TextInput>
      </Flex>
    );
  },
};

export const Sizes: StoryObj<typeof Flex> = {
  name: 'Sizes',
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
        <Text size={6} weight="bold" block>
          Sizes
        </Text>
        <Text block>
          <Text code>size</Text> (<Text code>mini</Text> / <Text code>s</Text> /{' '}
          <Text code>m</Text> / <Text code>l</Text> / <Text code>xl</Text>)
          drives the field height, padding and radius through{' '}
          <Text code>Box</Text>, and the typography and icon size through this
          stylesheet. It is an explicit prop — it never changes with the
          viewport.
        </Text>
        {(['mini', 's', 'm', 'l', 'xl'] as Size[]).map((size) => (
          <Flex direction="vertical" gap="s" key={size}>
            <Text weight="bold" block>
              {size.toUpperCase()}
            </Text>
            <Flex direction="horizontal" gap="l">
              <TextInput
                value={value}
                onChange={setValue}
                placeholder="Plain"
                size={size}
              />
              <TextInput
                value={value}
                onChange={setValue}
                placeholder="With islands"
                size={size}
              >
                <TextInput.IconIsland icon={<CircleUser />} />
                <TextInput.ActionIsland
                  label="Alert"
                  icon={<TriangleAlert />}
                  placement="end"
                  onClick={() => setValue('')}
                />
              </TextInput>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  },
};

export const CustomField: StoryObj<typeof Flex> = {
  name: 'Custom field element',
  render: () => {
    const [value, setValue] = useState('0');

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
        <Text size={6} weight="bold" block>
          Custom field element
        </Text>
        <Text block>
          With <Text code>asChild</Text> the first non-island child becomes the
          field element, so the wrapper, islands and value wiring can be reused
          over a <Text code>&lt;textarea&gt;</Text> or a masked-input library
          component.
        </Text>
        <TextInput value={value} onChange={setValue} asChild>
          <textarea rows={3} />
          <TextInput.TextIsland label="note:" />
        </TextInput>
      </Flex>
    );
  },
};

export const InlineEditing: StoryObj = {
  name: 'Editing a value in place',
  render: () => <InlineEdit />,
};

export const OneTimeCode: StoryObj = {
  name: 'One-time code',
  render: () => <OtpEntry />,
};

export default story;
