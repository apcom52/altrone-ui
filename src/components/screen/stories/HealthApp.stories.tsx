import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import {
  Avatar,
  BottomNavigation,
  Button,
  Divider,
  Flex,
  Form,
  Message,
  Modal,
  NavigationList,
  NumberInput,
  Progress,
  Range,
  Screen,
  Select,
  showAlert,
  showConfirm,
  Switcher,
  Text,
  Textarea,
  TextInput,
  Toolbar,
} from 'components';
import { useBreakpoint } from 'utils';
import {
  Activity,
  BarChart3,
  Bell,
  ChevronRight,
  Check,
  Download,
  Droplets,
  FileText,
  Flame,
  Footprints,
  Gauge,
  HeartPulse,
  Home,
  LogOut,
  Moon,
  PencilLine,
  Pill,
  Plus,
  Scale,
  Settings,
  Trash2,
  User,
  Watch,
  Wind,
} from 'lucide-react';
import { screenMeta, Stat, surface } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Health app',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

/* ------------------------------------------------------------------ *
 * Domain data
 * ------------------------------------------------------------------ */

const APP_TABS = [
  { id: 'today', label: 'Today', icon: <Home /> },
  { id: 'vitals', label: 'Vitals', icon: <HeartPulse /> },
  { id: 'meds', label: 'Meds', icon: <Pill /> },
  { id: 'profile', label: 'Profile', icon: <User /> },
] as const;

type AppTabId = (typeof APP_TABS)[number]['id'];

type Vital = {
  id: string;
  label: string;
  icon: ReactElement;
  unit: string;
  target: string;
  /** Newest reading first. */
  history: { date: string; value: number }[];
  /** For metrics where a drop is an improvement (resting HR, weight). */
  lowerIsBetter?: boolean;
};

const SEED_VITALS: Vital[] = [
  {
    id: 'resting-hr',
    label: 'Resting heart rate',
    icon: <HeartPulse size={18} />,
    unit: 'bpm',
    target: '55–65',
    lowerIsBetter: true,
    history: [
      { date: 'Today', value: 58 },
      { date: 'Yesterday', value: 61 },
      { date: 'Wed', value: 60 },
      { date: 'Tue', value: 63 },
    ],
  },
  {
    id: 'spo2',
    label: 'Blood oxygen',
    icon: <Wind size={18} />,
    unit: '%',
    target: '≥ 95',
    history: [
      { date: 'Today', value: 98 },
      { date: 'Yesterday', value: 97 },
      { date: 'Wed', value: 98 },
      { date: 'Tue', value: 96 },
    ],
  },
  {
    id: 'weight',
    label: 'Body weight',
    icon: <Scale size={18} />,
    unit: 'kg',
    target: '70–74',
    lowerIsBetter: true,
    history: [
      { date: 'Today', value: 72.4 },
      { date: 'Sun', value: 72.9 },
      { date: 'Fri', value: 73.1 },
      { date: 'Wed', value: 73 },
    ],
  },
  {
    id: 'vo2',
    label: 'VO₂ max',
    icon: <Gauge size={18} />,
    unit: 'ml/kg/min',
    target: '≥ 42',
    history: [
      { date: 'This week', value: 44 },
      { date: 'Last week', value: 43 },
      { date: '2 wk ago', value: 43 },
      { date: '3 wk ago', value: 41 },
    ],
  },
];

type Med = {
  id: string;
  name: string;
  dose: string;
  schedule: string;
  taken: boolean;
};

const SEED_MEDS: Med[] = [
  { id: 'd3', name: 'Vitamin D3', dose: '2000 IU', schedule: 'Morning', taken: true },
  { id: 'omega', name: 'Omega-3', dose: '1000 mg', schedule: 'With lunch', taken: false },
  { id: 'mag', name: 'Magnesium', dose: '300 mg', schedule: 'Before bed', taken: false },
];

type Workout = { id: string; type: string; minutes: number; kcal: number; when: string };

const SEED_WORKOUTS: Workout[] = [
  { id: 'w1', type: 'Morning run', minutes: 32, kcal: 288, when: '07:15' },
  { id: 'w2', type: 'Mobility', minutes: 12, kcal: 54, when: 'Yesterday' },
];

const MED_SCHEDULES = [
  { value: 'Morning', label: 'Morning' },
  { value: 'With lunch', label: 'With lunch' },
  { value: 'Evening', label: 'Evening' },
  { value: 'Before bed', label: 'Before bed' },
];

