# Northern Climate — SEO & Launch Checklist

A practical, prioritized checklist to get the site ranking and converting once it's live.
For a local HVAC company, **~80% of your leads will come from local search (Google Map Pack
+ "furnace repair Sudbury" type queries)** — so the highest-value items are your Google
Business Profile and reviews, not on-page tweaks. Those are marked **P0**.

Legend: `[x]` done in code · `[ ]` you need to do it · **P0** critical / pre-launch ·
**P1** high impact · **P2** nice-to-have.

---

## 1. Already built into the site (no action needed)

- [x] Unique `<title>` + meta description on every page
- [x] Canonical URLs on every page
- [x] Open Graph + Twitter Card tags (social previews)
- [x] `robots.txt` (allows crawl, blocks 404/thank-you/plumbing, points to sitemap)
- [x] `sitemap.xml` (all indexable pages, refreshed dates)
- [x] `noindex` on the right pages (404, thank-you, plumbing "coming soon")
- [x] Structured data: `HVACBusiness` (enriched on home — see below), `BreadcrumbList`,
      `FAQPage` on Maintenance/Financing/Heating/Cooling/Fireplaces
- [x] Mobile-responsive, semantic HTML, one `<h1>` per page, skip link, alt text
- [x] Favicons, `site.webmanifest`, theme color
- [x] Fast: no framework, deferred JS, font `display=swap`, lazy-loaded images,
      high-resolution photos

### Done in this SEO pass
- [x] **Enriched home-page LocalBusiness schema** — added `geo` coordinates, `areaServed`
      (9 Sudbury communities), `sameAs` (Facebook), `image`, `logo`, `priceRange`,
      `paymentAccepted`, full opening hours. This is what feeds the Google "knowledge panel"
      and local ranking.
- [x] Standardized phone to E.164 format (`+1-705-586-4300`) in schema.
- [x] Refreshed `sitemap.xml` `lastmod` dates.

---

## 2. P0 — Do these BEFORE / right at launch

- [ ] **Confirm the domain & HTTPS.** All canonicals/sitemap use
      `https://northernclimatesudbury.com`. Make sure you own it, HTTPS is on, and
      `http://` + `www.` both **301-redirect** to `https://northernclimatesudbury.com`
      (pick one canonical host). Static hosts like Netlify/Cloudflare Pages/Firebase do this.
- [ ] **Google Business Profile (GBP)** — *the single biggest lever for a local HVAC.*
      Create/claim it at google.com/business. Use the **exact same** Name, Address, Phone
      (NAP) as the site: `Northern Climate · 1021 Kingsway, Unit #1, Greater Sudbury, ON
      P3B 2E6 · (705) 586-4300`. Set category **HVAC contractor** (+ Furnace repair service,
      Air conditioning contractor, Fireplace store), service areas, hours, photos, and link
      to the website. Verify it (postcard/phone).
- [ ] **Google Search Console** — verify the domain, then **submit `sitemap.xml`**. Watch
      Coverage/Indexing and the Performance report for the queries you rank for.
- [ ] **Bing Webmaster Tools** — verify + submit sitemap (quick, also feeds ChatGPT/Copilot).
- [ ] **Analytics** — the GA4 snippet is already in every page's `<head>`, commented out with
      a `G-XXXXXXXXXX` placeholder. Create a GA4 property, paste your Measurement ID, and
      uncomment. (Privacy-friendly Plausible alt is also stubbed if you prefer.)
- [ ] **Verify every business fact is correct**: address, unit #, phone, email, hours,
      "Authorized Bryant dealer", and the maintenance pricing ($235 / $75). Wrong NAP hurts
      local ranking and trust.
- [ ] **Confirm the Facebook URL** in the footer/schema
      (`facebook.com/NorthernClimateSudbury`) is real and active — or update it.

---

## 3. P1 — High impact, do in the first few weeks

- [ ] **Get Google reviews.** Reviews are the #2 local ranking factor after GBP. Ask every
      happy customer; text them your GBP review link. Aim for a steady trickle, reply to all.
      → Once you have real reviews, add an `aggregateRating` to the schema (see §6).
- [ ] **Build local citations (NAP must match exactly everywhere):** Bing Places, Apple
      Business Connect (Apple Maps), Yelp, **HomeStars**, Yellow Pages / 411.ca, Better
      Business Bureau, and the **Bryant "Find a Dealer" locator** (you're an authorized
      dealer — this is a strong, relevant backlink).
- [ ] **Local backlinks:** Greater Sudbury Chamber of Commerce, supplier/manufacturer pages
      (Bryant, Regency, Enviro, Navien, Rinnai), local sponsorships, partner trades. A few
      relevant local links beat dozens of generic ones.
- [ ] **Create a 1200×630 branded social-share image** (`og-image.jpg`) — logo + tagline +
      phone — and point every page's `og:image`/`twitter:image` at it. Current share image is
      the portrait `thumbs-up.png`, which crops awkwardly in link previews.
