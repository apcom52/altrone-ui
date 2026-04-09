import { isValidElement } from 'react';
import { DropdownActionProps } from '../Dropdown.types';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import { useCloseDropdownContext } from '../Dropdown.contexts.ts';
import s from './action.module.scss';
import { useEffect, useId } from 'react';
import { usePopoverCurrentIndex } from '../../popover/Popover.tsx';
import { Badge } from 'components/badge/Badge.tsx';
import { useDropdownItemHover } from '../useDropdownItemHover.tsx';
import { Slot } from 'utils/components/Slot.tsx';
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';
import { AnyObject } from 'utils/types.ts';

export function DropdownAction(props: DropdownActionProps) {
  const {
    className,
    style,
    danger,
    focused,
    renderFunc,
    asChild,
    children,
    icon,
    label,
    hintText,
    keyProp,
    badge,
    ...htmlProps
  } = props;

  const id = useId();

  const currentIndex = usePopoverCurrentIndex();
  const { ref, index } = useListItem();

  const isFocused = currentIndex === index;

  const { itemBackgroundElement, onMouseEnter, onMouseLeave } =
    useDropdownItemHover();

  useEffect(() => {
    if (isFocused) {
      onMouseEnter();
    } else {
      onMouseLeave();
    }
  }, [isFocused]);

  const cls = clsx(
    s.Action,
    'no-selection',
    {
      [s.DisabledAction]: props.disabled,
      [s.DangerAction]: danger,
      [s.Focused]: focused,
    },
    className,
  );

  const badgeCls = clsx(s.Badge);

  const styles = {
    ...style,
  };

  const closePopup = useCloseDropdownContext();

  const onSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    props?.onClick?.(event);
    closePopup();
  };

  const onKeyDownPress: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.click();
    }
  };

  const actionContent = (
    <>
      {itemBackgroundElement}
      <div className={s.Icon}>{icon}</div>
      <div className={s.Label}>{label}</div>
      {badge ? (
        <Badge className={badgeCls}>{badge}</Badge>
      ) : hintText ? (
        <div className={s.Hint}>{hintText}</div>
      ) : null}
    </>
  );

  const sharedProps = {
    ...htmlProps,
    type: 'button' as const,
    style: styles,
    className: cls,
    role: 'button',
    'data-active': isFocused,
    'data-index': index,
    id: props.id || id,
    onClick: onSelect,
    onKeyDown: onKeyDownPress,
    onMouseEnter,
    onMouseLeave,
  };

  if (renderFunc) {
    return renderFunc(ref, {
      ...sharedProps,
      icon,
      label: label ?? '',
      hintText,
      keyProp,
      badge,
    });
  }

  if (asChild) {
    if (!isValidElement(children)) {
      console.error(
        '[DropdownAction] asChild requires a valid React element as children',
      );
      return null;
    }

    const childWithContent = cloneWithRef(children, {
      children: actionContent,
    });

    return (
      <Slot ref={ref} {...(sharedProps as AnyObject)}>
        {childWithContent}
      </Slot>
    );
  }

  return (
    <button ref={ref} {...sharedProps}>
      {actionContent}
    </button>
  );
}
DropdownAction.displayName = 'DropdownAction';
