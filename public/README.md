# Public Assets Directory

This directory contains all static assets that need to be served directly by the web server.

## Contents

### `/assets`
- `noise.svg` - Texture noise used in the Platform component
- `hero-wireframe.png` - Hero wireframe image
- `platform-antarleen.jpg` - Platform background image for Antarleen unit

### `/model`
- `uuv.glb` - 3D model file for the UUV (Unmanned Underwater Vehicle)

### Root
- `index.css` - Minimal CSS file referenced in index.html

## Why This Directory?

In Vite projects, files placed in the `public` directory are:
1. **Copied as-is** to the root of the build output (`dist/`) during build
2. **Served from the root path** (e.g., `/assets/noise.svg`, `/model/uuv.glb`)
3. **Not processed** by Vite's build pipeline (no bundling, no hash names)

This is essential for:
- Large binary files like `.glb` 3D models
- Files that need to maintain their exact paths for external references
- Assets that should be cached separately from the bundled code

## Usage in Code

Reference these assets using absolute paths from the root:
```typescript
// In constants/assets.ts
export const ASSETS = {
  platform: {
    noiseTexture: "/assets/noise.svg",
  },
  model: {
    uuvModel: "/model/uuv.glb",
  }
};
```

## Deployment

When deploying to Vercel or other hosting platforms:
- Vite automatically copies `public/*` to `dist/*` during `npm run build`
- The `vercel.json` configuration ensures proper build settings
- All assets will be available at their expected paths in production
