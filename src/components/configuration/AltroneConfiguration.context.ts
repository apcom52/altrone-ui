import React, { useContext } from 'react';
import { DEFAULT_CONFIGURATION } from './AltroneConfiguration.const.ts';

export interface BasicComponentStyleConfig {
  className?: string;
  style?: React.CSSProperties;
}

type ComponentConfiguration<ExtraProps extends object> = Partial<
  BasicComponentStyleConfig & ExtraProps
>;

export interface ConsumerConfigurationContext {
  baseComponent?: ComponentConfiguration<{
    element: any;
  }>;
}

export const ConfigurationContext =
  React.createContext<ConsumerConfigurationContext>(DEFAULT_CONFIGURATION);
export const useConfiguration = () => useContext(ConfigurationContext);
