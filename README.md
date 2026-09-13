# Azzan Khan — personal site

This is a lightweight Vite site for Azzan Khan, positioned around lead engineering, full-stack development, and building useful products. It replaces the legacy WordPress front end with a small client-side app that has route-aware pages for Work, Services, Projects, Writing, About, Contact, and YouTube.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. Push the project to GitHub, enable **Settings → Pages → Source: GitHub Actions**, and push to the `main` branch. The workflow builds the Vite app, creates a Pages `404.html` fallback, and deploys it automatically. Navigation uses hash routes so article and page links work on GitHub Pages project URLs as well as custom domains.

## Content migration notes

- The blog archive in `src/content/posts.json` was recovered from the published `wp_posts` records in the supplied database backup. The ten published technical posts retain their original titles, dates, slugs, excerpts, and article body content.
- A small set of public article images was copied from `wp-content/uploads` into `public/media` and referenced by local paths. WordPress plugins, generated caches, SQL dumps, `wp-config.php`, and other credentials/secrets are not used by the site.
- Garden Public School is presented as featured work based on the supplied brief. CitiusTech is mentioned only as public professional context; no confidential project details are included.
- Contact and social links are intentionally lightweight placeholders (`hello@azzankhan.dev`, YouTube, LinkedIn, and GitHub) until the preferred public destinations are confirmed.
