import React from 'react';
import { expect, test, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Configuration, AltroneApplication, Spoiler } from '../src/components';

describe('Spoiler', () => {
  test('we need to open spoiler when user clicks on the spoiler header', () => {
    render(
      <AltroneApplication>
        <Spoiler data-testid="spoiler" title="Title">
          Content
        </Spoiler>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('spoiler')).not.toHaveAttribute('open');
    fireEvent.click(screen.getByText('Title'));
    expect(screen.getByTestId('spoiler')).toHaveAttribute('open');
  });

  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Spoiler
          data-testid="spoiler"
          title="Title"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
        >
          Content
        </Spoiler>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('spoiler')).toHaveClass('cls');
    expect(screen.getByTestId('spoiler')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that Toolbar configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          spoiler={{
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
          }}
        >
          <Spoiler data-testid="spoiler" title="Title">
            Content
          </Spoiler>
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('spoiler')).toHaveClass('cls');
    expect(screen.getByTestId('spoiler')).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
