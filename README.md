# 🎂 Ebrahim Moton — Birthday Surprise Website

A classic-style, multi-page birthday surprise site (plain HTML, CSS and JavaScript — no installs, no build step).

**Pages:** Menu · Birthday Wishes (Mother, Father + 8 friends) · Missions (real-life + live fan missions) · Final Dua + Award of Legend certificate.

## Project structure

```
ebrahim-birthday/
├── index.html        # page structure
├── css/style.css     # classic theme (colours are at the top, in :root)
├── js/data.js        # ✏️ EDIT THIS: names, wishes, missions
├── js/script.js      # page logic, countdown, confetti
├── .nojekyll
└── README.md
```

## Run it on your computer
Double-click `index.html`. That's it.

## Edit the content
Open `js/data.js` in any text editor (Notepad, VS Code):
- `PARENTS` → Mother and Father wishes
- `FRIENDS` → the 8 friends' names and wishes
- `MISSIONS` → real-life and live-stream missions

Keep the quotation marks and commas exactly as they are, save, then refresh the browser.

Other quick edits:
- **Birthday date:** in `js/script.js` search for `new Date(n.getFullYear(),9,16)` — the month starts at 0, so `9` = October and `16` = the day.
- **Channel links:** in `index.html` search for `YouTube · Ebrahim Moton` and wrap it in `<a href="YOUR-LINK" target="_blank">…</a>`.
- **Colours:** top of `css/style.css`.

## Personalise through the link (optional)
`https://YOUR-SITE/?name=Ebrahim%20Moton&age=12`

## Publish free on GitHub Pages
1. Create a GitHub account → **New repository** (e.g. `ebrahim-birthday`), set it to **Public**.
2. Click **uploading an existing file**, drag in **everything inside this folder** (`index.html`, `css`, `js`, `README.md`, `.nojekyll`), then **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick the `main` branch and `/ (root)`, then **Save**.
4. After a minute or two your site is live at:
   `https://YOUR-USERNAME.github.io/ebrahim-birthday/`
5. Send that link to the birthday boy on **16 October** 🎁

> Tip: a public repo means the code (including the wishes) can be seen by anyone who finds it. Do not put private info in it.
