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
      icon?: JSX.Element;
    }
  | {
      title: string;
      onClick: () => void;
      icon?: JSX.Element;
    };

interface BreadcrumbsProps {
  links?: BreadcrumbLink[];
  className?: string;
  collapsible?: boolean;
  disabled?: boolean;
  HomeComponent?: () => JSX.Element;
  onHomeClick?: () => void;
}

const HOME_ICON = <Icon i="home" />;

export const Breadcrumbs = ({
  links = [],
  className,
  collapsible = false,
  disabled = false,
  onHomeClick,
  HomeComponent = DefaultHomeBreadcrumb
}: BreadcrumbsProps) => {
  const collapsedItems = useMemo<ContextMenuType>(() => {
    if (!collapsible || !links) {
      return [];
    }

    const menu = links.slice(0, links.length - 1).map((link) => ({
      title: link.title,
      icon: link.icon,
      disabled: disabled,
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
        title: links.at(-1)?.title || '',
        disabled: true,
        onClick: () => null
      }
    ];
  }, [links, collapsible, disabled]);

  return (
    <div className={clsx('alt-breadcrumbs', className)}>
      <button className={clsx('alt-breadcrumbs-item')} onClick={onHomeClick} disabled={disabled}>
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
            className={'alt-breadcrumbs-item'}
            dropdown={collapsedItems}>
            <Icon i="more_horiz" />
          </Button>
          <div className="alt-breadcrumbs__separator">
            <Icon i="chevron_right" />
          </div>
          <button className={clsx('alt-breadcrumbs-item')} disabled={disabled}>
            {links && links.at(-1)?.title}
          </button>
        </>
      )}
      {!collapsible &&
        links.map((link, linkIndex) => (
          <>
            <div className="alt-breadcrumbs__separator">
              <Icon i="chevron_right" />
            </div>
            <button key={linkIndex} className={clsx('alt-breadcrumbs-item')} disabled={disabled}>
              {link.icon && <span className="alt-breadcrumb-item__icon">{link.icon}</span>}
              {link.title}
            </button>
          </>
        ))}
    </div>
  );
};
