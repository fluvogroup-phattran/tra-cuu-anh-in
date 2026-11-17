# Fluvo – App tra cứu ảnh in (PWA)

App cài lên điện thoại, dùng chung dữ liệu với Apps Script hiện tại (sheet "Link mới 1").

## Cấu trúc

| File | Vai trò |
|---|---|
| `index.html` | Giao diện app |
| `config.js` | Link Apps Script `/exec` (**cần sửa**) |
| `manifest.webmanifest` | Tên app, icon, chế độ toàn màn hình |
| `sw.js` | Lưu sẵn giao diện để mở nhanh |
| `logo.png`, `icons/` | Logo và icon Fluvo |
| `vendor/zxing.min.js` | Thư viện đọc mã vạch/QR (ZXing 0.21.3, giấy phép Apache-2.0) |

## Bước 1 – Cập nhật Apps Script

1. Dán đè `WebApp.gs` mới (đã thêm API `?action=search|image|ping`).
2. Deploy → Manage deployments → Edit → Version: **New version** → Deploy.
   Giữ nguyên **Execute as: Me**, **Who has access: Anyone**.
3. Kiểm tra: mở `<link /exec>?action=ping` trên trình duyệt, thấy `{"ok":true,"data":"pong"}` là được.

## Bước 2 – Điền link vào `config.js`

```js
window.FLUVO_API_URL = "https://script.google.com/macros/s/AKfy.../exec";
```

## Bước 3 – Đưa lên GitHub Pages (miễn phí, có HTTPS)

1. Tạo tài khoản GitHub → **New repository**, đặt tên ví dụ `fluvo-tra-cuu`, chọn **Public**.
2. Trong repo: **Add file → Upload files** → kéo thả **toàn bộ nội dung** thư mục này (cả thư mục `icons/`, `vendor/`) → **Commit changes**.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, thư mục `/ (root)` → **Save**.
4. Sau 1–2 phút, app có địa chỉ `https://<tên-tài-khoản>.github.io/fluvo-tra-cuu/`.

Repo công khai chỉ chứa giao diện. Dữ liệu khách nằm ở Google Sheet, không nằm trong repo.

## Bước 4 – Cài lên điện thoại

**iPhone:** mở link bằng **Safari** → nút **Chia sẻ** → **Thêm vào MH chính** → **Thêm**.
**Android:** mở bằng **Chrome** → bấm **Cài app** trên banner (hoặc menu ⋮ → *Cài đặt ứng dụng*).

Lần đầu bấm **Quét mã**, cho phép dùng camera.

## Cập nhật app sau này

1. Sửa file, upload đè lên repo.
2. Trong `sw.js`, tăng số phiên bản: `fluvo-tra-cuu-v1` → `v2`.
3. Nhân viên đóng hẳn app rồi mở lại là nhận bản mới.

Đổi link Apps Script chỉ cần sửa `config.js`, không phải tăng phiên bản.
