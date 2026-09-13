import { StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Flex, Text } from 'components';
import { Modal } from '../Modal.tsx';
import { Lock, LockOpen, Delete } from 'lucide-react';

const PIN = '2409';
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const KeypadLockStory: StoryObj<typeof Modal> = {
  name: 'Focused task — a keypad, no chrome',
  render: () => {
    const [unlocked, setUnlocked] = useState(false);
    const [entry, setEntry] = useState('');
    const [wrong, setWrong] = useState(false);

    const press = (key: string) => {
      if (entry.length >= 4) return;
      const next = entry + key;
      setWrong(false);
      setEntry(next);
    };

    const check = (close: () => void) => {
      if (entry === PIN) {
        setUnlocked(true);
        setEntry('');
        close();
      } else {
        setWrong(true);
        setEntry('');
      }
    };

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24, maxWidth: 420 }}>
        <Flex direction="horizontal" gap="s" align="center">
          {unlocked ? <LockOpen size={18} /> : <Lock size={18} />}
          <Text block size={7} weight="bold">
            Release vault
          </Text>
        </Flex>
        <Text block size={4} color="muted">
          {unlocked
            ? 'Unlocked. The deploy can proceed.'
            : 'A modal is a good home for one small task that needs full attention. The PIN is 2409.'}
        </Text>

        <Modal
          title="Enter release PIN"
          size="s"
          showCancelButton={false}
          onClose={() => {
            setEntry('');
            setWrong(false);
          }}
          content={({ closeModal }) => (
            <Flex direction="vertical" gap="l" align="center">
              <Flex direction="horizontal" gap="s">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 'var(--radius-circle)',
                      background:
                        i < entry.length
                          ? 'var(--accent-9)'
                          : 'var(--gray-a5)',
                      transition: 'background 120ms',
                    }}
                  />
                ))}
              </Flex>

              <Text block size={3} style={{ color: 'var(--danger-text-1)', minHeight: 16 }}>
                {wrong ? 'Wrong PIN — try again' : ''}
              </Text>

              <Flex direction="horizontal" wrap gap="s" style={{ width: 216 }}>
                {KEYS.map((key) => (
                  <Button
                    key={key}
                    label={key}
                    size="l"
                    style={{ width: 64, height: 56 }}
                    onClick={() => press(key)}
                  />
                ))}
                <Button
                  label="Clear"
                  variant="text"
                  size="l"
                  style={{ width: 64, height: 56 }}
                  showLabel={false}
                  icon={<Delete size={18} />}
                  onClick={() => {
                    setEntry('');
                    setWrong(false);
                  }}
                />
                <Button
                  label="0"
                  size="l"
                  style={{ width: 64, height: 56 }}
                  onClick={() => press('0')}
                />
                <Button
                  label="Unlock"
                  variant="submit"
                  size="l"
                  style={{ width: 64, height: 56 }}
                  showLabel={false}
                  icon={<LockOpen size={18} />}
                  disabled={entry.length < 4}
                  onClick={() => check(closeModal)}
                />
              </Flex>
            </Flex>
          )}
        >
          <Button
            label={unlocked ? 'Vault unlocked' : 'Unlock to deploy'}
            icon={unlocked ? <LockOpen size={14} /> : <Lock size={14} />}
            disabled={unlocked}
          />
        </Modal>
      </Flex>
    );
  },
};
