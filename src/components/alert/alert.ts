export type AlertOptions = {
  title: string;
  message: string;
  okText?: string;
};

type AlertInternal = AlertOptions & {
  resolve: () => void;
};

let openAlert: ((alert: AlertInternal) => void) | null = null;

export const registerAlertHandler = (
  handler: (alert: AlertInternal) => void
) => {
  openAlert = handler;
};

export const unregisterAlertHandler = () => {
  openAlert = null;
};

export const showAlert = (options?: AlertOptions): Promise<void> => {
  return new Promise((resolve) => {
    if (!openAlert) {
      console.warn('AlertProvider is not mounted');
      resolve();
      return;
    }

    openAlert({
      ...(options || { title: '', message: '' }),
      resolve,
    });
  });
};
