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
    modelPoster: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTFXXIuH4GCFnyIyeqk4h3r7pqN6FAvR_7GBNTw_IubA_3otmJlWapY-0tApHvsPkkMjpcotilecaAhmCLARIBc0zZojnix3mV4aVp0Jx3G42ZLVH4L-hC3j0Eu3_xHcwYYjUXJyVM6H60tE4nxZcL3a5EywfKNKC70J5rme6dt8Lkzt_71cAkgvkeumnAiwtu28hAjgmNuKzdxXhLaxzmEXvD7v1aNal6S4KRq02EkpXePThjkZVUhDbbJQFFS6TC1gIwnmGOMw",
  },
  platform: {
    // Current placeholder: Antarleen-X unit render
    antarleenBackground: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe-9gAJZBxNQNVozvmRKmicqTpVfG6wcg3fn9g9QJ95C4V2vYPIeKzSe27S1irQLefmEnzaWirdta96UyShvc2AJ0nai8AdOEW8L0LPwuIpr0-rau5HJC-etF7YGtJKd_NNtWC64BYWwxnVHmWkL2qfABO0u1V-PxS3m2zXF0MaofOpefJ21PaxsLJoWuJ5FEZZt938z_WAjL6xlNQ9VE6XEblXGblWcp6Kcd-ceUSc2zNF_Tkm9BoZzD8CZ3LjY8OVItYXlYu5g",
    // Texture noise
    noiseTexture: "/assets/noise.svg",
  },
  model: {
    // Path for the 3D model loader
    uuvModel: "/model/uuv.glb", 
  }
};