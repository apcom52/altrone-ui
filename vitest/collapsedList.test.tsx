import { render, screen } from '@testing-library/react';
import {
  Configuration,
  CollapsedList,
  AltroneApplication,
} from '../src/components';

describe('CollapsedList', () => {
  test('we need to show 6 elements when limit is set to 6', () => {
    render(
      <AltroneApplication>
        <CollapsedList
          data-testid="collapsed-list"
          className="cls"
          limit={6}
          style={{ color: 'blue' }}
        >
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </CollapsedList>
      </AltroneApplication>,
    );

    expect(
      screen.getByTestId('collapsed-list').children[0].children,
    ).toHaveLength(6);
  });

  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <CollapsedList
          data-testid="collapsed-list"
          className="cls"
          style={{ color: 'blue' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('collapsed-list')).toHaveClass('cls');
    expect(screen.getByTestId('collapsed-list')).toHaveStyle('color: blue');
  });

  test('check that CollapsedList configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          collapsedList={{ className: 'cls', style: { color: 'blue' } }}
        >
          <CollapsedList data-testid="collapsed-list" />,
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('collapsed-list');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
