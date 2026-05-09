# Ahmed & Aya — Wedding Invitation (Static)

A pure HTML / CSS / JavaScript version of the wedding invitation site. No build step, no frameworks.

## Run locally

Just open `index.html` in any browser, or serve the folder:

```bash
# any static server works, for example:
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

### GitHub Pages
1. Create a new GitHub repository.
2. Upload **all files in this folder** (`index.html`, `styles.css`, `script.js`, `assets/`, `README.md`) to the repo root.
3. Go to **Settings → Pages**.
4. Under "Build and deployment", choose **Deploy from a branch**, select `main` branch, `/ (root)` folder, save.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Netlify / Vercel / Cloudflare Pages
Drag-and-drop the folder, or connect the repo. No build command needed — output directory is the project root.

## Structure

```
.
├── index.html     # Markup
├── styles.css     # All styling + animations
├── script.js      # Preloader, countdown, calendar, toast, form
└── assets/        # Photos
```

## Edit content

- Names, date, story, timeline, venue → edit `index.html`.
- Colors and typography → CSS variables at the top of `styles.css`.
- Wedding date / countdown target → `script.js` (`new Date("2026-06-02T17:00:00")`).
