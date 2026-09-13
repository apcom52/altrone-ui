import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Label,
  NavigationList,
  Screen,
  Text,
  Textarea,
  TextInput,
  Toolbar,
} from 'components';
import {
  Archive,
  Bell,
  ChevronLeft,
  FileText,
  Forward,
  Hash,
  Inbox,
  Paperclip,
  Reply,
  Send,
  Star,
  Trash2,
} from 'lucide-react';
import { screenMeta, useDemoSidebar } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Mail client',
};

export default meta;

type FolderId = 'inbox' | 'starred' | 'sent' | 'drafts' | 'work' | 'personal';

interface Mail {
  id: string;
  from: string;
  email: string;
  subject: string;
  excerpt: string;
  time: string;
  unread?: boolean;
  starred?: boolean;
  tag?: { text: string; color: 'blue' | 'teal' | 'purple' | 'amber' };
  body: string[];
}

const INBOX: Mail[] = [
  {
    id: 'design-review',
    from: 'Mira Anand',
    email: 'mira@altrone.dev',
    subject: 'Design review notes — Screen presets',
    excerpt:
      'Left comments on the sidebar collapse timing and the footer contrast. Nothing blocking, but the drawer easing feels a touch slow on mobile.',
    time: '9:41',
    unread: true,
    starred: true,
    tag: { text: 'Work', color: 'blue' },
    body: [
      'Went through the latest build this morning. Overall the presets hang together well — the Mail client and Dashboard now share the same header rhythm, which was the main thing I wanted to see.',
      'Two small things. The sidebar collapse feels a touch slow on mobile — somewhere around 180ms would read as crisp without losing the sense of the panel sliding. And the footer text is sitting right on the AA line against the tinted band; bumping it to the muted role one step darker would settle it.',
      'Neither is blocking. Happy to approve once the timing tweak lands.',
    ],
  },
  {
    id: 'q3-roadmap',
    from: 'Devon Park',
    email: 'devon@altrone.dev',
    subject: 'Re: Q3 roadmap',
    excerpt:
      'Agreed on dropping the density mode — size already covers it. Can we keep the container-query work in scope though? It unblocks the split view.',
    time: '8:12',
    unread: true,
    tag: { text: 'Work', color: 'blue' },
    body: [
      'Agreed on dropping the density mode. size already covers the cases we had, and a second axis of scaling would just be another thing to keep in sync.',
      'One ask: can we keep the container-query hook in scope for Q3? It is what unblocks the list/detail split view collapsing cleanly inside a Splitter panel, and that keeps coming up.',
    ],
  },
  {
    id: 'invoice',
    from: 'Altrone Billing',
    email: 'billing@altrone.dev',
    subject: 'Your invoice is ready',
    excerpt:
      'Invoice #2026-0914 for the Team plan is attached. No action needed — the card on file will be charged on the 14th.',
    time: 'Yesterday',
    tag: { text: 'Receipts', color: 'amber' },
    body: [
      'Invoice #2026-0914 for the Team plan (8 seats) is ready. The total is $192.00 and the card ending 4242 will be charged on 14 September.',
      'You can download a PDF copy or update your billing details from the account settings page at any time.',
    ],
  },
  {
    id: 'welcome',
    from: 'Priya Nair',
    email: 'priya@altrone.dev',
    subject: 'Welcome to the team!',
    excerpt:
      'So glad to have you on board. I dropped a few links below to get you started — the component playground is the fun one.',
    time: 'Mon',
    starred: true,
    tag: { text: 'Personal', color: 'purple' },
    body: [
      'Really glad to have you with us. Your laptop should arrive Tuesday; in the meantime everything you need runs in the browser.',
      'Start with the component playground — it is the quickest way to get a feel for how the library is put together. Ping me any time this week if something does not make sense.',
    ],
  },
  {
    id: 'lunch',
    from: 'Sam Okafor',
    email: 'sam@altrone.dev',
    subject: 'Lunch on Friday?',
    excerpt:
      'A few of us are heading to the ramen place at 12:30. Room for one more if you are around.',
    time: 'Mon',
    tag: { text: 'Personal', color: 'purple' },
    body: [
      'A few of us are walking over to the ramen place on Friday around 12:30. Come along if you are in the office — no need to confirm, just show up.',
    ],
  },
  {
    id: 'a11y-audit',
    from: 'Lena Fischer',
    email: 'lena@altrone.dev',
    subject: 'Accessibility audit — first pass',
    excerpt:
      'Keyboard traversal through the Screen zones is solid. Found one focus-return gap when the overlay sidebar closes via Escape.',
    time: 'Sun',
    tag: { text: 'Work', color: 'blue' },
    body: [
      'First pass through the Screen presets with a screen reader and keyboard only. The good news: zone traversal order is correct everywhere, and the landmark roles line up.',
      'One real bug: when the overlay sidebar closes with Escape, focus lands on the body instead of returning to the toggle that opened it. Clicking the scrim returns focus correctly, so it is just the key path.',
    ],
  },
];

