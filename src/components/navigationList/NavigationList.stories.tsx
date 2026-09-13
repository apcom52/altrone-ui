import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { NavigationList } from './NavigationList.tsx';
import { LinkAction } from './components';
import {
  Archive,
  BarChart2,
  Bell,
  Bug,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Code,
  CreditCard,
  FolderOpen,
  GitBranch,
  GitPullRequest,
  Globe,
  Hash,
  Home,
  Inbox,
  LayoutDashboard,
  Layers,
  MessageSquare,
  MoreHorizontal,
  Package,
  Pencil,
  Play,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag,
  Terminal,
  Trash,
  Truck,
  Users,
  Webhook,
  Zap,
} from 'lucide-react';
import { Label } from 'components/label/Label.tsx';
import { Button } from 'components/button/Button.tsx';
import { Avatar } from 'components/avatar';

const story: Meta<typeof NavigationList> = {
  title: 'Components/Navigation/NavigationList',
  component: NavigationList,
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

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof NavigationList> = {
  name: 'Overview',
  render: () => {
    const [section, setSection] = useState('inbox');
    const [team, setTeam] = useState('engineering');
    const sel = (id: string) => section === id;

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Text block size={9} weight="bold">
          NavigationList
        </Text>

        <Paragraph>
          <Text code>NavigationList</Text> is the primary sidebar for an
          application shell. It renders a semantic <Text code>&lt;nav&gt;</Text>{' '}
          and arranges its content top&#8209;to&#8209;bottom: an optional{' '}
          <Text code>Header</Text>, any number of <Text code>Group</Text>
          sections, and an optional <Text code>Footer</Text> pinned to the
          bottom. Every leaf is a <Text code>Link</Text>.
        </Paragraph>

        <Heading>Anatomy</Heading>
        <Paragraph>
          A <Text code>Link</Text> is a real <Text code>&lt;a&gt;</Text>. Pass{' '}
          <Text code>href</Text> for navigation, or omit it and pass{' '}
          <Text code>onClick</Text> to use the item as a button &mdash; in that
          case it becomes focusable and responds to{' '}
          <Text kbd>Enter</Text> / <Text kbd>Space</Text>. The active item is
          marked <Text code>selected</Text>, which also sets{' '}
          <Text code>aria-current="page"</Text> and shows the sliding backdrop
          that animates between items as selection moves.
        </Paragraph>

        <NavigationList style={{ height: 'auto' }}>
          <NavigationList.Group>
            <NavigationList.Link
              icon={<Home />}
              label="Home"
              selected={sel('home')}
              onClick={() => setSection('home')}
            />
            <NavigationList.Link
              icon={<Inbox />}
              label="Inbox"
              badge="8"
              selected={sel('inbox')}
              onClick={() => setSection('inbox')}
            />
            <NavigationList.Link
              icon={<CheckCircle2 />}
              label="My Issues"
              badge="12"
              selected={sel('my-issues')}
              onClick={() => setSection('my-issues')}
            />
          </NavigationList.Group>
        </NavigationList>

        <Heading>Groups &amp; titles</Heading>
        <Paragraph>
          A <Text code>Group</Text> with a <Text code>title</Text> is exposed as
          an accessible <Text code>role="group"</Text> labelled by that title.
          Groups without a title are still useful for spacing a cluster of
          top&#8209;level links apart from the rest.
        </Paragraph>

        <NavigationList style={{ height: 'auto' }}>
          <NavigationList.Group title="Workspace">
            <NavigationList.Link
              icon={<LayoutDashboard />}
              label="Dashboard"
              selected={sel('dashboard')}
              onClick={() => setSection('dashboard')}
            />
            <NavigationList.Link
              icon={<BarChart2 />}
              label="Reports"
              selected={sel('reports')}
              onClick={() => setSection('reports')}
            />
          </NavigationList.Group>
          <NavigationList.Group title="Account">
            <NavigationList.Link
              icon={<CreditCard />}
              label="Billing"
              selected={sel('billing')}
              onClick={() => setSection('billing')}
            />
            <NavigationList.Link
              icon={<Settings />}
              label="Settings"
              selected={sel('settings')}
              onClick={() => setSection('settings')}
            />
          </NavigationList.Group>
        </NavigationList>

        <Heading>Nested links</Heading>
        <Paragraph>
          A <Text code>Link</Text> can contain child <Text code>Link</Text>{' '}
          elements. The sub&#8209;navigation is revealed only while the parent is{' '}
          <Text code>selected</Text>, keeping the sidebar compact until you drill
          into a section.
        </Paragraph>

        <NavigationList style={{ height: 'auto' }}>
          <NavigationList.Group title="Teams">
            <NavigationList.Link
              icon={<Users />}
              label="Engineering"
              badge="8"
              selected={sel('engineering-root')}
              onClick={() => setSection('engineering-root')}
            >
              <NavigationList.Link
                label="Frontend"
                selected={team === 'frontend'}
                onClick={() => setTeam('frontend')}
              />
              <NavigationList.Link
                label="Backend"
                selected={team === 'backend'}
                onClick={() => setTeam('backend')}
              />
              <NavigationList.Link
                label="DevOps"
                badge="2"
                selected={team === 'devops'}
                onClick={() => setTeam('devops')}
              />
            </NavigationList.Link>
            <NavigationList.Link
              icon={<Layers />}
              label="Design"
              selected={sel('design')}
              onClick={() => setSection('design')}
            />
          </NavigationList.Group>
        </NavigationList>

        <Heading>Row actions &amp; group actions</Heading>
        <Paragraph>
          <Text code>LinkAction</Text> puts icon buttons at the end of a row for
          per&#8209;item commands; it stops the click from reaching the parent
          link, so triggering an action never navigates.{' '}
          <Text code>GroupAction</Text> does the same in a group header &mdash;
          for an &ldquo;add&rdquo; button or a menu trigger. Both take a
          required <Text code>label</Text> that becomes their accessible name.
        </Paragraph>

        <NavigationList style={{ height: 'auto' }}>
          <NavigationList.Group title="Projects">
            <NavigationList.GroupAction label="New project" icon={<Plus />} />
            <Dropdown
              content={
                <Dropdown.Menu>
                  <Dropdown.Action label="Sort by name" />
                  <Dropdown.Action label="Sort by activity" />
                  <Dropdown.Action label="Hide archived" />
                </Dropdown.Menu>
              }
            >
              <NavigationList.GroupAction
                label="Options"
                icon={<MoreHorizontal />}
              />
            </Dropdown>

            <NavigationList.Link
              icon={<Hash />}
              label="Alpha"
              selected={sel('alpha')}
              onClick={() => setSection('alpha')}
            />
            <NavigationList.Link
              icon={<Hash />}
              label="Beta — Redesign"
              badge="3"
              selected={sel('beta')}
              onClick={() => setSection('beta')}
            >
              <LinkAction label="Open in new tab" icon={<Globe />} />
              <LinkAction label="Archive project" icon={<Archive />} />
            </NavigationList.Link>
          </NavigationList.Group>
        </NavigationList>

        <Heading>Badges &amp; trailing content</Heading>
        <Paragraph>
          <Text code>badge</Text> accepts a string, a number, or any element. For
          richer trailing content &mdash; a status pill, a count with a colour
          &mdash; drop a <Text code>Label</Text> straight into the link.
        </Paragraph>

        <NavigationList style={{ height: 'auto' }}>
          <NavigationList.Group title="CI">
            <NavigationList.Link
              icon={<Play />}
              label="Workflows"
              selected={sel('workflows')}
              onClick={() => setSection('workflows')}
            />
            <NavigationList.Link
              icon={<Zap />}
              label="Runs"
              selected={sel('runs')}
              onClick={() => setSection('runs')}
            >
              <Label color="danger" variant="soft" size="s">
                2 failed
              </Label>
            </NavigationList.Link>
            <NavigationList.Link
              icon={<Archive />}
              label="Artifacts"
              badge={128}
              selected={sel('artifacts')}
              onClick={() => setSection('artifacts')}
            />
          </NavigationList.Group>
        </NavigationList>

        <Heading>Disabled</Heading>
        <Paragraph>
          A <Text code>disabled</Text> link drops its <Text code>href</Text>,
          leaves the tab order (<Text code>tabindex="-1"</Text>), reports{' '}
          <Text code>aria-disabled</Text>, and ignores clicks.
        </Paragraph>

        <NavigationList style={{ height: 'auto' }}>
          <NavigationList.Group>
            <NavigationList.Link
              icon={<FolderOpen />}
              label="Files"
              selected={sel('files')}
              onClick={() => setSection('files')}
            />
            <NavigationList.Link
              icon={<GitBranch />}
              label="Branches (upgrade to unlock)"
              disabled
            />
          </NavigationList.Group>
        </NavigationList>

        <Heading>Router integration with asChild</Heading>
        <Paragraph>
          Set <Text code>asChild</Text> and pass a single element &mdash; your
          framework&apos;s <Text code>&lt;Link&gt;</Text> &mdash; as the child.{' '}
          <Text code>NavigationList.Link</Text> merges its styling, ref and
          interaction props onto that element instead of rendering its own{' '}
          <Text code>&lt;a&gt;</Text>. The icon, label and badge still come from
          props.
        </Paragraph>

        <NavigationList style={{ height: 'auto' }}>
          <NavigationList.Group>
            <NavigationList.Link
              icon={<Home />}
              label="Dashboard"
              asChild
              selected={sel('as-child')}
              onClick={(e) => {
                e.preventDefault();
                setSection('as-child');
              }}
            >
              <a href="#dashboard" />
            </NavigationList.Link>
          </NavigationList.Group>
        </NavigationList>
      </Flex>
    );
  },
};

