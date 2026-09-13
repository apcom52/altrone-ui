import React from 'react';
import { expect, test, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from '../src/components';

describe('Avatar', () => {
  test('derives initials from the names', () => {
    const { rerender } = render(<Avatar firstName="John" lastName="Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();

    rerender(<Avatar firstName="John" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  test('exposes the full name as an image with a label', () => {
    render(<Avatar firstName="John" lastName="Doe" data-testid="a" />);
    const el = screen.getByTestId('a');
    expect(el).toHaveAttribute('role', 'img');
    expect(el).toHaveAccessibleName('John Doe');
  });

  test('renders the photo, falling back to initials on load error', () => {
    const { container } = render(
      <Avatar firstName="John" lastName="Doe" imageSrc="https://x/p.jpg" />,
    );

    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('src', 'https://x/p.jpg');
    expect(img).toHaveAttribute('alt', '');
    expect(screen.queryByText('JD')).not.toBeInTheDocument();

    fireEvent.error(img);
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('applies the size modifier and forwards className/style/props', () => {
    render(
      <Avatar
        firstName="John"
        lastName="Doe"
        size="l"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
        title="John Doe"
        data-testid="a"
      />,
    );
    const el = screen.getByTestId('a');
    expect(el.className).toMatch(/Large/);
    expect(el).toHaveClass('cls');
    expect(el).toHaveStyle('color: rgb(0, 0, 255)');
    expect(el).toHaveAttribute('title', 'John Doe');
  });

  test('backgroundColor and textColor drive the fill/text CSS vars', () => {
    render(
      <Avatar
        firstName="John"
        lastName="Doe"
        backgroundColor="#123456"
        textColor="#abcdef"
        data-testid="a"
      />,
    );
    const el = screen.getByTestId('a');
    expect(el.style.getPropertyValue('--_avatar-bg')).toBe('#123456');
    expect(el.style.getPropertyValue('--_avatar-text-color')).toBe('#abcdef');
  });
});
