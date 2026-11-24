import { expect, test, describe } from 'vitest';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { MotionConfig } from 'motion/react';
import {
  dismissAllNotifications,
  dismissNotification,
  Notifications,
  showNotification,
  showToast,
} from '../src/components';

const addCard = (kind: 'toast' | 'notification', content: string) =>
  kind === 'toast'
    ? showToast(content, { autoClose: false })
    : showNotification({ content, autoClose: false });

describe('Notifications', () => {
  test('defaults to the bottom-end corner', () => {
    render(<Notifications>{null}</Notifications>);

    expect(screen.getByTestId('toast-stack').className).toMatch(/Bottom/);
    expect(screen.getByTestId('notification-stack').className).toMatch(
      /Bottom/,
    );
    expect(screen.getByTestId('notification-stack').className).toMatch(
      /AlignEnd/,
    );
  });

  test('`notificationPlacement="top-start"` sets both the edge and the alignment', () => {
    render(
      <Notifications notificationPlacement="top-start">{null}</Notifications>,
    );

    const stack = screen.getByTestId('notification-stack');
    expect(stack.className).toMatch(/Top/);
    expect(stack.className).toMatch(/AlignStart/);
  });

  test('`toastPlacement="top"` moves only the toast stack, independent of `notificationPlacement`', () => {
    render(
      <Notifications toastPlacement="top" notificationPlacement="bottom-end">
        {null}
      </Notifications>,
    );

    expect(screen.getByTestId('toast-stack').className).toMatch(/Top/);
    expect(screen.getByTestId('notification-stack').className).toMatch(
      /Bottom/,
    );
  });

  test.each(['toast', 'notification'] as const)(
    'dismiss all appears at two cards and clears only the %s stack',
    async (kind) => {
      const otherKind = kind === 'toast' ? 'notification' : 'toast';
      render(<Notifications>{null}</Notifications>);
      const stack = within(screen.getByTestId(`${kind}-stack`));
      const otherStack = within(screen.getByTestId(`${otherKind}-stack`));

      act(() => {
        addCard(kind, 'First in target stack');
        addCard(otherKind, 'First in other stack');
        addCard(otherKind, 'Second in other stack');
      });
      expect(stack.queryByRole('button', { name: 'Dismiss all' })).toBeNull();

      act(() => {
        addCard(kind, 'Second in target stack');
      });
      fireEvent.click(stack.getByRole('button', { name: 'Dismiss all' }));

      await waitFor(() => {
        expect(stack.queryByText('First in target stack')).toBeNull();
        expect(stack.queryByText('Second in target stack')).toBeNull();
        expect(stack.queryByRole('button', { name: 'Dismiss all' })).toBeNull();
      });
      expect(otherStack.getByText('First in other stack')).toBeInTheDocument();
      expect(otherStack.getByText('Second in other stack')).toBeInTheDocument();
      expect(
        otherStack.getByRole('button', { name: 'Dismiss all' }),
      ).toBeInTheDocument();
    },
  );

  test('places each dismiss button on the inward edge of its stack', () => {
    render(
      <Notifications toastPlacement="bottom" notificationPlacement="top-start">
        {null}
      </Notifications>,
    );
    act(() => {
      addCard('toast', 'First toast');
      addCard('toast', 'Second toast');
      addCard('notification', 'First notification');
      addCard('notification', 'Second notification');
    });

    const toasts = screen.getByTestId('toast-stack');
    const notifications = screen.getByTestId('notification-stack');
    expect(toasts.firstElementChild).toContainElement(
      within(toasts).getByRole('button', { name: 'Dismiss all' }),
    );
    expect(notifications.lastElementChild).toContainElement(
      within(notifications).getByRole('button', { name: 'Dismiss all' }),
    );
  });

  test('restores focus on dismiss all and when a focused dismiss button disappears', async () => {
    render(
      <MotionConfig reducedMotion="always">
        <Notifications>
          <button>Open messages</button>
        </Notifications>
      </MotionConfig>,
    );
    const origin = screen.getByRole('button', { name: 'Open messages' });
    origin.focus();
    let firstToast = '';
    act(() => {
      firstToast = addCard('toast', 'First toast');
      addCard('toast', 'Second toast');
    });
    screen.getByRole('button', { name: 'Dismiss all' }).focus();
    act(() => {
      dismissNotification(firstToast);
    });
    expect(origin).toHaveFocus();
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Dismiss all' })).toBeNull(),
    );
    expect(screen.getByText('Second toast')).toBeInTheDocument();

    act(() => {
      addCard('toast', 'Third toast');
    });
    const button = screen.getByRole('button', { name: 'Dismiss all' });
    button.focus();
    fireEvent.click(button);
    expect(origin).toHaveFocus();
  });

  test('global dismissal restores focus outside both stacks from a card action', async () => {
    render(
      <Notifications>
        <button>Open messages</button>
      </Notifications>,
    );
    const origin = screen.getByRole('button', { name: 'Open messages' });
    origin.focus();
    act(() => {
      showToast('Toast with action', {
        autoClose: false,
        action: { label: 'Undo', onClick: () => undefined },
      });
      showNotification({
        content: 'Notification with action',
        autoClose: false,
        actions: [{ label: 'Reply', onClick: () => undefined }],
      });
    });
    screen.getByRole('button', { name: 'Undo' }).focus();
    screen.getByRole('button', { name: 'Reply' }).focus();

    act(() => {
      dismissAllNotifications();
    });

    expect(origin).toHaveFocus();
    await waitFor(() => {
      expect(screen.queryByText('Toast with action')).toBeNull();
      expect(screen.queryByText('Notification with action')).toBeNull();
    });
  });

  test('global dismissal affects only the innermost mounted provider', async () => {
    const providers = (nested: boolean) => (
      <Notifications>
        {nested ? <Notifications>{null}</Notifications> : null}
      </Notifications>
    );
    const { rerender } = render(providers(false));
    act(() => {
      addCard('toast', 'Outer toast');
      addCard('notification', 'Outer notification');
    });
    rerender(providers(true));
    act(() => {
      addCard('toast', 'Inner toast');
      addCard('notification', 'Inner notification');
    });
    expect(screen.getByText('Inner toast')).toBeInTheDocument();
    expect(screen.getByText('Inner notification')).toBeInTheDocument();

    act(() => {
      dismissAllNotifications();
    });

    await waitFor(() => {
      expect(screen.queryByText('Inner toast')).toBeNull();
      expect(screen.queryByText('Inner notification')).toBeNull();
    });
    expect(screen.getByText('Outer toast')).toBeInTheDocument();
    expect(screen.getByText('Outer notification')).toBeInTheDocument();

    rerender(providers(false));
    act(() => {
      dismissAllNotifications();
    });
    await waitFor(() => {
      expect(screen.queryByText('Outer toast')).toBeNull();
      expect(screen.queryByText('Outer notification')).toBeNull();
    });
  });
});
