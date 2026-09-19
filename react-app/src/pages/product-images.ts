// Hero/solution image assignments from WEBSITE-IMPLEMENTATION-PLAN.md
// section 16C (P01/P03 rows), resolved against docs/design/selected-assets.json.
// "solution: null" means the plan explicitly marks that product's solution
// section as intentionally text-led (no image assigned) -- not a gap.
export const PRODUCT_IMAGES: Record<string, { hero: string; solution: string | null }> = {
  '210-paint-protection-film': {
    hero: '/assets/original/5a41b9f14f0b-Platinum-210-Paint-Protection-Film-Professional-Grade-Defense-for-Your-Vehicle.png',
    solution: '/assets/original/39e055f61004-69.webp',
  },
  '190-micron-ppf': {
    hero: '/assets/original/efc650e898ee-11_edited-scaled.webp',
    solution: null,
  },
  'headlight-paint-protection-film': {
    hero: '/assets/original/89b2e8aa582b-836a5b_f757a4e2a9e24341a11f9417b05e1c8bmv2-scaled.webp',
    solution: '/assets/original/b2d6a19e5c4f-sl6-scaled.jpg',
  },
  'matte-paint-protection-film': {
    hero: '/assets/original/d7d0060fb5ef-6.webp',
    solution: null,
  },
  'satin-paint-protection-film': {
    hero: '/assets/original/ed8580439fe9-5-scaled.webp',
    solution: null,
  },
  'gloss-black-paint-protection-film-190-microns': {
    hero: '/assets/original/7a6d90535f68-190-black-scaled.webp',
    solution: '/assets/original/f3ca7fa17f0e-42.webp',
  },
  'window-tint-film-for-cars-platinum-car-films': {
    hero: '/assets/original/4f513bd6eb5f-Gemini_Generated_Image_qptr70qptr70qptr-1.png',
    solution: '/assets/original/aeb3d1dd87f5-platinum-window-tint-film-percentage-options-banner.jpg',
  },
  'color-ppf-for-car': {
    hero: '/assets/original/a8d992e24869-Gemini_Generated_Image_lwl09dlwl09dlwl0.jpg',
    solution: null,
  },
}
