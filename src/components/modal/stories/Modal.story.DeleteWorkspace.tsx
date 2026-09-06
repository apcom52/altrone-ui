import { StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Flex, Text, TextInput } from 'components';
import { Modal } from '../Modal.tsx';
import { Trash2, RotateCcw } from 'lucide-react';

const WORKSPACE = 'concentric-radius';

export const DeleteWorkspaceStory: StoryObj<typeof Modal> = {
  name: 'Destructive — type-to-confirm',
  render: () => {
    const [deleted, setDeleted] = useState(false);
    const [confirmText, setConfirmText] = useState('');

    const matches = confirmText.trim() === WORKSPACE;

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 520 }}>
        <Flex direction="vertical" gap="xs">
          <Text block size={7} weight="bold">
            Workspace settings
          </Text>
          <Text block size={4} color="muted">
            {deleted ? (
              <>
                Workspace <Text code>{WORKSPACE}</Text> is gone. This story reset
                would normally be a redirect.
              </>
            ) : (
              <>
                Danger zone for <Text code>{WORKSPACE}</Text> — 4 projects, 12
                members, 2.1&nbsp;GB of assets.
              </>
            )}
          </Text>
        </Flex>

        <Modal
          title="Delete this workspace?"
          size="s"
          onClose={() => setConfirmText('')}
          leftActions={[
            <Button label="Export data first" variant="text" icon={<RotateCcw size={14} />} />,
          ]}
          content={
            <Flex direction="vertical" gap="m">
              <Text block size={4}>
                Every project, integration, and uploaded asset is deleted
                immediately and permanently. There is no undo and no grace
                period.
              </Text>
              <Text block size={3} color="muted">
                Type <Text code>{WORKSPACE}</Text> to confirm.
              </Text>
              <TextInput
                value={confirmText}
                onChange={(value) => setConfirmText(value)}
                placeholder={WORKSPACE}
              />
            </Flex>
          }
          actions={({ closeModal }) => (
            <Button
              label="Delete workspace"
              variant="submit"
              danger
              disabled={!matches}
              icon={<Trash2 size={14} />}
              onClick={() => {
                setDeleted(true);
                setConfirmText('');
                closeModal();
              }}
            />
          )}
        >
          <Button label="Delete workspace" danger icon={<Trash2 size={14} />} />
        </Modal>

        {deleted && (
          <Button
            label="Recreate for the demo"
            variant="text"
            onClick={() => setDeleted(false)}
          />
        )}
      </Flex>
    );
  },
};
