import { Meta, StoryObj } from '@storybook/react';
import { Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { SideNavigation } from './SideNavigation.tsx';

const story: Meta<typeof SideNavigation> = {
  title: 'Components/Navigation/SideNavigation',
  component: SideNavigation,
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

export const SideNavigationStory: StoryObj<typeof SideNavigation> = {
  name: 'Using SideNavigation',
  render: () => (
    <>
      {/* Fixed sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '260px',
          height: '100vh',
          borderLeft: '1px solid var(--border-1)',
          background: 'var(--background-2)',
          overflowY: 'auto',
          padding: '24px 0',
          zIndex: 10,
        }}
      >
        <SideNavigation title="On this page">
          <SideNavigation.Item href="#overview" label="Overview" />
          <SideNavigation.Item href="#principles" label="Core Principles">
            <SideNavigation.Item href="#consistency" label="Consistency" />
            <SideNavigation.Item href="#reusability" label="Reusability" />
            <SideNavigation.Item href="#accessibility" label="Accessibility" />
          </SideNavigation.Item>
          <SideNavigation.Item href="#tokens" label="Design Tokens">
            <SideNavigation.Item href="#colors" label="Colors" />
            <SideNavigation.Item href="#typography" label="Typography" />
            <SideNavigation.Item href="#spacing" label="Spacing" />
          </SideNavigation.Item>
          <SideNavigation.Item href="#components" label="Components">
            <SideNavigation.Item href="#atoms" label="Atoms" />
            <SideNavigation.Item href="#molecules" label="Molecules" />
            <SideNavigation.Item href="#organisms" label="Organisms" />
          </SideNavigation.Item>
          <SideNavigation.Item href="#theming" label="Theming" />
          <SideNavigation.Item href="#governance" label="Governance" />
          <SideNavigation.Item href="#references" label="References" />
        </SideNavigation>
      </div>

      {/* Scrollable article */}
      <div style={{ maxWidth: '680px', paddingRight: '300px' }}>
        <Text size={8} weight="bold" block>
          Design Systems: A Practical Guide
        </Text>
        <Text block color="muted">
          A comprehensive reference for teams building and maintaining
          component libraries and design systems at scale.
        </Text>

        {/* Overview */}
        <Text size={6} weight="bold" block id="overview" style={{ marginTop: '40px' }}>
          Overview
        </Text>
        <Text block>
          A design system is a collection of reusable components, guided by
          clear standards, that can be assembled to build any number of
          applications. It is the single source of truth that bridges design
          and engineering, ensuring that products feel consistent, accessible,
          and maintainable regardless of which team built them.
        </Text>
        <Text block>
          Unlike a simple UI kit or component library, a mature design system
          includes design tokens, interaction guidelines, accessibility
          standards, documentation, contribution workflows, and tooling. It
          is a product in its own right — one that other teams use to build
          their products.
        </Text>
        <Text block>
          Adopting a design system typically reduces design decision fatigue,
          speeds up development cycles, and produces more cohesive user
          experiences. The upfront investment in infrastructure pays compounding
          dividends as more teams onboard and contribute.
        </Text>

        {/* Core Principles */}
        <Text size={6} weight="bold" block id="principles" style={{ marginTop: '40px' }}>
          Core Principles
        </Text>
        <Text block>
          Every successful design system is built on a small set of principles
          that guide every decision — from token naming conventions to
          component API design. Without explicit principles, teams default to
          local optimizations that fragment the system over time.
        </Text>

        <Text size={5} weight="bold" block id="consistency" style={{ marginTop: '24px' }}>
          Consistency
        </Text>
        <Text block>
          Users build mental models. When similar actions look and behave the
          same way across the product, users can transfer knowledge from one
          context to another without relearning. Consistency is not uniformity
          — it is predictability. A button in a modal and a button in a table
          toolbar should feel like siblings, not strangers.
        </Text>
        <Text block>
          Consistency must be enforced at multiple levels: visual (spacing,
          color, type), behavioral (hover, focus, active states), and semantic
          (names, roles, patterns). Linting rules and automated visual
          regression tests help maintain consistency as the system grows.
        </Text>

        <Text size={5} weight="bold" block id="reusability" style={{ marginTop: '24px' }}>
          Reusability
        </Text>
        <Text block>
          A component that solves only one problem is a feature, not a system
          component. Reusability requires intentional abstraction: identifying
          what varies between use cases and turning those variations into props,
          slots, or configuration.
        </Text>
        <Text block>
          The right level of abstraction is the hardest design decision. Too
          specific, and teams build duplicates. Too generic, and the component
          becomes impossible to understand or use correctly. The guiding
          question is: what is the minimum surface area that covers the maximum
          number of real use cases?
        </Text>

        <Text size={5} weight="bold" block id="accessibility" style={{ marginTop: '24px' }}>
          Accessibility
        </Text>
        <Text block>
          Accessibility is not a checklist — it is a practice. Building
          accessible components from the start costs far less than retrofitting
          them later. Components in a design system must handle keyboard
          navigation, expose correct ARIA roles and states, maintain adequate
          color contrast, and support screen readers out of the box.
        </Text>
        <Text block>
          Key requirements for accessible components:
        </Text>
        <Text list="marked">
          <Text item>All interactive elements are keyboard-focusable and have visible focus indicators</Text>
          <Text item>Color is never the sole means of conveying information</Text>
          <Text item>Text contrast meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text)</Text>
          <Text item>Dynamic content changes are announced via <Text code>aria-live</Text> regions</Text>
          <Text item>Icons used as controls have accessible labels via <Text code>aria-label</Text></Text>
          <Text item>Form inputs are associated with labels via <Text code>htmlFor</Text> or <Text code>aria-labelledby</Text></Text>
        </Text>

        {/* Design Tokens */}
        <Text size={6} weight="bold" block id="tokens" style={{ marginTop: '40px' }}>
          Design Tokens
        </Text>
        <Text block>
          Design tokens are named variables that store visual design decisions.
          They replace hard-coded values in component styles, decoupling the
          visual language from the implementation. When a token changes, every
          component that references it updates automatically.
        </Text>
        <Text block>
          Tokens are typically organized into three tiers:
        </Text>
        <Text list="numeric">
          <Text item><Text weight="bold">Primitive tokens</Text> — raw values: <Text code>--blue-9: #0090ff</Text>, <Text code>--size-4: 16px</Text></Text>
          <Text item><Text weight="bold">Semantic tokens</Text> — purpose-named aliases: <Text code>--accent: var(--blue-9)</Text>, <Text code>--gap: var(--size-4)</Text></Text>
          <Text item><Text weight="bold">Component tokens</Text> — scoped to a component: <Text code>--button-background: var(--accent)</Text></Text>
        </Text>

        <Text size={5} weight="bold" block id="colors" style={{ marginTop: '24px' }}>
          Colors
        </Text>
        <Text block>
          A well-structured color system defines a palette of hues, each in
          twelve or more lightness steps. Semantic color roles — background,
          border, text, interactive, solid — map hue steps to usage contexts.
          This ensures that when the theme changes, components adapt correctly
          without case-by-case overrides.
        </Text>
        <Text block>
          Dark mode is not simply an inversion of light mode. Text and
          background values flip, but surface elevations, shadow directions,
          and color saturations often need independent tuning. Designing both
          themes in parallel from the beginning prevents expensive rework.
        </Text>

        <Text size={5} weight="bold" block id="typography" style={{ marginTop: '24px' }}>
          Typography
        </Text>
        <Text block>
          A type scale defines a limited set of font sizes, weights, and line
          heights. Each step is semantically named — heading, subheader,
          paragraph, label, caption — so that components reference roles, not
          raw pixel values. Changing the scale updates every component at once.
        </Text>
        <Text block>
          Variable fonts allow a single font file to cover the full weight and
          optical size range, reducing network payload significantly. For
          code blocks, a monospace variable font improves the reading experience
          for technical documentation.
        </Text>

        <Text size={5} weight="bold" block id="spacing" style={{ marginTop: '24px' }}>
          Spacing
        </Text>
        <Text block>
          A spacing scale based on multiples of a base unit (typically 4px or
          8px) makes layout decisions mechanical. When every gap, padding, and
          margin is a token from the scale, layouts feel intentional and
          components compose naturally without visual collisions.
        </Text>

        {/* Components */}
        <Text size={6} weight="bold" block id="components" style={{ marginTop: '40px' }}>
          Components
        </Text>
        <Text block>
          Component architecture follows atomic design principles, organizing
          elements by complexity. Each level has a clear contract: what it
          accepts as input, what it renders, and what it communicates to its
          parent.
        </Text>

        <Text size={5} weight="bold" block id="atoms" style={{ marginTop: '24px' }}>
          Atoms
        </Text>
        <Text block>
          Atoms are the smallest indivisible building blocks: <Text code>Button</Text>,{' '}
          <Text code>TextInput</Text>, <Text code>Icon</Text>, <Text code>Badge</Text>,{' '}
          <Text code>Divider</Text>. They carry no business logic, expose a
          minimal and predictable prop API, and always forward refs to their
          root DOM element for composition with overlays, tooltips, and
          drag-and-drop libraries.
        </Text>
        <Text block>
          Every atom must:
        </Text>
        <Text list="marked">
          <Text item>Accept and forward a <Text code>ref</Text> to the root DOM element</Text>
          <Text item>Spread <Text code>...restProps</Text> onto the root element</Text>
          <Text item>Accept <Text code>className</Text> and <Text code>style</Text> for external overrides</Text>
          <Text item>Support a <Text code>disabled</Text> state where applicable</Text>
          <Text item>Read global config via <Text code>useConfiguration()</Text></Text>
        </Text>

        <Text size={5} weight="bold" block id="molecules" style={{ marginTop: '24px' }}>
          Molecules
        </Text>
        <Text block>
          Molecules combine atoms into focused, single-purpose components:{' '}
          <Text code>SearchInput</Text> (TextInput + Icon + Button),{' '}
          <Text code>FormRow</Text> (Label + Input + ErrorText), or{' '}
          <Text code>Notification</Text> (Icon + Text + CloseButton). They
          coordinate the behavior of their children but still carry no domain
          logic.
        </Text>
        <Text block>
          The molecule boundary is crossed when two or more atoms must
          communicate state: the clear button in a search input must know
          whether the input has a value. That relationship belongs to the
          molecule, not to the atoms themselves.
        </Text>

        <Text size={5} weight="bold" block id="organisms" style={{ marginTop: '24px' }}>
          Organisms
        </Text>
        <Text block>
          Organisms are self-contained sections of the interface assembled from
          molecules and atoms:{' '}
          <Text code>DataTable</Text>, <Text code>NavigationBar</Text>,{' '}
          <Text code>DatePicker</Text>, <Text code>CommandPalette</Text>. They
          may manage their own state, handle async data, and communicate with
          external stores. Organisms are the natural boundary for feature-level
          testing.
        </Text>

        {/* Theming */}
        <Text size={6} weight="bold" block id="theming" style={{ marginTop: '40px' }}>
          Theming
        </Text>
        <Text block>
          Theming enables the visual language to change without touching component
          logic. CSS custom properties (CSS variables) are the standard mechanism:
          they cascade, are overridable at any scope, and work natively in the
          browser without a build step or runtime cost.
        </Text>
        <Text block>
          The recommended pattern: define all theme values on a root selector
          (<Text code>[data-theme="light"]</Text>), then override them for
          alternate themes. Components reference only semantic tokens, never
          raw values, so they automatically adapt.
        </Text>
        <Text block>
          Runtime theme switching is straightforward — toggle a data attribute
          on the <Text code>{'<html>'}</Text> element. No component re-renders
          are needed; the browser recomputes all custom property references
          instantly.
        </Text>

        {/* Governance */}
        <Text size={6} weight="bold" block id="governance" style={{ marginTop: '40px' }}>
          Governance
        </Text>
        <Text block>
          A design system without governance decays. Components diverge, tokens
          proliferate, documentation drifts. Governance is the set of processes
          that keep the system healthy: contribution guidelines, review workflows,
          versioning policy, and a communication channel for consumers.
        </Text>
        <Text block>
          Effective governance models follow inner-source principles:
        </Text>
        <Text list="numeric">
          <Text item><Text weight="bold">Open contribution</Text> — any team can propose additions via a pull request with a defined template</Text>
          <Text item><Text weight="bold">Core review</Text> — a small group owns API quality, accessibility review, and documentation standards</Text>
          <Text item><Text weight="bold">Semantic versioning</Text> — breaking changes bump major, new APIs bump minor, fixes bump patch</Text>
          <Text item><Text weight="bold">Changelogs</Text> — every release documents what changed, why, and how to migrate</Text>
          <Text item><Text weight="bold">Deprecation policy</Text> — APIs are deprecated with a warning for at least one major version before removal</Text>
        </Text>
        <Text block>
          Regular office hours, a dedicated Slack channel, and monthly
          changelog summaries keep consumers engaged and reduce friction when
          breaking changes are necessary.
        </Text>

        {/* References */}
        <Text size={6} weight="bold" block id="references" style={{ marginTop: '40px' }}>
          References
        </Text>
        <Text list="numeric">
          <Text item>Brad Frost — <Text italic>Atomic Design</Text> (2016)</Text>
          <Text item>Nathan Curtis — <Text italic>Modular Web Design</Text> (2009)</Text>
          <Text item>Alla Kholmatova — <Text italic>Design Systems</Text>, Smashing Magazine (2017)</Text>
          <Text item>W3C Web Accessibility Initiative — WCAG 2.1 Guidelines</Text>
          <Text item>Google Material Design — Material Design System documentation</Text>
        </Text>

        <div style={{ height: '80px' }} />
      </div>
    </>
  ),
};

export default story;
