import React from 'react';
import { Icon } from '../../icons';

export const DefaultHomeBreadcrumb = () => {
  return (
    <div className="alt-home-breadcrumb">
      <span className="alt-home-breadcrumb__icon">
        <Icon i="home" />
      </span>
      Home
    </div>
  );
};
