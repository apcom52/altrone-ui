import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Application,
  Override,
  useIcons,
  useLocalization,
} from '../src/components';

const Probe = () => {
  const t = useLocalization();
  const icons = useIcons();
  return (
    <>
      <span data-testid="label">
        {t('pagination.next', { defaultValue: '-' })}
      </span>
      <span data-testid="icon">{icons.search}</span>
    </>
  );
};

describe('Override', () => {
  test('sets theme and accent on its own root, leaving the outer one untouched', () => {
    render(
      <Application theme="light" accent="blue" data-testid="outer">
        <Override theme="dark" accent="red" data-testid="inner" />
      </Application>,
    );

    expect(screen.getByTestId('inner')).toHaveAttribute(
      'data-altrone-theme',
      'dark',
    );
    expect(screen.getByTestId('inner')).toHaveAttribute(
      'data-altrone-accent',
      'red',
    );
    expect(screen.getByTestId('outer')).toHaveAttribute(
      'data-altrone-theme',
      'light',
    );
  });

  test('inherits theme when the prop is omitted and leaves accent to CSS inheritance', () => {
    render(
      <Application theme="dark">
        <Override data-testid="inner" />
      </Application>,
    );

    expect(screen.getByTestId('inner')).toHaveAttribute(
      'data-altrone-theme',
      'dark',
    );
    expect(screen.getByTestId('inner')).not.toHaveAttribute(
      'data-altrone-accent',
    );
  });

  test('merges customLabels over the inherited language and icons over inherited icons', () => {
    render(
      <Application
        language="ru"
        icons={{ search: <i data-testid="outer-icon" /> }}
      >
        <Override
          customLabels={{ pagination: { next: 'Dalee' } } as never}
          icons={{ clear: <b /> }}
        >
          <Probe />
        </Override>
      </Application>,
    );

    expect(screen.getByTestId('label')).toHaveTextContent('Dalee');
    expect(screen.getByTestId('outer-icon')).toBeInTheDocument();
  });
});
