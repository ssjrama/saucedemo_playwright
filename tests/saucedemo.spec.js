// @ts-check
const { test, expect } = require('@playwright/test');

const data_login = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    valid: true
  },
  {
    username: 'standard_use',
    password: 'secret_sauc',
    valid: false,
    message: 'wrong'
  },
  {
    username: '',
    password: '',
    valid: false,
    message: 'empty'
  },
];

for (const data of data_login) {
  test(`Login ${data.username}`, async ({ page }) => {
    test.slow();
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(data.username);
    await page.getByPlaceholder('Password').fill(data.password);
    await page.getByPlaceholder('Password').press('Enter');
    if (data.valid) {
      await expect(page.getByTestId('item-4-title-link')).toHaveText('Sauce Labs Backpack');
    } else {
      if (data.message == 'wrong') {
        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username and password do not match any user in this service');
      } else if (data.message == 'empty'){
        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username is required');
      }
    }
  });  
}
