import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Bell,
  Cookie,
  Download,
  GitPullRequest,
  ImageIcon,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { Button, Flex, Select, Switcher, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Toast } from './Toast';
import { useToast } from './Toast.context';
import type { ToastPlacement, ToastVariant } from './Toast.types';

const story: Meta<typeof Toast> = {
  title: 'Components/Display/Notifications',
  component: Toast,
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

const Section = ({ children }: { children: string }) => (
  <Text block size={6} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 660, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const VARIANTS: ToastVariant[] = ['default', 'success', 'warning', 'danger'];

const LONG_TEXT =
  'This message is intentionally long, to check that the card wraps its text, keeps the close button reachable, and holds its max width without shoving the action button off-screen.';

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof Toast> = {
  name: 'Overview',
  render: () => {
    const { toast, notification } = useToast();

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Text block size={9} weight="bold">
          Toast
        </Text>
        <Paragraph>
          One imperative notification system with two display modes. Call{' '}
          <Text code>useToast()</Text> for <Text code>toast()</Text> — a brief,
          pill-shaped message — and <Text code>notification()</Text> — a rich
          card with an optional title, image, icon and action buttons. Both
          return an <Text code>id</Text> you can pass to <Text code>dismiss()</Text>.
        </Paragraph>
        <Paragraph>
          Both modes render on a <Text code>Box</Text> with{' '}
          <Text code>material=&quot;plate&quot;</Text> and{' '}
          <Text code>elevation=&quot;toast&quot;</Text>, so the surface, radius
          and shadow match the rest of the library. Entrance and exit are a{' '}
          <Text code>motion</Text> spring — there is no third-party toast
          dependency. Auto-close pauses while the pointer is over a card and
          resumes on leave.
        </Paragraph>
        <Paragraph>
          <Text code>AltroneApplication</Text> already mounts the provider, so in
          an app you only ever call the hook. Placement is set once, globally —
          see the <Text weight="medium">Placement</Text> story.
        </Paragraph>

        <Flex direction="horizontal" gap="s" wrap>
          <Button
            size="s"
            label="Show a toast"
            onClick={() =>
              toast('Changes saved.', { variant: 'success' })
            }
          />
          <Button
            size="s"
            label="Show a notification"
            onClick={() =>
              notification({
                title: 'New message from Alex',
                content: 'Are you free for a quick call at 3 pm today?',
                icon: <MessageCircle size={16} />,
                actions: [{ label: 'Reply', onClick: () => {} }],
              })
            }
          />
        </Flex>
      </Flex>
    );
  },
};

// ─── Toast messages ──────────────────────────────────────────────────────────

export const ToastMessages: StoryObj<typeof Toast> = {
  name: 'Toast messages',
  render: () => {
    const { toast } = useToast();

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Section>Toast messages</Section>
        <Paragraph>
          A toast confirms that something happened — a file saved, an item
          archived, a request sent. It is short, non-blocking, and disappears on
          its own after <Text code>duration</Text> (4 s by default). Keep the
          message to one line; if the user must decide something, use a
          notification instead.
        </Paragraph>

        <Text block size={4} weight="bold">
          Variants
        </Text>
        <Paragraph>
          Four variants, each with its own default icon. The icon sits in a
          tinted circular chip; <Text code>default</Text> is neutral,{' '}
          <Text code>success</Text> / <Text code>warning</Text> /{' '}
          <Text code>danger</Text> pick up the matching status colour.
        </Paragraph>
        <Flex direction="horizontal" gap="s" wrap>
          {VARIANTS.map((variant) => (
            <Button
              key={variant}
              size="s"
              label={variant}
              onClick={() =>
                toast(
                  {
                    default: '3 items moved to archive.',
                    success: 'File uploaded successfully.',
                    warning: 'Unsaved changes will be lost.',
                    danger: 'Failed to connect. Check your network.',
                  }[variant],
                  { variant },
                )
              }
            />
          ))}
        </Flex>

        <Text block size={4} weight="bold">
          Icon
        </Text>
        <Paragraph>
          Omit <Text code>icon</Text> for the variant default, pass a node to
          override it, or pass <Text code>null</Text> to drop it entirely.
        </Paragraph>
        <Flex direction="horizontal" gap="s" wrap>
          <Button
            size="s"
            label="Custom icon"
            onClick={() =>
              toast('Pull request #142 merged.', {
                icon: <GitPullRequest size={15} />,
              })
            }
          />
          <Button
            size="s"
            label="No icon"
            onClick={() => toast('Settings saved.', { icon: null })}
          />
        </Flex>

        <Text block size={4} weight="bold">
          Action
        </Text>
        <Paragraph>
          A single <Text code>action</Text> button lives inside the pill — most
          often an <Text weight="medium">Undo</Text>. Clicking it runs the
          callback and closes the toast.
        </Paragraph>
        <Flex direction="horizontal" gap="s" wrap>
          <Button
            size="s"
            label="Delete file"
            onClick={() =>
              toast('Report.pdf deleted.', {
                variant: 'danger',
                action: {
                  label: 'Undo',
                  onClick: () =>
                    toast('Deletion undone.', { variant: 'success' }),
                },
              })
            }
          />
          <Button
            size="s"
            label="Long message"
            onClick={() =>
              toast(LONG_TEXT, {
                action: { label: 'View', onClick: () => {} },
              })
            }
          />
        </Flex>

        <Text block size={4} weight="bold">
          Duration and persistence
        </Text>
        <Paragraph>
          Auto-close pauses while the pointer hovers the toast, so a short{' '}
          <Text code>duration</Text> is still readable. Set{' '}
          <Text code>autoClose: false</Text> for a toast that stays until the
          user (or <Text code>dismiss()</Text>) closes it — use this sparingly,
          for ongoing background work.
        </Paragraph>
        <Flex direction="horizontal" gap="s" wrap>
          <Button
            size="s"
            label="1 s — hover to hold"
            onClick={() =>
              toast('Hover me before I disappear.', { duration: 1000 })
            }
          />
          <Button
            size="s"
            label="Persistent"
            onClick={() =>
              toast('Sync in progress — do not close the window.', {
                icon: <Download size={15} />,
                autoClose: false,
              })
            }
          />
        </Flex>
      </Flex>
    );
  },
};

