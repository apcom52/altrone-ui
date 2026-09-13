import { useState } from 'react';
import { Button, Flex, Text } from 'components';
import { Textarea } from '../Textarea.tsx';

const START =
  "We're moving the weekly sync to Thursdays at 10:00.\n\nThe Monday slot clashed with the release window for half the team. Notes will still land in #announcements by end of day either way.";

/** Turns blank-line-separated blocks into paragraphs; single newlines stay as breaks. */
const paragraphs = (src: string) =>
  src
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

export const Announcement = () => {
  const [draft, setDraft] = useState(START);
  const blocks = paragraphs(draft);

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Compose &amp; preview
        </Text>
        <Text block>
          The write / preview split: the same string feeds an editable{' '}
          <Text code>Textarea</Text> on the left and a <Text code>Text</Text>
          -rendered preview on the right. Blank lines become paragraphs and pick
          up the <Text code>1.6</Text> block leading.
        </Text>
      </Flex>

      <Flex direction="horizontal" gap="l">
        <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
          <Text size={2} weight="bold" color="muted" block>
            DRAFT
          </Text>
          <Textarea
            value={draft}
            onChange={setDraft}
            size="l"
            style={{ minHeight: 200 }}
            aria-label="Announcement draft"
          />
        </Flex>

        <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
          <Text size={2} weight="bold" color="muted" block>
            PREVIEW
          </Text>
          <Flex
            direction="vertical"
            gap="s"
            style={{
              border: '1px solid var(--border-a1)',
              borderRadius: 10,
              padding: '12px 14px',
              minHeight: 200,
            }}
          >
            {blocks.length ? (
              blocks.map((b, i) => (
                <Text key={i} block size={3}>
                  {b}
                </Text>
              ))
            ) : (
              <Text size={3} color="muted" block>
                Nothing to preview yet.
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Button
        variant="submit"
        label="Post to #announcements"
        disabled={blocks.length === 0}
        onClick={() => undefined}
      />
    </Flex>
  );
};
