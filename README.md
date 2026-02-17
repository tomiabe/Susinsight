# Susinsight Web

This project runs the Google AI Studio export as the active homepage framework, now wired to live WordPress data.

## Active source

Imported from:

- `/Users/tomiabe/Documents/Susinsight Theme/imported-design`

Mounted in Next.js at:

- `/Users/tomiabe/Documents/Susinsight Theme/susinsight-web/src/ai`

## Configure WordPress (Headless)

Set your GraphQL endpoint:

```bash
cp .env.example .env.local
```

In `.env.local`:

```env
WORDPRESS_GRAPHQL_URL=https://susinsight.com/graphql
PREVIEW_SECRET=<long-random-string>
WP_PREVIEW_TOKEN=
```

If no endpoint is set or it is unavailable, the site falls back to your static AI Studio constants.

## Run locally

```bash
cd "/Users/tomiabe/Documents/Susinsight Theme/susinsight-web"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live routes

- `/` AI Studio homepage with live WP data injected into hero/trending/signals/main sections
- `/stories/[slug]` live WordPress article page
- `/api/draft?secret=...&slug=...` enable draft mode and open a story preview
- `/api/exit-draft` disable draft mode

## Notes

- The design/layout system is still your AI Studio export.
- Tailwind is loaded via CDN and configured in `src/app/layout.tsx` to mirror the export.
- Section mapping is controlled in `src/ai/wp-section-map.ts` so each homepage block can target exact WP category slugs.
- Deployment steps are in `DEPLOY_VERCEL.md`.
