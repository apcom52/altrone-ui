import { forwardRef } from 'react';
import { NavigationLinkProps } from '../NavigationList.types';
import './link.scss';
import clsx from 'clsx';

export const NavigationLink = forwardRef<HTMLButtonElement, NavigationLinkProps>(
  ({ label, level = 1, icon, href, onClick, children, className, disabled }, ref) => {
    const onClickHandler = () => {
      if (href) {
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
      <button
        role="button"
        className={clsx('alt-navigation-link', className, {
          'alt-navigation-link--disabled': disabled
        })}
        disabled={disabled}
        ref={ref}
        onClick={onClickHandler}>
        {icon && <div className="alt-navigation-link__icon">{icon}</div>}
        <div className="alt-navigation-link__label">{label}</div>
      </button>
    );
  }
);
