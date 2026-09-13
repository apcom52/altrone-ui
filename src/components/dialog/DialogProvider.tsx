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
import { useLocalization } from '../application';

type PromptValue = string | number | null;

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const t = useLocalization();

  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [promptValue, setPromptValue] = useState<PromptValue>(null);

  useEffect(() => {
    registerDialogHandler(setDialog);
    return () => unregisterDialogHandler(setDialog);
  }, []);

  useEffect(() => {
    setPromptValue(null);
  }, [dialog]);

  /** Resolve with the "dismissed" value for the current dialog type. */
  const cancel = () => {
    if (!dialog) return;

    if (dialog.type === 'confirm') {
      dialog.resolve(false);
    } else if (dialog.type === 'prompt') {
      dialog.resolve(null);
    } else {
      dialog.resolve();
    }

    setDialog(null);
  };

  const accept = () => {
    if (!dialog) return;

    if (dialog.type === 'confirm') {
      dialog.resolve(true);
    } else if (dialog.type === 'prompt') {
      dialog.resolve(promptValue);
    } else {
      dialog.resolve();
    }

    setDialog(null);
  };

  const defaultTitle =
    dialog?.type === 'confirm'
      ? t('dialog.confirmTitle')
      : dialog?.type === 'prompt'
        ? t('dialog.promptTitle')
        : t('dialog.alertTitle');

  const renderPromptInput = (
    dialogState: Extract<DialogState, { type: 'prompt' }>,
  ) => {
    const placeholder =
      dialogState.placeholder || t('dialog.promptPlaceholder');
    const stringValue = typeof promptValue === 'string' ? promptValue : '';

    if (dialogState.inputType === 'number') {
      return (
        <NumberInput
          value={typeof promptValue === 'number' ? promptValue : undefined}
          onChange={(value) => setPromptValue(value ?? null)}
          placeholder={placeholder}
          autoFocus
        />
      );
    }

    if (dialogState.inputType === 'password') {
      return (
        <PasswordInput
          value={stringValue}
          onChange={(value) => setPromptValue(value)}
          placeholder={placeholder}
          autoFocus
        />
      );
    }

    if (dialogState.inputType === 'text') {
      return (
        <Textarea
          value={stringValue}
          onChange={(value) => setPromptValue(value)}
          placeholder={placeholder}
          autoFocus
        />
      );
    }

    return (
      <TextInput
        value={stringValue}
        onChange={(value) => setPromptValue(value)}
        placeholder={placeholder}
        autoFocus
      />
    );
  };

  return (
    <>
      {children}

      {dialog && (
        <Modal
          title={dialog.title || defaultTitle}
          openedByDefault
          onClose={cancel}
          size="s"
          showCancelButton={false}
          content={
            <Flex direction="vertical" gap="xl">
              <Text block className={s.AlertMessage}>
                {dialog.message}
              </Text>

              {dialog.type === 'alert' && (
                <Button
                  variant="submit"
                  label={dialog.okText || t('dialog.ok')}
                  onClick={accept}
                />
              )}

              {dialog.type === 'confirm' && (
                <Flex gap="s" direction="vertical">
                  <Button
                    variant="submit"
                    label={dialog.confirmText || t('dialog.confirm')}
                    danger={dialog.danger}
                    onClick={accept}
                  />
                  <Button
                    label={dialog.rejectText || t('dialog.cancel')}
                    onClick={cancel}
                  />
                </Flex>
              )}

              {dialog.type === 'prompt' && (
                <Flex gap="s" direction="vertical">
                  {renderPromptInput(dialog)}
                  <Button
                    variant="submit"
                    label={dialog.confirmText || t('dialog.confirm')}
                    onClick={accept}
                  />
                  <Button
                    label={dialog.cancelText || t('dialog.cancel')}
                    onClick={cancel}
                  />
                </Flex>
              )}
            </Flex>
          }
        />
      )}
    </>
  );
};
