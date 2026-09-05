import { isValidElement, useEffect, useId } from 'react';
import { DropdownActionProps } from '../Dropdown.types';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import { useCloseDropdownContext } from '../Dropdown.contexts.ts';
import s from './action.module.scss';
import { usePopoverCurrentIndex } from '../../popover/Popover.tsx';
import { Badge } from 'components/badge/Badge.tsx';
import { useDropdownItemHover } from '../useDropdownItemHover.tsx';
import { Slot } from 'utils/components/Slot.tsx';
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';
import { AnyObject } from 'utils/types.ts';
import { mergeRefs } from 'utils/mergeRefs';

export function DropdownAction(props: DropdownActionProps) {
  const {
    ref,
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
    size = 'm',
    ...htmlProps
  } = props;

  const id = useId();

  const currentIndex = usePopoverCurrentIndex();
  const { ref: listItemRef, index } = useListItem();

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
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
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
    'data-active': isFocused,
    'data-index': index,
    id: props.id || id,
    onClick: onSelect,
    onKeyDown: onKeyDownPress,
    onMouseEnter,
    onMouseLeave,
  };

  const mergedRef = mergeRefs(ref, listItemRef);

  if (renderFunc) {
    return renderFunc(mergedRef, {
      ...sharedProps,
      role: 'button',
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
      <Slot ref={mergedRef} role="button" {...(sharedProps as AnyObject)}>
        {childWithContent}
      </Slot>
    );
  }

  return (
    <button ref={mergedRef} {...sharedProps}>
      {actionContent}
    </button>
  );
}
DropdownAction.displayName = 'DropdownAction';
