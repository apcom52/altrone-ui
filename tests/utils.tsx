import React from 'react';
import ReactDOM from 'react-dom';
export async function mount(page, jsx) {
  // Устанавливаем базовый HTML для страницы
  await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Page</title>
        <script src="/index.js" type="module"></script>
      </head>
      <body>
        <h1>Hello world</h1>
        <div id="root"></div>
      </body>
      </html>
    `);

  // Передаём React и ReactDOM в глобальную область видимости
  await page.evaluate(() => {
    window.React = React;
    window.ReactDOM = ReactDOM;
  });

  // Рендерим компонент
  const jsxString = jsx.toString();
  await page.evaluate(
    ({ jsxCode }) => {
      const { React, ReactDOM } = window;
      const container = document.getElementById('root');
      const component = eval(jsxCode); // Преобразуем JSX в React-элемент
      ReactDOM.render(component, container);
    },
    { jsxCode: jsxString },
  );

  // Возвращаем локатор для взаимодействия с компонентом
  return page.locator('#root');
}
