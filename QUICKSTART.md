# 🚀 Hướng Dẫn Nhanh - Visual Regression Testing

## 5 Bước Để Bắt Đầu

### 📍 **Bước 1: Cài Đặt Dependencies**

```bash
npm install
```

### 📍 **Bước 2: Chạy Server (Tuỳ chọn)**

Mở terminal và chạy:

```bash
npm run server
```

Mở trình duyệt truy cập: `http://localhost:3000`

### 📍 **Bước 3: Chạy Test Demo Website**

Mở terminal khác và chạy:

```bash
npm run test demo.spec.js
```

**Lần đầu chạy**: Test sẽ tạo snapshot  
**Lần sau**: Test sẽ so sánh và check xem có thay đổi không

### 📍 **Bước 4: Xem Kết Quả Report**

```bash
npm run report
```

Trình duyệt sẽ mở HTML report tương tác

### 📍 **Bước 5: Tạo Visual Regression Test (Demo)**

Để thấy test **FAIL**, hãy:

1. Mở `public/index.html`
2. Tìm dòng `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
3. Thay đổi thành: `background: linear-gradient(135deg, #ff0000 0%, #00ff00 100%);`
4. Lưu file
5. Chạy test lại:

```bash
npm run test demo.spec.js
```

❌ **Test sẽ FAIL vì ảnh thay đổi!**

6. Xem report để thấy diff:

```bash
npm run report
```

---

## 📋 Tất Cả Các Lệnh

| Lệnh | Mô Tả |
|------|-------|
| `npm run server` | Chạy HTTP server tại port 3000 |
| `npm test` | Chạy tất cả test |
| `npm run test demo.spec.js` | Chạy test demo website |
| `npm run test:compare-images` | So sánh 2 ảnh PNG |
| `npm run test:compare-websites` | So sánh 2 website |
| `npm run test:visual` | Snapshot testing |
| `npm run test:ui` | Chạy test với UI interactice |
| `npm run test:debug` | Debug test step-by-step |
| `npm run report` | Xem HTML report |

---

## 🎯 Workflow Demo

### Lần Đầu (Tạo Baseline)

```bash
npm run test demo.spec.js
```

Output:
```
✓ demo homepage visual snapshot (800ms)
✓ demo header section (200ms)
✓ demo cards section (150ms)
✓ demo features section (180ms)
✓ demo page responsiveness (300ms)
✓ hover effects on cards (250ms)
✓ page structure and elements (100ms)

7 passed (2.5s)
```

Snapshot lưu trong: `tests/demo.spec.js-snapshots/`

### Sửa CSS (Tạo Khác Biệt)

```bash
# Chỉnh sửa public/index.html
# Thay đổi một màu hoặc style nào đó
```

### Lần Thứ Hai (So Sánh)

```bash
npm run test demo.spec.js
```

Output:
```
✗ demo homepage visual snapshot
  Error: Screenshot mismatch...

1 failed, 6 passed (2.5s)
```

### Xem Diff

```bash
npm run report
```

- Mở HTML report
- Xem diff image (phần khác được tô đỏ)
- Quyết định: Fix CSS hay Update snapshot

### Cập Nhật Snapshot

Nếu thay đổi là **intended**:

```bash
npx playwright test --update-snapshots
```

Hoặc sửa `public/index.html` lại CSS

---

## 🌐 Các Loại Test

### 1. **Demo Website Test** (demo.spec.js)
- Test trang HTML trong `public/`
- Server tự động start
- Chụp screenshot full page, header, cards, etc.

### 2. **So Sánh Ảnh PNG** (compare-images.spec.js)
```bash
npm run test:compare-images
```
- Yêu cầu: Ảnh trong `images/expected/` và `images/actual/`
- Sử dụng: pixelmatch so sánh pixel

### 3. **So Sánh 2 Website** (compare-websites.spec.js)
```bash
npm run test:compare-websites
```
- Chụp 2 website khác nhau
- So sánh và tạo diff image
- Có thể sửa URL trong test

### 4. **Snapshot Testing** (visual.spec.js)
```bash
npm run test:visual
```
- So sánh screenshot với snapshot
- Lưu snapshot trong `-snapshots` folder

---

## 💡 Mẹo

### 🔥 **Xem Test Chạy Realtime**

```bash
npm run test:ui
```

Mở UI mode, click từng test, xem step-by-step

### 🐛 **Debug Test**

```bash
npm run test:debug
```

Dừng tại mỗi step, inspect DOM, check screenshot

### 📸 **Chỉ Chụp Ảnh Một Phần**

Sửa `tests/demo.spec.js`:

```javascript
const header = page.locator('header');
expect(await header.screenshot()).toMatchSnapshot('header-only.png');
```

### 🔄 **Cập Nhật Tất Cả Snapshot**

```bash
npx playwright test --update-snapshots
```

### ⚙️ **Chạy Trên Một Browser**

```bash
npx playwright test --project=chromium
```

---

## 🚨 Gặp Lỗi?

### ❌ "Port 3000 is already in use"

```bash
# Windows - Tìm process
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F
```

### ❌ "Test timeout"

Sửa `playwright.config.js`:

```javascript
webServer: {
    timeout: 180000,  // Tăng lên 3 phút
}
```

### ❌ "Snapshot không match"

1. Xem report: `npm run report`
2. Check diff image
3. Decide: Update snapshot hay fix code

---

## 📚 Tham Khảo

- Đọc `README.md` để hiểu chi tiết
- Xem `public/index.html` - Demo website
- Xem `tests/demo.spec.js` - Cách viết test
- Xem `playwright.config.js` - Cấu hình

---

**Ready? Hãy chạy test!** 🚀

```bash
npm run test demo.spec.js
```

Sau đó xem report:

```bash
npm run report
```

Happy Testing! 🎉
