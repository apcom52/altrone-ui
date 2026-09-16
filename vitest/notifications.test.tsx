import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Notifications } from '../src/components/notifications';

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
});
