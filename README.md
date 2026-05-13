# Northern Climate

Static marketing website for Northern Climate, an HVAC, fireplace, and plumbing
business serving Greater Sudbury, ON. No build step — vanilla HTML, CSS, and
JavaScript served directly from files.

---

## Local development

There's no build pipeline. Either:

- Open any `.html` directly in a browser, **or**
- Run a local server so absolute asset paths resolve:

```bash
npx serve .
# then open http://localhost:3000
```

The site uses absolute paths like `/css/styles.css` and `/favicon.svg`, so a
local web server is the recommended way to preview.

---

## File structure

```
.
├── index.html                  Homepage
├── about.html                  About + "How we work" process
├── protection-plans.html       Maintenance plans (3 tiers, FAQ)
├── financing.html              Financing options
├── contact.html                Contact form + map + hours
├── services/
│   ├── heating.html            Furnaces, heat pumps, garage heaters
│   ├── cooling.html            Central AC, mini-splits
│   ├── fireplaces.html         Gas and wood fireplaces
│   └── plumbing.html           Plumbing & water heaters
├── 404.html                    Custom 404
├── privacy.html                Privacy policy (PIPEDA-aware)
├── terms.html                  Terms of service
├── thank-you.html              Post-submission landing (noindex)
│
├── css/styles.css              All site styles (single file)
├── js/main.js                  Site JS (nav, FAQ, forms, scroll-top)
│
├── favicon.svg                 Red snowflake favicon
├── favicon-mask.svg            Safari pinned-tab icon
├── apple-touch-icon.svg        iOS home-screen icon
├── site.webmanifest            PWA manifest
├── og-image fallback           uses thumbs-up.png (see TODO)
│
├── images/                     Photography (lazy-loaded)
├── brand_logos/                Partner brand marks
├── Northern Climate logo (1).png
├── thumbs-up.png               Hero illustration + default og:image
│
├── robots.txt                  Crawler instructions
├── sitemap.xml                 11 indexable URLs
├── firebase.json               Firebase Hosting config
├── CLAUDE.md                   Design guardrails for AI assistance
└── README.md                   You are here
```

---

## Pre-launch checklist

Things only you can finalize before publishing:

- [ ] **Forms** — open `js/main.js` and fill the `EMAILJS_*` constants at the
      top of the file. Sign up at <https://www.emailjs.com> (free tier: 200
      messages/month) and create two templates: one for the homepage lead form,
      one for the contact form. Until these are filled, both forms fall back
      to opening the user's mail client (`mailto:`) — which works, but is less
      reliable.
- [ ] **Analytics** — open any `*.html` and locate the
      `<!-- Google Analytics 4 -->` block in `<head>`. Uncomment it and paste
      your GA4 Measurement ID (`G-XXXXXXXXXX`). The block also includes a
      commented Plausible alternative if you'd prefer privacy-friendly
      analytics. Repeat across the 13 pages, or do a single find/replace.
- [ ] **Social card image** — `og:image` currently points to `thumbs-up.png`.
      Facebook prefers a 1200×630 image. Optional: render a dedicated OG card
      and replace the `og:image` URL site-wide.
- [ ] **Facebook link** — the page header/footer point to
      `https://www.facebook.com/NorthernClimateSudbury` on most pages, and to
      `#` on a few. Confirm the URL is correct and replace any remaining `#`.
- [ ] **Google Search Console** — submit `sitemap.xml` once deployed.
- [ ] **Google Business Profile** — verify and link to this site.

---

## Deployment

### Firebase Hosting (default)

A `firebase.json` is included with caching, 301 redirects for the renamed
`plans.html` → `protection-plans.html`, and a custom 404 page.

```bash
npm install -g firebase-tools
firebase login
firebase init hosting        # only if you don't have a project yet
firebase deploy --only hosting
```

### Netlify

Drag-drop the folder onto netlify.com, **or** add a `netlify.toml`:

```toml
[build]
  publish = "."

[[redirects]]
  from = "/plans.html"
  to   = "/protection-plans.html"
  status = 301

[[redirects]]
  from = "/services/water-heaters*"
  to   = "/services/plumbing.html"
  status = 301

[[redirects]]
  from = "/*"
  to   = "/404.html"
  status = 404
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Cloudflare Pages

Connect the repo in the Cloudflare dashboard. Build command: leave empty.
Output directory: `.` (project root).

---

## Maintenance notes

- **Nav and footer are duplicated** across all 13 HTML pages — there's no
  templating engine. When you change a nav link or footer block, search/
  replace across the whole project.
- **Design constraints** are documented in `CLAUDE.md` — read it before adding
  new sections so the site stays consistent (red/navy/cream palette, Fraunces
  + Inter, no icon boxes, no checkmark bullet cards inside tiles, no centered
  accent bars under every heading, etc.).
- **CSS variables** to use: `--red`, `--navy`, `--navy-deep`, `--gold`,
  `--cream`, `--warm-100` through `--warm-800`. Do **not** introduce
  `--gray-*` or other Tailwind-style names.

---

## Brand assets

| Asset | Path |
|---|---|
| Primary logo | `Northern Climate logo (1).png` |
| Hero illustration | `thumbs-up.png` |
| Favicons (4 sizes) | `favicon.svg`, `favicon-mask.svg`, `apple-touch-icon.svg` |
| OG share image | `thumbs-up.png` (replace with 1200×630 PNG when ready) |
| Partner marks | `brand_logos/` (Bryant, Regency, Enviro, Navien, Rinnai, Bradford White, Continental) |

---

Business details, address, phone, and hours are all consolidated in:

- The `<footer>` of every page
- The JSON-LD `HVACBusiness` schema in every page's `<head>`
- The `<address>` and contact rows on `contact.html`

If business info ever changes, those are the three places to update.
