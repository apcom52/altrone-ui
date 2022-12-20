import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import ButtonContainer from "./ButtonContainer";
import {Button} from "../../button";
import {Direction} from "../../../types";
import {Align} from "../../../types/Align";

describe('Containers.ButtonContainer', () => {
  test('should apply correct classes', () => {
    const { rerender } = render(<ButtonContainer
      direction={Direction.vertical}
      align={Align.end}
    >
      <Button>Left</Button>
      <Button>Right</Button>
    </ButtonContainer>)

    const buttonContainer = screen.getByTestId('alt-test-buttoncontainer')
    expect(buttonContainer).toHaveClass('alt-button-container--vertical')
    expect(buttonContainer).toHaveClass('alt-button-container--align-end')
  })
})