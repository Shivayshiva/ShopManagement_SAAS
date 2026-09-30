`README.md` is still the default Next.js starter text. Ask mode cannot replace it. Paste this in, or switch to Agent mode and I will write the file.

```markdown
# ShopManage

Marketing site and design system for ShopManage, a shop management product for billing, stock, customers, suppliers, staff, and multiple shops.

Built with Next.js, React, Tailwind CSS, and shadcn/ui.

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS 4
- shadcn/ui (`base-nova`) on Base UI
- Lucide icons
- Geist for UI text, Plus Jakarta Sans for headings, Geist Mono for code

## What's included

- Landing page: hero, features, pricing, FAQ, and footer
- Shared layout (`SiteShell`) with header and footer on every route
- Design tokens in `app/globals.css` (color, radius, shadow, type)
- Light and dark theme toggle in the header
- Placeholder login (`/login`) and register (`/register`) pages

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project layout

```text
app/                      Routes and global styles
components/ui/            shadcn components
components/design-system/ Section, Type, IconWell
components/layout/        Header, footer, theme toggle
components/landing/       Landing page sections
lib/theme.ts              Theme storage key and init script
```

## Design system

Change brand colors, radius, and shadows in `app/globals.css`. Components should use semantic utilities such as `bg-primary`, `text-muted-foreground`, `bg-surface`, and `bg-inverse`.

Use `Section`, `SectionIntro`, `Type`, and `IconWell` from `components/design-system` instead of one-off palette classes.

Add more shadcn components with:

```bash
npx shadcn@latest add <component>
```
```
