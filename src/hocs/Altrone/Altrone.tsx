import '../../index.scss';
import clsx from 'clsx';
import { Theme, ThemeConfig } from '../../types';
import { ThemeContext } from '../../contexts';
import { FC, PropsWithChildren } from 'react';
import { useMediaMatch } from 'rooks';

export const Altrone: FC<PropsWithChildren<Partial<ThemeConfig>>> = ({
  children,
  theme = Theme.system,
  locale = 'en-US',
  lang = 'en',
  style = {}
}) => {
  try {
    // @ts-ignore
    Intl.getCanonicalLocales(locale);
  } catch (err) {
    locale = 'en-US';
  }

  const mediaScheme = useMediaMatch('(prefers-color-scheme: dark)');

  let isFirstWrap = true;
  let _theme = theme;

  if (theme === Theme.system) {
    _theme = mediaScheme ? Theme.dark : Theme.light;
  }

  return isFirstWrap ? (
    <ThemeContext.Provider
      value={{
        theme: _theme,
        locale,
        lang
      }}>
      <div
        className={clsx('altrone', {
          'altrone--dark': _theme === Theme.dark
        })}
        style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
  ) : (
    <ThemeContext.Provider
      value={{
        theme,
        locale,
        lang
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
