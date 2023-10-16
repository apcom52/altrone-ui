import merge from 'lodash-es/merge';
import { ThemeContext, useThemeContext } from '../../contexts';
import { AltroneOptions as AltroneOptionsType } from '../Altrone/Altrone.types';
import { PropsWithChildren } from 'react';

interface AltroneOptionsProps {
  options: Partial<AltroneOptionsType>;
}

export const AltroneOptions = ({
  options = {},
  children
}: PropsWithChildren<AltroneOptionsProps>) => {
  const { options: parentOptions, ...rest } = useThemeContext();

  const altroneOptions = merge(parentOptions, options);

  return (
    <ThemeContext.Provider
      value={{
        ...rest,
        options: altroneOptions
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
