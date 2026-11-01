import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState, type MouseEvent } from 'react';
import {
  Button,
  Drawer,
  Dropdown,
  Flex,
  Modal,
  Popover,
  Select,
  Text,
  showConfirm,
} from 'components';
import { StorybookDecorator } from 'global/storybook';

const story = {
  title: 'Components/Overlays/Overlay interactions',
  decorators: [StorybookDecorator],
} satisfies Meta;

export default story;

type Scenario = 'confirm' | 'nested' | 'parallel' | 'menus' | 'drawerMenus';

const scenarios: Record<Scenario, { title: string; instructions: string }> = {
  confirm: {
    title: 'Drawer → confirmation',
    instructions:
      'Open the drawer, then request confirmation from its content. Press Escape once and inspect the event log: which windows received a close request, and what did the confirmation return?',
  },
  nested: {
    title: 'Modal → Modal → Drawer',
    instructions:
      'Open the first modal, then the second modal from its content, then the drawer. Press Escape once at each depth and compare the close requests. Each window owns independent state.',
  },
  parallel: {
    title: 'Parallel sibling overlays',
    instructions:
      'One click opens two sibling drawers and a modal in the same render. Press Escape once, then inspect the event log. The drawers are anchored to opposite edges so you can distinguish them.',
  },
  menus: {
    title: 'Modal with floating overlays',
    instructions:
      'Open the modal, then try its popover, dropdown with a submenu, and select separately. Press Escape while focus is in the floating content. Compare the menu close request with the modal close request.',
  },
  drawerMenus: {
    title: 'Drawer with floating overlays',
    instructions:
      'Open the drawer and try the floating panels with the keyboard. Tab enters the regular popover; the content-first popover and dropdown move focus into their panels. Escape returns focus to the trigger.',
  },
};

