import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { Sheet } from 'internal/sheet';
import { ModalContext, ModalProps } from './Modal.types.ts';
import { CloseButton } from '../closeButton';
import { Button } from '../button';
import { useBoolean } from '../../utils';
import { useLocalization } from '../application';
import s from './modal.module.scss';

const hasRenderableNodes = (node: ReactNode) =>
  Array.isArray(node) ? node.some(Boolean) : Boolean(node);

/** `s`/`l` get their own width; anything else (including `m`) is the default. */
const MODAL_WIDTH = { s: 280, l: 640 } as const;

export const Modal = (props: ModalProps) => {
  const {
    ref,
    content,
    enabled = true,
    open,
    defaultOpen = false,
    title,
    additionalActions,
    actions,
    size = 'm',
    className,
    style,
    onClick,
    onClose,
    showCloseButton = true,
    showCancelButton = true,
    ...restProps
  } = props;

  const t = useLocalization();
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const isControlled = open !== undefined;
  const { value: internalOpened, disable: hide } = useBoolean(defaultOpen);
  const opened = isControlled ? open : internalOpened;

  useEffect(() => {
    const body = bodyRef.current;
    if (!opened || !enabled || !body) {
      return;
    }
    if (body.contains(body.ownerDocument.activeElement)) {
      return;
    }
    closeButtonRef.current?.focus({ preventScroll: true });
  }, [opened, enabled]);

  const handleClose = useCallback(
    (event?: MouseEvent | KeyboardEvent) => {
      if (!isControlled) {
        hide();
      }
      onClose?.(event);
    },
    [isControlled, hide, onClose],
  );

  const modalContext: ModalContext = { hide: handleClose };

  const contentElement =
    typeof content === 'function' ? content(modalContext) : content;
  const additionalActionsElement =
    typeof additionalActions === 'function'
      ? additionalActions(modalContext)
      : additionalActions;
  const actionsElement =
    typeof actions === 'function' ? actions(modalContext) : actions;

  const hasAdditionalActions = hasRenderableNodes(additionalActionsElement);
  const showFooter =
    showCancelButton ||
    hasAdditionalActions ||
    hasRenderableNodes(actionsElement);

  return (
    <Sheet
      ref={ref}
      placement="top"
      width={MODAL_WIDTH[size as keyof typeof MODAL_WIDTH] ?? 400}
      elevation="modal"
      padding={0}
      open={opened && enabled}
      onClose={handleClose}
      onClick={onClick}
      className={className}
      style={style}
      aria-labelledby={title ? titleId : undefined}
      {...restProps}
    >
      <div ref={bodyRef} className={s.Body}>
        <div className={s.Title} id={titleId}>
          {title}
          {showCloseButton && (
            <CloseButton
              ref={closeButtonRef}
              className={s.Close}
              onClick={handleClose}
            />
          )}
        </div>
        <div className={s.Content}>{contentElement}</div>
        {showFooter && (
          <div className={s.Footer}>
            {hasAdditionalActions && (
              <div className={s.LeftFooter}>{additionalActionsElement}</div>
            )}
            <div className={s.RightFooter}>
              {showCancelButton && (
                <Button label={t('common.cancel')} onClick={handleClose} />
              )}
              {actionsElement}
            </div>
          </div>
        )}
      </div>
    </Sheet>
  );
};
