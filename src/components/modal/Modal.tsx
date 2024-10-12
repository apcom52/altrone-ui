import React, { memo, useEffect, useId, MouseEvent } from 'react';
import { ModalContext, ModalProps } from './Modal.types.ts';
import { CloseButton } from '../closeButton';
import { Button } from '../button';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { DOMUtils, GlobalUtils, useBoolean } from '../../utils';
import { createPortal } from 'react-dom';
import s from './modal.module.scss';
import FocusTrap from 'focus-trap-react';

export const Modal = memo<ModalProps>(
  ({
    children,
    content,
    enabled = true,
    openedByDefault = false,
    title,
    leftActions,
    actions,
    size = 'm',
    className,
    style,
    onClick,
    ...restProps
  }) => {
    const titleId = useId();

    const { modal: modalConfig = {} } = useConfiguration();
    const {
      value: opened,
      disable: hide,
      enable: show,
    } = useBoolean(openedByDefault);

    const cls = clsx(
      s.Backdrop,
      {
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
      },
      className,
      modalConfig.className,
    );

    const styles = {
      ...modalConfig.style,
      ...style,
    };

    const originChildElement = children;
    const safeChildElement = React.isValidElement(originChildElement) ? (
      originChildElement
    ) : (
      <span>{originChildElement}</span>
    );

    const childrenElement = DOMUtils.cloneNode(safeChildElement, {
      onClick: show,
    });

    const modalContext: ModalContext = { closeModal: hide };

    const contentElement =
      typeof content === 'function' ? content(modalContext) : content;
    const leftActionsElement =
      typeof leftActions === 'function'
        ? leftActions(modalContext)
        : leftActions;
    const actionsElement =
      typeof actions === 'function' ? actions(modalContext) : actions;

    const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
      if (!(e.target as HTMLElement)?.closest('[aria-modal="true"]')) {
        hide();
      }

      if (onClick) onClick(e);
    };

    const onKeyboardHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hide();
      }
    };

    useEffect(() => {
      if (opened) {
        document.body.addEventListener('keydown', onKeyboardHandler);
      }

      return () => {
        document.body.removeEventListener('keydown', onKeyboardHandler);
      };
    }, [opened]);

    const modalContent = (
      <FocusTrap
        focusTrapOptions={{
          tabbableOptions: {
            displayCheck: GlobalUtils.isTestEnvironment() ? 'none' : 'full',
          },
        }}
      >
        <div
          className={cls}
          style={styles}
          role="dialog"
          aria-labelledby={titleId}
          {...restProps}
          onClick={onBackdropClick}
        >
          <div className={s.Overlay} />
          <div className={s.Dialog}>
            <div className={s.ModalContent} aria-modal="true">
              <div className={s.Title} id={titleId} aria-label={title}>
                {title}
                <CloseButton className={s.Close} onClick={hide} autoFocus />
              </div>
              <div className={s.Content}>{contentElement}</div>
              <div className={s.Footer}>
                <div className={s.LeftFooter}>{leftActionsElement}</div>
                <div className={s.RightFooter}>
                  <Button label="Cancel" onClick={hide} />
                  {actionsElement}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FocusTrap>
    );

    const altroneRoot =
      document.querySelector('[data-altrone-root="true"]') || document.body;

    if (!enabled) {
      return <>{childrenElement}</>;
    }

    return (
      <>
        {childrenElement}
        {opened ? createPortal(modalContent, altroneRoot) : null}
      </>
    );
  },
);