const SENT: Mail[] = [
  {
    id: 'sent-roadmap',
    from: 'Devon Park',
    email: 'devon@altrone.dev',
    subject: 'Re: Q3 roadmap',
    excerpt:
      'Keeping the container-query hook in — it is a small surface and the split view depends on it.',
    time: '7:55',
    body: [
      'Keeping the container-query hook in scope. It is a small addition and the list/detail split view genuinely depends on it, so pulling it would just push the same work to Q4.',
    ],
  },
  {
    id: 'sent-thanks',
    from: 'Priya Nair',
    email: 'priya@altrone.dev',
    subject: 'Re: Welcome to the team!',
    excerpt:
      'Thank you! Poking at the playground now — the token stories are a great map of the system.',
    time: 'Mon',
    body: [
      'Thank you for the warm welcome. I have been going through the playground this afternoon and the Foundations stories are a great map of how everything fits together.',
    ],
  },
];

const DRAFTS: Mail[] = [
  {
    id: 'draft-notes',
    from: 'Me',
    email: 'you@altrone.dev',
    subject: 'Notes from the sync',
    excerpt:
      'Draft · three open questions on the elevation tokens before we can close the ticket…',
    time: 'Now',
    body: [
      'Three things still open on elevation before we close the ticket: the dark-theme shadow strength, whether toast gets its own shadow tier, and the tonal-elevation question for Box materials.',
    ],
  },
  {
    id: 'draft-reply',
    from: 'Me',
    email: 'you@altrone.dev',
    subject: 'Re: Lunch on Friday?',
    excerpt: 'Draft · Count me in, I will meet you by the…',
    time: 'Mon',
    body: ['Count me in. I will meet you by the lifts at 12:25.'],
  },
];

const FOLDERS: {
  id: FolderId;
  label: string;
  icon: ReactElement;
  badge?: number;
}[] = [
  { id: 'inbox', label: 'Inbox', icon: <Inbox />, badge: 2 },
  { id: 'starred', label: 'Starred', icon: <Star /> },
  { id: 'sent', label: 'Sent', icon: <Send /> },
  { id: 'drafts', label: 'Drafts', icon: <FileText />, badge: 2 },
];

const LABELS: { id: FolderId; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'personal', label: 'Personal' },
];

const mailsFor = (folder: FolderId): Mail[] => {
  switch (folder) {
    case 'inbox':
      return INBOX;
    case 'sent':
      return SENT;
    case 'drafts':
      return DRAFTS;
    case 'starred':
      return INBOX.filter((m) => m.starred);
    case 'work':
      return INBOX.filter((m) => m.tag?.text === 'Work');
    case 'personal':
      return INBOX.filter((m) => m.tag?.text === 'Personal');
  }
};

const folderLabel = (folder: FolderId): string =>
  [...FOLDERS, ...LABELS].find((f) => f.id === folder)?.label ?? 'Inbox';

