import { forwardRef, useEffect, useMemo, useState } from 'react';
import { NavigationLinkProps } from '../NavigationList.types';
import './link.scss';
import clsx from 'clsx';
import { getSafeArray } from '../../../../utils/safeArray';
import { Icon } from '../../../typography';
import { SafeReactElement } from '../../../../types';

export const NavigationLink = forwardRef<HTMLButtonElement, NavigationLinkProps>(
  (
    {
      label,
      expanded: expandedByDefault = false,
      indicator,
      icon,
      href,
      active,
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

    const hasSelectedChildElements = useMemo(() => {
      if (!children) {
        return;
      }

      let result = false;

      const pasteElementsIntoArray = (nodes: SafeReactElement) => {
        if (result) return;
        const safeNodeArray = getSafeArray(nodes);

        for (const node of safeNodeArray) {
          if (node?.props?.active) {
            result = true;
            break;
          }

          if (node?.props.children) {
            pasteElementsIntoArray(node.props.children);
          }
        }
      };

      pasteElementsIntoArray(children);

      return result;
    }, [children]);

    useEffect(() => {
      if (hasSelectedChildElements) {
        setExpanded(true);
      }
    }, [hasSelectedChildElements]);

    return (
      <div className="alt-navigation-link-wrapper">
        <button
          type="button"
          role="button"
          className={clsx('alt-navigation-link', className, {
            'alt-navigation-link--disabled': disabled,
            'alt-navigation-link--selected': !hasInnerLinks && active,
            'alt-navigation-link--expanded': expanded || hasSelectedChildElements
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
