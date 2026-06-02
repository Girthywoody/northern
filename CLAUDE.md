# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for **Northern Climate**, an HVAC business in Greater Sudbury, ON. No build tools, no frameworks — plain HTML, CSS, and vanilla JS served directly from files.

## Architecture

- **9 HTML pages**: `index.html`, `about.html`, `protection-plans.html` (Maintenance), `financing.html`, `contact.html`, and 4 service pages in `services/` (heating, cooling, fireplaces, plumbing)
- **1 shared CSS file**: `css/styles.css` — all visual styling lives here. Uses CSS custom properties defined in `:root` (e.g., `--red`, `--navy`, `--cream`, `--warm-*`). Typography: Fraunces (headings) + Inter (body) via Google Fonts CDN.
- **1 shared JS file**: `js/main.js` — handles nav scroll shadow, mobile menu, services dropdown accordion, FAQ accordion, scroll-triggered fade-in (IntersectionObserver), animated stat counters, contact form mailto, and lead form mailto. Runs as an IIFE with `defer`.
- **Service pages** live in `services/` and use `../` prefixed paths for all shared assets and root-level page links.

## Key Conventions

- **CSS variable names**: `--red`, `--navy`, `--navy-deep`, `--gold`, `--cream`, `--warm-100` through `--warm-800`. Do NOT use `--gray-*`, `--brand-red`, or any Tailwind-style variable names. Every color must reference the existing `:root` variables.
- **Font family**: Headings use `'Fraunces', serif`. Body uses `'Inter', sans-serif`. NOT DM Serif Display, Space Grotesk, Roboto, or other generic fonts.
- **Google Fonts link** must load Fraunces (opsz,wght 9..144 at 400;600;700) and Inter (400;500;600;700).
- **Shared nav/footer**: Duplicated in every HTML file (no templating). When changing nav links or footer content, update all 9 pages.
- **Animation classes**: `.fade-in` (add `.visible` to trigger), `.stagger-children` on parent containers. JS handles observation.
- **FAQ pattern**: `.faq-item > .faq-question (button) + .faq-answer > .faq-answer-inner`. JS toggles `.open` class and `max-height`.
- **Forms**: `#contactForm` and `#leadForm` are handled in main.js via mailto. Form fields need `name` attributes for FormData.

## Design Rules — Anti-AI-Slop

The site must feel hand-designed and premium, never AI-generated. Follow these rules strictly:

- **No icon boxes**: Do NOT use colored square/circle icon containers (e.g., `<div class="icon" style="background:var(--red)"><i class="fas fa-fire"></i></div>`). Icons may be used inline or as subtle accents, not as card focal points.
- **No checkmark bullet lists inside cards**: Do NOT add `<ul><li><i class="fas fa-check"></i> Feature</li>...</ul>` inside service cards. Keep card copy to a short paragraph.
- **No "Learn More →" links**: Cards link via the whole card element. Use a subtle arrow icon (`.service-tile-arrow`) as a visual affordance, not a text link.
- **No centered accent-bar under every heading**: The `.accent-bar` exists in CSS for compatibility but should NOT be added to new sections. Vary heading treatments — use `.section-heading--left` or just good typography spacing.
- **No identical card grids**: Avoid repeating the exact same card structure 4-6 times. Mix layouts — use `.services-grid-v2` (divider grid), `.why-strip` (column strip), `.services-bottom-row` (horizontal highlight cards), or other varied patterns.
- **Minimize inline styles**: Put styles in `css/styles.css` using classes. Inline `style=` should be rare and only for one-off spacing tweaks.
- **Body copy class**: Use `.prose` on text-heavy containers — it applies proper color, size, and line-height to `<p>` tags.
- **Location tags**: Use `.area-tags > .area-tag` for location lists (square corners, not pills).
- **Hero background**: CSS-only (layered gradients + `.hero-bg-pattern` grid). No video background. No stock photos.
- **Stats must be specific**: No "100% Satisfaction" or other generic filler stats. Use real, believable numbers.

## Brand Logos

7 partner logos in `brand_logos/`: bryant.png, regency.png, enviro.png, navien.png, rinnai.png, bradford white.png, continental.png. Used in the home page marquee and in partnership boxes on service/about pages.

## Development

No build step. Open any HTML file directly in a browser or use a local server:

```
npx serve .
```

## Deployment

Static hosting. Currently has a `firebase-debug.log` suggesting Firebase Hosting was used or attempted.
