# Premium Portfolio Platform

A top 0.1% personal portfolio system built with React, Tailwind CSS, and Framer Motion. Designed to be fully customizable, performant, and visually stunning.

## 🚀 Setup & Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📂 Editing Your Content

This portfolio is built on a data-driven architecture. **You do not need to touch the UI code to update your content.**

All content is managed in a single file: `/src/data/portfolioData.ts`.

### 1. Update Profile & Image
Open `portfolioData.ts` and modify the `profile` object.
To change your image, replace the `image` URL with a link to your photo (or add an image to `/public` and use `/your-image.jpg`).

```typescript
profile: {
  name: "Your Name",
  role: "Your Role",
  image: "https://your-image-url.com/photo.jpg",
  // ...
}
```

### 2. Add / Remove Projects
Find the `projects` array in `portfolioData.ts`. Each object represents a project card.
* **Add:** Copy an existing project object and paste it below, updating the details.
* **Remove:** Delete the object from the array.

```typescript
projects: [
  {
    id: "p1",
    title: "New Project",
    image: "https://...",
    techStack: ["React", "Tailwind"],
    githubUrl: "...",
    liveUrl: "..."
  }
]
```

### 3. Add / Remove Testimonials
Find the `testimonials` array in `portfolioData.ts`. Add or remove objects to update the grid.

### 4. Update Services & Achievements
Similarly, update the `services` and `achievements` arrays to reflect your actual offerings and milestones.
* Icons for services use `lucide-react`. Provide the exact component name (e.g., `"Code"`, `"Palette"`, `"Database"`).

## 🌍 Deployment Guide

### Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New** > **Project** and import your repository.
4. Framework Preset: **Vite** (Vercel will auto-detect).
5. Click **Deploy**.

### GitHub Pages
1. Install `gh-pages`: `npm install gh-pages --save-dev`
2. In `package.json`, add your homepage: `"homepage": "https://yourusername.github.io/your-repo-name",`
3. Update `vite.config.ts` to set the base path: `base: '/your-repo-name/'`
4. In `package.json` scripts, add:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. Run `npm run deploy`.
