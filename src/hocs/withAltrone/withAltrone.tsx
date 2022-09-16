import '../../index.scss'
import clsx from "clsx";
import {Theme, ThemeConfig} from "../../types";

export const withAltrone = (Component, config: ThemeConfig) => (props) => {
  const { theme } = config

  return <div className={clsx('altrone', {
    'altrone--dark': theme === Theme.dark
  })}>
    <Component {...props} />
  </div>
}