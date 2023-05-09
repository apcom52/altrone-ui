import clsx from 'clsx';
import React, { useMemo } from 'react';
import './breadcrumbs.scss';
import { DefaultHomeBreadcrumb } from './DefaultHomeBreadcrumb';
import { Icon } from '../../icons';
import { ContextMenuType, Size } from '../../../types';
import { Button, ButtonVariant } from '../../button';

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

const HOME_ICON = <Icon i="home" />;

export const Breadcrumbs = ({
  links = [],
  className,
  collapsible = false,
  onHomeClick,
  HomeComponent = DefaultHomeBreadcrumb
}: BreadcrumbsProps) => {
  const collapsedItems = useMemo<ContextMenuType>(() => {
    if (!collapsible || !links) {
      return [];
    }

    const menu = links.slice(0, links.length - 1).map((link) => ({
      title: link.title,
      onClick: () => null
    }));

    return [
      {
        title: 'Home',
        icon: HOME_ICON,
        disabled: true,
        onClick: () => null
      },
      ...menu,
      {
        title: links.at(-1)?.title,
        disabled: true,
        onClick: () => null
      }
    ];
  }, [links, collapsible]);

  return (
    <div className={clsx('alt-breadcrumbs', className)}>
      <button className={clsx('alt-breadcrumbs__item')} onClick={onHomeClick}>
        {HomeComponent()}
      </button>
      {collapsible && collapsedItems.length > 0 && links?.length > 0 && (
        <>
          <div className="alt-breadcrumbs__separator">
            <Icon i="chevron_right" />
          </div>
          <Button
            size={Size.small}
            variant={ButtonVariant.text}
            isIcon
            className={'alt-breadcrumbs__item'}
            dropdown={collapsedItems}>
            <Icon i="more_horiz" />
          </Button>
          <div className="alt-breadcrumbs__separator">
            <Icon i="chevron_right" />
          </div>
          <button className={clsx('alt-breadcrumbs__item')}>{links && links.at(-1)?.title}</button>
        </>
      )}
      {!collapsible &&
        links.map((link, linkIndex) => (
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
