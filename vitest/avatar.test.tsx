import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, Configuration } from '../src';

describe('Avatar', () => {
  test('check avatar works correctly', () => {
    const { rerender } = render(<Avatar firstName="John" lastName="Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();

    rerender(<Avatar firstName="John" />);
    expect(screen.getByText('J')).toBeInTheDocument();

    rerender(<Avatar firstName="Mark" lastName="Zoe" />);
    expect(screen.getByText('MZ')).toBeInTheDocument();
  });

  test('check correct work of title', () => {
    render(
      <>
        <Avatar firstName="John" lastName="Doe" data-testid="avatar-1" />
        <Avatar firstName="John" data-testid="avatar-2" />
        <Avatar firstName="Mark" lastName="Zoe" data-testid="avatar-3" />
        <Avatar firstName="Daniel" lastName=" " data-testid="avatar-4" />
      </>,
    );

    expect(screen.getByTestId('avatar-1')).toHaveAttribute('title', 'John Doe');
    expect(screen.getByTestId('avatar-2')).toHaveAttribute('title', 'John');
    expect(screen.getByTestId('avatar-3')).toHaveAttribute('title', 'Mark Zoe');
    expect(screen.getByTestId('avatar-4')).toHaveAttribute('title', 'Daniel');
  });

  test('check that properties works correctly', () => {
    render(
      <Avatar
        data-testid="element"
        firstName="John"
        lastName="Doe"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      />,
    );

    expect(screen.getByTestId('element')).toHaveClass('cls');
    expect(screen.getByTestId('element')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that configuration works', () => {
    render(
      <Configuration
        avatar={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
      >
        <Avatar data-testid="element" firstName="John" lastName="Doe" />
      </Configuration>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
