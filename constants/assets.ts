// Centralized asset management
// Static assets are served from the /public directory which is copied to dist/ during build
// Files in /public are available at root paths (e.g., /public/assets/noise.svg -> /assets/noise.svg)
// To use local assets:
// 1. Place files in /public/assets or /public/model
// 2. Reference them with absolute paths from root (e.g., "/assets/image.png")
// 3. OR import them as modules: import localHero from '../public/assets/hero-wireframe.png';

export const ASSETS = {
  hero: {
    // The placeholder/poster image displayed before the 3D model loads
    modelPoster: "/assets/hero-wireframe.png",
  },
  platform: {
    // Current placeholder: Antarleen-X unit render
    antarleenBackground: "/assets/platform-antarleen.jpg",
    // Texture noise
    noiseTexture: "/assets/noise.svg",
  },
  model: {
    // Path for the 3D model loader
    uuvModel: "/model/uuv.glb", 
  }
};
