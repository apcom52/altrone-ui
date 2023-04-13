import { InputIslandType, TextInput, TextInputProps } from '../TextInput';
import { useLocalization } from '../../../hooks';
import React from 'react';
import { Icon } from '../../icons';
import './search.scss';
import clsx from 'clsx';

export const Search = ({
  value,
  onChange,
  placeholder = '',
  className,
  ...props
}: TextInputProps) => {
  const t = useLocalization();

  return (
    <TextInput
      value={value}
      onChange={onChange}
      className={clsx('alt-search', className)}
      {...props}
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
