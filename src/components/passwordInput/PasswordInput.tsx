import { forwardRef, useState } from 'react';
import { PasswordInputProps } from './PasswordInput.types.ts';
import { TextInput } from '../textInput';
import { Icon } from '../icon';
import { getSafeArray } from '../../utils';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showControl, children, className, style, ...restProps }, ref) => {
    const { passwordInput: passwordInputConfig = {} } = useConfiguration();

    const needToShowControl =
      typeof showControl === 'boolean'
        ? showControl
        : passwordInputConfig.showControl || true;

    const [type, setType] = useState('password');

    const safeChildren = getSafeArray(children);

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
            label="Show password"
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
