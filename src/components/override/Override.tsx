import clsx from 'clsx';
import { useMemo } from 'react';
import s from '../application/altroneApplication.module.scss';
import { AltroneIcons } from '../application/useIcons.tsx';
import { AltroneLocalization } from '../application/useLocalization.tsx';
import { ThemeContext, useAltroneTheme } from '../application/useTheme.ts';
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
  const parent = useAltroneTheme();
  const resolvedTheme = theme ?? parent.theme;

  const themeContext = useMemo(
    () => ({ theme: resolvedTheme, setTheme: parent.setTheme }),
    [resolvedTheme, parent.setTheme],
  );

  return (
    <div
      ref={ref}
      className={clsx(s.AltroneApp, className)}
      data-altrone-root="true"
      data-altrone-accent={accent}
      data-altrone-theme={resolvedTheme === 'auto' ? undefined : resolvedTheme}
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
