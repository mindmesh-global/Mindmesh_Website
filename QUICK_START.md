# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

From the root directory:
```bash
npm install
```

Or from the website directory:
```bash
cd apps/website
npm install
```

### 2. Run Development Server

From root:
```bash
npm run dev:website
```

Or from website directory:
```bash
cd apps/website
npm run dev
```

Visit: `http://localhost:3001`

### 3. Add Your Download Files

Place your installer files in:
```
apps/website/public/downloads/
├── windows/MindMesh-Setup.exe
├── mac/MindMesh.dmg
└── linux/MindMesh.AppImage
```

### 4. Customize Content

- **Hero Section**: Edit `components/Hero.tsx`
- **Features**: Edit `components/Features.tsx`
- **Colors**: Edit `tailwind.config.ts`
- **Metadata**: Edit `app/layout.tsx`

## 📦 Build for Production

```bash
cd apps/website
npm run build
npm start
```

## 🌐 Deploy

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Set root directory to `apps/website`
4. Deploy!

### Other Options
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting

## ✨ Features Included

✅ Professional landing page
✅ Responsive design
✅ Smooth animations
✅ OS detection for downloads
✅ Download analytics tracking
✅ SEO optimized
✅ Modern UI/UX

## 🎨 Customization Tips

1. **Colors**: Update the gradient colors in `tailwind.config.ts`
2. **Content**: All text content is in component files
3. **Features**: Add/remove features in `components/Features.tsx`
4. **Links**: Update social links in `components/Footer.tsx`

