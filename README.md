# Azzan Khan — personal site

This is a statically exported Next.js site for Azzan Khan, positioned around lead engineering, full-stack development, and building useful products. It replaces the legacy WordPress front end with a maintainable App Router site covering Work, Services, Projects, Writing, About, Contact, and YouTube.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run start
```

## Deploy to GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. Push the project to GitHub, enable **Settings → Pages → Source: GitHub Actions**, and push to the `main` branch. The workflow builds the Next.js static export in `out` and deploys it automatically. The current repository is configured for `https://azzankhan.github.io`.

## Content migration notes

- The blog archive in `src/content/posts.json` was recovered from the published `wp_posts` records in the supplied database backup. The ten published technical posts retain their original titles, dates, slugs, excerpts, and article body content.
- A small set of public article images was copied from `wp-content/uploads` into `public/media` and referenced by local paths. WordPress plugins, generated caches, SQL dumps, `wp-config.php`, and other credentials/secrets are not used by the site.
- Garden Public School is presented as featured work based on the supplied brief. CitiusTech is mentioned only as public professional context; no confidential project details are included.
- Contact uses `azzankhanofficial@gmail.com`, the supplied YouTube channel, and LinkedIn profile. The services page is informational and does not promise freelance availability; outside work remains subject to employment policies and commitments.
- The visual system is intentionally original: editorial typography, a field-notes/engineering-log motif, restrained motion, and high-contrast signal blocks inspired by contemporary engineer portfolios without copying any one site.
