import React, { PropsWithChildren, useState } from 'react';
import { Option, Theme } from '../types';
import './storybook-playground.scss';
import { Altrone } from '../hocs';
import { Select, TextInput } from '../components';

const THEMES: Option<Theme>[] = [
  {
    label: 'Светлая',
    value: Theme.light
  },
  {
    label: 'Темная',
    value: Theme.dark
  }
];

type Lang = 'en' | 'ru';

const LANGS: Option<Lang>[] = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'Russian',
    value: 'ru'
  }
];

export const StorybookPlayground = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(Theme.light);
  const [lang, setLang] = useState<Lang>('en');
  const [locale, setLocale] = useState('en-US');

  return (
    <Altrone theme={theme} lang={lang} locale={locale}>
      <div className="sb-playground">
        <div className="sb-playground__header">
          <div>
            <Select options={THEMES} value={theme} onChange={setTheme} />
          </div>
          <div />
          <div>
            <Select options={LANGS} value={lang} onChange={setLang} />
          </div>
          <div>
            <TextInput value={locale} onChange={setLocale} />
          </div>
        </div>
        <div className="sb-playground__content">{children}</div>
      </div>
    </Altrone>
  );
};
