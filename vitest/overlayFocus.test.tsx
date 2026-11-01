import { StrictMode, useState } from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import {
  Application,
  Button,
  Drawer,
  Modal,
  Popover,
  Dropdown,
  Select,
  showConfirm,
} from '../src/components';

describe('Sheet portal focus', () => {
  test.each(['Modal', 'Drawer'] as const)(
    '%s lets a trapped Popover focus its panel and returns focus on dismissal',
    async (host) => {
      const onClose = vi.fn();
      const Host = host === 'Modal' ? Modal : Drawer;
      render(
        <StrictMode>
          <Application>
            <Host
              defaultOpen
              title="Parent"
              onClose={onClose}
              content={
                <Popover
                  data-testid="popover-panel"
                  focusTrapTargets={['content']}
                  content={<Button label="Inside popover" />}
                >
                  <Button label="Open popover" />
                </Popover>
              }
            />
          </Application>
        </StrictMode>,
      );
      const trigger = screen.getByRole('button', { name: 'Open popover' });
      fireEvent.click(trigger);
      const inside = await screen.findByRole('button', {
        name: 'Inside popover',
      });
      await waitFor(() =>
        expect(screen.getByTestId('popover-panel')).toContainElement(
          document.activeElement as HTMLElement,
        ),
      );
      act(() => inside.focus());
      expect(inside).toHaveFocus();

      fireEvent.keyDown(inside, { key: 'Escape' });
      await waitFor(() => expect(trigger).toHaveFocus());
      expect(onClose).not.toHaveBeenCalled();
      fireEvent.keyDown(trigger, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    },
  );

  test.each(['Dropdown', 'Select'] as const)(
    '%s items retain focus inside a modal',
    async (kind) => {
      render(
        <Application>
          <Modal
            defaultOpen
            title="Parent"
            content={
              kind === 'Dropdown' ? (
                <Dropdown
                  content={
                    <Dropdown.Menu>
                      <Dropdown.Action label="First action" />
                    </Dropdown.Menu>
                  }
                >
                  <Button label="Open dropdown" />
                </Dropdown>
              ) : (
                <Select
                  aria-label="Status"
                  options={[{ value: 'draft', label: 'Draft' }]}
                  onChange={() => {}}
                />
              )
            }
          />
        </Application>,
      );
      fireEvent.click(
        kind === 'Dropdown'
          ? screen.getByRole('button', { name: 'Open dropdown' })
          : screen.getByRole('combobox'),
      );
      const item = await screen.findByRole(
        kind === 'Dropdown' ? 'button' : 'checkbox',
        { name: kind === 'Dropdown' ? 'First action' : 'Draft' },
      );
      act(() => item.focus());
      expect(item).toHaveFocus();
    },
  );

  test('a non-trapping portal remains inside the sheet focus boundary', async () => {
    render(
      <Application>
        <Button label="Outside modal" />
        <Modal
          defaultOpen
          title="Parent"
          content={
            <Popover
              focusTrap={false}
              content={<Button label="Inside portal" />}
            >
              <Button label="Open portal" />
            </Popover>
          }
        />
      </Application>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open portal' }));
    const inside = await screen.findByRole('button', { name: 'Inside portal' });
    act(() => inside.focus());
    expect(inside).toHaveFocus();
    act(() => screen.getByRole('button', { name: 'Outside modal' }).focus());
    expect(inside).toHaveFocus();
    fireEvent.keyDown(inside, { key: 'Escape' });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Open portal' })).toHaveFocus(),
    );
  });

  test('closing a nested panel leaves focus with the remaining parent portal', async () => {
    const Harness = () => {
      const [childOpen, setChildOpen] = useState(false);
      return (
        <Application>
          <Modal
            defaultOpen
            title="Parent"
            content={
              <Popover
                focusTrapTargets={['content']}
                content={
                  <>
                    <Button label="Outer action" />
                    <Popover
                      open={childOpen}
                      onOpenChange={setChildOpen}
                      focusTrapTargets={['content']}
                      content={
                        <Button
                          label="Close child"
                          onClick={() => setChildOpen(false)}
                        />
                      }
                    >
                      <Button label="Child trigger" />
                    </Popover>
                  </>
                }
              >
                <Button label="Outer trigger" />
              </Popover>
            }
          />
        </Application>
      );
    };
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'Outer trigger' }));
    fireEvent.click(
      await screen.findByRole('button', { name: 'Child trigger' }),
    );
    const child = await screen.findByRole('button', { name: 'Close child' });
    act(() => child.focus());
    expect(child).toHaveFocus();
    fireEvent.click(child);
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Child trigger' }),
      ).toHaveFocus(),
    );
    const outer = screen.getByRole('button', { name: 'Outer action' });
    act(() => outer.focus());
    expect(outer).toHaveFocus();
  });

  test('removing a controlled portal restores the sheet trap', async () => {
    const Harness = () => {
      const [mounted, setMounted] = useState(true);
      return (
        <Application>
          <Button label="Outside modal" />
          <Modal
            defaultOpen
            title="Parent"
            content={
              <>
                <Button label="Inside modal" />
                {mounted && (
                  <Popover
                    open
                    focusTrapTargets={['content']}
                    content={
                      <Button
                        label="Remove portal"
                        onClick={() => setMounted(false)}
                      />
                    }
                  >
                    <Button label="Portal trigger" />
                  </Popover>
                )}
              </>
            }
          />
        </Application>
      );
    };
    render(
      <StrictMode>
        <Harness />
      </StrictMode>,
    );
    const remove = await screen.findByRole('button', { name: 'Remove portal' });
    act(() => remove.focus());
    expect(remove).toHaveFocus();
    fireEvent.click(remove);
    const inside = screen.getByRole('button', { name: 'Inside modal' });
    act(() => inside.focus());
    act(() => screen.getByRole('button', { name: 'Outside modal' }).focus());
    expect(inside).toHaveFocus();
  });

  test('a dialog above a portal returns focus to the still-open portal', async () => {
    let result: Promise<boolean> | undefined;
    render(
      <Application>
        <Modal
          defaultOpen
          title="Parent"
          content={
            <Popover
              focusTrapTargets={['content']}
              content={
                <Button
                  label="Request confirmation"
                  onClick={() => {
                    result = showConfirm({
                      title: 'Confirm',
                      message: 'Continue?',
                    });
                  }}
                />
              }
            >
              <Button label="Open portal" />
            </Popover>
          }
        />
      </Application>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open portal' }));
    const request = await screen.findByRole('button', {
      name: 'Request confirmation',
    });
    act(() => request.focus());
    fireEvent.click(request);
    const confirm = await screen.findByRole('button', { name: 'Confirm' });
    act(() => confirm.focus());
    expect(confirm).toHaveFocus();
    fireEvent.keyDown(confirm, { key: 'Escape' });
    await expect(result).resolves.toBe(false);
    await waitFor(() => expect(request).toHaveFocus());
  });
});
