import { Localization, en, ru, de, fr, es, zh, pt, tr } from 'locales';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { NestedKeys } from 'utils';
import { get, merge } from 'lodash-es';
import { Language } from './Application.types.ts';

interface LocalizationProps extends PropsWithChildren {
  language?: Language;
  customLabels?: Partial<Localization>;
}

interface LocalizationContextType {
  language: string;
  dictionary: Localization;
}

type TranslationOptions = {
  defaultValue?: string;
  value?: number;
  plural?: boolean;
  vars?: Record<string, any>;
};

const LocalizationContext = createContext<LocalizationContextType>({
  language: 'en',
  dictionary: en,
});
export const useLocalizationContext = () => useContext(LocalizationContext);

const DICTIONARIES = {
  en,
  ru,
  fr,
  de,
  es,
  zh,
  pt,
  tr,
};

export const AltroneLocalization = ({
  language,
  customLabels = {},
  children,
}: LocalizationProps) => {
  const parent = useLocalizationContext();

  const context = useMemo(() => {
    if (!language) {
      return {
        language: parent.language,
        dictionary: merge({}, parent.dictionary, customLabels),
      };
    }

    const dictionary = merge(
      {},
      DICTIONARIES[language as keyof typeof DICTIONARIES] || en,
      customLabels,
    );

    return {
      language,
      dictionary,
    };
  }, [language, customLabels, parent]);

  return (
    <LocalizationContext.Provider value={context}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const { language, dictionary } = useLocalizationContext();

  return useCallback(
    (t: NestedKeys<Localization> | string, config?: TranslationOptions) => {
      const {
        defaultValue,
        value = 0,
        plural = false,
        vars = {},
      } = config || {};
      let localeString = '';

      if (plural) {
        const rule = new Intl.PluralRules(language).select(value);
        localeString = get(dictionary, t + `.${rule}`, defaultValue || t);
      } else {
        localeString = get(dictionary, t, defaultValue || t) as string;
      }

      for (const variable in vars) {
        localeString = localeString.replace(`{{${variable}}}`, vars[variable]);
      }

      return localeString;
    },
    [dictionary, language],
  );
};
