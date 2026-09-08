import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { SideNavigation } from './SideNavigation.tsx';

const story: Meta<typeof SideNavigation> = {
  title: 'Components/Navigation/SideNavigation',
  component: SideNavigation,
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

// ─── Prose helpers ───────────────────────────────────────────────────────────

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

export const Overview: StoryObj<typeof SideNavigation> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        SideNavigation
      </Text>

      <Paragraph>
        <Text code>SideNavigation</Text> is an on-page table of contents. It
        renders a <Text code>&lt;nav&gt;</Text> of anchor links and highlights
        whichever section is currently in view, tracked with an{' '}
        <Text code>IntersectionObserver</Text> (<Text code>ScrollSpy</Text>).
        Use it for long documents — docs pages, guides, settings.
      </Paragraph>

      <Paragraph>
        It is <Text weight="bold">not</Text> <Text code>NavigationList</Text>.{' '}
        <Text code>SideNavigation</Text> is intra-page (hash anchors);{' '}
        <Text code>NavigationList</Text> is app-level route navigation.
      </Paragraph>

      <Heading>Anatomy</Heading>
      <Paragraph>
        An optional <Text code>title</Text> (the <Text code>&lt;nav&gt;</Text>{' '}
        is <Text code>aria-labelledby</Text> it) over a list of{' '}
        <Text code>SideNavigation.Item</Text>s. Each item needs a{' '}
        <Text code>href</Text> that matches an element <Text code>id</Text> on
        the page and a <Text code>label</Text>. The active item gets{' '}
        <Text code>aria-current="page"</Text> and turns bold + accent-colored.
      </Paragraph>

      <Heading>Nesting</Heading>
      <Paragraph>
        Put <Text code>SideNavigation.Item</Text>s inside an item for
        sub-sections. Nested items are always visible (not collapsible) and
        indented one step. Every level is spied independently.
      </Paragraph>

      <Text block size={2} color="muted" style={{ marginTop: 8 }}>
        A live scroll-spy example is in the “Documentation page” story — scroll
        the canvas and watch the sidebar follow.
      </Text>

      <SideNavigation title="On this page">
        <SideNavigation.Item href="#a" label="Introduction" />
        <SideNavigation.Item href="#b" label="Getting started">
          <SideNavigation.Item href="#b1" label="Install" />
          <SideNavigation.Item href="#b2" label="Configure" />
        </SideNavigation.Item>
        <SideNavigation.Item href="#c" label="API reference" />
        <SideNavigation.Item href="#d" label="FAQ" />
      </SideNavigation>
    </Flex>
  ),
};

// ─── Documentation page (live scroll-spy) ────────────────────────────────────

type Section = {
  id: string;
  title: string;
  body: string[];
  children?: { id: string; title: string; body: string[] }[];
};

