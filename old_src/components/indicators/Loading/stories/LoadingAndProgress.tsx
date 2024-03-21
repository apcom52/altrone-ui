import { StoryObj } from '@storybook/react';
import { Loading } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Size } from '../../../../types';
import { Progress, ProgressVariant } from '../../Progress';

export const LoadingAndProgress: StoryObj<typeof Loading> = {
  name: 'Loading and Progress',
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ display: 'flex', width: 100 }}>
          <Loading size={Size.small} />
          <Progress value={40} size={Size.small} variant={ProgressVariant.circular} />
        </div>
        <div style={{ display: 'flex', width: 100 }}>
          <Loading size={Size.medium} />
          <Progress value={40} size={Size.medium} variant={ProgressVariant.circular} />
        </div>
        <div style={{ display: 'flex', width: 100 }}>
          <Loading size={Size.large} />
          <Progress value={40} size={Size.large} variant={ProgressVariant.circular} />
        </div>
      </div>
    );
  },
  decorators: [StorybookDecorator]
};
