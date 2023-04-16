import '../../index.scss';
import clsx from 'clsx';
import { Theme, ThemeConfig } from '../../types';
import { ThemeContext } from '../../contexts';
import { FC, PropsWithChildren } from 'react';
import { useMediaMatch } from '../../hooks';

export const Altrone: FC<PropsWithChildren<Partial<ThemeConfig>>> = ({
  children,
  theme = Theme.system,
  locale = 'en-US',
  lang = 'en',
  style = {},
  className
}) => {
  try {
    // @ts-ignore
    Intl.getCanonicalLocales(locale);
  } catch (err) {
    locale = 'en-US';
  }

  let _theme = theme;
  const mediaScheme = useMediaMatch('(prefers-color-scheme: dark)');

  if (theme === Theme.system) {
    _theme = mediaScheme ? Theme.dark : Theme.light;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: _theme,
        locale,
        lang
      }}>
      <div
        className={clsx('altrone', className, {
          'altrone--dark': _theme === Theme.dark
        })}
        style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
