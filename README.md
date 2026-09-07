# Gladiator Dash

Static site for gladiatordash.com — replacing the Wix build.
Plain HTML and CSS. No framework, no build step, no server.

## Open it

Double-click `index.html`, or:

```bash
open index.html
```

Every path is relative and nothing uses `fetch()`, so it works straight off disk.

## Files

```
index.html        Home — the only page with content so far
register.html     ┐
obstacles.html    │
about.html        │
faq.html          ├ empty tabs: title only
sponsors.html     │
mercuria.html     │
raffle.html       │
giveback.html     ┘

assets/site.css   the whole stylesheet
assets/nav.js     mobile menu + footer year
media/<tab>/      images for that tab; media/shared/ for logo and favicon
```

The header and footer are written into each HTML file. Changing the nav means
editing all nine — the tradeoff for opening the site without a server.

## Design

Navy, black and white only. Hard edges everywhere — nothing is rounded, rules are
2–3px, and a grain layer sits over the whole page. Headings and nav are uppercase
Archivo at the wide, heavy end of its width axis; body text is the same family at
normal width. Sections alternate navy and black bands so the page reads as strata
rather than a stack of cards. All colors live in the `:root` block of `site.css`.

Not affiliated with Texas A&M — no A&M branding, naming, or maroon.

## Content still to migrate

| Page | What's needed |
|---|---|
| Register | Pricing tiers, RaceEntry links, waiver, team registration |
| Obstacles | 10 obstacles: photo + description each |
| About | One Army and Still Creek Ranch |
| FAQ | ~17 Q&As in General / Race Day / Registration groups |
| Sponsors | ~50 logos across Title, Arena, Gold, Silver, Bronze |
| Mercuria | Title sponsor profile |
| Raffle | 12 prizes, Zeffy ticket link, endurance race rules |
| Giveback | 4 competing categories, $1,000 prize |

Also on the home page: confirm the 2026 race date (currently a placeholder
carried over from last year) and drop in real photos for `media/home/`.
