import { InputIslandType, TextInput, TextInputProps } from '../TextInput';
import { useLocalization } from '../../../hooks';
import { useState } from 'react';
import { Icon } from '../../typography';
import './search.scss';
import clsx from 'clsx';
import { useDebouncedValue, useDidUpdate } from 'rooks';

interface SearchProps
  extends Omit<
    TextInputProps,
    'suggestions' | 'rightIsland' | 'suffix' | 'rightIcon' | 'leftIsland' | 'prefix' | 'leftIcon'
  > {
  suggestions?: (searchValue: string) => Promise<string[]>;
}

export const Search = ({
  value,
  onChange,
  placeholder = '',
  className,
  suggestions,
  ...props
}: SearchProps) => {
  const t = useLocalization();

  const [debouncedSearchValue] = useDebouncedValue(value, 500);
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);

  useDidUpdate(() => {
    const getSuggestions = async () => {
      if (debouncedSearchValue && debouncedSearchValue.trim().length > 0 && suggestions) {
        const results = await suggestions(debouncedSearchValue);
        setSuggestionsList(results);
      }
    };

    if (suggestions) {
      getSuggestions();
    }
  }, [debouncedSearchValue, suggestions]);

  return (
    <TextInput
      type="search"
      value={value}
      onChange={onChange}
      className={clsx('alt-search', className)}
      {...props}
      suggestions={suggestionsList}
      leftIsland={undefined}
      prefix={undefined}
      leftIcon={undefined}
      suffix={undefined}
      rightIcon={undefined}
      rightIsland={
        value
          ? {
              type: InputIslandType.actions,
              content: [
                {
                  icon: <Icon i="backspace" />,
                  title: t('common.clear'),
                  onClick: () => onChange('')
                }
              ]
            }
          : undefined
      }>
      {!value && (
        <div className="alt-search-placeholder">
          <span className="alt-search-placeholder__icon">
            <Icon i="search" />
          </span>
          {placeholder || t('common.search')}
        </div>
      )}
    </TextInput>
  );
};
