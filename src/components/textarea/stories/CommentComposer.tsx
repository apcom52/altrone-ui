import { useState } from 'react';
import { Avatar, Button, Flex, Text, TextInput } from 'components';
import { Textarea } from '../Textarea.tsx';

const LIMIT = 500;

export const CommentComposer = () => {
  const [draft, setDraft] = useState(
    "Left a couple of notes inline — mainly about the error island's z-index. Happy to pair on it tomorrow.",
  );
  const [posted, setPosted] = useState<string[]>([
    'Looks good overall. One question about the caret handling on paste.',
  ]);

  const over = draft.length > LIMIT;
  const empty = draft.trim().length === 0;

  const submit = () => {
    if (empty || over) return;
    setPosted((p) => [...p, draft.trim()]);
    setDraft('');
  };

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Writing a comment
        </Text>
        <Text block>
          The composer&apos;s two affordances — a submit hint and a live
          character count — are <Text code>TextInput</Text> islands. Because the
          field wraps a <Text code>&lt;textarea&gt;</Text> they lay out as a
          footer beneath the text rather than sharing its line.{' '}
          <Text code>CharCounterIsland</Text> reads <Text code>value</Text> /{' '}
          <Text code>maxLength</Text> straight from context and turns{' '}
          <Text code>danger</Text> on its own past the limit.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="m">
        {posted.map((c, i) => (
          <Flex key={i} direction="horizontal" gap="s">
            <Avatar firstName="Dana" lastName="Ruiz" size="s" />
            <Flex direction="vertical" gap="xxs" style={{ flex: 1 }}>
              <Text size={2} weight="medium">
                Dana Ruiz
              </Text>
              <Text size={3} block>
                {c}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Textarea
        value={draft}
        onChange={setDraft}
        maxLength={LIMIT}
        placeholder="Leave a comment…"
        invalid={over}
      >
        <TextInput.CustomIsland placement="start" style={{ pointerEvents: 'none' }}>
          <Text size={2} color="muted">
            <Text kbd size={1}>
              ⌘
            </Text>{' '}
            <Text kbd size={1}>
              ↵
            </Text>{' '}
            to comment
          </Text>
        </TextInput.CustomIsland>
        <TextInput.CharCounterIsland placement="end" />
      </Textarea>

      <Flex direction="horizontal" gap="s">
        <Button
          variant="submit"
          label="Comment"
          disabled={empty || over}
          onClick={submit}
        />
        <Button variant="text" label="Cancel" onClick={() => setDraft('')} />
      </Flex>
    </Flex>
  );
};
