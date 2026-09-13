import { Flex, Text } from 'components';

/**
 * The content-document face of `Text`: a page built only from `Text` + `Flex`,
 * no Markdown renderer. Headings are size steps, paragraphs carry the `1.6`
 * prose leading, and every inline mark earns its place in real copy.
 */
export const ReleaseNotes = () => {
  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={2} weight="bold" color="success" nowrap>
          RELEASE · 2 Sep 2026
        </Text>
        <Text size={8} weight="bold" block>
          Harbor 4.0 — smaller, quieter, faster
        </Text>
        <Text size={4} color="muted" block>
          The build cache is now content-addressed, the CLI stopped shouting,
          and cold starts dropped by a third.
        </Text>
      </Flex>

      <Text size={6} weight="bold" block>
        Highlights
      </Text>
      <Text list="marked">
        <Text item>
          <Text weight="bold">Content-addressed cache.</Text> Artifacts are keyed
          by a hash of their inputs, so switching branches no longer throws the
          cache away.
        </Text>
        <Text item>
          <Text weight="bold">Quiet by default.</Text> <Text code>harbor build</Text>{' '}
          prints a single progress line; pass <Text code>--verbose</Text> for the
          old firehose.
        </Text>
        <Text item>
          <Text weight="bold">Parallel resolves.</Text> The dependency graph is
          walked concurrently — <Text italic>roughly</Text> a 3× speed-up on wide
          trees.
        </Text>
      </Text>

      <Text size={6} weight="bold" block>
        Breaking changes
      </Text>
      <Text list="numeric">
        <Text item>
          The default output directory moved: <Text deleted>./build</Text> is
          now <Text code>./dist</Text>. Set <Text code>outDir</Text> in{' '}
          <Text code>harbor.toml</Text> to keep the old path.
        </Text>
        <Text item>
          <Text code>harbor watch</Text> was folded into{' '}
          <Text code>harbor dev</Text>. The standalone command now prints a
          pointer and exits.
        </Text>
        <Text item>
          Node 18 is no longer supported.{' '}
          <Text highlighted>Node 20 or newer is required.</Text>
        </Text>
      </Text>

      <Text size={6} weight="bold" block>
        Upgrading
      </Text>
      <Text block>
        Run <Text code>npx harbor@4 migrate</Text> from the repo root. It rewrites{' '}
        <Text code>harbor.toml</Text>, updates the lockfile, and leaves a{' '}
        <Text code>.harbor-migration.log</Text> you can review before committing.
        If a step needs input, the migrator pauses — press{' '}
        <Text kbd>Enter</Text> to accept the suggested value or{' '}
        <Text kbd>Ctrl</Text> <Text kbd>C</Text> to bail out cleanly.
      </Text>
      <Text block>
        The full changelog, including the <Text underline>internal</Text> API
        notes, lives in the{' '}
        <Text href="https://example.com/harbor/changelog" external>
          release archive
        </Text>
        .
      </Text>
    </Flex>
  );
};
