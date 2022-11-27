import '../../index.scss'
import clsx from "clsx";
import {Theme, ThemeConfig} from "../../types";
import {ThemeContext} from "../../contexts";

export const withAltrone = (Component, config: ThemeConfig) => (props) => {
  let { theme, locale = 'en-US', style, lang = document.documentElement.lang || 'en' } = config

  try {
    // @ts-ignore
    Intl.getCanonicalLocales(locale)
  } catch (err) {
    locale = 'en-US'
  }

  return <ThemeContext.Provider value={{
    theme,
    locale,
    lang
  }}>
    <div className={clsx('altrone', {
      'altrone--dark': theme === Theme.dark
    })} style={style}>
      <Component {...props} />
    </div>
  </ThemeContext.Provider>
}