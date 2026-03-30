import {
  ConfigurationContext,
  ConsumerConfigurationContext,
  useConfiguration,
  DEFAULT_CONFIGURATION,
} from './AltroneConfiguration.context.ts';
import { merge, isEqual } from 'lodash-es';
import { PropsWithChildren, useRef } from 'react';

export const Configuration = ({
  children,
  ...props
}: PropsWithChildren<Partial<ConsumerConfigurationContext>>) => {
  const parentContext = useConfiguration();

  // Ref-based deep memoization: recompute only when inputs actually change.
  // Standard useMemo with shallow deps would re-run on every render because
  // ...props always produces a new object reference.
  const prevInputRef = useRef<[ConsumerConfigurationContext, Partial<ConsumerConfigurationContext>]>(
    [parentContext, props],
  );
  const valueRef = useRef<ConsumerConfigurationContext>(
    merge({}, DEFAULT_CONFIGURATION, parentContext, props),
  );

  if (
    !isEqual(prevInputRef.current[0], parentContext) ||
    !isEqual(prevInputRef.current[1], props)
  ) {
    prevInputRef.current = [parentContext, props];
    valueRef.current = merge({}, DEFAULT_CONFIGURATION, parentContext, props);
  }

  return (
    <ConfigurationContext.Provider value={valueRef.current}>
      {children}
    </ConfigurationContext.Provider>
  );
};
