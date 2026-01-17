import { useEffect, useState } from 'react';
import {
  DialogState,
  registerDialogHandler,
  unregisterDialogHandler,
} from './dialog';
import { Modal } from '../modal/Modal';
import { Text } from '../text';
import s from './dialog.module.scss';
import { Button } from 'components/button';
import { Flex } from 'components/flex';
import { Textarea } from 'components/textarea';
import { TextInput } from 'components/textInput';
import { NumberInput } from 'components/numberInput';
import { PasswordInput } from 'components/passwordInput';

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const [inputValue, setInputValue] = useState<unknown>(null);

  useEffect(() => {
    registerDialogHandler(setDialog);
    return unregisterDialogHandler;
  }, []);

  useEffect(() => {
    setInputValue(null);
  }, [dialog]);

  const handleConfirm = (result: unknown) => {
    if (!dialog) return;
    if (dialog.type === 'confirm') {
      dialog.resolve(Boolean(result));
    } else if (dialog.type === 'prompt') {
      dialog.resolve(inputValue as string | number);
    } else if (dialog.type === 'alert') {
      dialog.resolve();
    }
    setDialog(null);
  };

  const close = () => {
    if (!dialog) return;

    if (dialog.type === 'alert') {
      dialog.resolve();
    } else if (dialog.type === 'confirm') {
      dialog.resolve(false);
    } else if (dialog.type === 'prompt') {
      dialog.resolve(null);
    }
    setDialog(null);
  };

  const defaultTitle =
    dialog?.type === 'alert'
      ? 'Alert'
      : dialog?.type === 'confirm'
      ? 'Confirm'
      : dialog?.type === 'prompt'
      ? 'Prompt'
      : 'Alert';

  return (
    <>
      {children}

      {dialog && (
        <Modal
          title={dialog.title || defaultTitle}
          content={
            <Flex direction="vertical" gap="xl" className={s.AlertContent}>
              <Text block className={s.AlertMessage}>
                {dialog.message}
              </Text>
              {dialog.type === 'alert' && (
                <Button
                  variant="submit"
                  label={dialog.okText || 'OK'}
                  onClick={close}
                />
              )}
              {dialog.type === 'confirm' && (
                <Flex gap="s" direction="vertical">
                  <Button
                    variant="submit"
                    label={dialog.confirmText || 'Confirm'}
                    danger={dialog.danger}
                    onClick={() => handleConfirm(true)}
                  />
                  <Button
                    label={dialog.rejectText || 'Cancel'}
                    onClick={close}
                  />
                </Flex>
              )}
              {dialog.type === 'prompt' && (
                <Flex gap="s" direction="vertical">
                  {dialog.inputType === 'string' && (
                    <TextInput
                      value={inputValue as string}
                      onChange={(value) => setInputValue(value)}
                      placeholder={dialog.placeholder}
                      autoFocus
                    />
                  )}
                  {dialog.inputType === 'number' && (
                    <NumberInput
                      value={inputValue as number}
                      onChange={(value) => setInputValue(value)}
                      placeholder={dialog.placeholder}
                      autoFocus
                    />
                  )}
                  {dialog.inputType === 'password' && (
                    <PasswordInput
                      value={inputValue as string}
                      onChange={(value) => setInputValue(value)}
                      placeholder={dialog.placeholder}
                      autoFocus
                    />
                  )}
                  {dialog.inputType === 'text' && (
                    <Textarea
                      value={inputValue as string}
                      onChange={(value) => setInputValue(value)}
                      placeholder={dialog.placeholder}
                      autoFocus
                    />
                  )}
                  <Button
                    variant="submit"
                    label={dialog.confirmText || 'Confirm'}
                    onClick={() => handleConfirm(true)}
                  />
                  <Button
                    label={dialog.cancelText || 'Cancel'}
                    onClick={close}
                  />
                </Flex>
              )}
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
