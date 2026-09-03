import { useState } from 'react';
import { Button, Flex, Text } from 'components';
import { Textarea } from '../Textarea.tsx';

const SAVED_DEFAULT =
  'Design systems engineer. Currently untangling a decade of CSS into tokens. Off the clock: long-distance cycling and worse coffee than I admit.';

const MIN = 40;

export const ProfileBio = () => {
  const [saved, setSaved] = useState(SAVED_DEFAULT);
  const [draft, setDraft] = useState(SAVED_DEFAULT);
  const [editing, setEditing] = useState(false);

  const tooShort = draft.trim().length < MIN;

  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 480 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          A profile field, edited in place
        </Text>
        <Text block>
          The other half of a form: multi-line copy. Read-only until you hit
          Edit, a minimum-length gate while editing, and back to a flat,
          copy-friendly block on save — all the same <Text code>Textarea</Text>,
          just toggling <Text code>readOnly</Text> and <Text code>invalid</Text>.
        </Text>
      </Flex>

      <Flex direction="vertical" gap="xs">
        <Flex direction="horizontal" gap="m" align="center" justify="between">
          <Text asChild size={2} weight="medium">
            <label htmlFor="bio">Bio</label>
          </Text>
          {!editing && (
            <Button
              size="s"
              variant="text"
              label="Edit"
              onClick={() => {
                setDraft(saved);
                setEditing(true);
              }}
            />
          )}
        </Flex>

        <Textarea
          id="bio"
          value={editing ? draft : saved}
          onChange={setDraft}
          readOnly={!editing}
          invalid={editing && tooShort}
          placeholder="A sentence or two about you"
        />

        {editing ? (
          <Text size={2} color={tooShort ? 'danger' : 'muted'}>
            {tooShort
              ? `At least ${MIN} characters (${draft.trim().length} so far)`
              : `${draft.trim().length} characters`}
          </Text>
        ) : (
          <Text size={2} color="muted">
            Shown on your public profile.
          </Text>
        )}
      </Flex>

      {editing && (
        <Flex direction="horizontal" gap="s">
          <Button
            variant="submit"
            label="Save"
            disabled={tooShort}
            onClick={() => {
              setSaved(draft.trim());
              setEditing(false);
            }}
          />
          <Button
            variant="text"
            label="Cancel"
            onClick={() => setEditing(false)}
          />
        </Flex>
      )}
    </Flex>
  );
};
