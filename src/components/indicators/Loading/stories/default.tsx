import { ComponentStory } from '@storybook/react';
import { Loading } from '../index';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { ButtonContainer } from '../../../containers';
import React from 'react';
import { Button } from '../../../button';
import { Size } from '../../../../types';

const LoadingStory: ComponentStory<typeof Loading> = () => {
  return (
    <StorybookPlayground>
      <Loading />
      <br />
      <ButtonContainer>
        <Button size={Size.small}>
          <Loading size={Size.small} />
        </Button>
        <Button>
          <Loading />
        </Button>
        <Button size={Size.large}>
          <Loading size={Size.large} />
        </Button>
      </ButtonContainer>
    </StorybookPlayground>
  );
};

LoadingStory.args = {
  placeholder: ''
};

export default LoadingStory;
