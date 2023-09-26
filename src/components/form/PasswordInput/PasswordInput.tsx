import { InputIslandType, TextInput, TextInputProps } from '../index';
import { useCallback, useState } from 'react';
import { Icon } from '../../typography';

interface PasswordInputProps
  extends Omit<TextInputProps, 'suggestions' | 'useLiveSuggestions' | 'loading'> {
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
    <TextInput
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      rightIsland={
        showControls
          ? {
              type: InputIslandType.actions,
              content: [
                {
                  title: isPasswordVisible ? 'Hide password' : 'Show password',
                  icon: isPasswordVisible ? <Icon i="visibility_off" /> : <Icon i="visibility" />,
                  onClick: togglePasswordVisible
                }
              ]
            }
          : rightIsland
      }
    />
  );
};

export default PasswordInput;
