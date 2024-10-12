import { Localization, en, ru } from 'locales';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { NestedKeys } from 'utils';
import { get, merge } from 'lodash-es';

interface LocalizationProps extends PropsWithChildren {
  language: 'en' | 'ru';
  customLabels: Partial<Localization>;
}

interface LocalizationContextType {
  language: string;
  dictionary: Record<string, any>;
}

type translationOptions = {
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

export const AltroneLocalization = ({
  language = 'en',
  customLabels = {},
  children,
}: LocalizationProps) => {
  const context = useMemo(() => {
    const lang = language.toLowerCase() || 'en';
    const dictionary = merge({}, lang === 'ru' ? ru : en, customLabels);

    return {
      language: lang,
      dictionary,
    };
  }, [language, customLabels]);

  return (
    <LocalizationContext.Provider value={context}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const { language, dictionary } = useLocalizationContext();

  const lang = language.toLowerCase();

  return useCallback(
    (t: NestedKeys<Localization> | string, config?: translationOptions) => {
      const {
        defaultValue,
        value = 0,
        plural = false,
        vars = {},
      } = config || {};
      let localeString = '';

      if (plural) {
        const rule = new Intl.PluralRules(lang).select(value);
        localeString = get(dictionary, t + `.${rule}`, defaultValue || t);
      } else {
        localeString = get(dictionary, t, defaultValue || t) as string;
      }

      for (const variable in vars) {
        localeString = localeString.replace(`{{${variable}}}`, vars[variable]);
      }

      return localeString;
    },
    [dictionary, lang],
  );
};
