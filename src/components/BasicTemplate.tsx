import { Altrone } from '../hocs';
import { Theme } from '../types';

export const BasicTemplate = ({ Component = null, dark = false, ...args }) => {
  return (
    <Altrone theme={dark ? Theme.dark : Theme.light}>
      <Component {...args} />
    </Altrone>
  );
};
