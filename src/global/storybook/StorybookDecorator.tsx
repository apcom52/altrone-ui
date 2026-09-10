import { AltroneApplication } from '../../components';
import s from './decorator.module.scss';
import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';

export const StorybookDecorator = (Story: any, options: any) => {
  const reduceMotion = options.globals.reduceMotion === 'on';
  const accent = options.globals.accent || 'blue';
  const backgroundValue: string = options.globals.backgrounds?.value ?? '';

  useEffect(() => {
    document.body.classList.toggle(
      'sb-bg-cover',
      backgroundValue.includes('url('),
    );
  }, [backgroundValue]);

  /* Mirror the accent onto <html> so the accent-based Storybook pattern
     backgrounds (painted on <body>) resolve `--accent-*`. Do NOT stamp
     `data-altrone-root` here — it is the portal anchor (`document.querySelector`
     in Popover/Dropdown), and a second match on <html> would pull every portal
     out of the `.AltroneApp` cascade. The gray/background tokens the other
     patterns need are bridged in `preview.css` instead. `data-altrone-theme` is
     already mirrored to <html> by `AltroneApplication`. */
  useEffect(() => {
    document.documentElement.setAttribute('data-altrone-accent', accent);
    /* Clean up the attribute an earlier build of this decorator used to set —
       otherwise portals (Popover/Dropdown) anchor to <html> and lose the
       `.AltroneApp` token scope. */
    document.documentElement.removeAttribute('data-altrone-root');
  }, [accent]);

  useEffect(() => {
    document.documentElement.classList.toggle('sb-reduce-motion', reduceMotion);
  }, [reduceMotion]);

  const fullBleed = options.parameters?.layout === 'fullscreen';

  return (
    <AltroneApplication
      className={fullBleed ? s.WrapperBleed : s.Wrapper}
      theme={options.globals.theme === 'dark' ? 'dark' : 'light'}
      language={options.globals.lang || 'en'}
      accent={options.globals.accent || 'blue'}
      config={{
        locale: {
          locale:
            options.globals.lang === 'RU'
              ? 'ru-RU'
              : options.globals.lang === 'FR'
              ? 'fr-FR'
              : options.globals.lang === 'GE'
              ? 'ge-GE'
              : options.globals.lang === 'SP'
              ? 'sp-SP'
              : 'en-US',
        },
      }}
      customLabels={{
        path: {
          to: {
            test: 'Test',
          },
        },
      }}
    >
      {/* Innermost MotionConfig wins over AltroneApplication's own
          `reducedMotion="user"`, so the toolbar toggle can force it. */}
      <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>
        <Story />
      </MotionConfig>
    </AltroneApplication>
  );
};