// ─── Notifications ───────────────────────────────────────────────────────────

export const Notifications: StoryObj<typeof Toast> = {
  name: 'Notifications',
  render: () => {
    const { notification } = useToast();

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Section>Notifications</Section>
        <Paragraph>
          A notification is a card for something the user may want to read or act
          on — an incoming message, a review request, a finished export, a
          security alert. <Text code>content</Text> is the only required option;{' '}
          <Text code>title</Text>, <Text code>icon</Text>, <Text code>image</Text>{' '}
          and <Text code>actions</Text> are each optional.
        </Paragraph>

        <Text block size={4} weight="bold">
          Content, title and icon
        </Text>
        <Paragraph>
          With just <Text code>content</Text> the card is a single paragraph.
          Add a <Text code>title</Text> for a headline and an{' '}
          <Text code>icon</Text> to signal the source at a glance.
        </Paragraph>
        <Flex direction="horizontal" gap="s" wrap>
          <Button
            size="s"
            label="Content only"
            onClick={() =>
              notification({
                content: 'Your session will expire in 5 minutes.',
              })
            }
          />
          <Button
            size="s"
            label="Title + icon"
            onClick={() =>
              notification({
                title: 'Review requested',
                content:
                  'Petra Park asked for your review on PR #142 — Remove lodash.',
                icon: <GitPullRequest size={16} />,
              })
            }
          />
        </Flex>

        <Text block size={4} weight="bold">
          Actions
        </Text>
        <Paragraph>
          Up to a few <Text code>actions</Text> render as buttons at the foot of
          the card; each runs its callback and then closes the card. Mark a
          destructive one with <Text code>danger</Text>. A card that asks a
          question should set <Text code>autoClose: false</Text> so it waits for
          an answer.
        </Paragraph>
        <Flex direction="horizontal" gap="s" wrap>
          <Button
            size="s"
            label="Confirm delete"
            onClick={() =>
              notification({
                title: 'Delete project?',
                content:
                  'This permanently removes Nebula Platform and all its data.',
                icon: <Trash2 size={16} />,
                autoClose: false,
                actions: [
                  { label: 'Cancel', onClick: () => {} },
                  {
                    label: 'Delete',
                    danger: true,
                    onClick: () =>
                      notification({ content: 'Project deleted.' }),
                  },
                ],
              })
            }
          />
          <Button
            size="s"
            label="Update available"
            onClick={() =>
              notification({
                title: 'Update available — v3.1.0',
                content:
                  'Bug fixes, performance improvements, and new components.',
                icon: <Bell size={16} />,
                actions: [
                  { label: 'Later', onClick: () => {} },
                  { label: 'Install', onClick: () => {} },
                ],
              })
            }
          />
        </Flex>

        <Text block size={4} weight="bold">
          Header image and long content
        </Text>
        <Paragraph>
          An <Text code>image</Text> renders full-bleed across the top of the
          card, clipped to its corners. Long <Text code>content</Text> wraps and
          the card grows to fit.
        </Paragraph>
        <Flex direction="horizontal" gap="s" wrap>
          <Button
            size="s"
            label="With image"
            onClick={() =>
              notification({
                title: 'Export ready',
                content: 'dashboard-report-Q2.pdf is ready — 4.2 MB.',
                image:
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80',
                icon: <ImageIcon size={16} />,
                actions: [{ label: 'Download', onClick: () => {} }],
              })
            }
          />
          <Button
            size="s"
            label="Long content"
            onClick={() =>
              notification({
                title: 'New sign-in from Berlin, DE',
                content: LONG_TEXT,
                icon: <ShieldCheck size={16} />,
                autoClose: false,
                actions: [
                  { label: "That's me", onClick: () => {} },
                  { label: 'Secure account', danger: true, onClick: () => {} },
                ],
              })
            }
          />
        </Flex>
      </Flex>
    );
  },
};

