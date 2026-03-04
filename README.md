# Bev’s Repair Inc. Website (No Monthly Fees)

This is a fast, professional static website designed to be hosted for free on Netlify and updated through an easy admin panel.

## What’s included
- Pages: Home, Services, Gallery, Reviews, Contact + Thank-you page
- Netlify form (Contact/Quote form)
- Admin panel at `/admin` (Decap CMS)
- Editable content in `/content/*.json`
- Placeholder images in `/assets/img/` (replace anytime)

## Quick deploy (Netlify + GitHub)
1) Create a GitHub repo (example: `bevsrepair-site`) and upload everything in this folder.
2) Go to Netlify → **Add new site** → **Import from Git** → select your repo.
3) Build settings:
   - Build command: (leave blank)
   - Publish directory: `.`

## Enable the admin editor
1) Netlify → Site settings → **Identity** → Enable
2) Identity → **Registration preferences** → set to “Invite only” (recommended)
3) Identity → **Services** → Enable **Git Gateway**
4) Invite your email under Identity → Invite users
5) Open: `https://YOUR-SITE.netlify.app/admin` and log in

## Connect your domain (bevsrepair.ca)
1) Netlify → Domain management → Add custom domain → `bevsrepair.ca`
2) Netlify will tell you which DNS records to add at your domain provider
   - Usually you point `@` and `www` to Netlify
3) Wait for SSL to provision (Netlify handles certificates)

## Swap in your real logo
- Replace `/assets/img/logo-placeholder.svg` with your actual logo file (SVG or PNG is best)
- Then update the `<img src="...">` references in the HTML files if needed

If you upload your final logo as PNG/SVG, I can drop it in and update all pages automatically.