// ─── Story: Project Management (Linear-style) ─────────────────────────────────

type ProjectSection =
  | 'home'
  | 'inbox'
  | 'my-issues'
  | 'alpha'
  | 'beta'
  | 'gamma'
  | 'delta'
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'engineering'
  | 'design'
  | 'marketing'
  | 'board'
  | 'timeline'
  | 'calendar';

export const ProjectManagementStory: StoryObj<typeof NavigationList> = {
  name: 'Project Management',
  render: () => {
    const [active, setActive] = useState<ProjectSection>('beta');
    const sel = (id: ProjectSection) => active === id;

    return (
      <Flex gap="l" direction="vertical">
        <Text size={5} weight="bold" block>
          Project Management
        </Text>
        <NavigationList>
          <NavigationList.Header>
            <Flex align="center" gap="s">
              <Avatar firstName="Altrone" lastName="UI" size="s" />
              <Flex
                direction="vertical"
                gap="xs"
                style={{ flex: 1, minWidth: 0 }}
              >
                <Text size={3} weight="bold" block>
                  Altrone Workspace
                </Text>
                <Text size={2} color="muted" block>
                  Free plan · 4 members
                </Text>
              </Flex>
              <Button
                icon={<Settings />}
                showLabel={false}
                label="Settings"
                size="s"
              />
            </Flex>
          </NavigationList.Header>

          <NavigationList.Group>
            <NavigationList.Link
              icon={<Home />}
              label="Home"
              selected={sel('home')}
              onClick={() => setActive('home')}
            />
            <NavigationList.Link
              icon={<Inbox />}
              label="Inbox"
              selected={sel('inbox')}
              onClick={() => setActive('inbox')}
              badge="5"
            />
            <NavigationList.Link
              icon={<CheckCircle2 />}
              label="My Issues"
              selected={sel('my-issues')}
              onClick={() => setActive('my-issues')}
              badge="12"
            />
          </NavigationList.Group>

          <NavigationList.Group title="Projects">
            <NavigationList.GroupAction label="New project" icon={<Plus />} />
            <Dropdown
              content={
                <Dropdown.Menu>
                  <Dropdown.Action label="Sort by name" />
                  <Dropdown.Action label="Sort by activity" />
                  <Dropdown.Action label="Hide archived" />
                </Dropdown.Menu>
              }
            >
              <NavigationList.GroupAction
                label="Options"
                icon={<MoreHorizontal />}
              />
            </Dropdown>

            <NavigationList.Link
              icon={<Hash />}
              label="Alpha"
              selected={sel('alpha')}
              onClick={() => setActive('alpha')}
            />
            <NavigationList.Link
              icon={<Hash />}
              label="Beta — Redesign"
              selected={sel('beta')}
              onClick={() => setActive('beta')}
              badge="3"
            >
              <LinkAction label="Open in new tab" icon={<Globe />} />
              <LinkAction label="Archive project" icon={<Archive />} />
            </NavigationList.Link>
            <NavigationList.Link
              icon={<Hash />}
              label="Gamma"
              selected={sel('gamma')}
              onClick={() => setActive('gamma')}
            />
            <NavigationList.Link
              icon={<Hash />}
              label="Delta"
              selected={sel('delta')}
              onClick={() => setActive('delta')}
              disabled
            />
          </NavigationList.Group>

          <NavigationList.Group title="Teams">
            <NavigationList.GroupAction label="Add team" icon={<Plus />} />
            <NavigationList.Link
              icon={<Users />}
              label="Engineering"
              selected={sel('engineering')}
              onClick={() => setActive('engineering')}
              badge="8"
            >
              <NavigationList.Link
                label="Frontend"
                selected={sel('frontend')}
                onClick={() => setActive('frontend')}
              />
              <NavigationList.Link
                label="Backend"
                selected={sel('backend')}
                onClick={() => setActive('backend')}
              />
              <NavigationList.Link
                label="DevOps"
                selected={sel('devops')}
                onClick={() => setActive('devops')}
                badge="2"
              />
            </NavigationList.Link>
            <NavigationList.Link
              icon={<Layers />}
              label="Design"
              selected={sel('design')}
              onClick={() => setActive('design')}
            />
            <NavigationList.Link
              icon={<BarChart2 />}
              label="Marketing"
              selected={sel('marketing')}
              onClick={() => setActive('marketing')}
            />
          </NavigationList.Group>

          <NavigationList.Group title="Views">
            <NavigationList.Link
              icon={<LayoutDashboard />}
              label="Board"
              selected={sel('board')}
              onClick={() => setActive('board')}
            />
            <NavigationList.Link
              icon={<GitBranch />}
              label="Timeline"
              selected={sel('timeline')}
              onClick={() => setActive('timeline')}
            />
            <NavigationList.Link
              icon={<Calendar />}
              label="Calendar"
              selected={sel('calendar')}
              onClick={() => setActive('calendar')}
            />
          </NavigationList.Group>

          <NavigationList.Footer>
            <Flex align="center" gap="s">
              <Avatar firstName="Alex" lastName="Chen" size="s" />
              <Flex
                direction="vertical"
                gap="xs"
                style={{ flex: 1, minWidth: 0 }}
              >
                <Text size={3} block truncate>
                  Alex Chen
                </Text>
                <Text size={2} color="muted" block>
                  alex@altrone.dev
                </Text>
              </Flex>
              <Button
                icon={<Settings />}
                showLabel={false}
                label="Profile settings"
                size="s"
              />
            </Flex>
          </NavigationList.Footer>
        </NavigationList>
      </Flex>
    );
  },
};

