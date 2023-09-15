import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';
import './breadcrumbs.scss';
import { DefaultHomeBreadcrumb } from './DefaultHomeBreadcrumb';
import { Icon } from '../../icons';
import { ContextAction, ContextMenuType, Size } from '../../../types';
import { Button, ButtonVariant } from '../../button';
import { BreadcrumbLink, BreadcrumbsProps } from './Breadcrumbs.types';
import { useLocalization } from '../../../hooks';

const HOME_ICON = <Icon i="home" />;

const ButtonComponents = ['button', 'a'];

const UNDEFINED_ACTION = () => null;
/**
 * Indicate the page's location within a navigation hierarchy
 * @param {BreadcrumbLink[]} links - the list of links
 * @param { string } [className] - custom className for the root container
 * @param { boolean } [collapsible=false] - if true, collapse all links (except the home link and the last one) into context menu
 * @param { boolean } [disabled=false] - if true, disables all links of the list
 * @param { boolean } [showHomeLink=true] - if true, shows the home link in the beginning of the list
 * @param { function } [onHomeClick] - triggers each time when user clicks on the home link
 * @param {() => JSX.Element} [HomeComponent] - custom home link component
 * @constructor
 */
export const Breadcrumbs = ({
  links = [],
  className,
  collapsible = false,
  disabled = false,
  showHomeLink = true,
  onHomeClick,
  HomeComponent = DefaultHomeBreadcrumb,
  homepageHref
}: BreadcrumbsProps) => {
  const t = useLocalization();

  const onItemClick = useCallback((item: BreadcrumbLink) => {
    if ('href' in item && item.href) {
      window.location.href = item.href;
    } else if ('onClick' in item) {
      item.onClick?.();
    }
  }, []);

  const collapsedItems = useMemo<ContextMenuType>(() => {
    if (!collapsible || !links) {
      return [];
    }

    const menu = links.slice(0, links.length - 1).map(
      (link) =>
        ({
          title: link.title,
          icon: link.icon,
          disabled: disabled,
          onClick: () => onItemClick(link)
        } as ContextAction)
    );

    const result: ContextMenuType = [
      ...menu,
      {
        title: links.at(-1)?.title || '',
        disabled: true,
        onClick: UNDEFINED_ACTION
      }
    ];

    if (showHomeLink) {
      result.unshift({
        title: t('list.breadcrumbs.home'),
        icon: HOME_ICON,
        disabled: true,
        onClick: UNDEFINED_ACTION
      });
    }

    return result;
  }, [links, collapsible, disabled, showHomeLink]);

  const isLink = Boolean(homepageHref);

  return (
    <div className={clsx('alt-breadcrumbs', className)}>
      {showHomeLink &&
        React.createElement(
          ButtonComponents[homepageHref ? 1 : 0],
          {
            className: clsx('alt-breadcrumbs-item'),
            onClick: !isLink ? onHomeClick : undefined,
            href: homepageHref,
            type: !isLink ? 'button' : undefined,
            rel: isLink ? 'noopener noreferrer' : undefined,
            disabled
          },
          HomeComponent()
        )}
      {collapsible && collapsedItems.length > 0 && links?.length > 0 && (
        <>
          {showHomeLink && (
            <div className="alt-breadcrumbs__separator">
              <Icon i="chevron_right" />
            </div>
          )}
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
          <React.Fragment key={linkIndex}>
            {(showHomeLink || (!showHomeLink && linkIndex > 0)) && (
              <div className="alt-breadcrumbs__separator">
                <Icon i="chevron_right" />
              </div>
            )}
            <button
              className={clsx('alt-breadcrumbs-item')}
              disabled={disabled}
              onClick={() => onItemClick(link)}>
              {link.icon && <span className="alt-breadcrumb-item__icon">{link.icon}</span>}
              {link.title}
            </button>
          </React.Fragment>
        ))}
    </div>
  );
};
