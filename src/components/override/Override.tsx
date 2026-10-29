import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import s from '../application/altroneApplication.module.scss';
import { AltroneIcons } from '../application/useIcons.tsx';
import { AltroneLocalization } from '../application/useLocalization.tsx';
import { ThemeContext, ThemeContextType } from '../application/useTheme.ts';
import { OverrideProps } from './Override.types.ts';

export const Override = ({
  ref,
  theme,
  accent,
  language,
  customLabels,
  icons,
  className,
  children,
  ...props
}: OverrideProps) => {
  const parent = useContext(ThemeContext);
  const themeContext = useMemo<ThemeContextType | null>(
    () =>
      theme
        ? {
            theme,
            themePreference: theme,
            setTheme: parent?.setTheme ?? (() => null),
          }
        : parent,
    [theme, parent],
  );

  return (
    <div
      ref={ref}
      className={clsx(s.AltroneApp, className)}
      data-altrone-root="true"
      data-altrone-accent={accent}
      data-altrone-theme={themeContext?.theme}
      {...props}
    >
      <ThemeContext.Provider value={themeContext}>
        <AltroneLocalization language={language} customLabels={customLabels}>
          <AltroneIcons icons={icons}>{children}</AltroneIcons>
        </AltroneLocalization>
      </ThemeContext.Provider>
    </div>
  );
};
