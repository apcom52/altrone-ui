import { forwardRef, useState } from 'react';
import { PasswordInputProps } from './PasswordInput.types.ts';
import { TextInput } from '../textInput';
import { Icon } from '../icon';
import { getSafeArray } from '../../utils';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showControl = true, children, ...restProps }, ref) => {
    const [type, setType] = useState('password');

    const safeChildren = getSafeArray(children);

    return (
      <TextInput type={type} {...restProps}>
        {...safeChildren}
        {showControl ? (
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
