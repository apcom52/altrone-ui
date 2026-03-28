import { Flex, Text, Tooltip } from 'components';

type UpdateType = 'danger' | 'success' | 'muted' | 'warning';

interface Update {
  type: UpdateType;
  label: string;
  version: string;
  title: string;
  description: string;
  filePath: string;
  author: string;
  time: string;
  prUrl: string;
}

const updates: Update[] = [
  {
    type: 'danger',
    label: 'Regression',
    version: 'v3.8.2',
    title: 'Avatar upload fails silently on Safari 17 after sharp upgrade',
    description:
      'After upgrading sharp to 0.33, HEIC images uploaded from Safari 17 on iOS are converted incorrectly — the resulting file is a valid JPEG but with a corrupted colour profile, causing downstream image recognition to fail silently without any error.',
    filePath: 'packages/api/src/handlers/media/processUpload.ts#L142',
    author: 'Elena Sorokina',
    time: '3 hours ago',
    prUrl: 'https://github.com',
  },
  {
    type: 'success',
    label: 'Merged',
    version: 'v3.9.0',
    title: 'Text component: discriminated union types & ref forwarding',
    description:
      'Replaced the flat TextProps interface with a discriminated union keyed on block, list, item, and href. Each variant now extends the correct HTML attributes type and carries a precisely-typed ref, enabling transparent Tooltip and Dropdown chains.',
    filePath: 'src/components/text/Text.types.ts',
    author: 'Dmitry Nikitin',
    time: '1 day ago',
    prUrl: 'https://github.com',
  },
  {
    type: 'warning',
    label: 'Dependency',
    version: 'v3.8.1',
    title: 'Bump vite from 5.0.11 to 5.0.12',
    description:
      'Automated dependency update via Renovate. No breaking changes. Fixes a minor edge case in HMR for circular-import graphs with dynamic imports inside barrel files.',
    filePath: 'package.json',
    author: 'Renovate Bot',
    time: '2 days ago',
    prUrl: 'https://github.com',
  },
];

export const TextFeaturesShowcase = () => {
  return (
    <div style={{ maxWidth: 580, margin: '0 auto', padding: 24 }}>
      {/* align="center" */}
      <Text size={7} weight="bold" block align="center">
        Sprint 12 · Week of March 24
      </Text>

      {/* align="center" + color="muted" */}
      <Text
        block
        size={3}
        color="muted"
        align="center"
        style={{ marginTop: 4, marginBottom: 28 }}
      >
        3 merged · 1 regression · 2 open
      </Text>

      <Flex direction="vertical" gap="m">
        {updates.map((update) => (
          <div
            key={update.title}
            style={{
              border: '1px solid var(--border-a1)',
              borderRadius: 8,
              padding: '14px 16px',
            }}
          >
            {/* nowrap на лейбле и версии, truncate на заголовке */}
            <Flex
              direction="horizontal"
              gap="s"
              align="center"
              style={{ marginBottom: 8 }}
            >
              <Text size={2} color={update.type} nowrap>
                [{update.label}]
              </Text>
              <Text
                size={3}
                weight="medium"
                truncate
                style={{ flex: 1, minWidth: 0 }}
              >
                {update.title}
              </Text>
              <Text size={2} color="muted" nowrap>
                {update.version}
              </Text>
            </Flex>

            {/* lineClamp={2} для превью */}
            <Text
              block
              size={3}
              color="muted"
              lineClamp={2}
              style={{ marginBottom: 12 }}
            >
              {update.description}
            </Text>

            <Flex
              direction="horizontal"
              gap="s"
              align="center"
              justify="between"
            >
              {/* truncate для длинного пути к файлу */}
              <Tooltip content={update.filePath}>
                <Text
                  size={2}
                  truncate
                  code
                  style={{ display: 'inline-block', flex: 1, minWidth: 64 }}
                >
                  {update.filePath}
                </Text>
              </Tooltip>

              <Flex
                direction="horizontal"
                gap="l"
                align="center"
                style={{ flexShrink: 0 }}
              >
                <Text size={2} color="muted" nowrap>
                  {update.author} · {update.time}
                </Text>
                {/* external — автоматически target="_blank" rel="noopener noreferrer" */}
                <Text size={2} href={update.prUrl} external>
                  View PR →
                </Text>
              </Flex>
            </Flex>
          </div>
        ))}
      </Flex>

      {/* asChild — стили Text применяются к <button>, block не нужен: width задан в style */}
      <Text
        size={3}
        color="muted"
        align="center"
        asChild
        style={{
          marginTop: 24,
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          width: '100%',
          display: 'block',
        }}
      >
        <button type="button">Show older activity</button>
      </Text>
    </div>
  );
};
