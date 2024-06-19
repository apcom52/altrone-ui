import { render, screen } from '@testing-library/react';
import { AltroneApplication, Button, Spoiler } from '../src';

describe('Application', () => {
  test('custom tagName should work', () => {
    const { rerender } = render(<AltroneApplication data-testid="app" />);
    expect(screen.getByTestId('app').tagName).toBe('DIV');

    rerender(<AltroneApplication tagName="body" data-testid="app" />);
    expect(screen.getByTestId('app').tagName).toBe('BODY');
  });

  test('when dark theme is applied className should contain .AltroneDark', () => {
    const { rerender } = render(<AltroneApplication data-testid="app" />);
    expect(screen.getByTestId('app')).not.toHaveClass('AltroneDark');

    rerender(<AltroneApplication theme="dark" data-testid="app" />);
    expect(screen.getByTestId('app')).toHaveClass('AltroneDark');
  });

  test('check that [data-altrone-root] exists', () => {
    render(<AltroneApplication data-testid="app" />);
    expect(screen.getByTestId('app')).toHaveAttribute('data-altrone-root');
  });

  test('check that configuration props works', () => {
    render(
      <AltroneApplication
        data-testid="app"
        config={{
          button: {
            className: 'testCls',
          },
          spoiler: {
            style: {
              borderRadius: 10,
            },
          },
        }}
      >
        <Button label="Test" data-testid="button" />
        <Spoiler title="Test" data-testid="spoiler" />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('button')).toHaveClass('testCls');
    expect(screen.getByTestId('spoiler')).toHaveStyle('border-radius: 10px');
  });
});
