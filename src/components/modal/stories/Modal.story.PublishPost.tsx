import { StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Button,
  Flex,
  Form,
  Radio,
  Select,
  Switcher,
  Text,
} from 'components';
import { Modal } from '../Modal.tsx';
import { Send, Globe, Lock, Users, Bell, Check } from 'lucide-react';

type Visibility = 'public' | 'unlisted' | 'members';

const VISIBILITY: { value: Visibility; label: string; hint: string }[] = [
  { value: 'public', label: 'Public', hint: 'Anyone can find and read it' },
  { value: 'unlisted', label: 'Unlisted', hint: 'Only people with the link' },
  { value: 'members', label: 'Members only', hint: 'Signed-in subscribers' },
];

const COLLECTIONS = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design notes' },
  { value: 'changelog', label: 'Changelog' },
  { value: 'essays', label: 'Long-form essays' },
];

const VisibilityIcon = ({ value }: { value: Visibility }) => {
  if (value === 'public') return <Globe size={14} />;
  if (value === 'unlisted') return <Lock size={14} />;
  return <Users size={14} />;
};

export const PublishPostStory: StoryObj<typeof Modal> = {
  name: 'Publish flow — async actions & validation',
  render: () => {
    const [published, setPublished] = useState<{
      visibility: Visibility;
      collection: string;
      notified: boolean;
    } | null>(null);

    const [visibility, setVisibility] = useState<Visibility>('public');
    const [collection, setCollection] = useState('');
    const [notify, setNotify] = useState(true);
    const [error, setError] = useState('');
    const [publishing, setPublishing] = useState(false);

    const reset = () => {
      setVisibility('public');
      setCollection('');
      setNotify(true);
      setError('');
      setPublishing(false);
    };

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 560 }}>
        <Flex direction="vertical" gap="xs">
          <Text block size={7} weight="bold">
            The Concentric Blog
          </Text>
          <Text block size={4} color="muted">
            Draft: “Designing radius tokens that never drift”
          </Text>
        </Flex>

        {published ? (
          <Flex
            direction="horizontal"
            gap="s"
            align="center"
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-l)',
              background: 'var(--success-background-1)',
              color: 'var(--success-text-1)',
            }}
          >
            <Check size={16} />
            <Text size={4}>
              Published as{' '}
              <Text weight="bold">{published.visibility}</Text> in{' '}
              <Text weight="bold">
                {COLLECTIONS.find((c) => c.value === published.collection)?.label}
              </Text>
              {published.notified ? ' · subscribers notified' : ''}
            </Text>
          </Flex>
        ) : (
          <Text block size={4} color="muted">
            Nothing published yet. Open the dialog to ship this draft.
          </Text>
        )}

        <Modal
          title="Publish article"
          size="m"
          onClose={reset}
          content={
            <Form>
              {error && (
                <Text block size={3} style={{ color: 'var(--danger-text-1)' }}>
                  {error}
                </Text>
              )}

              <Form.Field label="Who can see it">
                <Radio
                  value={visibility}
                  name="publish-visibility"
                  onChange={(v) => setVisibility(v as Visibility)}
                >
                  {VISIBILITY.map((option) => (
                    <Radio.Item key={option.value} value={option.value}>
                      <Flex direction="horizontal" gap="xs" align="center">
                        <VisibilityIcon value={option.value} />
                        <Text size={4}>{option.label}</Text>
                        <Text size={3} color="muted">
                          — {option.hint}
                        </Text>
                      </Flex>
                    </Radio.Item>
                  ))}
                </Radio>
              </Form.Field>

              <Form.Field label="Collection">
                <Select
                  value={collection}
                  placeholder="Pick a collection…"
                  options={COLLECTIONS}
                  onChange={(v) => {
                    setCollection(v as string);
                    setError('');
                  }}
                />
              </Form.Field>

              <Form.Field>
                <Switcher checked={notify} onChange={(v) => setNotify(v)}>
                  <Flex direction="horizontal" gap="xs" align="center">
                    <Bell size={14} />
                    <Text size={4}>Email subscribers</Text>
                  </Flex>
                </Switcher>
              </Form.Field>
            </Form>
          }
          actions={({ closeModal }) => (
            <Button
              label={publishing ? 'Publishing…' : 'Publish now'}
              variant="submit"
              state={publishing ? 'loading' : 'idle'}
              icon={<Send size={14} />}
              onClick={async () => {
                if (!collection) {
                  setError('Choose a collection before publishing.');
                  return;
                }

                setPublishing(true);
                await new Promise((resolve) => setTimeout(resolve, 1200));
                setPublishing(false);
                setPublished({ visibility, collection, notified: notify });
                closeModal();
              }}
            />
          )}
        >
          <Button label="Publish…" icon={<Send size={14} />} />
        </Modal>
      </Flex>
    );
  },
};
