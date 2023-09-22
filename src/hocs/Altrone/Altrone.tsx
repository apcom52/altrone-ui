import '../../index.scss';
import clsx from 'clsx';
import { Theme } from '../../types';
import { ThemeContext } from '../../contexts';
import { useMediaMatch } from '../../hooks';
import { AltroneProps } from './Altrone.types';
import { DEFAULT_ALTRONE_OPTIONS } from './Altrone.const';

export const Altrone = ({
  children,
  theme = Theme.system,
  locale = 'en-US',
  lang = 'en',
  style = {},
  className,
  options = {}
}: AltroneProps) => {
  let _theme = theme;
  const mediaScheme = useMediaMatch('(prefers-color-scheme: dark)');

  if (theme === Theme.system) {
    _theme = mediaScheme ? Theme.dark : Theme.light;
  }

  const altroneOptions = {
    ...DEFAULT_ALTRONE_OPTIONS,
    ...options
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        lang,
        locale,
        options: altroneOptions
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
