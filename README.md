# OTU Webring

A webring connecting personal sites from students at Ontario Tech University.

**[otu-ring.com](https://otu-ring.com)**

![OTU Webring Demo](public/assets/webring.gif)

---

## What is a Webring?

A [webring](https://en.wikipedia.org/wiki/Webring) is a collection of websites linked together in a circular structure. Visitors can navigate from one site to the next, discovering new portfolios, blogs, and projects from the OTU community.

## Features

- Browse member sites with search and filtering (alphabetical, graduation year)
- Navigate between sites using prev/next links
- Lightweight widget for your site's footer

---

## Join the Ring

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/otu-webring.git
```

### 2. Add Your Site

Edit `public/js/sites.js` and add your entry to the `sites` array:

```javascript
{ name: "Your Name", url: "https://yoursite.com", year: 2027, recent_internship: "Company Name" }
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Your full name |
| `url` | Yes | Your site URL (include `https://`) |
| `year` | Yes | Expected graduation year |
| `recent_internship` | No | Recent company or role description |

### 3. Add the Widget

Copy the code from [`public/widget.html`](public/widget.html) into your site's footer. The widget provides prev/next navigation and links back to the webring.

### 4. Submit a Pull Request

```bash
git add public/js/sites.js
git commit -m "Add [Your Name] to webring"
git push origin main
```

Then open a PR at [github.com/VinceKLW/otu-webring/pulls](https://github.com/VinceKLW/otu-webring/pulls).

---

## Requirements

- Site must be publicly accessible
- Site must include the webring widget
- Personal sites only (no commercial sites)

## Questions?

Open an [issue](https://github.com/VinceKLW/otu-webring/issues) or reach out to the maintainers.
