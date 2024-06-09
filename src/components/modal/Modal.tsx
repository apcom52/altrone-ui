import { memo, useId } from 'react';
import s from './modal.module.scss';
import { ModalProps } from './Modal.types.ts';
import { CloseButton } from '../closeButton';
import { Button } from '../button';
import clsx from 'clsx';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

export const Modal = memo<ModalProps>(
  ({
    open = false,
    children,
    onClose,
    onOpenChange,
    title,
    leftActions,
    actions,
    size = 'm',
    className,
    style,
    ...restProps
  }) => {
    const { modal: modalConfig = {} } = useConfiguration();

    const { refs, context } = useFloating({
      open: open,
      onOpenChange: (open: boolean, event?: Event) => {
        onOpenChange?.(open, event);
      },
    });

    const dismiss = useDismiss(context, {
      outsidePressEvent: 'mousedown',
      escapeKey: true,
    });

    const { getFloatingProps } = useInteractions([dismiss]);

    const headingId = useId();

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

    return (
      <FloatingPortal>
        <FloatingOverlay className={s.Backdrop} lockScroll>
          <FloatingFocusManager context={context} initialFocus={1}>
            <div
              ref={refs.setFloating}
              className={cls}
              aria-labelledby={headingId}
              style={styles}
              {...getFloatingProps(restProps)}
            >
              <div className={s.Title}>
                <div id={headingId}></div>
                {title}
                <CloseButton className={s.Close} onClick={onClose} />
              </div>
              <div className={s.Content}>{children}</div>
              <div className={s.Footer}>
                <div className={s.LeftFooter}>{leftActions}</div>
                <div className={s.RightFooter}>
                  <Button label="Cancel" onClick={onClose} />
                  {actions}
                </div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  },
);
