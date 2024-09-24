import { forwardRef, useState } from 'react';
import { PasswordInputProps } from './PasswordInput.types.ts';
import { TextInput } from '../textInput';
import { Icon } from '../icon';
import { ArrayUtils } from '../../utils';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import { useLocalization } from '../application/useLocalization.tsx';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showControls, children, className, style, ...restProps }, ref) => {
    const t = useLocalization();

    const { passwordInput: passwordInputConfig = {} } = useConfiguration();

    const needToShowControl =
      typeof showControls === 'boolean'
        ? showControls
        : typeof passwordInputConfig.showControls === 'boolean'
          ? passwordInputConfig.showControls
          : true;

    const [type, setType] = useState('password');

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
            icon={
              <Icon i={type === 'password' ? 'visibility' : 'visibility_off'} />
            }
          />
        ) : null}
      </TextInput>
    );
  },
);