const WORKOUT_TYPES = [
  { value: 'Run', label: 'Run' },
  { value: 'Walk', label: 'Walk' },
  { value: 'Cycling', label: 'Cycling' },
  { value: 'Strength', label: 'Strength' },
  { value: 'Swim', label: 'Swimming' },
  { value: 'Yoga', label: 'Yoga' },
];

const EFFORT_LABELS = ['Very easy', 'Easy', 'Moderate', 'Hard', 'All out'];

const BLOOD_TYPES = ['O+', 'O−', 'A+', 'A−', 'B+', 'B−', 'AB+', 'AB−'].map((v) => ({
  value: v,
  label: v,
}));

const NOTIFICATIONS = [
  { id: 1, title: 'Time to move', body: 'You are 1,760 steps short of today’s goal.' },
  { id: 2, title: 'Medication reminder', body: 'Magnesium is scheduled for tonight.' },
  { id: 3, title: 'Weekly report', body: 'Resting heart rate is down 3 bpm this week.' },
];

/* ------------------------------------------------------------------ *
 * Small presentational helpers
 * ------------------------------------------------------------------ */

const MetricCard = ({
  icon,
  label,
  value,
  goalLabel,
  percentage,
}: {
  icon: ReactElement;
  label: string;
  value: string;
  goalLabel: string;
  percentage: number;
}) => (
  <Flex direction="vertical" gap="s" style={surface(16)}>
    <Flex align="center" gap="xs">
      {icon}
      <Text size={2} color="muted">
        {label}
      </Text>
    </Flex>
    <Text size={7} weight="bold">
      {value}
    </Text>
    <Progress value={percentage} aria-label={`${label}: ${goalLabel}`}>
      {goalLabel}
    </Progress>
  </Flex>
);

const TrendBadge = ({
  delta,
  unit,
  invert = false,
}: {
  delta: number;
  unit: string;
  invert?: boolean;
}) => {
  const rounded = Math.round(delta * 10) / 10;

  if (rounded === 0) {
    return (
      <Text size={2} color="muted">
        No change
      </Text>
    );
  }

  const improving = invert ? rounded < 0 : rounded > 0;

  return (
    <Text size={2} color={improving ? 'success' : 'danger'}>
      {rounded > 0 ? '+' : ''}
      {rounded} {unit} vs previous
    </Text>
  );
};

/* ------------------------------------------------------------------ *
 * Interactive modals
 * ------------------------------------------------------------------ */

const LogWorkoutModal = ({ onLog }: { onLog: (workout: Omit<Workout, 'id'>) => void }) => {
  const [type, setType] = useState('Run');
  const [minutes, setMinutes] = useState<number | undefined>(30);
  const [effort, setEffort] = useState(3);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setType('Run');
    setMinutes(30);
    setEffort(3);
    setSaving(false);
  };

  return (
    <Modal
      title="Log a workout"
      size="m"
      onClose={reset}
      content={
        <Form>
          <Form.Field label="Activity">
            <Select
              value={type}
              options={WORKOUT_TYPES}
              onChange={(value) => setType(value as string)}
            />
          </Form.Field>
          <Form.Field
            label="Duration"
            hintText="Minutes of moderate-to-vigorous effort"
          >
            <NumberInput value={minutes} onChange={setMinutes} min={1} max={600} />
          </Form.Field>
          <Form.Field label={`Perceived effort — ${EFFORT_LABELS[effort - 1]}`}>
            <Range
              value={effort}
              min={1}
              max={5}
              step={1}
              showCurrentValue="always"
              onChange={(value) => setEffort(value)}
            />
          </Form.Field>
        </Form>
      }
      actions={({ closeModal }) => (
        <Button
          label={saving ? 'Saving…' : 'Save workout'}
          variant="submit"
          state={saving ? 'loading' : 'idle'}
          icon={<Check size={14} />}
          onClick={async () => {
            if (!minutes) {
              return;
            }

            setSaving(true);
            await new Promise((resolve) => setTimeout(resolve, 900));
            onLog({
              type,
              minutes,
              kcal: Math.round(minutes * (4 + effort)),
              when: 'Just now',
            });
            reset();
            closeModal();
          }}
        />
      )}
    >
      <Button label="Log workout" variant="submit" icon={<Plus />} />
    </Modal>
  );
};

