# Gladiator Dash — working notes

Static site. Plain HTML/CSS/vanilla JS, no framework and no build step. Keep it that way
unless asked otherwise.

## Structure
- Flat files at the repo root: `index.html`, `obstacles.html`, `faq.html`, ...
- The site must open from `file://` — every path stays relative and nothing uses
  `fetch()`. Do not reintroduce shared partials loaded at runtime.
- Header and footer markup is duplicated in each page. Change the nav in all nine.
- One stylesheet: `assets/site.css`. All tokens live in its `:root` block.
- `media/<tab>/` holds that tab's images; `media/shared/` holds logo and favicon.

## Rules
- Page content is hardcoded in the HTML — no JSON data files, no client-side templating.
- Every page needs `<body data-page="...">` matching the `data-nav` value in the header.
- Never hardcode a color or font — use the custom properties in `tokens.css`.
- Palette is navy, black and white only. No gold, no maroon, no third accent.
  Exception: the metal colors (`--gold`, `--silver`, `--bronze`) for the package names
  on the Sponsors page. Prize photos and donor logos on the Raffle page keep their own colors.
- Rugged, not clean: zero border-radius, 2-3px rules, grain overlay, no shadows.
- Type is Archivo, one family. Display and nav are uppercase at wdth 118-125 /
  wght 700-800; body is wdth 100 / wght 400.
- Nav tabs are large slabs with divider rules; Register is a solid white block.
- Media filenames are descriptive kebab-case, not Wix hashes.
- Old Wix URLs (`/register-xmqwv`, `/endurance-race`, `/giveback-program`) still
  need redirects before this goes live — flyers and QR codes point at them.

## Test locally
`open index.html`. No server needed, and it must stay that way.

## Fixed facts
- Event: Gladiator Dash 2026, by One Army, benefitting Still Creek Ranch.
- NOT affiliated with Texas A&M. Never use A&M branding, naming, or maroon.
- 3.1-mile obstacle mud run, ~10 obstacles, all "challenge by choice".
- Contact: onearmy.philanthropy@gmail.com · Instagram @gladiatordash
- External services: RaceEntry (registration), Zeffy (raffle tickets),
  results.laurelt.com (results), Google Photos (gallery).
