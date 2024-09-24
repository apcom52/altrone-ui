import React, { memo, useRef } from 'react';
import s from './modal.module.scss';
import { ModalContext, ModalProps } from './Modal.types.ts';
import { CloseButton } from '../closeButton';
import { Button } from '../button';
import clsx from 'clsx';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { useConfiguration } from 'components/configuration';
import { DOMUtils, useBoolean } from '../../utils';

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
    ...restProps
  }) => {
    const childrenRef = useRef<HTMLElement | null>(null);

    const { modal: modalConfig = {} } = useConfiguration();
    const {
      value: opened,
      disable: hide,
      setValue: setOpened,
    } = useBoolean(openedByDefault);

    const { refs, context } = useFloating({
      open: opened,
      onOpenChange: setOpened,
      middleware: [offset({ mainAxis: 80 })],
    });

    const clickTrigger = useClick(context, {
      event: 'click',
    });

    const dismiss = useDismiss(context, {
      enabled: opened,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      clickTrigger,
      dismiss,
    ]);

    const cls = clsx(
      s.Modal,
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
      ...getReferenceProps({
        ...safeChildElement.props,
      }),
      ref: (elementRef: HTMLElement) => {
        refs.setReference(elementRef);
        childrenRef.current = elementRef;
      },
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

    const modalContent = (
      <FloatingPortal>
        <FloatingOverlay className={s.Backdrop} lockScroll>
          <div
            ref={refs.setFloating}
            className={cls}
            style={styles}
            {...getFloatingProps(restProps)}
          >
            <FloatingFocusManager
              initialFocus={1}
              context={context}
              modal={true}
              order={['content']}
            >
              <>
                <div className={s.Title}>
                  {title}
                  <CloseButton className={s.Close} onClick={hide} />
                </div>
                <div className={s.Content}>{contentElement}</div>
                <div className={s.Footer}>
                  <div className={s.LeftFooter}>{leftActionsElement}</div>
                  <div className={s.RightFooter}>
                    <Button label="Cancel" onClick={hide} />
                    {actionsElement}
                  </div>
                </div>
              </>
            </FloatingFocusManager>
          </div>
        </FloatingOverlay>
      </FloatingPortal>
    );

    if (!enabled) {
      return <>{childrenElement}</>;
    }

    return (
      <>
        {childrenElement}
        {opened ? modalContent : null}
      </>
    );
  },
);
