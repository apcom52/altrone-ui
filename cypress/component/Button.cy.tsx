import { AltroneApplication, Button, Flex, Icon, Role } from '../../src';

Cypress.Screenshot.defaults({
  overwrite: true,
});

const allRoles: Role[] = ['default', 'primary', 'success', 'warning', 'danger'];

describe('Button.cy.tsx', () => {
  it('check shapshot', () => {
    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <Flex gap="l" direction="vertical">
          {allRoles.map((role) => (
            <Flex gap="s" direction="vertical">
              {['s', 'm', 'l'].map((size) => (
                <Flex gap="s">
                  <Button label="Action label" size={size} role={role} />
                  <Button
                    leftIcon={<Icon i="add" />}
                    label="Action label"
                    size={size}
                    role={role}
                  />
                  <Button
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    role={role}
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    role={role}
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    disabled
                    role={role}
                  />
                  <Button
                    label="Action label"
                    size={size}
                    role={role}
                    transparent
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    label="Action label"
                    size={size}
                    role={role}
                    transparent
                  />
                  <Button
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    role={role}
                    transparent
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    rightIcon={<Icon i="east" />}
                    label="Action label21"
                    size={size}
                    role={role}
                    transparent
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    disabled
                    role={role}
                    transparent
                  />
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
      </AltroneApplication>,
    );

    cy.compareSnapshot('button-light-1');
  });

  it('check dark theme shapshot', () => {
    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication theme="dark">
        <Flex gap="l" direction="vertical">
          {allRoles.map((role) => (
            <Flex gap="s" direction="vertical">
              {['s', 'm', 'l'].map((size) => (
                <Flex gap="s">
                  <Button label="Action label" size={size} role={role} />
                  <Button
                    leftIcon={<Icon i="add" />}
                    label="Action label"
                    size={size}
                    role={role}
                  />
                  <Button
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    role={role}
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    role={role}
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    disabled
                    role={role}
                  />
                  <Button
                    label="Action label"
                    size={size}
                    role={role}
                    transparent
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    label="Action label"
                    size={size}
                    role={role}
                    transparent
                  />
                  <Button
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    role={role}
                    transparent
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    role={role}
                    transparent
                  />
                  <Button
                    leftIcon={<Icon i="add" />}
                    rightIcon={<Icon i="east" />}
                    label="Action label"
                    size={size}
                    disabled
                    role={role}
                    transparent
                  />
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
      </AltroneApplication>,
    );

    cy.compareSnapshot('button-dark-1');
  });
});
