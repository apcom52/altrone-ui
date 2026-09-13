import { useState } from 'react';
import { ColorPicker, Application } from '../../src';
import { COLORS } from '../../src/components/colorPicker/COLORS';

const ColorPickerWrapper = () => {
  const [value, setValue] = useState('#00ff00');

  return (
    <Application>
      <ColorPicker
        data-testid="picker"
        value={value}
        onChange={(newColor) => {
          setValue(newColor); // Обновляем состояние
        }}
        colorPresets={COLORS}
      />
    </Application>
  );
};

describe('ColorPicker.cy.tsx', () => {
  it('check rgb color transformation', () => {
    cy.viewport(1360, 720);
    cy.mount(<ColorPickerWrapper />);

    cy.get('[data-testid="picker"]').should('exist');
    cy.get('[data-testid="picker"]').click();

    cy.contains('palette').click();

    cy.get('[title="R"]')
      .type('{backspace}{backspace}{backspace}{rightArrow}{backspace}125')
      .focus()
      .blur();
    cy.get('[title="G"]')
      .type('{backspace}{backspace}{backspace}{rightArrow}{backspace}125')
      .focus()
      .blur();
    cy.get('[title="B"]')
      .type('{backspace}{backspace}{backspace}{rightArrow}{backspace}125')
      .focus()
      .blur();

    cy.get('[data-testid="picker"]').should('have.value', '#7d7d7d');
  });

  it('check click on palette', () => {
    cy.viewport(1360, 720);
    cy.mount(<ColorPickerWrapper />);

    cy.get('[data-testid="picker"]').click();

    cy.contains('palette').click();

    cy.get('[class="react-colorful__saturation"]').click(80, 120);
    cy.get('[data-testid="picker"]').should('have.value', '#1d2d1d');

    cy.get('[aria-label="Hue"]').click(200, 5);
    cy.get('[aria-label="Alpha"]').click(100, 5);
    cy.get('[data-testid="picker"]').should('have.value', '#2d1d2475');
  });

  it('check color presets', () => {
    cy.viewport(1360, 720);
    cy.mount(<ColorPickerWrapper />);

    cy.get('[data-testid="picker"]').click();

    cy.get('[title="Amber"]').click();
    cy.get('[data-testid="picker"]').should('have.value', '#ffbf00');

    cy.get('[title="Crimson"]').click();
    cy.get('[data-testid="picker"]').should('have.value', '#dc143c');
  });
});
