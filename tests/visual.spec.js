const { test, expect } = require('@playwright/test');

test('homepage visual test', async ({ page }) => {

    await page.goto('https://playwright.dev');

    expect(await page.screenshot()).toMatchSnapshot('homepage-visual-test.png');    
});
