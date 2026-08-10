# AGENTS.md — Krishank Kureti Portfolio

## Project Overview

Personal portfolio website for Krishank Kureti, a Full Stack Developer.
Dark, minimal, typographic aesthetic.
Built with **Next.js 16** (App Router) + **TypeScript** + **Three.js**.
All styles are plain CSS (no Tailwind) via `globals.css`.

### Backend stack

| Concern | Service |
|---------|---------|
| Database | **Neon Postgres** (Singapore `aws-ap-southeast-1`) |
| Auth | **Neon Auth** (Managed Better Auth) |
| File storage | **Vercel Blob** (public, project cover images) |
| Hosting | **Vercel** |

Server Actions under `actions/` talk to Neon via `@neondatabase/serverless` and to Blob via `@vercel/blob`. There is no separate API server.

### Environment variables

See `.env.example`. Required:

- `DATABASE_URL` — Neon pooler connection string
- `NEON_AUTH_BASE_URL` — Neon Auth base URL
- `NEON_AUTH_COOKIE_SECRET` — 32+ char secret (`openssl rand -base64 32`)
- `BLOB_READ_WRITE_TOKEN` — from Vercel Blob store (or OIDC on Vercel)

### Schema

SQL migrations live in `db/migrations/`. Apply via Neon MCP/console or `psql`.

### Create first admin user

```bash
node scripts/create-admin.mjs you@email.com 'your-password' 'Your Name'
```

Then sign in at `/admin/login`. Optionally disable public sign-up in Neon Console after.

## File Structure

```
portfolio/
├── app/
│   ├── layout.tsx                  ← root layout (DM Serif Display + DM Mono fonts)
│   ├── page.tsx                    ← home page (boot screen, cursor, sections)
│   ├── globals.css                 ← all CSS: tokens, reset, component styles
│   ├── api/auth/[...path]/route.ts ← Neon Auth proxy handlers
│   ├── admin/                      ← CMS (projects, messages, login)
│   └── components/
│       ├── BootScreen.tsx
│       ├── CodingBackground.tsx
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── NeuralNetworkCanvas.tsx
│       ├── About.tsx
│       ├── Projects.tsx            ← loads projects from Neon
│       ├── Contact.tsx             ← inserts into contact_messages
│       ├── AdminProjectForm.tsx
│       └── Footer.tsx
├── actions/                        ← server actions (auth, projects, contact, storage)
├── lib/
│   ├── db.ts                       ← Neon SQL client
│   └── auth/                       ← Neon Auth server + client
├── db/migrations/                  ← Postgres schema
├── proxy.ts                        ← protects /admin (Neon Auth middleware)
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Development Commands

```bash
cd portfolio

# Install dependencies
npm install

# Dev server (hot reload)
npm run dev              # → http://localhost:3000

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Running a Single Test

No test framework is configured. To add tests:

```bash
# Install test dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run a single test file
npx vitest run app/components/Hero.test.tsx

# Run a single test by name
npx vitest run --testNamePattern="should render hero"

# Run tests in watch mode
npx vitest
```

## Build / Deploy

```bash
# Vercel (recommended)
npx vercel

# Static export (if needed)
# Add `output: 'export'` to next.config.ts, then:
npm run build && npx serve out/
```

## Design Rules (Non-Negotiable)

1. **Background is always dark** — `#0a0a0a` or `#111111`. Never white, never gray.
2. **Two fonts only** — `DM Serif Display` for headings, `DM Mono` for everything else.
3. **Accent is warm gold** — `#c8b89a`. Never blue, purple, or green.
4. **Borders are near-invisible** — `rgba(255,255,255,0.07)`. Never solid white borders.
5. **No box shadows** — depth via background color differences only.
6. **Italic = emphasis** — use `<em>` inside headings for signature italic-serif style.
7. **Uppercase labels** — section labels, nav links, tags use `text-transform: uppercase` + wide letter-spacing.
8. **Animations are subtle** — fade + translate only. No bounce, spin, or flash.
9. **Custom cursor on desktop** — `cursor: none` on body, replaced by `.cursor` and `.cursor-ring`.
10. **No Tailwind** — all styling is plain CSS in `globals.css`.

