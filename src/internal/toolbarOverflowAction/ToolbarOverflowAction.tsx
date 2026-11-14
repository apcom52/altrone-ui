import { isValidElement, MouseEvent, KeyboardEvent, ReactElement } from 'react';
import { Dropdown } from 'components/dropdown';
import { Loading } from 'components/loading';
import { CheckIcon } from 'components/checkbox';
import { Check, X } from 'lucide-react';
import { ToolbarActionProps } from 'components/toolbar/Toolbar.types.ts';

export function ToolbarOverflowAction({
  ref,
  label,
  icon,
  additionalIcon,
  danger,
  disabled,
  onClick,
  onKeyDown,
  asChild,
  children,
  kbd,
  selected,
  state = 'idle',
  successIcon,
  failedIcon,
  badge,
}: ToolbarActionProps) {
  const unavailable = disabled || state !== 'idle';
  const childProps =
    asChild && isValidElement(children)
      ? (children as ReactElement<ToolbarActionProps>).props
      : undefined;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (unavailable) {
      event.preventDefault();
      return;
    }
    childProps?.onClick?.(event);
    if (!event.defaultPrevented) onClick?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (unavailable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      return;
    }
    childProps?.onKeyDown?.(event);
    if (!event.defaultPrevented) onKeyDown?.(event);
  };

  let menuIcon = icon ?? additionalIcon;
  if (state === 'loading') {
    menuIcon = (
      <Loading
        size="var(--dropdown-action-icon-size, 18px)"
        strokeWidth={1.5}
        color="currentColor"
        aria-hidden="true"
      />
    );
  } else if (state === 'succeeded') {
    menuIcon = successIcon ?? <Check />;
  } else if (state === 'failed') {
    menuIcon = failedIcon ?? <X />;
  } else if (selected) {
    menuIcon = <CheckIcon checked />;
  }

  return (
    <Dropdown.Action
      ref={ref}
      label={label}
      icon={menuIcon}
      danger={danger}
      disabled={unavailable}
      aria-disabled={unavailable || undefined}
      aria-pressed={selected}
      aria-busy={state === 'loading' || undefined}
      hintText={kbd}
      badge={badge}
      asChild={asChild}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Dropdown.Action>
  );
}