- [ ] **Replace stock photos with real ones** of your team, trucks, and completed jobs. Real
      local photos build trust and can rank in image search. (Geotag them to Sudbury.)
- [ ] **Conversion tracking:** mark the phone-tap links and form submits as GA4 conversions
      so you know which pages/keywords actually drive calls. Consider a call-tracking number.

---

## 4. P2 — Content & growth (ongoing)

- [ ] **Add seasonal / question-based content** targeting what people search:
      "furnace not turning on Sudbury", "when to replace a furnace", "heat pump rebates
      Ontario", "AC tune-up cost Sudbury", "gas vs wood fireplace". A simple blog or
      "Tips/Resources" section captures long-tail searches and feeds the FAQ schema.
- [ ] **Consider neighbourhood landing pages** for your top areas (e.g.
      "Furnace Repair in Valley East", "AC Installation in Hanmer") if you want to rank in
      those towns specifically — only if you can make each genuinely unique, not boilerplate.
- [ ] **Expand FAQs** on each service page (more `FAQPage` Q&As = more "People also ask"
      real estate).
- [ ] **Internal linking:** link service pages to each other and to Financing/Maintenance
      where relevant (mostly done — keep it up as you add content).
- [ ] **Restore the Plumbing page** (and re-enable its nav/sitemap entries) once you have a
      certified plumber — the content is preserved in an inert `<template>` in
      `services/plumbing.html`.
- [ ] **Instagram / more social** linked from the footer (extends `sameAs`).

---

## 5. Technical / performance polish (P1–P2)

- [ ] **Run PageSpeed Insights** (pagespeed.web.dev) on the live URL; aim for green Core Web
      Vitals (LCP, CLS, INP). It's currently lightweight, so this should be easy.
- [ ] **Self-host fonts + subset Font Awesome.** You load the *entire* Font Awesome CSS from
      a CDN but use ~25 icons. Replacing it with an inline SVG sprite (or a tiny subset) and
      self-hosting Fraunces/Inter removes render-blocking third-party requests — a real speed
      win.
- [ ] **Add `width`/`height` (or `aspect-ratio`) to images** to lock layout and avoid CLS.
      (Banner containers have fixed heights, so impact is small, but it's best practice.)
- [ ] **Consider `srcset`/`<picture>`** for the photo-break banners so phones download smaller
      images than desktop. Current images are sized sensibly (1280–1920px) and lazy-loaded,
      so this is an optimization, not a blocker.
- [ ] **Run a Lighthouse Accessibility audit** — good a11y correlates with SEO. (Contrast was
      just fixed; check focus order and form labels on the live site.)
- [ ] **Add an `og:image:width`/`og:image:height`** once the branded share image exists.

---

## 6. Schema enhancements to add as you grow

- [ ] **`aggregateRating` + `review`** on the home `HVACBusiness` schema — add once you have
      real Google reviews (do **not** invent ratings; Google can penalize fake review markup).
- [ ] **`Service` schema** on each service page (e.g. `@type: Service`, `serviceType`,
      `provider`, `areaServed`) to reinforce relevance for "furnace repair / AC install".
- [ ] **`Offer`/promotion schema** for the homepage offers if you keep them current.
- [ ] Validate everything in the **Rich Results Test** (search.google.com/test/rich-results)
      and Schema Markup Validator after changes.

---

## 7. Pre-launch QA pass

- [ ] Click every nav/footer link on every page (no 404s, correct active states).
- [ ] Submit the contact form and the homepage quote form — confirm they reach you
      (configure EmailJS keys in `js/main.js`, or the `mailto:` fallback opens correctly).
- [ ] Test on a real phone (tap targets, mobile call bar, menus).
- [ ] Confirm the `tel:` links dial and `mailto:` opens.
- [ ] Check titles/descriptions render well in a Google SERP preview and a Facebook/LinkedIn
      share preview.
- [ ] Set a custom 404 (already built — `404.html`; ensure the host serves it).

---

## 8. After launch — keep it healthy

- [ ] Check Search Console weekly for the first month (indexing errors, top queries), then
      monthly.
- [ ] Post to Google Business Profile regularly (offers, seasonal reminders) and add photos.
- [ ] Keep asking for reviews and reply to each one.
- [ ] Refresh seasonal content (furnace season Sept–Oct, AC season Apr–May).
- [ ] Re-run PageSpeed/Lighthouse after any big change.

---

### The 5 things that matter most, in order
1. **Google Business Profile** (claimed, complete, verified)
2. **Reviews** (steady stream, replied to)
3. **Accurate, consistent NAP** everywhere (site + GBP + citations)
4. **Search Console + Analytics** (so you can measure and fix)
5. **Real content & local backlinks** over time

Everything else is polish on top of these.