// ─── Story: Code Repository (GitHub-style) ────────────────────────────────────

type RepoSection =
  | 'code'
  | 'branches'
  | 'tags'
  | 'issues-all'
  | 'issues-open'
  | 'issues-closed'
  | 'labels'
  | 'pr-all'
  | 'pr-draft'
  | 'pr-review'
  | 'runs'
  | 'workflows'
  | 'artifacts'
  | 'general'
  | 'branches-settings'
  | 'access'
  | 'webhooks';

export const CodeRepositoryStory: StoryObj<typeof NavigationList> = {
  name: 'Code Repository',
  render: () => {
    const [active, setActive] = useState<RepoSection>('pr-review');
    const sel = (id: RepoSection) => active === id;

    return (
      <Flex gap="l" direction="vertical">
        <Text size={5} weight="bold" block>
          Code Repository
        </Text>
        <NavigationList>
          <NavigationList.Header>
            <Flex direction="vertical" gap="xs">
              <Flex align="center" gap="s">
                <Label color="blue" variant="soft" size="s">
                  public
                </Label>
                <Text size={2} color="muted" block>
                  altrone / altrone-ui
                </Text>
              </Flex>
              <Flex align="center" gap="s" style={{ marginTop: 2 }}>
                <Star size={14} />
                <Text size={2} block>
                  842 stars
                </Text>
                <GitBranch size={14} style={{ marginLeft: 8 }} />
                <Text size={2} block>
                  main
                </Text>
              </Flex>
            </Flex>
          </NavigationList.Header>

          <NavigationList.Group title="Code">
            <NavigationList.Link
              icon={<FolderOpen />}
              label="Files"
              selected={sel('code')}
              onClick={() => setActive('code')}
            >
              <LinkAction label="Clone repository" icon={<Globe />} />
            </NavigationList.Link>
            <NavigationList.Link
              icon={<GitBranch />}
              label="Branches"
              selected={sel('branches')}
              onClick={() => setActive('branches')}
              badge="3"
            >
              <LinkAction label="New branch" icon={<Plus />} />
            </NavigationList.Link>
            <NavigationList.Link
              icon={<Tag />}
              label="Tags"
              selected={sel('tags')}
              onClick={() => setActive('tags')}
              badge="12"
            />
          </NavigationList.Group>

          <NavigationList.Group title="Issues">
            <NavigationList.GroupAction label="New issue" icon={<Plus />} />
            <Dropdown
              content={
                <Dropdown.Menu>
                  <Dropdown.Action label="Filter by assignee" />
                  <Dropdown.Action label="Filter by label" />
                  <Dropdown.Action label="Filter by milestone" />
                </Dropdown.Menu>
              }
            >
              <NavigationList.GroupAction label="Filter" icon={<Search />} />
            </Dropdown>

            <NavigationList.Link
              icon={<Circle />}
              label="All issues"
              selected={sel('issues-all')}
              onClick={() => setActive('issues-all')}
              badge="47"
            />
            <NavigationList.Link
              icon={<Bug />}
              label="Open"
              selected={sel('issues-open')}
              onClick={() => setActive('issues-open')}
              badge="31"
            />
            <NavigationList.Link
              icon={<CheckCircle2 />}
              label="Closed"
              selected={sel('issues-closed')}
              onClick={() => setActive('issues-closed')}
              badge="16"
            />
            <NavigationList.Link
              icon={<Tag />}
              label="Labels"
              selected={sel('labels')}
              onClick={() => setActive('labels')}
            />
          </NavigationList.Group>

          <NavigationList.Group title="Pull Requests">
            <NavigationList.Link
              icon={<GitPullRequest />}
              label="All PRs"
              selected={sel('pr-all')}
              onClick={() => setActive('pr-all')}
              badge="4"
            />
            <NavigationList.Link
              icon={<Pencil />}
              label="Draft"
              selected={sel('pr-draft')}
              onClick={() => setActive('pr-draft')}
              badge="1"
            />
            <NavigationList.Link
              icon={<Zap />}
              label="Review requested"
              selected={sel('pr-review')}
              onClick={() => setActive('pr-review')}
              badge="2"
            >
              <LinkAction label="Approve all" icon={<CheckCircle2 />} />
            </NavigationList.Link>
          </NavigationList.Group>

          <NavigationList.Group title="Actions">
            <NavigationList.Link
              icon={<Play />}
              label="Workflows"
              selected={sel('workflows')}
              onClick={() => setActive('workflows')}
            />
            <NavigationList.Link
              icon={<Zap />}
              label="Runs"
              selected={sel('runs')}
              onClick={() => setActive('runs')}
            >
              <Label color="danger" variant="soft" size="s">
                2 failed
              </Label>
            </NavigationList.Link>
            <NavigationList.Link
              icon={<Archive />}
              label="Artifacts"
              selected={sel('artifacts')}
              onClick={() => setActive('artifacts')}
              badge="8"
            />
          </NavigationList.Group>

          <NavigationList.Group title="Settings">
            <NavigationList.Link
              icon={<Settings />}
              label="General"
              selected={sel('general')}
              onClick={() => setActive('general')}
            />
            <NavigationList.Link
              icon={<GitBranch />}
              label="Branches"
              selected={sel('branches-settings')}
              onClick={() => setActive('branches-settings')}
            />
            <NavigationList.Link
              icon={<Users />}
              label="Collaborators"
              selected={sel('access')}
              onClick={() => setActive('access')}
              badge="4"
            />
            <NavigationList.Link
              icon={<Webhook />}
              label="Webhooks"
              selected={sel('webhooks')}
              onClick={() => setActive('webhooks')}
            />
          </NavigationList.Group>

          <NavigationList.Footer>
            <Flex
              align="center"
              gap="s"
              style={{ justifyContent: 'space-between' }}
            >
              <Flex align="center" gap="xs">
                <Terminal size={14} />
                <Text size={2} color="muted" block>
                  v3.14.2 · MIT License
                </Text>
              </Flex>
              <Button size="s" label="Clone" icon={<Code />} />
            </Flex>
          </NavigationList.Footer>
        </NavigationList>
      </Flex>
    );
  },
};

