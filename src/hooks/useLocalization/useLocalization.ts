import {useThemeContext} from "../../contexts";
import {useCallback, useMemo} from "react";
import {get} from "lodash";
import en from '../../assets/locales/en.json';
import ru from '../../assets/locales/ru.json';

type translationOptions = {
  defaultValue?: string
  plural?: boolean
  vars?: Record<string, unknown>
}

export const useLocalization = () => {
  const { lang } = useThemeContext()

  const dictionary = useMemo(() => {
    return lang === 'ru' ? ru : en
  }, [lang])

  return useCallback((t: string, {defaultValue, plural = false, vars = {}}: translationOptions = {}) => {
    const value = get(dictionary, t, defaultValue || t)
    return value
  }, [dictionary])
}