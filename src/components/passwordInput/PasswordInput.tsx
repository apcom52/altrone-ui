import { useState } from 'react';
import { PasswordInputProps } from './PasswordInput.types.ts';
import { TextInput } from '../textInput';
import { ArrayUtils, useShowControls } from '../../utils';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import { useLocalization } from '../application/useLocalization.tsx';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = ({
  ref,
  showControls,
  children,
  className,
  style,
  readOnly,
  ...restProps
}: PasswordInputProps) => {
  const t = useLocalization();

  const { passwordInput: passwordInputConfig = {} } = useConfiguration();

  const needToShowControl = useShowControls({
    propValue: showControls,
    configValue: passwordInputConfig.showControls,
    readOnly,
  });

  const [type, setType] = useState<'password' | 'text'>('password');

  const safeChildren = ArrayUtils.getSafeArray(children);

  const cls = clsx(passwordInputConfig.className, className);
  const styles = {
    ...passwordInputConfig.style,
    ...style,
  };

  return (
    <TextInput
      type={type}
      className={cls}
      style={styles}
      ref={ref}
      readOnly={readOnly}
      {...restProps}
    >
      {...safeChildren}
      {needToShowControl ? (
        <TextInput.ActionIsland
          placement="right"
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
