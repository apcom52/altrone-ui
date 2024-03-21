import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonContainer from './ButtonContainer';
import { Button } from '../../form';
import { Direction, Align } from '../../../types';

describe('Containers.ButtonContainer', () => {
  test('should apply correct classes', () => {
    render(
      <ButtonContainer direction={Direction.vertical} align={Align.end}>
        <Button>Left</Button>
        <Button>Right</Button>
      </ButtonContainer>
    );

    const buttonContainer = screen.getByTestId('alt-test-buttoncontainer');
    expect(buttonContainer).toHaveClass('alt-button-container--vertical');
    expect(buttonContainer).toHaveClass('alt-button-container--align-end');
  });
});
