# ZIPI.GE

A Georgian storefront for electric unicycles: NOSFET (Aero, Aeon, Xeno, Apex) and LEAPERKIM
(Patton-S, Lynx-S, Sherman-P). Prices in lari, Georgian at the site root and English under
`/en/`, theme follows the system with a light / dark switch.

Every page is plain HTML generated ahead of time, so the text, prices and specs are there for
Google and AI assistants without running any JavaScript. No npm, no framework: the build is one
Node.js script with no dependencies.

## How it gets published

Push to `main`. GitHub Actions (`.github/workflows/pages.yml`) runs `node tools/build.mjs`,
which writes the finished site into `_site/` and publishes it. You never run the build by hand
to change a price or a text.

If the build fails (a syntax error in `catalog.js`, or an internal link that points nowhere),
nothing is published and the live site stays as it was. The error is in the Actions tab.

To preview locally: install Node.js 18+, run `node tools/build.mjs`, then serve `_site/` with
any static server (`npx serve _site`). Without `cwebp` and ImageMagick installed the preview
uses the original photos; the live build has both.

## What lives where

| File | What it holds |
|---|---|
| `data/catalog.js` | every model: price, specs, descriptions, photos; WhatsApp number, warranty, contact hours and stock status in `meta` |
| `data/i18n.js` | every text on the site in Georgian and English, including the page titles and descriptions Google shows (`seo.*`) and the FAQ (`faq.*`) |
| `content/guide.ka.html`, `.en.html` | the "what is an electric unicycle" guide |
| `content/tips/` | the tips articles (see below) |
| `assets/styles.css` | colours, fonts, spacing |
| `assets/app.js` | the interactive parts: slideshow, sort, comparison, photo gallery and full screen, theme, mobile menu |
| `assets/wheels/` | original product photos (`id-1`, `id-2`, …; the first is the card photo) |
| `assets/icons/` | favicon, logo, default share image |
| `tools/build/site.js` | the page templates and all SEO output |
| `tools/build.mjs` | reads the sources, resizes photos, writes `_site/`, checks links |

## Pages

| Georgian | English | |
|---|---|---|
| `/` | `/en/` | home: slideshow, all models, guide, service, tips |
| `/monoborblebi/` | `/en/electric-unicycles/` | catalogue with sort and comparison |
| `/monoborblebi/nosfet/`, `/monoborblebi/leaperkim/` | `/en/electric-unicycles/…` | one page per brand |
| `/monoborblebi/nosfet-aero/` … | `/en/electric-unicycles/nosfet-aero/` … | one page per model |
| `/natsilebi/`, `/aksesuarebi/`, `/damtsavebi/`, `/3d-bechdva/` | `/en/parts/` … | catalogue sections |
| `/servisi/` | `/en/service/` | service centre and warranty |
| `/ra-aris-monoborbali/` | `/en/what-is-an-electric-unicycle/` | guide and FAQ |
| `/rchevebi/` | `/en/tips/` | tips |
| `/chven-shesakheb/`, `/kontakti/` | `/en/about/`, `/en/contact/` | about, contact |

Old addresses keep working: `index.html?model=…`, `?brand=…`, `?cat=…` and `tips/*.html`
forward to the new pages.

A catalogue section with no products yet (everything except the wheels, for now) is marked
`noindex` and left out of the sitemap, so Google does not see empty pages. Add a product to
`extras` in `catalog.js` and the section becomes a normal indexed page.

## Search engines and AI assistants

The build produces, on every page:

- a unique `<title>` and description, a canonical address, and `hreflang` links between the
  Georgian and English versions;
- Open Graph tags with a JPG share image (WhatsApp and Facebook previews);
- schema.org data (JSON-LD): the shop (`Store`: phone, hours, Tbilisi), breadcrumbs, and on
  model pages a `Product` with an `Offer` (price in GEL, warranty) and every spec as a
  property. The catalogue has an `ItemList`, the guide an `FAQPage`.

And for the whole site: `sitemap.xml` (both languages, with photos), `robots.txt` (open to all
search engines and AI crawlers), and `llms.txt`, a plain-text summary of the shop, models and
prices for AI assistants.

Stock status: `meta.availability` in `catalog.js` is `null`, so no stock status is sent to
Google. Set it to `"InStock"`, `"PreOrder"` or `"BackOrder"` (or per model with an
`"availability"` field) once it is known.

## Changing a price

Open `data/catalog.js`, find the model, change the number after `priceGel`, push.

```js
"priceGel": 9600,        // current price in lari, no spaces or commas
"oldPriceGel": null,     // crossed-out price, or null for no discount
```

Keep the quotes and commas exactly as they are. If the build fails after an edit, a comma or a
quote went missing.

## Specs and comparison

Each model has a `specs` block; the field list is in the comment at the top of
`data/catalog.js`. An unknown value is `null`: it shows as a dash and is left out when the
comparison picks the best value in a row.

Visitors tick "+ შედარება" on up to four wheels; the picks are remembered while they move
between pages. The comparison table marks rows where the wheels differ with an orange bar and
colours the best value in each row.

The figures come from ewheels.com, ecodrift.ru and nosfet.com, checked on 2026-11-06. Where the
sources disagreed, the catalogue uses the manufacturer figure, or the retailer figure that the
arithmetic supports (for example the Apex is 151V, not the 121V printed on nosfet.com). The
model descriptions are written for this site from those facts.

## Contact: WhatsApp and calls

The phone number is `meta.whatsapp` in `catalog.js` (digits only). Every contact button opens a
WhatsApp chat with a message already typed (a general hello, or the model name); the number is
also shown as a `tel:` link. Contact hours are `meta.hoursOpen` / `meta.hoursClose`.

## Changing text

Every text is in `data/i18n.js`, once under `ka` and once under `en`. Change both, or the other
language keeps the old wording.

## Adding a model

1. Drop the photos into `assets/wheels/`, named `brand-model-1.webp`, `-2`, … The build makes
   the small versions by itself.
2. Copy an existing block inside `wheels` and edit it. The `id` must be unique (it becomes the
   page address), and `brand` must match one of the brand ids.

## Tips pages

- `content/tips/articles.tsv`: one line per article, tab-separated: slug, title (ka), title (en),
  short description (ka), short description (en). The order here is the order on the list page.
- `content/tips/<slug>.ka.html` and `<slug>.en.html`: the article body (h2, p, ul, …). Links to a
  model can stay as `../index.html?model=<id>`: the build turns them into model page links.

## Before this goes live

- Specs come from retailer listings and nosfet.com. Check them against the distributor's sheets
  for the batch you import. The Sherman-P is new, so its figures may still move.
- The photos are manufacturer press renders taken from retailer catalogues. Replace them with
  your own, or ask for a media kit.
- The street address is only "Tbilisi" for now.

## Notes on the photos and design

Every photo has its flat border trimmed off; cards render them on a light plate with
`mix-blend-mode: multiply`, so any leftover background blends in. The build serves 480, 1000 and
1600 px WebP versions (`assets/img/`) plus a 1200 px JPG for sharing.

Dark is the primary theme, light is its inverse, both from the same CSS variables. Nunito for
Latin model names and numbers, Noto Sans Georgian for Georgian, both from Google Fonts (loaded
without blocking the first paint). One accent, a signal orange.
