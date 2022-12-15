import '../../index.scss'
import clsx from "clsx";
import {Theme, ThemeConfig} from "../../types";
import {ThemeContext} from "../../contexts";
import {FC, PropsWithChildren} from "react";

export const Altrone: FC<PropsWithChildren<Partial<ThemeConfig>>> = ({ children, theme = Theme.light, locale = 'en-US', lang = 'en', style = {} }) => {
  try {
    // @ts-ignore
    Intl.getCanonicalLocales(locale)
  } catch (err) {
    locale = 'en-US'
  }

  // let themeConfig = useThemeContext() || {}
  //
  // console.log(themeConfig);
  //
  // let isFirstWrap = Boolean(themeConfig.locale)

  let isFirstWrap = true

  return isFirstWrap
    ? <ThemeContext.Provider value={{
      theme,
      locale,
      lang
    }}>
      <div className={clsx('altrone', {
        'altrone--dark': theme === Theme.dark
      })} style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
    : <ThemeContext.Provider value={{
        theme,
        locale,
        lang
      }}>
        {children}
      </ThemeContext.Provider>
}