import { useState } from 'react';
import { PasswordInputProps } from './PasswordInput.types.ts';
import { TextInput } from '../textInput';
import { ArrayUtils, useShowControls } from '../../utils';
import clsx from 'clsx';
import { useLocalization } from '../application/useLocalization.tsx';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = ({
  ref,
  inputRef,
  showControls,
  children,
  className,
  style,
  readOnly,
  ...restProps
}: PasswordInputProps) => {
  const t = useLocalization();

  const needToShowControl = useShowControls({
    propValue: showControls,
    readOnly,
  });

  const [type, setType] = useState<'password' | 'text'>('password');

  const safeChildren = ArrayUtils.getSafeArray(children);

  const cls = clsx(className);
  const styles = {
    ...style,
  };

  return (
    <TextInput
      type={type}
      className={cls}
      style={styles}
      ref={ref}
      inputRef={inputRef}
      readOnly={readOnly}
      {...restProps}
    >
      {...safeChildren}
      {needToShowControl ? (
        <TextInput.ActionIsland
          placement="end"
          label={
            type === 'password'
              ? t('passwordInput.showPassword')
              : t('passwordInput.hidePassword')
          }
          showLabel={false}
          onClick={() => setType(type === 'password' ? 'text' : 'password')}
          icon={type === 'password' ? <Eye /> : <EyeOff />}
          aria-pressed={type === 'text'}
        />
      ) : null}
    </TextInput>
  );
};
