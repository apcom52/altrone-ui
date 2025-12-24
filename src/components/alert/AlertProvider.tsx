import { useEffect, useState } from 'react';
import { registerAlertHandler, unregisterAlertHandler } from './alert';
import { Modal } from '../modal/Modal';
import { Text } from '../text';
import s from './alert.module.scss';
import { Button } from 'components/button';
import { Flex } from 'components/flex';

type AlertState = {
  title: string;
  message: string;
  okText?: string;
  resolve: () => void;
} | null;

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<AlertState>(null);

  useEffect(() => {
    registerAlertHandler(setAlert);
    return unregisterAlertHandler;
  }, []);

  const close = () => {
    if (!alert) return;
    alert.resolve();
    setAlert(null);
  };

  return (
    <>
      {children}

      {alert && (
        <Modal
          title={alert.title || 'Alert'}
          content={
            <Flex direction="vertical" gap="xl" className={s.AlertContent}>
              <Text block className={s.AlertMessage}>
                {alert.message}
              </Text>
              <Button
                variant="submit"
                label={alert.okText || 'OK'}
                onClick={close}
              />
            </Flex>
          }
          openedByDefault={true}
          onClose={close}
          size="s"
          showCancelButton={false}
        >
          <div />
        </Modal>
      )}
    </>
  );
};
