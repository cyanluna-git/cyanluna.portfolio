This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Admin Upload

Per-project portfolio detail pages can be authored as standalone HTML files
and published instantly via the admin upload UI. Uploaded HTML for a slug
takes precedence over the static `src/data/project-details/<slug>.ts` source,
so re-uploading replaces the live page on the next request without a redeploy.

### Setup (env vars)

Two environment variables are required. Copy `.env.example` to `.env.local`
for local development, and set the same keys in Vercel Project Settings →
Environment Variables for production.

- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token. Easiest path: link the project
  to a Vercel Blob store, then `vercel env pull` to populate `.env.local`.
- `ADMIN_UPLOAD_KEY_B64` — Base64-encoded admin token used to authenticate
  uploads. Generate it locally and use the same value on Vercel:

  ```bash
  openssl rand -base64 32
  ```

### Usage

1. Visit `/admin/upload` (the route is `noindex`).
2. Paste the admin token (persisted in `sessionStorage` for the tab).
3. Enter a slug and pick an HTML file (≤ 5 MB, `.html` only).
4. Submit. On success the response links to `/projects/<slug>`.

### Slug rules

- Pattern: `^[a-z0-9][a-z0-9-]{0,63}$` (lowercase, digits, hyphens; 1–64 chars).
- Reserved (cannot be uploaded — these are hardcoded Next.js routes):
  `moru`, `smart-factory-qc`.
- Uploading to a slug that already has a static project page warns the
  author; on success the uploaded HTML wins at render time.

### API direct

The upload endpoint can also be driven from a script:

```bash
curl -X POST https://<host>/api/admin/projects/upload \
  -H "Authorization: Bearer $ADMIN_UPLOAD_KEY_B64" \
  -F "slug=my-project" \
  -F "file=@./my-project.html"
```

Response on success: `{ ok: true, slug, url: "/projects/<slug>", replaced }`.
Errors follow `{ error: { code, message, details? } }` with codes such as
`unauthorized`, `invalid_slug`, `slug_locked`, `file_too_large`,
`bad_file_type`, `bad_file_content`, `storage_put_failed`.

### Security notes

- Never commit `.env.local` or paste the admin token into shared logs.
- The admin page itself embeds no secrets — the token is supplied at runtime.
- `/admin/upload` is rendered with `robots: noindex`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
