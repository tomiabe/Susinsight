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
USE_WORDPRESS_CONTENT=false
PREVIEW_SECRET=<long-random-string>
WP_PREVIEW_TOKEN=
```

Set `USE_WORDPRESS_CONTENT=false` to run pure AI Studio static mode (no WP dependency).
Set `USE_WORDPRESS_CONTENT=true` to use live WordPress content via WPGraphQL.

### WordPress plugins required

- `WPGraphQL`
- `WPGraphQL Menus` (for CMS-managed header/footer menus)
- `Advanced Custom Fields` (optional but recommended)
- `WPGraphQL for ACF` (if using ACF fields)

### WordPress backend setup checklist

- Confirm GraphQL works at `https://your-site.com/graphql`
- Ensure posts are published with slugs for `/stories/[slug]`
- Create standard WP Pages for routes like `/about`, `/contact`, `/advertise`, etc.
- Keep page slugs clean because frontend URI matching uses WP page URI
- Create a `PRIMARY` and `FOOTER` menu location in WordPress so navigation is controlled in WP Admin

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
- `/<page-slug>` live WordPress Page route (catch-all for non-post pages)
- `/category/[slug]` live WordPress category archive
- `/tag/[slug]` live WordPress tag archive
- `/author/[slug]` live WordPress author archive
- `/search?q=term` live WordPress post search
- `/api/draft?secret=...&slug=...` enable draft mode and open a story preview
- `/api/draft?secret=...&type=page&slug=/about/` enable draft mode and open a page preview
- `/api/draft?secret=...&type=page&id=<wp-page-id>` preview a WP page by database ID
- `/api/exit-draft` disable draft mode

## Notes

- The design/layout system is still your AI Studio export.
- Tailwind is loaded via CDN and configured in `src/app/layout.tsx` to mirror the export.
- Section mapping is controlled in `src/ai/wp-section-map.ts` so each homepage block can target exact WP category slugs.
- Deployment steps are in `DEPLOY_VERCEL.md`.
