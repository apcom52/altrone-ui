import { StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Button,
  Flex,
  Form,
  Label,
  Radio,
  Select,
  Spoiler,
  Switcher,
  Text,
  Textarea,
  TextInput,
} from 'components';
import { Drawer } from '../Drawer.tsx';
import { Rocket, GitBranch, Clock, CheckCircle, Loader } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

type ServiceId = 'api' | 'web' | 'worker' | 'gateway';

type Service = {
  id: ServiceId;
  name: string;
  repo: string;
  color: string;
};

const SERVICES: Service[] = [
  { id: 'api', name: 'Core API', repo: 'org/core-api', color: '#6366f1' },
  { id: 'web', name: 'Web App', repo: 'org/web-app', color: '#0ea5e9' },
  {
    id: 'worker',
    name: 'Background Worker',
    repo: 'org/worker',
    color: '#10b981',
  },
  { id: 'gateway', name: 'API Gateway', repo: 'org/gateway', color: '#f59e0b' },
];

type DeployStatus = 'queued' | 'running' | 'done';

type Deploy = {
  id: number;
  service: string;
  serviceColor: string;
  branch: string;
  environment: string;
  strategy: string;
  time: string;
  status: DeployStatus;
};

const INITIAL_DEPLOYS: Deploy[] = [
  {
    id: 1,
    service: 'Core API',
    serviceColor: '#6366f1',
    branch: 'main',
    environment: 'production',
    strategy: 'rolling',
    time: '10:14',
    status: 'done',
  },
  {
    id: 2,
    service: 'Web App',
    serviceColor: '#0ea5e9',
    branch: 'release/2.4.0',
    environment: 'staging',
    strategy: 'blue-green',
    time: '10:32',
    status: 'running',
  },
  {
    id: 3,
    service: 'API Gateway',
    serviceColor: '#f59e0b',
    branch: 'fix/rate-limiter',
    environment: 'staging',
    strategy: 'rolling',
    time: '10:47',
    status: 'queued',
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  DeployStatus,
  { label: string; color: string; bg: string }
> = {
  done: { label: 'Done', color: '#15803d', bg: '#f0fdf4' },
  running: { label: 'Running', color: '#1d4ed8', bg: '#eff6ff' },
  queued: { label: 'Queued', color: '#92400e', bg: '#fefce8' },
};

function StatusBadge({ status }: { status: DeployStatus }) {
  const { label, color, bg } = STATUS_CONFIG[status];
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 10px',
        borderRadius: 20,
        background: bg,
        color,
        whiteSpace: 'nowrap',
      }}
    >
      {status === 'running' ? '● ' : ''}
      {label}
    </span>
  );
}

// ─── Deploy row ───────────────────────────────────────────────────────────────

