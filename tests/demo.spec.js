const { test, expect } = require('@playwright/test');

test.describe('Demo Website Visual Tests', () => {

    test('demo homepage visual snapshot', async ({ page }) => {
        // Truy cập trang demo local
        await page.goto('http://localhost:3000');
        
        // Chờ page load xong
        await page.waitForLoadState('networkidle');
        
        // Chụp ảnh full page
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('demo-homepage.png');
    });

    test('demo header section', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Chụp ảnh header
        const header = await page.locator('header');
        expect(await header.screenshot()).toMatchSnapshot('demo-header.png');
    });

    test('demo cards section', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Chụp ảnh content grid (cards)
        const grid = await page.locator('.content-grid');
        expect(await grid.screenshot()).toMatchSnapshot('demo-cards.png');
    });

    test('demo features section', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Scroll tới section features
        await page.locator('.features').scrollIntoViewIfNeeded();
        
        // Chụp ảnh features section
        const features = await page.locator('.features');
        expect(await features.screenshot()).toMatchSnapshot('demo-features.png');
    });

    test('demo page responsiveness', async ({ page }) => {
        // Test mobile view
        await page.setViewportSize({ width: 375, height: 812 }); // iPhone size
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('demo-mobile.png');
    });

    test('hover effects on cards', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        const firstCard = page.locator('.card').first();
        
        // Hover vào card đầu tiên
        await firstCard.hover();
        await page.waitForTimeout(300); // Chờ animation hoàn thành
        
        expect(await firstCard.screenshot()).toMatchSnapshot('demo-card-hover.png');
    });

    test('page structure and elements', async ({ page }) => {
        await page.goto('http://localhost:3000');
        
        // Check header exists
        await expect(page.locator('header h1')).toContainText('Visual Regression Testing Demo');
        
        // Check cards exist
        const cards = page.locator('.card');
        expect(await cards.count()).toBe(3);
        
        // Check features exist
        const features = page.locator('.features ul li');
        expect(await features.count()).toBeGreaterThan(0);
        
        // Check footer exists
        await expect(page.locator('footer')).toBeVisible();
    });
});
