import { useState } from 'react';
import { Application, Slider } from '../../src';

const SliderWrapper = ({ onValueCommit }: { onValueCommit?: () => void }) => {
  const [value, setValue] = useState(12);

  return (
    <Application theme="light">
      <Slider
        data-testid="slider"
        value={value}
        onChange={setValue}
        showCurrentValue="always"
        name="input"
        onValueCommit={onValueCommit}
      />
    </Application>
  );
};

describe('Slider.cy.tsx', () => {
  it('keyboard events has to work correctly', () => {
    cy.viewport(1360, 720);
    cy.mount(<SliderWrapper />);

    cy.get('[data-testid="slider"]').focus().type('{rightArrow}');
    cy.get('[name="input"]').should('have.value', 13);

    cy.get('[data-testid="slider"]').focus().type('{leftArrow}{leftArrow}');
    cy.get('[name="input"]').should('have.value', 11);

    cy.get('[data-testid="slider"]').focus().type('{End}');
    cy.get('[name="input"]').should('have.value', 100);

    cy.get('[data-testid="slider"]').focus().type('{Home}');
    cy.get('[name="input"]').should('have.value', 0);
  });

  it('pointer events has to work correctly', () => {
    cy.viewport(1360, 720);
    cy.mount(<SliderWrapper />);

    cy.get('[data-testid="slider"]').click(800, 20);
    cy.get('[name="input"]').should('have.value', 60);

    cy.get('[data-testid="slider"]')
      .trigger('pointerdown', {
        which: 1,
        clientX: 800,
        clientY: 20,
      })
      .trigger('pointermove', {
        which: 1,
        clientX: 500,
        clientY: 20,
      })
      .trigger('pointerup');
    cy.get('[name="input"]').should('have.value', 37);

    cy.get('[data-testid="slider"]').click(1340, 20);
    cy.get('[name="input"]').should('have.value', 100);
  });

  it('onValueCommit prop has to work correctly', () => {
    const onValueCommit = cy.spy().as('onValueCommit');

    cy.viewport(1360, 720);
    cy.mount(<SliderWrapper onValueCommit={onValueCommit} />);

    cy.get('[data-testid="slider"]')
      .trigger('pointerdown', { clientX: 800, clientY: 20 })
      .trigger('pointerup');
    cy.get('@onValueCommit').should('have.been.calledWith', 59);

    cy.get('[data-testid="slider"]')
      .trigger('pointerdown', { clientX: 600, clientY: 20 })
      .trigger('pointerup');
    cy.get('@onValueCommit').should('have.been.calledWith', 44);

    cy.get('[data-testid="slider"]')
      .trigger('pointerdown', { clientX: 600, clientY: 20 })
      .trigger('pointermove', { clientX: 700, clientY: 20 })
      .trigger('pointerup');
    cy.get('@onValueCommit').should('not.have.been.calledWith', 45);
    cy.get('@onValueCommit').should('have.been.calledWith', 51);

    cy.get('[data-testid="slider"]').focus().type('{rightArrow}');
    cy.get('@onValueCommit').should('have.been.calledWith', 52);
  });
});
