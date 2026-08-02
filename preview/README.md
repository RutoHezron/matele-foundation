# The Matele Foundation — Website

A fully static, responsive website for The Matele Foundation, a youth development NGO based
in Sachangwan, Molo Sub-County, Kenya. Built with plain HTML, CSS and vanilla JavaScript —
no build step, no framework, no dependencies to install.

## Running the site locally

Because the site is plain HTML/CSS/JS, you can open `index.html` directly in a browser, but
serving it over local HTTP is recommended (so relative links and future `fetch` calls behave
the same as in production). Pick whichever you have available:

```bash
# Python 3
python3 -m http.server 8080

# Node (no install needed)
npx serve .

# VS Code
# Right-click index.html -> "Open with Live Server"
```

Then visit `http://localhost:8080`.

## Folder structure

```
matele-foundation/
├── index.html          Home page
├── about.html           About Us — story, vision, mission, values, safeguarding, team
├── programs.html         Our Programs — 5 Pathways to Potential + The Purpose Project
├── contact.html          Contact form + Ways to Give / donate section
├── css/
│   └── style.css        All design tokens (colors, type, spacing) + component styles
├── js/
│   └── main.js           Mobile nav toggle, scroll-reveal animation, contact form validation
├── assets/
│   └── images/
│       └── matele-logo.jpeg
└── README.md
```

There is no build tool — every page is a self-contained HTML file that links the same
`css/style.css` and `js/main.js`, so there is nothing to compile or bundle.

## Updating content

All copy lives directly in the HTML files — search for the text you want to change and edit
it in place. A few things worth knowing:

- **Design tokens** (colors, fonts, spacing) are defined once at the top of
  [`css/style.css`](css/style.css) as CSS custom properties (e.g. `--color-green-600`,
  `--font-display`). Change a value there and it updates everywhere.
- **Navigation and footer** are duplicated across all four pages (this is normal for a
  build-free static site). If you add/rename a nav link or footer column, update it in all
  four HTML files.
- **Icons** are inline SVGs (no icon font/library dependency). Swap the `<path>` data for a
  different icon if needed, or copy new ones from a set like
  [Heroicons](https://heroicons.com) or [Phosphor Icons](https://phosphoricons.com).

## Outstanding TODOs before launch

The source Word document (`Matele Foundation Framework.docx`) is a strategic framework, not
pre-written web copy — most page content was adapted from it, but it did not include the
following, so these are marked with `<!-- TODO -->` comments directly in the HTML:

1. **Contact details** — physical address, phone number, email address, and social media
   links appear as placeholders in the top bar, footer, and Contact page on every file. Search
   for `TODO` in `index.html`, `about.html`, `programs.html` and `contact.html` to find every
   occurrence.
2. **Team / board bios** — the "Board & Team" section on `about.html` is currently a
   placeholder; add real names, roles, photos and bios once available.
3. **Donation method** — the "Ways to Give" section on `contact.html` describes giving options
   but is not wired to a real payment method. Add an M-Pesa Paybill/Till number, bank transfer
   details, or a hosted donation page link (Stripe, PayPal, DonorBox, etc.).
4. **Contact form backend** — `contact-form` on `contact.html` validates input in the browser
   but does not send anywhere yet. Wire it up to a form backend such as
   [Formspree](https://formspree.io), [Netlify Forms](https://www.netlify.com/platform/core/forms/),
   or your own endpoint by setting the form's `action`/`method`, or replacing the `fetch`
   call in `js/main.js`'s submit handler.
5. **Gallery** — no photos beyond the logo were available in the source folder, so a Gallery
   page was not built. Once photos are available, add a `gallery.html` page following the same
   header/footer structure as the other pages, and link it from the nav in all four files.

## Design notes

- **Color palette** is drawn from the Foundation's own logo (deep navy `#16233f` + two-tone
  green `#3f9142` / `#7cc142`), on a warm off-white background, with an amber accent
  (`#e0a03e`) reserved specifically for Donate/primary CTAs so they stand out.
- **Typography** pairs Fraunces (serif, headings) with Work Sans (sans-serif, body) — loaded
  from Google Fonts with `font-display: swap`.
- Layout, section rhythm and card/CTA patterns were inspired by the provided design mockup,
  restyled to the Foundation's actual brand colors.
- The site respects `prefers-reduced-motion`, keeps all touch targets ≥44px, uses semantic
  landmarks and a skip link, and maintains WCAG AA text contrast throughout.
