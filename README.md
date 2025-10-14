# 324 Frontend - TypeScript Node.js

Frontend web application với giao diện mobile-first.

## 📋 Tính năng

- Mobile-First Design
- TypeScript
- Express Server
- API Proxy
- Responsive UI
- Bottom Navigation (Mobile)
- Pull-to-refresh
- Real-time server status
- Touch-friendly interface

## 🚀 Cài đặt

```bash
npm install
```

## 🏃 Chạy ứng dụng

### Development

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:4000`

### Production

```bash
npm run build
npm start
```

## 📦 Cấu trúc

```
324-fe/
├── src/
│   └── server.ts          # Express server với TypeScript
├── public/
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Mobile-first CSS
│   └── app.js             # Client-side JavaScript
├── dist/                  # Compiled TypeScript output
├── package.json
└── tsconfig.json
```

## 🎨 UI Components

### Sections
- **Hero Section**: Hiển thị thống kê tổng quan
- **Products Section**: Danh sách sản phẩm với grid layout
- **Users Section**: Danh sách người dùng
- **About Section**: Thông tin về ứng dụng

### Navigation
- **Top Navigation**: Menu toggle cho mobile
- **Bottom Navigation**: Fixed bottom nav cho mobile

### Features
- Smooth scrolling
- Active section highlighting
- Touch-friendly cards
- Loading states
- Error handling
- Refresh buttons

## 🔧 Environment Variables

Tạo file `.env`:

```env
PORT=4000
NODE_ENV=development
API_URL=http://localhost:5000
```

## 📡 API Routes (Proxy)

Frontend proxy các request đến backend:

- `GET /api/users` → `http://localhost:5000/users`
- `GET /api/products` → `http://localhost:5000/products`
- `GET /api/health` → `http://localhost:5000/health`

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px (Primary focus)
- **Tablet**: >= 768px
- **Desktop**: >= 1024px

### Mobile-First Features

- Bottom navigation
- Touch-optimized buttons
- Swipe gestures
- Pull-to-refresh
- Viewport optimized
- Touch feedback

## 🎨 Design System

### Colors

```css
--primary: #6366f1
--secondary: #8b5cf6
--success: #10b981
--danger: #ef4444
--text: #1f2937
--bg: #ffffff
--bg-light: #f9fafb
```

### Typography

- Font Family: System fonts
- Base Size: 16px
- Line Height: 1.6

### Spacing

- Container Max-width: 480px (mobile), 720px (tablet), 960px (desktop)
- Padding: 16px (mobile)

## 📝 Scripts

```bash
npm start              # Run production server
npm run dev            # Run development with ts-node
npm run build          # Build TypeScript
npm run watch          # Watch mode with nodemon
```

## 🧪 Testing

Mở browser và truy cập `http://localhost:4000`

### Manual Testing Checklist

- [ ] Trang load đúng
- [ ] Products hiển thị từ API
- [ ] Users hiển thị từ API
- [ ] Bottom navigation hoạt động
- [ ] Smooth scroll hoạt động
- [ ] Refresh buttons hoạt động
- [ ] Server status hiển thị đúng
- [ ] Responsive trên các màn hình

## 📚 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Server**: Express
- **HTTP Client**: Axios
- **CSS**: Vanilla CSS (Mobile-First)
- **JavaScript**: Vanilla JS (ES6+)

## 🔌 Kết nối Backend

Đảm bảo backend đang chạy tại `http://localhost:5000` trước khi start frontend.

```bash
# Terminal 1: Start backend
cd ../324-be
npm run start:dev

# Terminal 2: Start frontend
cd ../324-fe
npm run dev
```

## 🎯 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 PWA Ready

Giao diện đã sẵn sàng để thêm:
- Service Worker
- Web App Manifest
- Offline support
- Install prompt

