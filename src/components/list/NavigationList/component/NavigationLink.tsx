import { forwardRef, useState } from 'react';
import { NavigationLinkProps } from '../NavigationList.types';
import './link.scss';
import clsx from 'clsx';
import { getSafeArray } from '../../../../utils/safeArray';
import { Icon } from '../../../typography';

export const NavigationLink = forwardRef<HTMLButtonElement, NavigationLinkProps>(
  (
    {
      label,
      expanded: expandedByDefault = false,
      indicator,
      icon,
      href,
      onClick,
      children,
      className,
      disabled
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(expandedByDefault);

    const safeChildElements = getSafeArray(children).filter((item) => Boolean(item));
    const hasInnerLinks = safeChildElements.length > 0;

    const onClickHandler = () => {
      if (hasInnerLinks) {
        setExpanded(!expanded);
      } else if (href) {
        const link = document.createElement('a');
        link.href = href;
        link.rel = 'noreferrer noopener nofollower';
        link.style.position = 'absolute';
        link.style.opacity = '0';
        link.tabIndex = -1;
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      } else {
        onClick?.();
      }
    };

    return (
      <div className="alt-navigation-link-wrapper">
        <button
          type="button"
          role="button"
          className={clsx('alt-navigation-link', className, {
            'alt-navigation-link--disabled': disabled,
            'alt-navigation-link--expanded': expanded
          })}
          disabled={disabled}
          ref={ref}
          onClick={onClickHandler}>
          {icon && <div className="alt-navigation-link__icon">{icon}</div>}
          <div className="alt-navigation-link__label">{label}</div>
          {indicator && (
            <div
              className={clsx('alt-navigation-link__indicator', {
                'alt-navigation-link__indicator--position-corner': indicator.position === 'corner'
              })}>
              {indicator.value}
            </div>
          )}
          {hasInnerLinks && (
            <div className="alt-navigation-link__arrowIcon">
              <Icon i="arrow_forward_ios" />
            </div>
          )}
        </button>
        {expanded ? <div className="alt-navigation-link__children">{children}</div> : null}
      </div>
    );
  }
);