const VitalCard = ({
  vital,
  onAddReading,
}: {
  vital: Vital;
  onAddReading: (id: string, value: number) => void;
}) => {
  const [draft, setDraft] = useState<number | undefined>();

  const [latest, previous] = vital.history;
  const delta = previous ? latest.value - previous.value : 0;

  return (
    <Modal
      title={vital.label}
      size="m"
      onClose={() => setDraft(undefined)}
      content={() => (
        <Flex direction="vertical" gap="m">
          <Flex align="end" gap="xs">
            <Text size={9} weight="bold">
              {latest.value}
            </Text>
            <Text size={3} color="muted">
              {vital.unit}
            </Text>
          </Flex>
          <TrendBadge delta={delta} unit={vital.unit} invert={vital.lowerIsBetter} />

          <Divider />

          <Text size={2} color="muted">
            Recent readings
          </Text>
          <Flex direction="vertical" gap="xs">
            {vital.history.map((reading) => (
              <Flex key={reading.date} align="center" justify="between">
                <Text size={3}>{reading.date}</Text>
                <Text size={3} weight="medium">
                  {reading.value} {vital.unit}
                </Text>
              </Flex>
            ))}
          </Flex>

          <Divider />

          <Form>
            <Form.Field
              label={`Add a reading (${vital.unit})`}
              hintText={`Target range ${vital.target}`}
            >
              <NumberInput
                value={draft}
                onChange={setDraft}
                placeholder={String(latest.value)}
              />
            </Form.Field>
          </Form>
        </Flex>
      )}
      actions={({ closeModal }) => (
        <Button
          label="Save reading"
          variant="submit"
          icon={<Plus size={14} />}
          onClick={() => {
            if (draft === undefined) {
              return;
            }

            onAddReading(vital.id, draft);
            setDraft(undefined);
            closeModal();
          }}
        />
      )}
    >
      <Flex
        align="center"
        justify="between"
        style={{ ...surface(0), padding: '14px 16px', cursor: 'pointer' }}
      >
        <Flex align="center" gap="s">
          {vital.icon}
          <Flex direction="vertical" gap="xs">
            <Text size={3} weight="bold">
              {vital.label}
            </Text>
            <Text size={2} color="muted">
              Target {vital.target}
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" gap="s">
          <Text size={4} weight="bold">
            {latest.value}
          </Text>
          <Text size={2} color="muted">
            {vital.unit}
          </Text>
          <ChevronRight size={16} />
        </Flex>
      </Flex>
    </Modal>
  );
};

const AddMedicationModal = ({
  onAdd,
}: {
  onAdd: (med: Omit<Med, 'id' | 'taken'>) => void;
}) => {
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [schedule, setSchedule] = useState('Morning');
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setDose('');
    setSchedule('Morning');
    setError('');
  };

  return (
    <Modal
      title="Add medication"
      size="m"
      onClose={reset}
      content={
        <Form errorMessages={{ name: error }}>
          <Form.Field label="Name" name="name" required>
            <TextInput
              value={name}
              placeholder="e.g. Omega-3"
              onChange={(value) => {
                setName(value);
                setError('');
              }}
            />
          </Form.Field>
          <Form.Field label="Dose" name="dose">
            <TextInput value={dose} onChange={setDose} placeholder="e.g. 1000 mg" />
          </Form.Field>
          <Form.Field label="When to take it" name="schedule">
            <Select
              value={schedule}
              options={MED_SCHEDULES}
              onChange={(value) => setSchedule(value as string)}
            />
          </Form.Field>
        </Form>
      }
      actions={({ closeModal }) => (
        <Button
          label="Add"
          variant="submit"
          icon={<Plus size={14} />}
          onClick={() => {
            if (!name.trim()) {
              setError('Give the medication a name.');
              return;
            }

            onAdd({ name: name.trim(), dose: dose.trim() || '—', schedule });
            reset();
            closeModal();
          }}
        />
      )}
    >
      <Button label="Add medication" icon={<Plus size={14} />} size="s" />
    </Modal>
  );
};

type HealthProfile = {
  height: number;
  weight: number;
  bloodType: string;
  conditions: string;
};