// ─── Placement ───────────────────────────────────────────────────────────────

const PLACEMENT_OPTIONS = [
  { label: 'start', value: 'start' },
  { label: 'end', value: 'end' },
];

const PlacementDemo = () => {
  const { toast, notification } = useToast();
  return (
    <Flex direction="horizontal" gap="s" wrap>
      <Button
        size="s"
        label="Toast"
        onClick={() => toast('Workspace synced.', { variant: 'success' })}
      />
      <Button
        size="s"
        label="Notification"
        onClick={() =>
          notification({
            title: 'Deploy succeeded',
            content: 'v3.2.2 is live. Build time 1 m 58 s.',
            icon: <RefreshCw size={16} />,
          })
        }
      />
    </Flex>
  );
};

export const Placement: StoryObj<typeof Toast> = {
  name: 'Placement',
  render: () => {
    const [toastPlacement, setToastPlacement] = useState<ToastPlacement>('end');
    const [notificationSide, setNotificationSide] =
      useState<ToastPlacement>('end');
    const [notificationPlacement, setNotificationPlacement] =
      useState<ToastPlacement>('end');

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Section>Placement</Section>
        <Paragraph>
          Placement is app-wide, not per call. Set it on{' '}
          <Text code>
            &lt;AltroneApplication toastPlacement notificationSide
            notificationPlacement&gt;
          </Text>{' '}
          (each also accepted directly on <Text code>&lt;Toast&gt;</Text>). Every
          value is logical — <Text code>&apos;start&apos;</Text> /{' '}
          <Text code>&apos;end&apos;</Text> — and resolves against the writing
          direction.
        </Paragraph>
        <Text size={4} list="marked" style={{ maxWidth: 660, lineHeight: 1.6 }}>
          <Text item>
            <Text code>toastPlacement</Text> — vertical edge of the toast stack:{' '}
            <Text code>start</Text> = top, <Text code>end</Text> = bottom. Toasts
            are always centred horizontally.
          </Text>
          <Text item>
            <Text code>notificationSide</Text> — horizontal edge of the
            notification stack: <Text code>start</Text> = left,{' '}
            <Text code>end</Text> = right.
          </Text>
          <Text item>
            <Text code>notificationPlacement</Text> — vertical edge of the
            notification stack.
          </Text>
        </Text>
        <Paragraph>
          There is exactly one toast stack and one notification stack; the props
          only move them. Newer cards stack toward the earlier ones from the
          chosen edge.
        </Paragraph>

        <Flex direction="horizontal" gap="l" wrap>
          <Flex direction="vertical" gap="xs" style={{ width: 200 }}>
            <Text size={3} weight="medium">
              toastPlacement
            </Text>
            <Select
              size="s"
              value={toastPlacement}
              options={PLACEMENT_OPTIONS}
              onChange={(value) =>
                setToastPlacement(value === 'start' ? 'start' : 'end')
              }
            />
          </Flex>
          <Flex direction="vertical" gap="xs" style={{ width: 200 }}>
            <Text size={3} weight="medium">
              notificationSide
            </Text>
            <Select
              size="s"
              value={notificationSide}
              options={PLACEMENT_OPTIONS}
              onChange={(value) =>
                setNotificationSide(value === 'start' ? 'start' : 'end')
              }
            />
          </Flex>
          <Flex direction="vertical" gap="xs" style={{ width: 200 }}>
            <Text size={3} weight="medium">
              notificationPlacement
            </Text>
            <Select
              size="s"
              value={notificationPlacement}
              options={PLACEMENT_OPTIONS}
              onChange={(value) =>
                setNotificationPlacement(value === 'start' ? 'start' : 'end')
              }
            />
          </Flex>
        </Flex>

        <Toast
          toastPlacement={toastPlacement}
          notificationSide={notificationSide}
          notificationPlacement={notificationPlacement}
        >
          <PlacementDemo />
        </Toast>
      </Flex>
    );
  },
};

