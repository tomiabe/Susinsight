# Deploy to Vercel (GitHub)

## 1) Push to GitHub

```bash
cd "/Users/tomiabe/Documents/Susinsight Theme/susinsight-web"
git init

git add .
git commit -m "Susinsight AI Studio + headless WP integration"

git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## 2) Import in Vercel

1. Go to Vercel dashboard.
2. Import the GitHub repo.
3. Framework preset: `Next.js`.
4. Build command: default (`next build`).
5. Output: default.

## 3) Set environment variables in Vercel

Project Settings -> Environment Variables:

- `WORDPRESS_GRAPHQL_URL` = `https://susinsight.com/graphql`
- `PREVIEW_SECRET` = `<long-random-secret>`
- `WP_PREVIEW_TOKEN` = `<optional-bearer-token-if-needed>`
- `HEADLESS_FETCH_KEY` = `<shared-secret-for-cloudflare-allow-rule>`
- `SITE_URL` = `https://<your-vercel-domain>`

Set for: Production, Preview, Development.

## 4) Set WordPress preview constants

In WordPress `wp-config.php`:

```php
define('SUSINSIGHT_FRONTEND_URL', 'https://<your-vercel-domain>');
define('SUSINSIGHT_PREVIEW_SECRET', '<same-as-PREVIEW_SECRET>');
```

## 5) Validate

- Homepage loads with live posts from WordPress.
- Story links open `/stories/[slug]`.
- WP admin preview opens headless draft URL via `/api/draft`.
- `/api/exit-draft` returns to normal mode.

## 5b) Cloudflare allow rule (critical)

If Cloudflare is in front of WordPress, create a WAF/custom rule to **allow** GraphQL requests when:

- URI path equals `/graphql`
- Request header `x-susinsight-headless-key` equals your `HEADLESS_FETCH_KEY`

Without this, WordPress GraphQL may return a Cloudflare block page and the frontend will fall back to placeholders.

## 6) Optional: custom domain

- Add your custom domain in Vercel.
- Update `SUSINSIGHT_FRONTEND_URL` in `wp-config.php` to custom domain.
- Keep `PREVIEW_SECRET` unchanged.
