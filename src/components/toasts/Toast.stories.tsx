import { Meta, StoryObj } from '@storybook/react';
import { Avatar, Button, CloseButton, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { useState, type ReactNode } from 'react';
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  Download,
  GitBranch,
  GitPullRequest,
  ImageIcon,
  Mail,
  MessageCircle,
  RefreshCw,
  Rocket,
  Shield,
  Trash2,
  Upload,
  UserPlus,
  X,
  Zap,
} from 'lucide-react';
import { Toast } from './Toast.tsx';
import { useToast } from './Toast.context';
import type { ToastItemPosition, ToastVariant } from './Toast.types';

const story: Meta<typeof Toast> = {
  title: 'Components/Display/Toast',
  component: Toast,
  decorators: [StorybookDecorator],
};

// ─── Toast messages story ─────────────────────────────────────────────────────

export const ToastMessagesStory: StoryObj<typeof Flex> = {
  name: 'Toast messages',
  render: () => {
    const { toast } = useToast();
    const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

    const variants: {
      variant: ToastVariant;
      label: string;
      message: string;
    }[] = [
      {
        variant: 'default',
        label: 'Default',
        message: '3 items moved to archive.',
      },
      {
        variant: 'success',
        label: 'Success',
        message: 'File uploaded successfully.',
      },
      {
        variant: 'warning',
        label: 'Warning',
        message: 'Unsaved changes will be lost.',
      },
      {
        variant: 'danger',
        label: 'Danger',
        message: 'Failed to connect. Check your network.',
      },
    ];

    return (
      <Flex direction="vertical" gap="xl" style={{ maxWidth: 560 }}>
        <Flex direction="vertical" gap="s">
          <Text size={5} weight="bold" block>
            Toast messages
          </Text>
          <Text color="muted" block>
            Simple pill-shaped messages, ideal for quick feedback. Appear at the
            top or bottom centre of the screen.
          </Text>
        </Flex>

        {/* Position toggle */}
        <Flex direction="horizontal" gap="m" align="center">
          <Text size={3} color="muted">
            Position:
          </Text>
          {(['top', 'bottom'] as const).map((pos) => (
            <Button
              key={pos}
              label={pos}
              size="s"
              onClick={() => setPosition(pos)}
            />
          ))}
          <Text size={3} weight="medium">
            {position}
          </Text>
        </Flex>

        {/* Variants */}
        <Flex direction="vertical" gap="m">
          <Text size={4} weight="bold" block>
            Variants
          </Text>
          <Flex direction="horizontal" gap="m" wrap>
            {variants.map(({ variant, label, message }) => (
              <Button
                key={variant}
                size="s"
                label={label}
                onClick={() => toast(message, { variant, position })}
              />
            ))}
          </Flex>
        </Flex>

        {/* With action */}
        <Flex direction="vertical" gap="m">
          <Text size={4} weight="bold" block>
            With action button
          </Text>
          <Flex direction="horizontal" gap="m" wrap>
            <Button
              size="s"
              label="Delete file"
              onClick={() =>
                toast('Report.pdf deleted.', {
                  variant: 'danger',
                  position,
                  action: {
                    label: 'Undo',
                    onClick: () =>
                      toast('Deletion undone.', {
                        variant: 'success',
                        position,
                      }),
                  },
                })
              }
            />
            <Button
              size="s"
              label="Update available"
              onClick={() =>
                toast('A new version is ready to install.', {
                  position,
                  action: {
                    label: 'Install now',
                    onClick: () => toast('Installing update…', { position }),
                  },
                })
              }
            />
            <Button
              size="s"
              label="Upload complete"
              onClick={() =>
                toast('design-v3.fig uploaded to shared drive.', {
                  variant: 'success',
                  position,
                  icon: <Upload size={15} />,
                  action: {
                    label: 'View file',
                    onClick: () => {},
                  },
                })
              }
            />
          </Flex>
        </Flex>

        {/* Custom icon / no icon */}
        <Flex direction="vertical" gap="m">
          <Text size={4} weight="bold" block>
            Custom icon / no icon
          </Text>
          <Flex direction="horizontal" gap="m" wrap>
            <Button
              size="s"
              label="Custom icon"
              onClick={() =>
                toast('Pull request #142 merged.', {
                  position,
                  icon: <GitPullRequest size={15} />,
                })
              }
            />
            <Button
              size="s"
              label="No icon"
              onClick={() => toast('Settings saved.', { position, icon: null })}
            />
          </Flex>
        </Flex>

        {/* Auto-close off */}
        <Flex direction="vertical" gap="m">
          <Text size={4} weight="bold" block>
            Persistent (autoClose: false)
          </Text>
          <Flex direction="horizontal" gap="m">
            <Button
              size="s"
              label="Show persistent"
              onClick={() =>
                toast('Sync in progress — do not close the window.', {
                  position,
                  icon: <Download size={15} />,
                  autoClose: false,
                })
              }
            />
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

// ─── Notifications story ──────────────────────────────────────────────────────

const POSITIONS: { label: string; value: ToastItemPosition }[] = [
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top left', value: 'top-left' },
  { label: 'Top right', value: 'top-right' },
  { label: 'Bottom left', value: 'bottom-left' },
  { label: 'Bottom right', value: 'bottom-right' },
];

export const NotificationsStory: StoryObj<typeof Flex> = {
  name: 'Notifications',
  render: () => {
    const { notification } = useToast();
    const [position, setPosition] = useState<ToastItemPosition>('bottom-right');

    return (
      <Flex direction="vertical" gap="xl" style={{ maxWidth: 580 }}>
        <Flex direction="vertical" gap="s">
          <Text size={5} weight="bold" block>
            Notifications
          </Text>
          <Text color="muted" block>
            Rich notification cards with optional title, image, icon, and action
            buttons. Can be placed at any corner or at the centre top / bottom.
          </Text>
        </Flex>

        {/* Position selector */}
        <Flex direction="vertical" gap="s">
          <Text size={3} color="muted">
            Position:
          </Text>
          <Flex direction="horizontal" gap="m" wrap>
            {POSITIONS.map((p) => (
              <Button
                key={p.value}
                size="s"
                label={p.label}
                onClick={() => setPosition(p.value)}
              />
            ))}
            <Text size={3} weight="medium" style={{ alignSelf: 'center' }}>
              {position}
            </Text>
          </Flex>
        </Flex>

        {/* Basic */}
        <Flex direction="vertical" gap="m">
          <Text size={4} weight="bold" block>
            Basic
          </Text>
          <Flex direction="horizontal" gap="m" wrap>
            <Button
              size="s"
              label="Content only"
              onClick={() =>
                notification({
                  content: 'Your session will expire in 5 minutes.',
                  position,
                })
              }
            />
            <Button
              size="s"
              label="With title"
              onClick={() =>
                notification({
                  title: 'Session expiring',
                  content:
                    'Your session will expire in 5 minutes. Save your work.',
                  position,
                })
              }
            />
          </Flex>
        </Flex>

        {/* With icon */}
        <Flex direction="vertical" gap="m">
          <Text size={4} weight="bold" block>
            With icon
          </Text>
          <Flex direction="horizontal" gap="m" wrap>
            <Button
              size="s"
              label="New message"
              onClick={() =>
                notification({
                  title: 'New message from Alex',
                  content: 'Hey, are you free for a quick call at 3 pm today?',
                  icon: <MessageCircle size={16} />,
                  position,
                })
              }
            />
            <Button
              size="s"
              label="PR review"
              onClick={() =>
                notification({
                  title: 'Review requested',
                  content:
                    'Petra Park requested your review on PR #142 — Remove lodash.',
                  icon: <GitPullRequest size={16} />,
                  position,
                  duration: 8000,
                })
              }
            />
            <Button
              size="s"
              label="New email"
              onClick={() =>
                notification({
                  title: 'Unread emails',
                  content: 'You have 3 unread messages in your inbox.',
                  icon: <Mail size={16} />,
                  position,
                })
              }
            />
          </Flex>
        </Flex>

        {/* With actions */}
        <Flex direction="vertical" gap="m">
          <Text size={4} weight="bold" block>
            With action buttons
          </Text>
          <Flex direction="horizontal" gap="m" wrap>
            <Button
              size="s"
              label="Confirm delete"
              onClick={() =>
                notification({
                  title: 'Delete project?',
                  content:
                    'This will permanently remove Nebula Platform and all its data. This action cannot be undone.',
                  icon: <Trash2 size={16} />,
                  position,
                  autoClose: false,
                  actions: [
                    {
                      label: 'Cancel',
                      onClick: () => {},
                    },
                    {
                      label: 'Delete',
                      danger: true,
                      onClick: () =>
                        notification({
                          content: 'Project deleted.',
                          position,
                        }),
                    },
                  ],
                })
              }
            />
            <Button
              size="s"
              label="Software update"
              onClick={() =>
                notification({
                  title: 'Update available — v3.1.0',
                  content:
                    'Bug fixes, performance improvements, and new components.',
                  icon: <Bell size={16} />,
                  position,
                  actions: [
                    {
                      label: 'Later',
                      onClick: () => {},
                    },
                    {
                      label: 'Install now',
                      onClick: () =>
                        notification({
                          content: 'Installing v3.1.0…',
                          position,
                        }),
                    },
                  ],
                })
              }
            />
          </Flex>
        </Flex>

        {/* With image */}
        <Flex direction="vertical" gap="m">
          <Text size={4} weight="bold" block>
            With header image
          </Text>
          <Flex direction="horizontal" gap="m" wrap>
            <Button
              size="s"
              label="Photo uploaded"
              onClick={() =>
                notification({
                  title: 'Photo ready',
                  content:
                    'Your export has been processed and is ready to download.',
                  image:
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80',
                  icon: <ImageIcon size={16} />,
                  position,
                  actions: [
                    {
                      label: 'Download',
                      onClick: () => {},
                    },
                  ],
                })
              }
            />
          </Flex>
        </Flex>

        {/* Persistent */}
        <Flex direction="vertical" gap="m">
          <Text size={4} weight="bold" block>
            Persistent (autoClose: false)
          </Text>
          <Flex direction="horizontal" gap="m">
            <Button
              size="s"
              label="Show persistent"
              onClick={() =>
                notification({
                  title: 'Background sync',
                  content: 'Syncing your workspace. This may take a moment.',
                  icon: <Download size={16} />,
                  position,
                  autoClose: false,
                })
              }
            />
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

// ─── App demo story ───────────────────────────────────────────────────────────

type InboxItemType = 'message' | 'review' | 'task' | 'system' | 'alert';

interface InboxItem {
  id: number;
  type: InboxItemType;
  author?: { firstName: string; lastName: string };
  title: string;
  preview: string;
  time: string;
  read: boolean;
}

const INITIAL_INBOX: InboxItem[] = [
  {
    id: 1,
    type: 'message',
    author: { firstName: 'Maya', lastName: 'Reed' },
    title: 'Maya Reed mentioned you',
    preview:
      '@you can you double-check the OAuth redirect URI? Something looks off in staging.',
    time: '2m ago',
    read: false,
  },
  {
    id: 2,
    type: 'review',
    author: { firstName: 'Petra', lastName: 'Park' },
    title: 'PR #142 — Remove lodash',
    preview: 'Petra Park requested your review. 4 files changed, +312 −890.',
    time: '18m ago',
    read: false,
  },
  {
    id: 3,
    type: 'system',
    author: undefined,
    title: 'Staging deployed — v3.2.1',
    preview:
      'Build succeeded in 2m 14s. 0 errors, 2 warnings. Branch: feat/billing.',
    time: '34m ago',
    read: false,
  },
  {
    id: 4,
    type: 'task',
    author: { firstName: 'Alex', lastName: 'Kim' },
    title: 'Task completed by Alex Kim',
    preview: '"Migrate auth service to OAuth 2.0" marked as done.',
    time: '1h ago',
    read: true,
  },
  {
    id: 5,
    type: 'alert',
    author: undefined,
    title: 'High memory usage — prod-worker-3',
    preview:
      'Worker pod reached 87% memory. Consider scaling or investigating leaks.',
    time: '2h ago',
    read: true,
  },
  {
    id: 6,
    type: 'message',
    author: { firstName: 'Dan', lastName: 'Sousa' },
    title: 'Dan Sousa replied to you',
    preview:
      'Pushed a fix — the pooling config was using the wrong max_connections value.',
    time: '3h ago',
    read: true,
  },
  {
    id: 7,
    type: 'review',
    author: { firstName: 'Maya', lastName: 'Reed' },
    title: 'PR #138 — Onboarding flow',
    preview: 'Maya Reed approved your pull request. Ready to merge.',
    time: '5h ago',
    read: true,
  },
];

const TYPE_ICONS: Record<InboxItemType, ReactNode> = {
  message: <MessageCircle size={14} />,
  review: <GitPullRequest size={14} />,
  task: <CheckCircle2 size={14} />,
  system: <Rocket size={14} />,
  alert: <AlertTriangle size={14} />,
};

const TYPE_COLORS: Record<InboxItemType, string> = {
  message: 'var(--accent-9)',
  review: 'var(--purple-9)',
  task: 'var(--teal-9)',
  system: 'var(--blue-9)',
  alert: 'var(--amber-9)',
};

type TabFilter = 'all' | 'messages' | 'reviews' | 'system';

const TAB_FILTERS: Record<TabFilter, (item: InboxItem) => boolean> = {
  all: () => true,
  messages: (item) => item.type === 'message',
  reviews: (item) => item.type === 'review',
  system: (item) => item.type === 'system' || item.type === 'alert',
};

export const AppDemoStory: StoryObj<typeof Flex> = {
  name: 'App demo — Inbox & events',
  render: () => {
    const { toast, notification } = useToast();
    const [items, setItems] = useState<InboxItem[]>(INITIAL_INBOX);
    const [tab, setTab] = useState<TabFilter>('all');

    const unread = items.filter((i) => !i.read).length;
    const visible = items.filter(TAB_FILTERS[tab]);

    const markRead = (id: number) =>
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, read: true } : i)),
      );

    const removeItem = (id: number, label: string) => {
      setItems((prev) => prev.filter((i) => i.id !== id));
      const removedItem = items.find((i) => i.id === id);
      toast(`"${label}" dismissed.`, {
        variant: 'default',
        position: 'bottom',
        action: {
          label: 'Undo',
          onClick: () => {
            if (removedItem) {
              setItems((prev) => {
                const idx = INITIAL_INBOX.findIndex((i) => i.id === id);
                const next = [...prev];
                next.splice(idx, 0, removedItem);
                return next;
              });
              toast('Item restored.', {
                variant: 'success',
                position: 'bottom',
              });
            }
          },
        },
      });
    };

    const archiveAll = () => {
      const count = items.filter((i) => !i.read).length;
      if (count === 0) {
        toast('Nothing to archive — all caught up.', {
          variant: 'default',
          position: 'bottom',
          icon: <Check size={15} />,
        });
        return;
      }
      const snapshot = [...items];
      setItems([]);
      toast(`${count} item${count !== 1 ? 's' : ''} archived.`, {
        position: 'bottom',
        action: {
          label: 'Undo',
          onClick: () => {
            setItems(snapshot);
            toast('Inbox restored.', {
              variant: 'success',
              position: 'bottom',
            });
          },
        },
      });
    };

    return (
      <Flex
        direction="horizontal"
        gap="xl"
        style={{ maxWidth: 900, minHeight: 600 }}
      >
        {/* ── Left: Inbox ─────────────────────────────────────────── */}
        <Flex direction="vertical" gap="l" style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <Flex direction="horizontal" align="center" gap="m">
            <Flex direction="vertical" gap="xxs" style={{ flex: 1 }}>
              <Flex direction="horizontal" align="center" gap="s">
                <Text size={6} weight="bold">
                  Inbox
                </Text>
                {unread > 0 && (
                  <span
                    style={{
                      background: 'var(--accent-9)',
                      color: 'var(--white)',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '1px 7px',
                      lineHeight: '18px',
                    }}
                  >
                    {unread}
                  </span>
                )}
              </Flex>
              <Text size={3} color="muted">
                Nebula Platform
              </Text>
            </Flex>
            <Button size="s" label="Archive all" onClick={archiveAll} />
          </Flex>

          {/* Filter tabs */}
          <Flex
            direction="horizontal"
            gap="s"
            style={{
              borderBottom: '1px solid var(--border-1)',
              paddingBottom: 8,
            }}
          >
            {(
              [
                { key: 'all', label: 'All' },
                { key: 'messages', label: 'Messages' },
                { key: 'reviews', label: 'Reviews' },
                { key: 'system', label: 'System' },
              ] as { key: TabFilter; label: string }[]
            ).map(({ key, label }) => (
              <Button key={key} onClick={() => setTab(key)} label={label} />
            ))}
          </Flex>

          {/* Item list */}
          <Flex direction="vertical" gap="s">
            {visible.length === 0 && (
              <Flex
                direction="vertical"
                align="center"
                gap="s"
                style={{ padding: '40px 0' }}
              >
                <CheckCircle2 size={32} color="var(--text-3)" />
                <Text color="muted" size={3}>
                  All caught up
                </Text>
              </Flex>
            )}

            {visible.map((item) => (
              <div
                key={item.id}
                onClick={() => markRead(item.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 14,
                  border: `1px solid ${item.read ? 'var(--border-1)' : 'var(--accent-5)'}`,
                  background: item.read
                    ? 'var(--background-2)'
                    : 'var(--accent-2)',
                  cursor: 'default',
                  transition: 'border-color 0.15s',
                }}
              >
                <Flex direction="horizontal" gap="m" align="flex-start">
                  {/* Avatar or icon */}
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    {item.author ? (
                      <Avatar
                        size="s"
                        firstName={item.author.firstName}
                        lastName={item.author.lastName}
                      />
                    ) : (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: 'var(--interactive-a2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: TYPE_COLORS[item.type],
                        }}
                      >
                        {TYPE_ICONS[item.type]}
                      </div>
                    )}
                  </div>

                  <Flex
                    direction="vertical"
                    gap="xxs"
                    style={{ flex: 1, minWidth: 0 }}
                  >
                    <Flex direction="horizontal" align="center" gap="s">
                      <Text
                        size={3}
                        weight={item.read ? 'regular' : 'bold'}
                        truncate
                        style={{ flex: 1 }}
                      >
                        {item.title}
                      </Text>
                      {!item.read && (
                        <div
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: 'var(--accent-9)',
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <Text size={2} color="muted" style={{ flexShrink: 0 }}>
                        {item.time}
                      </Text>
                    </Flex>
                    <Text size={3} color="muted" truncate>
                      {item.preview}
                    </Text>

                    {/* Actions */}
                    <Flex
                      direction="horizontal"
                      gap="s"
                      style={{ marginTop: 6 }}
                    >
                      {item.type === 'message' && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            markRead(item.id);
                            toast('Reply sent.', {
                              variant: 'success',
                              position: 'bottom',
                              icon: <Mail size={15} />,
                            });
                          }}
                          label="Reply"
                        />
                      )}
                      {item.type === 'review' && (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              markRead(item.id);
                              toast('PR approved.', {
                                variant: 'success',
                                position: 'bottom',
                                icon: <Check size={15} />,
                              });
                            }}
                            label="Review"
                          />
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              markRead(item.id);
                              toast('Review submitted — changes requested.', {
                                variant: 'warning',
                                position: 'bottom',
                              });
                            }}
                            label="Request changes"
                          />
                        </>
                      )}
                      {item.type === 'alert' && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            markRead(item.id);
                            toast('Acknowledged. Monitoring continued.', {
                              variant: 'warning',
                              position: 'bottom',
                            });
                          }}
                          label="Acknowledge"
                        />
                      )}
                      <CloseButton
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id, item.title);
                        }}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </div>
            ))}
          </Flex>
        </Flex>

        {/* ── Right: Event simulator ─────────────────────────────── */}
        <Flex
          direction="vertical"
          gap="l"
          style={{
            width: 260,
            flexShrink: 0,
            borderLeft: '1px solid var(--border-1)',
            paddingLeft: 24,
          }}
        >
          <Flex direction="vertical" gap="xxs">
            <Text size={4} weight="bold">
              Simulate events
            </Text>
            <Text size={3} color="muted">
              Trigger incoming notifications
            </Text>
          </Flex>

          {/* People events */}
          <Flex direction="vertical" gap="s">
            <Text
              size={2}
              color="muted"
              weight="bold"
              style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              People
            </Text>
            <Button
              size="s"
              label="New direct message"
              onClick={() =>
                notification({
                  title: 'Alex Kim',
                  content:
                    'Can you jump on a quick call? Need to walk through the billing flow.',
                  icon: <MessageCircle size={16} />,
                  position: 'top-right',
                  actions: [
                    {
                      label: 'Reply',
                      onClick: () =>
                        toast('Reply sent.', {
                          variant: 'success',
                          position: 'bottom',
                        }),
                    },
                  ],
                })
              }
            />
            <Button
              size="s"
              label="Team invite"
              onClick={() =>
                notification({
                  title: 'You have been invited',
                  content:
                    'Maya Reed invited you to join the Design team in Nebula Platform.',
                  icon: <UserPlus size={16} />,
                  position: 'top-right',
                  autoClose: false,
                  actions: [
                    {
                      label: 'Decline',
                      danger: true,
                      onClick: () =>
                        toast('Invite declined.', {
                          variant: 'warning',
                          position: 'bottom',
                        }),
                    },
                    {
                      label: 'Accept',
                      onClick: () =>
                        toast('Welcome to the Design team!', {
                          variant: 'success',
                          position: 'bottom',
                        }),
                    },
                  ],
                })
              }
            />
            <Button
              size="s"
              label="PR review request"
              onClick={() =>
                notification({
                  title: 'Review requested',
                  content:
                    'Petra Park needs your review on PR #148 — Add dark mode tokens.',
                  icon: <GitPullRequest size={16} />,
                  position: 'top-right',
                  actions: [
                    {
                      label: 'Open PR',
                      onClick: () =>
                        toast('Opening in browser…', { position: 'bottom' }),
                    },
                  ],
                })
              }
            />
            <Button
              size="s"
              label="Mention in thread"
              onClick={() =>
                notification({
                  title: 'Dan Sousa mentioned you',
                  content:
                    '@you take a look at the connection pooling thread, left a summary.',
                  icon: <Bell size={16} />,
                  position: 'top-right',
                })
              }
            />
          </Flex>

          {/* System events */}
          <Flex direction="vertical" gap="s">
            <Text
              size={2}
              color="muted"
              weight="bold"
              style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              System
            </Text>
            <Button
              size="s"
              label="Deploy succeeded"
              onClick={() =>
                notification({
                  title: 'Production deployed',
                  content: 'v3.2.2 is live. Build time 1m 58s, 0 errors.',
                  image:
                    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=70',
                  icon: <Rocket size={16} />,
                  position: 'bottom-right',
                  actions: [{ label: 'View logs', onClick: () => {} }],
                })
              }
            />
            <Button
              size="s"
              label="Build failed"
              onClick={() =>
                notification({
                  title: 'Build failed — feat/billing',
                  content:
                    'TypeScript error in src/billing/stripe.ts:142. Push a fix to retry.',
                  icon: <GitBranch size={16} />,
                  position: 'bottom-right',
                  autoClose: false,
                  actions: [
                    {
                      label: 'View error',
                      onClick: () =>
                        toast('Opening build log…', { position: 'bottom' }),
                    },
                  ],
                })
              }
            />
            <Button
              size="s"
              label="Sync complete"
              onClick={() =>
                toast('Workspace synced — all changes saved.', {
                  variant: 'success',
                  position: 'bottom',
                  icon: <RefreshCw size={15} />,
                })
              }
            />
            <Button
              size="s"
              label="API rate limit"
              onClick={() =>
                toast('GitHub API rate limit reached. Retry in 58 seconds.', {
                  variant: 'warning',
                  position: 'bottom',
                  action: {
                    label: 'Retry now',
                    onClick: () =>
                      toast('Retrying…', {
                        position: 'bottom',
                        icon: <RefreshCw size={15} />,
                      }),
                  },
                })
              }
            />
            <Button
              size="s"
              label="Critical error"
              onClick={() =>
                toast('Payment webhook failed — transaction not recorded.', {
                  variant: 'danger',
                  position: 'bottom',
                  autoClose: false,
                  action: {
                    label: 'Investigate',
                    onClick: () => {},
                  },
                })
              }
            />
          </Flex>

          {/* Security */}
          <Flex direction="vertical" gap="s">
            <Text
              size={2}
              color="muted"
              weight="bold"
              style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              Security
            </Text>
            <Button
              size="s"
              label="New login detected"
              onClick={() =>
                notification({
                  title: 'New sign-in from Berlin, DE',
                  content:
                    'Chrome on macOS · April 1, 2026 at 14:32. Not you? Secure your account.',
                  icon: <Shield size={16} />,
                  position: 'top-left',
                  autoClose: false,
                  actions: [
                    {
                      label: "That's me",
                      onClick: () =>
                        toast('Login confirmed.', {
                          variant: 'success',
                          position: 'bottom',
                        }),
                    },
                    {
                      label: 'Secure account',
                      danger: true,
                      onClick: () =>
                        toast('Sending account recovery email…', {
                          variant: 'warning',
                          position: 'bottom',
                        }),
                    },
                  ],
                })
              }
            />
            <Button
              size="s"
              label="Dependency CVE"
              onClick={() =>
                notification({
                  title: 'Critical vulnerability detected',
                  content:
                    'CVE-2025-1337 in lodash@4.17.20. Update to ≥4.17.22 immediately.',
                  icon: <AlertTriangle size={16} />,
                  position: 'top-left',
                  autoClose: false,
                  actions: [
                    {
                      label: 'Update now',
                      onClick: () =>
                        toast('Running npm update…', {
                          variant: 'warning',
                          position: 'bottom',
                          icon: <Zap size={15} />,
                        }),
                    },
                  ],
                })
              }
            />
          </Flex>

          {/* Files */}
          <Flex direction="vertical" gap="s">
            <Text
              size={2}
              color="muted"
              weight="bold"
              style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              Files
            </Text>
            <Button
              size="s"
              label="Export ready"
              onClick={() =>
                notification({
                  title: 'Export complete',
                  content: 'dashboard-report-Q2.pdf is ready — 4.2 MB.',
                  image:
                    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=640&q=70',
                  icon: <Download size={16} />,
                  position: 'bottom-right',
                  actions: [
                    {
                      label: 'Download',
                      onClick: () =>
                        toast('Downloading…', {
                          position: 'bottom',
                          icon: <Download size={15} />,
                        }),
                    },
                  ],
                })
              }
            />
            <Button
              size="s"
              label="Large upload complete"
              onClick={() =>
                toast('design-system-v3.fig uploaded — 248 MB.', {
                  variant: 'success',
                  position: 'bottom',
                  icon: <Upload size={15} />,
                  action: {
                    label: 'View file',
                    onClick: () => {},
                  },
                })
              }
            />
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export default story;
