import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { Heart, Star } from 'lucide-react';
import {
  Accent,
  Button,
  Flex,
  Override,
  Pagination,
  Popover,
  Search,
  Text,
  Tooltip,
} from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta<typeof Override> = {
  title: 'Components/Layout/Override',
  component: Override,
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

export default story;

const Heading = ({ children }: { children: string }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 16 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text block size={4} color="muted" style={{ maxWidth: 680, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Sample = () => (
  <Flex orientation="vertical" gap="m" style={{ maxWidth: 420 }}>
    <Search placeholder="Search" />
    <Flex gap="s" align="center">
      <Button label="Save" variant="submit" />
      <Popover
        trigger="click"
        content={<Text size={3}>Opened inside the block.</Text>}
      >
        <Button label="Popover" />
      </Popover>
    </Flex>
    <Pagination totalPages={9} defaultPage={4} />
  </Flex>
);

const ACCENTS: Accent[] = [
  'red',
  'orange',
  'amber',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
  'brown',
];

export const Overview: StoryObj<typeof Override> = {
  name: 'Overview',
  render: () => (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Override
      </Text>
      <Paragraph>
        <Text code>Application</Text> exists once, at the top of the tree, and
        applies its settings everywhere. <Text code>Override</Text> re-applies a
        part of them to one block: theme, accent, language, labels and icons.
        Whatever you don't pass is inherited, so a block can change a single
        thing and stay consistent with the rest of the app.
      </Paragraph>
      <Paragraph>
        The same set of components below is rendered with the page's settings
        first.
      </Paragraph>
      <Sample />

      <Heading>Theme</Heading>
      <Paragraph>
        <Text code>theme</Text> switches one block between light and dark. The
        block paints its own background, so it reads as a real panel, and
        popovers and tooltips opened from inside it follow the block's theme,
        not the page's.
      </Paragraph>
      <Flex gap="m" wrap>
        <Override theme="light" style={{ padding: 16, borderRadius: 12 }}>
          <Sample />
        </Override>
        <Override theme="dark" style={{ padding: 16, borderRadius: 12 }}>
          <Sample />
        </Override>
      </Flex>

      <Heading>Accent</Heading>
      <Paragraph>
        <Text code>accent</Text> changes the main color for the block only:
        submit and selected buttons, the current page, switches and sliders. The
        theme is inherited.
      </Paragraph>
      <Flex gap="s" wrap>
        {ACCENTS.map((accent) => (
          <Override key={accent} accent={accent} style={{ padding: 8 }}>
            <Flex orientation="vertical" gap="s">
              <Button label={accent} variant="submit" />
              <Button label={accent} selected />
            </Flex>
          </Override>
        ))}
      </Flex>

      <Heading>Language and labels</Heading>
      <Paragraph>
        <Text code>language</Text> switches the built-in texts of the block.{' '}
        <Text code>customLabels</Text> replaces single strings on top of the
        inherited dictionary. Hover the arrow buttons of the paginations below
        to compare: the page's labels, German, and custom ones.
      </Paragraph>
      <Flex orientation="vertical" gap="m">
        <Pagination totalPages={9} defaultPage={4} />
        <Override language="de" style={{ padding: 8 }}>
          <Pagination totalPages={9} defaultPage={4} />
        </Override>
        <Override
          customLabels={{
            pagination: {
              navigation: 'Pagination',
              previous: 'Back',
              next: 'Forward',
              firstPage: 'To the start',
              lastPage: 'To the end',
              page: 'Page {{page}}',
            },
          }}
          style={{ padding: 8 }}
        >
          <Pagination totalPages={9} defaultPage={4} />
        </Override>
      </Flex>

      <Heading>Icons</Heading>
      <Paragraph>
        <Text code>icons</Text> replaces the shared icon roles for the block,
        for example the search glyph of every <Text code>Search</Text> inside
        it, without touching the components themselves.
      </Paragraph>
      <Flex gap="m" wrap>
        <Search placeholder="Default icons" />
        <Override icons={{ search: <Star /> }}>
          <Search placeholder="Star as the search icon" />
        </Override>
        <Override icons={{ search: <Heart />, clear: <Heart /> }}>
          <Search placeholder="Hearts" defaultValue="Clear me" />
        </Override>
      </Flex>

      <Heading>Nesting</Heading>
      <Paragraph>
        Overrides can be nested. Each level inherits from the closest one above
        and changes only what it names, so the inner block here keeps the dark
        theme and swaps only the accent.
      </Paragraph>
      <Override theme="dark" style={{ padding: 16, borderRadius: 12 }}>
        <Flex orientation="vertical" gap="m">
          <Button label="Blue accent, dark" selected />
          <Override accent="green" style={{ padding: 16, borderRadius: 12 }}>
            <Flex gap="m" align="center">
              <Button label="Green accent, still dark" selected />
              <Tooltip content="Follows the nearest Override">
                <Button label="Hover me" />
              </Tooltip>
            </Flex>
          </Override>
        </Flex>
      </Override>

      <Heading>What it doesn't cover</Heading>
      <Paragraph>
        <Text code>Modal</Text>, <Text code>Drawer</Text>,{' '}
        <Text code>Dialog</Text> and notifications render under the top-level{' '}
        <Text code>Application</Text>, so they keep the page's theme even when
        opened from inside an <Text code>Override</Text>.
      </Paragraph>
    </Flex>
  ),
};
