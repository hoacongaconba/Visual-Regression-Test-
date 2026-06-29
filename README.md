# 🎨 Visual Regression Testing Demo

Một dự án hoàn chỉnh để học và thực hành **Visual Regression Testing** sử dụng **Playwright**, **pixelmatch**, và **pngjs**.

## 📋 Mục Đích

Dự án này cung cấp:
- ✅ Trang web demo HTML/CSS đẹp để test
- ✅ HTTP Server Node.js đơn giản để serve trang web
- ✅ Các test Playwright hoàn chỉnh
- ✅ So sánh ảnh pixel-perfect
- ✅ HTML Report chi tiết

## 🚀 Cách Sử Dụng

### 1️⃣ **Chạy Demo Website Standalone**

```bash
npm run server
```

Truy cập: `http://localhost:3000`

### 2️⃣ **Chạy Test Demo Website**

Test sẽ tự động khởi động server:

```bash
npm run test:visual
```

Hoặc chạy test demo cụ thể:

```bash
npm run test demo.spec.js
```

### 3️⃣ **Chạy Tất Cả Test**

```bash
npm test
```

### 4️⃣ **Xem HTML Report**

```bash
npm run report
```

## 📦 Cấu Trúc Thư Mục

```
visual-regression-demo/
├── public/
│   └── index.html              # 🌐 Demo website
├── tests/
│   ├── compare-images.spec.js  # So sánh 2 ảnh PNG
│   ├── compare-websites.spec.js # So sánh 2 website
│   ├── visual.spec.js          # Snapshot testing
│   ├── demo.spec.js            # Test demo website
│   ├── demo.spec.js-snapshots/ # Lưu snapshot demo
│   ├── visual.spec.js-snapshots/
│   └── compare-websites.spec.js-snapshots/
├── images/
│   ├── expected/               # Ảnh chuẩn
│   ├── actual/                 # Ảnh thực tế
│   └── diff/                   # Ảnh so sánh
├── playwright-report/          # HTML Report
├── server.js                   # HTTP Server
├── playwright.config.js        # Cấu hình Playwright
└── package.json
```

## 🧪 Các Test Có Sẵn

### **demo.spec.js** - Test Demo Website
- `demo homepage visual snapshot` - Chụp toàn bộ trang
- `demo header section` - Chụp header
- `demo cards section` - Chụp phần cards
- `demo features section` - Chụp phần features
- `demo page responsiveness` - Test mobile view
- `hover effects on cards` - Test hover animation
- `page structure and elements` - Kiểm tra DOM structure

### **compare-images.spec.js** - So Sánh Ảnh PNG
```bash
npm run test:compare-images
```
Yêu cầu: Đặt 2 ảnh PNG trong `images/expected/` và `images/actual/`

### **compare-websites.spec.js** - So Sánh 2 Website
```bash
npm run test:compare-websites
```
- Chụp ảnh 2 website (có thể sửa URL)
- So sánh pixel
- Tạo diff image

### **visual.spec.js** - Snapshot Testing
```bash
npm run test:visual
```
So sánh screenshot với snapshot trước đó

## 🎯 Các Npm Scripts

```bash
npm run server              # Chạy HTTP server
npm test                    # Chạy tất cả test
npm run test:compare-images # Chạy test so sánh ảnh
npm run test:compare-websites # Chạy test so sánh website
npm run test:visual         # Chạy test visual snapshot
npm run test:ui             # Chạy test với UI mode
npm run test:debug          # Debug test
npm run report              # Xem HTML report
```

## 🛠️ Tech Stack

- **Framework**: Playwright Test (@playwright/test)
- **Trình duyệt**: Chromium, Firefox, WebKit
- **Xử lý ảnh**: pngjs, pixelmatch
- **HTTP Server**: Node.js built-in http module
- **Reporter**: HTML Reporter (mặc định)

## 📸 Cách Workflow Hoạt Động

### Lần Đầu Chạy (Tạo Snapshot)
```
1. Test chạy → Chụp screenshot
2. So sánh: Không có snapshot cũ → Tạo snapshot mới
3. ✅ Test PASS
4. Snapshot lưu trong `*.spec.js-snapshots/`
```

### Lần Sau (So Sánh)
```
1. Test chạy → Chụp screenshot
2. So sánh: screenshot vs snapshot
3. Nếu khác: ❌ Test FAIL, tạo diff image
4. Nếu giống: ✅ Test PASS
```

### Cập Nhật Snapshot
```bash
npx playwright test --update-snapshots
```

## 💡 Tips

### 1. Tạo Visual Regression (Cố Ý Fail Test)

Sửa `public/index.html`:
```html
<!-- Thay đổi gradient color -->
<style>
    body {
        background: linear-gradient(135deg, #ff0000 0%, #00ff00 100%);
    }
</style>
```

Chạy test:
```bash
npm run test demo.spec.js
```

Test sẽ FAIL vì ảnh đã thay đổi! 📸

### 2. Xem Diff Image Chi Tiết

```bash
npm run report
```

Tìm test FAIL → Klik vào attachment → Xem diff image với phần khác được tô đỏ

### 3. So Sánh 2 Website

Sửa URL trong `tests/compare-websites.spec.js`:
```javascript
// Web 1 (chuẩn)
await page.goto('https://playwright.dev/');

// Web 2 (so sánh) - Thay đổi URL này
await page.goto('https://playwright.dev/docs/intro');
```

## 🔍 Pixelmatch Threshold

Trong code test, có thể điều chỉnh độ nhạy:

```javascript
const diffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.1  // 0 = chặt, 1 = lỏng
});
```

- `0.1`: Cực kỳ chặt (phát hiện 1 pixel khác)
- `0.2-0.3`: Bình thường
- `0.5`: Lỏng (bỏ qua nhỏ)

## 🚨 Troubleshooting

### Port 3000 đã được sử dụng
```bash
# Tìm process sử dụng port 3000
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F
```

### Test timeout
Tăng timeout trong `playwright.config.js`:
```javascript
webServer: {
    timeout: 120000,  // 2 phút
}
```

### Snapshot không được update
```bash
npx playwright test --update-snapshots
```

## 📖 Tài Liệu Tham Khảo

- [Playwright Documentation](https://playwright.dev)
- [Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Pixelmatch](https://github.com/mapbox/pixelmatch)

## 📝 License

ISC

---

## 🎓 Học Tập

Hãy thực hành:

1. ✅ Chạy test demo website
2. ✅ Sửa CSS trong `public/index.html` → Test fail
3. ✅ Xem diff image trong report
4. ✅ Cập nhật snapshot hoặc fix CSS
5. ✅ Chạy lại test → Test pass

Happy Testing! 🚀
