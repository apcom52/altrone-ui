import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { Dropdown, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Breadcrumbs } from './Breadcrumbs.tsx';
import { Ellipsis, Home } from 'lucide-react';

const story: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
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
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof Breadcrumbs> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Breadcrumbs
      </Text>

      <Paragraph>
        <Text code>Breadcrumbs</Text> shows where the current page sits in the
        hierarchy and offers a one-click path back up. It's a labelled{' '}
        <Text code>&lt;nav&gt;</Text> landmark wrapping an{' '}
        <Text code>&lt;ol&gt;</Text> of <Text code>Breadcrumbs.Item</Text>s. A{' '}
        <Text code>ChevronRight</Text> separator is drawn after every item
        except the last — no wiring needed.
      </Paragraph>

      <Heading>Plain vs. links</Heading>
      <Paragraph>
        An item renders a plain <Text code>&lt;div&gt;</Text> by default. Set{' '}
        <Text code>asChild</Text> and pass an <Text code>&lt;a&gt;</Text> (or a
        router <Text code>&lt;Link&gt;</Text>) to make it navigable — the{' '}
        <Text code>label</Text> and <Text code>icon</Text> become that element's
        content automatically. Mark the last item <Text code>current</Text>: it
        turns bold and gets <Text code>aria-current="page"</Text>, and should{' '}
        <Text weight="bold">not</Text> be a link.
      </Paragraph>

      <Breadcrumbs>
        <Breadcrumbs.Item icon={<Home />} label="Home" asChild>
          <a href="#home" />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item label="Design system" asChild>
          <a href="#ds" />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item label="Components" asChild>
          <a href="#components" />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item label="Breadcrumbs" current />
      </Breadcrumbs>

      <Heading>Plain (no links)</Heading>
      <Breadcrumbs>
        <Breadcrumbs.Item label="Account" />
        <Breadcrumbs.Item label="Billing" />
        <Breadcrumbs.Item label="Invoice #A-1042" current />
      </Breadcrumbs>

      <Heading>Collapsed middle</Heading>
      <Paragraph>
        For a deep path, replace the intermediate items with an{' '}
        <Text code>Ellipsis</Text> that opens a <Text code>Dropdown</Text>.
      </Paragraph>

      <Breadcrumbs>
        <Breadcrumbs.Item icon={<Home />} label="Home" asChild>
          <a href="#home" />
        </Breadcrumbs.Item>
        <Dropdown
          content={
            <Dropdown.Menu>
              <Dropdown.Action label="Catalog" />
              <Dropdown.Action label="Electronics" />
              <Dropdown.Action label="Laptops" />
            </Dropdown.Menu>
          }
        >
          <Breadcrumbs.Item icon={<Ellipsis />} label="More" />
        </Dropdown>
        <Breadcrumbs.Item label="Pro 16" current />
      </Breadcrumbs>
    </Flex>
  ),
};

// ─── Scenario: file browser path ─────────────────────────────────────────────

export const FileBrowser: StoryObj<typeof Breadcrumbs> = {
  name: 'File browser',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
      <Text size={5} weight="bold" block>
        ~/projects/altrone/core/src
      </Text>
      <Breadcrumbs>
        <Breadcrumbs.Item icon={<Home />} label="Home" asChild>
          <a href="#0" />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item label="projects" asChild>
          <a href="#1" />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item label="altrone" asChild>
          <a href="#2" />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item label="core" asChild>
          <a href="#3" />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item label="src" current />
      </Breadcrumbs>
    </Flex>
  ),
};
