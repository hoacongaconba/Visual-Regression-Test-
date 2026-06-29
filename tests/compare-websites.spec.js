const { test, expect } = require('@playwright/test');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch').default;

test('So sanh 2 trang web khac nhau', async ({ page }, testInfo) => {

    // Lấy tên trình duyệt đang chạy (chromium, firefox, webkit) để đặt tên file không bị trùng nhau
    const browserName = testInfo.project.name; 
    const img1Path = `./images/web-1-${browserName}.png`;
    const img2Path = `./images/web-2-${browserName}.png`;
    const diffPath = `./images/web-diff-${browserName}.png`;

    // 1. Vào trang web gốc (Chuẩn)
    console.log(`[${browserName}] Đang truy cập Web 1...`);
    await page.goto('https://playwright.dev/');
    await page.waitForTimeout(2000); 
    await page.screenshot({ path: img1Path });

    // 2. Vào trang web cần so sánh
    console.log(`[${browserName}] Đang truy cập Web 2...`);
    // Đổi link này thành https://playwright.dev/docs/intro để tạo lỗi
    // Hoặc giữ nguyên https://playwright.dev/ để Pass xanh hết
    await page.goto('https://playwright.dev/');
    await page.waitForTimeout(2000); 
    await page.screenshot({ path: img2Path });

    // 3. Tiến hành so sánh bằng PixelMatch
    console.log(`[${browserName}] Đang phân tích...`);
    const img1 = PNG.sync.read(fs.readFileSync(img1Path));
    const img2 = PNG.sync.read(fs.readFileSync(img2Path));
    const { width, height } = img1;
    
    const diff = new PNG({ width, height });
    const diffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

    // 4. Lưu ảnh tô đỏ phần lỗi
    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    // Đính kèm ảnh vào Report
    await testInfo.attach('Ảnh Web Chuẩn', { path: img1Path, contentType: 'image/png' });
    await testInfo.attach('Ảnh Web Thực tế', { path: img2Path, contentType: 'image/png' });
    await testInfo.attach('Ảnh Bôi đỏ chỗ lỗi', { path: diffPath, contentType: 'image/png' });

    // Báo lỗi nếu có sự khác biệt
    expect(diffPixels).toBe(0);
});