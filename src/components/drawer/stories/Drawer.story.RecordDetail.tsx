import { StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Form,
  Select,
  Text,
  Textarea,
  TextInput,
} from 'components';
import { Drawer } from '../Drawer.tsx';

type Role = 'designer' | 'engineer' | 'pm';

type Member = {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
  note: string;
};

const ROLES: { value: Role; label: string }[] = [
  { value: 'designer', label: 'Designer' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'pm', label: 'Product manager' },
];

const roleLabel = (role: Role) =>
  ROLES.find((item) => item.value === role)?.label ?? role;

const INITIAL: Member[] = [
  { id: 1, firstName: 'Mara', lastName: 'Ilić', role: 'designer', note: 'Owns the design system.' },
  { id: 2, firstName: 'Devon', lastName: 'Okafor', role: 'engineer', note: 'On the rendering pipeline.' },
  { id: 3, firstName: 'Sasha', lastName: 'Petrova', role: 'pm', note: 'Runs the roadmap reviews.' },
  { id: 4, firstName: 'Ken', lastName: 'Alvarez', role: 'engineer', note: '' },
];

const MemberRow = ({
  member,
  onSave,
}: {
  member: Member;
  onSave: (next: Member) => void;
}) => {
  const [firstName, setFirstName] = useState(member.firstName);
  const [lastName, setLastName] = useState(member.lastName);
  const [role, setRole] = useState<Role>(member.role);
  const [note, setNote] = useState(member.note);
  const [error, setError] = useState('');

  const reset = () => {
    setFirstName(member.firstName);
    setLastName(member.lastName);
    setRole(member.role);
    setNote(member.note);
    setError('');
  };

  const handleDone = async () => {
    if (!firstName.trim()) {
      setError('First name is required.');
      return false;
    }
    setError('');
    await new Promise((resolve) => setTimeout(resolve, 900));
    onSave({
      ...member,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role,
      note: note.trim(),
    });
    return true;
  };

  return (
    <Drawer
      title="Edit member"
      placement="end"
      width={420}
      onDone={handleDone}
      onClose={reset}
      content={
        <Flex direction="vertical" gap="l">
          <Flex direction="horizontal" gap="m" align="center">
            <Avatar
              firstName={firstName || member.firstName}
              lastName={lastName}
              size="l"
            />
            <Flex direction="vertical" gap="xs">
              <Text block size={5} weight="bold">
                {firstName} {lastName}
              </Text>
              <Text block size={3} color="muted">
                {roleLabel(role)}
              </Text>
            </Flex>
          </Flex>

          <Divider />

          <Form>
            {error && (
              <Text block size={3} color="danger">
                {error}
              </Text>
            )}
            <Form.Field label="First name">
              <TextInput
                value={firstName}
                onChange={(value) => setFirstName(value)}
              />
            </Form.Field>
            <Form.Field label="Last name">
              <TextInput
                value={lastName}
                onChange={(value) => setLastName(value)}
              />
            </Form.Field>
            <Form.Field label="Role">
              <Select
                options={ROLES}
                value={role}
                onChange={(value) => setRole(value as Role)}
              />
            </Form.Field>
            <Form.Field label="Note">
              <Textarea value={note} onChange={(value) => setNote(value)} />
            </Form.Field>
          </Form>
        </Flex>
      }
    >
      <Button
        variant="text"
        label={`${member.firstName} ${member.lastName} · ${roleLabel(member.role)}`}
      />
    </Drawer>
  );
};

export const RecordDetailStory: StoryObj<typeof Drawer> = {
  name: 'Record detail — async onDone & validation',
  render: () => {
    const [members, setMembers] = useState<Member[]>(INITIAL);

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 480 }}>
        <Flex direction="vertical" gap="xs">
          <Text block size={7} weight="bold">
            Team
          </Text>
          <Text block size={3} color="muted">
            Pick a member to edit. Save runs an async <Text code>onDone</Text>;
            an empty first name returns <Text code>false</Text> and the drawer
            stays open.
          </Text>
        </Flex>

        <Flex direction="vertical" gap="xs" align="start">
          {members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              onSave={(next) =>
                setMembers((prev) =>
                  prev.map((item) => (item.id === next.id ? next : item)),
                )
              }
            />
          ))}
        </Flex>
      </Flex>
    );
  },
};