// ─── Cookie consent ─────────────────────────────────────────────────────────

const CookiePreferencesForm = ({ onDone }: { onDone: () => void }) => {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <Flex direction="vertical" gap="m">
      <Flex direction="vertical" gap="s">
        <Switcher checked disabled>
          Strictly necessary — always on
        </Switcher>
        <Switcher
          checked={analytics}
          onChange={(checked) => setAnalytics(checked)}
        >
          Analytics
        </Switcher>
        <Switcher
          checked={marketing}
          onChange={(checked) => setMarketing(checked)}
        >
          Marketing
        </Switcher>
      </Flex>
      <Flex direction="horizontal" gap="s">
        <Button size="s" label="Cancel" onClick={onDone} />
        <Button
          size="s"
          label="Save choices"
          onClick={() => {
            toast(
              `Saved — analytics ${analytics ? 'on' : 'off'}, marketing ${
                marketing ? 'on' : 'off'
              }.`,
              { variant: 'success' },
            );
            onDone();
          }}
        />
      </Flex>
    </Flex>
  );
};

const CookieConsentDemo = () => {
  const { toast, notification, dismiss } = useToast();

  const openPreferences = () => {
    const id = notification({
      title: 'Cookie preferences',
      icon: <SlidersHorizontal size={16} />,
      autoClose: false,
      content: <CookiePreferencesForm onDone={() => dismiss(id)} />,
    });
  };

  const showBanner = () => {
    notification({
      title: 'We value your privacy',
      icon: <Cookie size={16} />,
      autoClose: false,
      content:
        'We use cookies to run the site, measure traffic, and personalise content. You can accept all, reject the non-essential ones, or choose per category.',
      actions: [
        {
          label: 'Reject non-essential',
          onClick: () => toast('Only essential cookies will be used.'),
        },
        { label: 'Manage', onClick: openPreferences },
        {
          label: 'Accept all',
          onClick: () =>
            toast('All cookies accepted.', { variant: 'success' }),
        },
      ],
    });
  };

  return (
    <Button size="s" label="Open the cookie banner" onClick={showBanner} />
  );
};

export const CookieConsent: StoryObj<typeof Toast> = {
  name: 'Cookie consent',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Cookie consent</Section>
      <Paragraph>
        A cookie banner is a persistent notification, not a toast: it must not
        auto-dismiss, it carries several actions, and closing it is a deliberate
        choice. It is <Text code>autoClose: false</Text>, uses{' '}
        <Text code>actions</Text> for the top-level choices, and — for the
        per-category screen — passes an interactive form as{' '}
        <Text code>content</Text>. Because <Text code>content</Text> is captured
        when <Text code>notification()</Text> is called, that form owns its state
        and dismisses its own card via the id returned from{' '}
        <Text code>notification()</Text>.
      </Paragraph>
      <Paragraph>
        Place it clear of the primary flow —{' '}
        <Text code>notificationSide=&quot;start&quot;</Text> with{' '}
        <Text code>notificationPlacement=&quot;end&quot;</Text> keeps it at the
        bottom-left, away from bottom-right call-to-action buttons. In a real app
        it is shown once, near the root, on the first visit; here a button stands
        in for that.
      </Paragraph>

      <Toast notificationSide="start" notificationPlacement="end">
        <CookieConsentDemo />
      </Toast>
    </Flex>
  ),
};
