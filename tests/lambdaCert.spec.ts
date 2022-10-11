import test from '../lambdatest-setup';
import { expect } from '@playwright/test';

const url = 'https://www.lambdatest.com/selenium-playground';

test.describe.configure({ mode: 'parallel' });
test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test('Scenario 1: Simple Form demo', async ({ page }) => {
  await page.locator('text=Simple Form Demo').click();
  await expect(page).toHaveURL(url + '/simple-form-demo');
  const message = 'Welcome to LambdaTest';
  await page.locator('input#user-message').fill(message);
  await page.locator('#showInput').click();
  await expect(page.locator('#message')).toHaveText(message);
});

test('Scenario 2: “Progress Bars & Sliders”.', async ({ page }) => {
  await page.locator('text=Drag & Drop Sliders').click();
  await expect(page).toHaveURL(url + '/drag-drop-range-sliders-demo');
  const dragValue = '95';
  const dropDown = await page.waitForSelector('.sp__range-success input', {
    state: 'visible',
  });
  await dropDown.fill(dragValue, { force: true });

  await expect(page.locator('#rangeSuccess')).toHaveText(dragValue);
  console.log('Test');
});
test('Scenario 3: Input Forms Submit', async ({ page }) => {
  await page.locator('text=Input Form Submit').click();
  await expect(page).toHaveURL(url + '/input-form-demo');
  await page.locator('#seleniumform button').click();
  await page.locator('text=Please fill out this field').isVisible();
  await page.locator('[placeholder="Name"]').fill('Jose');
  await page.locator('[placeholder="Email"]').fill('xfaramir');
  await page.locator('[placeholder="Email"]').fill('xfaramir@gmail.com');
  await page.locator('[placeholder="Password"]').fill('123456');
  await page.locator('[placeholder="Company"]').fill('Huge');
  await page.locator('[placeholder="Website"]').fill('Self');
  await page.locator('select[name=country]').selectOption('US');
  await page.locator('[placeholder="City"]').fill('Bogota');
  await page.locator('[placeholder="Address 1"]').fill('Fake Street');
  await page.locator('[placeholder="Address 2"]').fill('Miami Street');
  await page.locator('[placeholder="State"]').fill('Bogota');
  await page.locator('[placeholder="Zip code"]').fill('111631');
  await page.locator('button:has-text("Submit")').click();
  await expect(page.locator('.success-msg')).toHaveText(
    'Thanks for contacting us, we will get back to you shortly.'
  );
});
