import { useRef } from 'react';
import { SearchProps } from './Search.types.ts';
import { TextInput } from 'components/textInput';
import { Search as SearchIcon, Delete } from 'lucide-react';
import { useConfiguration } from 'components/configuration';
import { useLocalization } from 'components/application';
import { AutocompleteInput } from 'components/autocompleteInput';
import { ArrayUtils, mergeRefs } from 'utils';
import clsx from 'clsx';
import s from './search.module.scss';

const GET_SUGGESTIONS_MOCK = () => [];

export const Search = ({
  ref,
  showControls,
  children,
  className,
  style,
  placeholder,
  getSuggestions,
  ...restProps
}: SearchProps) => {
  const t = useLocalization();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { search: searchConfig = {} } = useConfiguration();

  const haveValue = Boolean(restProps.value);

  const needToShowControl = Boolean(
    (showControls ?? searchConfig.showControls ?? true) && haveValue,
  );

  const safeChildren = ArrayUtils.getSafeArray(children);

  const cls = clsx(
    s.Search,
    {
      [s.Empty]: !haveValue,
    },
    searchConfig.className,
    className,
  );
  const styles = {
    ...searchConfig.style,
    ...style,
  };

  const placeholderCls = clsx(s.Placeholder, {
    [s.DisabledPlaceholder]: restProps.disabled,
  });

  const placeholderText =
    typeof placeholder === 'string' ? placeholder : t('search.placeholder');

  const onClearClick = () => {
    if (typeof window === 'undefined' || !inputRef.current) return;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value',
    )?.set;
    nativeInputValueSetter?.call(inputRef.current, '');

    const changeEvent = new Event('change', { bubbles: true });
    inputRef.current.dispatchEvent(changeEvent);
  };

  return (
    <AutocompleteInput
      ref={mergeRefs(inputRef, ref)}
      className={cls}
      style={styles}
      {...restProps}
      type="search"
      getSuggestions={getSuggestions || GET_SUGGESTIONS_MOCK}
      showControls={needToShowControl}
    >
      {haveValue && (
        <TextInput.IconIsland icon={<SearchIcon />} placement="left" />
      )}
      {haveValue ? safeChildren : null}
      {needToShowControl ? (
        <TextInput.ActionIsland
          placement="right"
          label={t('common.clear')}
          showLabel={false}
          disabled={restProps.disabled}
          onClick={onClearClick}
          icon={<Delete />}
        />
      ) : null}
      {!haveValue ? (
        <div className={placeholderCls}>
          <div className={s.PlaceholderIcon}>
            <SearchIcon />
          </div>
          <div className={s.PlaceholderText}>{placeholderText}</div>
        </div>
      ) : null}
    </AutocompleteInput>
  );
};
