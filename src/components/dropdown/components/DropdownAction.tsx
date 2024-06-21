import { DropdownActionProps } from '../Dropdown.types';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import { useCloseDropdownContext } from '../Dropdown.contexts.ts';
import s from './action.module.scss';
import { useConfiguration } from 'components/configuration';
import { useId } from 'react';
import { usePopoverCurrentIndex } from '../../popover/Popover.tsx';
import { RenderFuncProp } from '../../../types';

const dropdownActionRenderFunc: RenderFuncProp<
  HTMLButtonElement,
  DropdownActionProps
> = (ref, props) => {
  const { icon, label, hintText, ...restProps } = props;

  return (
    <button type="button" role="button" ref={ref} {...restProps}>
      <div className={s.Icon}>{icon}</div>
      <div className={s.Label}>{label}</div>
      {hintText ? <div className={s.Hint}>{hintText}</div> : null}
    </button>
  );
};

export function DropdownAction(props: DropdownActionProps) {
  const {
    className,
    style,
    danger,
    focused,
    renderFunc = dropdownActionRenderFunc,
    ...restProps
  } = props;

  const id = useId();

  const currentIndex = usePopoverCurrentIndex();
  const { ref, index } = useListItem();

  const isFocused = currentIndex === index;

  const { dropdownAction: dropdownActionConfiguration = {} } =
    useConfiguration();

  const cls = clsx(
    s.Action,
    {
      [s.DisabledAction]: props.disabled,
      [s.DangerAction]: danger,
      [s.Focused]: focused,
    },
    className,
    dropdownActionConfiguration.className,
  );

  const styles = {
    ...dropdownActionConfiguration.style,
    ...style,
  };

  const closePopup = useCloseDropdownContext();

  const onSelect = () => {
    props?.onClick?.();
    closePopup();
  };

  const onKeyDownPress: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      onSelect?.();
    }
  };

  return renderFunc(ref, {
    ...restProps,
    type: 'button',
    style: styles,
    className: cls,
    role: 'button',
    'data-active': isFocused,
    id: props.id || id,
    onClick: onSelect,
    onKeyDown: onKeyDownPress,
  });
}
DropdownAction.displayName = 'DropdownAction';
