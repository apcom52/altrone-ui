import { TextIsland, IconIsland, ActionIsland } from './components';

type TextInputIslandType = {
  Text: typeof TextIsland;
  Icon: typeof IconIsland;
  Action: typeof ActionIsland;
};

export const TextInputIsland: TextInputIslandType = {
  Text: TextIsland,
  Icon: IconIsland,
  Action: ActionIsland
};
