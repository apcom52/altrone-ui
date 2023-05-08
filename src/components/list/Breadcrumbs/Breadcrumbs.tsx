import clsx from 'clsx';
import React from 'react';
import './breadcrumbs.scss';
import { DefaultHomeBreadcrumb } from './DefaultHomeBreadcrumb';
import { Icon } from '../../icons';

type BreadcrumbLink =
  | {
      title: string;
      href: string;
    }
  | {
      title: string;
      onClick: () => void;
    };

interface BreadcrumbsProps {
  links?: BreadcrumbLink[];
  className?: string;
  collapsible?: boolean;
  HomeComponent?: () => JSX.Element;
  onHomeClick?: () => void;
}

export const Breadcrumbs = ({
  links = [],
  className,
  onHomeClick,
  HomeComponent = DefaultHomeBreadcrumb
}: BreadcrumbsProps) => {
  return (
    <div className={clsx('alt-breadcrumbs', className)}>
      <button className={clsx('alt-breadcrumbs__item')} onClick={onHomeClick}>
        {HomeComponent()}
      </button>
      {links.map((link, linkIndex) => (
        <>
          <div className="alt-breadcrumbs__separator">
            <Icon i="chevron_right" />
          </div>
          <button key={linkIndex} className={clsx('alt-breadcrumbs__item')}>
            {link.title}
          </button>
        </>
      ))}
    </div>
  );
};
