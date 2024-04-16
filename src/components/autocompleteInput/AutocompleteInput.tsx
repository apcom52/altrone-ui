import { forwardRef, useCallback, useMemo, useState } from 'react';
import { AutocompleteInputProps } from './AutocompleteInput.types.ts';
import { TextInput } from '../textInput';
import { Icon } from '../icon';
import { getSafeArray, useDebouncedMemo } from '../../utils';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';
import { useDebouncedEffect } from '../../utils/hooks/useDebouncedEffect.ts';

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(({ children, className, style, getSuggestions, ...restProps }, ref) => {
  const { passwordInput: passwordInputConfig = {} } = useConfiguration();

  const [activeIndex, setActiveIndex] = useState(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const safeChildren = getSafeArray(children);

  const cls = clsx(passwordInputConfig.className, className);
  const styles = {
    ...passwordInputConfig.style,
    ...style,
  };

  useDebouncedEffect(
    async () => {
      if (restProps.value.trim().length === 0) {
        return;
      }

      const _suggestions = await getSuggestions({ value: restProps.value });
      setSuggestions(_suggestions);
    },
    [restProps.value, getSuggestions],
    300,
    true,
  );

  console.log('>> suggestions', suggestions);

  return (
    <TextInput className={cls} style={styles} {...restProps}>
      {...safeChildren}
    </TextInput>
  );
});
