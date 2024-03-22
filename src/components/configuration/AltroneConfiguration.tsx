import {
  ConfigurationContext,
  ConsumerConfigurationContext,
  useConfiguration,
} from './AltroneConfiguration.context.ts';
import { merge, isEqual } from 'lodash';
import useMemo from 'rc-util/lib/hooks/useMemo';
import { PropsWithChildren } from 'react';
import { DEFAULT_CONFIGURATION } from './AltroneConfiguration.const.ts';

export const AltroneConfiguration = ({
  children,
  ...props
}: PropsWithChildren<Partial<ConsumerConfigurationContext>>) => {
  const parentContext = useConfiguration();

  const mergedContext = merge({}, DEFAULT_CONFIGURATION, parentContext, props);

  console.log('merged', mergedContext);

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
