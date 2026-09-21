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
import { TextArea } from 'components/textArea';
import { TextInput } from 'components/textInput';
import { NumberInput } from 'components/numberInput';
import { PasswordInput } from 'components/passwordInput';
import { useLocalization } from '../application';

type PromptValue = string | number | null;

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const t = useLocalization();

  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [promptValue, setPromptValue] = useState<PromptValue>(null);

  const [displayDialog, setDisplayDialog] = useState<DialogState | null>(null);
  if (dialog && dialog !== displayDialog) {
    setDisplayDialog(dialog);
  }

  useEffect(() => {
    registerDialogHandler(setDialog);
    return () => unregisterDialogHandler(setDialog);
  }, []);

  useEffect(() => {
    if (dialog) {
      setPromptValue(null);
    }
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
    displayDialog?.type === 'confirm'
      ? t('dialog.confirmTitle')
      : displayDialog?.type === 'prompt'
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
        <TextArea
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

      <Modal
        title={displayDialog?.title || defaultTitle}
        open={Boolean(dialog)}
        onClose={cancel}
        size="s"
        showCancelButton={false}
        content={
          displayDialog ? (
            <Flex orientation="vertical" gap="xl">
              <Text block className={s.AlertMessage}>
                {displayDialog.message}
              </Text>

              {displayDialog.type === 'alert' && (
                <Button
                  variant="submit"
                  label={displayDialog.okText || t('dialog.ok')}
                  onClick={accept}
                />
              )}

              {displayDialog.type === 'confirm' && (
                <Flex gap="s" orientation="vertical">
                  <Button
                    variant="submit"
                    label={displayDialog.confirmText || t('dialog.confirm')}
                    danger={displayDialog.danger}
                    onClick={accept}
                  />
                  <Button
                    label={displayDialog.cancelText || t('dialog.cancel')}
                    onClick={cancel}
                  />
                </Flex>
              )}

              {displayDialog.type === 'prompt' && (
                <Flex gap="s" orientation="vertical">
                  {renderPromptInput(displayDialog)}
                  <Button
                    variant="submit"
                    label={displayDialog.confirmText || t('dialog.confirm')}
                    onClick={accept}
                  />
                  <Button
                    label={displayDialog.cancelText || t('dialog.cancel')}
                    onClick={cancel}
                  />
                </Flex>
              )}
            </Flex>
          ) : (
            <></>
          )
        }
      />
    </>
  );
};
