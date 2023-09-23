import React, { PropsWithChildren, useRef, useState } from 'react';
import { Option, Theme } from '../types';
import './storybook-playground.scss';
import { Altrone } from '../hocs';
import {
  Button,
  ButtonVariant,
  Checkbox,
  CheckboxList,
  FloatingBox,
  Icon,
  Select,
  TextInput
} from '../components';
import { Story } from '@storybook/react';
import clsx from 'clsx';

const THEMES: Option<Theme>[] = [
  {
    label: 'Light',
    value: Theme.light
  },
  {
    label: 'Dark',
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

interface StorybookPlaygroundProps extends PropsWithChildren {
  showBackground?: boolean;
}

export const StorybookPlayground = ({
  children,
  showBackground = false
}: StorybookPlaygroundProps) => {
  const [theme, setTheme] = useState<Theme>(Theme.light);
  const [lang, setLang] = useState<Lang>('en');
  const [locale, setLocale] = useState('en-US');

  const optionsButtonRef = useRef<HTMLButtonElement>(null);

  const [visibleOptions, setVisibleOptions] = useState(false);

  return (
    <Altrone theme={theme} lang={lang} locale={locale}>
      <div
        className={clsx('sb-playground', {
          'sb-playground--with-background': showBackground
        })}>
        <div className="sb-playground__header">
          <div>
            <Select options={THEMES} value={theme} onChange={setTheme} />
          </div>
          <div />
          <div>
            <Button
              ref={optionsButtonRef}
              variant={ButtonVariant.text}
              onClick={() => setVisibleOptions(!visibleOptions)}
              isIcon>
              <Icon i="settings" />
            </Button>
          </div>
          <div>
            <Select options={LANGS} value={lang} onChange={setLang} />
          </div>
          <div>
            <TextInput value={locale} onChange={setLocale} />
          </div>
        </div>
        <div className="sb-playground__content">{children}</div>
      </div>
      {visibleOptions && (
        <FloatingBox
          className="sb-settings-popup"
          targetElement={optionsButtonRef.current}
          onClose={() => setVisibleOptions(false)}
          minWidth="300px"
          useParentWidth={false}>
          <b className="sb-settings-popup__header">Altrone Options</b>
          <CheckboxList>
            <Checkbox checked={false} onChange={() => null}>
              Number Format from Locale
            </Checkbox>
            <Checkbox checked={false} onChange={() => null}>
              Reduce motion
            </Checkbox>
          </CheckboxList>
        </FloatingBox>
      )}
    </Altrone>
  );
};

export const StorybookDecorator = (Story: Story) => {
  return (
    <StorybookPlayground>
      <Story />
    </StorybookPlayground>
  );
};

export const StorybookBackgroundDecorator = (Story: Story) => {
  return (
    <StorybookPlayground showBackground>
      <Story />
    </StorybookPlayground>
  );
};
