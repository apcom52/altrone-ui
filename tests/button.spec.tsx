import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { AltroneApplication, Button, Flex, Icon, Role } from '../src';

const allRoles: Role[] = ['default', 'primary', 'success', 'warning', 'danger'];

test('Snapshot testing', async ({ page, mount }) => {
  const component = await mount(
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

  expect(await page.screenshot()).toMatchSnapshot('button-1.png');
});