const SECTIONS: Section[] = [
  {
    id: 'overview',
    title: 'Overview',
    body: [
      'A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications. It is the single source of truth that bridges design and engineering.',
      'Unlike a UI kit, a mature design system also includes design tokens, interaction guidelines, accessibility standards, documentation, and contribution workflows. It is a product other teams build on.',
    ],
  },
  {
    id: 'principles',
    title: 'Core Principles',
    body: [
      'Every successful design system rests on a small set of principles that guide every decision, from token names to component APIs. Without them, teams default to local optimizations that fragment the system.',
    ],
    children: [
      {
        id: 'consistency',
        title: 'Consistency',
        body: [
          'When similar actions look and behave the same across a product, users transfer knowledge without relearning. Consistency is predictability, not uniformity — a button in a modal and one in a toolbar should feel like siblings.',
        ],
      },
      {
        id: 'reusability',
        title: 'Reusability',
        body: [
          'A component that solves one problem is a feature, not a system component. Reusability requires identifying what varies between use cases and turning those variations into props, slots, or configuration.',
        ],
      },
      {
        id: 'accessibility',
        title: 'Accessibility',
        body: [
          'Accessibility is a practice, not a checklist. Building accessible components from the start costs far less than retrofitting: keyboard navigation, correct ARIA, adequate contrast, screen-reader support.',
        ],
      },
    ],
  },
  {
    id: 'tokens',
    title: 'Design Tokens',
    body: [
      'Design tokens are named variables that store visual decisions, replacing hard-coded values so a single change propagates everywhere.',
    ],
    children: [
      {
        id: 'colors',
        title: 'Colors',
        body: [
          'A palette of hues in twelve-plus lightness steps, mapped to semantic roles — background, border, text, interactive, solid — so components adapt to theme changes without per-case overrides.',
        ],
      },
      {
        id: 'typography',
        title: 'Typography',
        body: [
          'A limited, semantically named type scale — heading, subheader, paragraph, label, caption — so components reference roles, not raw pixels.',
        ],
      },
      {
        id: 'spacing',
        title: 'Spacing',
        body: [
          'A scale built on multiples of a base unit makes layout mechanical: every gap, padding, and margin is a token, so layouts compose without collisions.',
        ],
      },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    body: [
      'Component architecture follows atomic design: atoms (Button, Input), molecules (SearchInput, FormRow), organisms (DataTable, DatePicker). Each level has a clear contract for input, output, and what it tells its parent.',
    ],
  },
  {
    id: 'theming',
    title: 'Theming',
    body: [
      'Theming changes the visual language without touching component logic. CSS custom properties cascade, are overridable at any scope, and cost nothing at runtime.',
      'Define theme values on a root selector, override them per theme, and have components reference only semantic tokens. Switching themes is a data attribute toggle on <html> — no re-renders.',
    ],
  },
  {
    id: 'governance',
    title: 'Governance',
    body: [
      'A design system without governance decays: components diverge, tokens proliferate, docs drift. Governance is the process that keeps it healthy — contribution guidelines, review, versioning, a channel for consumers.',
      'Inner-source models work well: open contribution via templated PRs, a small core owning API and accessibility review, semantic versioning, changelogs, and a deprecation policy of at least one major version.',
    ],
  },
];

export const DocumentationPage: StoryObj<typeof SideNavigation> = {
  name: 'Documentation page',
  render: () => (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 260,
          height: '100vh',
          borderLeft: '1px solid var(--border-1)',
          background: 'var(--background-2)',
          overflowY: 'auto',
          padding: '24px 0',
          zIndex: 10,
        }}
      >
        <SideNavigation title="On this page">
          {SECTIONS.map((section) => (
            <SideNavigation.Item
              key={section.id}
              href={`#${section.id}`}
              label={section.title}
            >
              {section.children?.map((child) => (
                <SideNavigation.Item
                  key={child.id}
                  href={`#${child.id}`}
                  label={child.title}
                />
              ))}
            </SideNavigation.Item>
          ))}
        </SideNavigation>
      </div>

      <div style={{ maxWidth: 680, paddingRight: 300 }}>
        <Text size={8} weight="bold" block>
          Design Systems: A Practical Guide
        </Text>
        <Text block color="muted">
          A reference for teams building and maintaining component libraries at
          scale.
        </Text>

        {SECTIONS.map((section) => (
          <div key={section.id}>
            <Text
              size={6}
              weight="bold"
              block
              id={section.id}
              style={{ marginTop: 40 }}
            >
              {section.title}
            </Text>
            {section.body.map((p, i) => (
              <Text key={i} block>
                {p}
              </Text>
            ))}
            {section.children?.map((child) => (
              <div key={child.id}>
                <Text
                  size={5}
                  weight="bold"
                  block
                  id={child.id}
                  style={{ marginTop: 24 }}
                >
                  {child.title}
                </Text>
                {child.body.map((p, i) => (
                  <Text key={i} block>
                    {p}
                  </Text>
                ))}
              </div>
            ))}
          </div>
        ))}

        <div style={{ height: 400 }} />
      </div>
    </>
  ),
};

// ─── Without a title ─────────────────────────────────────────────────────────

export const WithoutTitle: StoryObj<typeof SideNavigation> = {
  name: 'Without title',
  render: () => (
    <SideNavigation>
      <SideNavigation.Item href="#intro" label="Introduction" />
      <SideNavigation.Item href="#core" label="Core concepts" />
      <SideNavigation.Item href="#advanced" label="Advanced usage" />
    </SideNavigation>
  ),
};
