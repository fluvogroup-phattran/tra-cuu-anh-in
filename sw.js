// Đổi số phiên bản mỗi lần cập nhật file để điện thoại tải bản mới
const VERSION = "fluvo-tra-cuu-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./config.js",
  "./manifest.webmanifest",
  "./logo.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./vendor/zxing.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  // Chỉ xử lý file của chính app; dữ liệu tra cứu (Apps Script) luôn lấy mới
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  const fresh = req.mode === "navigate" || url.pathname.endsWith("/config.js");
  if (fresh) {
    // Trang và cấu hình: ưu tiên mạng, mất mạng thì dùng bản đã lưu
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
  } else {
    // Icon, logo, thư viện: ưu tiên bản đã lưu
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
  }
});
