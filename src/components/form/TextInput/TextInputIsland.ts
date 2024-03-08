import { TextIsland } from './components/TextIsland';
import { IconIsland } from './components/IconIsland';

type TextInputIslandType = {
  Text: typeof TextIsland;
  Icon: typeof IconIsland;
};

export const TextInputIsland: TextInputIslandType = {
  Text: TextIsland,
  Icon: IconIsland
};