const EditProfileModal = ({
  profile,
  onSave,
}: {
  profile: HealthProfile;
  onSave: (next: HealthProfile) => void;
}) => {
  const [height, setHeight] = useState<number | undefined>(profile.height);
  const [weight, setWeight] = useState<number | undefined>(profile.weight);
  const [bloodType, setBloodType] = useState(profile.bloodType);
  const [conditions, setConditions] = useState(profile.conditions);

  const reset = () => {
    setHeight(profile.height);
    setWeight(profile.weight);
    setBloodType(profile.bloodType);
    setConditions(profile.conditions);
  };

  return (
    <Modal
      title="Health profile"
      size="m"
      onClose={reset}
      content={
        <Form>
          <Form.Field label="Height (cm)">
            <NumberInput value={height} onChange={setHeight} min={100} max={250} />
          </Form.Field>
          <Form.Field label="Weight (kg)">
            <NumberInput value={weight} onChange={setWeight} min={30} max={300} />
          </Form.Field>
          <Form.Field label="Blood type">
            <Select
              value={bloodType}
              options={BLOOD_TYPES}
              onChange={(value) => setBloodType(value as string)}
            />
          </Form.Field>
          <Form.Field
            label="Conditions & allergies"
            hintText="Shared with clinicians you grant access to"
          >
            <Textarea
              value={conditions}
              onChange={setConditions}
              placeholder="e.g. Penicillin allergy"
            />
          </Form.Field>
        </Form>
      }
      actions={({ closeModal }) => (
        <Button
          label="Save profile"
          variant="submit"
          onClick={() => {
            onSave({
              height: height ?? profile.height,
              weight: weight ?? profile.weight,
              bloodType,
              conditions,
            });
            closeModal();
          }}
        />
      )}
    >
      <Button label="Edit health profile" variant="submit" icon={<PencilLine />} />
    </Modal>
  );
};

const NotificationsModal = ({ count }: { count: number }) => (
  <Modal
    title="Notifications"
    size="s"
    showCancelButton={false}
    content={
      <Flex direction="vertical" gap="s">
        {NOTIFICATIONS.map((item) => (
          <Flex key={item.id} direction="vertical" gap="xs" style={surface(12)}>
            <Text size={3} weight="bold">
              {item.title}
            </Text>
            <Text size={2} color="muted">
              {item.body}
            </Text>
          </Flex>
        ))}
      </Flex>
    }
    actions={({ closeModal }) => (
      <Button label="Mark all read" variant="submit" onClick={closeModal} />
    )}
  >
    <Toolbar.Action
      label="Notifications"
      icon={<Bell />}
      showLabel={false}
      badge={count || undefined}
    />
  </Modal>
);

/* ------------------------------------------------------------------ *
 * Screens
 * ------------------------------------------------------------------ */

