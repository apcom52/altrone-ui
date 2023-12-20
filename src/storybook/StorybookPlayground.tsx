import React, { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { Option, Theme } from '../types';
import './storybook-playground.scss';
import { Altrone } from '../hocs';
import {
  Button,
  ButtonVariant,
  Checkbox,
  FloatingBox,
  Form,
  FormField,
  FormGroup,
  FormGroupVariant,
  Icon,
  NumberInput,
  Select,
  TextInput
} from '../components';
import { Story } from '@storybook/react';
import clsx from 'clsx';
import { AltroneOptions } from '../hocs/Altrone/Altrone.types';
import { DEFAULT_ALTRONE_OPTIONS } from '../hocs/Altrone/Altrone.const';
import { NestedKeys } from '../utils/NestedKeys';
import set from 'lodash/set';

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

type KeysOfAltroneOptions = NestedKeys<AltroneOptions>;

export const StorybookPlayground = ({
  children,
  showBackground = false
}: StorybookPlaygroundProps) => {
  const [theme, setTheme] = useState<Theme>(Theme.light);
  const [lang, setLang] = useState<Lang>('en');
  const [locale, setLocale] = useState('en-US');
  const [options, setOptions] = useState<AltroneOptions>(DEFAULT_ALTRONE_OPTIONS);

  const changeOption = useCallback((fieldName: KeysOfAltroneOptions, value: any) => {
    setOptions((old) => {
      const copy = JSON.parse(JSON.stringify(old));

      set(copy, fieldName, value);
      return copy;
    });
  }, []);

  const optionsButtonRef = useRef<HTMLButtonElement>(null);

  const [visibleOptions, setVisibleOptions] = useState(false);

  return (
    <Altrone theme={theme} lang={lang} locale={locale} options={options}>
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
          minWidth={240}
          useParentWidth>
          <b className="sb-settings-popup__header">Altrone Options</b>
          <Form>
            <FormField label="Global">
              <Checkbox
                checked={Boolean(options.global.reduceMotion)}
                onChange={(value) => changeOption('global.reduceMotion', value)}>
                Reduce Motion
              </Checkbox>
            </FormField>
            <FormField label="Modal">
              <Checkbox
                checked={Boolean(options.modal.reduceMotion)}
                onChange={(value) => changeOption('modal.reduceMotion', value)}>
                Reduce Motion
              </Checkbox>
            </FormField>
            <FormField label="Carousel">
              <Checkbox
                checked={Boolean(options.carousel.reduceMotion)}
                onChange={(value) => changeOption('carousel.reduceMotion', value)}>
                Reduce Motion
              </Checkbox>
            </FormField>
            <FormField label="NumberInput">
              <Checkbox
                checked={Boolean(options.numberInput.useFormatFromLocale)}
                onChange={(value) => changeOption('numberInput.useFormatFromLocale', value)}>
                Use Format from Locale
              </Checkbox>
            </FormField>
            <FormField label="Spoiler">
              <Checkbox
                checked={Boolean(options.spoiler.reduceMotion)}
                onChange={(value) => changeOption('spoiler.reduceMotion', value)}>
                Reduce Motion
              </Checkbox>
            </FormField>
            <FormField label="PhotoViewer">
              <Checkbox
                checked={Boolean(options.photoViewer.openDescriptionByDefault)}
                onChange={(value) => changeOption('photoViewer.openDescriptionByDefault', value)}>
                Open Description by Default
              </Checkbox>
            </FormField>
            <FormField label="FloatingBox">
              <FormGroup variant={FormGroupVariant.row}>
                <FormField label="Offset">
                  <NumberInput
                    value={options.floatingBox.offset}
                    onChange={(value) => changeOption('floatingBox.offset', value)}
                  />
                </FormField>
                <FormField label="Window Offset">
                  <NumberInput
                    value={options.floatingBox.windowOffset}
                    onChange={(value) => changeOption('floatingBox.windowOffset', value)}
                  />
                </FormField>
              </FormGroup>
            </FormField>
          </Form>
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
