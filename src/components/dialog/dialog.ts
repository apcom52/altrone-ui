export type PromptType = 'string' | 'text' | 'password' | 'number';

export type AlertOptions = {
  title: string;
  message: string;
  okText?: string;
};

export type ConfirmOptions = {
  title: string;
  message: string;
  confirmText?: string;
  rejectText?: string;
  danger?: boolean;
};

export type PromptOptions = {
  title: string;
  message: string;
  inputType?: PromptType;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
};

type AlertInternal = AlertOptions & {
  type: 'alert';
  resolve: () => void;
};

type ConfirmInternal = ConfirmOptions & {
  type: 'confirm';
  resolve: (result: boolean) => void;
};

type PromptInternal = PromptOptions & {
  type: 'prompt';
  resolve: (result: string | number | null) => void;
};

export type DialogState = AlertInternal | ConfirmInternal | PromptInternal;

type DialogHandler = (dialog: DialogState) => void;

/**
 * A stack rather than a single ref so nested `DialogProvider`s (and tests that
 * mount/unmount their own) don't clobber each other — the most recently mounted
 * provider handles new dialogs, and unmounting one falls back to the previous.
 */
const handlers: DialogHandler[] = [];

export const registerDialogHandler = (handler: DialogHandler) => {
  handlers.push(handler);
};

export const unregisterDialogHandler = (handler: DialogHandler) => {
  const index = handlers.lastIndexOf(handler);
  if (index !== -1) {
    handlers.splice(index, 1);
  }
};

const dispatch = (dialog: DialogState): boolean => {
  const handler = handlers[handlers.length - 1];
  if (!handler) {
    console.warn('DialogProvider is not mounted');
    return false;
  }

  handler(dialog);
  return true;
};

export const showAlert = (options: AlertOptions): Promise<void> => {
  return new Promise((resolve) => {
    if (!dispatch({ type: 'alert', ...options, resolve })) {
      resolve();
    }
  });
};

export const showConfirm = (options: ConfirmOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!dispatch({ type: 'confirm', ...options, resolve })) {
      resolve(false);
    }
  });
};

export const showPrompt = (
  options: PromptOptions,
): Promise<string | number | null> => {
  return new Promise((resolve) => {
    const dispatched = dispatch({
      type: 'prompt',
      ...options,
      inputType: options.inputType ?? 'string',
      resolve,
    });

    if (!dispatched) {
      resolve(null);
    }
  });
};
