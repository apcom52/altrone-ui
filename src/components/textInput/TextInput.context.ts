import { Size } from '../../types';
import { createContext, useContext } from 'react';

export const TextInputSizeContext = createContext<Size>('m');
export const useTextInputSize = () => useContext(TextInputSizeContext);

export const TextInputValueSizeContext = createContext<{
  valueLength: number;
  maxLength?: number;
}>({ valueLength: 0 });
export const useTextInputValueSize = () =>
  useContext(TextInputValueSizeContext);

/**
 * Islands render one control tier below the field they sit in (floored at
 * `mini`) — an `m` field carries `s` islands. Keeps an `ActionIsland` visibly
 * inset from the field edge without a per-size table.
 */
const ISLAND_SIZE_BY_FIELD_SIZE: Record<Size, Size> = {
  mini: 'mini',
  s: 'mini',
  m: 's',
  l: 'm',
  xl: 'l',
};

export const useIslandSize = (): Size =>
  ISLAND_SIZE_BY_FIELD_SIZE[useTextInputSize()];
