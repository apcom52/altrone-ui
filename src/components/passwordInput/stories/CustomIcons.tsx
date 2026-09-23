import { useState } from 'react';
import { Flex, Text } from 'components';
import { PasswordInput } from '../PasswordInput.tsx';
import { Lock, LockOpen } from 'lucide-react';

export const CustomIcons = () => {
  const [password, setPassword] = useState('');

  return (
    <Flex orientation="vertical" gap="l" style={{ maxWidth: 420 }}>
      <Flex orientation="vertical" gap="xs">
        <Text size={6} weight="bold" block>
          Custom reveal-toggle icons
        </Text>
        <Text block>
          <Text code>showIcon</Text>/<Text code>hideIcon</Text> replace the
          default eye glyphs — useful when a consumer&rsquo;s own icon set
          shouldn&rsquo;t be mixed with the library&rsquo;s defaults.
        </Text>
      </Flex>
      <PasswordInput
        value={password}
        onChange={setPassword}
        placeholder="Password"
        showIcon={<LockOpen />}
        hideIcon={<Lock />}
      />
    </Flex>
  );
};
