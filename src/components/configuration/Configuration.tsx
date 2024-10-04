import {
  ConfigurationContext,
  ConsumerConfigurationContext,
  useConfiguration,
  DEFAULT_CONFIGURATION,
} from './AltroneConfiguration.context.ts';
import { merge, isEqual } from 'lodash-es';
import useMemo from 'rc-util/lib/hooks/useMemo';
import { PropsWithChildren } from 'react';

export const Configuration = ({
  children,
  ...props
}: PropsWithChildren<Partial<ConsumerConfigurationContext>>) => {
  const parentContext = useConfiguration();

  const mergedContext = merge({}, DEFAULT_CONFIGURATION, parentContext, props);

  const memoedContextValue = useMemo(
    () => {
      return mergedContext;
    },
    [parentContext, props],
    (prev, next) => {
      return isEqual(prev, next);
    },
  );

  return (
    <ConfigurationContext.Provider value={memoedContextValue}>
      {children}
    </ConfigurationContext.Provider>
  );
};
