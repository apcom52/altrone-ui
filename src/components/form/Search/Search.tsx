import { TextInput, TextInputProps } from '../TextInput';
import { useLocalization } from '../../../hooks';
import React from 'react';
import { Icon } from '../../icons';
import './search.scss';
import clsx from 'clsx';

export const Search = ({ value, placeholder = '', className, ...props }: TextInputProps) => {
  const t = useLocalization();

  return (
    <TextInput value={value} className={clsx('alt-search', className)} {...props}>
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
