import { render, screen } from '@testing-library/react';
import { AltroneApplication, Progress } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Progress', () => {
  test('need to show progress', () => {
    render(
      <>
        <Progress data-testid="progress" value={15} max={100} />
        <Progress data-testid="progress2" value={15} max={30} />
      </>,
    );

    expect(screen.queryByTestId('progress')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
  });

  test('need to render custom labels', () => {
    render(
      <>
        <Progress value={15} max={100}>
          Progress with label
        </Progress>
        <Progress value={15} max={30}>
          {({ value, max, percentage }) => (
            <div>{`${value}-${max}-${percentage}`}</div>
          )}
        </Progress>
      </>,
    );

    expect(screen.getByText('Progress with label')).toBeInTheDocument();
    expect(screen.getByText('15-30-50')).toBeInTheDocument();
  });

  test('Progress has to apply custom className and id', () => {
    render(
      <Progress
        data-testid="progress"
        value={10}
        max={100}
        className="cls"
        style={{ color: 'red' }}
      />,
    );

    expect(screen.getByTestId('progress')).toHaveClass('cls');
    expect(screen.getByTestId('progress')).toHaveStyle('color: red');
  });

  test('check that Progress configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          progress: {
            className: 'cls',
            style: { color: 'blue' },
            activeSegmentClassName: 'activeCls',
          },
        }}
      >
        <Progress data-testid="progress" value={10} max={100} />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('progress')).toHaveClass('cls');
    expect(screen.getByTestId('progress')).toHaveStyle('color: blue');
    expect(
      screen.getByTestId('progress').querySelector('.activeCls'),
    ).toBeInTheDocument();
  });
});