## CSS Style Guide

### Design Tokens (CSS Custom Properties)

Defined in `:root` in `globals.css`. Always reference variables, never hardcode:

```css
--bg: #0a0a0a       --bg2: #111111      --bg3: #1a1a1a
--border: rgba(255,255,255,0.07)
--border2: rgba(255,255,255,0.13)
--text: #f0ede6     --muted: #bbbbbb
--accent: #c8b89a   --accent2: #8a7a64
--serif: DM Serif Display
--mono: DM Mono
```

### Naming Conventions

- **Sections**: `#hero`, `#about`, `#projects`, `#contact`
- **Components**: BEM-like — `.project-card`, `.project-name`, `.project-tags`
- **Layout**: `.section-inner`, `.about-grid`, `.projects-grid`, `.hero-container`
- **Utilities**: `.fade-up`, `.visible`

### Responsive

- Uses `clamp()` for fluid typography on headings
- Section padding: `0 48px` sides, `.section-inner` max-width `1100px`

## TypeScript / React Style Guide

### Imports

```tsx
"use client";  // Always first in client components

import { useState, useEffect, useRef } from "react";  // React hooks
import * as THREE from "three";  // Three.js imports
import BootScreen from "./BootScreen";  // Components (absolute/relative paths)
```

### Component Structure

- All components use `"use client"` directive (this is a client-rendered portfolio)
- Use `export default function ComponentName()` pattern
- Destructure props with TypeScript types:
  ```tsx
  interface Props {
    onDone: () => void;
  }
  export default function BootScreen({ onDone }: Props) { ... }
  ```

### Hooks & State

- Use `useRef` for DOM references and mutable values that don't trigger re-renders
- Use `useEffect` for DOM access (cursor, Three.js, observers, intervals)
- Use `useState` for reactive state
- Always clean up in `useEffect` return function

### Event Handlers

- Use arrow functions for event handlers:
  ```tsx
  const handleMouseMove = (e: MouseEvent) => { ... };
  ```

### Animation Loops

- Use `requestAnimationFrame` for cursor and Three.js animation loops
- Use `setInterval` for periodic updates (with cleanup)
- Three.js: use `useEffect` with cleanup (dispose renderer, remove DOM element)

### Scroll Animations

- Use `IntersectionObserver` for scroll-triggered `.fade-up` animations
- Threshold: `0.15`

### Three.js (NeuralNetworkCanvas)

- Initialized in `useEffect` with cleanup on unmount
- Transparent background (`alpha: true`, `setClearColor(0x000000, 0)`)
- `pointer-events: none` on the canvas container
- Animation: forward propagation through layers, wave motion, random edge flicker
- Keep it subtle — matches the minimal dark aesthetic

## Adding a New Project Card

Add an entry to the `projects` array in `Projects.tsx`:

```tsx
{
  num: "004",
  name: "Project Name",
  desc: "Description of the project.",
  tags: ["Tech1", "Tech2"],
}
```

Update `transitionDelay` logic and `project-count` text accordingly.

## Verification Checklist

Before completing any change:

- [ ] `npm run build` succeeds with no errors
- [ ] `npm run lint` passes
- [ ] Boot screen runs for 5-6 seconds, then transitions to main site
- [ ] Coding background typing animation is visible (18% opacity)
- [ ] Custom cursor dot follows mouse; ring lags behind
- [ ] Nav bar becomes frosted on scroll
- [ ] All `.fade-up` elements animate when scrolled into view
- [ ] Neural network animation renders in hero right column
- [ ] Project card hover: accent line fills from left, arrow appears
- [ ] Contact button: gold fill animates from left on hover
- [ ] Page renders correctly at 1280px+ desktop width

## Known Placeholders / Follow-ups

- Projects are empty until you add them in `/admin` (Supabase project was already unreachable during migration)
- Create admin: `node scripts/create-admin.mjs email password 'Name'`
- Create Vercel Blob store (public), add `BLOB_READ_WRITE_TOKEN` to `.env.local` and Vercel project env
- Set `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET` on Vercel for production
