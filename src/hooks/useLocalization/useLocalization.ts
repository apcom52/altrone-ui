import { useThemeContext } from '../../contexts';
import { useCallback, useMemo } from 'react';
import get from 'lodash-es/get';
import { en, ru } from '../../assets/locales';
import { NestedKeys } from '../../utils/NestedKeys';
import { Localization } from '../../types/Localization';

type translationOptions = {
  defaultValue?: string;
  value?: number;
  plural?: boolean;
  vars?: Record<string, any>;
};

export const useLocalization = () => {
  const { lang } = useThemeContext();

  const dictionary = useMemo(() => {
    return lang === 'ru' ? ru : en;
  }, [lang]);

  return useCallback(
    (t: NestedKeys<Localization>, config?: translationOptions) => {
      const { defaultValue, value = 0, plural = false, vars = {} } = config || {};
      let localeString = '';

      if (plural) {
        const rule = new Intl.PluralRules(lang).select(value);
        localeString = get(dictionary, t + `.${rule}`, defaultValue || t);
      } else {
        localeString = get(dictionary, t, defaultValue || t);
      }

      for (const variable in vars) {
        localeString = localeString.replace(`{{${variable}}}`, vars[variable]);
      }

      return localeString;
    },
    [dictionary]
  );
};
