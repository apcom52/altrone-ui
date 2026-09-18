import { useCallback, useId, type MouseEvent } from 'react';
import clsx from 'clsx';
import { Sheet } from 'internal/sheet';
import { DrawerContext, DrawerProps } from './Drawer.types.ts';
import { CloseButton } from '../closeButton';
import { Button } from '../button';
import { Scrollable } from '../scrollable';
import { useBoolean } from '../../utils';
import { useLocalization } from '../application';
import s from './drawer.module.scss';

export const Drawer = (props: DrawerProps) => {
  const {
    ref,
    content,
    footer,
    title,
    placement = 'start',
    width = 400,
    open,
    defaultOpen = false,
    dismissible = true,
    showCloseButton = true,
    onClose,
    onDone,
    additionalActions,
    actions,
    className,
    style,
    ...restProps
  } = props;

  const t = useLocalization();
  const titleId = useId();

  const isControlled = open !== undefined;
  const { value: internalOpened, disable: hide } = useBoolean(defaultOpen);
  const isOpen = isControlled ? open : internalOpened;
  const {
    value: isLoading,
    enable: startLoading,
    disable: stopLoading,
  } = useBoolean(false);

  const handleClose = useCallback(
    (event?: MouseEvent | KeyboardEvent) => {
      if (!isControlled) {
        hide();
      }
      onClose?.(event);
    },
    [isControlled, hide, onClose],
  );

  const drawerContext: DrawerContext = { closeDrawer: handleClose };

  const handleDone = async (event: MouseEvent<HTMLButtonElement>) => {
    if (onDone === undefined) {
      handleClose(event);
      return;
    }

    startLoading();
    const result = await onDone(event);
    stopLoading();
    if (result !== false) {
      handleClose(event);
    }
  };

  const contentElement =
    typeof content === 'function' ? content(drawerContext) : content;
  const footerElement =
    typeof footer === 'function' ? footer(drawerContext) : footer;
  const additionalActionsElement =
    typeof additionalActions === 'function'
      ? additionalActions(drawerContext)
      : additionalActions;
  const actionsElement =
    typeof actions === 'function' ? actions(drawerContext) : actions;

  /** `onDone` renders a Done button in the end slot unless `actions` takes it over. */
  const endContent =
    actionsElement ??
    (onDone !== undefined ? (
      <Button
        variant="submit"
        label={t('common.done')}
        onClick={handleDone}
        state={isLoading ? 'loading' : 'idle'}
      />
    ) : null);

  return (
    <Sheet
      ref={ref}
      placement={placement}
      width={width}
      padding={0}
      open={isOpen}
      onClose={handleClose}
      dismissible={dismissible}
      className={className}
      style={style}
      aria-labelledby={title ? titleId : undefined}
      {...restProps}
    >
      <div className={s.Body}>
        <div className={s.Header}>
          <div className={s.HeaderSide}>
            {showCloseButton && <CloseButton onClick={handleClose} />}
            {additionalActionsElement}
          </div>
          <div className={s.Title} id={titleId}>
            {title}
          </div>
          <div className={clsx(s.HeaderSide, s.HeaderEnd)}>{endContent}</div>
        </div>
        <div className={s.Content}>
          <Scrollable>
            <div className={s.ScrollInset}>{contentElement}</div>
          </Scrollable>
        </div>
        {footerElement && <div className={s.Footer}>{footerElement}</div>}
      </div>
    </Sheet>
  );
};