const MailListItem = ({ mail, onOpen }: { mail: Mail; onOpen: () => void }) => (
  <Box
    shape="rounded"
    material={mail.unread ? 'glass' : 'plate'}
    tone={mail.unread ? 'accent' : 'neutral'}
    padding={{ x: 14, y: 12 }}
    pressable
    focusable
    role="button"
    tabIndex={0}
    radius="12px"
    onClick={onOpen}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
      }
    }}
    style={{ width: '100%', cursor: 'pointer' }}
  >
    <Flex gap="m" align="center" style={{ width: '100%', minWidth: 0 }}>
      <Avatar firstName={mail.from} size="m" />

      <Flex direction="vertical" gap="xxs" style={{ flex: 1, minWidth: 0 }}>
        <Flex align="center" gap="s" style={{ width: '100%', minWidth: 0 }}>
          <Text
            size={3}
            weight={mail.unread ? 'bold' : 'medium'}
            truncate
            block
            style={{ flex: 1, minWidth: 0 }}
          >
            {mail.from}
          </Text>
          <Text size={2} color="muted" nowrap>
            {mail.time}
          </Text>
        </Flex>

        <Flex align="center" gap="s" style={{ width: '100%', minWidth: 0 }}>
          {mail.tag ? (
            <Label size="mini" variant="soft" color={mail.tag.color}>
              {mail.tag.text}
            </Label>
          ) : null}
          <Text
            size={3}
            weight={mail.unread ? 'medium' : 'regular'}
            truncate
            block
            style={{ flex: 1, minWidth: 0 }}
          >
            {mail.subject}
          </Text>
        </Flex>

        <Text size={2} color="muted" truncate block>
          {mail.excerpt}
        </Text>
      </Flex>

      <Flex
        direction="vertical"
        align="center"
        justify="center"
        gap="xs"
        style={{ width: 16, flexShrink: 0, alignSelf: 'stretch' }}
      >
        {mail.starred ? <Star size={15} fill="currentColor" /> : null}
        {mail.unread ? (
          <Box size={8} shape="circle" material="solid" tone="accent" />
        ) : null}
      </Flex>
    </Flex>
  </Box>
);

