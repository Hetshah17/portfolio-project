## Het Shah - Portfolio (Learning Project)

This repository contains my personal portfolio website. I built it to practice and demonstrate real frontend engineering skills—especially animation, performance, and responsive UI—while presenting my work and experience clearly.

---

### What’s inside

- **Responsive single-page portfolio** built with **React + Vite**
- **Interactive 3D character section** (Three.js) with animations
- **GSAP-driven UI transitions** (smooth scrolling / text splitting effects)
- A **“My Work” carousel** with detailed, text-first project descriptions
- **Resume download button** (PDF served from `public/`)

---

### Tech Stack

- **Frontend**: React, Vite, TypeScript
- **3D**: Three.js (GLTF loading, DRACO support)
- **Animation**: GSAP (ScrollTrigger / SplitText / ScrollSmoother)
- **Utilities**: React Icons, React Three Fiber / Rapier (as used in the character experience)

---

### Resume Download

The RESUME button downloads a PDF from the `public/` folder:

- `public/Hetshah_Resume.pdf`

---

### Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev -- --host
   ```

3. Open the site:
   - On your laptop: `http://localhost:5173/`
   - On your phone (same Wi-Fi): `http://<your-pc-ip>:5173/`

If Vite selects another port, use the **Network URL** printed in the terminal.

---

### Build for Production

```bash
npm run build
```

---

### Deployment (GitHub Pages)

This project can be deployed via GitHub Actions by building `dist/` and publishing it as a static site.

When deploying under a sub-path (e.g., `https://username.github.io/repo-name/`), make sure the Vite `base` path is set correctly.

---

### Learning Notes

I treated this portfolio as a learning and improvement loop:

- Iterated on **responsive layout** and readable typography for different screen sizes
- Implemented **motion design** with GSAP while keeping the UI resilient
- Added features like **resume download** and **carousel-based case studies** to improve clarity for visitors
- Practiced integrating multiple frontend systems (animations + 3D + routing/sections) into one coherent UI

---

If you’d like, I can also add:
- A screenshot gallery in this README
- A short “design decisions” section explaining layout, typography, and animation choices