const TodayScreen = ({
  hydration,
  onHydration,
  workouts,
  onLogWorkout,
  meds,
  onGoToMeds,
}: {
  hydration: number;
  onHydration: (value: number) => void;
  workouts: Workout[];
  onLogWorkout: (workout: Omit<Workout, 'id'>) => void;
  meds: Med[];
  onGoToMeds: () => void;
}) => {
  const moveKcal = 320 + workouts.reduce((sum, workout) => sum + workout.kcal, 0);
  const takenMeds = meds.filter((med) => med.taken).length;

  return (
    <Flex direction="vertical" gap="l">
      <Text size={7} weight="bold" block>
        Good morning, Alex
      </Text>

      <div
        style={{
          display: 'grid',
          gap: 'var(--space-section)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}
      >
        <MetricCard
          icon={<Flame size={18} />}
          label="Move"
          value={`${moveKcal} kcal`}
          goalLabel={`${moveKcal} / 600 kcal`}
          percentage={Math.min(100, Math.round((moveKcal / 600) * 100))}
        />
        <MetricCard
          icon={<Footprints size={18} />}
          label="Steps"
          value="8,240"
          goalLabel="8,240 / 10,000"
          percentage={82}
        />
        <MetricCard
          icon={<Moon size={18} />}
          label="Sleep"
          value="7h 04m"
          goalLabel="7.1 / 8.0 hours"
          percentage={89}
        />
      </div>

      <Flex direction="vertical" gap="s" style={surface(20)}>
        <Flex align="center" gap="xs">
          <Droplets size={18} />
          <Text size={4} weight="bold">
            Hydration
          </Text>
        </Flex>
        <Range
          value={hydration}
          min={0}
          max={3}
          step={0.1}
          showCurrentValue="always"
          renderLabel={(value) => `${value.toFixed(1)} L`}
          onChange={(value) => onHydration(value)}
        />
        <Text size={2} color="muted">
          {hydration >= 2.5
            ? 'Daily goal reached — nice work.'
            : `${(2.5 - hydration).toFixed(1)} L to go before the 2.5 L goal.`}
        </Text>
      </Flex>

      <Flex direction="vertical" gap="s">
        <Flex align="center" justify="between">
          <Text size={5} weight="bold">
            Today’s activity
          </Text>
          <LogWorkoutModal onLog={onLogWorkout} />
        </Flex>
        {workouts.map((workout) => (
          <Flex
            key={workout.id}
            align="center"
            justify="between"
            style={{ ...surface(0), padding: '14px 16px' }}
          >
            <Flex align="center" gap="s">
              <Activity size={16} />
              <Flex direction="vertical" gap="xs">
                <Text size={3} weight="bold">
                  {workout.type}
                </Text>
                <Text size={2} color="muted">
                  {workout.minutes} min · {workout.when}
                </Text>
              </Flex>
            </Flex>
            <Text size={3} weight="medium">
              {workout.kcal} kcal
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex
        align="center"
        justify="between"
        style={{ ...surface(0), padding: '14px 16px' }}
      >
        <Flex align="center" gap="s">
          <Pill size={16} />
          <Text size={3}>
            Medications · {takenMeds}/{meds.length} taken
          </Text>
        </Flex>
        <Button
          label="Manage"
          variant="text"
          icon={<ChevronRight />}
          onClick={onGoToMeds}
        />
      </Flex>
    </Flex>
  );
};

const VitalsScreen = ({
  vitals,
  onAddReading,
}: {
  vitals: Vital[];
  onAddReading: (id: string, value: number) => void;
}) => (
  <Flex direction="vertical" gap="m">
    <Text size={5} weight="bold" block>
      Latest measurements
    </Text>
    <Text size={3} color="muted" block>
      Tap any metric to see its history and log a new reading.
    </Text>
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-section)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      }}
    >
      {vitals.map((vital) => (
        <VitalCard key={vital.id} vital={vital} onAddReading={onAddReading} />
      ))}
    </div>
  </Flex>
);

const MedsScreen = ({
  meds,
  onToggle,
  onRemove,
  onAdd,
}: {
  meds: Med[];
  onToggle: (id: string) => void;
  onRemove: (med: Med) => void;
  onAdd: (med: Omit<Med, 'id' | 'taken'>) => void;
}) => {
  const pending = meds.filter((med) => !med.taken);

  return (
    <Flex direction="vertical" gap="m">
      {pending.length > 0 && (
        <Message
          severity="warning"
          header={`${pending.length} still to take today`}
        >
          <Text size={3}>
            Mark each dose as you take it so your adherence streak stays accurate.
          </Text>
        </Message>
      )}

      <Flex align="center" justify="between">
        <Text size={5} weight="bold">
          Today’s medications
        </Text>
        <AddMedicationModal onAdd={onAdd} />
      </Flex>

      <Flex direction="vertical" gap="s">
        {meds.map((med) => (
          <Flex
            key={med.id}
            align="center"
            justify="between"
            style={{ ...surface(0), padding: '12px 16px' }}
          >
            <Flex direction="vertical" gap="xs">
              <Text size={3} weight="bold">
                {med.name}
              </Text>
              <Text size={2} color="muted">
                {med.dose} · {med.schedule}
              </Text>
            </Flex>
            <Flex align="center" gap="m">
              <Switcher checked={med.taken} onChange={() => onToggle(med.id)}>
                <Text size={2} color="muted">
                  Taken
                </Text>
              </Switcher>
              <Button
                label={`Remove ${med.name}`}
                icon={<Trash2 />}
                showLabel={false}
                variant="text"
                danger
                size="s"
                onClick={() => onRemove(med)}
              />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const ProfileScreen = ({
  profile,
  onSaveProfile,
}: {
  profile: HealthProfile;
  onSaveProfile: (next: HealthProfile) => void;
}) => (
  <Flex
    direction="vertical"
    align="center"
    gap="m"
    style={{ paddingBlock: 'var(--space-section)' }}
  >
    <Avatar firstName="Alex" lastName="Rivera" size="l" />
    <Flex direction="vertical" align="center" gap="xs">
      <Text size={6} weight="bold">
        Alex Rivera
      </Text>
      <Text size={3} color="muted">
        Member since 2021 · {profile.height} cm · {profile.weight} kg
      </Text>
    </Flex>

    <Flex gap="l">
      <Stat label="Check-in streak" value="24 d" />
      <Stat label="Resting HR" value="58 bpm" />
      <Stat label="Blood type" value={profile.bloodType} />
    </Flex>

    <Flex gap="s" wrap justify="center">
      <EditProfileModal profile={profile} onSave={onSaveProfile} />
      <Button
        label="Export health data"
        icon={<Download />}
        onClick={() =>
          showAlert({
            title: 'Export started',
            message:
              'Your health archive is being prepared. We will email a download link within a few minutes.',
            okText: 'Got it',
          })
        }
      />
      <Button
        label="Sign out"
        icon={<LogOut />}
        danger
        variant="text"
        onClick={async () => {
          const confirmed = await showConfirm({
            title: 'Sign out of Pulse?',
            message: 'Your data stays synced. You can sign back in any time.',
            confirmText: 'Sign out',
            rejectText: 'Stay',
          });

          if (confirmed) {
            await showAlert({
              title: 'Signed out',
              message: 'This is a demo — you have not actually been signed out.',
            });
          }
        }}
      />
    </Flex>
  </Flex>
);

/* ------------------------------------------------------------------ *
 * Story
 * ------------------------------------------------------------------ */

/**
 * A personal health app — "Pulse" — driven by one `Screen` and a single `tab`
 * state. On desktop, navigation is a full-height `Screen.Sidebar` (a
 * `NavigationList` with a brand header, the primary destinations, a secondary
 * "More" group, and a user footer). Below `mobileBreakpoint` the sidebar stays
 * mounted so the header toggle can still summon it as an overlay, and a
 * `Screen.BottomNavigation` (`hiddenFrom="lg"`) takes over as the primary idiom
 * with just the four core destinations. Both nav surfaces write the same `tab`.
 *
 * Each screen carries its own interactive surface — `Modal` forms for logging a
 * workout, adding a vital reading, adding a medication and editing the health
 * profile; `Switcher`s for marking doses taken; `showConfirm` / `showAlert`
 * dialogs for destructive or terminal actions.
 */
export const HealthApp: StoryObj<typeof Screen> = {
  name: 'Health app',
  render: () => {
    const { isLg } = useBreakpoint();
    const [tab, setTab] = useState<AppTabId>('today');
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    const [hydration, setHydration] = useState(1.4);
    const [workouts, setWorkouts] = useState<Workout[]>(SEED_WORKOUTS);
    const [meds, setMeds] = useState<Med[]>(SEED_MEDS);
    const [vitals, setVitals] = useState<Vital[]>(SEED_VITALS);
    const [profile, setProfile] = useState<HealthProfile>({
      height: 178,
      weight: 72,
      bloodType: 'O+',
      conditions: 'Penicillin allergy',
    });

    const activeTab = APP_TABS.find((t) => t.id === tab) ?? APP_TABS[0];
    const pendingMeds = useMemo(
      () => meds.filter((med) => !med.taken).length,
      [meds],
    );

    const logWorkout = (workout: Omit<Workout, 'id'>) =>
      setWorkouts((prev) => [
        { ...workout, id: `w${Date.now()}` },
        ...prev,
      ]);

    const addVitalReading = (id: string, value: number) =>
      setVitals((prev) =>
        prev.map((vital) =>
          vital.id === id
            ? {
                ...vital,
                history: [{ date: 'Just now', value }, ...vital.history],
              }
            : vital,
        ),
      );

    const toggleMed = (id: string) =>
      setMeds((prev) =>
        prev.map((med) =>
          med.id === id ? { ...med, taken: !med.taken } : med,
        ),
      );

    const addMed = (med: Omit<Med, 'id' | 'taken'>) =>
      setMeds((prev) => [...prev, { ...med, id: `m${Date.now()}`, taken: false }]);

    const removeMed = async (med: Med) => {
      const confirmed = await showConfirm({
        title: `Remove ${med.name}?`,
        message: 'It will no longer appear in your daily medication list.',
        confirmText: 'Remove',
        rejectText: 'Keep',
        danger: true,
      });

      if (confirmed) {
        setMeds((prev) => prev.filter((item) => item.id !== med.id));
      }
    };

    return (
      <Screen title="Pulse" mobileBreakpoint="lg">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            {!isLg && (
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction
                  collapsed={menuCollapsed}
                  onClick={() => setMenuCollapsed((v) => !v)}
                />
              </Toolbar.Group>
            )}
            <Toolbar.Title label={activeTab.label} />
            <Toolbar.Separator />
            <Toolbar.Group>
              <Toolbar.SearchAction showLabel={false} />
              <NotificationsModal count={pendingMeds} />
            </Toolbar.Group>
            <Toolbar.Group>
              <Avatar firstName="Alex" lastName="Rivera" />
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>

        <Screen.Sidebar
          collapsed={isLg ? false : menuCollapsed}
          onClose={() => setMenuCollapsed(true)}
        >
          <NavigationList>
            <NavigationList.Header>
              <Flex align="center" gap="s">
                <Avatar firstName="Pulse" lastName="Health" size="s" />
                <Text size={4} weight="bold" block>
                  Pulse
                </Text>
              </Flex>
            </NavigationList.Header>
            <NavigationList.Group title="Health">
              {APP_TABS.map((t) => (
                <NavigationList.Link
                  key={t.id}
                  href="#"
                  icon={t.icon}
                  label={t.label}
                  badge={
                    t.id === 'meds' && pendingMeds > 0 ? pendingMeds : undefined
                  }
                  selected={tab === t.id}
                  onClick={(event) => {
                    event.preventDefault();
                    setTab(t.id);
                    setMenuCollapsed(true);
                  }}
                />
              ))}
            </NavigationList.Group>
            <NavigationList.Group title="More">
              <NavigationList.Link
                href="#"
                icon={<BarChart3 />}
                label="Trends"
                onClick={(event) => {
                  event.preventDefault();
                  showAlert({
                    title: 'Trends',
                    message: 'Long-term charts are not part of this demo.',
                  });
                }}
              />
              <NavigationList.Link
                href="#"
                icon={<Watch />}
                label="Devices"
                onClick={(event) => {
                  event.preventDefault();
                  showAlert({
                    title: 'Devices',
                    message: 'Wearable pairing is not part of this demo.',
                  });
                }}
              />
              <NavigationList.Link
                href="#"
                icon={<FileText />}
                label="Records"
                onClick={(event) => {
                  event.preventDefault();
                  showAlert({
                    title: 'Records',
                    message: 'Document storage is not part of this demo.',
                  });
                }}
              />
            </NavigationList.Group>
            <NavigationList.Footer>
              <Flex align="center" gap="s">
                <Avatar firstName="Alex" lastName="Rivera" size="s" />
                <Flex
                  direction="vertical"
                  gap="xs"
                  style={{ flex: 1, minWidth: 0 }}
                >
                  <Text size={3} block truncate>
                    Alex Rivera
                  </Text>
                  <Text size={2} color="muted" block>
                    Premium
                  </Text>
                </Flex>
                <Button
                  icon={<Settings />}
                  showLabel={false}
                  label="Settings"
                  size="s"
                  onClick={() =>
                    showAlert({
                      title: 'Settings',
                      message: 'Account settings are not part of this demo.',
                    })
                  }
                />
              </Flex>
            </NavigationList.Footer>
          </NavigationList>
        </Screen.Sidebar>

        <Screen.Content>
          {tab === 'today' && (
            <TodayScreen
              hydration={hydration}
              onHydration={setHydration}
              workouts={workouts}
              onLogWorkout={logWorkout}
              meds={meds}
              onGoToMeds={() => setTab('meds')}
            />
          )}
          {tab === 'vitals' && (
            <VitalsScreen vitals={vitals} onAddReading={addVitalReading} />
          )}
          {tab === 'meds' && (
            <MedsScreen
              meds={meds}
              onToggle={toggleMed}
              onRemove={removeMed}
              onAdd={addMed}
            />
          )}
          {tab === 'profile' && (
            <ProfileScreen profile={profile} onSaveProfile={setProfile} />
          )}
        </Screen.Content>

        <Screen.BottomNavigation hiddenFrom="lg">
          <BottomNavigation floating={false}>
            {APP_TABS.map((t) => (
              <BottomNavigation.Item
                key={t.id}
                href="#"
                icon={t.icon}
                label={t.label}
                selected={tab === t.id}
                onClick={(event) => {
                  event.preventDefault();
                  setTab(t.id);
                }}
              />
            ))}
          </BottomNavigation>
        </Screen.BottomNavigation>
      </Screen>
    );
  },
};
