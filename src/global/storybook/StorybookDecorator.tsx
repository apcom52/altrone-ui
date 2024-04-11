import { AltroneApplication } from 'components';
import { Theme } from '../../components/application/AltroneApplication.types.ts';
import s from './decorator.module.scss';
import { useEffect } from 'react';

export const StorybookDecorator = (Story: any, options: any) => {
  useEffect(() => {
    document.body.classList.toggle(
      s.WithImage,
      options.globals.backgrounds.value === 'image',
    );
  }, [options.globals.backgrounds.value]);

  return (
    <AltroneApplication
      className={s.Wrapper}
      theme={options.globals.theme === 'dark' ? Theme.dark : Theme.light}
    >
      <Story />
    </AltroneApplication>
  );
};