function DeployRow({ deploy }: { deploy: Deploy }) {
  return (
    <Flex
      direction="horizontal"
      align="center"
      gap="m"
      style={{
        padding: '12px 16px',
        borderRadius: 12,
        background: 'var(--glass-background-color)',
        border: '1px solid var(--border-1)',
      }}
    >
      <div
        style={{
          width: 8,
          height: 36,
          borderRadius: 4,
          background: deploy.serviceColor,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text weight="medium" block>
          {deploy.service}
        </Text>
        <Flex direction="horizontal" gap="xs" align="center">
          <GitBranch size={11} style={{ color: 'var(--text-1)' }} />
          <Text style={{ fontSize: 12, color: 'var(--text-1)' }}>
            {deploy.branch}
          </Text>
        </Flex>
      </div>
      <Flex
        direction="horizontal"
        gap="xs"
        justify="end"
        align="center"
        style={{ flex: 1 }}
      >
        <Label variant="soft" size="s">
          {deploy.environment}
        </Label>
        <StatusBadge status={deploy.status} />
        <Clock size={12} style={{ color: 'var(--text-1)' }} />
        <Text style={{ fontSize: 12, color: 'var(--text-1)' }}>
          {deploy.time}
        </Text>
      </Flex>
    </Flex>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

export const DeployDrawerStory: StoryObj<typeof Flex> = {
  name: 'Deploy Pipeline — Validation & Async onDone',
  render: () => {
    const [deploys, setDeploys] = useState<Deploy[]>(INITIAL_DEPLOYS);

    // Form state
    const [serviceId, setServiceId] = useState('');
    const [branch, setBranch] = useState('main');
    const [environment, setEnvironment] = useState('staging');
    const [strategy, setStrategy] = useState('rolling');
    const [rollback, setRollback] = useState(true);
    const [notes, setNotes] = useState('');
    const [validationError, setValidationError] = useState('');

    const selectedService = SERVICES.find((s) => s.id === serviceId);

    const handleDone = async (): Promise<boolean> => {
      setValidationError('');

      // Validation — onDone returns false → drawer stays open
      if (!serviceId) {
        setValidationError('Please select a service before deploying.');
        return false;
      }
      if (!branch.trim()) {
        setValidationError('Branch name cannot be empty.');
        return false;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const now = new Date();
      const time = now.toLocaleTimeString('en', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setDeploys((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          service: selectedService!.name,
          serviceColor: selectedService!.color,
          branch: branch.trim(),
          environment,
          strategy,
          time,
          status: 'queued',
        },
      ]);

      // Reset form for next use
      setServiceId('');
      setBranch('main');
      setEnvironment('staging');
      setStrategy('rolling');
      setRollback(true);
      setNotes('');

      return true;
    };

    // Footer: deployment summary preview
    const drawerFooter = (
      <div
        style={{
          padding: '12px 16px',
          borderRadius: 16,
          background: 'var(--glass-background-color)',
          border: '1px solid var(--border-1)',
          width: '100%',
        }}
      >
        <Text
          style={{ fontSize: 11, color: 'var(--text-1)', marginBottom: 6 }}
          block
        >
          DEPLOYMENT PREVIEW
        </Text>
        <Flex direction="horizontal" gap="s" align="center" wrap>
          <Flex direction="horizontal" gap="xs" align="center">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: selectedService?.color ?? 'var(--border-2)',
              }}
            />
            <Text weight="medium" style={{ fontSize: 13 }}>
              {selectedService?.name ?? '—'}
            </Text>
          </Flex>
          <Text style={{ color: 'var(--text-1)', fontSize: 13 }}>·</Text>
          <Flex direction="horizontal" gap="xs" align="center">
            <GitBranch size={12} style={{ color: 'var(--text-1)' }} />
            <Text style={{ fontSize: 13 }}>{branch || '—'}</Text>
          </Flex>
          <Text style={{ color: 'var(--text-1)', fontSize: 13 }}>→</Text>
          <Label variant="soft" size="s">
            {environment}
          </Label>
          <Label variant="soft" size="s">
            {strategy}
          </Label>
        </Flex>
        {selectedService && (
          <Text style={{ fontSize: 11, color: 'var(--text-1)', marginTop: 4 }}>
            {selectedService.repo}
          </Text>
        )}
      </div>
    );

    return (
      <Flex direction="vertical" gap="l" style={{ padding: 24 }}>
        {/* Page header */}
        <Flex direction="horizontal" justify="between" align="center">
          <div>
            <Text size={5} weight="bold" block>
              Deployment Queue
            </Text>
            <Text style={{ color: 'var(--text-1)' }}>
              {deploys.filter((d) => d.status === 'running').length} running ·{' '}
              {deploys.filter((d) => d.status === 'queued').length} queued ·{' '}
              {deploys.filter((d) => d.status === 'done').length} done
            </Text>
          </div>

          <Drawer
            title="New Deployment"
            placement="end"
            width={460}
            onDone={handleDone}
            footer={drawerFooter}
            content={
              <Form>
                {/* Validation error banner */}
                {validationError && (
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: 10,
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#b91c1c',
                      fontSize: 13,
                    }}
                  >
                    {validationError}
                  </div>
                )}

                <Form.Field label="Service *">
                  <Select
                    value={serviceId}
                    onChange={(v) => {
                      setServiceId(v as string);
                      setValidationError('');
                    }}
                    placeholder="Choose service..."
                    options={SERVICES.map((s) => ({
                      value: s.id,
                      label: s.name,
                    }))}
                  />
                </Form.Field>

                <Form.Field label="Branch">
                  <TextInput
                    value={branch}
                    onChange={(v) => setBranch(v)}
                    placeholder="main"
                  />
                </Form.Field>

                <Form.Field label="Environment">
                  <Radio
                    value={environment}
                    onChange={(v) => setEnvironment(v as string)}
                    name="drawer-env"
                  >
                    <Radio.Item value="staging">Staging</Radio.Item>
                    <Radio.Item value="production">Production</Radio.Item>
                    <Radio.Item value="preview">Preview</Radio.Item>
                  </Radio>
                </Form.Field>

                <Spoiler title="Advanced options">
                  <Form>
                    <Form.Field label="Deploy strategy">
                      <Radio
                        value={strategy}
                        onChange={(v) => setStrategy(v as string)}
                        name="drawer-strategy"
                      >
                        <Radio.Item value="rolling">Rolling update</Radio.Item>
                        <Radio.Item value="blue-green">Blue / Green</Radio.Item>
                        <Radio.Item value="recreate">Recreate</Radio.Item>
                      </Radio>
                    </Form.Field>

                    <Form.Field>
                      <Switcher
                        checked={rollback}
                        onChange={(v) => setRollback(v)}
                      >
                        Auto-rollback on failure
                      </Switcher>
                    </Form.Field>

                    <Form.Field label="Release notes">
                      <Textarea
                        value={notes}
                        onChange={(v) => setNotes(v)}
                        placeholder="What changed in this release?"
                      />
                    </Form.Field>
                  </Form>
                </Spoiler>
              </Form>
            }
          >
            <Button icon={<Rocket size={14} />} label="New Deployment" />
          </Drawer>
        </Flex>

        {/* Deploy list */}
        <Flex direction="vertical" gap="s">
          {[...deploys].reverse().map((deploy) => (
            <DeployRow key={deploy.id} deploy={deploy} />
          ))}
        </Flex>
      </Flex>
    );
  },
};
