# Gladiator Dash

This repo is the website for **[gladiatordash.com](https://gladiatordash.com)**.

---

## Part 1: About the site

Gladiator Dash is a 3.1-mile obstacle mud run at Lake Bryan in Bryan, Texas, put on
each spring by **One Army**. Every dollar raised benefits **Still Creek Ranch**. The
course has about 10 obstacles, and every one is "challenge by choice": you can always
go around, so anyone can start and everyone can finish.

Gladiator Dash is a registered 501(c)(3) charitable organization (EIN 99-3600364). It
is **not** affiliated with Texas A&M University.

### What's on the site

| Page | What it covers |
|---|---|
| Home | Race date, price, the cause, last year's results and photos |
| Obstacles | The major obstacles on this year's course |
| About | One Army, Still Creek Ranch and the event's history |
| FAQ | Race day, registration, heats, the Endurance Race, the raffle |
| Sponsors | This year's sponsors by tier, and packages for new sponsors |
| Raffle | This year's raffle prizes and where to buy tickets |
| Giveback | The student organization competition ($1,000 per category) |
| Contact | Email, Instagram, sponsorship contacts and directions |

The site links to a few outside services:

- **Zeffy**: registration, donations and raffle tickets
- **results.laurelt.com**: race results
- **Google Photos**: race-day photo gallery

### Get in touch

- Email: [onearmy.philanthropy@gmail.com](mailto:onearmy.philanthropy@gmail.com)
- Instagram: [@gladiatordash](https://www.instagram.com/gladiatordash/)

---

## Part 2: For OA developers

The site is plain HTML, CSS and a little JavaScript. It has no framework, no build step
and needs no server. Keep it that way.

### Open it locally

Open `index.html` in a browser. Every path is relative, so it works straight from your
computer.

```bash
open index.html     # Mac
start index.html    # Windows
```

Or just double-click `index.html`.

### How it goes live

GitHub Pages serves the `main` branch at gladiatordash.com. **Anything pushed to
`main` goes live within a few minutes**, so check your change locally first.

### Making changes with Git

**Quick edits** (a typo, a date): commit straight to `main`.

```bash
git pull                          # get the latest first
# ...make your edits, check them in the browser...
git add .
git commit -m "Update race date to April 10, 2028"
git push
```

**Bigger changes** (a new page, a redesign, anything you want someone to look at
first): use a branch and a pull request.

```bash
git checkout main
git pull
git checkout -b update-2028-sponsors      # make a new branch
# ...make your edits, check them in the browser...
git add .
git commit -m "Add 2028 sponsors"
git push -u origin update-2028-sponsors   # put the branch on GitHub
```

Then on GitHub, open a **pull request** from your branch into `main`, have someone
review it, and merge it. Merging is what makes it go live. Afterwards:

```bash
git checkout main
git pull
git branch -d update-2028-sponsors        # clean up the old branch
```

### Where things are

```
index.html, obstacles.html, about.html, faq.html,
sponsors.html, raffle.html, giveback.html, contact.html
                        one file per page
register.html           placeholder (Register links go straight to Zeffy)
mercuria.html           redirect to the Mercuria section of Sponsors
endurance-race/, giveback-program/, register-xmqwv/
                        redirects from old Wix addresses (flyers and QR codes use them)

assets/site.css         the whole stylesheet; colors and fonts are in :root at the top
assets/nav.js           mobile menu and small effects
media/<page>/           images for that page
media/shared/           logo and favicon
CNAME                   tells GitHub Pages to use gladiatordash.com
```

### Things to know before editing

- **The header and footer are copied into every page.** If you change the nav, the
  Register link or the footer, change it in all eight pages. Search the whole project
  for the old text to make sure you got every copy.
- **Page content is written straight into the HTML.** There are no data files.
- **Colors:** navy, black and white only, using the variables in `assets/site.css`.
  No maroon and no A&M branding. The only exceptions are the gold, silver and bronze
  tier names on the Sponsors page.
- **Style:** square corners, thick 2–3px lines, no shadows. One font, Archivo.
- **Image files:** name them in lowercase with dashes, like `mud-pit-slide.jpg`.

### Yearly update checklist

Go through this each year once the new date is set. A project-wide search for the old
year (for example `2027`) finds most of it.

**Dates and links (every page)**
- [ ] Race date: home page, the FAQ ("When is Gladiator Dash?") and the logo alt text
      in every footer (`April 11 2027`)
- [ ] Registration opening date: home page and the Giveback page banner
- [ ] Zeffy registration link (`gladiator-dash--2027`) in the header, footer and buttons
      on every page
- [ ] Zeffy donation link on the home page
- [ ] Footer logo image (`media/home/gd-logo-white.png`) and home page logo if the
      date is printed on it

**Home page**
- [ ] Ticket price ("As low as $27.50")
- [ ] Total raised for Still Creek Ranch ($1,200,000; also on the About page)
- [ ] Last year's results link (results.laurelt.com) and photo album link
- [ ] "Gladiator Dash 2026" label on the results section
- [ ] Testimonial, if you want a newer one

**Sponsors**
- [ ] Sponsor logos and tiers (`media/sponsors/<tier>/` and `sponsors.html`)
- [ ] The scrolling logo strip in every page's footer (Title, Arena and Gold sponsors)
- [ ] Last year's runner count and money raised in the packages intro
- [ ] Package prices and what each one includes

**Raffle**
- [ ] Prize list, photos and values (`media/raffle/`)
- [ ] Ticket price, Zeffy ticket link and drawing date
- [ ] Move the old year's prizes into the "last year" section, or remove them

**Obstacles**
- [ ] The "2027 Major Obstacles" heading and the obstacle list and photos

**FAQ**
- [ ] Heat start times, competitive heats and the Endurance Race end time
- [ ] Race-day sign-up price
- [ ] Shirt and bib pickup days
- [ ] Raffle answer ("The 2027 raffle is coming soon")

**Giveback**
- [ ] Year in the rules text, the categories and the prize amount

**Officers and contacts** (new officers each year)
- [ ] Sponsorship contacts (names, roles and phone numbers) on the Sponsors page and
      the Contact page
- [ ] One Army member photo on the About page
- [ ] Email and Instagram, if they ever change. They appear in every page's footer,
      the FAQ, Sponsors and Contact.

**Page titles and descriptions**
- [ ] The `<title>` and `<meta name="description">` at the top of any page that names
      a year (Raffle and Register do)
