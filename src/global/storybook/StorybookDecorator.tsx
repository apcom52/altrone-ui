import { AltroneApplication } from '../../components';
import s from './decorator.module.scss';
import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';

export const StorybookDecorator = (Story: any, options: any) => {
  const reduceMotion = options.globals.reduceMotion === 'on';

  useEffect(() => {
    document.body.classList.toggle(
      s.WithImage,
      options.globals.backgrounds
        ? options.globals.backgrounds.value === 'image'
        : false,
    );
  }, [options.globals.backgrounds?.value]);

  useEffect(() => {
    document.documentElement.classList.toggle('sb-reduce-motion', reduceMotion);
  }, [reduceMotion]);

  return (
    <AltroneApplication
      className={s.Wrapper}
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
