import { TextInput } from './index';

export { default as Default } from './stories/DefaultTextInput';
export { default as LeftTextIsland } from './stories/LeftIslandWithText';
export { default as RightIconIsland } from './stories/RightIslandWithIcon';
export { default as BothIslands } from './stories/BothIslands';
export { default as Suggestions } from './stories/TextInputSuggestions';

export default {
  component: TextInput,
  title: 'Forms/TextInput'
};
