import { AltroneApplication } from '../../components/application/AltroneApplication.tsx';
import { Theme } from '../../components/application/AltroneApplication.types.ts';
import s from './decorator.module.scss';

export const StorybookDecorator = (Story: any, options: any) => {
  return (
    <AltroneApplication
      className={s.Wrapper}
      theme={options.globals.theme === 'light' ? Theme.light : Theme.dark}
    >
      <Story />
    </AltroneApplication>
  );
};
