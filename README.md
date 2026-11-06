# ZIPI.GE

A Georgian storefront for electric unicycles, laid out the way cfmoto.ge is: sticky header,
a flagship slider, brand tiles, a top models row, a filterable catalogue with side-by-side
comparison, service section, contact panel.

Two brands, seven models: NOSFET (Aero, Aeon, Xeno, Apex) and LEAPERKIM (Patton-S, Lynx-S,
Sherman-P). Georgian by default with an English switch, dark by default with light and auto,
prices in lari.

No build step, no npm, no framework. Open `index.html` and it runs.

## What lives where

| File | What it holds |
|---|---|
| `data/catalog.js` | every model: price, badge, stock, specs, descriptions, photo names; the WhatsApp number and warranty length in `meta` |
| `data/i18n.js` | every piece of text on the page, in Georgian and English |
| `index.html` | page structure, the visible phone number, opening hours |
| `assets/styles.css` | colors, fonts, spacing, all in the token block at the top |
| `assets/app.js` | rendering, filtering, sorting, comparison, WhatsApp links, language, theme |
| `assets/wheels/` | 21 product photos, three per model |

## Changing a price

Open `data/catalog.js`, find the model, change the number after `priceGel`. Save, reload.

```js
"priceGel": 9600,        // current price in lari, no spaces or commas
"oldPriceGel": null,     // crossed-out price, or null for no discount
"badge": "flagship",     // flagship, new, sale, range, offroad, bestseller, beginner, light, city, null
"stock": "in",           // "in" = in stock, "order" = to order
```

Keep the quotes and commas exactly as they are. If the catalogue stops loading, a comma or a
quote went missing.

The monthly instalment under each price is calculated, not typed. It comes from
`installmentMonths` and `installmentRate` in the `meta` block at the top of the same file.

## Specs and comparison

Each model has a `specs` block. The model window and the comparison table both read from it,
so a value only has to be right in one place. The field list is in the comment at the top of
`data/catalog.js`. An unknown value is `null`: it shows as a dash and is left out when the
table picks the best value in a row.

Visitors tick "+ შედარება" on up to four cards, and a tray appears at the bottom of the screen.
The comparison table marks two things. A row where the wheels differ gets an orange bar on the
left. The best value in a row (lowest price or weight, highest power, battery, speed, range and
so on) is coloured. A "differences only" switch hides rows where every wheel is the same.

The figures come from ewheels.com, ecodrift.ru and nosfet.com, checked on 2026-11-06. Where the
sources disagreed, the catalogue uses the manufacturer figure, or the retailer figure that the
arithmetic supports (for example the Apex is 151V, not the 121V printed on nosfet.com). The
model descriptions are written for this site from those facts. They are not translations of
the retailers' copy.

## Contact: WhatsApp instead of calls

There is no call-back form. Every contact button opens a WhatsApp chat with +995 598 66 61 11,
with a message already typed: a general hello, a test ride request, or the name of the model
the visitor was looking at. The number used for the links is `meta.whatsapp` in
`data/catalog.js` (digits only). The number shown as text sits in `index.html`, in the contact
panel and the footer. Change both if the number changes.

## Warranty

Every model carries 12 months on the motor, the controller and the battery cells. The length
is `meta.warrantyMonths`. The wording is in `data/i18n.js` under `warranty.*`, `svc.1*` and
`contact.warranty*`.

## Changing text

Every visible string is in `data/i18n.js`, once under `ka` and once under `en`. Change both,
or the other language will keep showing the old wording. Model descriptions live with the
models in `data/catalog.js`, also as a `ka` / `en` pair.

## Adding a model

1. Drop three photos into `assets/wheels/`, named `brand-model-1.webp`, `-2`, `-3`.
2. Copy an existing block inside `wheels` and edit it. The `id` must be unique, and `brand`
   must match one of the brand ids.

The model count in the strip under the hero is counted from the catalogue, so it updates by
itself.

## Language and theme

Georgian is the default. The switch remembers a visitor's choice in their browser. The theme
is dark by default; the switch also offers light and auto (follow the operating system), and
remembers the choice.

## Before this goes live

- Specs come from retailer listings and nosfet.com. Close, but check them against the
  distributor's sheets for the batch you actually import. The Sherman-P is new (pre-order at
  both retailers in November 2026), so its figures may still move.
- The photos are manufacturer press renders taken from retailer catalogues (the Sherman-P set
  from ecodrift.ru). Fine for a mockup, not something to sell against without the
  distributor's blessing. Replace them with your own, or ask for a media kit.
- The street address is only "Tbilisi" for now.

## Running it

Double click `index.html`. It works straight off the filesystem, no server needed.

The published copy runs on GitHub Pages. `.github/workflows/pages.yml` deploys on every push
to `main`, but only if Settings, Pages, Source is set to "GitHub Actions".

## Notes on the video

The video section embeds a YouTube video from the channel დიფი • DIPI, on whether couriering
by unicycle is worth it. The player is a click-to-load facade: until someone presses play the
page only fetches the thumbnail, so no YouTube script or cookie is involved. Pressing play
swaps in a `youtube-nocookie.com` iframe.

To swap the video, change the id in the `data-video` attribute and the thumbnail URL in
`index.html`, and `video.name` in `data/i18n.js`.

## Notes on the photos

Press photos arrive at wildly different sizes, some on white backgrounds, some as cutouts
with transparency. Every photo was converted to webp and had its flat border trimmed off,
which is why they sit at a consistent size on the cards. Cards render them on a light plate
with `mix-blend-mode: multiply`, so whatever background survives blends into the plate
instead of showing as a pale rectangle.

## Design notes

Dark is the primary theme, light is its inverse, and both are built from the same CSS
variables. Type is Nunito for Latin model names and numbers, Noto Sans Georgian for Georgian,
both from Google Fonts. One accent, a signal orange, on prices, calls to action and the best
values in the comparison table; the rest is a cool near-black.

*opus5.5*
