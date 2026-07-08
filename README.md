# PinkLady Properties — SOP & Training Portal

A password-gated training site for the PinkLady Properties team, built with plain
HTML/CSS/JS and hosted for free on GitHub Pages.

## Folder structure

```
PinkLady-SOP/
├── index.html              ← homepage
├── pages/
│   ├── start-here.html      ← Start Here (new agent onboarding sequence)
│   ├── sops.html            ← Book of SOPs landing page
│   ├── engines.html         ← The Engines (lead generation systems)
│   ├── training.html        ← Training landing page
│   └── resources.html       ← Resources landing page
└── assets/
    ├── css/styles.css       ← all site styling (colors, fonts, layout)
    ├── js/
    │   ├── components.js    ← shared header/nav + footer (edit nav links here)
    │   └── auth.js          ← password gate logic (edit password here)
    └── images/logo.png      ← PinkLady Properties logo
```

## How to preview the site locally

Because the header/footer/password-gate are injected with JavaScript, opening
`index.html` directly by double-clicking it may not work in every browser
(some block local-file scripts). The reliable way to preview:

1. Open a terminal in this folder.
2. Run: `python -m http.server 8000` (or `npx serve` if you have Node installed).
3. Visit `http://localhost:8000` in your browser.

## How to change the team password

Open `assets/js/auth.js` and edit this line near the top:

```js
var PLP_PASSWORD = 'PinkLady2026';
```

Save, commit, and push — the new password takes effect immediately for anyone
who hasn't already unlocked the site in their browser. (Note: this is a
convenience lock, not real security — the password lives in a file anyone can
view. Don't put anything here you wouldn't want a determined visitor to see.)

If someone needs to re-lock a shared/public computer, they can click
**"Lock this device"** in the footer of any page.

## How to add or rename a nav link

Open `assets/js/components.js` and edit the `PLP_NAV_ITEMS` list at the top.
This one list controls the navigation on every page site-wide:

```js
var PLP_NAV_ITEMS = [
  { key: 'home', label: 'Home', href: 'index.html' },
  { key: 'sops', label: 'Book of SOPs', href: 'pages/sops.html' },
  ...
];
```

## How to add a new page

1. Duplicate one of the existing files in `pages/` as a starting template.
2. Update the `<title>` and the hero heading/text.
3. Replace the placeholder cards in the `.plp-grid` section with your real content.
4. At the bottom of the file, make sure the three script calls pass the right
   arguments for that page's key and folder depth, e.g. for a page inside
   `pages/`:
   ```html
   <script>
     plpRenderHeader('sops', '../');
     plpRenderFooter('../');
     plpInitAuth('../');
   </script>
   ```
   The first argument to `plpRenderHeader` should match a `key` from
   `PLP_NAV_ITEMS` so the correct nav link highlights as active.
5. If it's a brand-new section (not a sub-page of an existing one), add it to
   `PLP_NAV_ITEMS` in `components.js` so it shows up in the navigation.

## Deploying to GitHub Pages

1. Create a new **private or public** GitHub repository (public is required for
   free GitHub Pages unless you have GitHub Pro/Team/Enterprise).
2. Push this folder's contents to that repository's `main` branch.
3. In the repo, go to **Settings → Pages**, set the source to the `main`
   branch and `/ (root)` folder, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Adding a custom domain later

1. Buy a domain (e.g. via Namecheap, Google Domains successor, Cloudflare Registrar).
2. In the repo, go to **Settings → Pages → Custom domain** and enter your domain.
   GitHub will create a `CNAME` file in the repo automatically.
3. At your domain registrar, add the DNS records GitHub Pages instructs you to
   add (typically an `A` record set or a `CNAME` record pointing at
   `<your-username>.github.io`).
4. Check "Enforce HTTPS" once the domain is verified.

## Content still to add

All five section landing pages (Start Here, Book of SOPs, The Engines, Training,
Resources) currently show placeholder "Coming soon" cards labeled with the agreed
subcategories. Send over the real content for each subcategory and they'll be
built out into full pages following this same template.