const MailList = ({
  folder,
  onOpen,
}: {
  folder: FolderId;
  onOpen: (id: string) => void;
}) => {
  const mails = mailsFor(folder);

  return (
    <Flex direction="vertical" gap="m">
      <Flex align="center" gap="m">
        <Text size={6} weight="bold" block>
          {folderLabel(folder)}
        </Text>
        <Text size={3} color="muted">
          {mails.length} {mails.length === 1 ? 'message' : 'messages'}
        </Text>
      </Flex>
      {mails.length === 0 ? (
        <Text size={3} color="muted" block>
          Nothing here yet.
        </Text>
      ) : (
        <Flex direction="vertical" gap="s">
          {mails.map((mail) => (
            <MailListItem
              key={mail.id}
              mail={mail}
              onOpen={() => onOpen(mail.id)}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

const MailReader = ({
  mail,
  backLabel,
  onBack,
}: {
  mail: Mail;
  backLabel: string;
  onBack: () => void;
}) => (
  <Flex direction="vertical" gap="m">
    <Toolbar variant="grouped" size="s">
      <Toolbar.Group>
        <Toolbar.Action
          label={`Back to ${backLabel}`}
          icon={<ChevronLeft />}
          onClick={onBack}
        />
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Action label="Archive" icon={<Archive />} showLabel={false} />
        <Toolbar.Action
          label="Delete"
          icon={<Trash2 />}
          showLabel={false}
          danger
        />
      </Toolbar.Group>
    </Toolbar>

    <Text size={7} weight="bold" block>
      {mail.subject}
    </Text>

    <Box
      shape="rounded"
      material="plate"
      padding={{ x: 14, y: 12 }}
      style={{ width: '100%' }}
      radius="16px"
    >
      <Flex align="center" gap="m" style={{ width: '100%', minWidth: 0 }}>
        <Avatar firstName={mail.from} size="m" />
        <Flex direction="vertical" gap="xxs" style={{ flex: 1, minWidth: 0 }}>
          <Text size={3} weight="medium" truncate block>
            {mail.from}
          </Text>
          <Text size={2} color="muted" truncate block>
            {mail.email}
          </Text>
        </Flex>
        <Text size={2} color="muted" nowrap>
          {mail.time}
        </Text>
      </Flex>
    </Box>

    <Divider />

    <Flex direction="vertical" gap="m">
      {mail.body.map((paragraph, i) => (
        <Text key={i} size={4} block>
          {paragraph}
        </Text>
      ))}
    </Flex>

    <Divider />

    <Flex gap="s">
      <Button variant="submit" size="m" icon={<Reply />} label="Reply" />
      <Button variant="default" size="m" icon={<Forward />} label="Forward" />
    </Flex>
  </Flex>
);

const MailCompose = ({ onClose }: { onClose: () => void }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  return (
    <Flex direction="vertical" gap="m">
      <Text size={6} weight="bold" block>
        New message
      </Text>
      <TextInput
        placeholder="To"
        value={to}
        onChange={(value) => setTo(value)}
      />
      <TextInput
        placeholder="Subject"
        value={subject}
        onChange={(value) => setSubject(value)}
      />
      <Textarea
        placeholder="Write your message…"
        value={body}
        onChange={(value) => setBody(value)}
        style={{ minHeight: 220 }}
      />
      <Flex justify="between" align="center">
        <Flex gap="s">
          <Button variant="submit" icon={<Send />} label="Send" />
          <Button icon={<Paperclip />} showLabel={false} label="Attach file" />
        </Flex>
        <Button label="Discard" onClick={onClose} />
      </Flex>
    </Flex>
  );
};

/**
 * The classic desktop mail frame, driven by three pieces of state — the
 * current `folder`, the `openId` of the message being read, and whether the
 * `compose` view is up. `Screen.Content` swaps between the message list, a
 * reading pane, and a compose form without the layout shell re-rendering:
 * the `Screen.Header`, the folder `Screen.Sidebar`, and the status
 * `Screen.Footer` stay put across all three.
 *
 * Fill the header with a `Toolbar variant="solid" size="m"` — its frosted,
 * accent-tinted fill is the header surface. The reading pane's own back /
 * archive / delete bar uses `variant="grouped"` (glass pills, no strip
 * fill). The sidebar is a `NavigationList` whose `selected` link and
 * mailbox badges track the same `folder` state the content reads.
 */
export const MailClient: StoryObj<typeof Screen> = {
  name: 'Mail client',
  render: () => {
    const [folder, setFolder] = useState<FolderId>('inbox');
    const [openId, setOpenId] = useState<string | null>(null);
    const [composing, setComposing] = useState(false);
    const sidebar = useDemoSidebar('md');

    const openFolder = (next: FolderId) => {
      setFolder(next);
      setOpenId(null);
      setComposing(false);
    };

    const openMail = mailsFor(folder).find((m) => m.id === openId) ?? null;

    return (
      <Screen title="Mail">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            {sidebar.showToggle ? (
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction
                  collapsed={sidebar.collapsed}
                  onClick={sidebar.toggle}
                />
              </Toolbar.Group>
            ) : (
              <Toolbar.Logo>
                <img
                  src="https://help.apple.com/assets/6940590395B73B67500DF914/69405904627DAC39E4013406/en_US/610a7e660092193773855879a591dc48.png"
                  width={36}
                  height={36}
                />
              </Toolbar.Logo>
            )}
            <Toolbar.Title label="Mail" />
            <Toolbar.Separator />
            <Toolbar.Group>
              <Toolbar.Action
                label="Compose"
                onClick={() => {
                  setComposing(true);
                  setOpenId(null);
                }}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.SearchAction showLabel={false} />
              <Toolbar.Action
                label="Notifications"
                icon={<Bell />}
                showLabel={false}
              />
            </Toolbar.Group>

            <Toolbar.Group>
              <Avatar firstName="Ada" lastName="Lovelace" />
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>

        <Screen.Sidebar
          collapsed={sidebar.collapsed}
          onClose={sidebar.onClose}
        >
          <NavigationList>
            <NavigationList.Group title="Mailboxes">
              {FOLDERS.map((f) => (
                <NavigationList.Link
                  key={f.id}
                  href="#"
                  icon={f.icon}
                  label={f.label}
                  badge={f.badge}
                  selected={folder === f.id}
                  onClick={(event) => {
                    event.preventDefault();
                    openFolder(f.id);
                  }}
                />
              ))}
            </NavigationList.Group>
            <NavigationList.Group title="Labels">
              {LABELS.map((l) => (
                <NavigationList.Link
                  key={l.id}
                  href="#"
                  icon={<Hash />}
                  label={l.label}
                  selected={folder === l.id}
                  onClick={(event) => {
                    event.preventDefault();
                    openFolder(l.id);
                  }}
                />
              ))}
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>

        <Screen.Content>
          {composing ? (
            <MailCompose onClose={() => setComposing(false)} />
          ) : openMail ? (
            <MailReader
              mail={openMail}
              backLabel={folderLabel(folder)}
              onBack={() => setOpenId(null)}
            />
          ) : (
            <MailList folder={folder} onOpen={setOpenId} />
          )}
        </Screen.Content>

        <Screen.Footer>
          <Flex justify="between" align="center">
            <Text size={2} color="muted">
              Updated just now
            </Text>
            <Text size={2} color="muted">
              2 accounts · 4.1 GB of 15 GB used
            </Text>
          </Flex>
        </Screen.Footer>
      </Screen>
    );
  },
};
