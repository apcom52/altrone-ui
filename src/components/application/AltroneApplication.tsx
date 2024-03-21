import s from './altroneApplication.module.scss';
import { PropsWithChildren } from 'react';

export const AltroneApplication = ({ children }: PropsWithChildren) => {
  return <div className={s.AltroneApp}>{children}</div>;
};
