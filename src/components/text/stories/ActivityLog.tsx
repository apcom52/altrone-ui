import { Flex, Text, Tooltip } from 'components';

type Severity = 'danger' | 'warning' | 'success' | 'muted';

interface Entry {
  severity: Severity;
  tag: string;
  title: string;
  detail: string;
  path: string;
  who: string;
  when: string;
}

const entries: Entry[] = [
  {
    severity: 'danger',
    tag: 'INCIDENT',
    title: 'Checkout latency p99 above 4s for EU region',
    detail:
      'Payment intent creation is blocking on a synchronous fraud-score call after the provider rotated their edge certificates; requests queue behind a single stale keep-alive connection until the pool recycles.',
    path: 'services/checkout/src/payments/createIntent.ts',
    who: 'on-call',
    when: '6m ago',
  },
  {
    severity: 'warning',
    tag: 'DEPLOY',
    title: 'Rolling restart of search-indexer paused at 3 of 8 pods',
    detail:
      'New pods are stuck in CrashLoopBackOff — the mmap size limit on the node pool is lower than the shard budget the 4.0 index format asks for.',
    path: 'infra/k8s/search-indexer/deployment.yaml',
    who: 'ci-bot',
    when: '22m ago',
  },
  {
    severity: 'success',
    tag: 'MERGED',
    title: 'Text: prose leading for block paragraphs',
    detail:
      'Block paragraphs now default to line-height 1.6; an explicit size still wins, so headings composed as block are unaffected.',
    path: 'src/components/text/text.module.scss',
    who: 'a.perevezentsev',
    when: '1h ago',
  },
  {
    severity: 'muted',
    tag: 'NOTE',
    title: 'Renovate grouped 11 dev-dependency bumps into one PR',
    detail:
      'No runtime changes. The lockfile churn is large but confined to build tooling; CI is green on all three matrix targets.',
    path: 'package-lock.json',
    who: 'renovate',
    when: '3h ago',
  },
];

export const ActivityLog = () => {
  return (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 560 }}>
      <Flex direction="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          When space is the constraint
        </Text>
        <Text block>
          In a fixed column, text is the first thing to break a layout.{' '}
          <Text code>truncate</Text> keeps a title to one line,{' '}
          <Text code>lineClamp</Text> gives a preview a fixed number of lines,
          and <Text code>nowrap</Text> protects the small parts — a tag, a
          timestamp — that must never fold. Full values stay reachable through a{' '}
          <Text code>Tooltip</Text>.
        </Text>
      </Flex>

      <Flex
        direction="vertical"
        gap="s"
        style={{ width: 380, alignSelf: 'center' }}
      >
        {entries.map((e) => (
          <Flex
            key={e.title}
            direction="vertical"
            gap="xs"
            style={{
              border: '1px solid var(--border-a1)',
              borderRadius: 10,
              padding: '12px 14px',
            }}
          >
            <Flex direction="horizontal" gap="s" align="center">
              <Text size={1} weight="bold" color={e.severity} nowrap>
                {e.tag}
              </Text>
              <Text
                size={3}
                weight="medium"
                truncate
                style={{ flex: 1, minWidth: 0 }}
              >
                {e.title}
              </Text>
              <Text size={2} color="muted" nowrap>
                {e.when}
              </Text>
            </Flex>

            <Text block size={2} color="muted" lineClamp={2}>
              {e.detail}
            </Text>

            <Flex direction="horizontal" gap="s" align="center">
              <Tooltip content={e.path}>
                <Text
                  code
                  size={1}
                  truncate
                  style={{ display: 'inline-block', flex: 1, minWidth: 0 }}
                >
                  {e.path}
                </Text>
              </Tooltip>
              <Text size={1} color="muted" nowrap>
                {e.who}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
