import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import './breadcrumbs.scss';
import { DefaultHomeBreadcrumb } from './DefaultHomeBreadcrumb';
import { Icon } from '../../icons';
import { ContextMenuType, Size } from '../../../types';
import { Button, ButtonVariant } from '../../button';
import { BreadcrumbLink, BreadcrumbsProps } from './Breadcrumbs.types';

const HOME_ICON = <Icon i="home" />;

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
  HomeComponent = DefaultHomeBreadcrumb
}: BreadcrumbsProps) => {
  const onItemClick = useCallback((item: BreadcrumbLink) => {
    if ('href' in item && item.href) {
      console.log('href', item.href);
      window.location.href = item.href;
    } else if ('onClick' in item) {
      item.onClick();
    }
  }, []);

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

    const result = [
      ...menu,
      {
        title: links.at(-1)?.title || '',
        disabled: true,
        onClick: () => null
      }
    ];

    if (showHomeLink) {
      result.unshift({
        title: 'Home',
        icon: HOME_ICON,
        disabled: true,
        onClick: () => null
      });
    }

    return result;
  }, [links, collapsible, disabled, showHomeLink]);

  return (
    <div className={clsx('alt-breadcrumbs', className)}>
      {showHomeLink && (
        <button className={clsx('alt-breadcrumbs-item')} onClick={onHomeClick} disabled={disabled}>
          {HomeComponent()}
        </button>
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
          <>
            {(showHomeLink || (!showHomeLink && linkIndex > 0)) && (
              <div className="alt-breadcrumbs__separator">
                <Icon i="chevron_right" />
              </div>
            )}
            <button
              key={linkIndex}
              className={clsx('alt-breadcrumbs-item')}
              disabled={disabled}
              onClick={() => onItemClick(link)}>
              {link.icon && <span className="alt-breadcrumb-item__icon">{link.icon}</span>}
              {link.title}
            </button>
          </>
        ))}
    </div>
  );
};
