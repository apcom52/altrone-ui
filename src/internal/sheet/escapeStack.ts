type EscapeHandler = (event: KeyboardEvent) => void;

const handlers: EscapeHandler[] = [];

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) {
    return;
  }

  handlers[handlers.length - 1]?.(event);
};

export const registerSheetEscape = (handler: EscapeHandler) => {
  if (handlers.length === 0) {
    document.body.addEventListener('keydown', onKeyDown);
  }
  handlers.push(handler);

  return () => {
    const index = handlers.indexOf(handler);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
    if (handlers.length === 0) {
      document.body.removeEventListener('keydown', onKeyDown);
    }
  };
};
