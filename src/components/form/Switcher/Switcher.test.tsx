import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Switcher } from './index';

describe('Form.Switcher', () => {
  test('should renders correctly', () => {
    render(<Switcher onChange={() => null}>Switcher</Switcher>);
    const input = screen.getByRole('checkbox');

    expect(input).toBeInTheDocument();
  });

  test('should checked works correctly', async () => {
    let checked = false;

    const onChange = (state) => {
      checked = state;
    };

    render(<Switcher onChange={onChange}>Switcher</Switcher>);
    const input = screen.getByRole('checkbox');

    await waitFor(() => fireEvent.click(input));
    expect(checked).toBe(true);
  });

  test('should disabled prop works correctly', () => {
    render(
      <Switcher disabled onChange={() => null}>
        Switcher
      </Switcher>
    );
    const input = screen.getByRole('checkbox');

    expect(input).toHaveAttribute('disabled', '');
  });
});
