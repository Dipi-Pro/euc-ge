# ZIPI.GE

A Georgian storefront for electric unicycles, laid out the way cfmoto.ge is: sticky header,
a flagship slider, brand tiles, a top models row, a filterable catalogue, service section,
contact panel.

Four brands, sixteen models: NOSFET, LEAPERKIM (Veteran), INMOTION and KINGSONG. Georgian and
English, dark and light, prices in lari.

No build step, no npm, no framework. Open `index.html` and it runs.

## What lives where

| File | What it holds |
|---|---|
| `data/catalog.js` | every model: price, old price, badge, stock, specs, photo names |
| `data/i18n.js` | every piece of text on the page, in Georgian and English |
| `index.html` | page structure, phone numbers, email |
| `assets/styles.css` | colors, fonts, spacing, all in the token block at the top |
| `assets/app.js` | rendering, filtering, sorting, language, theme, the two popups |
| `assets/wheels/` | 47 product photos, three per model |

## Changing a price

Open `data/catalog.js`, find the model, change the number after `priceGel`. Save, reload.

```js
"priceGel": 9990,        // current price in lari, no spaces or commas
"oldPriceGel": 12890,    // crossed-out price, or null for no discount
"badge": "sale",         // flagship, new, sale, range, offroad, bestseller, beginner, null
"stock": "in",           // "in" = in stock, "order" = to order
```

Keep the quotes and commas exactly as they are. If the catalogue stops loading, a comma or a
quote went missing.

The monthly instalment under each price is calculated, not typed. It comes from
`installmentMonths` and `installmentRate` in the `meta` block at the top of the same file.

## Changing text

Every visible string is in `data/i18n.js`, once under `ka` and once under `en`. Change both,
or the other language will keep showing the old wording. Model descriptions live with the
models in `data/catalog.js`, also as a `ka` / `en` pair.

## Adding a model

1. Drop three photos into `assets/wheels/`, named `brand-model-1.webp`, `-2`, `-3`.
2. Copy an existing block inside `wheels` and edit it. The `id` must be unique, and `brand`
   must match one of the four brand ids.

## Language and theme

The language switch is Georgian by default and remembers the visitor's choice in their
browser. The theme switch has three positions: auto follows the visitor's operating system,
the other two force light or dark. Auto is the default, and the choice is remembered.

## Before this goes live

These are placeholders and need a real decision:

- Phone numbers (`+995 500 00 00 00`), the address (`თბილისი, [მისამართი]`) and the email.
  They sit in `index.html`, `data/i18n.js` and `assets/app.js`. Search for `500 00 00 00`.
- Prices are converted from international dealer prices at 1 USD = 2.7 GEL. A realistic
  starting point, not your margins. Same for stock status.
- Specs come from vendor listings. Close, but not audited. Check them per model.
- The photos are manufacturer press images taken from retailer catalogues (Alien Rides,
  NextGen Mobility, InMotion). Fine for a mockup, not something to sell against without the
  distributor's blessing. Replace them with your own, or ask for a media kit.
- The call request form validates and confirms, but sends nowhere. Point it at a form service
  (Formspree, Getform, Basin): give `<form id="callForm">` an `action` and `method="post"` in
  `index.html`, then delete the submit handler at the bottom of `assets/app.js`.

## Running it

Double click `index.html`. It works straight off the filesystem, no server needed.

The published copy runs on GitHub Pages through `.github/workflows/pages.yml`, which deploys
on every push to `main`. Turn it on once under Settings, Pages, Source: GitHub Actions.

## Notes on the video

The video section embeds a YouTube video from the channel დიფი • DIPI, on whether couriering
by unicycle is worth it. The player is a click-to-load facade: until someone presses play the
page only fetches the thumbnail, so no YouTube script or cookie is involved. Pressing play
swaps in a `youtube-nocookie.com` iframe.

Embedding is what YouTube's embed feature is for, and the channel is credited with a link.
Still worth a message to the author once this is a commercial storefront, and worth checking
they have not since disabled embedding. To swap the video, change the id in the `data-video`
attribute and the thumbnail URL in `index.html`, and `video.name` in `data/i18n.js`.

## Notes on the photos

Press photos arrive at wildly different sizes, some on white backgrounds, some as cutouts
with transparency, several with the retailer's own sale banners burned into the corner. The
banner ones were swapped for clean studio shots, then every photo was converted to webp and
had its flat border trimmed off, which is why they sit at a consistent size on the cards.
Cards render them on a light plate with `mix-blend-mode: multiply`, so whatever background
survives blends into the plate instead of showing as a pale rectangle.

## Design notes

Dark is the primary theme, light is its inverse, and both are built from the same CSS
variables. Type is Nunito for Latin model names and numbers, Noto Sans Georgian for Georgian,
both from Google Fonts. One accent, a signal orange, on prices and calls to action; the rest
is a cool near-black.

*Collaboration by Claude*
