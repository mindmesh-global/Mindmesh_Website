# MindMesh Website

Professional marketing website for MindMesh - an AI-powered productivity assistant.

## Getting Started

### Development

```bash
# From root directory
npm run dev:website

# Or from website directory
cd apps/website
npm install
npm run dev
```

The website will be available at `http://localhost:3001`

### Build

```bash
cd apps/website
npm run build
npm start
```

## Features

- 🎨 Modern, professional design
- 📱 Fully responsive
- ⚡ Fast and optimized
- 🎭 Smooth animations with Framer Motion
- 🔍 SEO optimized
- 📊 Download analytics tracking

## Project Structure

```
apps/website/
├── app/
│   ├── api/
│   │   └── download/        # Download tracking API
│   ├── download/            # Download page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   ├── Navbar.tsx           # Navigation bar
│   ├── Hero.tsx             # Hero section
│   ├── Features.tsx          # Features grid
│   ├── DownloadSection.tsx   # Download section
│   └── Footer.tsx           # Footer
└── public/
    └── downloads/           # Installer files (add your builds here)
        ├── windows/
        ├── mac/
        └── linux/
```

## Adding Download Files

Place your installer files in:
- `public/downloads/windows/MindMesh-Setup.exe`
- `public/downloads/mac/MindMesh.dmg`
- `public/downloads/linux/MindMesh.AppImage`

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set root directory to `apps/website`
3. Deploy!

### Other Platforms

The website is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting platform

## Customization

- Update colors in `tailwind.config.ts`
- Modify content in component files
- Add more pages in `app/` directory
- Customize metadata in `app/layout.tsx`

