import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Altrone } from '../../hocs';
import { useLocalization } from './useLocalization';

const TestComponent = () => {
  const t = useLocalization();

  return <button>{t('common.apply')}</button>;
};

describe('useWindowSize', () => {
  test('should return width correctly', () => {
    render(
      <Altrone>
        <TestComponent />
      </Altrone>
    );

    const enLabel = screen.getByRole('button');
    expect(enLabel).toHaveTextContent('Apply');
  });

  test('should RU locale works correctly', () => {
    render(
      <Altrone lang="ru">
        <TestComponent />
      </Altrone>
    );

    const enLabel = screen.getByRole('button');
    expect(enLabel).toHaveTextContent('Применить');
  });
});
