import { render, screen } from '@testing-library/react';
import { Configuration, AltroneApplication, Modal } from '../src/components';

describe('Modal', () => {
  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Modal
          data-testid="modal"
          className="cls"
          style={{ color: 'blue' }}
          content={<div>content</div>}
          openedByDefault={true}
        >
          <button>test</button>
        </Modal>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('modal')).toHaveClass('cls');
    expect(screen.getByTestId('modal')).toHaveStyle('color: blue');
  });

  test('check that CollapsedList configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration modal={{ className: 'cls', style: { color: 'blue' } }}>
          <Modal
            data-testid="modal"
            content={<div>content</div>}
            openedByDefault={true}
          >
            <button>test</button>
          </Modal>
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('modal')).toHaveClass('cls');
    expect(screen.getByTestId('modal')).toHaveStyle('color: blue');
  });
});