// ─── Story: E-commerce Admin ─────────────────────────────────────────────────

type ShopSection =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'inventory'
  | 'collections'
  | 'orders-all'
  | 'orders-new'
  | 'orders-processing'
  | 'orders-shipped'
  | 'orders-returns'
  | 'customers'
  | 'segments'
  | 'reviews'
  | 'discounts'
  | 'campaigns'
  | 'email'
  | 'payments'
  | 'shipping'
  | 'taxes'
  | 'domains'
  | 'integrations'
  | 'team';

export const EcommerceAdminStory: StoryObj<typeof NavigationList> = {
  name: 'E-commerce Admin',
  render: () => {
    const [active, setActive] = useState<ShopSection>('orders-new');
    const sel = (id: ShopSection) => active === id;

    return (
      <Flex gap="l" direction="vertical">
        <Text size={5} weight="bold" block>
          E-commerce Admin
        </Text>
        <NavigationList>
          <NavigationList.Header>
            <Flex direction="vertical" gap="s">
              <Flex align="center" gap="s">
                <Avatar firstName="Nova" lastName="Shop" size="s" />
                <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
                  <Text size={3} weight="bold" block>
                    Nova Shop
                  </Text>
                  <Flex align="center" gap="xs">
                    <Label color="teal" variant="soft" size="s">
                      Pro
                    </Label>
                    <Text size={2} color="muted" block>
                      nova-shop.com
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </NavigationList.Header>

          <NavigationList.Group>
            <NavigationList.Link
              icon={<LayoutDashboard />}
              label="Dashboard"
              selected={sel('dashboard')}
              onClick={() => setActive('dashboard')}
            />
          </NavigationList.Group>

          <NavigationList.Group title="Catalog">
            <NavigationList.GroupAction label="Add product" icon={<Plus />} />
            <NavigationList.Link
              icon={<ShoppingBag />}
              label="Products"
              selected={sel('products')}
              onClick={() => setActive('products')}
              badge="1 240"
            >
              <LinkAction label="Import via CSV" icon={<Package />} />
              <LinkAction label="Bulk edit" icon={<Pencil />} />
            </NavigationList.Link>
            <NavigationList.Link
              icon={<Layers />}
              label="Categories"
              selected={sel('categories')}
              onClick={() => setActive('categories')}
              badge="18"
            />
            <NavigationList.Link
              icon={<Package />}
              label="Inventory"
              selected={sel('inventory')}
              onClick={() => setActive('inventory')}
            />
            <NavigationList.Link
              icon={<Star />}
              label="Collections"
              selected={sel('collections')}
              onClick={() => setActive('collections')}
              badge="6"
            />
          </NavigationList.Group>

          <NavigationList.Group title="Orders">
            <NavigationList.GroupAction label="Export" icon={<Archive />} />
            <NavigationList.Link
              icon={<ShoppingCart />}
              label="All orders"
              selected={sel('orders-all')}
              onClick={() => setActive('orders-all')}
              badge="384"
            />
            <NavigationList.Link
              icon={<Zap />}
              label="New"
              selected={sel('orders-new')}
              onClick={() => setActive('orders-new')}
              badge="12"
            >
              <LinkAction label="Process all" icon={<CheckCircle2 />} />
            </NavigationList.Link>
            <NavigationList.Link
              icon={<Clock />}
              label="Processing"
              selected={sel('orders-processing')}
              onClick={() => setActive('orders-processing')}
              badge="28"
            />
            <NavigationList.Link
              icon={<Truck />}
              label="Shipped"
              selected={sel('orders-shipped')}
              onClick={() => setActive('orders-shipped')}
              badge="93"
            />
            <NavigationList.Link
              icon={<Trash />}
              label="Returns"
              selected={sel('orders-returns')}
              onClick={() => setActive('orders-returns')}
              badge="7"
            />
          </NavigationList.Group>

          <NavigationList.Group title="Customers">
            <NavigationList.GroupAction label="Add segment" icon={<Plus />} />
            <NavigationList.Link
              icon={<Users />}
              label="All customers"
              selected={sel('customers')}
              onClick={() => setActive('customers')}
              badge="5 831"
            />
            <NavigationList.Link
              icon={<Tag />}
              label="Segments"
              selected={sel('segments')}
              onClick={() => setActive('segments')}
              badge="9"
            />
            <NavigationList.Link
              icon={<MessageSquare />}
              label="Reviews"
              selected={sel('reviews')}
              onClick={() => setActive('reviews')}
              badge="24"
            />
          </NavigationList.Group>

          <NavigationList.Group title="Marketing">
            <NavigationList.Link
              icon={<Zap />}
              label="Discounts"
              selected={sel('discounts')}
              onClick={() => setActive('discounts')}
              badge="3 active"
            />
            <NavigationList.Link
              icon={<BarChart2 />}
              label="Campaigns"
              selected={sel('campaigns')}
              onClick={() => setActive('campaigns')}
            />
            <NavigationList.Link
              icon={<Bell />}
              label="Email"
              selected={sel('email')}
              onClick={() => setActive('email')}
              badge="2"
            />
          </NavigationList.Group>

          <NavigationList.Group title="Settings">
            <NavigationList.Link
              icon={<CreditCard />}
              label="Payments"
              selected={sel('payments')}
              onClick={() => setActive('payments')}
            />
            <NavigationList.Link
              icon={<Truck />}
              label="Shipping"
              selected={sel('shipping')}
              onClick={() => setActive('shipping')}
            />
            <NavigationList.Link
              icon={<Globe />}
              label="Domains"
              selected={sel('domains')}
              onClick={() => setActive('domains')}
            />
            <NavigationList.Link
              icon={<Webhook />}
              label="Integrations"
              selected={sel('integrations')}
              onClick={() => setActive('integrations')}
              badge="7"
            />
            <NavigationList.Link
              icon={<Users />}
              label="Team"
              selected={sel('team')}
              onClick={() => setActive('team')}
              badge="6"
            />
          </NavigationList.Group>

          <NavigationList.Footer>
            <Flex
              align="center"
              gap="s"
              style={{ justifyContent: 'space-between' }}
            >
              <Flex direction="vertical" gap="xs">
                <Text size={2} color="muted" block>
                  Monthly revenue
                </Text>
                <Text size={3} weight="bold" block>
                  $24 810
                </Text>
              </Flex>
              <Label color="teal" variant="soft">
                ↑ 12%
              </Label>
            </Flex>
          </NavigationList.Footer>
        </NavigationList>
      </Flex>
    );
  },
};