const OverlayPlayground = ({ scenario }: { scenario: Scenario }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [secondDrawerOpen, setSecondDrawerOpen] = useState(false);
  const [selection, setSelection] = useState<string>();
  const [events, setEvents] = useState<string[]>([]);

  const record = useCallback((message: string) => {
    setEvents((previous) => [...previous, message]);
  }, []);

  const openOverlay = (name: string, setOpen: (open: boolean) => void) => {
    record(`${name}: open`);
    setOpen(true);
  };

  const closeOverlay = useCallback(
    (
      name: string,
      setOpen: (open: boolean) => void,
      event?: MouseEvent | KeyboardEvent,
    ) => {
      const reason = event && 'key' in event ? event.key : event?.type;
      record(`${name}: onClose (${reason ?? 'programmatic'})`);
      setOpen(false);
    },
    [record],
  );

  const closeModal = useCallback(
    (event?: MouseEvent | KeyboardEvent) =>
      closeOverlay('Modal', setModalOpen, event),
    [closeOverlay],
  );
  const closeSecondModal = useCallback(
    (event?: MouseEvent | KeyboardEvent) =>
      closeOverlay('Second modal', setSecondModalOpen, event),
    [closeOverlay],
  );
  const closeDrawer = useCallback(
    (event?: MouseEvent | KeyboardEvent) =>
      closeOverlay('Drawer', setDrawerOpen, event),
    [closeOverlay],
  );
  const closeSecondDrawer = useCallback(
    (event?: MouseEvent | KeyboardEvent) =>
      closeOverlay('Second drawer', setSecondDrawerOpen, event),
    [closeOverlay],
  );

  const confirm = async (title = 'Confirm inside drawer') => {
    record('Confirm: open');
    const result = await showConfirm({
      title,
      message: 'Press Escape once, then inspect the event log.',
    });
    record(`Confirm: resolved ${result}`);
  };

  const eventLog = (
    <Flex orientation="vertical" gap="xs">
      <Text block weight="bold">
        Event log
      </Text>
      <Text block size={3}>
        Modal: {modalOpen ? 'open' : 'closed'} · Second modal:{' '}
        {secondModalOpen ? 'open' : 'closed'} · Drawer:{' '}
        {drawerOpen ? 'open' : 'closed'} · Second drawer:{' '}
        {secondDrawerOpen ? 'open' : 'closed'}
      </Text>
      {events.length === 0 ? (
        <Text block size={3} color="muted">
          No events yet.
        </Text>
      ) : (
        events.map((message, index) => (
          <Text block code size={3} key={index}>
            {index + 1}. {message}
          </Text>
        ))
      )}
    </Flex>
  );

  const floatingControls = (
    <Flex orientation="vertical" gap="m" align="start">
      <Popover
        placement="bottom-start"
        onOpenChange={(open, _event, reason) =>
          record(
            `Popover: ${open ? 'open' : 'close'} (${reason ?? 'programmatic'})`,
          )
        }
        content={
          <Flex orientation="vertical" gap="s">
            <Button label="Focus inside popover" />
            <Button
              label="Confirm above popover"
              onClick={() => void confirm('Confirm above popover')}
            />
          </Flex>
        }
      >
        <Button label="Open popover" />
      </Popover>
      <Popover
        focusTrapTargets={['content']}
        content={
          <Flex orientation="vertical" gap="s">
            <Button label="First popover action" />
            <Button label="Second popover action" />
          </Flex>
        }
      >
        <Button label="Open content-first popover" />
      </Popover>
      <Popover
        focusTrap={false}
        content={<Button label="Non-trapping popover action" />}
      >
        <Button label="Open non-trapping popover" />
      </Popover>
      <Dropdown
        placement="bottom-start"
        onOpenChange={(open, _event, reason) =>
          record(
            `Dropdown: ${open ? 'open' : 'close'} (${reason ?? 'programmatic'})`,
          )
        }
        content={
          <Dropdown.Menu>
            <Dropdown.Action label="First action" />
            <Dropdown.ChildMenu label="Open submenu">
              <Dropdown.Action label="Nested action" />
            </Dropdown.ChildMenu>
          </Dropdown.Menu>
        }
      >
        <Button label="Open dropdown" />
      </Dropdown>
      <Select
        aria-label="Project status"
        placeholder="Open select"
        value={selection}
        onChange={(value) => {
          setSelection(typeof value === 'string' ? value : undefined);
          record(`Select: value ${String(value)}`);
        }}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' },
        ]}
      />
    </Flex>
  );

  return (
    <Flex
      orientation="vertical"
      gap="l"
      align="start"
      style={{ padding: 24, maxWidth: 760 }}
    >
      <Text block size={8} weight="bold">
        {scenarios[scenario].title}
      </Text>
      <Text block>{scenarios[scenario].instructions}</Text>
      <Text block>
        Each Escape closes only the most recently opened window. An open
        floating menu handles Escape before its containing window.
      </Text>
      {(scenario === 'menus' || scenario === 'drawerMenus') && (
        <Text block>
          Use Tab and Shift+Tab to enter and cycle through a popover, and arrow
          keys and Enter for menu items. A content-first panel focuses its
          content on opening. A non-trapping popover shares the parent
          window&apos;s focus boundary. After Escape, continue tabbing in the
          parent window.
        </Text>
      )}
      <Text block color="muted">
        The log records real callbacks without intercepting keyboard events. It
        is repeated inside the windows and remains here after they close.
      </Text>
      <Flex gap="m" wrap>
        <Button
          label={
            scenario === 'parallel'
              ? 'Open three sibling overlays'
              : scenario === 'confirm' || scenario === 'drawerMenus'
                ? 'Open drawer'
                : 'Open modal'
          }
          onClick={() => {
            setEvents([]);
            if (scenario === 'parallel') {
              openOverlay('Drawer', setDrawerOpen);
              openOverlay('Second drawer', setSecondDrawerOpen);
              openOverlay('Modal', setModalOpen);
            } else if (scenario === 'confirm' || scenario === 'drawerMenus') {
              openOverlay('Drawer', setDrawerOpen);
            } else {
              openOverlay('Modal', setModalOpen);
            }
          }}
        />
        <Button
          label="Clear log"
          variant="text"
          onClick={() => setEvents([])}
        />
      </Flex>
      {eventLog}
      <Modal
        title="First modal"
        open={modalOpen}
        onClose={closeModal}
        content={
          <Flex orientation="vertical" gap="m">
            {scenario === 'nested' && (
              <Button
                label="Open second modal"
                onClick={() => openOverlay('Second modal', setSecondModalOpen)}
              />
            )}
            {scenario === 'menus' && floatingControls}
            {eventLog}
            <Modal
              title="Second modal"
              open={secondModalOpen}
              onClose={closeSecondModal}
              content={
                <Flex orientation="vertical" gap="m">
                  <Button
                    label="Open nested drawer"
                    onClick={() => openOverlay('Drawer', setDrawerOpen)}
                  />
                  {eventLog}
                  {scenario === 'nested' && (
                    <Drawer
                      title="Nested drawer"
                      placement="end"
                      open={drawerOpen}
                      onClose={closeDrawer}
                      content={eventLog}
                    />
                  )}
                </Flex>
              }
            />
          </Flex>
        }
      />
      {scenario !== 'nested' && (
        <Drawer
          title="First drawer"
          placement="start"
          open={drawerOpen}
          onClose={closeDrawer}
          content={
            <Flex orientation="vertical" gap="m">
              {scenario === 'confirm' && (
                <Button
                  label="Request confirmation"
                  onClick={() => void confirm()}
                />
              )}
              {scenario === 'drawerMenus' && floatingControls}
              {eventLog}
            </Flex>
          }
        />
      )}
      <Drawer
        title="Second drawer"
        placement="end"
        open={secondDrawerOpen}
        onClose={closeSecondDrawer}
        content={eventLog}
      />
    </Flex>
  );
};

export const DrawerConfirmation: StoryObj = {
  render: () => <OverlayPlayground scenario="confirm" />,
};

export const NestedWindows: StoryObj = {
  render: () => <OverlayPlayground scenario="nested" />,
};

export const ParallelWindows: StoryObj = {
  render: () => <OverlayPlayground scenario="parallel" />,
};

export const FloatingInsideModal: StoryObj = {
  render: () => <OverlayPlayground scenario="menus" />,
};

export const FloatingInsideDrawer: StoryObj = {
  render: () => <OverlayPlayground scenario="drawerMenus" />,
};
