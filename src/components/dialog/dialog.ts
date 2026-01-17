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
  resolve: (result: string | number) => void;
};

export type DialogState = AlertInternal | ConfirmInternal | PromptInternal;

let openDialog:
  | ((dialog: AlertInternal | ConfirmInternal | PromptInternal) => void)
  | null = null;

export const registerDialogHandler = (
  handler: (dialog: AlertInternal | ConfirmInternal | PromptInternal) => void
) => {
  openDialog = handler;
};

export const unregisterDialogHandler = () => {
  openDialog = null;
};

export const showAlert = (options?: AlertOptions): Promise<void> => {
  return new Promise((resolve) => {
    if (!openDialog) {
      console.warn('DialogProvider is not mounted');
      resolve();
      return;
    }

    openDialog({
      type: 'alert',
      ...(options || { title: '', message: '' }),
      resolve,
    });
  });
};

export const showConfirm = (options?: ConfirmOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!openDialog) {
      console.warn('DialogProvider is not mounted');
      resolve(false);
      return;
    }

    openDialog({
      type: 'confirm',
      ...(options || { title: '', message: '' }),
      resolve,
    });
  });
};

export const showPrompt = (
  options: PromptOptions
): Promise<string | number | null> => {
  return new Promise((resolve) => {
    if (!openDialog) {
      console.warn('DialogProvider is not mounted');
      resolve(null);
      return;
    }

    const params = options || {};

    openDialog({
      type: 'prompt',
      title: params.title,
      message: params.message,
      inputType: params.inputType ?? 'string',
      placeholder: params.placeholder ?? 'Input your value',
      confirmText: params.confirmText,
      cancelText: params.cancelText,
      resolve,
    });
  });
};
