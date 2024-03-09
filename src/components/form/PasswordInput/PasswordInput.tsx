import { TextInput, TextInputProps } from '../index';
import { useCallback, useState } from 'react';
import { Icon } from '../../typography';
import { TextInputIsland } from '../TextInput';

interface PasswordInputProps
  extends Omit<
    TextInputProps,
    'suggestions' | 'useLiveSuggestions' | 'loading' | 'onFocus' | 'onBlur'
  > {
  showControls?: boolean;
}

/**
 * This component is used for enter secret information
 * @param showControls
 * @param rightIsland
 * @param props
 * @constructor
 */
const PasswordInput = ({ showControls = true, rightIsland, ...props }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible = useCallback(() => {
    setIsPasswordVisible((old) => !old);
  }, []);

  return (
    <TextInput {...props} type={isPasswordVisible ? 'text' : 'password'}>
      {showControls ? (
        <TextInputIsland.Action
          icon={isPasswordVisible ? <Icon i="visibility_off" /> : <Icon i="visibility" />}
          label={isPasswordVisible ? 'Hide password' : 'Show password'}
          placement="right"
          onClick={togglePasswordVisible}
          showLabel={false}
        />
      ) : null}
    </TextInput>
  );
};

export default PasswordInput;
