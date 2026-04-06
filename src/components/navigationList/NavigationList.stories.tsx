import { Meta, StoryObj } from '@storybook/react';
import { Dropdown, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { NavigationList } from './NavigationList.tsx';
import { LinkAction } from './components';
import {
  Archive,
  BarChart2,
  Bell,
  BookOpen,
  Bug,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Code,
  CreditCard,
  Film,
  FolderOpen,
  GitBranch,
  GitPullRequest,
  Globe,
  Hash,
  Heart,
  Home,
  Inbox,
  LayoutDashboard,
  Layers,
  MessageSquare,
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
  Tv,
  Users,
  Webhook,
  Zap,
} from 'lucide-react';
import { Label } from 'components/label/Label.tsx';
import { Button } from 'components/button/Button.tsx';
import { useState } from 'react';
import { Avatar } from 'components/avatar';

const story: Meta<typeof NavigationList> = {
  title: 'Components/Navigation/NavigationList',
  component: NavigationList,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

// ─── Story 1: Project Management (Linear-style) ───────────────────────────────

type ProjectSection =
  | 'home' | 'inbox' | 'my-issues'
  | 'alpha' | 'beta' | 'gamma' | 'delta'
  | 'frontend' | 'backend' | 'devops' | 'engineering' | 'design' | 'marketing'
  | 'board' | 'timeline' | 'calendar';

export const ProjectManagementStory: StoryObj<typeof NavigationList> = {
  name: 'Project Management',
  render: () => {
    const [active, setActive] = useState<ProjectSection>('beta');
    const sel = (id: ProjectSection) => active === id;

    return (
      <Flex gap="l" direction="vertical">
        <Text size={5} weight="bold" block>Project Management</Text>
        <NavigationList>

          <NavigationList.Header>
            <Flex align="center" gap="s">
              <Avatar firstName="Altrone" lastName="UI" size="s" />
              <Flex direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
                <Text size={3} weight="bold" block>Altrone Workspace</Text>
                <Text size={2} color="secondary" block>Free plan · 4 members</Text>
              </Flex>
              <Button icon={<Settings />} showLabel={false} label="Settings" size="s" />
            </Flex>
          </NavigationList.Header>

          <NavigationList.Group>
            <NavigationList.Link icon={<Home />}  label="Home"    selected={sel('home')}   onClick={() => setActive('home')} />
            <NavigationList.Link icon={<Inbox />} label="Inbox"   selected={sel('inbox')}  onClick={() => setActive('inbox')}  badge="5" />
            <NavigationList.Link icon={<CheckCircle2 />} label="My Issues" selected={sel('my-issues')} onClick={() => setActive('my-issues')} badge="12" />
          </NavigationList.Group>

          <NavigationList.Group title="Projects">
            <NavigationList.GroupAction label="New project" icon={<Plus />} />
            <Dropdown content={<Dropdown.Menu>
              <Dropdown.Action label="Sort by name" />
              <Dropdown.Action label="Sort by activity" />
              <Dropdown.Action label="Hide archived" />
            </Dropdown.Menu>}>
              <NavigationList.GroupAction label="Options" icon={<LayoutDashboard />} />
            </Dropdown>

            <NavigationList.Link icon={<Hash />} label="Alpha" selected={sel('alpha')} onClick={() => setActive('alpha')} />
            <NavigationList.Link icon={<Hash />} label="Beta — Redesign" selected={sel('beta')} onClick={() => setActive('beta')} badge="3">
              <LinkAction label="Open in new tab" icon={<Globe />} />
              <LinkAction label="Archive project" icon={<Archive />} />
            </NavigationList.Link>
            <NavigationList.Link icon={<Hash />} label="Gamma" selected={sel('gamma')} onClick={() => setActive('gamma')} />
            <NavigationList.Link icon={<Hash />} label="Delta" selected={sel('delta')} onClick={() => setActive('delta')} disabled />
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
              <NavigationList.Link label="Frontend"  selected={sel('frontend')}  onClick={() => setActive('frontend')} />
              <NavigationList.Link label="Backend"   selected={sel('backend')}   onClick={() => setActive('backend')} />
              <NavigationList.Link label="DevOps"    selected={sel('devops')}    onClick={() => setActive('devops')} badge="2" />
            </NavigationList.Link>
            <NavigationList.Link icon={<Layers />}   label="Design"    selected={sel('design')}    onClick={() => setActive('design')} />
            <NavigationList.Link icon={<BarChart2 />} label="Marketing" selected={sel('marketing')} onClick={() => setActive('marketing')} />
          </NavigationList.Group>

          <NavigationList.Group title="Views">
            <NavigationList.Link icon={<LayoutDashboard />} label="Board"    selected={sel('board')}    onClick={() => setActive('board')} />
            <NavigationList.Link icon={<GitBranch />}        label="Timeline" selected={sel('timeline')} onClick={() => setActive('timeline')} />
            <NavigationList.Link icon={<Calendar />}         label="Calendar" selected={sel('calendar')} onClick={() => setActive('calendar')} />
          </NavigationList.Group>

          <NavigationList.Footer>
            <Flex align="center" gap="s">
              <Avatar firstName="Alex" lastName="Chen" size="s" />
              <Flex direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
                <Text size={3} block style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Alex Chen</Text>
                <Text size={2} color="secondary" block>alex@altrone.dev</Text>
              </Flex>
              <Button icon={<Settings />} showLabel={false} label="Profile settings" size="s" />
            </Flex>
          </NavigationList.Footer>

        </NavigationList>
      </Flex>
    );
  },
};

// ─── Story 2: Code Repository (GitHub-style) ─────────────────────────────────

type RepoSection =
  | 'code' | 'branches' | 'tags'
  | 'issues-all' | 'issues-open' | 'issues-closed' | 'labels'
  | 'pr-all' | 'pr-draft' | 'pr-review'
  | 'runs' | 'workflows' | 'artifacts'
  | 'general' | 'branches-settings' | 'access' | 'webhooks';

export const CodeRepositoryStory: StoryObj<typeof NavigationList> = {
  name: 'Code Repository',
  render: () => {
    const [active, setActive] = useState<RepoSection>('pr-review');
    const sel = (id: RepoSection) => active === id;

    return (
      <Flex gap="l" direction="vertical">
        <Text size={5} weight="bold" block>Code Repository</Text>
        <NavigationList>

          <NavigationList.Header>
            <Flex direction="vertical" gap="xs">
              <Flex align="center" gap="s">
                <Label color="blue" variant="soft" size="s">public</Label>
                <Text size={2} color="secondary" block>altrone / altrone-ui</Text>
              </Flex>
              <Flex align="center" gap="s" style={{ marginTop: 2 }}>
                <Star size={14} />
                <Text size={2} block>842 stars</Text>
                <GitBranch size={14} style={{ marginLeft: 8 }} />
                <Text size={2} block>main</Text>
              </Flex>
            </Flex>
          </NavigationList.Header>

          <NavigationList.Group title="Code">
            <NavigationList.Link icon={<FolderOpen />} label="Files" selected={sel('code')} onClick={() => setActive('code')}>
              <LinkAction label="Clone repository" icon={<Globe />} />
            </NavigationList.Link>
            <NavigationList.Link icon={<GitBranch />} label="Branches" selected={sel('branches')} onClick={() => setActive('branches')} badge="3">
              <LinkAction label="New branch" icon={<Plus />} />
            </NavigationList.Link>
            <NavigationList.Link icon={<Tag />} label="Tags" selected={sel('tags')} onClick={() => setActive('tags')} badge="12" />
          </NavigationList.Group>

          <NavigationList.Group title="Issues">
            <NavigationList.GroupAction label="New issue" icon={<Plus />} />
            <Dropdown content={<Dropdown.Menu>
              <Dropdown.Action label="Filter by assignee" />
              <Dropdown.Action label="Filter by label" />
              <Dropdown.Action label="Filter by milestone" />
            </Dropdown.Menu>}>
              <NavigationList.GroupAction label="Filter" icon={<Search />} />
            </Dropdown>

            <NavigationList.Link icon={<Circle />}       label="All issues"  selected={sel('issues-all')}    onClick={() => setActive('issues-all')}    badge="47" />
            <NavigationList.Link icon={<Bug />}          label="Open"        selected={sel('issues-open')}   onClick={() => setActive('issues-open')}   badge="31" />
            <NavigationList.Link icon={<CheckCircle2 />} label="Closed"      selected={sel('issues-closed')} onClick={() => setActive('issues-closed')} badge="16" />
            <NavigationList.Link icon={<Tag />}          label="Labels"      selected={sel('labels')}        onClick={() => setActive('labels')} />
          </NavigationList.Group>

          <NavigationList.Group title="Pull Requests">
            <NavigationList.Link icon={<GitPullRequest />} label="All PRs"          selected={sel('pr-all')}    onClick={() => setActive('pr-all')}    badge="4" />
            <NavigationList.Link icon={<Pencil />}         label="Draft"            selected={sel('pr-draft')}  onClick={() => setActive('pr-draft')}  badge="1" />
            <NavigationList.Link icon={<Zap />}            label="Review requested" selected={sel('pr-review')} onClick={() => setActive('pr-review')} badge="2">
              <LinkAction label="Approve all" icon={<CheckCircle2 />} />
            </NavigationList.Link>
          </NavigationList.Group>

          <NavigationList.Group title="Actions">
            <NavigationList.Link icon={<Play />}    label="Workflows" selected={sel('workflows')} onClick={() => setActive('workflows')} />
            <NavigationList.Link icon={<Zap />}     label="Runs"      selected={sel('runs')}      onClick={() => setActive('runs')}>
              <Label color="danger" variant="soft" size="s">2 failed</Label>
            </NavigationList.Link>
            <NavigationList.Link icon={<Archive />} label="Artifacts" selected={sel('artifacts')} onClick={() => setActive('artifacts')} badge="8" />
          </NavigationList.Group>

          <NavigationList.Group title="Settings">
            <NavigationList.Link icon={<Settings />} label="General"          selected={sel('general')}           onClick={() => setActive('general')} />
            <NavigationList.Link icon={<GitBranch />} label="Branches"        selected={sel('branches-settings')} onClick={() => setActive('branches-settings')} />
            <NavigationList.Link icon={<Users />}     label="Collaborators"   selected={sel('access')}            onClick={() => setActive('access')}  badge="4" />
            <NavigationList.Link icon={<Webhook />}   label="Webhooks"        selected={sel('webhooks')}          onClick={() => setActive('webhooks')} />
          </NavigationList.Group>

          <NavigationList.Footer>
            <Flex align="center" gap="s" style={{ justifyContent: 'space-between' }}>
              <Flex align="center" gap="xs">
                <Terminal size={14} />
                <Text size={2} color="secondary" block>v3.14.2 · MIT License</Text>
              </Flex>
              <Button size="s" label="Clone" icon={<Code />} />
            </Flex>
          </NavigationList.Footer>

        </NavigationList>
      </Flex>
    );
  },
};

// ─── Story 3: E-commerce Admin ────────────────────────────────────────────────

type ShopSection =
  | 'dashboard'
  | 'products' | 'categories' | 'inventory' | 'collections'
  | 'orders-all' | 'orders-new' | 'orders-processing' | 'orders-shipped' | 'orders-returns'
  | 'customers' | 'segments' | 'reviews'
  | 'discounts' | 'campaigns' | 'email'
  | 'payments' | 'shipping' | 'taxes' | 'domains' | 'integrations' | 'team';

export const EcommerceAdminStory: StoryObj<typeof NavigationList> = {
  name: 'E-commerce Admin',
  render: () => {
    const [active, setActive] = useState<ShopSection>('orders-new');
    const sel = (id: ShopSection) => active === id;

    return (
      <Flex gap="l" direction="vertical">
        <Text size={5} weight="bold" block>E-commerce Admin</Text>
        <NavigationList>

          <NavigationList.Header>
            <Flex direction="vertical" gap="s">
              <Flex align="center" gap="s">
                <Avatar firstName="Nova" lastName="Shop" size="s" />
                <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
                  <Text size={3} weight="bold" block>Nova Shop</Text>
                  <Flex align="center" gap="xs">
                    <Label color="teal" variant="soft" size="s">Pro</Label>
                    <Text size={2} color="secondary" block>nova-shop.com</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </NavigationList.Header>

          <NavigationList.Group>
            <NavigationList.Link icon={<LayoutDashboard />} label="Dashboard" selected={sel('dashboard')} onClick={() => setActive('dashboard')} />
          </NavigationList.Group>

          <NavigationList.Group title="Catalog">
            <NavigationList.GroupAction label="Add product" icon={<Plus />} />
            <NavigationList.Link icon={<ShoppingBag />} label="Products"    selected={sel('products')}    onClick={() => setActive('products')}    badge="1 240">
              <LinkAction label="Import via CSV" icon={<Package />} />
              <LinkAction label="Bulk edit"      icon={<Pencil />} />
            </NavigationList.Link>
            <NavigationList.Link icon={<Layers />}    label="Categories"  selected={sel('categories')}  onClick={() => setActive('categories')}  badge="18" />
            <NavigationList.Link icon={<Package />}   label="Inventory"   selected={sel('inventory')}   onClick={() => setActive('inventory')} />
            <NavigationList.Link icon={<Star />}      label="Collections" selected={sel('collections')} onClick={() => setActive('collections')} badge="6" />
          </NavigationList.Group>

          <NavigationList.Group title="Orders">
            <NavigationList.GroupAction label="Export" icon={<Archive />} />
            <NavigationList.Link icon={<ShoppingCart />} label="All orders"  selected={sel('orders-all')}        onClick={() => setActive('orders-all')}        badge="384" />
            <NavigationList.Link icon={<Zap />}          label="New"         selected={sel('orders-new')}        onClick={() => setActive('orders-new')}        badge="12">
              <LinkAction label="Process all" icon={<CheckCircle2 />} />
            </NavigationList.Link>
            <NavigationList.Link icon={<Clock />}        label="Processing"  selected={sel('orders-processing')} onClick={() => setActive('orders-processing')} badge="28" />
            <NavigationList.Link icon={<Truck />}        label="Shipped"     selected={sel('orders-shipped')}    onClick={() => setActive('orders-shipped')}    badge="93" />
            <NavigationList.Link icon={<Trash />}        label="Returns"     selected={sel('orders-returns')}    onClick={() => setActive('orders-returns')}    badge="7" />
          </NavigationList.Group>

          <NavigationList.Group title="Customers">
            <NavigationList.GroupAction label="Add segment" icon={<Plus />} />
            <NavigationList.Link icon={<Users />}        label="All customers" selected={sel('customers')}  onClick={() => setActive('customers')}  badge="5 831" />
            <NavigationList.Link icon={<Tag />}          label="Segments"      selected={sel('segments')}   onClick={() => setActive('segments')}   badge="9" />
            <NavigationList.Link icon={<MessageSquare />} label="Reviews"      selected={sel('reviews')}    onClick={() => setActive('reviews')}    badge="24" />
          </NavigationList.Group>

          <NavigationList.Group title="Marketing">
            <NavigationList.Link icon={<Zap />}       label="Discounts"  selected={sel('discounts')}  onClick={() => setActive('discounts')}  badge="3 active" />
            <NavigationList.Link icon={<BarChart2 />} label="Campaigns"  selected={sel('campaigns')}  onClick={() => setActive('campaigns')} />
            <NavigationList.Link icon={<Bell />}      label="Email"      selected={sel('email')}      onClick={() => setActive('email')}      badge="2" />
          </NavigationList.Group>

          <NavigationList.Group title="Settings">
            <NavigationList.Link icon={<CreditCard />} label="Payments"     selected={sel('payments')}     onClick={() => setActive('payments')} />
            <NavigationList.Link icon={<Truck />}      label="Shipping"     selected={sel('shipping')}     onClick={() => setActive('shipping')} />
            <NavigationList.Link icon={<Globe />}      label="Domains"      selected={sel('domains')}      onClick={() => setActive('domains')} />
            <NavigationList.Link icon={<Webhook />}    label="Integrations" selected={sel('integrations')} onClick={() => setActive('integrations')} badge="7" />
            <NavigationList.Link icon={<Users />}      label="Team"         selected={sel('team')}         onClick={() => setActive('team')} badge="6" />
          </NavigationList.Group>

          <NavigationList.Footer>
            <Flex align="center" gap="s" style={{ justifyContent: 'space-between' }}>
              <Flex direction="vertical" gap="xs">
                <Text size={2} color="secondary" block>Monthly revenue</Text>
                <Text size={3} weight="bold" block>$24 810</Text>
              </Flex>
              <Label color="teal" variant="soft">↑ 12%</Label>
            </Flex>
          </NavigationList.Footer>

        </NavigationList>
      </Flex>
    );
  },
};

export default story;
