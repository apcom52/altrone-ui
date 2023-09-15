import React from 'react';
import { Icon } from '../../icons';
import { useLocalization } from '../../../hooks';

export const DefaultHomeBreadcrumb = () => {
  const t = useLocalization();

  return (
    <>
      <span className="alt-breadcrumb-item__icon">
        <Icon i="home" />
      </span>
      {t('list.breadcrumbs.home')}
    </>
  );
};
