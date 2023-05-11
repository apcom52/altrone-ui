import React from 'react';
import { Icon } from '../../icons';

export const DefaultHomeBreadcrumb = () => {
  return (
    <>
      <span className="alt-breadcrumb-item__icon">
        <Icon i="home" />
      </span>
      Home
    </>
  );
};
