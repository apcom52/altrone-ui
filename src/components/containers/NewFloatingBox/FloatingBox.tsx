import './floating-box.scss';
import { FloatingBoxProps } from './FloatingBox.types';
import {
  useFloating,
  offset,
  useClick,
  useHover,
  useInteractions,
  useFocus,
  useDismiss,
  autoPlacement,
  FloatingFocusManager,
  safePolygon,
  autoUpdate,
  flip,
  shift
} from '@floating-ui/react';
import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Icon } from '../../typography';
import { createPortal } from 'react-dom';
import { useToggledState } from '../../../hooks';

/**
 * This component is used to make a dropdown or a small popup
 */
const FloatingBox = ({
  children,
  content,
  title,
  placement = 'auto',
  trigger = 'click',
  useRootContainer = true,
  className
}: FloatingBoxProps) => {
  const { value: opened, disable: hide, setValue: setOpened } = useToggledState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: opened,
    onOpenChange: setOpened,
    placement: placement !== 'auto' ? placement : 'top',
    middleware: [
      offset(4),
      placement === 'auto' ? autoPlacement() : flip(),
      shift({
        padding: 4
      })
    ],
    whileElementsMounted: autoUpdate
  });

  const triggersList = Array.isArray(trigger) ? trigger : [trigger];

  const clickTrigger = useClick(context, {
    enabled: triggersList.includes('click')
  });
  const hoverTrigger = useHover(context, {
    enabled: triggersList.includes('hover'),
    delay: {
      open: 500,
      close: 250
    },
    handleClose: safePolygon()
  });
  const focusTrigger = useFocus(context, {
    enabled: triggersList.includes('focus')
  });
  const dismiss = useDismiss(context);

  const triggers = useMemo(() => {
    const triggers = Array.isArray(trigger) ? trigger : [trigger];

    return [
      triggers.includes('click') ? clickTrigger : undefined,
      triggers.includes('hover') ? hoverTrigger : undefined,
      triggers.includes('focus') ? focusTrigger : undefined
    ].filter((i) => !!i);
  }, [trigger]);

  const { getReferenceProps, getFloatingProps } = useInteractions([...triggers, dismiss]);

  const floatingBox = (
    <FloatingFocusManager context={context}>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={clsx('alt-floating-box', className)}
        {...getFloatingProps()}>
        {typeof title === 'string' && (
          <div className="alt-floating-box__header">
            <div className="alt-floating-box__title">{title}</div>
            <button className="alt-floating-box__close" type="button" onClick={hide}>
              <Icon i="close" />
            </button>
          </div>
        )}
        <div className="alt-floating-box__content">{content}</div>
      </div>
    </FloatingFocusManager>
  );

  return (
    <>
      {React.cloneElement(children, { ref: refs.setReference, ...getReferenceProps() })}
      {opened &&
        (useRootContainer
          ? createPortal(floatingBox, document.querySelector('.altrone') || document.body)
          : floatingBox)}
    </>
  );
};

export default FloatingBox as typeof FloatingBox;
