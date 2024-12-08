import { AltroneApplication } from '../../components';
import s from './decorator.module.scss';
import { useEffect } from 'react';

export const StorybookDecorator = (Story: any, options: any) => {
  useEffect(() => {
    document.body.classList.toggle(
      s.WithImage,
      options.globals.backgrounds
        ? options.globals.backgrounds.value === 'image'
        : false,
    );
  }, [options.globals.backgrounds?.value]);

  return (
    <AltroneApplication
      className={s.Wrapper}
      theme={options.globals.theme === 'dark' ? 'dark' : 'light'}
      language={options.globals.lang || 'en'}
      config={{
        locale: {
          locale: options.globals.lang === 'RU' ? 'ru-RU' : 'en-US',
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
      <Story />
    </AltroneApplication>
  );
};
