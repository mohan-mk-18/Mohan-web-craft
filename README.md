# 🚀 Space Portfolio — Mohan

A cinematic, space-themed freelance portfolio built with Next.js 14, Three.js, GSAP, Framer Motion, and Lenis.

---

## Tech Stack

| Layer            | Library                         |
|------------------|---------------------------------|
| Framework        | Next.js 14 (App Router)         |
| Language         | TypeScript                      |
| Styling          | Tailwind CSS                    |
| 3-D Background   | Three.js (vanilla)              |
| Scroll animation | GSAP + ScrollTrigger            |
| Smooth scroll    | Lenis                           |
| UI animation     | Framer Motion                   |
| Fonts            | Space Grotesk + Inter (Google)  |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## Personalise Before Launch

Search for `XXXXXXXXXX` in the codebase — replace every occurrence with your actual 10-digit WhatsApp number.

### Key files to update

| File | What to change |
|------|---------------|
| `components/Navigation.tsx` | WhatsApp number, your name |
| `components/sections/HeroSection.tsx` | Headline copy, stats |
| `components/sections/AboutSection.tsx` | Your city, story, highlights |
| `components/sections/ServicesSection.tsx` | Prices, delivery times, features |
| `components/sections/ProjectsSection.tsx` | Real project titles + descriptions |
| `components/sections/ContactSection.tsx` | Your email, WhatsApp, city |
| `components/sections/Footer.tsx` | WhatsApp number, your name |
| `app/layout.tsx` | SEO metadata, title, description |

---

## Adding Real Project Screenshots

In `ProjectsSection.tsx`, replace the CSS gradient mockup areas with real images:

```tsx
import Image from "next/image";

// Inside ProjectCard, replace the gradient div:
<div className="relative h-44 overflow-hidden flex-shrink-0">
  <Image
    src="/projects/bakery.png"   // put images in /public/projects/
    alt="Bakery website preview"
    fill
    className="object-cover"
  />
</div>
```

Place your screenshots in `/public/projects/`.

---

## Adding a Milky Way Texture (Optional Enhancement)

For an even more cinematic look, use a real Milky Way texture:

1. Download a free Milky Way equirectangular PNG (e.g. from NASA Public Domain)
2. Place it at `/public/textures/milkyway.jpg`
3. In `SpaceBackground.tsx`, add:
   ```ts
   const loader = new THREE.TextureLoader();
   const mwTex  = loader.load("/textures/milkyway.jpg");
   const mwGeo  = new THREE.SphereGeometry(500, 32, 32);
   const mwMat  = new THREE.MeshBasicMaterial({
     map: mwTex, side: THREE.BackSide,
     transparent: true, opacity: 0.35,
   });
   scene.add(new THREE.Mesh(mwGeo, mwMat));
   ```

---

## Form Submission

The contact form in `ContactSection.tsx` has a placeholder `await` — wire it up to your preferred service:

**Formspree (easiest):**
```ts
const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formState),
});
```

**EmailJS:**  
Follow [emailjs.com/docs/examples/reactjs](https://www.emailjs.com/docs/examples/reactjs/)

---

## Mobile Performance Tuning

The Three.js background already:
- Halves particle counts on mobile (`isMobile` flag)
- Caps pixel ratio to 1 on mobile
- Disables nebula sprites on mobile

If you need further optimisation on low-end devices:
```ts
// In SpaceBackground.tsx, increase the mobile reduction factor:
const starCount = isMobile ? 0.3 : 1;  // was 0.5
// Or completely disable the milkyWay group on mobile:
if (!isMobile) scene.add(milkyWay);
```

---

## Deployment

### Vercel (recommended — zero-config)
```bash
npx vercel
```

### Netlify
```bash
npm run build
# Upload the .next folder, or use Git-based deploy
```

### GitHub Pages (static export)
Add to `next.config.mjs`:
```js
output: "export"
```
Then run `npm run build` — deploy the `out/` folder.

> **Note:** GitHub Pages static export doesn't support Next.js Image Optimization or API routes.

---

## Colour Reference

| Token      | Hex       | Use                  |
|------------|-----------|----------------------|
| `void`     | `#05070d` | Deepest background   |
| `deep`     | `#070b14` | Body background      |
| `cosmic`   | `#0b1020` | Section backgrounds  |
| `star`     | `#5aa9ff` | Primary accent blue  |
| `violet`   | `#8b5cf6` | Secondary accent     |
| `aurora`   | `#22d3ee` | Tertiary accent cyan |
| `moon`     | `#eaf2ff` | Primary text         |
| `silver`   | `#c8d8f0` | Secondary text       |
| `muted`    | `#a9b4c7` | Body text            |
| `faint`    | `#4a566a` | Placeholder / subtle |

---

## License

MIT — free to use, modify, and deploy for personal or commercial work.
