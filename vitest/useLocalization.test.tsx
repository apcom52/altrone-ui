import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Application } from '../src/components';
import { useLocalization } from '../src/components/application';
import type { Language } from '../src/components/application/Application.types.ts';

const Probe = () => {
  const t = useLocalization();
  return <div data-testid="probe">{t('common.close')}</div>;
};

const renderWithLanguage = (language: Language) =>
  render(
    <Application language={language}>
      <Probe />
    </Application>,
  );

describe('useLocalization', () => {
  test.each([
    ['de', 'Schließen'],
    ['es', 'Cerrar'],
    ['zh', '关闭'],
    ['pt', 'Fechar'],
    ['tr', 'Kapat'],
  ] as const)('resolves %s to its dictionary', (language, expected) => {
    renderWithLanguage(language);
    expect(screen.getByTestId('probe')).toHaveTextContent(expected);
  });

  test('a plural rule resolves for tr without throwing (no plural inflection, "other" covers every count)', () => {
    const Plural = () => {
      const t = useLocalization();
      return (
        <div data-testid="plural">
          {t('dataTable.shownRows', {
            plural: true,
            value: 5,
            vars: { count: 5 },
          })}
        </div>
      );
    };

    render(
      <Application language="tr">
        <Plural />
      </Application>,
    );

    expect(screen.getByTestId('plural')).toHaveTextContent('5 satır gösteriliyor');
  });

  test('a plural rule resolves for zh without throwing (no plural inflection, "other" covers every count)', () => {
    const Plural = () => {
      const t = useLocalization();
      return (
        <div data-testid="plural">
          {t('dataTable.shownRows', {
            plural: true,
            value: 5,
            vars: { count: 5 },
          })}
        </div>
      );
    };

    render(
      <Application language="zh">
        <Plural />
      </Application>,
    );

    expect(screen.getByTestId('plural')).toHaveTextContent('显示 5 行');
  });
});
