import { TextIsland, IconIsland, ActionIsland, CustomIsland } from './components';

type TextInputIslandType = {
  Text: typeof TextIsland;
  Icon: typeof IconIsland;
  Action: typeof ActionIsland;
  Custom: typeof CustomIsland;
};

export const TextInputIsland: TextInputIslandType = {
  Text: TextIsland,
  Icon: IconIsland,
  Action: ActionIsland,
  Custom: CustomIsland
};
